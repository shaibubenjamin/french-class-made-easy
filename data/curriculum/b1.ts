import { blank, course, mcq, reorder, translate } from "./build.ts";

export const B1 = course("B1", [
  {
    theme: "Raconter une histoire",
    vocab: [
      ["soudain / tout à coup", "suddenly", "Tout à coup, la lumière s'est éteinte."],
      ["pendant que", "while", "Pendant que je cuisinais, il est arrivé."],
      ["se rendre compte", "to realise", "Je me suis rendu compte de mon erreur."],
      ["une panne", "a breakdown", "La voiture est tombée en panne."],
      ["un inconnu", "a stranger", "Un inconnu m'a aidé."],
      ["heureusement", "fortunately", "Heureusement, personne n'était blessé."],
      ["malheureusement", "unfortunately", "Malheureusement, il pleuvait."],
      ["finalement", "in the end", "Finalement, tout s'est bien passé."],
    ],
    grammar: {
      topic: "Imparfait ou passé composé ?",
      explanation:
        "In a story, the two tenses work together:\n• Imparfait = the background: description, weather, feelings, ongoing actions, habits. « Il faisait nuit, je rentrais chez moi… »\n• Passé composé = the events: completed, specific actions that move the story forward. « … quand j'ai entendu un bruit. »\nTypical pattern: imparfait (ongoing) + quand + passé composé (interruption).",
      examples: ["Je dormais quand le téléphone a sonné.", "Il pleuvait, alors nous sommes restés à la maison.", "Elle était fatiguée, mais elle a fini son travail.", "Pendant que nous mangions, il est parti."],
    },
    text: {
      title: "Une panne sur la route",
      body: "C'était un dimanche soir de juillet. Il faisait chaud et nous rentrions de la plage en voiture. Les enfants dormaient à l'arrière. Tout à coup, le moteur a fait un bruit étrange et la voiture s'est arrêtée. Il n'y avait personne sur la route et mon téléphone n'avait plus de batterie. Après vingt minutes, un inconnu s'est arrêté. Il était mécanicien ! Il a réparé la voiture en dix minutes et il n'a pas voulu d'argent. Finalement, nous sommes arrivés à la maison à minuit.",
      questions: [
        ["Que faisaient les enfants quand la voiture s'est arrêtée ?", "Ils dormaient.", ["Ils jouaient.", "Ils mangeaient.", "Ils chantaient."]],
        ["Qui a aidé la famille ?", "un mécanicien qui passait", ["un policier", "un voisin", "un ami de la famille"]],
      ],
    },
    exercises: [
      mcq("Je ___ un livre quand Paul est entré.", "lisais", ["ai lu", "lirai", "lis"], "Ongoing action interrupted → imparfait.", "imparfait-passe-compose"),
      mcq("Il faisait beau, alors nous ___ à la plage.", "sommes allés", ["allions", "irons", "allons"], "A specific completed event → passé composé.", "imparfait-passe-compose"),
      blank("Quand j'___ jeune, je jouais du piano. (être)", "étais", "Description / state in the past → imparfait.", "imparfait"),
      reorder("Nous dormions quand l'orage a commencé.", "Imparfait + quand + passé composé.", "imparfait-passe-compose"),
      translate("It was raining when I left the house.", "Il pleuvait quand je suis sorti de la maison.", "Background (imparfait) + event (passé composé).", "imparfait-passe-compose", ["Il pleuvait quand je suis sortie de la maison.", "Il pleuvait quand j'ai quitté la maison."]),
    ],
    writing: {
      prompt: "Racontez un souvenir surprenant ou un petit incident (100 mots).",
      model: "L'année dernière, je rentrais du travail en bus. Il était tard et il pleuvait beaucoup. Je regardais mon téléphone quand une femme s'est assise à côté de moi. Elle m'a souri : c'était ma maîtresse d'école primaire ! Nous ne nous étions pas vus depuis vingt ans. Nous avons parlé pendant tout le trajet et nous avons échangé nos numéros. Depuis, nous nous écrivons souvent.",
      checklist: ["imparfait pour le décor et les actions en cours", "passé composé pour les événements", "connecteurs : soudain, ensuite, finalement"],
    },
  },
  {
    theme: "Le monde du travail",
    vocab: [
      ["l'entretien (m.) d'embauche", "the job interview", "J'ai un entretien d'embauche demain."],
      ["le CV", "the CV / résumé", "Envoyez votre CV par e-mail."],
      ["le poste", "the position / job", "Je postule pour ce poste."],
      ["postuler", "to apply", "Elle a postulé chez Total."],
      ["le salaire", "the salary", "Le salaire est intéressant."],
      ["l'expérience (f.)", "experience", "J'ai trois ans d'expérience."],
      ["embaucher", "to hire", "L'entreprise va embaucher dix personnes."],
      ["une augmentation", "a pay rise", "J'espère avoir une augmentation."],
    ],
    grammar: {
      topic: "Le futur simple",
      explanation:
        "Futur simple = infinitive + -ai, -as, -a, -ons, -ez, -ont (drop the final -e of -re verbs): je travaillerai, tu finiras, il prendra.\nIrregular stems: être → ser-, avoir → aur-, aller → ir-, faire → fer-, pouvoir → pourr-, venir → viendr-, voir → verr-, vouloir → voudr-, devoir → devr-.\nUse it for predictions, promises and plans in the more distant future. After quand referring to the future, French uses the futur: « Quand je serai riche… »",
      examples: ["Je commencerai lundi.", "Nous aurons une réponse demain.", "Quand tu seras à Paris, tu m'appelleras.", "Ils feront une réunion vendredi."],
    },
    text: {
      title: "Le premier jour",
      body: "Chère Mme Okafor,\nNous avons le plaisir de vous confirmer votre embauche au poste d'assistante commerciale. Vous commencerez le lundi 3 mars à 9 heures. Le premier jour, vous rencontrerez l'équipe et vous visiterez les locaux. Votre responsable, M. Lambert, vous expliquera vos missions. Vous aurez une période d'essai de trois mois. Nous serons ravis de vous accueillir.\nCordialement,\nLe service des ressources humaines",
      questions: [
        ["Quel poste Mme Okafor a-t-elle obtenu ?", "assistante commerciale", ["responsable d'équipe", "directrice", "comptable"]],
        ["Combien de temps dure la période d'essai ?", "trois mois", ["un mois", "six mois", "une semaine"]],
      ],
    },
    exercises: [
      mcq("Demain, nous ___ une réunion. (avoir)", "aurons", ["avrons", "avons", "aurions"], "avoir → aur-.", "futur-simple"),
      mcq("Quand il ___ le diplôme, il cherchera un poste.", "aura", ["a", "avait", "aurait"], "quand + future meaning → futur simple.", "futur-simple"),
      blank("L'année prochaine, je ___ en France. (aller)", "irai", "aller → ir-.", "futur-simple"),
      reorder("Vous recevrez une réponse la semaine prochaine.", "Subject + futur + object + time.", "futur-simple"),
      translate("When I am in Paris, I will visit the Louvre.", "Quand je serai à Paris, je visiterai le Louvre.", "Futur after quand in French.", "futur-simple"),
    ],
    writing: {
      prompt: "Imaginez votre vie professionnelle dans dix ans.",
      model: "Dans dix ans, je serai chef de projet dans une entreprise internationale. Je travaillerai avec des équipes en France et au Canada, donc je parlerai français tous les jours. J'aurai une maison avec un jardin et je pourrai voyager souvent. Quand j'aurai assez d'expérience, je créerai ma propre entreprise.",
      checklist: ["futur simple régulier et irrégulier (serai, aurai, pourrai)", "quand + futur", "vocabulaire du travail"],
    },
  },
  {
    theme: "Si j'avais le choix…",
    vocab: [
      ["gagner au loto", "to win the lottery", "Si je gagnais au loto, j'achèterais une maison."],
      ["rêver de", "to dream of", "Elle rêve de voyager."],
      ["un tour du monde", "a round-the-world trip", "Ils ont fait un tour du monde."],
      ["le bénévolat", "volunteering", "Je fais du bénévolat le samedi."],
      ["aider", "to help", "J'aimerais aider les autres."],
      ["à ta place", "if I were you", "À ta place, je partirais."],
      ["le conseil", "advice", "Tu peux me donner un conseil ?"],
      ["il vaudrait mieux", "it would be better", "Il vaudrait mieux attendre."],
    ],
    grammar: {
      topic: "Le conditionnel présent et l'hypothèse avec si",
      explanation:
        "Conditionnel présent = future stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient): je voudrais, tu serais, nous ferions.\nUses: wishes (j'aimerais), polite requests (pourriez-vous…), advice (tu devrais…), and imaginary situations.\nHypothesis: si + imparfait → conditionnel. « Si j'avais le temps, je voyagerais. »\nNever put the conditionnel right after si.",
      examples: ["Si j'étais riche, j'aiderais ma famille.", "Tu devrais te reposer.", "Pourriez-vous m'aider ?", "S'il faisait beau, nous irions à la plage."],
    },
    text: {
      title: "Et si… ?",
      body: "On a demandé à trois personnes ce qu'elles feraient si elles gagnaient un million d'euros. Aïcha, 24 ans, ferait le tour du monde et visiterait l'Amérique du Sud. Paul, 45 ans, ne quitterait pas son travail : il paierait la maison de ses parents et il donnerait de l'argent à une association. Quant à Mariam, elle ouvrirait une école dans son village. « Si j'avais cet argent, dit-elle, je voudrais qu'il serve à tout le monde. »",
      questions: [
        ["Que ferait Paul ?", "Il aiderait ses parents et une association.", ["Il quitterait son travail.", "Il ferait le tour du monde.", "Il ouvrirait une école."]],
        ["Quel est le projet de Mariam ?", "ouvrir une école dans son village", ["visiter l'Amérique du Sud", "acheter une maison", "créer une entreprise"]],
      ],
    },
    exercises: [
      mcq("Si j'avais le temps, je ___ plus de sport.", "ferais", ["ferai", "fais", "faisais"], "si + imparfait → conditionnel.", "conditional-si"),
      mcq("Si nous ___ riches, nous voyagerions.", "étions", ["serions", "sommes", "serons"], "Never the conditionnel after si: si + imparfait.", "conditional-si"),
      blank("Tu ___ voir un médecin. (devoir – advice)", "devrais", "Advice: conditionnel of devoir.", "conditional"),
      reorder("Pourriez-vous fermer la fenêtre s'il vous plaît.", "Polite request with the conditionnel.", "conditional"),
      translate("If I won the lottery, I would buy a house for my mother.", "Si je gagnais au loto, j'achèterais une maison pour ma mère.", "si + imparfait, conditionnel.", "conditional-si", ["Si je gagnais à la loterie, j'achèterais une maison pour ma mère."]),
    ],
    writing: {
      prompt: "Que feriez-vous si vous pouviez changer une chose dans votre ville ?",
      model: "Si je pouvais changer une chose dans ma ville, je construirais plus de parcs. Les enfants auraient des endroits sûrs pour jouer et les familles pourraient se promener le week-end. Si la mairie plantait des arbres, il ferait moins chaud en été. À mon avis, la ville serait plus agréable pour tout le monde.",
      checklist: ["si + imparfait", "conditionnel dans la proposition principale", "au moins trois conséquences"],
    },
  },
  {
    theme: "Donner son opinion",
    vocab: [
      ["à mon avis", "in my opinion", "À mon avis, c'est une bonne idée."],
      ["d'après moi", "according to me", "D'après moi, il a raison."],
      ["être d'accord avec", "to agree with", "Je suis d'accord avec toi."],
      ["avoir raison / tort", "to be right / wrong", "Tu as tort."],
      ["un avantage / un inconvénient", "an advantage / a drawback", "Le télétravail a des avantages."],
      ["d'un côté… de l'autre", "on one hand… on the other", "D'un côté c'est pratique, de l'autre c'est cher."],
      ["en effet", "indeed", "En effet, les prix ont augmenté."],
      ["pourtant", "yet / however", "Il est riche ; pourtant, il n'est pas heureux."],
    ],
    grammar: {
      topic: "Exprimer et justifier une opinion",
      explanation:
        "Give an opinion: je pense que, je crois que, je trouve que, il me semble que + indicative.\nJustify: parce que, car, puisque (since, obvious reason), comme (at the start of a sentence).\nContrast: mais, pourtant, cependant, par contre.\nNote: in the negative, je ne pense pas que / je ne crois pas que are followed by the subjunctive (you'll study it at B2): « Je ne pense pas qu'il soit là. »",
      examples: ["Je trouve que ce film est trop long.", "Je pense qu'il a raison, car il connaît bien le sujet.", "Comme il pleut, je reste ici.", "C'est cher ; pourtant, beaucoup de gens l'achètent."],
    },
    text: {
      title: "Faut-il interdire les téléphones à l'école ?",
      body: "Pour Mme Dupont, professeure, les téléphones devraient être interdits en classe. Elle pense que les élèves se concentrent mieux sans écran et qu'ils parlent davantage entre eux. Son collègue M. Ba n'est pas d'accord. D'après lui, le téléphone peut être un outil pédagogique : on peut chercher une information ou utiliser un dictionnaire. Pourtant, il reconnaît qu'il faut des règles claires. Les parents, eux, sont divisés.",
      questions: [
        ["Quelle est la position de Mme Dupont ?", "Elle veut interdire les téléphones en classe.", ["Elle veut les autoriser.", "Elle n'a pas d'avis.", "Elle veut des règles plus souples."]],
        ["Qu'est-ce que M. Ba reconnaît ?", "qu'il faut des règles claires", ["que le téléphone est inutile", "que Mme Dupont a raison", "que les parents sont d'accord"]],
      ],
    },
    exercises: [
      mcq("Je pense qu'il ___ raison.", "a", ["ait", "ayant", "avoir"], "je pense que + indicative.", "opinion"),
      mcq("Il est fatigué ; ___, il continue à travailler.", "pourtant", ["parce que", "donc", "car"], "Contrast → pourtant.", "connectors", "vocabulary"),
      blank("___ il fait beau, nous allons sortir. (as – at the start)", "Comme", "comme at the start of a sentence = since / as.", "connectors", ["comme"]),
      reorder("À mon avis le télétravail a beaucoup d'avantages.", "Opinion phrase + statement.", "opinion"),
      translate("I agree with you because it's a good idea.", "Je suis d'accord avec toi parce que c'est une bonne idée.", "être d'accord avec + parce que.", "opinion", ["Je suis d'accord avec vous parce que c'est une bonne idée.", "Je suis d'accord avec toi car c'est une bonne idée."]),
    ],
    writing: {
      prompt: "Le télétravail : êtes-vous pour ou contre ? Donnez votre avis avec deux arguments (100 mots).",
      model: "À mon avis, le télétravail est une bonne chose, mais pas tous les jours. D'un côté, on gagne du temps car on ne perd pas deux heures dans les transports. En effet, à Lagos, les embouteillages sont terribles. De l'autre côté, on se sent parfois seul et on communique moins bien avec ses collègues. Pourtant, avec deux ou trois jours au bureau, je pense qu'on peut trouver un bon équilibre.",
      checklist: ["à mon avis / je pense que", "deux arguments justifiés (car, parce que, en effet)", "une concession (pourtant, de l'autre côté)"],
    },
  },
  {
    theme: "L'environnement",
    vocab: [
      ["les déchets (m.)", "waste", "Il faut réduire nos déchets."],
      ["recycler", "to recycle", "Nous recyclons le plastique."],
      ["la pollution", "pollution", "La pollution de l'air est grave."],
      ["le réchauffement climatique", "global warming", "Le réchauffement climatique menace les côtes."],
      ["gaspiller", "to waste", "Ne gaspille pas l'eau !"],
      ["l'énergie (f.) solaire", "solar energy", "Ils utilisent l'énergie solaire."],
      ["protéger", "to protect", "Il faut protéger les forêts."],
      ["la sécheresse", "drought", "La sécheresse touche le Sahel."],
    ],
    grammar: {
      topic: "Les pronoms relatifs dont et où",
      explanation:
        "dont replaces de + noun: parler de, avoir besoin de, avoir peur de, être fier de… « C'est le projet dont je t'ai parlé. » It also expresses possession: « une ville dont les rues sont propres » (whose).\noù replaces a place or a time: « la ville où j'habite », « le jour où je suis arrivé ».",
      examples: ["Voici le livre dont j'ai besoin.", "C'est un problème dont tout le monde parle.", "La région où il vit manque d'eau.", "Je me souviens de l'année où il a beaucoup plu."],
    },
    text: {
      title: "Un village solaire",
      body: "Dans le nord du Burkina Faso, il y a un village où les habitants ont installé des panneaux solaires. Avant, ils utilisaient des générateurs dont le bruit et la fumée posaient des problèmes. Aujourd'hui, l'école a de la lumière le soir et le centre de santé peut conserver des médicaments au froid. Le projet dont tout le monde est fier a été financé par une coopérative de femmes. D'autres villages veulent maintenant suivre cet exemple.",
      questions: [
        ["Quel problème posaient les générateurs ?", "le bruit et la fumée", ["le prix des panneaux", "la sécheresse", "le manque de médicaments"]],
        ["Qui a financé le projet ?", "une coopérative de femmes", ["le gouvernement", "une entreprise étrangère", "l'école"]],
      ],
    },
    exercises: [
      mcq("C'est le film ___ je t'ai parlé.", "dont", ["que", "où", "qui"], "parler de → dont.", "relative-dont"),
      mcq("La ville ___ je suis né est au bord de la mer.", "où", ["dont", "que", "qui"], "Place → où.", "relative-ou"),
      blank("Voici l'outil ___ tu as besoin.", "dont", "avoir besoin de → dont.", "relative-dont"),
      reorder("C'est un pays où il fait toujours chaud.", "où for a place.", "relative-ou"),
      translate("This is the problem everyone is talking about.", "C'est le problème dont tout le monde parle.", "parler de → dont.", "relative-dont", ["Voici le problème dont tout le monde parle."]),
    ],
    writing: {
      prompt: "Quels gestes faites-vous (ou pourriez-vous faire) pour protéger l'environnement ?",
      model: "Chez moi, nous essayons de réduire nos déchets. Nous recyclons les bouteilles en plastique et nous utilisons des sacs en tissu dont nous avons toujours besoin au marché. Je ne gaspille pas l'eau et j'éteins la lumière quand je quitte une pièce. Dans le quartier où j'habite, il n'y a pas de bus, mais je voudrais faire plus de trajets à vélo.",
      checklist: ["dont et où correctement utilisés", "vocabulaire de l'environnement", "au moins trois actions concrètes"],
    },
  },
  {
    theme: "Les médias et l'information",
    vocab: [
      ["les informations / les infos (f.)", "the news", "Je regarde les infos le soir."],
      ["un article", "an article", "J'ai lu un article intéressant."],
      ["le journaliste", "the journalist", "Le journaliste a interviewé le ministre."],
      ["une fausse information", "fake news", "Attention aux fausses informations !"],
      ["les réseaux sociaux", "social media", "Elle passe trop de temps sur les réseaux sociaux."],
      ["annoncer", "to announce", "Le gouvernement a annoncé une réforme."],
      ["affirmer", "to state / claim", "Il affirme qu'il est innocent."],
      ["vérifier", "to check", "Il faut vérifier la source."],
    ],
    grammar: {
      topic: "Le discours indirect (au présent)",
      explanation:
        "Reported speech with a verb in the present (il dit, elle explique, ils affirment):\n• statement → que: « Je suis fatigué. » → Il dit qu'il est fatigué.\n• yes/no question → si: « Tu viens ? » → Elle demande si je viens.\n• question word stays: « Où vas-tu ? » → Il demande où je vais.\n• qu'est-ce que → ce que: « Qu'est-ce que tu veux ? » → Il demande ce que je veux.\n• imperative → de + infinitive: « Viens ! » → Il me dit de venir.\nPronouns and possessives change to fit the new speaker.",
      examples: ["Le ministre affirme que la situation s'améliore.", "Ma mère demande si nous venons dimanche.", "Il me demande ce que je fais ce soir.", "Le médecin me dit de rester au lit."],
    },
    text: {
      title: "Une interview",
      body: "La journaliste demande à la chanteuse Aya ce qu'elle prépare en ce moment. Aya répond qu'elle enregistre un nouvel album et qu'il sortira en septembre. La journaliste veut savoir si elle fera une tournée en Afrique. La chanteuse explique qu'elle donnera des concerts à Abidjan, Dakar et Lagos. Enfin, elle conseille aux jeunes artistes de ne jamais abandonner.",
      questions: [
        ["Quand l'album sortira-t-il ?", "en septembre", ["en juin", "l'année prochaine", "en décembre"]],
        ["Quel conseil Aya donne-t-elle aux jeunes artistes ?", "de ne jamais abandonner", ["de partir en tournée", "d'étudier la musique", "d'utiliser les réseaux sociaux"]],
      ],
    },
    exercises: [
      mcq("« Tu as faim ? » → Il me demande ___ j'ai faim.", "si", ["que", "ce que", "qu'est-ce que"], "Yes/no question → si.", "reported-speech"),
      mcq("« Qu'est-ce que tu lis ? » → Elle demande ___ je lis.", "ce que", ["qu'est-ce que", "que", "quoi"], "qu'est-ce que → ce que.", "reported-speech"),
      blank("« Ferme la porte ! » → Il me dit ___ fermer la porte.", "de", "Imperative → de + infinitive.", "reported-speech"),
      reorder("Elle dit qu'elle arrivera demain.", "dit que + clause.", "reported-speech"),
      translate("He asks where we live.", "Il demande où nous habitons.", "Question word stays; no inversion.", "reported-speech", ["Il demande où on habite."]),
    ],
    writing: {
      prompt: "Rapportez une conversation récente avec un ami ou un collègue au discours indirect.",
      model: "Hier, mon collègue m'a appelé. Il me dit qu'il cherche un nouvel appartement et il me demande si je connais un bon quartier. Je lui réponds que Yaba est pratique. Il veut savoir combien coûte le loyer. Je lui conseille de regarder sur internet et de visiter avant de signer.",
      checklist: ["que / si / ce que / où", "de + infinitif pour les ordres et conseils", "changement des pronoms"],
    },
  },
  {
    theme: "La santé et le bien-être",
    vocab: [
      ["le sommeil", "sleep", "Le sommeil est essentiel."],
      ["le stress", "stress", "Le sport réduit le stress."],
      ["une alimentation équilibrée", "a balanced diet", "Il faut une alimentation équilibrée."],
      ["faire de l'exercice", "to exercise", "Je fais de l'exercice trois fois par semaine."],
      ["prendre soin de", "to take care of", "Prends soin de toi."],
      ["être en forme", "to be fit / well", "Je suis en forme aujourd'hui."],
      ["se sentir", "to feel", "Je me sens mieux."],
      ["éviter", "to avoid", "Évitez le sucre."],
    ],
    grammar: {
      topic: "Le plus-que-parfait",
      explanation:
        "Plus-que-parfait = avoir / être in the imparfait + past participle: j'avais mangé, elle était partie.\nIt expresses an action that happened BEFORE another past action: « Quand je suis arrivé, le film avait déjà commencé. »\nSame rules as the passé composé for être / avoir and agreement.",
      examples: ["Il était fatigué parce qu'il avait mal dormi.", "Nous avions déjà mangé quand ils sont arrivés.", "Elle m'a dit qu'elle était allée chez le médecin.", "Je n'avais jamais fait de yoga avant."],
    },
    text: {
      title: "Un changement de vie",
      body: "L'année dernière, Daniel se sentait toujours fatigué. Il avait pris dix kilos et il dormait mal. Il avait travaillé sans vacances pendant trois ans. Un jour, son médecin lui a conseillé de changer ses habitudes. Daniel a commencé à marcher trente minutes par jour et il a arrêté les boissons sucrées. Six mois plus tard, il avait perdu huit kilos et il se sentait beaucoup plus en forme.",
      questions: [
        ["Pourquoi Daniel était-il fatigué ?", "Il avait travaillé sans vacances pendant trois ans.", ["Il avait fait trop de sport.", "Il était malade.", "Il avait déménagé."]],
        ["Qu'a-t-il arrêté ?", "les boissons sucrées", ["la marche", "le café", "le travail"]],
      ],
    },
    exercises: [
      mcq("Quand je suis arrivé, ils ___ déjà mangé.", "avaient", ["ont", "auraient", "avait"], "Earlier past action → plus-que-parfait.", "plus-que-parfait"),
      mcq("Elle était triste parce qu'elle ___ son examen.", "avait raté", ["a raté", "rate", "raterait"], "Cause earlier than « était triste ».", "plus-que-parfait"),
      blank("Nous ___ partis avant la pluie. (être, plus-que-parfait)", "étions", "être verbs: étions + participle.", "plus-que-parfait"),
      reorder("Il n'avait jamais fait de sport avant.", "ne + avait + jamais + participle.", "plus-que-parfait"),
      translate("I felt better because I had slept well.", "Je me sentais mieux parce que j'avais bien dormi.", "Earlier cause → plus-que-parfait.", "plus-que-parfait"),
    ],
    writing: {
      prompt: "Racontez un changement d'habitude que vous avez fait, en expliquant la situation d'avant.",
      model: "Il y a deux ans, j'ai décidé de dormir plus. Avant, je me couchais à deux heures du matin parce que j'avais pris l'habitude de regarder des séries. J'étais souvent fatigué et j'avais oublié ce que c'était d'être en forme. Maintenant, j'éteins mon téléphone à dix heures et je me sens beaucoup mieux.",
      checklist: ["plus-que-parfait pour l'antériorité", "imparfait pour la situation passée", "vocabulaire de la santé"],
    },
  },
  {
    theme: "Les études",
    vocab: [
      ["s'inscrire", "to enrol", "Je me suis inscrit à l'université."],
      ["le diplôme", "the degree / diploma", "Elle a obtenu son diplôme."],
      ["réussir un examen", "to pass an exam", "Il a réussi son examen."],
      ["échouer / rater", "to fail", "J'ai raté le test."],
      ["réviser", "to revise / study", "Nous révisons pour l'examen."],
      ["la bourse", "the scholarship", "Elle a obtenu une bourse."],
      ["le mémoire", "the dissertation", "Il écrit son mémoire."],
      ["la licence / le master", "bachelor's / master's degree", "Je prépare un master."],
    ],
    grammar: {
      topic: "Le gérondif",
      explanation:
        "Gérondif = en + present participle (nous-stem + -ant): parler → en parlant, finir → en finissant, faire → en faisant.\nIrregular: être → en étant, avoir → en ayant, savoir → en sachant.\nIt expresses simultaneity (« Il écoute de la musique en travaillant. »), manner or means (« On apprend en pratiquant. ») or a condition.\nThe subject of the gérondif is the same as the main verb.",
      examples: ["Elle révise en écoutant de la musique.", "C'est en forgeant qu'on devient forgeron.", "En partant tôt, tu éviteras les embouteillages.", "Je l'ai rencontré en allant au travail."],
    },
    text: {
      title: "Étudier à l'étranger",
      body: "Ngozi a obtenu une bourse pour faire un master à Lyon. Au début, c'était difficile : elle comprenait mal les cours et elle se sentait seule. Elle a fait des progrès en regardant des séries françaises et en parlant avec ses voisins. En travaillant le week-end dans une librairie, elle a aussi rencontré beaucoup de gens. L'année dernière, elle a réussi son master avec mention et elle a trouvé un emploi en France.",
      questions: [
        ["Comment Ngozi a-t-elle progressé en français ?", "en regardant des séries et en parlant avec ses voisins", ["en prenant des cours privés", "en lisant des journaux", "en écoutant la radio"]],
        ["Où travaillait-elle le week-end ?", "dans une librairie", ["dans un restaurant", "à l'université", "dans un hôtel"]],
      ],
    },
    exercises: [
      mcq("On apprend une langue ___ la pratiquant.", "en", ["à", "par", "pour"], "Gérondif: en + participle.", "gerondif"),
      mcq("Gérondif de « faire » :", "en faisant", ["en fesant", "en faire", "en fait"], "nous faisons → faisant.", "gerondif"),
      blank("Il s'est blessé en ___ au football. (jouer)", "jouant", "jouer → jouant.", "gerondif"),
      reorder("Elle chante en faisant la cuisine.", "Main verb + en + participle.", "gerondif"),
      translate("By studying every day, you will pass the exam.", "En étudiant tous les jours, tu réussiras l'examen.", "Gérondif of means + futur.", "gerondif", ["En étudiant chaque jour, tu réussiras l'examen.", "En étudiant tous les jours, vous réussirez l'examen."]),
    ],
    writing: {
      prompt: "Comment apprenez-vous le mieux ? Donnez trois conseils à un nouvel étudiant (avec des gérondifs).",
      model: "Pour bien apprendre, je conseille d'abord d'organiser son temps en faisant un planning chaque semaine. Ensuite, on retient mieux en expliquant les cours à quelqu'un d'autre. Enfin, en dormant suffisamment avant un examen, on est plus concentré. Personnellement, j'apprends le vocabulaire en écoutant des podcasts dans le bus.",
      checklist: ["au moins trois gérondifs (en + -ant)", "même sujet que le verbe principal", "connecteurs : d'abord, ensuite, enfin"],
    },
  },
  {
    theme: "Celui-ci ou celui-là ?",
    vocab: [
      ["comparer", "to compare", "J'ai comparé les prix."],
      ["la marque", "the brand", "Quelle marque préfères-tu ?"],
      ["la qualité", "quality", "Ce produit est de bonne qualité."],
      ["solide", "sturdy", "Cette table est très solide."],
      ["pratique", "practical", "Ce sac est pratique."],
      ["d'occasion", "second-hand", "J'ai acheté une voiture d'occasion."],
      ["une promotion / en solde", "a special offer / on sale", "Ces chaussures sont en solde."],
      ["hésiter", "to hesitate", "J'hésite entre les deux."],
    ],
    grammar: {
      topic: "Les pronoms démonstratifs",
      explanation:
        "Demonstrative pronouns replace ce / cette / ces + noun: celui (m. sg.), celle (f. sg.), ceux (m. pl.), celles (f. pl.).\nThey are followed by:\n• -ci / -là: celui-ci (this one), celle-là (that one)\n• de + noun: « le téléphone de Paul et celui de Marie »\n• qui / que / dont: « Prends celle que tu préfères. »",
      examples: ["Quel sac veux-tu ? Celui-ci ou celui-là ?", "Ma voiture est blanche ; celle de mon frère est noire.", "Ces chaussures sont jolies, mais je préfère celles qui sont en solde.", "Les étudiants qui ont réussi et ceux qui ont échoué."],
    },
    text: {
      title: "Quel ordinateur choisir ?",
      body: "Esther veut acheter un ordinateur portable pour ses études. Le vendeur lui montre deux modèles. Celui-ci est léger et pratique, mais sa batterie dure seulement cinq heures. Celui-là est plus lourd, mais il est plus puissant et sa batterie dure dix heures. Esther hésite. Finalement, elle choisit celui qui a la meilleure batterie, parce qu'elle travaille souvent à la bibliothèque.",
      questions: [
        ["Quel est le défaut du premier ordinateur ?", "La batterie dure peu.", ["Il est lourd.", "Il est cher.", "Il est lent."]],
        ["Pourquoi Esther choisit-elle le deuxième ?", "pour sa batterie, car elle travaille à la bibliothèque", ["parce qu'il est léger", "parce qu'il est en solde", "pour sa couleur"]],
      ],
    },
    exercises: [
      mcq("Cette robe est belle, mais je préfère ___-là.", "celle", ["celui", "ceux", "celles"], "robe (f. sg.) → celle.", "demonstrative-pronouns"),
      mcq("Mes livres et ___ de mon frère sont sur la table.", "ceux", ["celles", "celui", "ces"], "livres (m. pl.) → ceux.", "demonstrative-pronouns"),
      blank("Ce téléphone est plus cher que ___ de Marc.", "celui", "téléphone (m. sg.) → celui.", "demonstrative-pronouns"),
      reorder("Je prends celle qui est en solde.", "celle + qui + clause.", "demonstrative-pronouns"),
      translate("These shoes are nicer than those.", "Ces chaussures sont plus jolies que celles-là.", "chaussures (f. pl.) → celles-là.", "demonstrative-pronouns", ["Ces chaussures sont plus belles que celles-là."]),
    ],
    writing: {
      prompt: "Vous hésitez entre deux produits (téléphones, voitures, appartements…). Comparez-les avec des pronoms démonstratifs.",
      model: "J'hésite entre deux téléphones. Celui de la marque A est moins cher, mais sa caméra est moyenne. Celui de la marque B est plus cher, mais ses photos sont superbes. Mes amis ont tous celui-là. Finalement, je vais acheter celui qui a la meilleure batterie, parce que je voyage souvent.",
      checklist: ["celui / celle / ceux / celles", "-ci / -là, de, qui / que", "comparatifs"],
    },
  },
  {
    theme: "Les relations",
    vocab: [
      ["un(e) ami(e) d'enfance", "a childhood friend", "C'est mon ami d'enfance."],
      ["se disputer", "to argue", "Ils se disputent souvent."],
      ["se réconcilier", "to make up", "Nous nous sommes réconciliés."],
      ["faire confiance à", "to trust", "Je lui fais confiance."],
      ["la jalousie", "jealousy", "La jalousie détruit l'amitié."],
      ["tomber amoureux de", "to fall in love with", "Il est tombé amoureux d'elle."],
      ["s'entendre bien avec", "to get on well with", "Je m'entends bien avec mes collègues."],
      ["se marier avec", "to marry", "Elle s'est mariée avec un Ivoirien."],
    ],
    grammar: {
      topic: "Les pronoms possessifs",
      explanation:
        "Possessive pronouns replace a possessive adjective + noun and agree with the thing owned:\nmine: le mien, la mienne, les miens, les miennes\nyours: le tien, la tienne… (informal) / le vôtre, la vôtre, les vôtres (formal)\nhis/hers: le sien, la sienne, les siens, les siennes\nours: le nôtre, la nôtre, les nôtres · theirs: le leur, la leur, les leurs.\nà + le mien → au mien; de + le mien → du mien.",
      examples: ["Ce n'est pas ton livre, c'est le mien.", "Ta maison est grande ; la nôtre est petite.", "Mes parents s'entendent bien avec les siens.", "Je pense souvent aux miens."],
    },
    text: {
      title: "Deux amies",
      body: "Clarisse et Hawa sont amies depuis l'école primaire. Leurs familles sont très différentes : celle de Clarisse est petite et calme, la sienne est grande et bruyante. Un jour, elles se sont disputées à cause d'un garçon dont elles étaient toutes les deux amoureuses. Elles ne se sont pas parlé pendant un an. Puis Hawa a écrit une lettre et elles se sont réconciliées. Aujourd'hui, chacune dit que leur amitié est plus forte que jamais.",
      questions: [
        ["Pourquoi se sont-elles disputées ?", "à cause d'un garçon", ["à cause de leurs familles", "à cause de l'argent", "à cause de l'école"]],
        ["Comment se sont-elles réconciliées ?", "Hawa a écrit une lettre.", ["Elles se sont rencontrées par hasard.", "Leurs familles les ont aidées.", "Clarisse a téléphoné."]],
      ],
    },
    exercises: [
      mcq("C'est ta voiture ? — Non, ce n'est pas ___.", "la mienne", ["le mien", "les miennes", "ma"], "voiture (f. sg.) → la mienne.", "possessive-pronouns"),
      mcq("Nos enfants jouent avec ___. (their children)", "les leurs", ["les leur", "leurs", "le leur"], "plural → les leurs.", "possessive-pronouns"),
      blank("J'ai oublié mon stylo ; tu peux me prêter ___ ? (yours, informal)", "le tien", "stylo (m. sg.) → le tien.", "possessive-pronouns"),
      reorder("Ces clés ne sont pas les miennes.", "Possessive pronoun agrees with clés (f. pl.).", "possessive-pronouns"),
      translate("Your house is bigger than ours.", "Ta maison est plus grande que la nôtre.", "maison (f.) → la nôtre.", "possessive-pronouns", ["Votre maison est plus grande que la nôtre."]),
    ],
    writing: {
      prompt: "Parlez d'une amitié importante pour vous : comment vous vous êtes rencontrés, vos points communs et vos différences.",
      model: "Mon meilleur ami s'appelle Seun. Nous nous sommes rencontrés à l'université. Nos personnalités sont différentes : la mienne est calme, la sienne est très énergique. Ses parents sont commerçants, les miens sont enseignants. Nous nous sommes disputés une fois, mais nous nous sommes vite réconciliés. Je lui fais totalement confiance.",
      checklist: ["pronoms possessifs (le mien, la sienne…)", "verbes pronominaux réciproques (se disputer, se réconcilier)", "passé composé et présent"],
    },
  },
  {
    theme: "Fêtes et traditions",
    vocab: [
      ["fêter / célébrer", "to celebrate", "Nous fêtons la Tabaski en famille."],
      ["une coutume", "a custom", "C'est une vieille coutume."],
      ["un jour férié", "a public holiday", "Le 1er mai est un jour férié."],
      ["se réunir", "to get together", "La famille se réunit pour Noël."],
      ["les invités (m.)", "the guests", "Les invités sont arrivés."],
      ["un plat traditionnel", "a traditional dish", "Le jollof est un plat traditionnel."],
      ["le défilé", "the parade", "Il y a un défilé le 14 juillet."],
      ["offrir", "to give (a gift)", "On offre des cadeaux."],
    ],
    grammar: {
      topic: "Exprimer la durée : depuis, il y a, pendant, en",
      explanation:
        "• depuis + present = an action that started in the past and is still going on: « J'habite ici depuis 2019 / depuis trois ans. »\n• il y a + past = ago: « Je suis arrivé il y a trois ans. »\n• pendant = for (a completed duration): « J'ai vécu à Paris pendant deux ans. »\n• en = time needed to do something: « J'ai écrit le rapport en deux heures. »",
      examples: ["Nous fêtons cette tradition depuis des siècles.", "Il est parti il y a une semaine.", "La fête a duré pendant trois jours.", "Elle a préparé le repas en une heure."],
    },
    text: {
      title: "Le Fespaco",
      body: "Depuis 1969, Ouagadougou accueille le Fespaco, le grand festival du cinéma africain. Il a lieu tous les deux ans et dure pendant une semaine. Des réalisateurs de tout le continent viennent présenter leurs films. Il y a quelques années, un film sénégalais a remporté l'Étalon d'or, le prix le plus important. Pendant le festival, la ville se transforme : il y a des concerts, des défilés et des marchés partout.",
      questions: [
        ["Depuis quand le Fespaco existe-t-il ?", "depuis 1969", ["depuis deux ans", "depuis une semaine", "depuis 1996"]],
        ["Combien de temps dure le festival ?", "une semaine", ["deux ans", "un mois", "trois jours"]],
      ],
    },
    exercises: [
      mcq("J'apprends le français ___ deux ans. (and still learning)", "depuis", ["il y a", "pendant", "en"], "Ongoing action → depuis + present.", "duration"),
      mcq("Il est arrivé ___ trois jours.", "il y a", ["depuis", "pendant", "dans"], "ago → il y a.", "duration"),
      blank("J'ai fini ce livre ___ une semaine. (time needed)", "en", "Time needed → en.", "duration"),
      reorder("Ils ont vécu à Dakar pendant cinq ans.", "Completed duration → pendant.", "duration"),
      translate("We have been celebrating this festival for a long time.", "Nous fêtons ce festival depuis longtemps.", "depuis + present for ongoing actions.", "duration", ["Nous célébrons ce festival depuis longtemps.", "On fête ce festival depuis longtemps."]),
    ],
    writing: {
      prompt: "Décrivez une fête ou une tradition de votre pays : depuis quand, comment on la célèbre, ce qu'on mange.",
      model: "Dans ma famille, nous célébrons le Nouvel An Igbo depuis toujours. Chaque année, nous nous réunissons au village pendant trois jours. On prépare de la soupe d'igname et on offre des cadeaux aux enfants. Il y a deux ans, j'ai aidé ma grand-mère à cuisiner pour cinquante invités : nous avons tout préparé en une journée !",
      checklist: ["depuis / il y a / pendant / en", "vocabulaire des fêtes", "présent et passé composé"],
    },
  },
  {
    theme: "Faire une réclamation",
    vocab: [
      ["se plaindre", "to complain", "Le client s'est plaint du service."],
      ["une réclamation", "a complaint", "J'ai fait une réclamation."],
      ["endommagé", "damaged", "Le colis est arrivé endommagé."],
      ["le service client", "customer service", "J'ai contacté le service client."],
      ["un remboursement", "a refund", "Je demande un remboursement."],
      ["un échange", "an exchange", "Vous pouvez faire un échange."],
      ["la garantie", "the warranty", "L'appareil est sous garantie."],
      ["inadmissible", "unacceptable", "Ce retard est inadmissible."],
    ],
    grammar: {
      topic: "La politesse : le conditionnel et la lettre formelle",
      explanation:
        "In formal requests, use the conditionnel to soften: je voudrais, j'aimerais, pourriez-vous, seriez-vous…, je vous serais reconnaissant(e) de + infinitive.\nFormal letter structure: Madame, Monsieur, → reason (Je vous écris au sujet de… / Suite à…) → facts → request → closing: Je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.\nAlways use vous.",
      examples: ["Pourriez-vous me rembourser ?", "Je vous serais reconnaissant de me répondre rapidement.", "Je vous écris au sujet de ma commande n° 2045.", "J'aimerais obtenir un échange."],
    },
    text: {
      title: "Une lettre de réclamation",
      body: "Madame, Monsieur,\nJe vous écris au sujet de la machine à laver que j'ai achetée dans votre magasin le 12 mars. Depuis la semaine dernière, elle ne fonctionne plus : l'eau ne s'écoule pas. L'appareil est encore sous garantie. Pourriez-vous envoyer un technicien ou procéder à un échange ? Je vous serais reconnaissant de me répondre dans les meilleurs délais.\nJe vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.\nKwame Mensah",
      questions: [
        ["Quel est le problème ?", "L'eau ne s'écoule pas de la machine.", ["La machine est trop bruyante.", "La livraison est en retard.", "Le prix est trop élevé."]],
        ["Que demande Kwame ?", "un technicien ou un échange", ["un remboursement immédiat", "une réduction", "une nouvelle garantie"]],
      ],
    },
    exercises: [
      mcq("Polite request:", "Pourriez-vous m'aider ?", ["Aidez-moi !", "Tu peux m'aider ?", "Vous m'aidez."], "Conditionnel of pouvoir for politeness.", "politeness-conditional"),
      mcq("Formal closing:", "Je vous prie d'agréer mes salutations distinguées.", ["Bisous !", "À plus !", "Salut et merci."], "Standard formal closing.", "formal-letter", "vocabulary"),
      blank("Je vous ___ reconnaissant de me répondre. (être, conditionnel)", "serais", "être → ser- + -ais.", "politeness-conditional"),
      reorder("Je vous écris au sujet de ma commande.", "Opening of a formal letter.", "formal-letter"),
      translate("I would like a refund, please.", "Je voudrais un remboursement, s'il vous plaît.", "je voudrais for polite requests.", "politeness-conditional", ["J'aimerais un remboursement, s'il vous plaît.", "Je voudrais être remboursé, s'il vous plaît."]),
    ],
    writing: {
      prompt: "Écrivez une lettre de réclamation : vous avez reçu un téléphone endommagé.",
      model: "Madame, Monsieur,\nSuite à ma commande n° 7731 du 2 juin, j'ai reçu hier un téléphone dont l'écran était cassé. Le carton était également endommagé. Je vous joins des photos. Pourriez-vous m'envoyer un nouvel appareil ou me rembourser ? Je vous serais reconnaissant de traiter ma demande rapidement.\nJe vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.",
      checklist: ["structure formelle complète", "conditionnel de politesse", "faits précis : date, numéro, problème"],
    },
  },
]);
