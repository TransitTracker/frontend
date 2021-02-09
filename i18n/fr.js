export default {
  app: {
    tabHome: 'Accueil',
    tabMap: 'Carte',
    tabTable: 'Liste',
    tabSettings: 'Réglages',
    snackbarBold: 'Attention!',
    snackbarText:
      'Les données de certaines agences ne sont pas à jour et doivent être utilisées avec prudence.',
    snackbarBtn: 'Fermer',
    regionAriaLabel: 'Changer de région',
  },
  home: {
    welcome: 'Bienvenue dans ',
    version: 'Version',
    exitBeta: 'Quitter la version bêta',
    download: 'Télécharger',
    vehicleTotal: 'véhicules actifs',
    secondsAgo: 'secondes',
    minutesAgo: 'minutes',
    outdated: 'Pas à jour',
    emptyTitle: 'Aucune agence sélectionnée',
    emptyBody:
      "Vous n'avez pas sélectionné d'agence pour cette région. Rendez-vous dans les réglages pour ajouter des agences ou changez de région en utilisant le bouton du coin supérieur droit.",
    emptyButton: 'Ajouter des agences',
    creditsTitle: 'Crédits',
    refreshAriaLabel: 'Rafraîchir',
  },
  mapFooter: {
    select:
      'Veuillez sélectionner un véhicule pour y consulter toutes les informations',
  },
  mapBottomSheet: {
    close: 'Fermer',
    vehicle: 'Véhicule',
    seenAt: 'Apparu à',
    properties: {
      label: 'ID du véhicule :',
      plate: "Plaque d'immatriculation :",
      gtfs_trip: 'Trip ID :',
      route: 'Route :',
      headsign: 'Destination :',
      trip_short_name: 'Numéro du départ :',
      start: 'Heure de départ :',
      status: 'Statut :',
      stop_sequence: "Séquence d'arrêt :",
      bearing: 'Direction :',
      speed: 'Vitesse :',
      odometer: 'Odomètre :',
      relationship: "Relation avec l'horaire :",
      congestion: 'Niveau de congestion :',
      occupancy: 'Statut de la capacité :',
    },
    help: {
      label:
        "Ceci est l'identifiant interne assigné par l'agence pour ce véhicule. Dans des circonstances normales, ce champ n'est pas visible pour les usagers de ce véhicule.",
      gtfs_trip:
        "Il s'agit d'un identifiant unique attribué à ce voyage. Un même trajet peut être vu plusieurs fois au cours d'une semaine, par exemple du lundi au vendredi.",
      relationship:
        "En règle générale, un voyage est planifié à l'avance. Mais parfois, lorsque l'achalandage l'exige ou d'autres raisons, il faut ajouter un voyage entre deux. Un véhicule peut aussi ne pas avoir d'horaire (un système de métro par exemple) ou bien être annulé pour diverses raisons.",
      status:
        'Il s\'agit du statut du véhicule en relation avec les arrêts. Lorsqu\'un véhicule se dirige vers un arrêt, il est "In transit to". En s\'approchant, il devient "incoming". Puis à l\'arrêt, il est "Stopped at".',
      stop_sequence:
        "Ce champ représente la position du véhicule en relation au nombre d'arrêts déservi par le voyage. Plus que le voyage avance et que le véhicule s'approche de son arrêt final, ce chiffre augmente.",
    },
  },
  table: {
    empty: 'Aucun véhicules !',
    dataAgency: 'Agence',
    dataRef: 'Numéro du véhicule',
    dataRoute: 'Route',
    dataHeadsign: 'Destination',
    dataTripId: 'Trip ID',
    dataStartTime: 'Heure de départ',
    actions: 'Actions',
  },
  settings: {
    agenciesTitle: 'Agences',
    agenciesBody:
      "Sur un appareil mobile, commencez avec une ou deux agences, l'application sera plus performante!",
    agenciesApply: 'Appliquer les changements',
    changeRegion: 'Changer',
    activeRegion: 'Active',
    otherTitle: 'Autres réglages',
    otherAutoRefresh: 'Actualisation automatique',
    otherLanguageLabel: 'Langue',
    otherLanguageCaption: 'Language',
    otherOptOut: 'Se retirer des statistiques',
    otherChanges:
      'Les changements dans cette section sont appliqués instantanément.',
    aboutTitle: 'À propos de cette application',
    aboutBody:
      'Cette application est conçue par FelixINX. Les données sont disponibles grâce aux programmes de données ouvertes. ' +
      'Un problème, un commentaire ou une suggestion? <a href="https://forms.gle/3qGEuNKs7pGKMijs9" class="white--text">Contactez-moi</a>',
    aboutSource: 'Code source',
    aboutContributions:
      'L\'application Transit Tracker ne serait pas possible sans de nombreux projets open-source et produits gratuits, dont : <a class="white--text" href="https://vuetifyjs.com">Vuetify</a>, <a class="white--text" href="https://laravel.com">Laravel</a>, <a class="white--text" href="https://ploi.io">Ploi</a> et <a class="white--text" href="https://backpackforlaravel.com/">Backpack</a>.',
  },
  alert: {
    readMore: 'Lire plus',
    markAsRead: 'Marquer comme lu',
    close: 'Fermer',
  },
  download: {
    cardTitle: 'Télécharger des données',
    btnCancel: 'Annuler',
    agencyStep: 'Choisissez votre agence',
    agencySelect: 'Agence',
    agencyLicense:
      "En continuant, vous acceptez la licence choisie par l'agence.",
    agencyNotDownloadable:
      "La licence de cette agence n'autorise pas le téléchargement.",
    agencyRead: 'Lire la licence complète',
    formatStep: 'Choisissez le format',
    formatDesc:
      'Les deux options sont des fichiers CSV. Ils contiennent une structure similaire, mais ont des ensembles de données différents.',
    formatLoaded:
      "Véhicules chargés (que vous pouvez actuellement voir dans l'application)",
    formatDump:
      'Tous les véhicules (enregistrés depuis le début de Transit Tracker - contient des véhicules inactifs)',
    formatNotLoaded:
      "Cette agence n'est pas chargée actuellement. Activez-la dans l'onglet Paramètres pour choisir l'option chargée.",
    downloadStep: 'Télécharger',
    downloadBtn: 'Télécharger',
    downloadLoading:
      "Préparation du téléchargement ... cela devrait prendre moins d'une minute.",
    downloadReady: 'Votre fichier est maintenant prêt.',
    downloadError:
      "Une erreur s'est produite lors de la préparation de votre fichier. Veuillez réessayer plus tard.",
    downloadError429:
      'Vous avez dépassé le nombre maximum de téléchargements par heure. Veuillez réessayer plus tard.',
  },
  onboarding: {
    changeLang: 'In English?',
    welcome: 'Bienvenue dans Transit Tracker',
    headline: 'Le réseau de transport en commun, à partir de la maison',
    getStarted: 'Commencer',
    btnBack: 'Précédent',
    btnNext: 'Suivant',
    btnDone: 'Terminer',
    conditionsTitle: 'Informations importantes',
    conditionsHeadline:
      'Veuillez lire les informations suivantes avant de continuer.',
    conditionsBody:
      "<ul><li>Cette application a pour but d'offrir une vue d'ensemble du réseau de transport en commun dans certaines régions.</li>" +
      "<li>Les données de cette application sont présentées telles quelles et ne doivent pas être utilisées comme horaire de transport en commun. L'exactitude et la fiabilité des données ne sont pas garanties.</li>" +
      '<li>Les données sont disponibles grâce aux programmes de données ouvertes de plusieurs agences de transport en commun.</li>' +
      '<li>Vos préférences sont sauvegardées dans votre navigateur.</li>' +
      "<li>Quelques données sont transmises à Matomo, à des fins de statistiques. Ces données me permettent d'améliorer l'application en fonction de l'usage de certaines composantes. En tout temps, les données restent anonymes. Vous pouvez, à n'importe quel moment, vous retirer des statistiques en <a href=\"/opt-out/fr\">cliquant ici</a> ou avec le lien situé dans les paramètres de l'application.</li></ul>",
    contributions:
      'Transit Tracker est un projet open source distribué sous <a href="https://github.com/FelixINX/transit-tracker/blob/master/LICENSE">licence MIT</a> ne serait pas possible sans de nombreux projets open source et produits gratuits, dont : <a href="https://vuetifyjs.com">Vuetify</a>, <a href="https://laravel.com">Laravel</a>, <a href="https://ploi.io">Ploi</a> et <a href="https://backpackforlaravel.com/">Backpack</a>.',
    regionTitle: 'Région',
    regionHeadline: 'Choisissez la région que vous voulez voir en premier.',
    regionTip:
      "Changer rapidement de région en utilisant l'icône de carte, situé dans le coin supérieur droit",
    agenciesTitle: 'Agences',
    agenciesHeadline: 'Choisissez les agences que vous voulez voir.',
    agenciesWarning:
      "Sur un appareil mobile, commencez avec une ou deux agences, l'application sera plus performante!",
    settingsTitle: 'Réglages',
    settingsHeadline: "Personnalisez l'expérience à votre goût.",
    setRefreshLabel: 'Actualisation automatique',
    setRefreshCaption:
      'Mise à jour des données à chaque minute. Non recommandé sur les connexions mobiles (3G/LTE).',
    setDarkLabel: 'Thème sombre',
    setDarkCaption: "Réduit l'utilisation de la batterie.",
    setPathLabel: 'Page par défaut',
    setPathCaption: "Sera affiché à chaque lancement de l'application.",
    addHomeLabel: "Ajouter à l'écran d'accueil",
    addHomeCaption: 'Optionel. Beaucoup plus facile à trouver!',
    addHomeButtonInstall: 'Installer',
    addHomeButtonSuccess: 'Succès',
    addHomeButtonError: 'Erreur',
  },
}
