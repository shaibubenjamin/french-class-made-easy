import { describe, expect, it } from "vitest";
import { keywordHits, normalizeSpeech, readAloudScore } from "../shared/speech.ts";
import { levelStatus, nextLevel, PASS_MARK } from "../shared/progression.ts";

describe("speech scoring", () => {
  it("normalises accents, case and punctuation", () => {
    expect(normalizeSpeech("Je suis allée à l’école, hier !")).toBe("je suis allee a l'ecole hier");
  });

  it("scores read-aloud by words recognised in order", () => {
    const r = readAloudScore("Je suis étudiant à Lyon.", "je suis étudiant a lyon");
    expect(r.score).toBe(100);
    const partial = readAloudScore("Nous avons deux enfants.", "nous avons enfants");
    expect(partial.score).toBe(75);
    expect(partial.words.map((w) => w.ok)).toEqual([true, true, false, true]);
    expect(readAloudScore("Est-ce que tu viens ?", "est-ce que tu viens").words.every((w) => w.ok)).toBe(true);
  });

  it("detects target expressions with alternatives, on word boundaries", () => {
    const r = keywordHits("Bonjour, je m'appelle Ben et j'habite à Lagos", ["je m'appelle", "j'habite", "je suis|je travaille"]);
    expect(r.hit).toEqual(["je m'appelle", "j'habite"]);
    expect(r.missed).toEqual(["je suis|je travaille"]);
    expect(r.score).toBe(67);
    // "ma" must not match inside "maman"
    expect(keywordHits("ma maman", ["mon|ma|mes"]).hit).toHaveLength(1);
    expect(keywordHits("maman", ["mon|ma|mes"]).hit).toHaveLength(0);
  });
});

describe("level progression", () => {
  const lesson = (seq: number, score: number | null, completed = true) => ({ seq, theme: `L${seq}`, completed, score });

  it("requires every lesson done and an average of at least 80%", () => {
    const all90 = Array.from({ length: 12 }, (_, i) => lesson(i + 1, 90));
    expect(levelStatus(all90).passed).toBe(true);
    const oneMissing = [...all90.slice(0, 11), lesson(12, null, false)];
    expect(levelStatus(oneMissing).passed).toBe(false);
    const low = Array.from({ length: 12 }, (_, i) => lesson(i + 1, i < 6 ? 60 : 90));
    const status = levelStatus(low);
    expect(status.average).toBe(75);
    expect(status.passed).toBe(false);
    expect(status.toImprove).toHaveLength(6);
    expect(PASS_MARK).toBe(80);
  });

  it("knows the next level", () => {
    expect(nextLevel("A1")).toBe("A2");
    expect(nextLevel("C2")).toBeNull();
  });
});
