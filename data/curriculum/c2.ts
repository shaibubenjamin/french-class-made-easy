import { blank, course, mcq, reorder, translate } from "./build.ts";

export const C2 = course("C2", [
  {
    theme: "Le passé simple et le récit littéraire",
    vocab: [
      ["il fut", "he was (passé simple)", "Ce fut une nuit étrange."],
      ["elle eut", "she had (passé simple)", "Elle eut soudain une idée."],
      ["ils firent", "they did / made", "Ils firent route vers le nord."],
      ["il vint", "he came", "Le messager vint à l'aube."],
      ["elle prit", "she took", "Elle prit la lettre et la lut."],
      ["ils virent", "they saw", "Ils virent la mer pour la première fois."],
      ["le crépuscule", "dusk", "Au crépuscule, le village se tut."],
      ["se taire (il se tut)", "to fall silent", "L'assemblée se tut."],
    ],
    grammar: {
      topic: "Le passé simple et le passé antérieur",
      explanation:
        "Le passé simple est le temps du récit écrit (romans, contes, histoire). Il remplace le passé composé à l'écrit littéraire, en alternance avec l'imparfait.\nTerminaisons : -er → -ai, -as, -a, -âmes, -âtes, -èrent ; -ir et beaucoup de -re → -is, -is, -it, -îmes, -îtes, -irent ; d'autres → -us, -us, -ut… (être : je fus ; avoir : j'eus ; venir : je vins ; faire : je fis ; voir : je vis).\nLe passé antérieur (auxiliaire au passé simple + participe) exprime une action achevée juste avant une autre au passé simple, après quand, dès que, lorsque, à peine… que : « Quand il eut fini, il sortit. »",
      examples: ["Il ouvrit la porte et entra sans un mot.", "Ils vécurent heureux et eurent beaucoup d'enfants.", "Dès qu'elle eut reçu la lettre, elle partit.", "Nous fûmes surpris par l'orage."],
    },
    text: {
      title: "L'étranger du fleuve",
      body: "Ce soir-là, le fleuve était si calme qu'on eût dit un miroir. Le vieux pêcheur rangeait ses filets lorsqu'il aperçut une pirogue inconnue. Un homme en descendit, le visage couvert de poussière. Il salua d'un geste, demanda de l'eau, puis s'assit sans un mot. Quand il eut bu, il sortit de sa besace une carte jaunie et la tendit au pêcheur. Celui-ci la regarda longtemps ; il comprit alors que le voyageur cherchait le village englouti dont parlaient les légendes.",
      questions: [
        ["Que fit l'étranger après avoir bu ?", "Il tendit une carte au pêcheur.", ["Il repartit aussitôt.", "Il pêcha avec le vieil homme.", "Il raconta une légende."]],
        ["Que cherchait le voyageur ?", "un village englouti", ["un trésor de pêcheur", "sa famille", "un passage vers la mer"]],
      ],
    },
    exercises: [
      mcq("Passé simple de « venir » (il) :", "il vint", ["il venit", "il vena", "il vinrent"], "venir → je vins, il vint.", "passe-simple"),
      mcq("Quand il ___ terminé, il se leva.", "eut", ["avait", "a", "aura"], "Passé antérieur : eut + participe, avec quand et un passé simple.", "passe-anterieur"),
      blank("Ils ___ le voyage à pied. (faire, passé simple)", "firent", "faire → ils firent.", "passe-simple"),
      reorder("Elle prit la lettre et la lut en silence.", "Enchaînement d'actions au passé simple.", "passe-simple"),
      translate("He opened the door and saw the sea.", "Il ouvrit la porte et vit la mer.", "Récit littéraire → passé simple.", "passe-simple", ["Il ouvrit la porte et aperçut la mer."]),
    ],
    writing: {
      prompt: "Écrivez le début d'un conte (120 mots) au passé simple et à l'imparfait, avec au moins un passé antérieur.",
      model: "Il était une fois, au bord du lac Tchad, une jeune tisserande qui ne parlait jamais. Chaque matin, elle s'asseyait devant sa maison et tissait des étoffes d'une beauté étrange. Un jour, un marchand venu du Nord s'arrêta devant elle. Il contempla longuement son travail, puis il lui offrit tout l'or qu'il possédait. La jeune femme refusa d'un signe de tête. Dès que le marchand fut reparti, elle déroula la dernière étoffe : on y voyait le visage de l'homme, tissé la veille.",
      checklist: ["imparfait pour le décor, passé simple pour les actions", "au moins un passé antérieur après dès que / quand", "registre littéraire"],
    },
  },
  {
    theme: "Le subjonctif imparfait",
    vocab: [
      ["qu'il fût", "that he was / were", "Il fallait qu'il fût présent."],
      ["qu'il eût", "that he had", "Bien qu'il eût raison, on l'ignora."],
      ["qu'elle vînt", "that she came", "Il souhaitait qu'elle vînt."],
      ["qu'il fît", "that he did", "On attendait qu'il fît un geste."],
      ["qu'ils pussent", "that they could", "Il fallait qu'ils pussent partir."],
      ["on eût dit", "one would have said", "On eût dit un tableau."],
      ["dût-il", "even if he had to", "Il le fera, dût-il y passer la nuit."],
      ["fût-ce", "even if it were", "Il refusa, fût-ce pour un jour."],
    ],
    grammar: {
      topic: "Les subjonctifs imparfait et plus-que-parfait",
      explanation:
        "Dans la langue littéraire, quand le verbe principal est au passé, la concordance stricte exige le subjonctif imparfait (simultanéité) ou plus-que-parfait (antériorité).\nFormation de l'imparfait : à partir du passé simple (il fut → qu'il fût ; il chanta → qu'il chantât) ; terminaisons -sse, -sses, -^t, -ssions, -ssiez, -ssent : que je chantasse, qu'il chantât.\nPlus-que-parfait : eût / fût + participe : qu'il eût fini, qu'elle fût partie.\nLe plus-que-parfait du subjonctif sert aussi de « conditionnel passé deuxième forme » : « Si j'eusse su, je fusse venu. » / « On eût dit… »\nAujourd'hui, ces formes sont surtout lues ; à l'oral, on emploie le subjonctif présent et passé.",
      examples: ["Le roi exigea qu'on lui obéît.", "Bien qu'il fût malade, il continua de travailler.", "Je craignais qu'elle ne fût déjà partie.", "Il eût fallu agir plus tôt."],
    },
    text: {
      title: "Extrait de mémoires",
      body: "Mon père voulait que j'apprisse le latin, bien que je n'en visse guère l'utilité. Il fallait qu'aucune heure ne fût perdue ; aussi le précepteur arrivait-il dès l'aube. J'eusse préféré courir dans les champs, mais il eût été impensable de désobéir. Ce n'est que bien plus tard que je compris : il souhaitait que je pusse lire les auteurs anciens sans intermédiaire, comme si les livres avaient été pour lui une forme de liberté.",
      questions: [
        ["Que souhaitait le père du narrateur ?", "qu'il apprenne le latin", ["qu'il devienne précepteur", "qu'il travaille aux champs", "qu'il voyage"]],
        ["Quel sens donne le narrateur, plus tard, à ce souhait ?", "Lire les auteurs anciens était une forme de liberté.", ["Son père voulait le punir.", "Le latin était nécessaire pour travailler.", "Il devait devenir prêtre."]],
      ],
    },
    exercises: [
      mcq("Subjonctif imparfait de « être » (il) :", "qu'il fût", ["qu'il fut", "qu'il soit", "qu'il fusse"], "il fut (passé simple) → qu'il fût (accent circonflexe).", "subjonctif-imparfait"),
      mcq("« On eût dit un rêve » signifie :", "On aurait dit un rêve.", ["On a dit un rêve.", "On dira un rêve.", "On disait un rêve."], "Plus-que-parfait du subjonctif = conditionnel passé 2e forme.", "subjonctif-imparfait"),
      blank("Il exigea qu'elle ___ sur-le-champ. (venir, subj. imparfait)", "vînt", "venir → elle vint → qu'elle vînt.", "subjonctif-imparfait"),
      reorder("Bien qu'il fût tard il continua d'écrire.", "Concordance littéraire au passé.", "subjonctif-imparfait"),
      translate("It would have been necessary to act sooner. (literary)", "Il eût fallu agir plus tôt.", "eût fallu = aurait fallu (littéraire).", "subjonctif-imparfait", ["Il aurait fallu agir plus tôt."]),
    ],
    writing: {
      prompt: "Réécrivez dans un style littéraire (subjonctif imparfait et plus-que-parfait) le passage suivant : « Mes parents voulaient que je devienne médecin. Bien que je sois doué pour le dessin, ils ne voulaient pas que j'en fasse mon métier. Il aurait fallu que je sois plus courageux. »",
      model: "Mes parents voulaient que je devinsse médecin. Bien que je fusse doué pour le dessin, ils ne souhaitaient pas que j'en fisse mon métier. Il eût fallu que je fusse plus courageux ; peut-être alors eussé-je osé leur tenir tête.",
      checklist: ["subjonctif imparfait après un verbe principal au passé", "eût / fût pour le conditionnel passé 2e forme", "accents circonflexes (fût, fît, vînt)"],
    },
  },
  {
    theme: "Les figures de style",
    vocab: [
      ["la métaphore", "metaphor", "« Cet homme est un lion » est une métaphore."],
      ["la comparaison", "simile", "« Fort comme un lion » est une comparaison."],
      ["la litote", "litotes (understatement)", "« Ce n'est pas mauvais » est une litote."],
      ["l'hyperbole (f.)", "hyperbole", "« Je meurs de faim » est une hyperbole."],
      ["l'oxymore (m.)", "oxymoron", "« Un silence assourdissant » est un oxymore."],
      ["l'euphémisme (m.)", "euphemism", "« Il nous a quittés » est un euphémisme."],
      ["la personnification", "personification", "« La ville s'éveille » est une personnification."],
      ["l'antithèse (f.)", "antithesis", "« Je vis, je meurs » est une antithèse."],
    ],
    grammar: {
      topic: "Reconnaître et analyser les figures de style",
      explanation:
        "• Comparaison : rapprochement avec un outil (comme, tel, pareil à).\n• Métaphore : rapprochement sans outil (« ce gouffre de tristesse »).\n• Personnification : attribuer des traits humains à une chose.\n• Hyperbole : exagération.\n• Litote : dire moins pour suggérer plus (« Va, je ne te hais point » — Corneille).\n• Euphémisme : atténuer une réalité pénible.\n• Oxymore : deux termes contradictoires réunis (« cette obscure clarté »).\n• Antithèse : opposition de deux idées dans une même phrase.\nAnalyser une figure, c'est la nommer ET expliquer son effet.",
      examples: ["« Ses yeux étaient deux étoiles. » (métaphore)", "« Le vent hurlait dans la nuit. » (personnification)", "« Je te l'ai dit mille fois ! » (hyperbole)", "« Il n'est pas très malin. » (litote)"],
    },
    text: {
      title: "Lecture d'un poème en prose",
      body: "« La ville dormait, géante assoupie aux mille yeux éteints. Seul le fleuve veillait, serpent d'argent qui murmurait aux ponts ses secrets millénaires. Dans ce silence assourdissant, un homme marchait, aussi léger qu'une ombre. Il n'était pas tout à fait malheureux ; il était seulement seul. » Dans ce passage, l'auteur multiplie les images : la ville et le fleuve prennent vie, tandis que l'oxymore du silence souligne l'étrangeté de la nuit.",
      questions: [
        ["Quelle figure trouve-t-on dans « serpent d'argent » ?", "une métaphore", ["une comparaison", "une litote", "une antithèse"]],
        ["« Il n'était pas tout à fait malheureux » est :", "une litote", ["une hyperbole", "un oxymore", "une personnification"]],
      ],
    },
    exercises: [
      mcq("« Un silence assourdissant » est :", "un oxymore", ["une hyperbole", "une comparaison", "un euphémisme"], "Deux termes contradictoires réunis.", "stylistics"),
      mcq("« Il est fort comme un bœuf » est :", "une comparaison", ["une métaphore", "une litote", "une personnification"], "Outil de comparaison : comme.", "stylistics"),
      blank("« Il nous a quittés » pour « il est mort » est un ___.", "euphémisme", "Atténuation d'une réalité pénible.", "stylistics", ["euphemisme"], "vocabulary"),
      reorder("Le vent gémissait contre les volets.", "Personnification : le vent gémit comme un humain.", "stylistics"),
      translate("The city wakes up slowly. (personification)", "La ville s'éveille lentement.", "Personnification de la ville.", "stylistics", ["La ville se réveille lentement."]),
    ],
    writing: {
      prompt: "Décrivez un lieu qui vous est cher (100 mots) en employant au moins cinq figures de style différentes, que vous identifierez entre parenthèses.",
      model: "Le marché de Balogun est un océan de couleurs (métaphore) où les voix des vendeuses chantent plus fort que les klaxons (personnification). On y croise un million de visages (hyperbole) et l'on y respire un parfum aussi épicé qu'un plat de jollof (comparaison). Ce n'est pas l'endroit le plus calme de Lagos (litote), mais dans ce chaos ordonné (oxymore), je me sens chez moi.",
      checklist: ["au moins cinq figures différentes", "identification correcte de chaque figure", "effet expressif cohérent"],
    },
  },
  {
    theme: "Le style journalistique",
    vocab: [
      ["le chapeau", "the standfirst / lead", "Le chapeau résume l'article."],
      ["la une", "the front page", "L'affaire fait la une des journaux."],
      ["un éditorial", "an editorial", "L'éditorial critique le gouvernement."],
      ["un entrefilet", "a short news item", "L'information tient en un entrefilet."],
      ["selon nos informations", "according to our sources", "Selon nos informations, le ministre démissionnerait."],
      ["le conditionnel journalistique", "the journalistic conditional", "L'accident aurait fait trois blessés."],
      ["démentir", "to deny", "Le porte-parole a démenti la rumeur."],
      ["l'ellipse (f.)", "ellipsis", "« Incendie à Kano : trois blessés » est une ellipse."],
    ],
    grammar: {
      topic: "Ellipse, style nominal et conditionnel de prudence",
      explanation:
        "La presse condense l'information :\n• Titres elliptiques, sans verbe conjugué : « Grève des enseignants : les écoles fermées lundi ».\n• Nominalisation : « annonce », « hausse », « report ».\n• Conditionnel journalistique pour une information non confirmée : « Le suspect aurait quitté le pays. »\n• Discours rapporté varié : selon, d'après, de source policière, a-t-il affirmé (inversion en incise).\n• Apposition : « Le maire, élu en 2023, a déclaré… »\nL'éditorial, lui, peut employer la première personne, l'ironie et les questions rhétoriques.",
      examples: ["Inondations à Abidjan : au moins douze morts.", "Le ministre aurait remis sa démission, selon plusieurs sources.", "« Nous ne céderons pas », a martelé la présidente.", "Arrivé en tête, le candidat sortant a salué « une victoire du peuple »."],
    },
    text: {
      title: "Article",
      body: "CRISE À LA COMPAGNIE NATIONALE : LE PDG SUR LE DÉPART ?\nLe président-directeur général de la compagnie aérienne nationale, nommé il y a à peine deux ans, aurait présenté sa démission hier soir, selon des sources proches du dossier. Le ministère des Transports a démenti « toute décision à ce stade ». Cette annonce intervient alors que la compagnie, lourdement endettée, a annulé plus de trois cents vols en un mois. « Nous traversons une période difficile, mais l'entreprise n'est pas en faillite », a assuré un porte-parole.",
      questions: [
        ["Pourquoi l'article emploie-t-il « aurait présenté » ?", "parce que l'information n'est pas confirmée", ["parce que c'est une hypothèse impossible", "par politesse", "parce que l'action est future"]],
        ["Quelle est la réaction du ministère ?", "Il dément qu'une décision soit prise.", ["Il confirme la démission.", "Il annonce la faillite.", "Il refuse de commenter."]],
      ],
    },
    exercises: [
      mcq("Pour une information non confirmée, un journaliste écrira :", "Le suspect aurait fui à l'étranger.", ["Le suspect a fui à l'étranger.", "Le suspect fuira à l'étranger.", "Le suspect fuyait à l'étranger."], "Conditionnel de prudence.", "journalistic-style"),
      mcq("Titre de presse correct :", "Hausse des prix : les ménages inquiets", ["Les prix augmentent et les ménages sont inquiets parce que", "Ils disent que les prix vont augmenter", "Je pense que les prix augmentent"], "Ellipse et style nominal.", "journalistic-style"),
      blank("« Nous gagnerons », a-t-___ déclaré. (il)", "il", "Inversion en incise : a-t-il déclaré.", "journalistic-style"),
      reorder("Selon nos informations le ministre aurait démissionné.", "Source + conditionnel journalistique.", "journalistic-style"),
      translate("The fire is said to have caused major damage.", "L'incendie aurait causé d'importants dégâts.", "Conditionnel passé de prudence.", "journalistic-style", ["L'incendie aurait provoqué d'importants dégâts."]),
    ],
    writing: {
      prompt: "Rédigez une brève de presse (titre + chapeau + 80 mots) sur un événement imaginaire, avec ellipse, conditionnel journalistique et discours rapporté.",
      model: "PANNE GÉANTE À LAGOS : LA VILLE PLONGÉE DANS LE NOIR\nUne coupure d'électricité a touché hier soir plus de deux millions d'habitants.\nSelon la compagnie d'électricité, la panne aurait été provoquée par un incendie dans une sous-station. « Le courant sera rétabli d'ici demain matin », a assuré son directeur. Plusieurs hôpitaux ont dû recourir à leurs générateurs. Des commerçants dénoncent « une situation intolérable », la troisième panne de ce type depuis janvier.",
      checklist: ["titre elliptique", "conditionnel journalistique", "citations avec inversion en incise"],
    },
  },
  {
    theme: "Tournures littéraires",
    vocab: [
      ["point (= pas, littéraire)", "not (literary)", "Je ne te hais point."],
      ["guère", "hardly", "Il n'en reste guère."],
      ["nul / nulle", "no one / no", "Nul n'est censé ignorer la loi."],
      ["naguère", "not long ago", "Ce quartier, naguère animé, est désert."],
      ["d'aucuns", "some people", "D'aucuns prétendent le contraire."],
      ["ne… que", "only", "Il n'a que vingt ans."],
      ["sitôt", "as soon as", "Sitôt arrivé, il se mit au travail."],
      ["force est de constater", "one is forced to admit", "Force est de constater que l'échec est total."],
    ],
    grammar: {
      topic: "Négations et tournures du registre littéraire",
      explanation:
        "• Négations soutenues : ne… point (pas), ne… guère (presque pas), ne… nullement, nul ne / nulle part, ne seul (sans pas) avec cesser, oser, pouvoir, savoir : « Il ne cesse de pleuvoir », « Je n'ose le dire ».\n• Tournures figées : force est de constater que, il n'est que de voir, point n'est besoin de, d'aucuns, naguère, sitôt + participe.\n• Antéposition de l'adjectif ou du complément pour l'effet : « De cette ville, il ne reste rien. »\nCes tournures donnent de l'élégance, mais leur accumulation devient affectée.",
      examples: ["Point n'est besoin d'insister.", "Il ne saurait être question de céder.", "Nul ne sait ce qu'il est devenu.", "Sitôt la nuit tombée, les rues se vidèrent."],
    },
    text: {
      title: "Éloge d'un vieux quartier",
      body: "Ce quartier, naguère le cœur battant de la ville, n'est guère plus qu'un souvenir. D'aucuns y voient le prix du progrès ; force est de constater pourtant que nul n'a su remplacer ce qui faisait son charme. Point n'est besoin d'être nostalgique pour regretter les cours ombragées et les ateliers d'artisans. Sitôt les bulldozers partis, les tours de verre ont surgi, et l'on n'ose imaginer ce qu'en penseraient les anciens.",
      questions: [
        ["Que signifie « n'est guère plus qu'un souvenir » ?", "n'est presque plus qu'un souvenir", ["est un beau souvenir", "n'est plus du tout un souvenir", "est devenu plus important"]],
        ["Quel est le ton du texte ?", "nostalgique et critique envers les transformations", ["enthousiaste pour le progrès", "neutre et technique", "humoristique"]],
      ],
    },
    exercises: [
      mcq("« Il ne cesse de travailler » signifie :", "Il travaille sans arrêt.", ["Il ne travaille plus.", "Il travaille peu.", "Il refuse de travailler."], "ne seul avec cesser : pas de valeur de « pas ».", "literary-negation"),
      mcq("« Point n'est besoin d'insister » signifie :", "Il n'est pas nécessaire d'insister.", ["Il faut insister sur ce point.", "Il est besoin d'un point.", "Il faut insister un peu."], "point = pas (littéraire), inversion figée.", "literary-negation"),
      blank("___ n'est censé ignorer la loi. (no one)", "Nul", "nul ne = personne ne (soutenu).", "literary-negation", ["nul"]),
      reorder("Sitôt la nouvelle connue la foule se dispersa.", "sitôt + participe : dès que.", "literary-style"),
      translate("Some people claim the opposite. (literary)", "D'aucuns prétendent le contraire.", "d'aucuns = certains (soutenu).", "literary-style", ["Certains prétendent le contraire."]),
    ],
    writing: {
      prompt: "Rédigez un paragraphe de 100 mots dans un registre littéraire soutenu sur un lieu disparu ou transformé, avec au moins quatre tournures étudiées.",
      model: "De la maison de mon enfance, il ne reste guère que le manguier. Naguère, la cour résonnait des rires de mes cousins ; nul aujourd'hui ne s'y attarde. D'aucuns diront que les souvenirs embellissent tout. Force est de constater, pourtant, que je n'ose plus y retourner. Sitôt le portail franchi, une tristesse sourde m'envahit, et point n'est besoin de mots pour la dire.",
      checklist: ["négations soutenues (guère, nul, n'ose)", "tournures figées (force est de constater, point n'est besoin)", "registre homogène et non affecté"],
    },
  },
  {
    theme: "Variétés du français",
    vocab: [
      ["la francophonie", "the French-speaking world", "La francophonie compte plus de 300 millions de locuteurs."],
      ["un québécisme", "a Quebec expression", "« Magasiner » est un québécisme."],
      ["un belgicisme", "a Belgian expression", "« Septante » est un belgicisme."],
      ["un africanisme", "an African French expression", "« Essencerie » est un africanisme sénégalais."],
      ["le courriel", "e-mail (recommended term)", "Envoyez-moi un courriel."],
      ["un anglicisme", "an anglicism", "« Faire du shopping » est un anglicisme."],
      ["un néologisme", "a neologism", "« Divulgâcher » est un néologisme pour « spoiler »."],
      ["la norme", "the standard / norm", "La norme varie selon les pays."],
    ],
    grammar: {
      topic: "Le français dans le monde : variation et norme",
      explanation:
        "Le français n'est pas une langue uniforme : il varie selon les régions (variation diatopique).\n• Belgique / Suisse : septante (70), nonante (90), huitante (80, en Suisse romande) ; déjeuner / dîner / souper pour les trois repas.\n• Québec : magasiner (faire les courses), char (voiture), courriel, fin de semaine, « c'est le fun ».\n• Afrique : essencerie (station-service, Sénégal), un maquis (petit restaurant, Côte d'Ivoire), droit (réserve de salaire, Cameroun), « on va faire comment ? ».\n• Néologismes et recommandations officielles : courriel, divulgâcher, mot-dièse (hashtag), infox (fake news).\nLa « norme » est donc plurielle ; un locuteur C2 sait reconnaître ces variétés sans les juger.",
      examples: ["À Bruxelles, on dîne à midi et on soupe le soir.", "À Montréal : « Je vais magasiner en fin de semaine. »", "À Abidjan : « On se retrouve au maquis ce soir ? »", "« Ne divulgâche pas la fin du film ! »"],
    },
    text: {
      title: "Un français, des français",
      body: "Lors d'une conférence à Genève, des étudiants venus de Dakar, de Montréal et de Liège ont comparé leurs façons de parler. Aminata expliquait qu'elle faisait le plein à l'essencerie ; Félix, de Québec, racontait qu'il magasinait chaque fin de semaine ; et Louise, la Liégeoise, invitait tout le monde à dîner… à midi. Loin de s'en amuser, la professeure a rappelé que ces différences enrichissent la langue : le français appartient désormais davantage à l'Afrique qu'à la France, puisque la majorité de ses locuteurs y vivent.",
      questions: [
        ["Que signifie « magasiner » au Québec ?", "faire des courses / du shopping", ["travailler dans un magasin", "fermer un magasin", "voler dans un magasin"]],
        ["Selon la professeure, où vit la majorité des francophones ?", "en Afrique", ["en France", "au Canada", "en Belgique"]],
      ],
    },
    exercises: [
      mcq("En Belgique, 90 se dit :", "nonante", ["quatre-vingt-dix", "huitante", "neuvante"], "Belgique et Suisse : septante, nonante.", "francophonie", "vocabulary"),
      mcq("Terme recommandé en français pour « fake news » :", "infox", ["fausse nouvelle-news", "faknews", "pseudoinfo"], "Recommandation officielle : infox.", "neologisms", "vocabulary"),
      blank("Au Sénégal, on fait le plein d'essence à l'___.", "essencerie", "Africanisme : essencerie = station-service.", "francophonie", [], "vocabulary"),
      reorder("Au Québec on envoie un courriel.", "courriel = e-mail.", "francophonie", "vocabulary"),
      translate("Don't spoil the end of the series!", "Ne divulgâche pas la fin de la série !", "Néologisme recommandé : divulgâcher.", "neologisms", ["Ne me divulgâche pas la fin de la série !", "Ne spoile pas la fin de la série !"]),
    ],
    writing: {
      prompt: "Le français parlé dans votre pays (ou que vous entendez autour de vous) a-t-il des particularités ? Présentez-en quelques-unes en 120 mots et réfléchissez à la notion de « bon français ».",
      model: "Au Nigeria, le français est surtout une langue apprise, mais il est influencé par nos voisins du Bénin et du Cameroun. On entend des expressions comme « on va faire comment ? » ou « il est allé au maquis ». Certains enseignants les jugent incorrectes ; pourtant, elles sont parfaitement comprises dans toute l'Afrique de l'Ouest. À mon sens, le « bon français » n'est pas celui de Paris, mais celui qui est adapté à la situation. Un locuteur compétent sait passer d'une variété à l'autre selon son interlocuteur.",
      checklist: ["exemples précis de variation", "réflexion nuancée sur la norme", "registre soutenu"],
    },
  },
  {
    theme: "Locutions latines et savantes",
    vocab: [
      ["a priori", "at first sight / in principle", "A priori, rien ne s'y oppose."],
      ["a posteriori", "after the fact", "On l'a compris a posteriori."],
      ["de facto", "in fact / in practice", "Il est de facto le chef."],
      ["in extremis", "at the last moment", "Il a été sauvé in extremis."],
      ["sine qua non", "essential condition", "C'est une condition sine qua non."],
      ["ad hoc", "for this purpose", "Une commission ad hoc a été créée."],
      ["mea culpa", "admission of guilt", "Le ministre a fait son mea culpa."],
      ["statu quo", "the status quo", "Ils préfèrent le statu quo."],
    ],
    grammar: {
      topic: "Employer les locutions latines",
      explanation:
        "Le français soutenu emprunte de nombreuses locutions latines. Elles sont invariables et s'écrivent aujourd'hui sans accent en principe (a priori, a posteriori), bien que les rectifications de 1990 autorisent « à priori ».\nAttention aux erreurs fréquentes :\n• « au jour d'aujourd'hui » est un pléonasme ;\n• « statu quo » (et non « statu-quo » ni « status quo ») ;\n• « in extremis » = au dernier moment, pas « extrêmement » ;\n• « a priori » ne signifie pas « probablement » mais « au premier abord, avant examen ».\nN'en abusez pas : une ou deux par paragraphe suffisent.",
      examples: ["A priori, la proposition semble raisonnable.", "Le but a été marqué in extremis.", "La maîtrise du français est une condition sine qua non.", "Faute d'accord, le statu quo est maintenu."],
    },
    text: {
      title: "Négociations",
      body: "Après trois jours de discussions, un accord a été trouvé in extremis entre le syndicat et la direction. A priori, rien ne laissait présager une telle issue : chacun campait sur ses positions et le statu quo semblait inévitable. La création d'une commission ad hoc, chargée de suivre l'application de l'accord, était pour le syndicat une condition sine qua non. A posteriori, plusieurs observateurs estiment que le mea culpa du directeur a débloqué la situation.",
      questions: [
        ["Quand l'accord a-t-il été trouvé ?", "au dernier moment", ["dès le premier jour", "il n'y a pas eu d'accord", "un mois plus tard"]],
        ["Qu'est-ce qui aurait débloqué la situation ?", "le mea culpa du directeur", ["la commission ad hoc", "une grève", "l'intervention du ministre"]],
      ],
    },
    exercises: [
      mcq("« Il a été sauvé in extremis » signifie :", "au dernier moment", ["de façon extrême", "très facilement", "par erreur"], "in extremis = au dernier moment.", "latin-phrases", "vocabulary"),
      mcq("Graphie correcte :", "le statu quo", ["le status quo", "le statu-quo", "le statut quo"], "Locution latine invariable : statu quo.", "latin-phrases", "vocabulary"),
      blank("Parler français est une condition ___ qua non pour ce poste.", "sine", "sine qua non = indispensable.", "latin-phrases", [], "vocabulary"),
      reorder("A priori le projet semble réalisable.", "a priori = au premier abord.", "latin-phrases", "vocabulary"),
      translate("The president admitted his mistake publicly.", "Le président a fait son mea culpa publiquement.", "faire son mea culpa = reconnaître sa faute.", "latin-phrases", ["Le président a publiquement fait son mea culpa.", "Le président a reconnu publiquement son erreur."]),
    ],
    writing: {
      prompt: "Rédigez un court compte rendu de réunion (100 mots) en utilisant à bon escient au moins quatre locutions latines.",
      model: "La réunion du 12 mai avait pour objet le budget de la formation. A priori, les positions semblaient inconciliables : la direction souhaitait le statu quo, tandis que les équipes réclamaient une hausse de 20 %. Une solution a été trouvée in extremis : un groupe de travail ad hoc proposera d'ici juin une répartition équitable. Sa création était une condition sine qua non pour les représentants du personnel.",
      checklist: ["au moins quatre locutions latines", "sens exact de chaque locution", "graphies correctes et invariables"],
    },
  },
  {
    theme: "Ponctuation et rythme",
    vocab: [
      ["le point-virgule", "semicolon", "Il pleuvait ; nous sommes restés."],
      ["les deux-points", "colon", "Il n'avait qu'un rêve : partir."],
      ["les points de suspension", "ellipsis (…)", "Et puis… plus rien."],
      ["les guillemets (m.)", "quotation marks « »", "Il a dit : « Je reviendrai. »"],
      ["le tiret", "dash", "Ma sœur — qui vit à Paris — arrive demain."],
      ["l'incise (f.)", "parenthetical clause", "« Viens », dit-elle."],
      ["la cadence", "rhythm / cadence", "La phrase a une belle cadence."],
      ["la période", "periodic sentence", "Bossuet maîtrisait l'art de la période."],
    ],
    grammar: {
      topic: "La ponctuation française et le rythme de la phrase",
      explanation:
        "Particularités typographiques françaises : espace insécable avant ; : ! ? et à l'intérieur des guillemets « ».\n• Point-virgule : sépare deux propositions liées par le sens.\n• Deux-points : annonce une explication, une conséquence, une énumération ou une citation.\n• Tiret / parenthèses : insertion d'un commentaire.\n• Incise avec inversion : « Je pars, dit-il. »\nLe rythme naît de la longueur et de l'équilibre des segments : rythme binaire (« Il hésita, puis renonça »), ternaire (« Je suis venu, j'ai vu, j'ai vaincu »), phrase brève après une phrase longue pour créer un effet de chute.",
      examples: ["Elle avait tout préparé : les valises, les billets, les adieux.", "Il voulait parler ; il n'osa pas.", "Mon voisin — un homme charmant — m'a aidé.", "« Je ne viendrai pas », répondit-elle sèchement."],
    },
    text: {
      title: "Analyse d'un paragraphe",
      body: "« Il marcha longtemps, sous la pluie, entre les maisons aveugles et les arbres nus ; il marcha sans but, sans pensée, sans espoir. Puis il s'arrêta. » Dans ce passage, l'auteur construit une longue phrase au rythme ternaire — sans but, sans pensée, sans espoir — qui mime la marche épuisante du personnage. Le point-virgule relie deux mouvements de la même errance. La phrase brève qui suit produit un effet de rupture : l'arrêt est soudain, presque brutal.",
      questions: [
        ["Quel effet produit la phrase « Puis il s'arrêta. » ?", "un effet de rupture brutale", ["un effet comique", "une accélération du rythme", "une transition vers un dialogue"]],
        ["Quel rythme l'auteur emploie-t-il dans « sans but, sans pensée, sans espoir » ?", "ternaire", ["binaire", "quaternaire", "irrégulier"]],
      ],
    },
    exercises: [
      mcq("Signe annonçant une explication ou une énumération :", "les deux-points", ["le point-virgule", "les points de suspension", "le tiret"], "Les deux-points annoncent ce qui suit.", "punctuation", "vocabulary"),
      mcq("Incise correcte :", "« Je pars », dit-il.", ["« Je pars », il dit.", "« Je pars », dit il.", "« Je pars » il a dit."], "Incise avec inversion et trait d'union.", "punctuation"),
      mcq("Quel signe convient ? « Il voulait parler ___ il n'osa pas. »", "le point-virgule", ["le point d'interrogation", "les guillemets", "le tiret"], "Le point-virgule relie deux propositions liées par le sens.", "punctuation"),
      reorder("Je suis venu j'ai vu j'ai vaincu.", "Rythme ternaire célèbre.", "rhythm"),
      translate("She had only one dream: to leave.", "Elle n'avait qu'un rêve : partir.", "Deux-points précédés d'une espace en français.", "punctuation", ["Elle n'avait qu'un seul rêve : partir."]),
    ],
    writing: {
      prompt: "Écrivez un paragraphe descriptif (100 mots) qui joue sur le rythme : une longue phrase ternaire, un point-virgule, des deux-points, et une phrase brève finale.",
      model: "Le marché s'éveillait lentement : les vendeuses déballaient leurs étoffes, les porteurs criaient, les enfants couraient entre les étals. Il y avait là toutes les couleurs, toutes les odeurs, toutes les langues de la ville ; on y venait moins pour acheter que pour vivre. Je m'avançais au milieu de cette foule — étourdi, émerveillé — quand une voix appela mon nom. Je me retournai. Personne.",
      checklist: ["rythme ternaire", "point-virgule et deux-points bien employés", "phrase brève finale à effet de chute"],
    },
  },
  {
    theme: "Les paronymes",
    vocab: [
      ["affliger / infliger", "to distress / to inflict", "Cette nouvelle m'afflige ; il lui a infligé une amende."],
      ["éminent / imminent", "eminent / imminent", "Un éminent professeur ; un danger imminent."],
      ["conjecture / conjoncture", "guess / circumstances", "Simple conjecture ; la conjoncture économique."],
      ["prodige / prodigue", "prodigy / lavish", "Un enfant prodige ; un fils prodigue."],
      ["acception / acceptation", "sense of a word / acceptance", "Dans toutes les acceptions du terme."],
      ["perpétrer / perpétuer", "to commit (a crime) / to perpetuate", "Perpétrer un crime ; perpétuer une tradition."],
      ["évoquer / invoquer", "to mention / to call upon", "Évoquer un souvenir ; invoquer une loi."],
      ["effraction / infraction", "break-in / offence", "Vol avec effraction ; une infraction au code."],
    ],
    grammar: {
      topic: "Les paronymes",
      explanation:
        "Les paronymes sont des mots de forme proche mais de sens différent. Leur confusion est fréquente même chez les locuteurs natifs, et elle est sanctionnée dans les examens de niveau C2.\nStratégies : rattacher chaque mot à sa famille (éminent → éminence ; imminent → imminence), mémoriser une collocation type (perpétrer un crime, perpétuer une tradition), vérifier dans un dictionnaire en cas de doute.\nAutres paires utiles : allocation / allocution ; collision / collusion ; inclinaison / inclination ; percepteur / précepteur ; recouvrer / recouvrir.",
      examples: ["Le président a prononcé une allocution télévisée.", "Il a recouvré la vue après l'opération.", "La conjoncture actuelle est défavorable.", "On soupçonne une collusion entre les deux entreprises."],
    },
    text: {
      title: "Chronique judiciaire",
      body: "L'audience s'est ouverte dans une atmosphère tendue. L'accusé, soupçonné d'avoir perpétré un cambriolage avec effraction, a invoqué un alibi que l'accusation a qualifié de pure conjecture. L'avocat de la défense, éminent pénaliste, a évoqué la conjoncture sociale difficile du quartier. Le tribunal a finalement infligé une peine de deux ans avec sursis, une décision qui a manifestement affligé la famille de la victime.",
      questions: [
        ["De quoi l'accusé est-il soupçonné ?", "d'un cambriolage avec effraction", ["d'une infraction au code de la route", "d'une fraude fiscale", "d'une agression"]],
        ["Comment a réagi la famille de la victime ?", "Elle a été affligée par la décision.", ["Elle a été soulagée.", "Elle a fait appel immédiatement.", "Elle n'était pas présente."]],
      ],
    },
    exercises: [
      mcq("Le juge lui a ___ une lourde amende.", "infligé", ["affligé", "inflogé", "affligeait"], "infliger une peine / une amende.", "paronyms", "vocabulary"),
      mcq("Un orage est ___ : rentrez vite !", "imminent", ["éminent", "immanent", "émanant"], "imminent = sur le point de se produire.", "paronyms", "vocabulary"),
      blank("Après une longue maladie, il a ___ la santé. (retrouvé)", "recouvré", "recouvrer = retrouver ; recouvrir = couvrir.", "paronyms", [], "vocabulary"),
      reorder("Ce village perpétue une tradition ancienne.", "perpétuer une tradition.", "paronyms", "vocabulary"),
      translate("The president gave a televised address.", "Le président a prononcé une allocution télévisée.", "allocution = discours ; allocation = somme versée.", "paronyms", ["Le président a fait une allocution télévisée."]),
    ],
    writing: {
      prompt: "Rédigez un court fait divers (100 mots) employant correctement au moins quatre paronymes de la leçon.",
      model: "Un cambriolage avec effraction a été perpétré cette nuit dans une bijouterie du centre-ville. Selon la police, les voleurs auraient profité d'une panne d'électricité imminente, annoncée la veille. Le propriétaire, encore affligé, a évoqué devant les journalistes un « travail de professionnels ». Les enquêteurs refusent pour l'instant toute conjecture. S'ils sont arrêtés, les auteurs se verront infliger une peine pouvant aller jusqu'à dix ans de prison.",
      checklist: ["au moins quatre paronymes employés au bon sens", "style de fait divers", "conditionnel journalistique si pertinent"],
    },
  },
  {
    theme: "Le style indirect libre",
    vocab: [
      ["le narrateur", "the narrator", "Le narrateur reste extérieur à l'histoire."],
      ["le point de vue", "the point of view", "Le récit adopte le point de vue du héros."],
      ["la focalisation interne", "internal focalisation", "La focalisation interne révèle ses pensées."],
      ["le monologue intérieur", "interior monologue", "Le roman s'ouvre sur un monologue intérieur."],
      ["discours direct / indirect", "direct / indirect speech", "Le discours direct est entre guillemets."],
      ["une ambiguïté", "an ambiguity", "Cette phrase crée une ambiguïté."],
      ["l'ironie (f.)", "irony", "L'ironie du narrateur est mordante."],
      ["se fondre", "to merge", "La voix du personnage se fond dans celle du narrateur."],
    ],
    grammar: {
      topic: "Le discours indirect libre",
      explanation:
        "Le discours indirect libre mêle la voix du narrateur et celle du personnage, sans verbe introducteur ni guillemets.\nIl garde les temps et les pronoms du discours indirect (3e personne, imparfait, conditionnel), mais conserve la spontanéité du discours direct (exclamations, questions, mots familiers).\n• Direct : Il se dit : « Je ne partirai jamais d'ici ! »\n• Indirect : Il se dit qu'il ne partirait jamais de là.\n• Indirect libre : Il regarda la mer. Partir ? Jamais il ne partirait d'ici !\nTrès employé par Flaubert, Zola ou Maryse Condé, il crée une proximité avec le personnage et peut servir l'ironie.",
      examples: ["Elle relut la lettre. Comment avait-il osé ? Après tout ce qu'elle avait fait pour lui !", "Il hésitait. Et si on le reconnaissait ? Tant pis, il fallait y aller.", "Le patron se frotta les mains : la journée serait excellente.", "Elle soupira. Encore un dimanche à attendre."],
    },
    text: {
      title: "Le retour",
      body: "Adama descendit du car devant la place du village. Rien n'avait changé : le même baobab, la même boutique, les mêmes enfants qui couraient pieds nus. Dix ans ! Dix ans qu'il était parti, persuadé qu'il reviendrait riche et respecté. Et il rentrait avec une valise et des dettes. Que dirait sa mère ? Elle le serrerait dans ses bras, bien sûr, elle ne poserait pas de questions. C'était pire.",
      questions: [
        ["Quelle technique l'auteur emploie-t-il dans « Que dirait sa mère ? » ?", "le discours indirect libre", ["le discours direct", "le discours indirect", "un dialogue"]],
        ["Pourquoi Adama pense-t-il que « c'était pire » ?", "parce que le silence de sa mère le mettrait face à son échec", ["parce que sa mère serait en colère", "parce que le village avait changé", "parce qu'il avait perdu sa valise"]],
      ],
    },
    exercises: [
      mcq("Quelle phrase est au discours indirect libre ?", "Elle ferma les yeux. Pourquoi avait-elle accepté ?", ["Elle se demanda pourquoi elle avait accepté.", "Elle se dit : « Pourquoi ai-je accepté ? »", "« Pourquoi as-tu accepté ? » demanda-t-il."], "Question du personnage sans verbe introducteur, à la 3e personne et au passé.", "free-indirect-speech"),
      mcq("Le discours indirect libre se caractérise par :", "l'absence de verbe introducteur et de guillemets", ["l'emploi obligatoire de la 1re personne", "l'emploi de guillemets", "le présent de l'indicatif obligatoire"], "Fusion des voix narrateur / personnage.", "free-indirect-speech"),
      blank("Direct : « Je partirai demain. » → Indirect libre : Il partirait ___. ", "le lendemain", "Transposition du temps et des repères : demain → le lendemain.", "free-indirect-speech"),
      reorder("Il regarda la pluie. Encore un jour perdu.", "Pensée du personnage intégrée au récit.", "free-indirect-speech"),
      translate("She looked at the letter. How could he have forgotten?", "Elle regarda la lettre. Comment avait-il pu oublier ?", "Question du personnage au plus-que-parfait, sans guillemets.", "free-indirect-speech", ["Elle regarda la lettre. Comment avait-il pu l'oublier ?"]),
    ],
    writing: {
      prompt: "Écrivez une courte scène (120 mots) où un personnage attend un résultat important, en utilisant le discours indirect libre pour révéler ses pensées.",
      model: "Ifeoma fixait l'écran de son téléphone. Les résultats devaient tomber à midi ; il était midi cinq. Et si le site était en panne ? Ou pire, si son nom n'apparaissait nulle part ? Trois ans de travail, de nuits blanches, de sacrifices ! Sa mère, elle, priait dans la pièce voisine. Ifeoma rafraîchit la page une fois, deux fois. Enfin, la liste. Elle parcourut les noms d'un doigt tremblant. Okafor… Okeke… Okonkwo. Admise. Elle était admise. Elle resta immobile, incapable de crier.",
      checklist: ["pensées du personnage sans verbe introducteur ni guillemets", "3e personne et temps du passé", "exclamations ou questions expressives"],
    },
  },
  {
    theme: "Les accords délicats",
    vocab: [
      ["tout / toute / tous / toutes", "all / quite", "Elle est toute contente."],
      ["même", "same / even", "Les enfants eux-mêmes ont ri."],
      ["demi", "half", "Une demi-heure ; deux heures et demie."],
      ["quelque", "some / however", "Quelques amis ; quelque vingt personnes."],
      ["nu", "bare", "Nu-pieds ; les pieds nus."],
      ["possible", "possible", "Le moins d'erreurs possible."],
      ["excepté", "except", "Excepté les enfants, tous sont partis."],
      ["ci-joint", "attached", "Ci-joint les factures ; les factures ci-jointes."],
    ],
    grammar: {
      topic: "Tout, même, demi, quelque et les adjectifs invariables",
      explanation:
        "• tout adverbe (= tout à fait) est invariable, SAUF devant un adjectif féminin commençant par une consonne ou un h aspiré : ils sont tout contents, elles sont tout étonnées, mais elle est toute petite.\n• même : adjectif, il s'accorde (les mêmes livres, eux-mêmes) ; adverbe (= aussi), il est invariable (même les enfants).\n• demi : invariable devant le nom avec trait d'union (une demi-heure) ; après le nom, accord en genre seulement (deux heures et demie).\n• quelque : adjectif = plusieurs (quelques amis) ; adverbe = environ, invariable (quelque cent personnes).\n• nu, ci-joint, excepté, passé : invariables placés avant le nom (nu-tête, ci-joint les documents), variables après (tête nue, les documents ci-joints).",
      examples: ["Elles étaient tout émues.", "Elle était toute honteuse.", "Même les plus sceptiques ont applaudi.", "Il a attendu une demi-heure, puis deux heures et demie."],
    },
    text: {
      title: "Correction d'un texte",
      body: "La correctrice relut le manuscrit avec attention. L'auteur avait écrit : « L'invitée, toute émue, arriva nu-pieds ; quelques cent personnes l'attendaient depuis une heure et demi. » Elle corrigea : « tout émue », car tout est ici adverbe devant un adjectif féminin commençant par une voyelle ; « quelque cent personnes », car quelque signifie environ ; et « une heure et demie », car demi s'accorde en genre après le nom. Nu-pieds, en revanche, était juste.",
      questions: [
        ["Pourquoi « tout émue » s'écrit-il sans e ?", "tout est adverbe devant un adjectif féminin commençant par une voyelle", ["parce que émue est masculin", "parce que tout est un pronom", "c'est une erreur de la correctrice"]],
        ["Que signifie « quelque cent personnes » ?", "environ cent personnes", ["plusieurs centaines de personnes", "cent personnes exactement", "moins de cent personnes"]],
      ],
    },
    exercises: [
      mcq("Elle est ___ heureuse. (= très)", "tout", ["toute", "toutes", "tous"], "tout adverbe devant un adjectif féminin à h muet → invariable.", "tricky-agreement"),
      mcq("Elle est restée ___ surprise.", "toute", ["tout", "toutes", "tous"], "Devant un adjectif féminin commençant par une consonne → toute.", "tricky-agreement"),
      blank("Il est arrivé à midi et ___. (demi)", "demi", "midi est masculin → et demi.", "tricky-agreement"),
      reorder("Veuillez trouver ci-joint les documents demandés.", "ci-joint en tête : invariable.", "tricky-agreement"),
      translate("Even the teachers were surprised.", "Même les professeurs ont été surpris.", "même adverbe (= aussi) : invariable.", "tricky-agreement", ["Même les enseignants ont été surpris.", "Les professeurs eux-mêmes ont été surpris."]),
    ],
    writing: {
      prompt: "Rédigez un paragraphe de 100 mots (description d'une fête, d'un voyage…) contenant au moins six occurrences des mots tout, même, demi, quelque, nu, ci-joint, correctement accordés.",
      model: "La fête a duré quelque cinq heures. Les invitées, tout émues, sont arrivées vers huit heures et demie ; certaines dansaient nu-pieds, d'autres gardaient les pieds nus sous leurs longues robes. Toutes les générations étaient présentes : même les grands-parents ont dansé ! Au bout d'une demi-heure, la musique est devenue toute différente. Vous trouverez ci-joint quelques photos ; les vidéos ci-jointes sont plus longues.",
      checklist: ["tout adverbe et adjectif correctement accordés", "demi avant / après le nom", "quelque (environ) vs quelques (plusieurs)"],
    },
  },
  {
    theme: "Rhétorique et éloquence",
    vocab: [
      ["l'anaphore (f.)", "anaphora", "« Moi président… » est une anaphore célèbre."],
      ["la gradation", "climax / gradation", "« Va, cours, vole » est une gradation."],
      ["le chiasme", "chiasmus", "« Il faut manger pour vivre et non vivre pour manger. »"],
      ["la question rhétorique", "rhetorical question", "« Qui pourrait l'accepter ? »"],
      ["l'exorde (m.)", "the opening of a speech", "L'exorde doit capter l'attention."],
      ["la péroraison", "the peroration / conclusion", "La péroraison appelle à l'action."],
      ["convaincre / persuader", "to convince / to persuade", "Convaincre par la raison, persuader par l'émotion."],
      ["un orateur / une oratrice", "a speaker / orator", "C'est une oratrice remarquable."],
    ],
    grammar: {
      topic: "Les procédés de l'éloquence",
      explanation:
        "Un discours s'organise traditionnellement en exorde (captiver), narration et argumentation, puis péroraison (émouvoir, appeler à agir).\nProcédés d'insistance et d'émotion :\n• anaphore : répétition en tête de phrase (« Nous ne renoncerons pas… Nous ne céderons pas… ») ;\n• gradation : termes d'intensité croissante ;\n• chiasme : structure croisée ABBA ;\n• question rhétorique : question qui n'attend pas de réponse ;\n• apostrophe : interpellation directe de l'auditoire ;\n• accumulation et rythme ternaire.\nConvaincre s'adresse à la raison (arguments, exemples) ; persuader s'adresse aux émotions.",
      examples: ["« Je suis venu, j'ai vu, j'ai vaincu. » (rythme ternaire)", "« Un pour tous, tous pour un. » (chiasme)", "« Jusqu'à quand abuseras-tu de notre patience ? » (question rhétorique)", "« Ce n'est pas un problème, c'est un drame, c'est une tragédie ! » (gradation)"],
    },
    text: {
      title: "Extrait d'un discours",
      body: "« Mesdames et messieurs, chers jeunes diplômés, regardez autour de vous. Regardez ces visages qui ont partagé vos doutes, vos nuits blanches, vos victoires. On vous dira que l'avenir est sombre. On vous dira que le monde n'a pas besoin de vous. On vous dira de vous taire. Mais qui, sinon vous, inventera les solutions de demain ? Ne demandez pas ce que ce pays peut faire pour vous : demandez-vous ce que vous pouvez faire pour lui. Osez, construisez, transformez ! »",
      questions: [
        ["Quel procédé repose sur la répétition de « On vous dira » ?", "l'anaphore", ["le chiasme", "la litote", "l'euphémisme"]],
        ["« Osez, construisez, transformez ! » est :", "une gradation au rythme ternaire", ["une question rhétorique", "un chiasme", "une antithèse"]],
      ],
    },
    exercises: [
      mcq("« Il faut manger pour vivre et non vivre pour manger » est :", "un chiasme", ["une anaphore", "une gradation", "une litote"], "Structure croisée ABBA.", "rhetoric"),
      mcq("Persuader, c'est surtout :", "toucher les émotions de l'auditoire", ["démontrer par la logique seule", "répéter les mêmes mots", "citer des chiffres"], "Persuader : émotions ; convaincre : raison.", "rhetoric", "vocabulary"),
      blank("La conclusion d'un discours, qui appelle à l'action, s'appelle la ___.", "péroraison", "exorde (début) / péroraison (fin).", "rhetoric", ["peroraison"], "vocabulary"),
      reorder("Qui pourrait rester indifférent à une telle injustice ?", "Question rhétorique.", "rhetoric"),
      translate("We will not give up, we will not yield, we will not fail.", "Nous n'abandonnerons pas, nous ne céderons pas, nous n'échouerons pas.", "Anaphore et rythme ternaire.", "rhetoric", ["Nous ne renoncerons pas, nous ne céderons pas, nous n'échouerons pas."]),
    ],
    writing: {
      prompt: "Rédigez la péroraison (120 mots) d'un discours pour encourager les jeunes de votre ville à apprendre une nouvelle langue. Employez au moins une anaphore, une gradation, une question rhétorique et un chiasme.",
      model: "Chers amis, apprendre une langue, c'est ouvrir une porte. Apprendre une langue, c'est tendre la main. Apprendre une langue, c'est refuser de rester enfermé dans un seul regard sur le monde. Qui parmi vous n'a jamais rêvé de comprendre une chanson, un film, un ami venu d'ailleurs ? Le français vous attend : il vous offrira des études, des voyages, des carrières, des amitiés pour la vie. N'oubliez jamais ceci : ce n'est pas la langue qui fait le voyageur, c'est le voyageur qui fait vivre la langue. Alors commencez, persévérez, triomphez !",
      checklist: ["anaphore, gradation, question rhétorique, chiasme", "apostrophe à l'auditoire", "élan final vers l'action"],
    },
  },
]);
