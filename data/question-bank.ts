import type { Level } from "../shared/levels.ts";

/**
 * Placement question bank (US-2.1). Each item lists its correct answer first;
 * scripts/build-question-seed.ts shuffles the options deterministically when it
 * writes the seed migration. Needs review by a French speaker before launch.
 */
export interface BankItem {
  level: Level;
  skill: "grammar" | "vocabulary" | "reading";
  prompt: string;
  passage?: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
}

const A1_P1 =
  "Je m'appelle Léa. J'ai vingt ans. J'habite à Lyon avec mon frère. Le matin, je bois un café et je vais à l'université.";
const A1_P2 =
  "Bonjour ! Le magasin est ouvert du lundi au samedi, de 9 h à 19 h. Le dimanche, il est fermé.";
const A1_P3 =
  "Paul aime le sport. Il joue au football le mercredi et il nage le samedi. Il n'aime pas la télévision.";

const A2_P1 =
  "Chère Sophie, je suis en vacances à Nice avec ma famille. Hier, nous avons visité le vieux port et nous avons mangé des fruits de mer. Il fait très beau, mais l'hôtel est un peu bruyant. Nous rentrons samedi. Bises, Marc";
const A2_P2 =
  "AVIS AUX VOYAGEURS : en raison de travaux, le train de 14 h 20 pour Bordeaux partira du quai 7 au lieu du quai 3. Merci de votre compréhension.";
const A2_P3 =
  "Thomas se lève à 6 h 30. Il prend une douche, puis il prend le bus pour aller au bureau. Le soir, il rentre vers 18 h et prépare le dîner.";

const B1_P1 =
  "Depuis trois ans, Claire travaille à domicile deux jours par semaine. Elle apprécie de ne plus perdre deux heures dans les transports, mais elle regrette parfois l'ambiance du bureau. Pour garder le contact, son équipe organise un déjeuner chaque vendredi.";
const B1_P2 =
  "La mairie a décidé de rendre le centre-ville piéton le week-end. Les commerçants craignent une baisse de leur chiffre d'affaires, tandis que les habitants se réjouissent d'un air plus pur et de rues plus calmes.";
const B1_P3 =
  "Je pensais que le film serait ennuyeux, mais j'ai été agréablement surpris : les acteurs sont excellents et l'histoire est pleine de rebondissements.";

const B2_P1 =
  "Selon une étude récente, les Français passent en moyenne plus de quatre heures par jour devant un écran en dehors du travail. Si les chercheurs ne remettent pas en cause l'utilité du numérique, ils alertent sur ses effets sur le sommeil, en particulier chez les adolescents, et recommandent de bannir les écrans une heure avant le coucher.";
const B2_P2 =
  "Madame, Monsieur, suite à ma commande n° 4521 du 3 mars, je constate que l'article reçu ne correspond pas à la description. Je vous saurais gré de bien vouloir procéder à son remboursement dans les meilleurs délais.";
const B2_P3 =
  "Certes, le nucléaire émet peu de CO2 ; il n'en demeure pas moins que la question des déchets reste entière.";

const C1_P1 =
  "Loin de constituer une simple mode, l'engouement pour les circuits courts traduit une défiance croissante envers l'industrie agroalimentaire. Encore faut-il que cette aspiration ne se heurte pas à la réalité économique : tous les ménages ne peuvent s'offrir le luxe d'un panier fermier.";
const C1_P2 =
  "Le ministre s'est fendu d'un communiqué laconique, se gardant bien de répondre aux accusations.";
const C1_P3 = "Il est des silences plus éloquents que de longs discours.";

const C2_P1 =
  "La nostalgie n'est pas tant le regret d'un lieu que celui d'un temps où nous étions autres ; aussi le retour au pays natal déçoit-il souvent, car on n'y retrouve que le décor, non l'acteur.";
const C2_P2 =
  "Que l'on ne s'y trompe pas : sous ses dehors badins, ce pamphlet est une charge d'une rare violence contre l'institution.";
const C2_P3 = "Point n'est besoin d'être grand clerc pour deviner l'issue du scrutin.";

export const QUESTION_BANK: BankItem[] = [
  // ---------------- A1 ----------------
  { level: "A1", skill: "grammar", prompt: "Je ___ étudiant.", correct: "suis", wrong: ["es", "est", "sommes"], explanation: "Être au présent : je suis." },
  { level: "A1", skill: "grammar", prompt: "Nous ___ deux enfants.", correct: "avons", wrong: ["avez", "ont", "ai"], explanation: "Avoir au présent : nous avons." },
  { level: "A1", skill: "grammar", prompt: "___ pomme est rouge.", correct: "La", wrong: ["Le", "Les", "Un"], explanation: "« Pomme » est féminin singulier : la pomme." },
  { level: "A1", skill: "grammar", prompt: "Tu ___ français ?", correct: "parles", wrong: ["parle", "parlons", "parlez"], explanation: "Verbe en -er, 2e personne du singulier : tu parles." },
  { level: "A1", skill: "grammar", prompt: "Elle habite ___ Paris.", correct: "à", wrong: ["en", "au", "dans le"], explanation: "On utilise « à » devant un nom de ville." },
  { level: "A1", skill: "grammar", prompt: "Ils ___ au cinéma ce soir.", correct: "vont", wrong: ["va", "allons", "allez"], explanation: "Aller au présent : ils vont." },
  { level: "A1", skill: "grammar", prompt: "Je n'aime ___ le café.", correct: "pas", wrong: ["rien", "non", "aucun"], explanation: "La négation simple est ne … pas." },

  { level: "A1", skill: "vocabulary", prompt: "Comment dit-on « thank you » en français ?", correct: "merci", wrong: ["s'il vous plaît", "bonjour", "pardon"], explanation: "« Merci » = thank you." },
  { level: "A1", skill: "vocabulary", prompt: "Quel est le contraire de « grand » ?", correct: "petit", wrong: ["gros", "long", "haut"], explanation: "Grand ≠ petit." },
  { level: "A1", skill: "vocabulary", prompt: "« Lundi » est…", correct: "un jour de la semaine", wrong: ["un mois de l'année", "une saison", "un repas"], explanation: "Lundi, mardi, mercredi… sont les jours de la semaine." },
  { level: "A1", skill: "vocabulary", prompt: "Quel nombre est « dix-sept » ?", correct: "17", wrong: ["7", "70", "27"], explanation: "Dix-sept = 10 + 7 = 17." },
  { level: "A1", skill: "vocabulary", prompt: "Quel mot désigne un membre de la famille ?", correct: "la sœur", wrong: ["la table", "le livre", "la rue"], explanation: "La sœur (sister) fait partie de la famille." },
  { level: "A1", skill: "vocabulary", prompt: "Qu'est-ce qu'on boit ?", correct: "de l'eau", wrong: ["du pain", "une chaise", "un stylo"], explanation: "On boit de l'eau ; on mange du pain." },
  { level: "A1", skill: "vocabulary", prompt: "What does « au revoir » mean?", correct: "goodbye", wrong: ["hello", "please", "sorry"], explanation: "« Au revoir » = goodbye." },

  { level: "A1", skill: "reading", passage: A1_P1, prompt: "Quel âge a Léa ?", correct: "20 ans", wrong: ["2 ans", "12 ans", "22 ans"], explanation: "« J'ai vingt ans » = 20 ans." },
  { level: "A1", skill: "reading", passage: A1_P1, prompt: "Avec qui habite Léa ?", correct: "avec son frère", wrong: ["avec sa mère", "seule", "avec une amie"], explanation: "« J'habite à Lyon avec mon frère. »" },
  { level: "A1", skill: "reading", passage: A1_P1, prompt: "Où va Léa le matin ?", correct: "à l'université", wrong: ["au travail", "au café", "à Paris"], explanation: "« Je vais à l'université. »" },
  { level: "A1", skill: "reading", passage: A1_P2, prompt: "Le magasin est fermé…", correct: "le dimanche", wrong: ["le lundi", "le samedi", "tous les jours"], explanation: "« Le dimanche, il est fermé. »" },
  { level: "A1", skill: "reading", passage: A1_P2, prompt: "À quelle heure ouvre le magasin ?", correct: "à 9 h", wrong: ["à 7 h", "à 19 h", "à 10 h"], explanation: "Il est ouvert de 9 h à 19 h." },
  { level: "A1", skill: "reading", passage: A1_P3, prompt: "Que fait Paul le samedi ?", correct: "Il nage.", wrong: ["Il joue au football.", "Il regarde la télévision.", "Il travaille."], explanation: "« Il nage le samedi. »" },
  { level: "A1", skill: "reading", passage: A1_P3, prompt: "Paul n'aime pas…", correct: "la télévision", wrong: ["le sport", "le football", "nager"], explanation: "« Il n'aime pas la télévision. »" },

  // ---------------- A2 ----------------
  { level: "A2", skill: "grammar", prompt: "Hier, j'___ mangé une pizza.", correct: "ai", wrong: ["suis", "avais", "est"], explanation: "Passé composé avec avoir : j'ai mangé." },
  { level: "A2", skill: "grammar", prompt: "Elle ___ partie à 8 heures.", correct: "est", wrong: ["a", "était", "ai"], explanation: "« Partir » se conjugue avec être au passé composé." },
  { level: "A2", skill: "grammar", prompt: "Nous nous ___ levés tôt ce matin.", correct: "sommes", wrong: ["avons", "étions", "sont"], explanation: "Les verbes pronominaux prennent être : nous nous sommes levés." },
  { level: "A2", skill: "grammar", prompt: "Tu veux du pain ? — Oui, j'___ veux bien.", correct: "en", wrong: ["y", "le", "lui"], explanation: "« En » remplace un nom introduit par du / de la / des." },
  { level: "A2", skill: "grammar", prompt: "Je téléphone à ma mère. → Je ___ téléphone.", correct: "lui", wrong: ["la", "le", "leur"], explanation: "Téléphoner à quelqu'un → pronom COI singulier : lui." },
  { level: "A2", skill: "grammar", prompt: "Il y a ___ lait dans le frigo.", correct: "du", wrong: ["de la", "des", "une"], explanation: "Partitif masculin : du lait." },
  { level: "A2", skill: "grammar", prompt: "Demain, je ___ visiter le musée.", correct: "vais", wrong: ["vas", "va", "allons"], explanation: "Futur proche : je vais + infinitif." },

  { level: "A2", skill: "vocabulary", prompt: "Où achète-t-on du pain ?", correct: "à la boulangerie", wrong: ["à la pharmacie", "à la librairie", "à la poste"], explanation: "Le boulanger vend du pain à la boulangerie." },
  { level: "A2", skill: "vocabulary", prompt: "Pour prendre le train, on va…", correct: "à la gare", wrong: ["à l'aéroport", "au port", "au garage"], explanation: "Les trains partent de la gare." },
  { level: "A2", skill: "vocabulary", prompt: "Un billet « aller-retour » est un billet…", correct: "pour aller et revenir", wrong: ["pour un seul trajet", "pour un concert", "gratuit"], explanation: "Aller-retour = l'aller et le retour." },
  { level: "A2", skill: "vocabulary", prompt: "Je me brosse les ___ après le repas.", correct: "dents", wrong: ["chaussures", "fenêtres", "clés"], explanation: "On se brosse les dents." },
  { level: "A2", skill: "vocabulary", prompt: "« L'addition, s'il vous plaît ! » On dit cela…", correct: "au restaurant", wrong: ["à la gare", "chez le médecin", "à l'école"], explanation: "L'addition = la note à payer au restaurant." },
  { level: "A2", skill: "vocabulary", prompt: "Le contraire de « cher » est…", correct: "bon marché", wrong: ["lourd", "rapide", "ancien"], explanation: "Cher ≠ bon marché." },
  { level: "A2", skill: "vocabulary", prompt: "Il pleut, prends ton ___ !", correct: "parapluie", wrong: ["maillot de bain", "lunettes de soleil", "vélo"], explanation: "Le parapluie protège de la pluie." },

  { level: "A2", skill: "reading", passage: A2_P1, prompt: "Où est Marc ?", correct: "à Nice", wrong: ["à Paris", "à Marseille", "chez Sophie"], explanation: "« Je suis en vacances à Nice. »" },
  { level: "A2", skill: "reading", passage: A2_P1, prompt: "Qu'est-ce que Marc a fait hier ?", correct: "Il a visité le port.", wrong: ["Il est allé à la plage.", "Il est rentré chez lui.", "Il a travaillé."], explanation: "« Nous avons visité le vieux port. »" },
  { level: "A2", skill: "reading", passage: A2_P1, prompt: "Quel est le problème ?", correct: "L'hôtel est bruyant.", wrong: ["Il pleut.", "La nourriture est mauvaise.", "Il est malade."], explanation: "« L'hôtel est un peu bruyant. »" },
  { level: "A2", skill: "reading", passage: A2_P1, prompt: "Quand Marc rentre-t-il ?", correct: "samedi", wrong: ["demain", "dimanche", "lundi"], explanation: "« Nous rentrons samedi. »" },
  { level: "A2", skill: "reading", passage: A2_P2, prompt: "Qu'est-ce qui change ?", correct: "le quai de départ", wrong: ["l'heure de départ", "la destination", "le prix du billet"], explanation: "Le train part du quai 7 au lieu du quai 3." },
  { level: "A2", skill: "reading", passage: A2_P2, prompt: "Pourquoi ?", correct: "à cause de travaux", wrong: ["à cause d'une grève", "à cause de la météo", "à cause d'un accident"], explanation: "« En raison de travaux »." },
  { level: "A2", skill: "reading", passage: A2_P3, prompt: "Comment Thomas va-t-il au bureau ?", correct: "en bus", wrong: ["à pied", "en voiture", "en train"], explanation: "« Il prend le bus pour aller au bureau. »" },

  // ---------------- B1 ----------------
  { level: "B1", skill: "grammar", prompt: "Quand j'étais petit, je ___ souvent chez mes grands-parents.", correct: "allais", wrong: ["suis allé", "irai", "vais aller"], explanation: "Habitude dans le passé → imparfait." },
  { level: "B1", skill: "grammar", prompt: "Je lisais quand le téléphone ___.", correct: "a sonné", wrong: ["sonnait", "sonne", "sonnera"], explanation: "Action ponctuelle qui interrompt une action en cours → passé composé." },
  { level: "B1", skill: "grammar", prompt: "Si j'avais le temps, je ___ plus de sport.", correct: "ferais", wrong: ["fais", "ferai", "faisais"], explanation: "Si + imparfait → conditionnel présent." },
  { level: "B1", skill: "grammar", prompt: "C'est le livre ___ je t'ai parlé.", correct: "dont", wrong: ["que", "qui", "où"], explanation: "Parler de quelque chose → pronom relatif « dont »." },
  { level: "B1", skill: "grammar", prompt: "L'année prochaine, nous ___ en Espagne.", correct: "irons", wrong: ["allions", "irions", "sommes allés"], explanation: "Futur simple d'aller : nous irons." },
  { level: "B1", skill: "grammar", prompt: "La ville ___ je suis né est petite.", correct: "où", wrong: ["que", "dont", "qui"], explanation: "« Où » pour un lieu." },
  { level: "B1", skill: "grammar", prompt: "Elle m'a dit qu'elle ___ fatiguée.", correct: "était", wrong: ["soit", "sera", "sois"], explanation: "Discours indirect au passé : présent → imparfait." },

  { level: "B1", skill: "vocabulary", prompt: "Un « entretien d'embauche » est…", correct: "un rendez-vous pour obtenir un emploi", wrong: ["une réunion d'équipe", "une formation", "un congé"], explanation: "Embaucher = engager quelqu'un." },
  { level: "B1", skill: "vocabulary", prompt: "« Être au chômage » signifie…", correct: "ne pas avoir d'emploi", wrong: ["être en vacances", "travailler beaucoup", "être malade"], explanation: "Le chômage = la situation sans emploi." },
  { level: "B1", skill: "vocabulary", prompt: "Quelle expression sert à donner son avis ?", correct: "À mon avis, …", wrong: ["Il était une fois, …", "Tout à coup, …", "En bas, …"], explanation: "« À mon avis » introduit une opinion." },
  { level: "B1", skill: "vocabulary", prompt: "Un « salaire » est…", correct: "l'argent qu'on gagne en travaillant", wrong: ["un collègue", "un bureau", "un contrat de location"], explanation: "Le salaire est la rémunération du travail." },
  { level: "B1", skill: "vocabulary", prompt: "Un synonyme de « commencer » est…", correct: "débuter", wrong: ["terminer", "continuer", "arrêter"], explanation: "Commencer = débuter." },
  { level: "B1", skill: "vocabulary", prompt: "« Avoir du mal à » + infinitif signifie…", correct: "avoir des difficultés à", wrong: ["faire du mal à quelqu'un", "détester", "refuser de"], explanation: "J'ai du mal à comprendre = c'est difficile pour moi." },
  { level: "B1", skill: "vocabulary", prompt: "« Démissionner » signifie…", correct: "quitter volontairement son emploi", wrong: ["être licencié", "être promu", "prendre sa retraite"], explanation: "On démissionne par choix ; on est licencié par l'employeur." },

  { level: "B1", skill: "reading", passage: B1_P1, prompt: "Quel avantage du télétravail Claire mentionne-t-elle ?", correct: "Elle gagne du temps de transport.", wrong: ["Elle gagne plus d'argent.", "Elle travaille moins.", "Elle voit plus ses collègues."], explanation: "Elle ne perd plus deux heures dans les transports." },
  { level: "B1", skill: "reading", passage: B1_P1, prompt: "Qu'est-ce qui lui manque parfois ?", correct: "l'ambiance du bureau", wrong: ["son ordinateur", "les transports", "son ancien patron"], explanation: "« Elle regrette parfois l'ambiance du bureau. »" },
  { level: "B1", skill: "reading", passage: B1_P1, prompt: "Pourquoi l'équipe organise-t-elle un déjeuner ?", correct: "pour garder le contact", wrong: ["pour fêter un anniversaire", "pour recruter", "pour réduire les coûts"], explanation: "« Pour garder le contact… »" },
  { level: "B1", skill: "reading", passage: B1_P2, prompt: "Quelle est la décision de la mairie ?", correct: "interdire les voitures au centre le week-end", wrong: ["fermer les commerces le week-end", "construire un parking", "augmenter les impôts"], explanation: "Un centre-ville piéton = sans voitures." },
  { level: "B1", skill: "reading", passage: B1_P2, prompt: "Que craignent les commerçants ?", correct: "de vendre moins", wrong: ["la pollution", "le bruit", "les touristes"], explanation: "Une baisse du chiffre d'affaires = moins de ventes." },
  { level: "B1", skill: "reading", passage: B1_P2, prompt: "Quelle est la réaction des habitants ?", correct: "Ils sont contents.", wrong: ["Ils sont inquiets.", "Ils sont indifférents.", "Ils protestent."], explanation: "« Les habitants se réjouissent. »" },
  { level: "B1", skill: "reading", passage: B1_P3, prompt: "Que pense l'auteur du film ?", correct: "Il l'a aimé, contrairement à ce qu'il attendait.", wrong: ["Il l'a trouvé ennuyeux.", "Il n'a pas aimé les acteurs.", "Il ne l'a pas vu."], explanation: "« J'ai été agréablement surpris. »" },

  // ---------------- B2 ----------------
  { level: "B2", skill: "grammar", prompt: "Il faut que vous ___ ce dossier avant lundi.", correct: "finissiez", wrong: ["finissez", "finirez", "finiriez"], explanation: "« Il faut que » + subjonctif." },
  { level: "B2", skill: "grammar", prompt: "Bien qu'il ___ malade, il est venu travailler.", correct: "soit", wrong: ["est", "était", "sera"], explanation: "« Bien que » + subjonctif." },
  { level: "B2", skill: "grammar", prompt: "Je doute qu'elle ___ raison.", correct: "ait", wrong: ["a", "aura", "avait"], explanation: "Le doute entraîne le subjonctif." },
  { level: "B2", skill: "grammar", prompt: "Si j'avais su, je ___ venu plus tôt.", correct: "serais", wrong: ["suis", "serai", "étais"], explanation: "Si + plus-que-parfait → conditionnel passé." },
  { level: "B2", skill: "grammar", prompt: "Les lettres qu'il a ___ sont sur la table.", correct: "écrites", wrong: ["écrit", "écrits", "écrite"], explanation: "COD placé avant (les lettres) → accord du participe avec avoir." },
  { level: "B2", skill: "grammar", prompt: "___ la pluie, le match a été maintenu.", correct: "Malgré", wrong: ["Bien que", "À cause de", "Grâce à"], explanation: "Malgré + nom exprime la concession." },
  { level: "B2", skill: "grammar", prompt: "Il est parti sans que nous ___.", correct: "le sachions", wrong: ["le savons", "le saurons", "le savions"], explanation: "« Sans que » + subjonctif." },

  { level: "B2", skill: "vocabulary", prompt: "« Néanmoins » signifie…", correct: "cependant", wrong: ["donc", "ainsi", "de plus"], explanation: "Néanmoins exprime l'opposition, comme cependant." },
  { level: "B2", skill: "vocabulary", prompt: "Quelle formule convient pour conclure un e-mail formel ?", correct: "Veuillez agréer, Madame, mes salutations distinguées.", wrong: ["Bisous !", "À plus !", "Salut, à bientôt !"], explanation: "Formule de politesse du registre formel." },
  { level: "B2", skill: "vocabulary", prompt: "Un « enjeu » est…", correct: "ce que l'on peut gagner ou perdre", wrong: ["un jeu de société", "une dispute", "un impôt"], explanation: "L'enjeu = ce qui est en jeu." },
  { level: "B2", skill: "vocabulary", prompt: "« Mettre en œuvre » un projet signifie…", correct: "le réaliser", wrong: ["l'abandonner", "le critiquer", "le financer"], explanation: "Mettre en œuvre = appliquer, réaliser." },
  { level: "B2", skill: "vocabulary", prompt: "Quel connecteur introduit une conséquence ?", correct: "par conséquent", wrong: ["en revanche", "pourtant", "certes"], explanation: "Par conséquent = donc." },
  { level: "B2", skill: "vocabulary", prompt: "Un « bilan » est…", correct: "une évaluation des résultats", wrong: ["un billet", "une dette", "un débat"], explanation: "Faire le bilan = évaluer." },
  { level: "B2", skill: "vocabulary", prompt: "Dans un débat, un synonyme de « souligner » est…", correct: "mettre l'accent sur", wrong: ["ignorer", "contredire", "résumer"], explanation: "Souligner = insister sur, mettre l'accent sur." },

  { level: "B2", skill: "reading", passage: B2_P1, prompt: "Quelle est la position des chercheurs ?", correct: "Ils reconnaissent l'utilité du numérique mais signalent des risques.", wrong: ["Ils veulent interdire le numérique.", "Ils pensent que les écrans n'ont aucun effet.", "Ils encouragent l'usage des écrans le soir."], explanation: "Ils ne remettent pas en cause son utilité mais alertent sur ses effets." },
  { level: "B2", skill: "reading", passage: B2_P1, prompt: "Quel effet est particulièrement souligné ?", correct: "l'effet sur le sommeil des adolescents", wrong: ["l'effet sur la vue des adultes", "l'effet sur les résultats scolaires", "l'effet sur le travail"], explanation: "« Ses effets sur le sommeil, en particulier chez les adolescents »." },
  { level: "B2", skill: "reading", passage: B2_P1, prompt: "Que recommandent-ils ?", correct: "éviter les écrans une heure avant de dormir", wrong: ["réduire le temps de travail", "dormir quatre heures de plus", "utiliser les écrans uniquement au travail"], explanation: "« Bannir les écrans une heure avant le coucher »." },
  { level: "B2", skill: "reading", passage: B2_P2, prompt: "Quel est l'objet de ce courrier ?", correct: "une réclamation", wrong: ["une candidature", "une invitation", "une offre commerciale"], explanation: "L'auteur se plaint d'un article non conforme." },
  { level: "B2", skill: "reading", passage: B2_P2, prompt: "Que demande l'auteur ?", correct: "un remboursement", wrong: ["un échange", "un rendez-vous", "une réduction sur sa prochaine commande"], explanation: "« Procéder à son remboursement »." },
  { level: "B2", skill: "reading", passage: B2_P2, prompt: "« Je vous saurais gré de » signifie…", correct: "je vous serais reconnaissant de", wrong: ["je vous oblige à", "je vous interdis de", "je vous rappelle de"], explanation: "Savoir gré = être reconnaissant." },
  { level: "B2", skill: "reading", passage: B2_P3, prompt: "Quelle est l'idée de l'auteur ?", correct: "Il reconnaît un avantage mais souligne un problème non résolu.", wrong: ["Il est entièrement favorable au nucléaire.", "Il pense que les déchets ne posent pas de problème.", "Il nie que le nucléaire émette peu de CO2."], explanation: "« Certes… il n'en demeure pas moins que… » = concession + objection." },

  // ---------------- C1 ----------------
  { level: "C1", skill: "grammar", prompt: "Quoi qu'il ___, je ne changerai pas d'avis.", correct: "dise", wrong: ["dit", "dira", "disait"], explanation: "« Quoi que » + subjonctif." },
  { level: "C1", skill: "grammar", prompt: "Il aurait fallu qu'elle ___ plus tôt.", correct: "soit partie", wrong: ["est partie", "serait partie", "était partie"], explanation: "« Il faut que » + subjonctif (ici passé)." },
  { level: "C1", skill: "grammar", prompt: "N'eût été son aide, nous ___ échoué.", correct: "aurions", wrong: ["avons", "aurons", "avions"], explanation: "Hypothèse dans le passé → conditionnel passé." },
  { level: "C1", skill: "grammar", prompt: "Ce n'est pas que je ___ contre, mais…", correct: "sois", wrong: ["suis", "serai", "serais"], explanation: "« Ce n'est pas que » + subjonctif." },
  { level: "C1", skill: "grammar", prompt: "Elle s'est ___ les mains.", correct: "lavé", wrong: ["lavée", "lavés", "lavées"], explanation: "Le COD (les mains) est après le verbe : pas d'accord." },
  { level: "C1", skill: "grammar", prompt: "Les efforts ___ il a fallu consentir étaient considérables.", correct: "qu'", wrong: ["dont", "auxquels", "lesquels"], explanation: "Consentir des efforts → COD → « que »." },
  { level: "C1", skill: "grammar", prompt: "Pour peu qu'on lui ___ confiance, il réussira.", correct: "fasse", wrong: ["fait", "fera", "ferait"], explanation: "« Pour peu que » + subjonctif." },

  { level: "C1", skill: "vocabulary", prompt: "« Avoir le cafard » signifie…", correct: "être déprimé", wrong: ["avoir peur des insectes", "être très fatigué", "avoir faim"], explanation: "Expression familière : avoir des idées noires." },
  { level: "C1", skill: "vocabulary", prompt: "« Couper les cheveux en quatre » signifie…", correct: "être excessivement pointilleux", wrong: ["aller chez le coiffeur", "partager équitablement", "faire des économies"], explanation: "Compliquer les choses par excès de subtilité." },
  { level: "C1", skill: "vocabulary", prompt: "Dans un registre courant, « bosser » se dit…", correct: "travailler", wrong: ["bûcher", "taffer", "trimer"], explanation: "Bûcher, taffer et trimer sont aussi familiers." },
  { level: "C1", skill: "vocabulary", prompt: "Une « gageure » est…", correct: "une entreprise difficile, presque impossible", wrong: ["une garantie", "un salaire", "un pari gagné d'avance"], explanation: "Relever une gageure = réussir quelque chose de très difficile." },
  { level: "C1", skill: "vocabulary", prompt: "« Faire la sourde oreille » signifie…", correct: "faire semblant de ne pas entendre", wrong: ["être malentendant", "écouter attentivement", "parler trop fort"], explanation: "Refuser d'entendre une demande." },
  { level: "C1", skill: "vocabulary", prompt: "Quelle construction est conforme à la norme ?", correct: "pallier un manque", wrong: ["pallier à un manque", "pallier sur un manque", "pallier de un manque"], explanation: "« Pallier » est transitif direct selon la norme." },
  { level: "C1", skill: "vocabulary", prompt: "Un « atermoiement » est…", correct: "un délai, une hésitation à agir", wrong: ["un accord", "une colère", "un engagement ferme"], explanation: "Atermoyer = remettre à plus tard." },

  { level: "C1", skill: "reading", passage: C1_P1, prompt: "Selon l'auteur, l'engouement pour les circuits courts…", correct: "révèle une méfiance envers l'industrie", wrong: ["n'est qu'une mode passagère", "est accessible à tous", "est encouragé par l'industrie"], explanation: "« Traduit une défiance croissante envers l'industrie »." },
  { level: "C1", skill: "reading", passage: C1_P1, prompt: "« Encore faut-il que » introduit…", correct: "une condition restrictive", wrong: ["une conséquence", "une addition", "un exemple"], explanation: "Encore faut-il que = à condition toutefois que." },
  { level: "C1", skill: "reading", passage: C1_P1, prompt: "Quelle limite l'auteur souligne-t-il ?", correct: "le coût, qui exclut certains ménages", wrong: ["la qualité des produits", "la distance des fermes", "le manque de producteurs"], explanation: "« Tous les ménages ne peuvent s'offrir ce luxe »." },
  { level: "C1", skill: "reading", passage: C1_P2, prompt: "Le communiqué était…", correct: "très bref", wrong: ["très détaillé", "agressif", "enthousiaste"], explanation: "Laconique = qui s'exprime en peu de mots." },
  { level: "C1", skill: "reading", passage: C1_P2, prompt: "« Se garder de » signifie ici…", correct: "éviter de", wrong: ["s'empresser de", "se protéger contre", "oublier de"], explanation: "Se garder de faire quelque chose = s'en abstenir." },
  { level: "C1", skill: "reading", passage: C1_P3, prompt: "Cette phrase signifie que…", correct: "se taire peut en dire beaucoup", wrong: ["il faut toujours parler", "les discours sont inutiles", "le silence est ennuyeux"], explanation: "Un silence peut être éloquent." },
  { level: "C1", skill: "reading", passage: C1_P3, prompt: "Le registre de « Il est des… » est…", correct: "soutenu", wrong: ["familier", "courant", "argotique"], explanation: "« Il est » au sens de « il y a » appartient au registre soutenu." },

  // ---------------- C2 ----------------
  { level: "C2", skill: "grammar", prompt: "Eussé-je su la vérité, j'___ autrement.", correct: "eusse agi", wrong: ["aurai agi", "ai agi", "agissais"], explanation: "Conditionnel passé 2e forme (registre littéraire)." },
  { level: "C2", skill: "grammar", prompt: "Il fallait qu'il ___ (venir, subjonctif imparfait).", correct: "vînt", wrong: ["vint", "vienne", "viendrait"], explanation: "Subjonctif imparfait : qu'il vînt (avec accent circonflexe)." },
  { level: "C2", skill: "grammar", prompt: "Quelque ___ que soient vos efforts, ils ne suffiront pas.", correct: "grands", wrong: ["grand", "grande", "grandes"], explanation: "« Quelque » adverbe est invariable ; l'adjectif s'accorde avec « efforts »." },
  { level: "C2", skill: "grammar", prompt: "Les quelques livres qu'il a ___ lire l'ont marqué.", correct: "voulu", wrong: ["voulus", "voulue", "voulues"], explanation: "« Livres » est COD de « lire », pas de « vouloir » : participe invariable." },
  { level: "C2", skill: "grammar", prompt: "Selon la norme, après qu'il ___ parti, la réunion reprit.", correct: "fut", wrong: ["fût", "soit", "sera"], explanation: "« Après que » est suivi de l'indicatif (ici passé antérieur)." },
  { level: "C2", skill: "grammar", prompt: "Ils se sont ___ des cadeaux.", correct: "offert", wrong: ["offerts", "offertes", "offerte"], explanation: "« Se » est COI et le COD suit le verbe : pas d'accord." },
  { level: "C2", skill: "grammar", prompt: "Rien ne sert de courir ; il faut partir ___ point.", correct: "à", wrong: ["au", "de", "en"], explanation: "La Fontaine : « partir à point » = au bon moment." },

  { level: "C2", skill: "vocabulary", prompt: "La « captatio benevolentiae » désigne…", correct: "un procédé pour gagner la bienveillance de l'auditoire", wrong: ["une formule de conclusion", "une citation latine fautive", "une figure d'opposition"], explanation: "Terme de rhétorique." },
  { level: "C2", skill: "vocabulary", prompt: "« Abscons » signifie…", correct: "difficile à comprendre", wrong: ["absent", "abusif", "évident"], explanation: "Un texte abscons est obscur." },
  { level: "C2", skill: "vocabulary", prompt: "Une « litote » consiste à…", correct: "dire moins pour suggérer plus", wrong: ["exagérer", "répéter un mot", "comparer deux éléments"], explanation: "« Va, je ne te hais point » = je t'aime." },
  { level: "C2", skill: "vocabulary", prompt: "Quel exemple illustre un oxymore ?", correct: "une obscure clarté", wrong: ["un silence absolu", "un grand géant", "une belle journée"], explanation: "Deux termes contradictoires réunis (Corneille)." },
  { level: "C2", skill: "vocabulary", prompt: "« Ourdir » un complot signifie…", correct: "le tramer, le préparer secrètement", wrong: ["le dénoncer", "le déjouer", "l'abandonner"], explanation: "Ourdir = préparer en secret." },
  { level: "C2", skill: "vocabulary", prompt: "Au sens figuré, un « thuriféraire » est…", correct: "un admirateur zélé, un flatteur", wrong: ["un détracteur", "un mécène", "un traducteur"], explanation: "Celui qui « encense » quelqu'un." },
  { level: "C2", skill: "vocabulary", prompt: "« Prolixe » est le contraire de…", correct: "concis", wrong: ["bavard", "diffus", "verbeux"], explanation: "Prolixe = trop long ; concis = bref." },

  { level: "C2", skill: "reading", passage: C2_P1, prompt: "Selon l'auteur, la nostalgie est surtout…", correct: "le regret de ce que nous étions", wrong: ["le regret d'un lieu", "le désir de voyager", "la peur de vieillir"], explanation: "« Celui d'un temps où nous étions autres »." },
  { level: "C2", skill: "reading", passage: C2_P1, prompt: "Pourquoi le retour au pays natal déçoit-il ?", correct: "Nous avons changé : seul le décor demeure.", wrong: ["Les lieux ont été détruits.", "Personne ne nous reconnaît.", "Le voyage est trop long."], explanation: "« On n'y retrouve que le décor, non l'acteur »." },
  { level: "C2", skill: "reading", passage: C2_P1, prompt: "« Aussi », en tête de proposition avec inversion, signifie…", correct: "c'est pourquoi", wrong: ["également", "pourtant", "de même que"], explanation: "Aussi + inversion = par conséquent." },
  { level: "C2", skill: "reading", passage: C2_P2, prompt: "Le ton apparent du pamphlet est…", correct: "léger", wrong: ["violent", "solennel", "tragique"], explanation: "Badin = enjoué, léger." },
  { level: "C2", skill: "reading", passage: C2_P2, prompt: "Sa nature réelle est…", correct: "une critique virulente", wrong: ["un éloge", "un divertissement sans portée", "un compte rendu neutre"], explanation: "« Une charge d'une rare violence »." },
  { level: "C2", skill: "reading", passage: C2_P3, prompt: "Le sens de la phrase est…", correct: "Il est facile de prévoir le résultat.", wrong: ["Seuls les experts peuvent prévoir le résultat.", "Le résultat est imprévisible.", "Les clercs votent en grand nombre."], explanation: "Pas besoin d'être savant pour deviner." },
  { level: "C2", skill: "reading", passage: C2_P3, prompt: "« Point n'est besoin » appartient au registre…", correct: "soutenu, littéraire", wrong: ["familier", "populaire", "technique"], explanation: "Tournure négative littéraire avec inversion." },
];
