// Pure scoring helpers for speaking practice (used in the browser, tested in Node).

/** Lowercase, no accents, no punctuation (apostrophes kept), single spaces. */
export function normalizeSpeech(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9'\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const words = (text: string) => normalizeSpeech(text).split(" ").filter(Boolean);

/**
 * Read-aloud accuracy: share of the target's words recognised in order
 * (longest common subsequence), plus a per-word map for highlighting.
 */
export function readAloudScore(target: string, transcript: string) {
  const t = words(target);
  const s = words(transcript);
  const dp = Array.from({ length: t.length + 1 }, () => new Array<number>(s.length + 1).fill(0));
  for (let i = t.length - 1; i >= 0; i--) {
    for (let j = s.length - 1; j >= 0; j--) {
      dp[i][j] = t[i] === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const matched = new Set<number>();
  for (let i = 0, j = 0; i < t.length && j < s.length; ) {
    if (t[i] === s[j]) {
      matched.add(i);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  // Map each displayed word (with punctuation) onto its normalised parts.
  let cursor = 0;
  const perWord = target
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const parts = words(word).length;
      const ok = Array.from({ length: parts }, (_, k) => matched.has(cursor + k)).every(Boolean);
      cursor += parts;
      return { word, ok };
    });
  return { score: t.length ? Math.round((matched.size / t.length) * 100) : 0, words: perWord };
}

/** Which target expressions appear in a free-speech transcript ("a|b" = alternatives). */
export function keywordHits(transcript: string, keywords: string[]) {
  const said = ` ${normalizeSpeech(transcript)} `;
  const hit: string[] = [];
  const missed: string[] = [];
  for (const k of keywords) {
    const found = k.split("|").some((alt) => said.includes(` ${normalizeSpeech(alt)} `));
    (found ? hit : missed).push(k);
  }
  return { hit, missed, score: keywords.length ? Math.round((hit.length / keywords.length) * 100) : 0 };
}

/** Human-readable version of a keyword with alternatives. */
export const keywordLabel = (k: string) => k.split("|").slice(0, 3).join(" / ") + (k.split("|").length > 3 ? " …" : "");
