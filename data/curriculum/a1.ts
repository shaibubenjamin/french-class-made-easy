import { blank, course, mcq, reorder, translate } from "./build.ts";

export const A1 = course("A1", [
  {
    theme: "Bonjour ! Se présenter",
    vocab: [
      ["bonjour", "hello / good morning", "Bonjour, je m'appelle Léa."],
      ["au revoir", "goodbye", "Au revoir et à demain !"],
      ["s'appeler", "to be called", "Comment tu t'appelles ?"],
      ["habiter", "to live", "J'habite à Lagos."],
      ["le pays", "the country", "Quel est ton pays ?"],
      ["la ville", "the town / city", "Paris est une grande ville."],
      ["étudiant / étudiante", "student", "Je suis étudiante."],
      ["enchanté(e)", "nice to meet you", "Enchanté, Marc !"],
    ],
    grammar: {
      topic: "Le verbe être et les pronoms sujets",
      explanation:
        "Subject pronouns: je (I), tu (you, informal), il / elle / on (he / she / one), nous (we), vous (you, formal or plural), ils / elles (they).\nThe verb être (to be) is irregular: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.\nUse it for nationality, profession and description. No article before a profession: « Je suis médecin. »",
      examples: ["Je suis nigérian.", "Tu es étudiante ?", "Nous sommes à Paris.", "Ils sont professeurs."],
    },
    text: {
      title: "Au cours de français",
      body: "Bonjour ! Je m'appelle Amara. Je suis nigériane et j'habite à Abuja. Je suis étudiante en informatique. Dans mon cours de français, il y a Paul. Il est canadien. Il habite à Montréal, mais il est à Abuja pour le travail. Nous sommes amis.",
      questions: [
        ["Où habite Amara ?", "à Abuja", ["à Montréal", "à Paris", "à Lagos"], "« J'habite à Abuja. »"],
        ["Quelle est la nationalité de Paul ?", "canadienne", ["nigériane", "française", "belge"], "« Il est canadien. »"],
      ],
    },
    exercises: [
      mcq("Nous ___ étudiants.", "sommes", ["êtes", "sont", "est"], "Être with nous: nous sommes.", "etre"),
      blank("Vous ___ professeur ?", "êtes", "Être with vous: vous êtes.", "etre", ["etes"]),
      mcq("« Comment tu t'appelles ? » — « ___ Marc. »", "Je m'appelle", ["Je suis appelle", "Tu t'appelles", "Il s'appelle"], "Answer with je m'appelle + name.", "s-appeler", "vocabulary"),
      reorder("Je suis étudiant à Lyon.", "Subject + verb + complement.", "word-order"),
      translate("She is Nigerian and she lives in Lagos.", "Elle est nigériane et elle habite à Lagos.", "Nationality adjectives agree: nigérian → nigériane. Use à before a city.", "etre", ["Elle est nigériane et habite à Lagos."]),
    ],
    writing: {
      prompt: "Présentez-vous en 3 ou 4 phrases : votre nom, votre nationalité, votre ville et votre profession.",
      model: "Bonjour ! Je m'appelle Benjamin. Je suis nigérian et j'habite à Lagos. Je suis ingénieur. J'apprends le français.",
      checklist: ["Je m'appelle + prénom", "Je suis + nationalité (accord masculin/féminin)", "J'habite à + ville", "Je suis + profession (sans article)"],
    },
  },
  {
    theme: "Ma famille",
    vocab: [
      ["la mère", "the mother", "Ma mère est infirmière."],
      ["le père", "the father", "Mon père travaille à Kano."],
      ["le frère", "the brother", "J'ai un frère."],
      ["la sœur", "the sister", "Ma sœur a dix ans."],
      ["les parents", "the parents", "Mes parents habitent à Ibadan."],
      ["le fils / la fille", "the son / the daughter", "Leur fille s'appelle Aïcha."],
      ["le mari / la femme", "the husband / the wife", "Sa femme est française."],
      ["les grands-parents", "the grandparents", "Mes grands-parents sont gentils."],
    ],
    grammar: {
      topic: "Le verbe avoir et les adjectifs possessifs",
      explanation:
        "Avoir (to have): j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.\nPossessive adjectives agree with the thing owned, not the owner:\n• my: mon (m.), ma (f.), mes (pl.)\n• your: ton, ta, tes\n• his/her: son, sa, ses\nBefore a feminine noun starting with a vowel, use mon/ton/son: mon amie.",
      examples: ["J'ai deux sœurs.", "Ma mère et mon père sont à Lagos.", "Tu as tes clés ?", "Son amie est sympa."],
    },
    text: {
      title: "La famille de Chidi",
      body: "Je m'appelle Chidi. J'ai une grande famille. Mon père s'appelle Emeka et ma mère s'appelle Ngozi. J'ai deux frères et une sœur. Ma sœur a douze ans. Mes grands-parents habitent avec nous. Le dimanche, nous mangeons ensemble.",
      questions: [
        ["Combien de frères a Chidi ?", "deux", ["un", "trois", "zéro"], "« J'ai deux frères et une sœur. »"],
        ["Qui habite avec la famille ?", "les grands-parents", ["la tante", "un ami", "le cousin"], "« Mes grands-parents habitent avec nous. »"],
      ],
    },
    exercises: [
      mcq("Ils ___ trois enfants.", "ont", ["sont", "avez", "a"], "Avoir with ils: ils ont.", "avoir"),
      mcq("C'est ___ sœur.", "ma", ["mon", "mes", "le"], "Sœur is feminine singular → ma.", "possessive-adjectives"),
      blank("J'adore ___ amie Fatou. (my)", "mon", "Feminine noun starting with a vowel → mon.", "possessive-adjectives"),
      reorder("Nous avons deux enfants.", "Subject + avoir + number + noun.", "avoir"),
      translate("My parents live in Lagos.", "Mes parents habitent à Lagos.", "Plural noun → mes.", "possessive-adjectives"),
    ],
    writing: {
      prompt: "Décrivez votre famille en 4 phrases.",
      model: "J'ai une petite famille. Mon père s'appelle David et ma mère s'appelle Grace. J'ai une sœur. Elle a quinze ans.",
      checklist: ["mon / ma / mes selon le nom", "avoir pour l'âge : elle a quinze ans", "au moins trois membres de la famille"],
    },
  },
  {
    theme: "Les nombres et l'âge",
    vocab: [
      ["un, deux, trois", "one, two, three", "J'ai trois chats."],
      ["dix", "ten", "Il est dix heures."],
      ["vingt", "twenty", "J'ai vingt ans."],
      ["trente", "thirty", "Le mois a trente jours."],
      ["quarante", "forty", "Mon père a quarante-cinq ans."],
      ["cinquante", "fifty", "Ça coûte cinquante euros."],
      ["l'âge (m.)", "age", "Quel âge as-tu ?"],
      ["le numéro de téléphone", "the phone number", "Quel est ton numéro de téléphone ?"],
    ],
    grammar: {
      topic: "Dire son âge avec avoir",
      explanation:
        "French uses avoir (not être) for age: « J'ai 25 ans » = I am 25. Always say ans.\nAsk: « Quel âge as-tu ? » / « Quel âge avez-vous ? »\nNumbers 21–69: vingt et un, vingt-deux… trente et un… (et un for 21, 31, 41, 51, 61; hyphens elsewhere).",
      examples: ["J'ai vingt et un ans.", "Ma grand-mère a soixante ans.", "Quel âge a ton frère ?", "Il a trente-quatre ans."],
    },
    text: {
      title: "Une fiche d'inscription",
      body: "Nom : Diallo. Prénom : Moussa. Âge : 34 ans. Nationalité : sénégalaise. Ville : Dakar. Téléphone : 77 45 12 30. Moussa a une femme et deux enfants. Sa fille a huit ans et son fils a cinq ans.",
      questions: [
        ["Quel âge a Moussa ?", "34 ans", ["43 ans", "24 ans", "30 ans"]],
        ["Quel âge a le fils de Moussa ?", "cinq ans", ["huit ans", "deux ans", "quatre ans"], "« son fils a cinq ans »"],
      ],
    },
    exercises: [
      mcq("Comment dit-on « I am 20 » ?", "J'ai vingt ans.", ["Je suis vingt ans.", "Je suis vingt.", "J'ai vingt."], "Age uses avoir + ans.", "age", "vocabulary"),
      mcq("31 =", "trente et un", ["trente-un", "treize", "trois un"], "21, 31, 41, 51, 61 take « et un ».", "numbers", "vocabulary"),
      blank("Quel âge ___-tu ?", "as", "Avoir with tu: tu as.", "avoir"),
      reorder("Ma sœur a douze ans.", "Subject + a + number + ans.", "age"),
      translate("How old is your brother?", "Quel âge a ton frère ?", "Quel âge + avoir + subject.", "age", ["Quel âge a votre frère ?", "Ton frère a quel âge ?"]),
    ],
    writing: {
      prompt: "Écrivez votre âge et l'âge de trois personnes de votre entourage.",
      model: "J'ai vingt-huit ans. Mon frère a vingt-cinq ans. Ma mère a cinquante-deux ans. Mon ami Tunde a trente ans.",
      checklist: ["avoir + nombre + ans", "nombres écrits correctement (traits d'union)", "mon / ma selon la personne"],
    },
  },
  {
    theme: "En ville",
    vocab: [
      ["la banque", "the bank", "La banque est fermée."],
      ["la gare", "the train station", "La gare est loin."],
      ["le marché", "the market", "Il y a un marché le samedi."],
      ["l'hôpital (m.)", "the hospital", "L'hôpital est en face."],
      ["la pharmacie", "the pharmacy", "Il y a une pharmacie ici ?"],
      ["l'école (f.)", "the school", "L'école est à côté du parc."],
      ["le restaurant", "the restaurant", "C'est un bon restaurant."],
      ["la rue", "the street", "J'habite dans cette rue."],
    ],
    grammar: {
      topic: "Les articles et « il y a »",
      explanation:
        "Indefinite articles (a / some): un (m.), une (f.), des (pl.).\nDefinite articles (the): le (m.), la (f.), l' (before a vowel), les (pl.).\nUse il y a to say « there is / there are »: « Il y a une banque. » Negative: « Il n'y a pas de banque. » (un/une/des → de after negation).",
      examples: ["Il y a un marché dans mon quartier.", "La pharmacie est ouverte.", "Il n'y a pas de gare ici.", "Les restaurants sont chers."],
    },
    text: {
      title: "Mon quartier",
      body: "J'habite dans un quartier animé. Dans ma rue, il y a une boulangerie, une pharmacie et deux restaurants. L'école est à côté du parc. Il y a un grand marché le samedi. Mais il n'y a pas de gare : pour prendre le train, je vais au centre-ville.",
      questions: [
        ["Combien de restaurants y a-t-il dans la rue ?", "deux", ["un", "trois", "aucun"]],
        ["Qu'est-ce qu'il n'y a pas dans le quartier ?", "une gare", ["une école", "un marché", "une pharmacie"], "« il n'y a pas de gare »"],
      ],
    },
    exercises: [
      mcq("Il y a ___ banque dans la rue.", "une", ["un", "des", "le"], "Banque is feminine → une.", "articles"),
      mcq("Il n'y a pas ___ hôpital ici.", "d'", ["un", "l'", "des"], "After a negation, un/une/des → de (d' before a vowel).", "negation-de"),
      blank("___ école est à côté du parc. (the)", "L'", "Le/la → l' before a vowel.", "articles", ["l'"]),
      reorder("Il y a un marché le samedi.", "Il y a + noun + time.", "il-y-a"),
      translate("There is a pharmacy in my street.", "Il y a une pharmacie dans ma rue.", "Il y a = there is.", "il-y-a"),
    ],
    writing: {
      prompt: "Décrivez votre quartier : qu'est-ce qu'il y a ? Qu'est-ce qu'il n'y a pas ?",
      model: "Dans mon quartier, il y a un marché, une école et une église. Il y a aussi deux banques. Il n'y a pas de cinéma.",
      checklist: ["il y a + un / une / des", "il n'y a pas de …", "au moins quatre lieux"],
    },
  },
  {
    theme: "La maison",
    vocab: [
      ["la cuisine", "the kitchen", "Je mange dans la cuisine."],
      ["la chambre", "the bedroom", "Ma chambre est petite."],
      ["la salle de bains", "the bathroom", "La salle de bains est à droite."],
      ["le salon", "the living room", "Le salon est grand."],
      ["la table", "the table", "Les clés sont sur la table."],
      ["le lit", "the bed", "Le chat dort sur le lit."],
      ["la fenêtre", "the window", "La fenêtre est ouverte."],
      ["l'appartement (m.)", "the flat / apartment", "J'ai un appartement en ville."],
    ],
    grammar: {
      topic: "Les prépositions de lieu",
      explanation:
        "sur (on), sous (under), dans (in), devant (in front of), derrière (behind), entre (between), à côté de (next to), en face de (opposite).\nde + le → du, de + les → des: « à côté du lit », « en face des fenêtres ».",
      examples: ["Le livre est sur la table.", "Le chat est sous le lit.", "La lampe est à côté du canapé.", "La cuisine est en face de la salle de bains."],
    },
    text: {
      title: "L'appartement de Sophie",
      body: "Sophie habite dans un petit appartement. Il y a un salon, une chambre, une cuisine et une salle de bains. Dans le salon, le canapé est devant la fenêtre. La télévision est en face du canapé. Dans la chambre, le lit est entre l'armoire et le bureau.",
      questions: [
        ["Où est le canapé ?", "devant la fenêtre", ["derrière la porte", "dans la chambre", "sous la fenêtre"]],
        ["Qu'est-ce qu'il y a entre l'armoire et le bureau ?", "le lit", ["la télévision", "le canapé", "la table"]],
      ],
    },
    exercises: [
      mcq("Le chat dort ___ le lit. (under)", "sous", ["sur", "dans", "devant"], "sous = under.", "prepositions-place", "vocabulary"),
      mcq("La lampe est à côté ___ canapé.", "du", ["de le", "de la", "des"], "de + le → du.", "contractions"),
      blank("Les clés sont ___ la table. (on)", "sur", "sur = on.", "prepositions-place", [], "vocabulary"),
      reorder("La cuisine est à côté du salon.", "Subject + est + place.", "prepositions-place"),
      translate("The book is on the bed.", "Le livre est sur le lit.", "sur = on.", "prepositions-place"),
    ],
    writing: {
      prompt: "Décrivez votre chambre ou votre salon avec au moins quatre prépositions.",
      model: "Ma chambre est petite. Le lit est à côté de la fenêtre. Il y a une table devant le lit. Mes livres sont sur la table et mes chaussures sont sous le lit.",
      checklist: ["sur / sous / devant / à côté de", "du = de + le", "il y a pour présenter les objets"],
    },
  },
  {
    theme: "À table !",
    vocab: [
      ["le pain", "bread", "Je mange du pain le matin."],
      ["le riz", "rice", "Nous mangeons du riz avec du poulet."],
      ["la viande", "meat", "Il ne mange pas de viande."],
      ["le poisson", "fish", "J'aime le poisson grillé."],
      ["les légumes (m.)", "vegetables", "Les légumes sont bons pour la santé."],
      ["le fromage", "cheese", "Les Français aiment le fromage."],
      ["l'eau (f.)", "water", "Je bois de l'eau."],
      ["boire", "to drink", "Tu bois du café ?"],
    ],
    grammar: {
      topic: "Les verbes en -er et les articles partitifs",
      explanation:
        "Regular -er verbs (manger, aimer, parler): je mange, tu manges, il mange, nous mangeons, vous mangez, ils mangent.\nPartitive articles = « some »: du (m.), de la (f.), de l' (vowel), des (pl.). « Je mange du pain. »\nAfter aimer / adorer / détester use le, la, les: « J'aime le pain. »\nAfter a negation: pas de: « Je ne mange pas de viande. »",
      examples: ["Je mange du riz.", "Elle boit de l'eau.", "Nous aimons les légumes.", "Il ne boit pas de café."],
    },
    text: {
      title: "Les repas de Kofi",
      body: "Le matin, Kofi mange du pain avec de la confiture et il boit du thé. À midi, il mange du riz, du poisson et des légumes. Il adore le poisson ! Le soir, il mange une soupe. Kofi ne boit pas de soda : il boit de l'eau.",
      questions: [
        ["Que boit Kofi le matin ?", "du thé", ["du café", "du soda", "du lait"]],
        ["Qu'est-ce que Kofi ne boit pas ?", "de soda", ["d'eau", "de thé", "de jus"], "« Kofi ne boit pas de soda »"],
      ],
    },
    exercises: [
      mcq("Je mange ___ pain.", "du", ["de la", "le", "des"], "Some bread → du pain (masculine).", "partitive"),
      mcq("Il ne mange pas ___ viande.", "de", ["de la", "la", "du"], "After a negation, du / de la / des → de.", "negation-de"),
      blank("Nous ___ du riz. (manger)", "mangeons", "-ger verbs keep e with nous: nous mangeons.", "present-er"),
      reorder("Elle boit de l'eau le matin.", "Subject + verb + partitive + noun + time.", "partitive"),
      translate("I like fish but I don't eat meat.", "J'aime le poisson mais je ne mange pas de viande.", "aimer + le; negation + de.", "partitive", ["J'aime le poisson, mais je ne mange pas de viande."]),
    ],
    writing: {
      prompt: "Qu'est-ce que vous mangez et buvez pendant une journée normale ?",
      model: "Le matin, je mange du pain et je bois du café. À midi, je mange du riz avec du poulet. Le soir, je mange des légumes. Je ne bois pas d'alcool.",
      checklist: ["du / de la / des pour les quantités", "pas de après la négation", "verbes en -er bien conjugués"],
    },
  },
  {
    theme: "Ma journée",
    vocab: [
      ["se lever", "to get up", "Je me lève à six heures."],
      ["se doucher", "to shower", "Il se douche le matin."],
      ["prendre le petit-déjeuner", "to have breakfast", "Nous prenons le petit-déjeuner ensemble."],
      ["travailler", "to work", "Elle travaille dans une banque."],
      ["rentrer", "to go back home", "Je rentre à dix-huit heures."],
      ["se coucher", "to go to bed", "Tu te couches tard ?"],
      ["le matin / le soir", "morning / evening", "Le soir, je lis."],
      ["Quelle heure est-il ?", "What time is it?", "Quelle heure est-il ? Il est midi."],
    ],
    grammar: {
      topic: "L'heure et les verbes pronominaux",
      explanation:
        "Time: Il est deux heures. Il est huit heures et demie. Il est midi / minuit. « À sept heures » = at seven.\nReflexive verbs add a pronoun: je me lève, tu te lèves, il/elle se lève, nous nous levons, vous vous levez, ils/elles se lèvent.\nBefore a vowel: me → m', te → t', se → s': « Je m'habille. »",
      examples: ["Je me lève à six heures et demie.", "Il est neuf heures.", "Nous nous couchons à onze heures.", "Elle s'habille vite."],
    },
    text: {
      title: "La journée de Fatima",
      body: "Fatima se lève à six heures. Elle se douche et elle prend le petit-déjeuner à six heures et demie. Elle travaille de huit heures à seize heures dans un hôpital. Elle rentre à dix-sept heures. Le soir, elle prépare le dîner et elle se couche à dix heures.",
      questions: [
        ["À quelle heure Fatima se lève-t-elle ?", "à six heures", ["à sept heures", "à six heures et demie", "à huit heures"]],
        ["Où travaille Fatima ?", "dans un hôpital", ["dans une école", "dans une banque", "à la maison"]],
      ],
    },
    exercises: [
      mcq("Nous ___ levons à sept heures.", "nous", ["se", "vous", "me"], "Nous + nous levons.", "reflexive-verbs"),
      mcq("Comment dit-on « It's half past eight » ?", "Il est huit heures et demie.", ["Il est huit et demi heures.", "C'est demi huit.", "Il est huit heures moins demie."], "« et demie » after heures.", "time", "vocabulary"),
      blank("Elle ___ couche à dix heures.", "se", "Il / elle → se.", "reflexive-verbs"),
      reorder("Je me lève à six heures.", "Subject + reflexive pronoun + verb.", "reflexive-verbs"),
      translate("I go to bed at eleven o'clock.", "Je me couche à onze heures.", "se coucher = to go to bed.", "reflexive-verbs", ["Je me couche à 23 heures."]),
    ],
    writing: {
      prompt: "Racontez votre journée typique avec les heures.",
      model: "Je me lève à six heures. Je me douche et je prends le petit-déjeuner. Je travaille de huit heures à dix-sept heures. Je rentre à dix-huit heures et je me couche à onze heures.",
      checklist: ["verbes pronominaux : je me lève, je me couche", "à + heure", "au moins cinq actions dans l'ordre"],
    },
  },
  {
    theme: "Les vêtements et les couleurs",
    vocab: [
      ["la chemise", "the shirt", "Il porte une chemise blanche."],
      ["le pantalon", "the trousers", "J'achète un pantalon noir."],
      ["la robe", "the dress", "Elle a une belle robe rouge."],
      ["les chaussures (f.)", "the shoes", "Mes chaussures sont neuves."],
      ["porter", "to wear", "Tu portes un chapeau ?"],
      ["blanc / blanche", "white", "Une voiture blanche."],
      ["vert / verte", "green", "Des yeux verts."],
      ["cher / chère", "expensive", "Cette robe est chère."],
    ],
    grammar: {
      topic: "L'accord des adjectifs",
      explanation:
        "Adjectives agree with the noun: add -e for feminine, -s for plural: un pantalon noir, une robe noire, des chaussures noires.\nIf the adjective already ends in -e, no change in the feminine: rouge, jaune.\nIrregular: blanc → blanche, beau → belle, cher → chère.\nMost colours come after the noun: une chemise bleue.",
      examples: ["une jupe verte", "des chaussures blanches", "un beau manteau", "Elle porte une belle robe."],
    },
    text: {
      title: "Au magasin",
      body: "Aujourd'hui, Lucie cherche une tenue pour un mariage. Elle essaie une robe verte, mais elle est trop petite. Ensuite, elle trouve une robe bleue très élégante. Elle achète aussi des chaussures blanches. La robe coûte 60 euros : ce n'est pas trop cher !",
      questions: [
        ["Pourquoi Lucie n'achète-t-elle pas la robe verte ?", "Elle est trop petite.", ["Elle est trop chère.", "Elle n'aime pas le vert.", "Elle est trop grande."]],
        ["Qu'est-ce que Lucie achète ?", "une robe bleue et des chaussures blanches", ["une robe verte", "des chaussures bleues", "une chemise blanche"]],
      ],
    },
    exercises: [
      mcq("une chemise ___", "blanche", ["blanc", "blancs", "blanches"], "Feminine singular → blanche.", "adjective-agreement"),
      mcq("des pantalons ___", "noirs", ["noir", "noire", "noires"], "Masculine plural → noirs.", "adjective-agreement"),
      blank("C'est une ___ robe. (beau)", "belle", "beau → belle in the feminine.", "adjective-agreement"),
      reorder("Il porte une chemise bleue.", "Colour adjectives go after the noun.", "adjective-position"),
      translate("She is wearing green shoes.", "Elle porte des chaussures vertes.", "Feminine plural → vertes.", "adjective-agreement"),
    ],
    writing: {
      prompt: "Décrivez ce que vous portez aujourd'hui (vêtements et couleurs).",
      model: "Aujourd'hui, je porte une chemise bleue, un pantalon noir et des chaussures marron. J'ai aussi une montre grise.",
      checklist: ["accord des couleurs (féminin / pluriel)", "adjectif de couleur après le nom", "porter conjugué"],
    },
  },
  {
    theme: "Les loisirs",
    vocab: [
      ["faire du sport", "to do sport", "Je fais du sport le samedi."],
      ["jouer au football", "to play football", "Ils jouent au football au parc."],
      ["nager", "to swim", "Elle nage très bien."],
      ["lire", "to read", "Il aime lire le soir."],
      ["écouter de la musique", "to listen to music", "J'écoute de la musique dans le bus."],
      ["regarder un film", "to watch a film", "Nous regardons un film."],
      ["danser", "to dance", "Tu aimes danser ?"],
      ["le week-end", "the weekend", "Le week-end, je me repose."],
    ],
    grammar: {
      topic: "Le verbe faire et la négation ne… pas",
      explanation:
        "Faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font.\nfaire du / de la / de l' + activity: faire du vélo, faire de la natation.\njouer au / à la + sport; jouer du / de la + instrument.\nNegation surrounds the verb: ne + verb + pas. ne → n' before a vowel: « Je n'aime pas le sport. »",
      examples: ["Je fais du vélo le dimanche.", "Elle joue de la guitare.", "Nous ne regardons pas la télé.", "Il n'aime pas danser."],
    },
    text: {
      title: "Le week-end de Yao",
      body: "Le samedi matin, Yao fait du sport : il joue au basket avec ses amis. L'après-midi, il lit ou il écoute de la musique. Le soir, il regarde un film avec sa sœur. Le dimanche, il ne fait pas de sport : il se repose et il joue de la guitare.",
      questions: [
        ["Quel sport fait Yao ?", "le basket", ["le football", "la natation", "le tennis"]],
        ["Que fait Yao le dimanche ?", "Il se repose et joue de la guitare.", ["Il joue au basket.", "Il travaille.", "Il nage."]],
      ],
    },
    exercises: [
      mcq("Vous ___ du sport ?", "faites", ["faisez", "font", "fais"], "Faire with vous: vous faites (irregular).", "faire"),
      mcq("Il joue ___ piano.", "du", ["au", "de la", "le"], "Instruments: jouer du / de la.", "jouer-a-de"),
      blank("Je ___ aime pas le football.", "n'", "ne → n' before a vowel.", "negation", ["n"]),
      reorder("Nous ne regardons pas la télévision.", "ne + verb + pas.", "negation"),
      translate("They play football on Saturdays.", "Ils jouent au football le samedi.", "jouer au + sport; le samedi = every Saturday.", "jouer-a-de", ["Elles jouent au football le samedi.", "Ils jouent au foot le samedi."]),
    ],
    writing: {
      prompt: "Qu'est-ce que vous aimez faire le week-end ? Qu'est-ce que vous n'aimez pas faire ?",
      model: "Le week-end, j'aime faire du vélo et regarder des films. Je joue aussi au football avec mes amis. Je n'aime pas faire le ménage !",
      checklist: ["faire du / de la", "jouer au + sport", "une phrase négative avec ne… pas"],
    },
  },
  {
    theme: "Le temps et le calendrier",
    vocab: [
      ["lundi, mardi, mercredi…", "Monday, Tuesday, Wednesday…", "Le cours est mardi."],
      ["janvier, février…", "January, February…", "Mon anniversaire est en mars."],
      ["la saison", "the season", "L'été est ma saison préférée."],
      ["il fait chaud", "it's hot", "En avril, il fait chaud à Lagos."],
      ["il fait froid", "it's cold", "En hiver, il fait froid à Paris."],
      ["il pleut", "it's raining", "Il pleut beaucoup en juillet."],
      ["le soleil", "the sun", "Il y a du soleil aujourd'hui."],
      ["l'anniversaire (m.)", "the birthday", "Bon anniversaire !"],
    ],
    grammar: {
      topic: "La météo et les dates",
      explanation:
        "Weather uses il: il fait beau / chaud / froid; il pleut; il neige; il y a du vent / du soleil.\nDates: le + number + month: le 14 juillet (but le premier mai for the 1st).\nMonths and seasons: en janvier, en été, en automne, en hiver — but au printemps.\nDays and months take no capital letter in French.",
      examples: ["Aujourd'hui, il fait beau.", "Mon anniversaire, c'est le premier octobre.", "Au printemps, il pleut souvent.", "En décembre, il fait froid à Montréal."],
    },
    text: {
      title: "Deux climats",
      body: "Awa habite à Dakar. Chez elle, il fait chaud presque toute l'année. De juillet à octobre, il pleut souvent. Son cousin Julien habite à Québec. En hiver, il fait très froid et il neige beaucoup. Julien adore l'été parce qu'il fait beau et il y a du soleil.",
      questions: [
        ["Quand pleut-il souvent à Dakar ?", "de juillet à octobre", ["en hiver", "en janvier", "toute l'année"]],
        ["Pourquoi Julien adore-t-il l'été ?", "Il fait beau et il y a du soleil.", ["Il neige.", "Il fait froid.", "Il pleut."]],
      ],
    },
    exercises: [
      mcq("___ printemps, les fleurs sont belles.", "Au", ["En", "À la", "Le"], "Au printemps; en été / automne / hiver.", "seasons"),
      mcq("Comment dit-on « It's cold » ?", "Il fait froid.", ["Il est froid.", "C'est froid temps.", "Il a froid."], "Weather: il fait + adjective.", "weather", "vocabulary"),
      blank("Aujourd'hui, il ___. (rain)", "pleut", "pleuvoir → il pleut.", "weather", [], "vocabulary"),
      reorder("En hiver il fait froid à Paris.", "Season + weather + place.", "weather"),
      translate("My birthday is on the first of May.", "Mon anniversaire est le premier mai.", "Use premier for the 1st.", "dates", ["Mon anniversaire, c'est le premier mai.", "Mon anniversaire est le 1er mai."]),
    ],
    writing: {
      prompt: "Quel temps fait-il chez vous en ce moment ? Quelle est votre saison préférée et pourquoi ?",
      model: "Aujourd'hui, il fait chaud et il y a du soleil. Ma saison préférée est la saison des pluies parce qu'il fait moins chaud. Mon anniversaire est le 5 août.",
      checklist: ["il fait + adjectif / il pleut", "en / au + saison", "une date : le + nombre + mois"],
    },
  },
  {
    theme: "Au café",
    vocab: [
      ["un café", "a coffee", "Un café, s'il vous plaît."],
      ["un thé", "a tea", "Je voudrais un thé au citron."],
      ["un jus d'orange", "an orange juice", "Un jus d'orange pour moi."],
      ["un croissant", "a croissant", "Il prend un croissant."],
      ["l'addition (f.)", "the bill", "L'addition, s'il vous plaît !"],
      ["s'il vous plaît", "please (formal)", "Une table pour deux, s'il vous plaît."],
      ["combien ?", "how much?", "C'est combien ?"],
      ["le serveur / la serveuse", "the waiter / waitress", "La serveuse est très gentille."],
    ],
    grammar: {
      topic: "Poser des questions et « je voudrais »",
      explanation:
        "Three ways to ask a yes/no question:\n1. Intonation: Tu veux un café ?\n2. Est-ce que: Est-ce que tu veux un café ?\n3. Inversion (formal): Voulez-vous un café ?\nQuestion words: où (where), quand (when), combien (how much), qu'est-ce que (what), pourquoi (why).\nTo order politely, use je voudrais (I would like).",
      examples: ["Est-ce que vous avez du thé ?", "Je voudrais un croissant, s'il vous plaît.", "C'est combien ?", "Qu'est-ce que tu prends ?"],
    },
    text: {
      title: "Une commande",
      body: "— Bonjour, madame. Qu'est-ce que vous prenez ?\n— Bonjour ! Je voudrais un café et un croissant, s'il vous plaît.\n— Et pour monsieur ?\n— Pour moi, un jus d'orange. Est-ce que vous avez des sandwichs ?\n— Oui, jambon ou fromage.\n— Un sandwich au fromage, alors. C'est combien ?\n— Ça fait douze euros.",
      questions: [
        ["Que prend la femme ?", "un café et un croissant", ["un jus d'orange", "un sandwich au jambon", "un thé"]],
        ["Combien coûte la commande ?", "douze euros", ["deux euros", "dix euros", "vingt euros"]],
      ],
    },
    exercises: [
      mcq("___ vous avez du thé vert ?", "Est-ce que", ["Qu'est-ce que", "Est-ce", "Où"], "Est-ce que starts a yes/no question.", "questions"),
      mcq("Polite way to order:", "Je voudrais un thé.", ["Je veux thé.", "Donne-moi un thé.", "Un thé je."], "je voudrais = I would like.", "politeness", "vocabulary"),
      blank("___ coûte le croissant ? (how much)", "Combien", "combien = how much.", "questions", ["combien"], "vocabulary"),
      reorder("Je voudrais un café s'il vous plaît.", "Je voudrais + order + s'il vous plaît.", "politeness"),
      translate("Where is the waiter?", "Où est le serveur ?", "où = where.", "questions"),
    ],
    writing: {
      prompt: "Écrivez un petit dialogue au café entre vous et le serveur (4 à 6 répliques).",
      model: "— Bonjour, qu'est-ce que vous prenez ?\n— Bonjour, je voudrais un thé et un croissant, s'il vous plaît.\n— Très bien. Et avec ça ?\n— C'est tout, merci. C'est combien ?\n— Six euros.",
      checklist: ["je voudrais + commande", "une question avec est-ce que ou combien", "formules de politesse : bonjour, s'il vous plaît, merci"],
    },
  },
  {
    theme: "Où est la gare ?",
    vocab: [
      ["tout droit", "straight ahead", "Allez tout droit."],
      ["à gauche", "on the left / turn left", "Tournez à gauche."],
      ["à droite", "on the right / turn right", "La poste est à droite."],
      ["le carrefour", "the crossroads", "Au carrefour, tournez à droite."],
      ["traverser", "to cross", "Traversez la place."],
      ["loin / près", "far / near", "C'est près d'ici ?"],
      ["le plan", "the map (of a town)", "Vous avez un plan de la ville ?"],
      ["aller", "to go", "Je vais à la gare."],
    ],
    grammar: {
      topic: "Le verbe aller, à + article, et l'impératif",
      explanation:
        "Aller: je vais, tu vas, il va, nous allons, vous allez, ils vont.\nà + le → au, à + les → aux; à la and à l' don't change: je vais au marché, à la gare, à l'hôpital, aux toilettes.\nImperative (instructions): drop the subject. Tournez à gauche ! Allez tout droit ! (vous) / Tourne à gauche ! (tu: -er verbs drop the final s).",
      examples: ["Je vais au cinéma.", "Nous allons à la plage.", "Allez tout droit, puis tournez à droite.", "Traverse la rue !"],
    },
    text: {
      title: "Demander son chemin",
      body: "— Pardon, monsieur. Où est la gare, s'il vous plaît ?\n— Ce n'est pas loin. Allez tout droit jusqu'au carrefour. Là, tournez à gauche. Traversez la place, et la gare est à droite, en face de la banque.\n— C'est à combien de minutes ?\n— À dix minutes à pied.\n— Merci beaucoup !",
      questions: [
        ["Que faut-il faire au carrefour ?", "tourner à gauche", ["tourner à droite", "aller tout droit", "traverser la rue"]],
        ["Où est la gare ?", "en face de la banque", ["à côté de la poste", "derrière la place", "au carrefour"]],
      ],
    },
    exercises: [
      mcq("Je vais ___ marché.", "au", ["à le", "à la", "aux"], "à + le → au.", "contractions"),
      mcq("Ils ___ à la plage.", "vont", ["vais", "allons", "va"], "Aller with ils: ils vont.", "aller"),
      blank("___ à droite au carrefour. (turn, vous)", "Tournez", "Imperative with vous: tournez.", "imperative", ["tournez"]),
      reorder("Allez tout droit puis tournez à gauche.", "Imperative instructions.", "imperative"),
      translate("Is the hospital far from here?", "L'hôpital est loin d'ici ?", "loin de = far from.", "directions", ["Est-ce que l'hôpital est loin d'ici ?", "Est-ce que l'hôpital est loin ?"]),
    ],
    writing: {
      prompt: "Expliquez à un ami comment aller de chez vous au marché ou à l'arrêt de bus le plus proche.",
      model: "Sors de la maison et tourne à droite. Va tout droit jusqu'au carrefour. Traverse la rue et tourne à gauche. Le marché est à côté de la pharmacie. C'est à cinq minutes à pied.",
      checklist: ["impératif : va, tourne, traverse", "à gauche / à droite / tout droit", "au / à la / à l'"],
    },
  },
]);
