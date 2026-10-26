import { blank, course, mcq, reorder, translate } from "./build.ts";

export const A2 = course("A2", [
  {
    theme: "Le week-end dernier",
    vocab: [
      ["hier", "yesterday", "Hier, j'ai travaillé."],
      ["le week-end dernier", "last weekend", "Le week-end dernier, j'ai vu un film."],
      ["visiter", "to visit (a place)", "Nous avons visité le musée."],
      ["rendre visite à", "to visit (a person)", "J'ai rendu visite à ma tante."],
      ["acheter", "to buy", "Elle a acheté une robe."],
      ["voir", "to see", "Tu as vu ce film ?"],
      ["faire la fête", "to party", "Ils ont fait la fête samedi."],
      ["se reposer", "to rest", "Dimanche, je me suis reposé."],
    ],
    grammar: {
      topic: "Le passé composé avec avoir",
      explanation:
        "Passé composé = avoir (present) + past participle. It expresses completed actions in the past.\nParticiples: -er → -é (parler → parlé), -ir → -i (finir → fini), many -re → -u (vendre → vendu).\nCommon irregulars: faire → fait, voir → vu, prendre → pris, avoir → eu, être → été, boire → bu, lire → lu.\nNegation surrounds avoir: « Je n'ai pas vu le film. »",
      examples: ["J'ai mangé au restaurant.", "Nous avons fini le travail.", "Elle a pris le bus.", "Ils n'ont pas vu Paul."],
    },
    text: {
      title: "Un samedi bien rempli",
      body: "Samedi dernier, Ibrahim a fait beaucoup de choses. Le matin, il a joué au football avec ses collègues. À midi, il a déjeuné chez sa sœur et il a rendu visite à ses grands-parents. L'après-midi, il a acheté un cadeau pour l'anniversaire de sa femme. Le soir, ils ont vu un film au cinéma. Il n'a pas eu le temps de se reposer !",
      questions: [
        ["Avec qui Ibrahim a-t-il joué au football ?", "avec ses collègues", ["avec sa sœur", "avec sa femme", "avec ses grands-parents"]],
        ["Pourquoi a-t-il acheté un cadeau ?", "pour l'anniversaire de sa femme", ["pour sa sœur", "pour un collègue", "pour Noël"]],
      ],
    },
    exercises: [
      mcq("Hier, nous ___ un bon film.", "avons vu", ["avons voir", "sommes vu", "avons vus"], "voir → vu, with avoir.", "passe-compose"),
      mcq("Participe passé de « prendre » :", "pris", ["prendu", "prené", "prit"], "prendre → pris.", "past-participles"),
      blank("Elle a ___ ses devoirs. (finir)", "fini", "-ir verbs → -i.", "past-participles"),
      reorder("Je n'ai pas fait les courses.", "ne + avoir + pas + participle.", "passe-compose-negation"),
      translate("Last weekend, I visited the museum.", "Le week-end dernier, j'ai visité le musée.", "visiter a place; passé composé with avoir.", "passe-compose", ["Le week-end dernier j'ai visité le musée."]),
    ],
    writing: {
      prompt: "Racontez votre week-end dernier en 5 phrases.",
      model: "Le week-end dernier, j'ai rendu visite à mes parents. Samedi, nous avons mangé ensemble et nous avons regardé un match. Dimanche, j'ai lu un livre et j'ai fait les courses. Je n'ai pas travaillé.",
      checklist: ["avoir + participe passé", "participes irréguliers (fait, vu, lu, pris)", "une phrase négative : je n'ai pas…", "des marqueurs de temps : samedi, dimanche, le soir"],
    },
  },
  {
    theme: "Un voyage",
    vocab: [
      ["partir", "to leave", "Nous sommes partis à huit heures."],
      ["arriver", "to arrive", "Elle est arrivée à Accra."],
      ["l'avion (m.)", "the plane", "J'ai pris l'avion pour Paris."],
      ["le billet", "the ticket", "J'ai acheté un billet aller-retour."],
      ["la valise", "the suitcase", "Ma valise est lourde."],
      ["l'hôtel (m.)", "the hotel", "Nous sommes restés à l'hôtel."],
      ["descendre", "to go down / to get off", "Il est descendu du train."],
      ["les vacances (f. pl.)", "the holidays", "Les vacances sont finies."],
    ],
    grammar: {
      topic: "Le passé composé avec être",
      explanation:
        "About 15 verbs of movement / change of state take être: aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, rester, tomber, retourner, devenir, revenir.\nWith être, the participle agrees with the subject: il est parti, elle est partie, ils sont partis, elles sont parties.\nAll reflexive verbs also take être (lesson 4).",
      examples: ["Je suis allé à Dakar.", "Elle est arrivée hier.", "Nous sommes restés une semaine.", "Mes sœurs sont venues avec moi."],
    },
    text: {
      title: "Vacances à Marrakech",
      body: "En avril, Clara et sa sœur sont allées à Marrakech. Elles sont parties de Lyon en avion et elles sont arrivées le soir. Elles sont restées dix jours dans un petit hôtel. Un jour, elles sont montées dans les montagnes de l'Atlas. Malheureusement, Clara est tombée et elle s'est fait mal au pied. Elles sont rentrées un peu fatiguées mais très contentes.",
      questions: [
        ["Combien de temps sont-elles restées ?", "dix jours", ["une semaine", "deux jours", "un mois"]],
        ["Qu'est-il arrivé à Clara dans les montagnes ?", "Elle est tombée.", ["Elle s'est perdue.", "Elle a perdu sa valise.", "Elle est restée à l'hôtel."]],
      ],
    },
    exercises: [
      mcq("Elle ___ à Paris en mai.", "est allée", ["a allé", "est allé", "a allée"], "aller takes être; feminine → allée.", "passe-compose-etre"),
      mcq("Nous ___ restés à l'hôtel.", "sommes", ["avons", "êtes", "sont"], "rester takes être.", "passe-compose-etre"),
      blank("Mes parents sont ___ hier. (arriver)", "arrivés", "être + agreement: masculine plural → arrivés.", "past-participle-agreement"),
      reorder("Ils sont partis à six heures.", "Subject + être + participle + time.", "passe-compose-etre"),
      translate("She arrived in Abuja on Monday.", "Elle est arrivée à Abuja lundi.", "arriver + être; feminine agreement.", "passe-compose-etre", ["Elle est arrivée lundi à Abuja."]),
    ],
    writing: {
      prompt: "Racontez un voyage que vous avez fait : où, quand, avec qui, et ce qui s'est passé.",
      model: "L'année dernière, je suis allé à Accra avec mon frère. Nous sommes partis en bus et nous sommes arrivés le soir. Nous sommes restés cinq jours. Nous avons visité la ville et nous avons mangé du poisson. Nous sommes rentrés contents.",
      checklist: ["être avec aller, partir, arriver, rester, rentrer", "accord du participe avec être", "avoir avec les autres verbes"],
    },
  },
  {
    theme: "Au marché",
    vocab: [
      ["un kilo de", "a kilo of", "Un kilo de tomates, s'il vous plaît."],
      ["une bouteille de", "a bottle of", "Une bouteille d'eau."],
      ["un morceau de", "a piece of", "Un morceau de fromage."],
      ["beaucoup de", "a lot of", "Il y a beaucoup de monde."],
      ["un peu de", "a little", "Un peu de sel."],
      ["le vendeur / la vendeuse", "the seller", "La vendeuse est sympa."],
      ["frais / fraîche", "fresh", "Le poisson est frais ?"],
      ["Ça fait combien ?", "How much is it (total)?", "Ça fait combien, en tout ?"],
    ],
    grammar: {
      topic: "Les quantités et le pronom en",
      explanation:
        "After expressions of quantity, use de (d') without article: un kilo de riz, beaucoup d'oranges, assez de pain.\nThe pronoun en replaces de + noun (du, de la, des) and goes before the verb: « Tu veux du pain ? — Oui, j'en veux. »\nKeep the number or quantity at the end: « Tu as des enfants ? — J'en ai deux. »",
      examples: ["Je voudrais deux kilos de bananes.", "Il y a assez de lait ?", "Des tomates ? J'en prends un kilo.", "Je n'en veux pas, merci."],
    },
    text: {
      title: "Chez le marchand de légumes",
      body: "— Bonjour ! Vos tomates sont fraîches ?\n— Oui, elles sont arrivées ce matin. Vous en voulez combien ?\n— J'en voudrais deux kilos. Et vous avez des avocats ?\n— Oui, ils sont mûrs. Je vous en mets quatre ?\n— Parfait. Et un peu de persil, s'il vous plaît.\n— Voilà. Ça fait neuf euros cinquante.",
      questions: [
        ["Combien de kilos de tomates le client achète-t-il ?", "deux", ["un", "quatre", "trois"]],
        ["Combien d'avocats achète-t-il ?", "quatre", ["deux", "un", "neuf"]],
      ],
    },
    exercises: [
      mcq("Je voudrais un kilo ___ oranges.", "d'", ["des", "de les", "les"], "After a quantity: de / d' without article.", "quantities"),
      mcq("Tu bois du café ? — Oui, j'___ bois tous les jours.", "en", ["y", "le", "lui"], "en replaces du + noun.", "pronoun-en"),
      blank("Il y a beaucoup ___ monde au marché.", "de", "beaucoup de + noun.", "quantities"),
      reorder("J'en voudrais deux kilos.", "en before the verb; quantity at the end.", "pronoun-en"),
      translate("I would like a bottle of water, please.", "Je voudrais une bouteille d'eau, s'il vous plaît.", "une bouteille de → d' before a vowel.", "quantities", ["Je voudrais une bouteille d'eau s'il vous plaît."]),
    ],
    writing: {
      prompt: "Écrivez votre liste de courses pour la semaine et un petit dialogue avec un vendeur.",
      model: "Liste : un kilo de riz, six œufs, une bouteille d'huile, un peu de piment.\n— Bonjour, vous avez des œufs ?\n— Oui, vous en voulez combien ?\n— J'en voudrais six, s'il vous plaît.",
      checklist: ["quantité + de (sans article)", "le pronom en avec une quantité", "politesse : je voudrais, s'il vous plaît"],
    },
  },
  {
    theme: "Ma routine (au passé)",
    vocab: [
      ["se réveiller", "to wake up", "Je me suis réveillé tard."],
      ["s'habiller", "to get dressed", "Elle s'est habillée vite."],
      ["se brosser les dents", "to brush one's teeth", "Il se brosse les dents."],
      ["se dépêcher", "to hurry", "Dépêche-toi !"],
      ["se promener", "to go for a walk", "Nous nous sommes promenés au parc."],
      ["s'amuser", "to have fun", "Les enfants se sont bien amusés."],
      ["d'habitude", "usually", "D'habitude, je me lève tôt."],
      ["ensuite / puis", "then / next", "Ensuite, je prends le bus."],
    ],
    grammar: {
      topic: "Les verbes pronominaux au passé composé",
      explanation:
        "Reflexive verbs always use être in the passé composé: je me suis levé(e), tu t'es levé(e), il s'est levé, elle s'est levée, nous nous sommes levé(e)s, vous vous êtes levé(e)(s), ils se sont levés, elles se sont levées.\nThe participle usually agrees with the subject.\nNegation: « Je ne me suis pas réveillé. »\nLinkers for a sequence: d'abord, ensuite, puis, après, enfin.",
      examples: ["Ce matin, je me suis réveillée à sept heures.", "Ils se sont promenés sur la plage.", "Elle ne s'est pas dépêchée.", "D'abord je me suis douché, ensuite je me suis habillé."],
    },
    text: {
      title: "Un matin difficile",
      body: "D'habitude, Martin se lève à six heures. Mais hier, il ne s'est pas réveillé : son téléphone n'a pas sonné ! Il s'est levé à huit heures. Il s'est douché en deux minutes, il s'est habillé et il s'est dépêché pour prendre le bus. Il est arrivé au bureau en retard, mais son chef ne s'est pas fâché.",
      questions: [
        ["Pourquoi Martin ne s'est-il pas réveillé ?", "Son téléphone n'a pas sonné.", ["Il était malade.", "Il s'est couché tard.", "Il n'a pas de réveil."]],
        ["Comment a réagi son chef ?", "Il ne s'est pas fâché.", ["Il s'est fâché.", "Il est parti.", "Il a téléphoné."]],
      ],
    },
    exercises: [
      mcq("Elle ___ habillée en noir.", "s'est", ["a", "s'a", "est"], "Reflexive verbs use être: elle s'est habillée.", "reflexive-passe-compose"),
      mcq("Nous nous sommes ___ au parc.", "promenés", ["promené", "promener", "promenez"], "Agreement with nous (masculine plural).", "past-participle-agreement"),
      blank("Je ne me ___ pas réveillé à l'heure.", "suis", "je me suis…", "reflexive-passe-compose"),
      reorder("Ils se sont bien amusés hier.", "se + être + adverb + participle.", "reflexive-passe-compose"),
      translate("This morning, I woke up at six o'clock.", "Ce matin, je me suis réveillé à six heures.", "se réveiller + être.", "reflexive-passe-compose", ["Ce matin, je me suis réveillée à six heures.", "Ce matin je me suis réveillé à six heures."]),
    ],
    writing: {
      prompt: "Racontez votre matinée d'hier dans l'ordre (d'abord, ensuite, puis, enfin).",
      model: "Hier, je me suis réveillé à six heures. D'abord, je me suis douché. Ensuite, je me suis habillé et j'ai pris le petit-déjeuner. Puis je me suis dépêché pour prendre le bus. Enfin, je suis arrivé au travail à huit heures.",
      checklist: ["verbes pronominaux avec être", "accord du participe si nécessaire", "d'abord, ensuite, puis, enfin"],
    },
  },
  {
    theme: "Mes projets",
    vocab: [
      ["le projet", "the plan / project", "J'ai un projet pour l'été."],
      ["demain", "tomorrow", "Demain, je vais travailler."],
      ["la semaine prochaine", "next week", "La semaine prochaine, nous allons partir."],
      ["l'année prochaine", "next year", "L'année prochaine, je vais apprendre à conduire."],
      ["déménager", "to move house", "Ils vont déménager à Abuja."],
      ["chercher un emploi", "to look for a job", "Elle va chercher un emploi."],
      ["économiser", "to save money", "Je vais économiser pour un voyage."],
      ["bientôt", "soon", "À bientôt !"],
    ],
    grammar: {
      topic: "Le futur proche",
      explanation:
        "Futur proche = aller (present) + infinitive. It expresses plans and near-future actions: « Je vais partir. »\nNegation surrounds aller: « Je ne vais pas partir. »\nWith reflexive verbs, the pronoun stays before the infinitive: « Je vais me reposer. »",
      examples: ["Ce soir, nous allons regarder un match.", "Elle va commencer un nouveau travail.", "Ils ne vont pas venir.", "Je vais me coucher tôt."],
    },
    text: {
      title: "Une nouvelle vie",
      body: "Kemi va bientôt finir ses études. L'année prochaine, elle va déménager au Canada pour travailler. D'abord, elle va passer un examen de français. Ensuite, elle va chercher un appartement à Montréal. Son frère ne va pas partir avec elle, mais il va lui rendre visite en été.",
      questions: [
        ["Où Kemi va-t-elle déménager ?", "au Canada", ["en France", "en Belgique", "aux États-Unis"]],
        ["Que va faire son frère ?", "lui rendre visite en été", ["partir avec elle", "passer un examen", "chercher un appartement"]],
      ],
    },
    exercises: [
      mcq("Demain, nous ___ visiter le musée.", "allons", ["allez", "vont", "irons aller"], "Futur proche: aller + infinitive.", "futur-proche"),
      mcq("Negative: « Je vais partir. » →", "Je ne vais pas partir.", ["Je vais ne pas partir.", "Je ne vais partir pas.", "Je pas vais partir."], "ne… pas around aller.", "futur-proche"),
      blank("Ce soir, je vais ___ reposer.", "me", "Reflexive pronoun before the infinitive.", "futur-proche"),
      reorder("Ils vont déménager l'année prochaine.", "aller + infinitive + time.", "futur-proche"),
      translate("Next week, she is going to look for a job.", "La semaine prochaine, elle va chercher un emploi.", "aller + infinitive.", "futur-proche", ["La semaine prochaine, elle va chercher un travail."]),
    ],
    writing: {
      prompt: "Quels sont vos projets pour les six prochains mois ?",
      model: "Le mois prochain, je vais commencer un cours de cuisine. En juin, je vais aller à Dakar avec ma famille. Je vais aussi économiser pour acheter une voiture. Je ne vais pas changer de travail.",
      checklist: ["aller + infinitif", "marqueurs de futur : demain, le mois prochain", "une phrase négative"],
    },
  },
  {
    theme: "Chez le médecin",
    vocab: [
      ["avoir mal à", "to have a pain in", "J'ai mal à la tête."],
      ["la fièvre", "fever", "Il a de la fièvre."],
      ["tousser", "to cough", "Elle tousse beaucoup."],
      ["le médicament", "the medicine", "Prenez ce médicament trois fois par jour."],
      ["l'ordonnance (f.)", "the prescription", "Le médecin m'a donné une ordonnance."],
      ["être enrhumé", "to have a cold", "Je suis enrhumé."],
      ["se reposer", "to rest", "Il faut vous reposer."],
      ["guérir", "to get better / to cure", "Tu vas vite guérir."],
    ],
    grammar: {
      topic: "Avoir mal à et « il faut »",
      explanation:
        "avoir mal à + body part (with article): j'ai mal à la tête, au dos (à + le), aux dents (à + les), à l'oreille.\nil faut + infinitive = it is necessary to / you must: « Il faut boire de l'eau. »\nNegative: il ne faut pas = you must not.",
      examples: ["J'ai mal au ventre.", "Elle a mal aux pieds.", "Il faut prendre ce médicament.", "Il ne faut pas fumer."],
    },
    text: {
      title: "Une consultation",
      body: "— Bonjour, docteur. Depuis deux jours, j'ai mal à la gorge et je tousse.\n— Vous avez de la fièvre ?\n— Oui, un peu, 38 degrés.\n— Vous avez une angine. Il faut prendre ces médicaments pendant cinq jours. Il faut aussi boire beaucoup d'eau et vous reposer.\n— Je peux aller travailler ?\n— Non, il ne faut pas aller au travail cette semaine.",
      questions: [
        ["Depuis combien de temps le patient est-il malade ?", "deux jours", ["une semaine", "cinq jours", "un jour"]],
        ["Que dit le médecin pour le travail ?", "Il ne faut pas y aller cette semaine.", ["Il faut y aller demain.", "Il peut travailler à mi-temps.", "Il faut changer de travail."]],
      ],
    },
    exercises: [
      mcq("J'ai mal ___ dos.", "au", ["à le", "à la", "aux"], "à + le → au.", "avoir-mal-a"),
      mcq("J'ai mal ___ dents.", "aux", ["au", "à les", "des"], "à + les → aux.", "avoir-mal-a"),
      blank("Il ___ boire beaucoup d'eau.", "faut", "il faut + infinitive.", "il-faut"),
      reorder("Il ne faut pas fumer ici.", "il ne faut pas + infinitive.", "il-faut"),
      translate("I have a headache and a fever.", "J'ai mal à la tête et j'ai de la fièvre.", "avoir mal à la tête; avoir de la fièvre.", "avoir-mal-a", ["J'ai mal à la tête et de la fièvre."]),
    ],
    writing: {
      prompt: "Vous êtes malade. Écrivez un message à votre professeur ou à votre chef pour expliquer vos symptômes.",
      model: "Bonjour Madame Diop, je suis désolé, mais je ne peux pas venir aujourd'hui. J'ai de la fièvre et j'ai mal à la gorge. Le médecin dit qu'il faut me reposer deux jours. Cordialement, Benjamin.",
      checklist: ["avoir mal à + partie du corps", "il faut + infinitif", "formule d'excuse et de politesse"],
    },
  },
  {
    theme: "Souvenirs d'enfance",
    vocab: [
      ["quand j'étais petit(e)", "when I was little", "Quand j'étais petit, j'habitais à Jos."],
      ["l'enfance (f.)", "childhood", "J'ai eu une enfance heureuse."],
      ["le village", "the village", "Mes grands-parents habitaient dans un village."],
      ["souvent", "often", "Nous jouions souvent dehors."],
      ["tous les jours", "every day", "Je marchais à l'école tous les jours."],
      ["le jouet", "the toy", "Mon jouet préféré était un ballon."],
      ["gentil / gentille", "kind", "Ma maîtresse était très gentille."],
      ["avoir peur de", "to be afraid of", "J'avais peur des chiens."],
    ],
    grammar: {
      topic: "L'imparfait (formation et emploi)",
      explanation:
        "Imparfait = nous-form stem (present) without -ons + endings -ais, -ais, -ait, -ions, -iez, -aient.\nnous jouons → je jouais; nous finissons → je finissais; nous faisons → je faisais.\nOnly irregular stem: être → ét- (j'étais).\nUse it for habits, descriptions and situations in the past: « Quand j'étais petit, je jouais au foot tous les jours. »",
      examples: ["Nous habitions près de la mer.", "Il faisait toujours beau.", "Ma mère travaillait à l'hôpital.", "Tu avais un chien ?"],
    },
    text: {
      title: "Le village de mon grand-père",
      body: "Quand mon grand-père était petit, il habitait dans un village au bord d'une rivière. Il n'y avait pas d'électricité. Tous les matins, il allait chercher de l'eau avec ses frères. L'après-midi, les enfants nageaient dans la rivière et jouaient avec des jouets en bois. Le soir, sa grand-mère racontait des histoires. Il dit que c'était une enfance simple mais heureuse.",
      questions: [
        ["Qu'est-ce qu'il n'y avait pas au village ?", "d'électricité", ["d'école", "de rivière", "d'enfants"]],
        ["Que faisait la grand-mère le soir ?", "Elle racontait des histoires.", ["Elle allait chercher de l'eau.", "Elle nageait.", "Elle travaillait."]],
      ],
    },
    exercises: [
      mcq("Quand j'étais petit, je ___ au foot.", "jouais", ["ai joué", "jouerai", "joue"], "Past habit → imparfait.", "imparfait"),
      mcq("Imparfait de « être » (nous) :", "nous étions", ["nous êtions", "nous étons", "nous serions"], "être → ét- + -ions.", "imparfait"),
      blank("Ils ___ dans un petit village. (habiter)", "habitaient", "ils → -aient.", "imparfait"),
      reorder("Nous allions à la plage tous les dimanches.", "Habit with imparfait + time.", "imparfait"),
      translate("When I was a child, I was afraid of dogs.", "Quand j'étais enfant, j'avais peur des chiens.", "Description in the past → imparfait.", "imparfait", ["Quand j'étais petit, j'avais peur des chiens.", "Quand j'étais petite, j'avais peur des chiens."]),
    ],
    writing: {
      prompt: "Décrivez votre enfance : où vous habitiez, ce que vous faisiez, ce que vous aimiez.",
      model: "Quand j'étais petit, j'habitais à Enugu avec mes parents. Notre maison était près d'une école. Tous les après-midi, je jouais au football avec mes voisins. J'adorais les mangues et j'avais peur du noir.",
      checklist: ["imparfait pour les habitudes et descriptions", "quand j'étais petit(e)", "expressions de fréquence : souvent, tous les jours"],
    },
  },
  {
    theme: "Les achats en ligne",
    vocab: [
      ["commander", "to order", "J'ai commandé un livre en ligne."],
      ["livrer / la livraison", "to deliver / delivery", "La livraison est gratuite."],
      ["le colis", "the parcel", "Le colis est arrivé."],
      ["le site", "the website", "Ce site est fiable ?"],
      ["rembourser", "to refund", "Ils m'ont remboursé."],
      ["la taille", "the size", "Quelle est votre taille ?"],
      ["essayer", "to try (on)", "Je l'ai essayé, il est trop grand."],
      ["renvoyer", "to send back", "Je vais renvoyer la chemise."],
    ],
    grammar: {
      topic: "Les pronoms COD : le, la, les",
      explanation:
        "Direct object pronouns replace a noun with no preposition: me, te, le, la, nous, vous, les. le/la → l' before a vowel.\nThey go before the conjugated verb: « Je le prends. » « Tu les as ? »\nIn the passé composé, before avoir: « Je l'ai commandé. » With an infinitive, before the infinitive: « Je vais le renvoyer. »",
      examples: ["Ce pull ? Je le trouve joli.", "Mes chaussures ? Je les ai achetées en ligne.", "La robe, tu vas la garder ?", "Il ne la connaît pas."],
    },
    text: {
      title: "Un colis problématique",
      body: "La semaine dernière, Sarah a commandé une veste sur un site de mode. Le colis est arrivé en trois jours. Elle l'a ouvert tout de suite, mais la veste était trop petite. Elle l'a essayée deux fois, puis elle a décidé de la renvoyer. Le site l'a remboursée rapidement. Maintenant, elle vérifie toujours le guide des tailles.",
      questions: [
        ["Quel était le problème avec la veste ?", "Elle était trop petite.", ["Elle était sale.", "Elle n'est jamais arrivée.", "Elle était trop chère."]],
        ["Qu'est-ce que Sarah fait maintenant ?", "Elle vérifie le guide des tailles.", ["Elle n'achète plus en ligne.", "Elle achète deux tailles.", "Elle va au magasin."]],
      ],
    },
    exercises: [
      mcq("Tu prends le bus ? — Oui, je ___ prends.", "le", ["la", "les", "lui"], "le bus (masculine) → le.", "cod-pronouns"),
      mcq("Les chaussures ? Je ___ ai achetées hier.", "les", ["leur", "en", "la"], "les chaussures → les.", "cod-pronouns"),
      blank("La veste ? Je vais ___ renvoyer.", "la", "Pronoun before the infinitive.", "cod-pronouns"),
      reorder("Je l'ai commandé sur internet.", "Pronoun before avoir in the passé composé.", "cod-pronouns"),
      translate("I bought it online. (the dress)", "Je l'ai achetée en ligne.", "la robe → l'; agreement with a preceding direct object.", "cod-pronouns", ["Je l'ai achetée sur internet."]),
    ],
    writing: {
      prompt: "Racontez un achat (en ligne ou en magasin) : qu'est-ce que vous avez acheté et qu'est-ce que vous en pensez ?",
      model: "Le mois dernier, j'ai acheté un téléphone en ligne. Je l'ai reçu après une semaine. Je le trouve très pratique et je l'utilise tous les jours. Mes amis le trouvent beau aussi.",
      checklist: ["le / la / les / l' pour éviter la répétition", "pronom avant le verbe conjugué", "passé composé"],
    },
  },
  {
    theme: "Écrire à un ami",
    vocab: [
      ["envoyer", "to send", "Je t'envoie une photo."],
      ["répondre à", "to reply to", "Elle répond à ses messages."],
      ["téléphoner à", "to phone", "Je téléphone à ma mère."],
      ["donner", "to give", "Il donne un cadeau à son ami."],
      ["prêter", "to lend", "Tu me prêtes ton livre ?"],
      ["demander à", "to ask", "Demande à ton père."],
      ["Bises / Je t'embrasse", "Love / Kisses (letter ending)", "Bises, à bientôt !"],
      ["Cher / Chère", "Dear", "Chère Amina,"],
    ],
    grammar: {
      topic: "Les pronoms COI : lui, leur",
      explanation:
        "Indirect object pronouns replace à + person: me, te, lui (him / her), nous, vous, leur (them).\nVerbs with à: parler à, téléphoner à, répondre à, donner à, envoyer à, demander à.\nThey go before the verb: « Je lui parle. » « Je leur ai téléphoné. »\nlui is used for both him and her. Don't confuse leur (pronoun, no s) with leurs (their, plural).",
      examples: ["Je téléphone à Paul → Je lui téléphone.", "Elle parle à ses parents → Elle leur parle.", "Tu m'envoies le document ?", "Je ne lui ai pas répondu."],
    },
    text: {
      title: "Un message de Lisbonne",
      body: "Chère Nadia,\nJe t'écris de Lisbonne ! La ville est magnifique. Hier, j'ai rencontré tes amis portugais : je leur ai donné ton cadeau et ils te remercient. Demain, je vais téléphoner à ta sœur pour lui demander l'adresse du restaurant. Je t'envoie des photos ce soir.\nJe t'embrasse,\nAnna",
      questions: [
        ["Qu'est-ce qu'Anna a donné aux amis portugais ?", "le cadeau de Nadia", ["des photos", "une adresse", "une lettre"]],
        ["Pourquoi Anna va-t-elle téléphoner à la sœur de Nadia ?", "pour lui demander l'adresse d'un restaurant", ["pour lui envoyer des photos", "pour l'inviter", "pour lui donner un cadeau"]],
      ],
    },
    exercises: [
      mcq("Je parle à Marie. → Je ___ parle.", "lui", ["la", "leur", "le"], "à + one person → lui.", "coi-pronouns"),
      mcq("Tu réponds à tes parents ? — Oui, je ___ réponds.", "leur", ["leurs", "les", "lui"], "à + several people → leur.", "coi-pronouns"),
      blank("Je ___ ai envoyé un message. (to them)", "leur", "leur = to them.", "coi-pronouns"),
      reorder("Je lui ai téléphoné hier soir.", "Pronoun before avoir.", "coi-pronouns"),
      translate("I'm going to give him a present.", "Je vais lui donner un cadeau.", "Pronoun before the infinitive.", "coi-pronouns", ["Je vais lui offrir un cadeau."]),
    ],
    writing: {
      prompt: "Écrivez un court message à un ami pour lui raconter une nouvelle et lui demander un service.",
      model: "Cher Tolu,\nJ'ai une bonne nouvelle : j'ai trouvé un nouveau travail ! Je commence lundi. Est-ce que tu peux me prêter ta valise pour le voyage ? Je te la rends dans deux semaines. Dis bonjour à tes parents et dis-leur merci pour le dîner.\nBises,\nBen",
      checklist: ["Cher / Chère + prénom", "lui / leur / te pour éviter la répétition", "une formule de fin : Bises, À bientôt"],
    },
  },
  {
    theme: "Comparer les villes",
    vocab: [
      ["grand / petit", "big / small", "Lagos est plus grande qu'Accra."],
      ["peuplé", "populated", "C'est une ville très peuplée."],
      ["bruyant", "noisy", "Le centre est bruyant."],
      ["calme", "quiet", "Mon quartier est plus calme."],
      ["la circulation", "traffic", "Il y a beaucoup de circulation."],
      ["le coût de la vie", "the cost of living", "Le coût de la vie est élevé à Paris."],
      ["agréable", "pleasant", "C'est une ville agréable."],
      ["dangereux / dangereuse", "dangerous", "Cette route est dangereuse."],
    ],
    grammar: {
      topic: "Le comparatif et le superlatif",
      explanation:
        "Comparative: plus / moins / aussi + adjective + que: « Abuja est plus calme que Lagos. »\nWith nouns: plus de / moins de / autant de + noun + que.\nIrregular: bon → meilleur (better), bien → mieux.\nSuperlative: le / la / les plus + adjective: « la ville la plus peuplée », « le meilleur restaurant ».",
      examples: ["Le train est plus rapide que le bus.", "Il y a moins de circulation le dimanche.", "Ce restaurant est meilleur que l'autre.", "C'est la plus belle plage du pays."],
    },
    text: {
      title: "Lagos ou Abuja ?",
      body: "Tobi a habité à Lagos pendant dix ans, mais maintenant il habite à Abuja. Pour lui, Abuja est plus calme et plus propre que Lagos. Il y a moins de circulation et les routes sont plus larges. Mais Lagos est plus animée : les restaurants sont meilleurs et la vie nocturne est plus intéressante. Selon Tobi, Lagos est la ville la plus dynamique du pays.",
      questions: [
        ["Selon Tobi, quelle ville est plus calme ?", "Abuja", ["Lagos", "les deux", "aucune"]],
        ["Qu'est-ce qui est meilleur à Lagos ?", "les restaurants", ["les routes", "le calme", "la propreté"]],
      ],
    },
    exercises: [
      mcq("Ce gâteau est ___ que l'autre. (better)", "meilleur", ["plus bon", "mieux", "plus meilleur"], "bon → meilleur.", "comparative"),
      mcq("Il y a ___ voitures à Lagos qu'à Abuja.", "plus de", ["plus que", "plus des", "plus"], "With nouns: plus de + noun.", "comparative"),
      blank("C'est la ville ___ plus peuplée du pays.", "la", "Superlative: la + plus + adjective.", "superlative"),
      reorder("Le train est plus rapide que le bus.", "plus + adjective + que.", "comparative"),
      translate("My neighbourhood is quieter than the city centre.", "Mon quartier est plus calme que le centre-ville.", "plus + adjective + que.", "comparative"),
    ],
    writing: {
      prompt: "Comparez deux villes que vous connaissez (taille, circulation, coût de la vie, ambiance).",
      model: "Je connais Ibadan et Lagos. Lagos est plus grande et plus chère qu'Ibadan. Il y a plus de circulation à Lagos. Ibadan est moins bruyante, mais Lagos a les meilleurs restaurants. Pour moi, Ibadan est la ville la plus agréable pour vivre.",
      checklist: ["plus / moins / aussi + adjectif + que", "plus de / moins de + nom", "un superlatif : le / la plus…"],
    },
  },
  {
    theme: "Le logement",
    vocab: [
      ["le loyer", "the rent", "Le loyer est de 500 euros."],
      ["le propriétaire", "the landlord / owner", "Le propriétaire habite à côté."],
      ["louer", "to rent", "Nous louons un appartement."],
      ["meublé", "furnished", "Je cherche un studio meublé."],
      ["l'étage (m.)", "the floor (storey)", "J'habite au troisième étage."],
      ["l'ascenseur (m.)", "the lift / elevator", "Il n'y a pas d'ascenseur."],
      ["lumineux / lumineuse", "bright", "La chambre est lumineuse."],
      ["le voisin / la voisine", "the neighbour", "Mes voisins sont bruyants."],
    ],
    grammar: {
      topic: "Les pronoms relatifs qui et que",
      explanation:
        "Relative pronouns join two sentences.\nqui = subject of the next verb: « C'est un appartement qui a deux chambres. »\nque (qu') = direct object (followed by a subject + verb): « C'est l'appartement que je loue. »\nque → qu' before a vowel, but qui never changes.",
      examples: ["J'ai un voisin qui joue du piano.", "La maison que nous avons visitée est grande.", "C'est une rue qui est très calme.", "Le studio qu'il loue est meublé."],
    },
    text: {
      title: "Petite annonce",
      body: "À louer : appartement de 60 m² qui se trouve au deuxième étage d'un immeuble calme, près de la gare. Il a deux chambres lumineuses et une cuisine équipée. Le salon, que les anciens locataires ont repeint, donne sur un jardin. Loyer : 650 euros par mois, charges comprises. Pas d'animaux. Contactez le propriétaire, qui répond le soir.",
      questions: [
        ["À quel étage est l'appartement ?", "au deuxième étage", ["au rez-de-chaussée", "au troisième étage", "au premier étage"]],
        ["Qu'est-ce qui est interdit ?", "les animaux", ["les enfants", "fumer", "la musique"]],
      ],
    },
    exercises: [
      mcq("C'est un quartier ___ est très animé.", "qui", ["que", "qu'", "où"], "Subject of « est » → qui.", "relative-pronouns"),
      mcq("L'appartement ___ nous louons est petit.", "que", ["qui", "dont", "où"], "Object of « louons » (subject nous) → que.", "relative-pronouns"),
      blank("Le voisin ___ habite en face est médecin.", "qui", "qui + verb.", "relative-pronouns"),
      reorder("C'est la maison que j'ai achetée.", "que + subject + verb.", "relative-pronouns"),
      translate("I am looking for a flat that has a balcony.", "Je cherche un appartement qui a un balcon.", "qui = subject of « a ».", "relative-pronouns"),
    ],
    writing: {
      prompt: "Décrivez votre logement idéal en utilisant qui et que.",
      model: "Je voudrais une maison qui est proche de la mer. Elle a un jardin que je peux cultiver et une cuisine qui est grande. Je voudrais des voisins qui sont calmes et un loyer que je peux payer facilement.",
      checklist: ["qui + verbe", "que + sujet + verbe", "vocabulaire du logement"],
    },
  },
  {
    theme: "Les transports",
    vocab: [
      ["prendre le bus / le train", "to take the bus / train", "Je prends le bus tous les jours."],
      ["à pied", "on foot", "Je vais au bureau à pied."],
      ["en voiture", "by car", "Ils voyagent en voiture."],
      ["à vélo", "by bike", "Elle va à l'école à vélo."],
      ["l'arrêt (m.) de bus", "the bus stop", "L'arrêt de bus est en face."],
      ["le retard", "the delay", "Le train a vingt minutes de retard."],
      ["les embouteillages (m.)", "traffic jams", "Il y a des embouteillages le matin."],
      ["le trajet", "the journey / commute", "Mon trajet dure une heure."],
    ],
    grammar: {
      topic: "Le pronom y et le verbe prendre",
      explanation:
        "y replaces a place introduced by à, en, dans, chez…: « Tu vas à la gare ? — Oui, j'y vais. » It goes before the verb.\nprendre: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent.\nMeans of transport: en bus / en voiture / en train / en avion, but à pied / à vélo / à moto.",
      examples: ["Tu vas à Lagos ? — J'y vais demain.", "Nous prenons le métro.", "Elle y travaille depuis deux ans.", "Je n'y vais jamais en voiture."],
    },
    text: {
      title: "Le trajet de Musa",
      body: "Musa travaille dans le centre-ville. Avant, il y allait en voiture, mais il y avait trop d'embouteillages : son trajet durait une heure et demie ! Maintenant, il prend le train. La gare est à dix minutes de chez lui, alors il y va à pied. Le train a parfois du retard, mais Musa peut lire pendant le trajet.",
      questions: [
        ["Pourquoi Musa ne va-t-il plus au travail en voiture ?", "à cause des embouteillages", ["sa voiture est en panne", "l'essence est chère", "il n'a pas de permis"]],
        ["Comment va-t-il à la gare ?", "à pied", ["en bus", "à vélo", "en taxi"]],
      ],
    },
    exercises: [
      mcq("Tu vas au marché ? — Oui, j'___ vais.", "y", ["en", "le", "lui"], "y replaces à + place.", "pronoun-y"),
      mcq("Nous ___ le train à huit heures.", "prenons", ["prennons", "prendons", "prenez"], "prendre with nous: prenons.", "prendre"),
      blank("Je vais au travail ___ pied.", "à", "à pied / à vélo.", "transport-prepositions"),
      reorder("Ils prennent le bus tous les matins.", "Subject + prendre + transport + time.", "prendre"),
      translate("I go there by train.", "J'y vais en train.", "y before the verb; en train.", "pronoun-y"),
    ],
    writing: {
      prompt: "Décrivez votre trajet quotidien : moyen de transport, durée, problèmes.",
      model: "Je vais au travail en bus. Je prends le bus à sept heures à l'arrêt devant ma maison. Le trajet dure quarante minutes. Le matin, il y a souvent des embouteillages. Le vendredi, j'y vais à pied parce que c'est plus calme.",
      checklist: ["en bus / à pied / à vélo", "le pronom y", "prendre bien conjugué"],
    },
  },
]);
