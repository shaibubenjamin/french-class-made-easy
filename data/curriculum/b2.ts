import { blank, course, mcq, reorder, translate } from "./build.ts";

export const B2 = course("B2", [
  {
    theme: "Les obligations au travail",
    vocab: [
      ["respecter un délai", "to meet a deadline", "Il faut que nous respections le délai."],
      ["un rapport", "a report", "Je dois rendre le rapport vendredi."],
      ["une réunion", "a meeting", "La réunion est reportée."],
      ["déléguer", "to delegate", "Un bon manager sait déléguer."],
      ["la charge de travail", "the workload", "Ma charge de travail est énorme."],
      ["être débordé", "to be swamped", "Je suis débordé cette semaine."],
      ["prévenir", "to warn / inform in advance", "Prévenez-moi si vous êtes en retard."],
      ["un collaborateur", "a co-worker / team member", "Elle a cinq collaborateurs."],
    ],
    grammar: {
      topic: "Le subjonctif présent après il faut que",
      explanation:
        "Formation: take the ils form of the present, drop -ent, add -e, -es, -e, -ions, -iez, -ent: ils finissent → que je finisse.\nIrregular: être (que je sois, que nous soyons), avoir (que j'aie, qu'il ait), aller (que j'aille), faire (que je fasse), pouvoir (que je puisse), savoir (que je sache), vouloir (que je veuille).\nUse after expressions of necessity: il faut que, il est nécessaire que, il est important que.\nIf there's no change of subject, use the infinitive: « Il faut partir. »",
      examples: ["Il faut que tu finisses ce rapport.", "Il est important que nous soyons à l'heure.", "Il faut qu'elle fasse une pause.", "Il est nécessaire que vous preniez une décision."],
    },
    text: {
      title: "Message du directeur",
      body: "Chers collaborateurs,\nComme vous le savez, le projet doit être livré au client le 30 novembre. Pour respecter ce délai, il faut que chaque équipe termine sa partie avant le 20. Il est important que vous signaliez immédiatement tout problème à votre responsable. Par ailleurs, il est essentiel que personne ne fasse d'heures supplémentaires sans accord préalable : la santé de chacun reste notre priorité. Je compte sur vous.\nM. Adeyemi, directeur",
      questions: [
        ["Avant quelle date chaque équipe doit-elle terminer ?", "le 20", ["le 30 novembre", "la fin de l'année", "demain"]],
        ["Qu'est-ce qui est interdit sans accord ?", "les heures supplémentaires", ["les réunions", "les congés", "le télétravail"]],
      ],
    },
    exercises: [
      mcq("Il faut que tu ___ ce dossier aujourd'hui.", "finisses", ["finis", "finiras", "finirais"], "il faut que + subjonctif.", "subjunctive"),
      mcq("Il est important que nous ___ à l'heure.", "soyons", ["sommes", "serons", "soyions"], "être → que nous soyons.", "subjunctive"),
      blank("Il faut qu'il ___ ses devoirs. (faire)", "fasse", "faire → qu'il fasse.", "subjunctive"),
      reorder("Il faut que vous preniez une décision.", "il faut que + subject + subjonctif.", "subjunctive"),
      translate("It is necessary that she goes to the meeting.", "Il faut qu'elle aille à la réunion.", "aller → qu'elle aille.", "subjunctive", ["Il est nécessaire qu'elle aille à la réunion."]),
    ],
    writing: {
      prompt: "Vous êtes responsable d'une équipe. Écrivez un message pour organiser un projet urgent (5 obligations).",
      model: "Chère équipe, pour finir le projet à temps, il faut que chacun soit disponible lundi matin. Il est important que Tunde prépare le budget et qu'Aïcha contacte le client. Il faut aussi que nous fassions un point tous les jours à 9 h. Enfin, il est essentiel que vous me préveniez en cas de difficulté. Merci à tous.",
      checklist: ["il faut que / il est important que + subjonctif", "subjonctifs irréguliers (soit, fasse, aille…)", "registre professionnel"],
    },
  },
  {
    theme: "Désirs et émotions",
    vocab: [
      ["souhaiter", "to wish", "Je souhaite que tu réussisses."],
      ["exiger", "to demand", "Le client exige qu'on le rembourse."],
      ["regretter", "to regret / be sorry", "Je regrette que tu partes."],
      ["avoir peur que", "to be afraid that", "J'ai peur qu'il soit en retard."],
      ["être ravi", "to be delighted", "Je suis ravi que vous soyez là."],
      ["déçu", "disappointed", "Elle est déçue que le concert soit annulé."],
      ["étonné", "surprised", "Je suis étonné qu'il ne dise rien."],
      ["fier / fière", "proud", "Ma mère est fière que j'aie réussi."],
    ],
    grammar: {
      topic: "Le subjonctif après la volonté et les sentiments",
      explanation:
        "Use the subjunctive after verbs of will (vouloir que, souhaiter que, exiger que, préférer que) and emotions (être content / triste / surpris que, avoir peur que, regretter que) when the subject changes.\nSame subject → infinitive: « Je veux partir » but « Je veux que tu partes ».\nespérer que is an exception: it takes the indicative (« J'espère qu'il viendra »).",
      examples: ["Je veux que tu viennes avec moi.", "Elle est contente que nous puissions venir.", "J'ai peur qu'il fasse froid.", "J'espère que tu vas bien."],
    },
    text: {
      title: "Une lettre de mère",
      body: "Mon cher fils,\nJe suis si fière que tu aies obtenu ce poste à Montréal ! Bien sûr, je regrette que tu partes si loin, et j'ai un peu peur que tu te sentes seul pendant l'hiver. Ton père souhaite que tu nous appelles chaque dimanche — tu le connais ! Moi, je voudrais simplement que tu sois heureux. J'espère que tu trouveras vite des amis.\nJe t'embrasse,\nMaman",
      questions: [
        ["De quoi la mère a-t-elle peur ?", "que son fils se sente seul", ["qu'il perde son poste", "qu'il tombe malade", "qu'il oublie le français"]],
        ["Que souhaite le père ?", "que son fils appelle chaque dimanche", ["qu'il rentre vite", "qu'il trouve des amis", "qu'il change de travail"]],
      ],
    },
    exercises: [
      mcq("Je veux que tu ___ la vérité.", "dises", ["dis", "diras", "dire"], "vouloir que + subjonctif.", "subjunctive-will"),
      mcq("J'espère qu'il ___ demain.", "viendra", ["vienne", "viendrait", "venir"], "espérer que + indicative.", "subjunctive-exceptions"),
      blank("Je suis ravi que vous ___ venir. (pouvoir)", "puissiez", "pouvoir → que vous puissiez.", "subjunctive-emotion"),
      reorder("Elle a peur que son fils soit malade.", "avoir peur que + subjonctif.", "subjunctive-emotion"),
      translate("I'm sorry that you can't come.", "Je regrette que tu ne puisses pas venir.", "regretter que + subjonctif.", "subjunctive-emotion", ["Je regrette que vous ne puissiez pas venir.", "Je suis désolé que tu ne puisses pas venir."]),
    ],
    writing: {
      prompt: "Un ami part vivre à l'étranger. Écrivez-lui un message exprimant vos sentiments et vos souhaits.",
      model: "Cher Femi, je suis vraiment heureux que tu aies trouvé ce travail à Paris, même si je regrette que tu partes si vite. J'ai un peu peur que nous perdions le contact, alors je voudrais que tu m'écrives de temps en temps. J'espère que tu t'adapteras facilement. Je souhaite que cette aventure soit magnifique !",
      checklist: ["sentiments + que + subjonctif", "volonté + que + subjonctif", "espérer + indicatif"],
    },
  },
  {
    theme: "Bien que, pour que, avant que",
    vocab: [
      ["malgré", "despite", "Malgré la pluie, le match a eu lieu."],
      ["afin de / afin que", "in order to / so that", "Il parle lentement afin que tout le monde comprenne."],
      ["à moins que", "unless", "Je viendrai, à moins qu'il pleuve."],
      ["jusqu'à ce que", "until", "Attends jusqu'à ce que je revienne."],
      ["sans que", "without", "Il est parti sans que je le voie."],
      ["une contrainte", "a constraint", "Le budget est une contrainte."],
      ["un compromis", "a compromise", "Ils ont trouvé un compromis."],
      ["néanmoins", "nevertheless", "C'est difficile ; néanmoins, c'est possible."],
    ],
    grammar: {
      topic: "Les conjonctions suivies du subjonctif",
      explanation:
        "These conjunctions always take the subjunctive: bien que / quoique (although), pour que / afin que (so that), avant que (before), jusqu'à ce que (until), à moins que (unless), sans que (without), à condition que (provided that).\nIf the subject is the same, use a preposition + infinitive instead: pour partir, avant de partir, sans dire, afin de comprendre.\nBUT après que takes the indicative in standard French.",
      examples: ["Bien qu'il soit fatigué, il continue.", "Je t'explique pour que tu comprennes.", "Rentre avant qu'il fasse nuit.", "Je partirai après qu'il sera arrivé."],
    },
    text: {
      title: "Le marathon de Lagos",
      body: "Bien qu'il ait commencé à courir il y a seulement un an, Emeka a terminé le marathon de Lagos en quatre heures. Il s'est entraîné tous les matins avant que la chaleur ne devienne trop forte. Son entraîneur l'a suivi de près afin qu'il ne se blesse pas. « Je ne pensais pas réussir à moins d'avoir de la chance », dit-il en riant. Malgré la fatigue, il prépare déjà le prochain, à condition que son genou tienne le coup.",
      questions: [
        ["Pourquoi s'entraînait-il le matin ?", "avant qu'il fasse trop chaud", ["parce qu'il travaillait le soir", "pour courir avec son entraîneur", "parce que la route était fermée"]],
        ["À quelle condition fera-t-il le prochain marathon ?", "si son genou tient le coup", ["s'il gagne de l'argent", "si son entraîneur est d'accord", "s'il a de la chance"]],
      ],
    },
    exercises: [
      mcq("Bien qu'il ___ riche, il vit simplement.", "soit", ["est", "était", "sera"], "bien que + subjonctif.", "conjunctions-subjunctive"),
      mcq("Je parle fort ___ tout le monde m'entende.", "pour que", ["parce que", "après que", "pour"], "Purpose + change of subject → pour que + subjonctif.", "conjunctions-subjunctive"),
      blank("Finis ton travail avant de ___. (partir — same subject)", "partir", "Same subject → avant de + infinitive.", "conjunctions-infinitive"),
      reorder("Il est parti sans que nous le sachions.", "sans que + subjonctif.", "conjunctions-subjunctive"),
      translate("I will wait until you come back.", "J'attendrai jusqu'à ce que tu reviennes.", "jusqu'à ce que + subjonctif.", "conjunctions-subjunctive", ["J'attendrai jusqu'à ce que vous reveniez."]),
    ],
    writing: {
      prompt: "Racontez un défi que vous avez relevé malgré des difficultés (utilisez au moins trois conjonctions + subjonctif).",
      model: "L'année dernière, j'ai passé le DELF B1 bien que je n'aie eu que trois mois pour me préparer. Je révisais chaque soir avant que les enfants ne se réveillent le matin, puis je relisais mes notes jusqu'à ce que je les connaisse par cœur. Ma femme m'aidait pour que je puisse pratiquer l'oral. Malgré le stress, j'ai réussi !",
      checklist: ["bien que / pour que / avant que / jusqu'à ce que + subjonctif", "malgré + nom", "après que + indicatif si utilisé"],
    },
  },
  {
    theme: "Regrets et hypothèses",
    vocab: [
      ["regretter de", "to regret", "Je regrette de ne pas avoir étudié."],
      ["une occasion", "an opportunity", "J'ai raté une belle occasion."],
      ["si seulement", "if only", "Si seulement je l'avais su !"],
      ["prendre une décision", "to make a decision", "Il a pris la mauvaise décision."],
      ["le hasard", "chance", "Je l'ai rencontré par hasard."],
      ["éviter", "to avoid", "Nous aurions pu éviter cette erreur."],
      ["la conséquence", "the consequence", "Les conséquences ont été graves."],
      ["un tournant", "a turning point", "Ce voyage a été un tournant dans ma vie."],
    ],
    grammar: {
      topic: "Le conditionnel passé et le si irréel du passé",
      explanation:
        "Conditionnel passé = avoir / être in the conditionnel + past participle: j'aurais fait, elle serait venue.\nUses: regret (« J'aurais dû partir »), reproach (« Tu aurais pu m'appeler ! »), unconfirmed information in the news (« L'accident aurait fait trois victimes »).\nPast hypothesis: si + plus-que-parfait → conditionnel passé: « Si j'avais su, je serais venu. »",
      examples: ["Si tu m'avais prévenu, je t'aurais aidé.", "J'aurais aimé voyager davantage.", "Elle serait partie plus tôt si elle avait pu.", "Le président aurait démissionné."],
    },
    text: {
      title: "Et si j'avais dit non ?",
      body: "Il y a dix ans, Rachida a refusé un poste stable dans une banque pour créer une petite entreprise de mode. « Si j'avais accepté ce poste, j'aurais eu un bon salaire, mais je n'aurais jamais connu cette liberté », explique-t-elle. Elle reconnaît qu'elle aurait pu éviter certaines erreurs : « J'aurais dû demander plus de conseils au début. » Aujourd'hui, son entreprise emploie vingt personnes et vend ses créations dans six pays.",
      questions: [
        ["Qu'a refusé Rachida ?", "un poste dans une banque", ["un prêt", "une bourse", "un voyage"]],
        ["Quel regret exprime-t-elle ?", "ne pas avoir demandé assez de conseils", ["avoir quitté la banque", "avoir créé l'entreprise", "ne pas avoir voyagé"]],
      ],
    },
    exercises: [
      mcq("Si j'avais su, je ___ venu.", "serais", ["serai", "suis", "étais"], "si + plus-que-parfait → conditionnel passé.", "conditional-past"),
      mcq("Si tu ___ plus tôt, tu aurais vu le début.", "étais arrivé", ["serais arrivé", "arrivais", "es arrivé"], "si + plus-que-parfait.", "conditional-past"),
      blank("Tu ___ dû me le dire ! (avoir, reproach)", "aurais", "Reproach: tu aurais dû.", "conditional-past"),
      reorder("J'aurais aimé apprendre le piano.", "Regret with conditionnel passé.", "conditional-past"),
      translate("If we had left earlier, we would have caught the train.", "Si nous étions partis plus tôt, nous aurions pris le train.", "si + plus-que-parfait, conditionnel passé.", "conditional-past", ["Si on était partis plus tôt, on aurait pris le train.", "Si nous étions partis plus tôt, nous n'aurions pas raté le train."]),
    ],
    writing: {
      prompt: "Pensez à une décision importante de votre vie. Que se serait-il passé si vous aviez fait un autre choix ?",
      model: "Après l'université, j'ai choisi de rester au Nigeria au lieu de partir étudier en Angleterre. Si j'étais parti, j'aurais peut-être obtenu un diplôme plus prestigieux, mais je n'aurais pas rencontré ma femme. J'aurais aimé voyager davantage à cette époque. Pourtant, je ne regrette pas : si je n'étais pas resté, je n'aurais jamais créé mon entreprise.",
      checklist: ["si + plus-que-parfait → conditionnel passé", "j'aurais dû / j'aurais aimé", "accord avec être (serais parti(e))"],
    },
  },
  {
    theme: "La voix passive",
    vocab: [
      ["construire", "to build", "Le pont a été construit en 1990."],
      ["inaugurer", "to inaugurate / open", "Le musée sera inauguré en mai."],
      ["élire", "to elect", "Le maire a été élu l'an dernier."],
      ["arrêter", "to arrest / stop", "Le suspect a été arrêté."],
      ["publier", "to publish", "Le rapport sera publié demain."],
      ["détruire", "to destroy", "La maison a été détruite par le feu."],
      ["une enquête", "an investigation / survey", "Une enquête a été ouverte."],
      ["les autorités (f.)", "the authorities", "Les autorités ont été informées."],
    ],
    grammar: {
      topic: "La voix passive",
      explanation:
        "Passive = être (in the tense of the active verb) + past participle (agreeing with the subject) + par + agent.\nActive: La police a arrêté les voleurs. → Passive: Les voleurs ont été arrêtés par la police.\nThe agent is often omitted. With verbs of feeling or state, de may replace par: « Il est aimé de tous. »\nFrench often prefers on or a pronominal verb to the passive: « On a construit le pont » / « Ce plat se mange froid. »",
      examples: ["Le pont a été construit par une entreprise chinoise.", "Les résultats seront publiés lundi.", "La décision est prise par le directeur.", "Ce livre est lu dans le monde entier."],
    },
    text: {
      title: "Un nouveau stade",
      body: "Le nouveau stade de la ville a été inauguré samedi par le ministre des Sports. Il a été construit en deux ans et peut accueillir 40 000 spectateurs. Le projet avait été critiqué par plusieurs associations à cause de son coût. Selon la mairie, le stade sera aussi utilisé pour des concerts. Une enquête sur le budget a cependant été ouverte la semaine dernière.",
      questions: [
        ["Par qui le stade a-t-il été inauguré ?", "par le ministre des Sports", ["par le maire", "par des associations", "par le président"]],
        ["Pourquoi le projet avait-il été critiqué ?", "à cause de son coût", ["à cause du bruit", "parce qu'il était trop petit", "à cause des concerts"]],
      ],
    },
    exercises: [
      mcq("Active: Le chef prépare le repas. → Passive:", "Le repas est préparé par le chef.", ["Le repas a préparé le chef.", "Le chef est préparé par le repas.", "Le repas est préparer par le chef."], "être (present) + participle + par.", "passive-voice"),
      mcq("La maison ___ vendue l'année dernière.", "a été", ["est été", "avait", "sera"], "Past passive: a été + participle.", "passive-voice"),
      blank("Les lettres ont été ___ par la secrétaire. (écrire)", "écrites", "Agreement with lettres (f. pl.).", "passive-agreement"),
      reorder("Le suspect a été arrêté par la police.", "Subject + a été + participle + par + agent.", "passive-voice"),
      translate("The results will be announced tomorrow.", "Les résultats seront annoncés demain.", "Future passive: seront + participle.", "passive-voice"),
    ],
    writing: {
      prompt: "Rédigez un court article de presse (5 phrases) sur un événement local en utilisant la voix passive.",
      model: "Un nouvel hôpital a été inauguré hier à Ibadan. Il a été financé par le gouvernement de l'État et construit en dix-huit mois. Cent lits ont été installés et deux cents infirmiers seront recrutés d'ici la fin de l'année. Le projet a été salué par les habitants. Les premiers patients seront accueillis lundi.",
      checklist: ["être + participe passé accordé", "différents temps (passé, futur)", "par + agent quand c'est utile"],
    },
  },
  {
    theme: "Rapporter des paroles au passé",
    vocab: [
      ["déclarer", "to declare", "Le ministre a déclaré qu'il démissionnerait."],
      ["expliquer", "to explain", "Elle a expliqué qu'elle était malade."],
      ["promettre", "to promise", "Il a promis qu'il viendrait."],
      ["avouer", "to admit", "Il a avoué qu'il avait menti."],
      ["prétendre", "to claim", "Il prétend qu'il n'était pas là."],
      ["la veille", "the day before", "Il m'a dit qu'il était arrivé la veille."],
      ["le lendemain", "the next day", "Elle a promis de revenir le lendemain."],
      ["un témoin", "a witness", "Le témoin a affirmé qu'il avait tout vu."],
    ],
    grammar: {
      topic: "Le discours indirect au passé (concordance des temps)",
      explanation:
        "When the reporting verb is in the past (il a dit, elle expliquait), tenses shift back:\n• présent → imparfait (« Je suis prêt » → il a dit qu'il était prêt)\n• passé composé → plus-que-parfait (« J'ai fini » → qu'il avait fini)\n• futur → conditionnel présent (« Je viendrai » → qu'il viendrait)\n• imparfait, plus-que-parfait and conditionnel don't change.\nTime words change: aujourd'hui → ce jour-là, hier → la veille, demain → le lendemain, la semaine prochaine → la semaine suivante.",
      examples: ["Il a dit qu'il était fatigué.", "Elle m'a expliqué qu'elle avait perdu ses clés.", "Ils ont promis qu'ils viendraient le lendemain.", "Il m'a demandé si j'avais compris."],
    },
    text: {
      title: "Un témoignage",
      body: "Le témoin a raconté à la police qu'il rentrait du travail vers 22 heures quand il avait entendu un grand bruit. Il a expliqué qu'il avait vu deux hommes sortir de la bijouterie et qu'ils étaient partis en moto. Il a ajouté qu'il ne pouvait pas décrire leurs visages parce qu'il faisait trop sombre. Enfin, il a promis qu'il reviendrait le lendemain pour signer sa déposition.",
      questions: [
        ["Comment les voleurs sont-ils partis ?", "en moto", ["en voiture", "à pied", "en bus"]],
        ["Pourquoi le témoin ne peut-il pas décrire les visages ?", "Il faisait trop sombre.", ["Ils portaient des masques.", "Il était trop loin.", "Il avait peur."]],
      ],
    },
    exercises: [
      mcq("« Je suis malade. » → Elle a dit qu'elle ___ malade.", "était", ["est", "sera", "soit"], "présent → imparfait.", "reported-speech-past"),
      mcq("« Je viendrai. » → Il a promis qu'il ___.", "viendrait", ["viendra", "venait", "est venu"], "futur → conditionnel.", "reported-speech-past"),
      blank("« J'ai fini. » → Il a dit qu'il ___ fini.", "avait", "passé composé → plus-que-parfait.", "reported-speech-past"),
      reorder("Elle m'a dit qu'elle partirait le lendemain.", "Concordance: futur → conditionnel; demain → le lendemain.", "reported-speech-past"),
      translate("He told me he had lost his keys the day before.", "Il m'a dit qu'il avait perdu ses clés la veille.", "passé composé → plus-que-parfait; hier → la veille.", "reported-speech-past"),
    ],
    writing: {
      prompt: "Rapportez au passé une conversation importante (entretien, dispute, annonce) en utilisant la concordance des temps.",
      model: "Lors de mon entretien, la directrice m'a demandé pourquoi je voulais quitter mon poste. Je lui ai répondu que je cherchais de nouveaux défis et que j'avais toujours rêvé de travailler à l'international. Elle m'a expliqué que l'équipe était jeune et qu'elle voyagerait beaucoup. Elle a promis qu'elle me rappellerait la semaine suivante.",
      checklist: ["concordance des temps (imparfait, plus-que-parfait, conditionnel)", "transformation des marqueurs de temps", "verbes introducteurs variés"],
    },
  },
  {
    theme: "Argumenter",
    vocab: [
      ["d'abord / tout d'abord", "first of all", "Tout d'abord, rappelons les faits."],
      ["de plus / en outre", "moreover", "De plus, cette solution est économique."],
      ["en revanche", "on the other hand", "En revanche, elle est difficile à appliquer."],
      ["par conséquent", "consequently", "Par conséquent, nous devons agir."],
      ["certes", "admittedly", "Certes, le projet est coûteux."],
      ["or", "yet / now (in an argument)", "Il faut investir ; or, le budget est limité."],
      ["en somme / en conclusion", "in short / in conclusion", "En conclusion, les avantages l'emportent."],
      ["un enjeu", "a stake / an issue", "C'est un enjeu majeur pour l'avenir."],
    ],
    grammar: {
      topic: "Les connecteurs logiques",
      explanation:
        "Organise an argument with connectors:\n• adding: de plus, en outre, par ailleurs\n• contrasting: mais, cependant, en revanche, pourtant, toutefois\n• conceding: certes… mais, bien que + subjonctif, même si + indicatif\n• cause: car, puisque, en effet, étant donné que\n• consequence: donc, par conséquent, c'est pourquoi, si bien que\n• concluding: en conclusion, en somme, pour conclure.",
      examples: ["Certes, internet facilite la vie, mais il crée aussi une dépendance.", "Le prix a augmenté ; par conséquent, les ventes ont baissé.", "Même si c'est difficile, il faut essayer.", "En outre, cette mesure protège l'environnement."],
    },
    text: {
      title: "Faut-il rendre les transports publics gratuits ?",
      body: "Plusieurs villes européennes ont rendu leurs transports publics gratuits. Certes, cette mesure coûte cher aux collectivités. En revanche, elle encourage les habitants à laisser leur voiture au garage ; par conséquent, la pollution et les embouteillages diminuent. De plus, elle aide les familles modestes. Toutefois, certains experts soulignent que la gratuité ne suffit pas : si les bus sont rares ou lents, les automobilistes ne changeront pas leurs habitudes. En somme, la gratuité est utile, à condition d'améliorer aussi le service.",
      questions: [
        ["Quel argument est présenté contre la gratuité ?", "Elle coûte cher aux collectivités.", ["Elle augmente la pollution.", "Elle nuit aux familles modestes.", "Elle rend les bus plus rapides."]],
        ["Quelle est la conclusion du texte ?", "La gratuité est utile si le service s'améliore aussi.", ["Il faut supprimer les bus.", "La gratuité est inutile.", "Il faut interdire les voitures."]],
      ],
    },
    exercises: [
      mcq("Le projet est utile ; ___, il coûte très cher.", "en revanche", ["par conséquent", "de plus", "en effet"], "Contrast → en revanche.", "connectors", "vocabulary"),
      mcq("Il a beaucoup plu ; ___, la route est fermée.", "par conséquent", ["certes", "toutefois", "or"], "Consequence → par conséquent.", "connectors", "vocabulary"),
      blank("___, ce n'est pas facile, mais c'est possible. (admittedly)", "Certes", "Concession → certes… mais.", "connectors", ["certes"], "vocabulary"),
      reorder("Même si le prix est élevé la qualité est excellente.", "même si + indicatif.", "concession"),
      translate("Moreover, this solution protects the environment.", "De plus, cette solution protège l'environnement.", "Adding an argument → de plus / en outre.", "connectors", ["En outre, cette solution protège l'environnement."]),
    ],
    writing: {
      prompt: "Les réseaux sociaux font-ils plus de bien que de mal ? Rédigez un paragraphe argumenté (150 mots) avec au moins cinq connecteurs.",
      model: "Tout d'abord, les réseaux sociaux permettent de rester en contact avec sa famille, même à des milliers de kilomètres. De plus, ils offrent aux petites entreprises une visibilité gratuite. Certes, ils présentent aussi des dangers : les fausses informations y circulent vite et beaucoup de jeunes y passent trop de temps. Or, ces problèmes viennent surtout de l'usage qu'on en fait. Par conséquent, il me semble plus utile d'éduquer les utilisateurs que d'interdire ces plateformes. En conclusion, les réseaux sociaux font plus de bien que de mal, à condition qu'on les utilise avec esprit critique.",
      checklist: ["introduction, arguments, concession, conclusion", "au moins cinq connecteurs variés", "un subjonctif (à condition que…)"],
    },
  },
  {
    theme: "L'accord du participe passé",
    vocab: [
      ["la lettre", "the letter", "Les lettres que j'ai reçues sont anciennes."],
      ["les photos (f.)", "the photos", "Voici les photos qu'il a prises."],
      ["la décision", "the decision", "La décision qu'ils ont prise est juste."],
      ["les fleurs (f.)", "the flowers", "Les fleurs que tu m'as offertes sont belles."],
      ["la clé", "the key", "Je l'ai perdue."],
      ["les erreurs (f.)", "the mistakes", "Quelles erreurs avez-vous faites ?"],
      ["relire", "to reread", "Tu as relu ta lettre ?"],
      ["une faute d'orthographe", "a spelling mistake", "Il y a trop de fautes d'orthographe."],
    ],
    grammar: {
      topic: "L'accord du participe passé avec avoir",
      explanation:
        "With avoir, the past participle does NOT agree with the subject. It agrees with the direct object (COD) only if the COD comes BEFORE the verb:\n• « J'ai acheté des fleurs. » (COD after → no agreement)\n• « Les fleurs que j'ai achetées » (que = les fleurs, before)\n• « Ces fleurs, je les ai achetées. » (les before)\n• « Quelles fleurs as-tu achetées ? »\nNo agreement with en: « Des pommes ? J'en ai mangé. »",
      examples: ["La robe qu'elle a choisie est rouge.", "Mes clés ? Je les ai trouvées.", "Les efforts que nous avons faits ont payé.", "Combien de livres as-tu lus ?"],
    },
    text: {
      title: "Correction de copie",
      body: "Le professeur a rendu les rédactions qu'il avait corrigées pendant le week-end. Awa était inquiète : elle avait écrit sa copie très vite. En la relisant, elle a découvert les fautes qu'elle avait faites. Le professeur les avait toutes soulignées en rouge, surtout les accords du participe passé. Mais il avait aussi écrit : « Les idées que tu as développées sont excellentes. »",
      questions: [
        ["Quelles fautes Awa avait-elle surtout faites ?", "des accords du participe passé", ["des fautes de vocabulaire", "des erreurs de ponctuation", "des fautes de conjugaison au futur"]],
        ["Quel compliment le professeur a-t-il fait ?", "Les idées sont excellentes.", ["L'écriture est belle.", "Il n'y a aucune faute.", "Le texte est court."]],
      ],
    },
    exercises: [
      mcq("Les fleurs que tu m'as ___ sont magnifiques.", "offertes", ["offert", "offerts", "offerte"], "COD que (= les fleurs, f. pl.) before → offertes.", "past-participle-agreement"),
      mcq("Elle a ___ des chaussures.", "acheté", ["achetée", "achetées", "achetés"], "COD after the verb → no agreement.", "past-participle-agreement"),
      blank("Ma montre ? Je l'ai ___ hier. (perdre)", "perdue", "l' = la montre (f.) before → perdue.", "past-participle-agreement"),
      reorder("Voici les lettres que j'ai écrites.", "que + avoir + agreed participle.", "past-participle-agreement"),
      translate("Which films have you seen?", "Quels films as-tu vus ?", "Quels films (m. pl.) before → vus.", "past-participle-agreement", ["Quels films avez-vous vus ?"]),
    ],
    writing: {
      prompt: "Décrivez les cadeaux que vous avez reçus ou offerts récemment, en faisant attention aux accords.",
      model: "Pour mon anniversaire, ma sœur m'a offert une montre. Je l'ai portée tous les jours depuis. Les livres que mes collègues m'ont donnés sont passionnants : je les ai déjà lus. Quant aux fleurs que ma mère a envoyées, je les ai mises dans le salon.",
      checklist: ["accord avec le COD placé avant (que, les, l')", "pas d'accord avec le sujet quand on utilise avoir", "pas d'accord avec en"],
    },
  },
  {
    theme: "Lequel, auquel, duquel",
    vocab: [
      ["l'outil (m.)", "the tool", "C'est l'outil avec lequel je travaille."],
      ["le projet", "the project", "Le projet auquel je participe est passionnant."],
      ["le bâtiment", "the building", "Le bâtiment près duquel j'habite est ancien."],
      ["l'association (f.)", "the association / charity", "L'association pour laquelle elle travaille aide les réfugiés."],
      ["la raison", "the reason", "C'est la raison pour laquelle je suis parti."],
      ["la conférence", "the conference", "La conférence à laquelle j'ai assisté était intéressante."],
      ["au cours de", "during", "Au cours de la réunion, il a parlé."],
      ["grâce à", "thanks to", "Grâce à lui, j'ai trouvé un travail."],
    ],
    grammar: {
      topic: "Les pronoms relatifs composés",
      explanation:
        "After a preposition, use lequel, laquelle, lesquels, lesquelles (for things, agreeing with the noun): avec lequel, pour laquelle, sur lesquels.\nà + lequel → auquel, à laquelle, auxquels, auxquelles.\nde + lequel → duquel, de laquelle, desquels, desquelles (with compound prepositions: près de, à côté de, au cours de…).\nFor people, qui is usually preferred: « la personne avec qui je travaille ».",
      examples: ["Le stylo avec lequel j'écris est bleu.", "Le concours auquel il participe est difficile.", "La rivière au bord de laquelle nous avons pique-niqué.", "L'amie pour qui j'ai acheté ce cadeau."],
    },
    text: {
      title: "Une association de quartier",
      body: "L'association pour laquelle travaille Nadia aide les jeunes du quartier à trouver un emploi. Le local dans lequel elle organise ses ateliers est petit, mais bien équipé. Les entreprises auxquelles elle envoie les CV sont de plus en plus nombreuses. Au cours de la dernière réunion, au terme de laquelle tout le monde a applaudi, Nadia a annoncé que trente jeunes avaient été embauchés cette année.",
      questions: [
        ["Que fait l'association ?", "Elle aide les jeunes à trouver un emploi.", ["Elle organise des concerts.", "Elle construit des locaux.", "Elle donne des bourses."]],
        ["Combien de jeunes ont été embauchés ?", "trente", ["treize", "vingt", "cent"]],
      ],
    },
    exercises: [
      mcq("La raison pour ___ il est parti reste un mystère.", "laquelle", ["lequel", "quoi", "qui"], "raison (f.) → laquelle.", "relative-lequel"),
      mcq("Le projet ___ je pense est ambitieux. (penser à)", "auquel", ["duquel", "lequel", "dont"], "à + lequel → auquel.", "relative-lequel"),
      blank("La maison près ___ il habite est à vendre.", "de laquelle", "près de + laquelle.", "relative-lequel"),
      reorder("C'est l'ordinateur avec lequel je travaille.", "preposition + lequel.", "relative-lequel"),
      translate("The meetings I take part in are long.", "Les réunions auxquelles je participe sont longues.", "participer à + réunions (f. pl.) → auxquelles.", "relative-lequel"),
    ],
    writing: {
      prompt: "Présentez une organisation, un club ou une entreprise que vous connaissez, avec au moins trois pronoms relatifs composés.",
      model: "L'entreprise pour laquelle je travaille développe des applications bancaires. Les clients avec lesquels nous collaborons sont en Afrique de l'Ouest. Le projet auquel je consacre le plus de temps est une application de paiement mobile. Le bureau à côté duquel se trouve notre cantine est très moderne.",
      checklist: ["lequel / laquelle / lesquels après préposition", "auquel / duquel et leurs formes", "accord avec le nom repris"],
    },
  },
  {
    theme: "Projeter l'avenir",
    vocab: [
      ["d'ici (à) 2030", "by 2030", "D'ici 2030, la ville aura doublé."],
      ["dès que", "as soon as", "Dès que j'aurai fini, je t'appellerai."],
      ["une fois que", "once", "Une fois que tu auras signé, ce sera officiel."],
      ["achever", "to complete", "Les travaux seront achevés en mai."],
      ["atteindre un objectif", "to reach a goal", "Nous aurons atteint notre objectif."],
      ["prévoir", "to plan / forecast", "Les experts prévoient une hausse."],
      ["à long terme", "in the long term", "À long terme, c'est rentable."],
      ["la croissance", "growth", "La croissance sera forte."],
    ],
    grammar: {
      topic: "Le futur antérieur",
      explanation:
        "Futur antérieur = avoir / être in the futur simple + past participle: j'aurai fini, elle sera partie.\nIt expresses a future action completed BEFORE another future action or a future moment: « Quand tu arriveras, j'aurai préparé le dîner. »\nCommon after quand, lorsque, dès que, une fois que, après que: « Dès que j'aurai reçu ma paie, je t'achèterai un cadeau. »\nIt can also express a supposition about the past: « Il n'est pas là ? Il aura oublié. »",
      examples: ["D'ici juin, nous aurons terminé le projet.", "Dès qu'il sera arrivé, nous commencerons.", "Une fois que vous aurez lu le contrat, signez-le.", "Elle aura raté son bus."],
    },
    text: {
      title: "La ville en 2040",
      body: "Selon le plan d'urbanisme présenté hier, la ville aura profondément changé d'ici 2040. Une nouvelle ligne de métro aura été construite et les vieux quartiers du centre auront été rénovés. Dès que les premiers travaux seront achevés, en 2027, un grand parc ouvrira au bord du fleuve. Le maire espère qu'une fois que ces projets auront été réalisés, la population aura retrouvé confiance dans l'avenir de la ville.",
      questions: [
        ["Que se passera-t-il quand les premiers travaux seront finis ?", "un parc ouvrira au bord du fleuve", ["le métro fonctionnera", "le maire démissionnera", "la population doublera"]],
        ["D'ici quand la ville aura-t-elle changé ?", "2040", ["2027", "l'année prochaine", "2030"]],
      ],
    },
    exercises: [
      mcq("Quand tu arriveras, nous ___ déjà mangé.", "aurons", ["avons", "aurions", "avions"], "Completed before another future action → futur antérieur.", "futur-anterieur"),
      mcq("Dès qu'elle ___, nous partirons.", "sera arrivée", ["arrive", "est arrivée", "serait arrivée"], "dès que + futur antérieur.", "futur-anterieur"),
      blank("D'ici ce soir, j'___ fini ce rapport. (avoir)", "aurai", "aurai + participle.", "futur-anterieur"),
      reorder("Une fois que vous aurez signé le contrat nous commencerons.", "une fois que + futur antérieur + futur.", "futur-anterieur"),
      translate("As soon as I have finished, I will call you.", "Dès que j'aurai fini, je t'appellerai.", "dès que + futur antérieur.", "futur-anterieur", ["Dès que j'aurai terminé, je t'appellerai.", "Dès que j'aurai fini, je vous appellerai."]),
    ],
    writing: {
      prompt: "Où en serez-vous dans cinq ans ? Décrivez ce que vous aurez accompli.",
      model: "Dans cinq ans, j'aurai obtenu mon master et j'aurai passé le DALF C1. J'aurai sûrement déménagé à Montréal et j'aurai trouvé un poste d'ingénieur. Dès que je me serai installé, je ferai venir ma famille. Une fois que nous aurons acheté une maison, je commencerai à apprendre l'espagnol !",
      checklist: ["futur antérieur (aurai + participe, serai + participe)", "dès que / une fois que / quand", "futur simple pour l'action suivante"],
    },
  },
  {
    theme: "Mettre en relief",
    vocab: [
      ["souligner", "to emphasise", "Je tiens à souligner ce point."],
      ["l'essentiel (m.)", "the main thing", "L'essentiel, c'est de participer."],
      ["en réalité", "in reality", "En réalité, il n'a rien dit."],
      ["justement", "precisely / exactly", "C'est justement ce que je voulais dire."],
      ["surtout", "above all", "Ce qui compte surtout, c'est la santé."],
      ["insister sur", "to insist on", "Elle insiste sur l'importance du travail."],
      ["le malentendu", "the misunderstanding", "Il y a eu un malentendu."],
      ["préciser", "to specify / clarify", "Je voudrais préciser une chose."],
    ],
    grammar: {
      topic: "La mise en relief",
      explanation:
        "To highlight an element:\n• C'est… qui (subject): « C'est Marie qui a gagné. »\n• C'est… que (other elements): « C'est à Paris que je l'ai rencontré. »\n• Ce qui… c'est (subject): « Ce qui me plaît, c'est la musique. »\n• Ce que… c'est (object): « Ce que je veux, c'est partir. »\n• Ce dont… c'est (with de): « Ce dont j'ai besoin, c'est de repos. »\nUse ce sont for plural nouns in careful French: « Ce sont mes amis qui l'ont fait. »",
      examples: ["C'est lui qui a raison.", "C'est demain que nous partons.", "Ce qui m'inquiète, c'est le prix.", "Ce dont il rêve, c'est d'un long voyage."],
    },
    text: {
      title: "Ce qui compte vraiment",
      body: "On demande souvent à la cheffe Fatou Ndiaye le secret de son succès. « Ce qui compte, ce n'est pas le prix des produits, c'est leur fraîcheur », répond-elle. « C'est ma grand-mère qui m'a appris à cuisiner, et c'est au marché de Dakar que j'ai découvert les épices. Ce dont un cuisinier a besoin, c'est de curiosité. Et ce que je déteste, c'est le gaspillage. »",
      questions: [
        ["Selon Fatou, qu'est-ce qui compte le plus ?", "la fraîcheur des produits", ["le prix des produits", "la décoration", "la rapidité"]],
        ["Qui lui a appris à cuisiner ?", "sa grand-mère", ["sa mère", "un chef français", "son mari"]],
      ],
    },
    exercises: [
      mcq("___ me dérange, c'est le bruit.", "Ce qui", ["Ce que", "Ce dont", "Qui"], "Subject of « dérange » → ce qui.", "mise-en-relief"),
      mcq("___ j'ai besoin, c'est de dormir.", "Ce dont", ["Ce que", "Ce qui", "Dont"], "avoir besoin de → ce dont.", "mise-en-relief"),
      blank("C'est à Lagos ___ je suis né.", "que", "C'est + place + que.", "mise-en-relief"),
      reorder("C'est mon frère qui a préparé le repas.", "C'est + subject + qui.", "mise-en-relief"),
      translate("What I want is to travel.", "Ce que je veux, c'est voyager.", "Object → ce que… c'est.", "mise-en-relief", ["Ce que je veux c'est voyager."]),
    ],
    writing: {
      prompt: "Qu'est-ce qui est vraiment important pour vous dans la vie ? Utilisez au moins quatre structures de mise en relief.",
      model: "Ce qui compte le plus pour moi, c'est ma famille. C'est elle qui m'a soutenu quand j'ai perdu mon emploi. Ce que j'apprécie aussi, c'est le temps libre : c'est le week-end que je recharge mes batteries. Enfin, ce dont j'ai vraiment besoin, c'est d'apprendre sans cesse de nouvelles choses.",
      checklist: ["c'est… qui / c'est… que", "ce qui / ce que / ce dont… c'est", "virgule avant c'est"],
    },
  },
  {
    theme: "L'e-mail professionnel",
    vocab: [
      ["Objet :", "Subject:", "Objet : demande de rendez-vous"],
      ["Madame, Monsieur,", "Dear Sir or Madam,", "Madame, Monsieur, je vous écris…"],
      ["ci-joint", "attached", "Veuillez trouver ci-joint mon CV."],
      ["dans l'attente de", "looking forward to", "Dans l'attente de votre réponse…"],
      ["un rendez-vous", "an appointment", "Je souhaiterais prendre rendez-vous."],
      ["disponible", "available", "Je suis disponible mardi."],
      ["Cordialement", "Kind regards", "Cordialement, Ben Shaibu"],
      ["relancer", "to follow up", "Je me permets de vous relancer."],
    ],
    grammar: {
      topic: "Les formules de l'écrit professionnel",
      explanation:
        "Opening: Madame, Monsieur, (unknown) / Madame Dupont, (known). Never « Cher Monsieur » in a first formal contact.\nReason: Je vous écris au sujet de… / Je me permets de vous contacter afin de… / Suite à notre conversation…\nRequest: Je souhaiterais… / Pourriez-vous… / Je vous serais reconnaissant(e) de…\nAttachment: Veuillez trouver ci-joint…\nClosing: Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées. In an e-mail, « Cordialement » or « Bien cordialement » is enough.",
      examples: ["Je me permets de vous relancer concernant ma candidature.", "Veuillez trouver ci-joint le devis demandé.", "Pourriez-vous me confirmer votre disponibilité ?", "Je reste à votre disposition pour tout renseignement."],
    },
    text: {
      title: "Demande de rendez-vous",
      body: "Objet : Demande de rendez-vous – partenariat\nMadame Leroy,\nSuite à notre échange lors du salon de Dakar, je me permets de vous contacter afin de vous présenter notre projet de plateforme éducative. Je souhaiterais vous rencontrer pour en discuter plus en détail. Je serai à Paris du 10 au 14 juin et je suis disponible à la date qui vous conviendra. Veuillez trouver ci-joint une présentation de notre entreprise.\nDans l'attente de votre réponse, je vous prie d'agréer, Madame, mes salutations distinguées.\nBenjamin Shaibu",
      questions: [
        ["Où l'auteur a-t-il rencontré Mme Leroy ?", "au salon de Dakar", ["à Paris", "en ligne", "dans son entreprise"]],
        ["Que joint-il à son e-mail ?", "une présentation de son entreprise", ["son CV", "un contrat", "un devis"]],
      ],
    },
    exercises: [
      mcq("Formule correcte pour joindre un document :", "Veuillez trouver ci-joint mon CV.", ["Voilà mon CV attaché.", "Je vous attache mon CV.", "Regardez mon CV joint."], "Standard: Veuillez trouver ci-joint…", "formal-email", "vocabulary"),
      mcq("Pour une première prise de contact formelle :", "Madame, Monsieur,", ["Salut,", "Cher ami,", "Coucou,"], "Unknown recipient → Madame, Monsieur,", "formal-email", "vocabulary"),
      blank("Je me ___ de vous relancer concernant ma demande.", "permets", "Je me permets de… (polite formula).", "formal-email", [], "vocabulary"),
      reorder("Je reste à votre disposition pour tout renseignement.", "Closing formula.", "formal-email"),
      translate("Could you confirm the date of the meeting?", "Pourriez-vous me confirmer la date de la réunion ?", "Polite request with the conditionnel.", "formal-email", ["Pourriez-vous confirmer la date de la réunion ?"]),
    ],
    writing: {
      prompt: "Écrivez un e-mail professionnel pour demander un stage dans une entreprise française (120 mots).",
      model: "Objet : Candidature pour un stage en marketing\nMadame, Monsieur,\nÉtudiant en master de commerce à l'université de Lagos, je me permets de vous contacter afin de solliciter un stage de six mois au sein de votre service marketing, à partir de septembre. Votre entreprise m'intéresse particulièrement pour son développement en Afrique de l'Ouest. Je parle anglais, français et yoruba. Veuillez trouver ci-joint mon CV. Je serais ravi de vous présenter ma motivation lors d'un entretien.\nDans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.",
      checklist: ["objet clair", "formule d'appel et formule finale adaptées", "je me permets de / je souhaiterais / veuillez trouver ci-joint"],
    },
  },
]);
