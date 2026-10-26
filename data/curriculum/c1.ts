import { blank, course, mcq, reorder, translate } from "./build.ts";

export const C1 = course("C1", [
  {
    theme: "Le subjonctif passé",
    vocab: [
      ["douter que", "to doubt that", "Je doute qu'il ait compris."],
      ["il est dommage que", "it's a pity that", "Il est dommage que tu sois parti si tôt."],
      ["avant que… ne", "before", "Partons avant qu'il ne soit trop tard."],
      ["s'étonner que", "to be surprised that", "Je m'étonne qu'elle n'ait rien dit."],
      ["déplorer", "to deplore", "Nous déplorons que la réunion ait été annulée."],
      ["il se peut que", "it may be that", "Il se peut qu'il se soit trompé."],
      ["le premier / le seul… qui", "the first / the only… who", "C'est le seul qui ait répondu."],
      ["à supposer que", "assuming that", "À supposer qu'il ait raison…"],
    ],
    grammar: {
      topic: "Le subjonctif passé",
      explanation:
        "Formation : auxiliaire avoir ou être au subjonctif présent + participe passé : que j'aie fini, qu'elle soit partie.\nIl exprime une action antérieure à celle du verbe principal, dans les contextes qui exigent le subjonctif : « Je suis content que tu aies réussi » (la réussite précède la joie).\nOn l'emploie aussi après un superlatif ou le seul / le premier / l'unique pour exprimer une appréciation subjective : « C'est le meilleur film que j'aie vu. »",
      examples: ["Je doute qu'il ait reçu mon message.", "Bien qu'elle soit arrivée en retard, elle a tout compris.", "C'est la plus belle ville que nous ayons visitée.", "Il est regrettable qu'aucune décision n'ait été prise."],
    },
    text: {
      title: "Bilan d'un projet",
      body: "Le comité regrette que le projet de bibliothèque numérique n'ait pas été achevé dans les délais. Il est vrai que les financements sont arrivés tardivement, mais il est étonnant que personne n'ait alerté la direction plus tôt. Bien que l'équipe ait fourni un travail considérable, il se peut que certains choix techniques aient été mal évalués. C'est pourtant le projet le plus ambitieux que l'université ait jamais lancé, et le comité souhaite qu'il soit relancé dès l'an prochain.",
      questions: [
        ["Qu'est-ce que le comité trouve étonnant ?", "que personne n'ait alerté la direction plus tôt", ["que le projet ait été financé", "que l'équipe ait travaillé dur", "que le projet soit ambitieux"]],
        ["Que souhaite le comité ?", "que le projet soit relancé l'an prochain", ["que l'équipe soit remplacée", "que le projet soit abandonné", "que les financements soient remboursés"]],
      ],
    },
    exercises: [
      mcq("Je suis heureux que vous ___ venir hier.", "ayez pu", ["avez pu", "pouviez", "puissiez"], "Action passée par rapport à la joie → subjonctif passé.", "subjonctif-passe"),
      mcq("C'est le meilleur livre que j'___ lu.", "aie", ["ai", "avais", "aurais"], "Superlatif + que → subjonctif (passé ici).", "subjonctif-passe"),
      blank("Bien qu'elle ___ partie tôt, elle a raté le train. (être)", "soit", "Partir → être ; bien que + subjonctif passé.", "subjonctif-passe"),
      reorder("Je doute qu'il ait compris la question.", "douter que + subjonctif passé.", "subjonctif-passe"),
      translate("It's a pity that you didn't see the exhibition.", "Il est dommage que tu n'aies pas vu l'exposition.", "il est dommage que + subjonctif passé.", "subjonctif-passe", ["C'est dommage que tu n'aies pas vu l'exposition.", "Il est dommage que vous n'ayez pas vu l'exposition."]),
    ],
    writing: {
      prompt: "Rédigez un bref bilan (120 mots) d'une expérience passée (projet, voyage, formation) en exprimant regrets et satisfactions au subjonctif passé.",
      model: "Je suis ravi que notre équipe ait terminé le site internet à temps, même si je regrette que nous n'ayons pas pu tester toutes les fonctionnalités. Il est dommage que le client ait changé d'avis si tard, mais je suis fier que chacun soit resté motivé. C'est sans doute le projet le plus formateur que j'aie mené cette année. À l'avenir, il faudra que nous prévoyions davantage de temps pour les imprévus.",
      checklist: ["subjonctif passé (aie / sois + participe)", "verbes de sentiment, doute ou superlatif", "nuance entre regrets et satisfactions"],
    },
  },
  {
    theme: "Nuancer une concession",
    vocab: [
      ["quoique", "although", "Quoiqu'il soit jeune, il est très compétent."],
      ["quel que soit", "whatever", "Quel que soit le prix, je l'achète."],
      ["quoi que", "whatever (pronoun)", "Quoi que tu dises, je ne changerai pas d'avis."],
      ["si… que", "however… (+ adj.)", "Si difficile que ce soit, nous y arriverons."],
      ["avoir beau", "however much / no matter how", "J'ai beau chercher, je ne trouve pas."],
      ["toujours est-il que", "the fact remains that", "Toujours est-il qu'il est en retard."],
      ["il n'en reste pas moins que", "nonetheless", "Il n'en reste pas moins que c'est une erreur."],
      ["quand bien même", "even if", "Quand bien même il viendrait, rien ne changerait."],
    ],
    grammar: {
      topic: "Les nuances de la concession",
      explanation:
        "• quoique / bien que + subjonctif.\n• quel(le)(s) que + être au subjonctif, accordé avec le sujet : quelle que soit la difficulté, quels que soient les risques.\n• quoi que (en deux mots) = quelle que soit la chose que : quoi qu'il arrive.\n• si / aussi / pour + adjectif + que + subjonctif : si intelligent qu'il soit.\n• avoir beau + infinitif : j'ai beau insister, il refuse.\n• quand bien même + conditionnel.\n• Après la concession : toujours est-il que, il n'en reste pas moins que, il n'empêche que.",
      examples: ["Quelles que soient vos raisons, c'est inacceptable.", "Quoi que vous fassiez, faites-le bien.", "Elle a beau travailler, elle n'est jamais satisfaite.", "Si compétent qu'il soit, il a besoin d'aide."],
    },
    text: {
      title: "L'éloge de l'échec",
      body: "Nous avons beau répéter aux jeunes que l'échec fait partie de l'apprentissage, la peur de se tromper reste paralysante. Quelles que soient leurs qualités, beaucoup d'étudiants renoncent à des projets ambitieux par crainte du jugement. Certes, un échec coûte du temps et parfois de l'argent. Il n'en reste pas moins qu'il apprend davantage qu'une réussite facile. Quoi qu'en disent les classements et les notes, la persévérance est sans doute la compétence la plus précieuse.",
      questions: [
        ["Selon l'auteur, pourquoi des étudiants renoncent-ils à leurs projets ?", "par peur du jugement", ["par manque d'argent", "par manque de temps", "parce qu'ils sont paresseux"]],
        ["Quelle est, selon l'auteur, la compétence la plus précieuse ?", "la persévérance", ["l'intelligence", "la prudence", "la réussite scolaire"]],
      ],
    },
    exercises: [
      mcq("___ soient les difficultés, nous continuerons.", "Quelles que", ["Quelque", "Quoique", "Quels que"], "difficultés (f. pl.) → quelles que soient.", "concession"),
      mcq("___ tu fasses, il ne sera pas content.", "Quoi que", ["Quoique", "Quel que", "Bien que"], "quoi que (deux mots) = whatever.", "concession"),
      blank("J'ai ___ lui expliquer, il ne comprend pas.", "beau", "avoir beau + infinitif.", "avoir-beau"),
      reorder("Si fatigué qu'il soit il finira son travail.", "si + adjectif + que + subjonctif.", "concession"),
      translate("Whatever the price, we will buy this house.", "Quel que soit le prix, nous achèterons cette maison.", "prix (m. sg.) → quel que soit.", "concession", ["Quel que soit son prix, nous achèterons cette maison."]),
    ],
    writing: {
      prompt: "« Il faut toujours suivre ses rêves. » Nuancez cette affirmation en un paragraphe de 150 mots, avec au moins trois structures concessives.",
      model: "Suivre ses rêves est sans doute une belle ambition. On a beau être réaliste, une vie sans projet personnel paraît vite terne. Toutefois, quelles que soient nos aspirations, il faut tenir compte de nos responsabilités : une famille à nourrir, des dettes à rembourser. Si légitime que soit le désir de tout quitter pour vivre de sa passion, il n'en reste pas moins qu'un plan solide est indispensable. Quoi qu'en disent les discours de motivation, le courage ne remplace pas la préparation. Il me semble donc plus sage de poursuivre ses rêves progressivement, en sécurisant chaque étape.",
      checklist: ["au moins trois structures concessives variées", "accord de quel que", "progression logique de l'argument"],
    },
  },
  {
    theme: "Expressions imagées",
    vocab: [
      ["poser un lapin", "to stand someone up", "Il m'a posé un lapin hier soir."],
      ["avoir un chat dans la gorge", "to have a frog in one's throat", "Excusez-moi, j'ai un chat dans la gorge."],
      ["être têtu comme une mule", "to be as stubborn as a mule", "Mon frère est têtu comme une mule."],
      ["donner sa langue au chat", "to give up guessing", "Je donne ma langue au chat : c'est quoi ?"],
      ["tomber dans les pommes", "to faint", "Avec la chaleur, elle est tombée dans les pommes."],
      ["coûter les yeux de la tête", "to cost an arm and a leg", "Cette voiture coûte les yeux de la tête."],
      ["mettre la main à la pâte", "to pitch in", "Tout le monde a mis la main à la pâte."],
      ["avoir la puce à l'oreille", "to become suspicious", "Son silence m'a mis la puce à l'oreille."],
    ],
    grammar: {
      topic: "Les expressions idiomatiques",
      explanation:
        "Les expressions idiomatiques ne se traduisent pas mot à mot. Elles marquent souvent un registre courant ou familier et donnent du naturel au discours.\nQuelques familles utiles :\n• animaux : poser un lapin, quand les poules auront des dents (jamais), il fait un froid de canard ;\n• corps : coûter les yeux de la tête, avoir le bras long (avoir de l'influence), casser les pieds (ennuyer) ;\n• nourriture : raconter des salades (mentir), ce n'est pas de la tarte (c'est difficile).\nÀ l'écrit soutenu, on les évite ou on les met entre guillemets.",
      examples: ["Il raconte des salades : ne le crois pas.", "Ce projet, ce n'est pas de la tarte !", "Elle a le bras long dans ce ministère.", "Arrête de me casser les pieds !"],
    },
    text: {
      title: "Une soirée ratée",
      body: "Samedi, Julien avait réservé une table dans un restaurant qui coûte les yeux de la tête. Il attendait Inès, mais elle lui a posé un lapin. Au bout d'une heure, il a commencé à avoir la puce à l'oreille : elle ne répondait plus à ses messages. Le lendemain, elle lui a raconté qu'elle était tombée dans les pommes à cause de la chaleur. Julien pense qu'elle raconte des salades, mais il est têtu comme une mule : il compte bien l'inviter à nouveau.",
      questions: [
        ["Que s'est-il passé samedi ?", "Inès n'est pas venue au rendez-vous.", ["Le restaurant était fermé.", "Julien est tombé malade.", "Ils se sont disputés."]],
        ["Que pense Julien de l'explication d'Inès ?", "Il pense qu'elle ment.", ["Il la croit totalement.", "Il est inquiet pour sa santé.", "Il ne veut plus la voir."]],
      ],
    },
    exercises: [
      mcq("« Il m'a posé un lapin » signifie :", "Il n'est pas venu au rendez-vous.", ["Il m'a offert un animal.", "Il m'a fait une blague.", "Il m'a invité à dîner."], "poser un lapin = ne pas venir.", "idioms", "vocabulary"),
      mcq("« Ce n'est pas de la tarte » signifie :", "C'est difficile.", ["C'est délicieux.", "C'est bon marché.", "C'est une erreur."], "Expression familière : c'est difficile.", "idioms", "vocabulary"),
      blank("Ce sac coûte les yeux de la ___.", "tête", "coûter les yeux de la tête = très cher.", "idioms", [], "vocabulary"),
      reorder("Tout le monde a mis la main à la pâte.", "Expression : participer au travail.", "idioms", "vocabulary"),
      translate("I give up, tell me the answer!", "Je donne ma langue au chat, dis-moi la réponse !", "give up guessing → donner sa langue au chat.", "idioms", ["Je donne ma langue au chat, donne-moi la réponse !"]),
    ],
    writing: {
      prompt: "Racontez une anecdote drôle ou embarrassante en utilisant au moins quatre expressions idiomatiques.",
      model: "La semaine dernière, mon collègue devait présenter un rapport important, mais il avait un chat dans la gorge et ne pouvait presque pas parler. Notre chef, têtu comme une mule, a refusé de reporter la réunion. Finalement, toute l'équipe a mis la main à la pâte et j'ai lu le rapport à sa place. Ce n'était pas de la tarte, mais le client a été convaincu !",
      checklist: ["au moins quatre expressions idiomatiques bien employées", "récit cohérent au passé", "registre courant"],
    },
  },
  {
    theme: "Les registres de langue",
    vocab: [
      ["une bagnole (fam.)", "a car (slang)", "Il a une nouvelle bagnole."],
      ["le boulot (fam.)", "work / job (slang)", "Je vais au boulot."],
      ["bosser (fam.)", "to work (slang)", "Il bosse dur."],
      ["se casser (fam.)", "to leave / clear off (slang)", "On se casse ?"],
      ["fric (fam.)", "money (slang)", "Il n'a pas de fric."],
      ["demeurer (sout.)", "to reside / remain (formal)", "Il demeure à Lyon."],
      ["se rendre (sout.)", "to go (formal)", "Je me rendrai à la réunion."],
      ["solliciter (sout.)", "to request (formal)", "Je sollicite un entretien."],
    ],
    grammar: {
      topic: "Familier, courant, soutenu",
      explanation:
        "Le français distingue trois grands registres :\n• familier : vocabulaire argotique (boulot, bouquin, flic), négation sans ne (« je sais pas »), on pour nous, questions par intonation ;\n• courant : langue standard (travail, livre, policier) ;\n• soutenu : vocabulaire recherché (labeur, ouvrage), inversion du sujet (« Puis-je… ? »), subjonctif imparfait possible à l'écrit littéraire.\nSavoir passer d'un registre à l'autre selon l'interlocuteur est une compétence clé du niveau C1.",
      examples: ["Familier : T'as vu ma bagnole ?", "Courant : Tu as vu ma voiture ?", "Soutenu : Avez-vous aperçu mon véhicule ?", "Familier : J'ai pas le temps. / Courant : Je n'ai pas le temps."],
    },
    text: {
      title: "Trois façons de dire la même chose",
      body: "Kader raconte sa journée à un ami : « J'en ai marre de mon boulot, mon chef me prend la tête et je suis crevé. » Le soir, il explique à sa mère : « Je suis fatigué ; mon travail est difficile et mon responsable est très exigeant. » Enfin, dans sa lettre de démission, il écrit : « Je vous informe de ma décision de quitter mes fonctions, les conditions actuelles ne me permettant plus de m'épanouir. » Le message est le même ; seul le registre change.",
      questions: [
        ["Dans quel registre Kader parle-t-il à son ami ?", "familier", ["soutenu", "courant", "administratif"]],
        ["Que signifie « mon chef me prend la tête » ?", "mon chef m'agace", ["mon chef me félicite", "mon chef me licencie", "mon chef me paie bien"]],
      ],
    },
    exercises: [
      mcq("Équivalent courant de « bouquin » :", "livre", ["journal", "ouvrage", "cahier"], "bouquin (fam.) → livre (courant) → ouvrage (soutenu).", "registers", "vocabulary"),
      mcq("Quelle phrase est au registre soutenu ?", "Puis-je vous aider ?", ["Je peux t'aider ?", "J'peux t'aider ?", "Tu veux un coup de main ?"], "Inversion + vous → soutenu.", "registers"),
      blank("Familier : « J'ai pas faim. » → Courant : « Je ___ pas faim. »", "n'ai", "La négation complète ne… pas.", "registers"),
      reorder("Je me rendrai à la réunion demain matin.", "se rendre = aller (soutenu).", "registers", "vocabulary"),
      translate("I'm fed up with my job. (informal)", "J'en ai marre de mon boulot.", "Registre familier : en avoir marre, boulot.", "registers", ["J'en ai marre de mon travail.", "J'en ai ras le bol de mon boulot."]),
    ],
    writing: {
      prompt: "Racontez le même petit incident (un retard, une panne…) dans les trois registres : à un ami (SMS), à un collègue, puis dans un courriel formel.",
      model: "SMS : « Désolé, j'suis à la bourre, ma bagnole est en rade ! »\nCollègue : « Je suis désolé, je vais être en retard : ma voiture est tombée en panne. »\nCourriel formel : « Je vous prie de bien vouloir excuser mon retard, imputable à une panne de mon véhicule. Je serai présent dans les meilleurs délais. »",
      checklist: ["vocabulaire adapté à chaque registre", "négation et questions selon le registre", "même information transmise trois fois"],
    },
  },
  {
    theme: "La nominalisation",
    vocab: [
      ["la hausse", "the rise", "La hausse des prix inquiète."],
      ["la baisse", "the fall", "On constate une baisse du chômage."],
      ["la mise en place", "the implementation", "La mise en place de la réforme prendra du temps."],
      ["le report", "the postponement", "Le report du vote est confirmé."],
      ["la prise de conscience", "the awareness", "Il y a une prise de conscience écologique."],
      ["l'ouverture (f.)", "the opening", "L'ouverture du magasin est prévue lundi."],
      ["la suppression", "the removal / abolition", "La suppression de la taxe est annoncée."],
      ["l'adoption (f.)", "the adoption", "L'adoption de la loi a été rapide."],
    ],
    grammar: {
      topic: "La nominalisation",
      explanation:
        "Nominaliser, c'est transformer un verbe ou un adjectif en nom pour condenser l'information. C'est typique des titres de presse, des rapports et de l'écrit académique.\n• Suffixes fréquents : -tion (adopter → l'adoption), -ment (lancer → le lancement), -age (nettoyer → le nettoyage), -ure (ouvrir → l'ouverture), -ée (arriver → l'arrivée), -té / -esse (rapide → la rapidité, faible → la faiblesse).\n• « Les prix augmentent fortement » → « Forte augmentation des prix ».\n• Attention : certains noms sont irréguliers (choisir → le choix, perdre → la perte).",
      examples: ["Le gouvernement a annoncé qu'il réformait les retraites → Annonce d'une réforme des retraites.", "Le magasin ouvre lundi → Ouverture du magasin lundi.", "Les étudiants sont inquiets → L'inquiétude des étudiants.", "On a reporté le match → Report du match."],
    },
    text: {
      title: "Revue de presse",
      body: "Hausse record du prix du carburant. Après l'annonce de la suppression des subventions, les transporteurs dénoncent une décision brutale. Le gouvernement promet la mise en place rapide d'aides ciblées et l'ouverture de négociations avec les syndicats. De leur côté, les économistes saluent une prise de conscience nécessaire, tout en redoutant une baisse de la consommation. Report probable de la grève prévue lundi.",
      questions: [
        ["Quelle décision a provoqué la colère des transporteurs ?", "la suppression des subventions", ["la hausse des salaires", "le report de la grève", "l'ouverture des négociations"]],
        ["Que redoutent les économistes ?", "une baisse de la consommation", ["une hausse du chômage", "la fin des négociations", "une grève générale"]],
      ],
    },
    exercises: [
      mcq("Nom correspondant à « choisir » :", "le choix", ["le choisissement", "la choisie", "le choisir"], "Nominalisation irrégulière.", "nominalisation", "vocabulary"),
      mcq("« Le train arrive à 10 h » → titre :", "Arrivée du train à 10 h", ["Arriver du train à 10 h", "Arrivement du train à 10 h", "Arrivage du train à 10 h"], "arriver → l'arrivée.", "nominalisation", "vocabulary"),
      blank("« On a lancé le produit hier » → Le ___ du produit a eu lieu hier.", "lancement", "lancer → le lancement.", "nominalisation", [], "vocabulary"),
      reorder("Forte augmentation des prix de l'immobilier.", "Titre de presse nominal.", "nominalisation"),
      translate("Opening of the new bridge postponed.", "Report de l'ouverture du nouveau pont.", "Style nominal des titres.", "nominalisation", ["Ouverture du nouveau pont reportée."]),
    ],
    writing: {
      prompt: "Transformez cinq informations d'actualité de votre pays en titres de presse nominaux, puis rédigez un court chapeau (3 phrases) pour l'un d'eux.",
      model: "1. Baisse du prix du riz sur les marchés de Lagos.\n2. Ouverture d'un nouveau terminal à l'aéroport d'Abuja.\n3. Report des examens nationaux à juillet.\n4. Hausse des inscriptions dans les écoles de langues.\n5. Lancement d'une campagne de vaccination.\nChapeau (3) : Le ministère de l'Éducation a confirmé hier le report des examens nationaux. Cette décision fait suite aux inondations qui ont touché plusieurs régions. Les élèves disposeront ainsi de trois semaines supplémentaires de préparation.",
      checklist: ["noms dérivés corrects (-tion, -ment, -ée, -ure…)", "absence de verbe conjugué dans les titres", "chapeau informatif et concis"],
    },
  },
  {
    theme: "L'hypothèse avancée",
    vocab: [
      ["au cas où", "in case", "Prends un parapluie au cas où il pleuvrait."],
      ["à condition que", "provided that", "Je viendrai à condition que tu m'invites."],
      ["pour peu que", "if only / as long as", "Pour peu qu'il fasse beau, la fête sera réussie."],
      ["en admettant que", "assuming that", "En admettant que tu aies raison…"],
      ["à moins de", "unless", "À moins d'un miracle, nous perdrons."],
      ["sinon", "otherwise", "Dépêche-toi, sinon tu vas rater le bus."],
      ["dans l'hypothèse où", "in the event that", "Dans l'hypothèse où le contrat serait signé…"],
      ["faute de", "for lack of", "Faute de temps, je n'ai pas fini."],
    ],
    grammar: {
      topic: "Exprimer la condition et l'hypothèse",
      explanation:
        "Au-delà de si :\n• + conditionnel : au cas où, dans l'hypothèse où, quand bien même.\n• + subjonctif : à condition que, pourvu que, pour peu que, en admettant que, à supposer que, à moins que.\n• + infinitif (même sujet) : à condition de, à moins de.\n• + nom : en cas de, à moins de, faute de, sans (« Sans ton aide, j'aurais échoué »).\n• Gérondif : En partant maintenant, tu arriveras à l'heure.",
      examples: ["Au cas où tu aurais besoin de moi, appelle-moi.", "Je t'aiderai à condition que tu sois honnête.", "En cas de problème, contactez l'accueil.", "Sans carte, impossible d'entrer."],
    },
    text: {
      title: "Plan de continuité",
      body: "Au cas où une coupure d'électricité surviendrait, les données seraient automatiquement sauvegardées sur un serveur distant. En cas de panne prolongée, le personnel pourra travailler depuis l'agence de Port-Harcourt, à condition que la connexion internet y soit disponible. Pour peu que chacun respecte ces consignes, l'activité ne sera pas interrompue. Faute de préparation, en revanche, une simple panne pourrait coûter plusieurs jours de travail.",
      questions: [
        ["Que se passerait-il en cas de coupure d'électricité ?", "Les données seraient sauvegardées automatiquement.", ["Le personnel rentrerait chez lui.", "L'activité serait suspendue.", "Les serveurs seraient éteints."]],
        ["À quelle condition le personnel pourra-t-il travailler depuis Port-Harcourt ?", "si la connexion internet y est disponible", ["si le directeur l'accepte", "si la panne dure moins d'un jour", "si l'agence est ouverte le week-end"]],
      ],
    },
    exercises: [
      mcq("Prends ton manteau au cas où il ___ froid.", "ferait", ["fasse", "fait", "fera"], "au cas où + conditionnel.", "hypothesis"),
      mcq("Je te prête ma voiture à condition que tu ___ prudent.", "sois", ["es", "serais", "seras"], "à condition que + subjonctif.", "hypothesis"),
      blank("___ de moyens, le projet a été abandonné. (for lack of)", "Faute", "faute de + nom.", "hypothesis", ["faute"]),
      reorder("En cas d'urgence appelez ce numéro.", "en cas de + nom.", "hypothesis"),
      translate("Unless there is a strike, the train will leave on time.", "À moins d'une grève, le train partira à l'heure.", "à moins de + nom.", "hypothesis", ["À moins qu'il y ait une grève, le train partira à l'heure.", "Sauf grève, le train partira à l'heure."]),
    ],
    writing: {
      prompt: "Rédigez les consignes de sécurité pour un événement (concert, conférence) en variant les façons d'exprimer la condition.",
      model: "En cas d'incendie, les participants devront quitter la salle par les sorties de secours. Au cas où un spectateur se sentirait mal, il pourra s'adresser au poste de secours situé à l'entrée. L'accès sera autorisé à condition que chacun présente son billet et une pièce d'identité. Pour peu que ces règles soient respectées, la soirée se déroulera dans les meilleures conditions.",
      checklist: ["au moins quatre structures différentes", "bon mode après chaque conjonction (conditionnel, subjonctif)", "registre formel"],
    },
  },
  {
    theme: "Le ne explétif",
    vocab: [
      ["craindre", "to fear", "Je crains qu'il ne soit trop tard."],
      ["redouter", "to dread", "Elle redoute que son fils ne parte."],
      ["empêcher", "to prevent", "Rien n'empêche qu'il ne vienne."],
      ["éviter que", "to avoid", "Évitez que la porte ne claque."],
      ["de peur que", "for fear that", "Il parle bas de peur qu'on ne l'entende."],
      ["à moins que", "unless", "Je viendrai, à moins qu'il ne pleuve."],
      ["plus… que", "more… than", "Il est plus tard que je ne le pensais."],
      ["avant que", "before", "Rentrons avant qu'il ne fasse nuit."],
    ],
    grammar: {
      topic: "Le ne explétif",
      explanation:
        "Le ne explétif n'a aucune valeur négative : il appartient au registre soutenu et reste facultatif.\nOn le trouve après :\n• les verbes de crainte : craindre que, avoir peur que, redouter que ;\n• avant que, à moins que, de peur que, de crainte que ;\n• éviter que, empêcher que ;\n• les comparaisons d'inégalité : plus / moins… que + verbe conjugué.\n« Je crains qu'il ne pleuve » = j'ai peur qu'il pleuve. Pour une vraie négation, il faut ne… pas : « Je crains qu'il ne pleuve pas. »",
      examples: ["J'ai peur qu'il ne se trompe.", "Partez avant qu'il ne soit trop tard.", "C'est plus difficile que je ne l'imaginais.", "Il faut éviter que la situation ne s'aggrave."],
    },
    text: {
      title: "Inquiétudes d'un éditeur",
      body: "L'éditeur craignait que le manuscrit ne soit pas prêt à temps. Il avait raison : l'auteure, de peur que son roman ne déçoive, réécrivait sans cesse le dernier chapitre. « Le livre est bien meilleur que je ne l'espérais », reconnaît-il aujourd'hui. Il a cependant dû repousser la sortie pour éviter que la presse ne reçoive une version inachevée.",
      questions: [
        ["Pourquoi l'auteure réécrivait-elle le dernier chapitre ?", "de peur que son roman déçoive", ["parce que l'éditeur l'exigeait", "parce qu'elle manquait d'idées", "pour l'allonger"]],
        ["Que signifie « Je crains qu'il ne soit pas prêt » ?", "J'ai peur qu'il ne soit pas prêt (négation réelle).", ["J'ai peur qu'il soit prêt.", "Je suis sûr qu'il est prêt.", "Je souhaite qu'il soit prêt."]],
      ],
    },
    exercises: [
      mcq("« Je crains qu'il ne vienne. » signifie :", "J'ai peur qu'il vienne.", ["J'ai peur qu'il ne vienne pas.", "Je sais qu'il ne viendra pas.", "Je souhaite qu'il vienne."], "Le ne explétif n'est pas négatif.", "ne-expletif"),
      mcq("Où peut-on employer un ne explétif ?", "Partons avant qu'il ___ pleuve.", ["Partons après qu'il ___ pleut.", "Je pense qu'il ___ pleut.", "Il dit qu'il ___ pleut."], "avant que admet le ne explétif.", "ne-expletif"),
      blank("C'est plus simple que je ___ le croyais.", "ne", "Comparaison d'inégalité → ne explétif possible.", "ne-expletif"),
      reorder("Il faut éviter que l'enfant ne tombe.", "éviter que + ne explétif + subjonctif.", "ne-expletif"),
      translate("I am afraid he might make a mistake. (formal)", "Je crains qu'il ne se trompe.", "Verbe de crainte + ne explétif.", "ne-expletif", ["J'ai peur qu'il ne se trompe.", "Je crains qu'il ne fasse une erreur."]),
    ],
    writing: {
      prompt: "Rédigez une note interne (100 mots) exprimant vos inquiétudes au sujet d'un projet, en utilisant le ne explétif au moins trois fois.",
      model: "Je crains que le calendrier actuel ne soit trop ambitieux. Les tests ont révélé plus d'anomalies que nous ne l'avions prévu, et je redoute que le client ne découvre ces problèmes avant la livraison. Afin d'éviter que la situation ne se dégrade, je propose de reporter la mise en ligne de deux semaines. Il serait souhaitable de réunir l'équipe avant que les délais ne deviennent intenables.",
      checklist: ["ne explétif correctement placé (sans pas)", "subjonctif après les verbes de crainte", "registre soutenu"],
    },
  },
  {
    theme: "Les verbes pronominaux et l'accord",
    vocab: [
      ["se souvenir de", "to remember", "Elle s'est souvenue de son enfance."],
      ["s'apercevoir de", "to notice", "Ils se sont aperçus de leur erreur."],
      ["se succéder", "to follow one another", "Les ministres se sont succédé."],
      ["se plaire", "to enjoy (being somewhere)", "Elles se sont plu à Lyon."],
      ["se rendre compte", "to realise", "Elle s'est rendu compte du problème."],
      ["se laver les mains", "to wash one's hands", "Elle s'est lavé les mains."],
      ["s'écrire", "to write to each other", "Ils se sont écrit pendant des années."],
      ["s'en aller", "to go away", "Elles s'en sont allées."],
    ],
    grammar: {
      topic: "L'accord du participe passé des verbes pronominaux",
      explanation:
        "Règle de base : le participe s'accorde avec le COD si celui-ci est placé avant.\n• Se = COD → accord : « Elle s'est lavée » (elle a lavé qui ? se = elle).\n• COD après le verbe → pas d'accord : « Elle s'est lavé les mains. »\n• Se = COI (verbes construits avec à) → pas d'accord : « Ils se sont parlé » (parler à), se sont écrit, se sont téléphoné, se sont souri, se sont succédé, se sont plu.\n• Verbes essentiellement pronominaux (s'évanouir, se souvenir, s'apercevoir, s'en aller) → accord avec le sujet.\n• Exception : se rendre compte reste invariable.",
      examples: ["Elles se sont regardées.", "Elles se sont parlé longtemps.", "Ils se sont souvenus de cette journée.", "Elle s'est coupé le doigt."],
    },
    text: {
      title: "Des retrouvailles",
      body: "Amina et Joëlle se sont connues au lycée de Cotonou. Après le baccalauréat, elles se sont perdues de vue : l'une est partie à Paris, l'autre à Montréal. Pendant quelques années, elles se sont écrit de longues lettres, puis elles ne se sont plus parlé. Vingt ans plus tard, elles se sont croisées par hasard dans un aéroport. Elles se sont reconnues immédiatement et se sont souri, émues. Elles se sont rendu compte que rien n'avait changé.",
      questions: [
        ["Où se sont-elles connues ?", "au lycée de Cotonou", ["à Paris", "à Montréal", "dans un aéroport"]],
        ["Comment se sont-elles retrouvées ?", "par hasard dans un aéroport", ["grâce à une lettre", "sur les réseaux sociaux", "lors d'un mariage"]],
      ],
    },
    exercises: [
      mcq("Elles se sont ___ pendant des heures. (parler)", "parlé", ["parlées", "parlés", "parlée"], "parler à → se = COI → invariable.", "pronominal-agreement"),
      mcq("Elle s'est ___ les cheveux.", "coupé", ["coupée", "coupés", "coupées"], "COD (les cheveux) après le verbe → pas d'accord.", "pronominal-agreement"),
      blank("Ils se sont ___ de leur erreur. (s'apercevoir)", "aperçus", "Verbe essentiellement pronominal → accord avec le sujet.", "pronominal-agreement"),
      reorder("Elles se sont rendu compte du problème.", "se rendre compte : participe invariable.", "pronominal-agreement"),
      translate("They (f.) looked at each other and smiled at each other.", "Elles se sont regardées et se sont souri.", "regarder qqn → accord ; sourire à → invariable.", "pronominal-agreement"),
    ],
    writing: {
      prompt: "Racontez une rencontre ou des retrouvailles (100 mots) en utilisant au moins cinq verbes pronominaux au passé composé, avec les bons accords.",
      model: "Mes parents se sont rencontrés à un mariage en 1995. Ils se sont parlé toute la soirée et, le lendemain, ils se sont téléphoné. Pendant un an, ils se sont écrit chaque semaine, car ma mère étudiait à Dakar. Ils se sont mariés en 1997. Ma mère dit qu'elle s'est rendu compte très vite qu'ils s'étaient trouvés.",
      checklist: ["accord quand se est COD", "pas d'accord quand se est COI (parler, écrire, téléphoner)", "se rendre compte invariable"],
    },
  },
  {
    theme: "L'inversion du sujet",
    vocab: [
      ["à peine… que", "hardly… when", "À peine était-il arrivé qu'il est reparti."],
      ["peut-être", "perhaps", "Peut-être a-t-il oublié."],
      ["sans doute", "probably / no doubt", "Sans doute viendra-t-elle demain."],
      ["aussi (en tête)", "therefore", "Il pleuvait ; aussi sommes-nous restés."],
      ["encore", "even then / still", "Encore faut-il qu'il accepte."],
      ["ainsi", "thus", "Ainsi s'achève notre voyage."],
      ["du moins", "at least", "Du moins le croyait-il."],
      ["toujours est-il que", "the fact remains", "Toujours est-il qu'il a gagné."],
    ],
    grammar: {
      topic: "L'inversion du sujet après certains adverbes",
      explanation:
        "En registre soutenu, certains adverbes placés en tête de phrase entraînent l'inversion du sujet : peut-être, sans doute, à peine, aussi (= donc), encore, du moins, ainsi.\n• Sujet pronom : inversion simple. « Peut-être viendra-t-il. »\n• Sujet nom : inversion complexe (le nom reste, un pronom est ajouté). « Sans doute le ministre démissionnera-t-il. »\nAlternative courante : peut-être que / sans doute que + ordre normal : « Peut-être qu'il viendra. »\nN'oubliez pas le -t- euphonique entre deux voyelles : a-t-il, viendra-t-elle.",
      examples: ["À peine avais-je fermé la porte que le téléphone a sonné.", "Peut-être les résultats seront-ils meilleurs demain.", "Le train était en retard ; aussi avons-nous pris un taxi.", "Encore faudrait-il qu'il soit d'accord."],
    },
    text: {
      title: "Chronique d'une élection",
      body: "À peine les bureaux de vote avaient-ils fermé que les premiers résultats circulaient sur les réseaux sociaux. Sans doute certains chiffres étaient-ils fantaisistes ; aussi la commission électorale a-t-elle appelé à la prudence. Peut-être le vainqueur sera-t-il connu dès ce soir. Encore faut-il que le dépouillement se déroule sans incident. Toujours est-il que la participation, du moins dans les grandes villes, semble exceptionnelle.",
      questions: [
        ["Pourquoi la commission a-t-elle appelé à la prudence ?", "parce que certains chiffres circulant étaient sans doute faux", ["parce que les bureaux étaient fermés", "parce que la participation était faible", "parce que le vainqueur était connu"]],
        ["Que dit le texte de la participation ?", "Elle semble exceptionnelle, au moins dans les grandes villes.", ["Elle est très faible.", "Elle est inconnue.", "Elle est identique à la dernière élection."]],
      ],
    },
    exercises: [
      mcq("Forme soutenue correcte :", "Peut-être viendra-t-il demain.", ["Peut-être il viendra demain.", "Peut-être viendra il demain.", "Peut-être que viendra-t-il demain."], "Peut-être en tête → inversion.", "inversion"),
      mcq("À peine ___ qu'il s'est mis à pleuvoir.", "étions-nous sortis", ["nous étions sortis", "nous sommes sortis", "sortions-nous"], "À peine + inversion + que.", "inversion"),
      blank("Il était fatigué ; aussi ___-il rentré tôt. (être)", "est", "aussi (= donc) en tête → inversion : aussi est-il rentré.", "inversion"),
      reorder("Sans doute le directeur acceptera-t-il la proposition.", "Inversion complexe avec un sujet nominal.", "inversion"),
      translate("Perhaps the minister will resign.", "Peut-être le ministre démissionnera-t-il.", "Inversion complexe en registre soutenu.", "inversion", ["Peut-être que le ministre démissionnera.", "Le ministre démissionnera peut-être."]),
    ],
    writing: {
      prompt: "Rédigez un court commentaire d'actualité (100 mots) en registre soutenu, avec au moins trois inversions après adverbe.",
      model: "À peine la nouvelle loi avait-elle été votée que les syndicats annonçaient une grève. Sans doute le gouvernement espérait-il un accueil plus favorable. Les négociations semblent bloquées ; aussi faut-il craindre un mouvement prolongé. Peut-être un compromis sera-t-il trouvé d'ici la fin du mois. Encore faudrait-il que chaque partie accepte de faire des concessions.",
      checklist: ["inversion simple et complexe", "-t- euphonique", "registre soutenu cohérent"],
    },
  },
  {
    theme: "Les faux amis",
    vocab: [
      ["actuellement", "currently (not 'actually')", "Il est actuellement en réunion."],
      ["éventuellement", "possibly (not 'eventually')", "Je viendrai éventuellement."],
      ["une librairie", "a bookshop (not 'library')", "J'ai acheté ce roman en librairie."],
      ["sensible", "sensitive (not 'sensible')", "C'est un enfant très sensible."],
      ["assister à", "to attend (not 'assist')", "J'ai assisté à la conférence."],
      ["rester", "to stay (not 'rest')", "Je reste à la maison ce soir."],
      ["une journée", "a day (not 'journey')", "Quelle belle journée !"],
      ["prétendre", "to claim (not 'pretend')", "Il prétend être médecin."],
    ],
    grammar: {
      topic: "Les faux amis anglais–français",
      explanation:
        "Les faux amis sont des mots qui se ressemblent dans deux langues mais n'ont pas le même sens. Ils sont une source d'erreurs fréquentes chez les anglophones, même avancés.\n• actually → en fait ; actuellement → currently.\n• eventually → finalement ; éventuellement → possibly.\n• library → bibliothèque ; librairie → bookshop.\n• sensible → raisonnable / sensé ; sensible → sensitive.\n• to pretend → faire semblant ; prétendre → to claim.\n• to attend → assister à ; attendre → to wait.\n• journey → voyage / trajet ; journée → day.",
      examples: ["En fait, je n'ai pas compris. (Actually…)", "Finalement, il a accepté. (Eventually…)", "Je vais à la bibliothèque pour emprunter un livre.", "Sois raisonnable ! (Be sensible!)"],
    },
    text: {
      title: "Malentendus franco-anglais",
      body: "Lors de son premier séjour à Paris, Tunde a accumulé les malentendus. Il a dit à sa logeuse qu'il voulait « rester » après le déjeuner, alors qu'il voulait simplement se reposer. Il a cherché des livres à emprunter dans une librairie, où on lui a expliqué qu'il fallait aller à la bibliothèque. Enfin, il a écrit à son professeur qu'il viendrait « éventuellement » au cours, ce qui a beaucoup inquiété celui-ci : il voulait dire « finalement » !",
      questions: [
        ["Que voulait dire Tunde quand il a dit « rester » ?", "se reposer", ["ne pas partir", "attendre", "dormir à l'hôtel"]],
        ["Pourquoi le professeur était-il inquiet ?", "Il a compris que Tunde viendrait peut-être.", ["Tunde ne venait jamais.", "Tunde était malade.", "Tunde voulait changer de cours."]],
      ],
    },
    exercises: [
      mcq("« Actually, I don't know. » →", "En fait, je ne sais pas.", ["Actuellement, je ne sais pas.", "Éventuellement, je ne sais pas.", "Actuel, je ne sais pas."], "actually = en fait.", "false-friends", "vocabulary"),
      mcq("« I attended the meeting. » →", "J'ai assisté à la réunion.", ["J'ai attendu la réunion.", "J'ai aidé la réunion.", "J'ai assisté la réunion."], "to attend = assister à.", "false-friends", "vocabulary"),
      blank("Pour emprunter des livres, je vais à la ___.", "bibliothèque", "library = bibliothèque.", "false-friends", ["bibliotheque"], "vocabulary"),
      reorder("Il fait semblant de dormir.", "to pretend = faire semblant.", "false-friends", "vocabulary"),
      translate("Eventually, she accepted the offer.", "Finalement, elle a accepté l'offre.", "eventually = finalement.", "false-friends", ["Finalement, elle a accepté la proposition.", "Elle a fini par accepter l'offre."]),
    ],
    writing: {
      prompt: "Racontez un malentendu linguistique (réel ou imaginaire) et expliquez-le, en employant correctement au moins quatre faux amis.",
      model: "Le jour de mon arrivée à Lyon, j'ai dit à mon collègue que j'étais « excité » par mon nouveau poste. Il a souri : en français, on dit plutôt « enthousiaste ». Plus tard, je lui ai demandé où se trouvait la librairie de l'entreprise, alors que je cherchais la bibliothèque. Actuellement, je fais beaucoup plus attention ; en fait, j'adore collectionner ces faux amis !",
      checklist: ["au moins quatre faux amis employés au bon sens", "explication du malentendu", "récit cohérent"],
    },
  },
  {
    theme: "Cause et conséquence nuancées",
    vocab: [
      ["d'autant plus que", "all the more so because", "C'est grave, d'autant plus qu'il récidive."],
      ["sous prétexte que", "on the pretext that", "Il est parti sous prétexte qu'il était malade."],
      ["étant donné que", "given that", "Étant donné que le magasin est fermé, revenons demain."],
      ["si bien que", "so that (result)", "Il a plu, si bien que le match a été annulé."],
      ["de sorte que", "so that", "Il parle fort de sorte que tout le monde l'entend."],
      ["entraîner", "to lead to / cause", "Cette décision a entraîné des grèves."],
      ["découler de", "to result from", "Ce problème découle d'une erreur."],
      ["en raison de", "due to", "En raison de la grève, le train est annulé."],
    ],
    grammar: {
      topic: "Nuancer la cause et la conséquence",
      explanation:
        "CAUSE : parce que (neutre), puisque (cause connue), comme (en tête), étant donné que / vu que (fait établi), d'autant plus que (cause renforcée), sous prétexte que (cause contestée), non que + subjonctif (cause rejetée) ; + nom : en raison de (neutre), grâce à (positive), à cause de (négative), faute de (manque).\nCONSÉQUENCE : donc, c'est pourquoi, si bien que, de sorte que + indicatif (résultat), tellement / si… que, au point que ; de sorte que + subjonctif exprime le but.\nVerbes : entraîner, provoquer, susciter, découler de, résulter de.",
      examples: ["Il a refusé, non qu'il soit paresseux, mais il était épuisé.", "Le budget a été réduit, si bien que le projet a pris du retard.", "J'apprécie ce film, d'autant plus que l'actrice est nigériane.", "Cette crise résulte d'une mauvaise gestion."],
    },
    text: {
      title: "Pénurie d'eau",
      body: "La ville connaît une pénurie d'eau sans précédent. Celle-ci découle d'abord d'une sécheresse exceptionnelle, mais elle s'explique aussi par l'état du réseau : faute d'entretien, près d'un tiers de l'eau se perd dans des fuites. La situation est d'autant plus préoccupante que la population a doublé en vingt ans. Les autorités ont imposé des restrictions, si bien que certains quartiers ne sont alimentés que deux jours par semaine. Certains élus refusent les travaux sous prétexte qu'ils coûteraient trop cher.",
      questions: [
        ["Quelles sont les deux causes principales de la pénurie ?", "la sécheresse et les fuites du réseau", ["la pollution et la guerre", "les restrictions et les élus", "la hausse des prix et la sécheresse"]],
        ["Quel est l'effet des restrictions ?", "Certains quartiers n'ont de l'eau que deux jours par semaine.", ["L'eau est devenue gratuite.", "La population a doublé.", "Les fuites ont été réparées."]],
      ],
    },
    exercises: [
      mcq("Il n'est pas venu, ___ il avait du travail. (cause contestée)", "sous prétexte qu'", ["grâce à ce qu'", "si bien qu'", "afin qu'"], "sous prétexte que = cause qu'on met en doute.", "cause"),
      mcq("Il a beaucoup neigé, ___ les routes sont fermées.", "si bien que", ["puisque", "étant donné que", "faute de"], "Conséquence → si bien que + indicatif.", "consequence"),
      blank("___ d'argent, ils ont abandonné le projet.", "Faute", "faute de + nom = par manque de.", "cause", ["faute"]),
      reorder("Cette crise résulte d'une mauvaise gestion.", "résulter de = découler de.", "cause"),
      translate("Due to the storm, the flight was cancelled.", "En raison de la tempête, le vol a été annulé.", "en raison de + nom (cause neutre).", "cause", ["À cause de la tempête, le vol a été annulé."]),
    ],
    writing: {
      prompt: "Analysez les causes et les conséquences d'un problème de société de votre pays (150 mots), en variant les connecteurs.",
      model: "Les embouteillages de Lagos résultent de plusieurs facteurs. D'abord, la population a explosé en trente ans, si bien que les routes ne suffisent plus. Ensuite, faute de transports publics efficaces, la plupart des habitants utilisent leur voiture ou des motos-taxis. Le problème est d'autant plus grave que les chantiers sont souvent interrompus en raison de difficultés budgétaires. Ces embouteillages entraînent des pertes économiques considérables et dégradent la qualité de l'air. Certains responsables refusent de développer le métro sous prétexte que le projet serait trop coûteux ; pourtant, ne rien faire coûte bien plus cher.",
      checklist: ["au moins quatre connecteurs de cause et trois de conséquence", "verbes de causalité (entraîner, résulter de…)", "argumentation structurée"],
    },
  },
  {
    theme: "La synthèse de documents",
    vocab: [
      ["selon / d'après", "according to", "Selon le premier document, la demande augmente."],
      ["rejoindre", "to agree with / echo", "Le second article rejoint cette analyse."],
      ["nuancer", "to qualify", "L'auteur nuance ce constat."],
      ["mettre en évidence", "to highlight", "L'étude met en évidence un paradoxe."],
      ["s'opposer à", "to contrast with / oppose", "Ce point de vue s'oppose au précédent."],
      ["la problématique", "the central question", "Quelle est la problématique de ce dossier ?"],
      ["en définitive", "ultimately", "En définitive, les deux auteurs s'accordent."],
      ["dégager", "to draw out (ideas)", "Il faut dégager les idées principales."],
    ],
    grammar: {
      topic: "Rédiger une synthèse",
      explanation:
        "La synthèse (épreuve du DALF C1) consiste à confronter plusieurs documents sans donner son avis.\nMéthode :\n1. Dégager la problématique commune.\n2. Introduction : thème + problématique + annonce du plan.\n3. Développement en deux ou trois parties organisées par idées, et non document par document.\n4. Conclusion : bilan, sans opinion personnelle.\nOutils : selon X, d'après Y, X souligne / met en évidence / constate que…, Y rejoint / nuance / s'oppose à…, tandis que, alors que, de même.\nInterdits : citations recopiées, « je », informations extérieures aux documents.",
      examples: ["Les deux documents s'accordent sur l'urgence de la situation.", "Alors que le premier auteur insiste sur les coûts, le second met en évidence les bénéfices.", "Cette analyse est nuancée par l'enquête de l'INSEE.", "En définitive, si les constats convergent, les solutions divergent."],
    },
    text: {
      title: "Extrait d'une synthèse",
      body: "Les deux documents s'interrogent sur l'avenir du travail à l'ère de l'intelligence artificielle. Selon l'article du Monde, l'automatisation menacerait près d'un emploi sur quatre d'ici 2035. Le rapport de l'OCDE nuance ce constat : s'il reconnaît que certaines tâches disparaîtront, il met en évidence la création de nouveaux métiers. Tous deux s'accordent néanmoins sur la nécessité d'investir massivement dans la formation continue. En définitive, la question n'est pas tant de savoir si le travail va changer que de savoir comment accompagner cette transformation.",
      questions: [
        ["Sur quel point les deux documents s'accordent-ils ?", "la nécessité d'investir dans la formation", ["la disparition d'un emploi sur quatre", "l'interdiction de l'IA", "la baisse des salaires"]],
        ["Comment le rapport de l'OCDE se situe-t-il par rapport à l'article ?", "Il nuance son constat.", ["Il le confirme totalement.", "Il le rejette entièrement.", "Il n'en parle pas."]],
      ],
    },
    exercises: [
      mcq("Dans une synthèse, on doit :", "confronter les documents sans donner son avis", ["résumer chaque document séparément", "donner son opinion personnelle", "ajouter des exemples extérieurs"], "La synthèse est objective et organisée par idées.", "synthesis"),
      mcq("« Le second document ___ cette analyse. » (va dans le même sens)", "rejoint", ["nuance", "contredit", "ignore"], "rejoindre = être d'accord avec.", "synthesis", "vocabulary"),
      blank("___ le premier auteur insiste sur les risques, le second souligne les avantages.", "Alors que", "Opposition entre deux documents : alors que / tandis que.", "synthesis", ["alors que", "Tandis que", "tandis que"]),
      reorder("Les deux documents s'accordent sur l'urgence du problème.", "Formule de convergence.", "synthesis"),
      translate("Ultimately, the two authors agree on the causes.", "En définitive, les deux auteurs s'accordent sur les causes.", "en définitive + s'accorder sur.", "synthesis", ["En définitive, les deux auteurs sont d'accord sur les causes."]),
    ],
    writing: {
      prompt: "Rédigez l'introduction et le plan d'une synthèse sur le thème « Les villes face au changement climatique » (deux documents imaginaires : l'un sur les inondations à Lagos, l'autre sur les toits végétalisés à Paris).",
      model: "Introduction : Les deux documents abordent la manière dont les grandes villes s'adaptent aux effets du changement climatique. Alors que le premier décrit les inondations de plus en plus fréquentes qui frappent Lagos, le second présente les toits végétalisés comme une réponse innovante à la chaleur urbaine à Paris. Dans quelle mesure les villes peuvent-elles devenir plus résilientes ? Nous verrons d'abord les menaces communes mises en évidence par les documents, puis les solutions qu'ils proposent.\nPlan : I. Des villes de plus en plus vulnérables (inondations, chaleur, densité). II. Des stratégies d'adaptation encore inégales (infrastructures, végétalisation, financement).",
      checklist: ["problématique formulée en question", "plan thématique, pas document par document", "aucune opinion personnelle ni « je »"],
    },
  },
]);
