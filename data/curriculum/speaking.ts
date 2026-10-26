import type { Level } from "../../shared/levels.ts";

/**
 * One speaking task per lesson (same order as the course). Keywords are the
 * target expressions checked in the learner's transcript; "|" separates
 * acceptable alternatives.
 */
export interface SpeakingTask {
  prompt: string;
  en?: string;
  keywords: string[];
}

export const SPEAKING: Record<Level, SpeakingTask[]> = {
  A1: [
    { prompt: "Parlez-nous de vous : votre nom, votre nationalité et votre ville.", en: "Tell us about yourself: your name, nationality and city.", keywords: ["je m'appelle", "je suis", "j'habite"] },
    { prompt: "Parlez-nous de votre famille.", en: "Tell us about your family.", keywords: ["j'ai", "mon|ma|mes", "s'appelle"] },
    { prompt: "Dites votre âge et l'âge de deux personnes de votre famille.", en: "Say your age and the age of two family members.", keywords: ["j'ai", "ans", "il a|elle a"] },
    { prompt: "Parlez-nous de votre quartier : qu'est-ce qu'il y a ?", en: "Tell us about your neighbourhood: what is there?", keywords: ["il y a", "il n'y a pas"] },
    { prompt: "Décrivez votre chambre.", en: "Describe your bedroom.", keywords: ["il y a", "sur|sous|devant|derrière|à côté"] },
    { prompt: "Qu'est-ce que vous mangez et buvez le matin ?", en: "What do you eat and drink in the morning?", keywords: ["je mange", "je bois", "du|de la|des"] },
    { prompt: "Racontez votre journée typique.", en: "Describe your typical day.", keywords: ["je me lève", "heures", "je me couche"] },
    { prompt: "Décrivez les vêtements que vous portez aujourd'hui.", en: "Describe the clothes you are wearing today.", keywords: ["je porte", "noir|noire|blanc|blanche|bleu|bleue|rouge|vert|verte|jaune|gris|grise"] },
    { prompt: "Qu'est-ce que vous aimez faire le week-end ?", en: "What do you like doing at the weekend?", keywords: ["j'aime", "je fais|je joue", "je n'aime pas"] },
    { prompt: "Quel temps fait-il aujourd'hui ? Quelle est votre saison préférée ?", en: "What's the weather like today? What's your favourite season?", keywords: ["il fait", "ma saison préférée"] },
    { prompt: "Vous êtes au café : commandez une boisson et quelque chose à manger.", en: "You're at a café: order a drink and something to eat.", keywords: ["je voudrais", "s'il vous plaît", "combien"] },
    { prompt: "Expliquez comment aller de chez vous au marché.", en: "Explain how to get from your home to the market.", keywords: ["tournez|tourne", "à droite|à gauche", "tout droit"] },
  ],
  A2: [
    { prompt: "Racontez votre week-end dernier.", en: "Tell us about last weekend.", keywords: ["j'ai", "samedi|dimanche", "je suis allé|je suis allée"] },
    { prompt: "Parlez-nous d'un voyage que vous avez fait.", en: "Tell us about a trip you took.", keywords: ["je suis allé|je suis allée|nous sommes allés", "je suis resté|je suis restée|nous sommes restés", "j'ai visité|nous avons visité"] },
    { prompt: "Vous êtes au marché : achetez des fruits et des légumes.", en: "You're at the market: buy some fruit and vegetables.", keywords: ["un kilo de", "j'en voudrais|j'en prends|j'en veux", "s'il vous plaît"] },
    { prompt: "Racontez votre matinée d'hier, dans l'ordre.", en: "Describe yesterday morning, in order.", keywords: ["je me suis levé|je me suis levée|je me suis réveillé|je me suis réveillée", "d'abord", "ensuite|puis"] },
    { prompt: "Quels sont vos projets pour l'année prochaine ?", en: "What are your plans for next year?", keywords: ["je vais", "l'année prochaine", "je ne vais pas"] },
    { prompt: "Vous êtes chez le médecin : expliquez ce qui ne va pas.", en: "You're at the doctor's: explain what's wrong.", keywords: ["j'ai mal", "depuis", "fièvre|je tousse"] },
    { prompt: "Parlez-nous de votre enfance.", en: "Tell us about your childhood.", keywords: ["quand j'étais petit|quand j'étais petite|quand j'étais enfant", "j'habitais", "je jouais"] },
    { prompt: "Parlez-nous d'un achat récent.", en: "Tell us about something you bought recently.", keywords: ["j'ai acheté|j'ai commandé", "je l'ai|je les ai", "je le trouve|je la trouve|je les trouve"] },
    { prompt: "Laissez un message vocal à un ami pour lui donner des nouvelles.", en: "Leave a voice message for a friend with your news.", keywords: ["je t'appelle", "je lui|je leur", "bises|à bientôt"] },
    { prompt: "Comparez deux villes que vous connaissez.", en: "Compare two cities you know.", keywords: ["plus", "moins", "que"] },
    { prompt: "Décrivez votre logement idéal.", en: "Describe your ideal home.", keywords: ["je voudrais", "qui", "que"] },
    { prompt: "Comment allez-vous au travail ou à l'école ?", en: "How do you get to work or school?", keywords: ["je prends", "en bus|en voiture|à pied|en taxi|à moto|en train", "j'y vais"] },
  ],
  B1: [
    { prompt: "Racontez un souvenir surprenant.", keywords: ["c'était", "quand", "soudain|tout à coup"] },
    { prompt: "Où vous voyez-vous dans dix ans ?", keywords: ["je serai", "j'aurai", "je travaillerai|je pourrai|j'habiterai"] },
    { prompt: "Que feriez-vous si vous gagniez beaucoup d'argent ?", keywords: ["si j'avais|si je gagnais", "je ferais|j'achèterais|je voyagerais", "j'aiderais"] },
    { prompt: "Le télétravail : êtes-vous pour ou contre ? Donnez votre avis.", keywords: ["à mon avis|je pense que", "parce que|car", "pourtant|mais"] },
    { prompt: "Que faites-vous pour protéger l'environnement ?", keywords: ["recycle|recycler|recyclons", "il faut", "dont|où"] },
    { prompt: "Rapportez une conversation récente au discours indirect.", keywords: ["m'a dit que|me dit que", "m'a demandé si|me demande si"] },
    { prompt: "Parlez d'une habitude que vous avez changée.", keywords: ["avant", "j'avais", "maintenant"] },
    { prompt: "Comment apprenez-vous le mieux ?", keywords: ["en écoutant|en lisant|en parlant|en pratiquant|en regardant|en faisant", "j'apprends", "le mieux"] },
    { prompt: "Comparez deux objets que vous hésitez à acheter.", keywords: ["celui|celle", "celui-ci|celle-ci|celui-là|celle-là", "plus|moins"] },
    { prompt: "Parlez-nous de votre meilleur ami ou de votre meilleure amie.", keywords: ["nous nous sommes", "le mien|la mienne|les miens|le sien|la sienne", "confiance"] },
    { prompt: "Décrivez une fête ou une tradition de votre pays.", keywords: ["depuis", "pendant", "il y a"] },
    { prompt: "Faites une réclamation par téléphone pour un produit défectueux.", keywords: ["je vous appelle|j'appelle", "pourriez-vous", "je voudrais|j'aimerais"] },
  ],
  B2: [
    { prompt: "Donnez des consignes à une nouvelle équipe.", keywords: ["il faut que", "il est important que|il est essentiel que", "je voudrais que|j'aimerais que"] },
    { prompt: "Un ami part vivre à l'étranger : dites-lui ce que vous ressentez.", keywords: ["je suis content que|je suis heureux que|je suis heureuse que|je suis ravi que|je suis ravie que", "je regrette que|j'ai peur que", "j'espère que"] },
    { prompt: "Racontez un défi que vous avez relevé malgré les difficultés.", keywords: ["bien que", "pour que|afin que", "malgré"] },
    { prompt: "Parlez d'une décision que vous auriez prise autrement.", keywords: ["si j'avais", "j'aurais", "j'aurais dû|j'aurais aimé"] },
    { prompt: "Présentez une nouvelle locale comme un journaliste radio.", keywords: ["a été|ont été", "sera|seront", "par"] },
    { prompt: "Rapportez une conversation importante que vous avez eue.", keywords: ["m'a dit qu|m'a expliqué que", "m'a demandé si", "le lendemain|la veille"] },
    { prompt: "Les réseaux sociaux font-ils plus de bien que de mal ? Argumentez.", keywords: ["tout d'abord|d'abord", "de plus|en outre", "en revanche|cependant|certes", "en conclusion|pour conclure"] },
    { prompt: "Décrivez des cadeaux que vous avez reçus ou offerts.", keywords: ["que j'ai reçu|que j'ai reçus|que j'ai reçue|que j'ai reçues", "je l'ai|je les ai", "m'a offert"] },
    { prompt: "Présentez une organisation ou une entreprise que vous connaissez.", keywords: ["pour laquelle|pour lequel", "auquel|à laquelle|auxquels|auxquelles", "avec lequel|avec laquelle|dans lequel|dans laquelle"] },
    { prompt: "Où en serez-vous dans cinq ans ?", keywords: ["j'aurai", "dès que|une fois que|quand", "je serai"] },
    { prompt: "Qu'est-ce qui compte le plus pour vous dans la vie ?", keywords: ["ce qui", "c'est", "ce que|ce dont"] },
    { prompt: "Laissez un message vocal professionnel pour demander un rendez-vous.", keywords: ["je me permets", "je souhaiterais|je voudrais", "disponible"] },
  ],
  C1: [
    { prompt: "Faites le bilan d'une expérience passée : satisfactions et regrets.", keywords: ["je suis content que|je suis ravi que|je suis ravie que|je regrette que|il est dommage que", "le plus|le meilleur|la plus|la meilleure"] },
    { prompt: "« Il faut toujours suivre ses rêves. » Nuancez cette affirmation.", keywords: ["quel que soit|quelle que soit|quels que soient|quelles que soient|quoi que", "j'ai beau|on a beau|avoir beau", "il n'en reste pas moins|toujours est-il|néanmoins"] },
    { prompt: "Racontez une anecdote drôle en employant des expressions imagées.", keywords: ["poser un lapin|posé un lapin|les yeux de la tête|un chat dans la gorge|têtu comme une mule|dans les pommes|la main à la pâte|la puce à l'oreille|langue au chat|pas de la tarte", "l'autre jour|un jour|la semaine dernière|hier"] },
    { prompt: "Racontez le même incident à un ami, puis à votre directeur.", keywords: ["boulot|bagnole|crevé|j'en ai marre|en panne", "je vous prie|veuillez|monsieur|madame"] },
    { prompt: "Présentez trois titres de l'actualité de votre pays.", keywords: ["hausse|baisse|augmentation", "ouverture|lancement|report|annonce|arrivée"] },
    { prompt: "Donnez les consignes de sécurité d'un événement.", keywords: ["en cas de", "au cas où", "à condition que|pour peu que|à moins que"] },
    { prompt: "Exprimez vos craintes au sujet d'un projet.", keywords: ["je crains que|j'ai peur que|je redoute que", "avant que", "éviter que"] },
    { prompt: "Racontez une rencontre importante de votre vie.", keywords: ["nous nous sommes|ils se sont|elles se sont", "rencontrés|rencontrées|parlé|écrit|téléphoné"] },
    { prompt: "Commentez une actualité dans un registre soutenu.", keywords: ["peut-être|sans doute", "à peine", "aussi|encore faut-il|force est"] },
    { prompt: "Racontez un malentendu linguistique que vous avez vécu.", keywords: ["en fait|actuellement|éventuellement|finalement", "librairie|bibliothèque|assister|prétendre|sensible", "malentendu"] },
    { prompt: "Analysez les causes et les conséquences d'un problème de société.", keywords: ["étant donné que|en raison de|faute de|d'autant plus que|sous prétexte que", "si bien que|par conséquent|de sorte que|c'est pourquoi", "entraîne|provoque|résulte|découle"] },
    { prompt: "Présentez la problématique et le plan d'une synthèse de documents.", keywords: ["les deux documents", "alors que|tandis que", "dans quelle mesure|nous verrons"] },
  ],
  C2: [
    { prompt: "Racontez oralement le début d'un conte.", keywords: ["il était une fois", "un jour", "il y avait|vivait"] },
    { prompt: "Évoquez un souvenir d'enfance dans un style soutenu.", keywords: ["je me souviens|je me rappelle", "il fallait que|bien que|il eût fallu|on eût dit"] },
    { prompt: "Décrivez un lieu qui vous est cher en employant des figures de style.", keywords: ["comme|tel|pareil à", "ce n'est pas|n'est pas", "mille|million"] },
    { prompt: "Présentez un flash d'information de trente secondes.", keywords: ["selon|d'après", "aurait|auraient", "a déclaré|a-t-il déclaré|a-t-elle déclaré|a affirmé"] },
    { prompt: "Évoquez un lieu disparu ou transformé dans un registre soutenu.", keywords: ["naguère|jadis", "nul|guère|point", "force est de constater|d'aucuns"] },
    { prompt: "Parlez des particularités du français dans votre région.", keywords: ["on dit|on entend", "au lieu de|plutôt que", "norme|correct|bon français"] },
    { prompt: "Faites le compte rendu oral d'une réunion avec des locutions latines.", keywords: ["a priori|a posteriori", "in extremis|statu quo|ad hoc|sine qua non|de facto"] },
    { prompt: "Décrivez une scène en jouant sur le rythme de vos phrases.", keywords: ["d'abord|puis|enfin", "soudain|tout à coup|alors"] },
    { prompt: "Racontez un fait divers en employant des paronymes.", keywords: ["perpétré|infligé|affligé|imminent|éminent|évoqué|invoqué|effraction|infraction|conjoncture|conjecture", "selon|d'après"] },
    { prompt: "Racontez une scène d'attente du point de vue d'un personnage.", keywords: ["et si", "pourquoi|comment", "enfin|encore"] },
    { prompt: "Décrivez une fête en employant tout, même, demi et quelque.", keywords: ["tout|toute|toutes|tous", "même|mêmes", "demi|demie", "quelque|quelques"] },
    { prompt: "Prononcez un court discours pour encourager l'apprentissage des langues.", keywords: ["chers amis|mesdames et messieurs", "qui parmi vous|qui d'entre vous|n'est-ce pas", "apprendre"] },
  ],
};
