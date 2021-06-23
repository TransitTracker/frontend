import Vuetify from 'vuetify/es5/locale/fr'

export default {
  $vuetify: Vuetify,
  app: {
    tabHome: 'Accueil',
    tabMap: 'Carte',
    tabTable: 'Liste',
    tabByod: 'AVPD',
    tabSettings: 'Paramètres',
  },
  error: {
    title: 'Erreur',
    return: "Retourner à l'écran d'accueil",
    404: 'Êtes-vous perdu?',
    500: "Oups! Une erreur s'est produite.",
  },
  landing: {
    welcome: 'Bienvenue dans Transit&nbsp;Tracker',
    intro: "Une vue d'ensemble du réseau de transport en commun pour",
    introCities: 'plusieurs villes Canadiennes',
    body: 'En ce moment, il y a {totalVehicles} véhicules actifs à travers {totalAgencies} agences.',
    byodNew: 'Nouveau!',
    byodTitle: 'Importez vos propres données',
    byodBody:
      "Vous pouvez maintenant utiliser l'interface de Transit Tracker avec n'importe quel jeu de données GTFS Realtime.",
    byodStart: 'Commencez maintenant',
    agencies: 'Aucune agence | 1 agence | {n} agences',
    vehicles: 'Aucun véhicule | 1 véhicule |{n} véhicules',
    openMap: 'Ouvrir la carte de {region}',
    openTable: 'Ouvrir la liste de {region}',
    seoTitle:
      "Une vue d'ensemble du transport en commun pour plusieurs villes canadiennes",
    seoDescription:
      "Transit Tracker est une application qui vous permet de retrouver des centaines d'autobus, de trains et de tramways des plus grandes villes canadiennes, comme Montréal et Toronto, sur une seule carte!",
  },
  home: {
    welcome: 'Bienvenue dans ',
    version: 'Version',
    whatsNew: 'Quoi de neuf?',
    exitBeta: 'Quitter la version bêta',
    download: 'Télécharger',
    downloadTitle: 'Télécharger les données',
    vehicleTotal: 'véhicules actifs',
    secondsAgo: 'secondes',
    minutesAgo: 'minutes',
    outdated: 'Pas à jour',
    emptyTitle: 'Aucune agence sélectionnée',
    emptyBody:
      "Vous n'avez pas sélectionné d'agence pour cette région. Ajoutez l'agence proposée ci-dessous, utilisez les réglagles pour voir tous les choix (coin supérieur droit) ou changez de région.",
    emptyButton: 'Changer de région',
    creditsTitle: 'Crédits',
    refreshAriaLabel: 'Rafraîchir',
  },
  map: {
    seoTitle: 'Carte de {region}',
  },
  mapFooter: {
    select:
      'Veuillez sélectionner un véhicule pour y consulter toutes les informations',
    scroll: 'Défilez',
  },
  mapBottomSheet: {
    close: 'Fermer',
    vehicle: 'Véhicule',
    seenAt: 'Apparu à',
    openLink: 'Ouvrir le lien dans un nouvel onglet',
    properties: {
      label: 'ID du véhicule :',
      plate: "Plaque d'immatriculation :",
      tripId: 'Trip ID :',
      routeId: 'Route :',
      headsign: 'Destination :',
      shortName: 'Numéro du départ :',
      startTime: 'Heure de départ :',
      currentStatus: 'Statut :',
      currentStopSequence: "Séquence d'arrêt :",
      bearing: 'Direction :',
      speed: 'Vitesse :',
      odometer: 'Odomètre :',
      scheduleRelationship: "Relation avec l'horaire :",
      congestionLevel: 'Niveau de congestion :',
      occupancyStatus: 'Statut de la capacité :',
    },
    help: {
      label:
        "Ceci est l'identifiant interne assigné par l'agence pour ce véhicule. Dans des circonstances normales, ce champ n'est pas visible pour les usagers de ce véhicule.",
      tripId:
        "Il s'agit d'un identifiant unique attribué à ce voyage. Un même trajet peut être vu plusieurs fois au cours d'une semaine, par exemple du lundi au vendredi.",
      scheduleRelationship:
        "En règle générale, un voyage est planifié. Mais parfois, lorsque l'achalandage l'exige ou d'autres raisons, il faut ajouter un voyage entre deux. Un véhicule peut aussi ne pas avoir d'horaire (un système de métro par exemple) ou bien être annulé pour diverses raisons.",
      currentStatus:
        'Il s\'agit du statut du véhicule en relation avec les arrêts. Lorsqu\'un véhicule se dirige vers un arrêt, il est "In transit to". En s\'approchant, il devient "incoming". Puis à l\'arrêt, il est "Stopped at".',
      currentStopSequence:
        "Ce champ représente la position du véhicule en relation au nombre d'arrêts desservis par le voyage. Plus que le voyage avance et que le véhicule s'approche de son arrêt final, ce chiffre augmente.",
    },
    habs: 'Ce bus porte les couleurs du Canadiens, pendant les séries.',
  },
  table: {
    empty: 'Aucun véhicule!',
    dataAgency: 'Agence',
    dataRef: 'Numéro du véhicule',
    dataRoute: 'Route',
    dataHeadsign: 'Destination',
    dataTripId: 'Trip ID',
    dataStartTime: 'Heure de départ',
    actions: 'Actions',
    viewOnMap: 'Voir sur la carte',
    openLinks: 'Ouvrir les liens externes',
    linksTitle: 'Liens externes',
    filter: 'Filtrer',
    seoTitle: 'Liste des véhicules de {region}',
    filterRouteId: "Filter uniquement l'ID de la route",
    routeId: 'ID de la route',
  },
  byod: {
    title: 'Apportez vos propres données',
    subtitle:
      "Vous pouvez utiliser l'interface de Transit Tracker avec vos propres flux de données de vos agences préférées, du monde entier.",
    list: 'Liste des agences',
    lastUpdated: 'Dernière mise à jour:',
    noAgencies: 'Aucune agence',
    getStarted: 'Pour démarrer, cliquez sur le bouton ci-dessous:',
    isSynced: 'Cette agence est synchronisée avec Transit Tracker',
    isNotSynced: "Cette agence n'est pas synchronisée avec Transit Tracker",
    rename: "Renommer l'agence",
    save: 'Sauvegarder',
    sync: "Synchroniser l'agence avec Transit Tracker",
    unSync: "Retirer l'agence de la présente session de Transit Tracker",
    manage:
      "Gérer l'agence (ajouter les fichiers GTFS statiques et temps réels)",
    newAgency: 'Nouvelle agence',
    removeModule: 'Plus besoin du module AVPD?',
    disable: 'Désactiver',
    addModule: 'APVD est une fonctionnalité pour les utilisateurs avancés',
    addModuleDesc:
      "Vous avez besoin d'une connaissance de base du format GTFS (<i> General Transit Feed Specification </i>) pour utiliser cette fonctionnalité. Notez également que l'activation de cette fonctionnalité aura un impact sur les performances globales de l'application.",
    enable: 'Activer',
    createTitle: 'Créer une nouvelle agence',
    validationEmpty: 'Le nom est requis',
    validationLength: 'Le nom est trop long',
    nameLabel: "Nom de l'agence",
    iconLabel: 'Icône',
    bus: 'Bus',
    train: 'Train',
    tram: 'Tramway',
    ferry: 'Traversier',
    createAdd: 'Ajouter',
    seoDescription:
      "Utilisez l'interface de Transit Tracker avec vos propres flux GTFS Realtime.",
    agency: {
      back: "Retour à la liste d'agence",
      delete: "Supprimer l'agence",
      syncNow: 'Synchroniser maintenant',
      staticGtfs: 'GTFS Statique',
      staticType: 'Type',
      routes: 'routes',
      services: 'services',
      stops: 'arrêts (stops)',
      shapes: 'trajets (shapes)',
      trips: 'voyages (trips)',
      saved: '{n} {type} sauvegardés dans votre navigateur.',
      empty: "Vous n'avez pas encore importé des {type}.",
      upload: 'Cliquez pour sélectionner votre fichier {file}',
      message: 'Importer un nouveau fichier va supprimer tou(te)s les {type}.',
      import: 'Importer',
      realtimeTitle: 'Entités GTFS Realtime (temps réel)',
      realtimeDesc: 'Importez un flux GTFS-RT au format protocol buffer.',
      emptyExisting: 'Vider les entités existantes :',
      local: 'Local',
      remote: 'À distance',
      remoteUrl: 'URL',
      realtimeMessage:
        'Vous pouvez importer autant de fichiers que vous le souhaitez. Les entités avec le même identifiant (ID) seront mises à jour.',
      realtimeError: 'Il y a eu une erreur en essayant de récupérer le flux :',
      corsError: 'Il est possible que ce soit une erreur CORS.',
      autoRefresh: 'Mise à jour automatique à chaque minute',
      saveAndFetch: 'Sauvegarder et récupérer le flux',
      note: "Une fois l'agence activée et les véhicules importés, ils seront disponibles dans toutes les régions de Transit Tracker. Toutes les données importées sont sauvegardées dans votre navigateur.",
      wait: 'Veuillez attendre. Ceci pourrait prendre quelques minutes.',
    },
    data: {
      backTo: 'Retour à',
      id: 'ID',
      type: 'Type',
      entity: 'Entité',
      seoTitle: 'Entités temps-réel',
    },
  },
  settings: {
    open: 'Ouvrir les paramètres',
    title: 'Paramètres',
    pwa: {
      install: 'Installer Transit Tracker',
      success: 'Succès!',
      error: "Erreur lors de l'installation",
      updateAvailable: 'Une mise à jour est disponible',
      installUpdate: 'Rafraîchir maintenant',
    },
    agenciesTitle: 'Agences',
    searchAgency: 'Rechercher une agence',
    agenciesAddAll: 'Ajouter toutes les agences',
    autoRefresh: 'Rafraichissement automatique',
    autoRefreshDesc:
      "Mise à jour toutes les 60 ou 120 secondes, selon l'agence.",
    autoRefreshOn: 'Activé',
    autoRefreshOff: 'Désactivé',
    theme: 'Thème',
    themeLight: 'Thème clair',
    themeDark: 'Thème foncé',
    themeSystem: 'Système',
    themeSystemDesc: 'Selon les préférences de votre navigateur',
    defaultScreen: 'Écran par défaut',
    noRedirect: 'Ne pas rediriger',
    mobileTable: 'Page liste - disposition sur mobile',
    mobileTableDesc: 'Réglage applicable uniquement aux petits écrans.',
    mobileTableSimple: 'Vue simplifiée',
    mobileTablePrefrerDesktop: 'Vue en tableau',
    mobileTablePrefrerDesktopDesc:
      'Comme sur un ordinateur ou les anciennes versions',
    language: 'Langue',
  },
  alert: {
    readMore: 'Lire plus',
    markAsRead: 'Marquer comme lue',
    close: 'Fermer',
  },
  download: {
    title: 'Télécharger les données',
    close: 'Fermer',
    btnNext: 'Suivant',
    btnBack: 'Précédent',
    btnCancel: 'Annuler',
    agencyStep: 'Choisissez votre agence',
    agencySelect: 'Agence',
    agencyLicense:
      "En continuant, vous acceptez la licence choisie par l'agence.",
    agencyNotDownloadable:
      "La licence de cette agence n'autorise pas le téléchargement.",
    agencyRead: 'Lire la licence complète',
    formatStep: 'Choisissez le format',
    formatDesc: 'Les deux options sont des fichiers CSV.',
    formatActive:
      "Véhicules actifs: ceux que vous pouvez actuellement voir dans l'application",
    formatAll:
      "Tous les véhicules: ceux enregistrés depuis la création de l'agence dans Transit Tracker - contiens des véhicules inactifs (nécessite un téléchargement - gros fichier)",
    downloadStep: 'Télécharger',
    downloadBtn: 'Télécharger',
    downloadLoading:
      "Téléchargement des données... cela devrait prendre moins d'une minute.",
    downloadReady: 'Votre fichier est maintenant prêt.',
    downloadError:
      "Une erreur s'est produite lors de la préparation de votre fichier. Veuillez réessayer plus tard.",
    downloadError429:
      'Vous avez dépassé le nombre maximum de téléchargements par heure. Veuillez réessayer plus tard.',
    fileEmpty: "Il n'y a pas de véhicules en ce moment, réessayer plus tard!",
  },
  regionSwitcher: {
    title: 'Changer de région',
    agency: '1 agence | {n} agences',
    close: 'Fermer',
    next: 'Suivant',
    previous: 'Précédent',
    changeTo: 'Changer pour cette région',
    already: 'Déjà sélectionné',
  },
  aboutDialog: {
    title: 'À propos de Transit Tracker',
    body: "Transit Tracker est une application à code source ouvert qui permet de transformer et visualiser les données en temps réel de plusieurs agences de transport en commun. L'application utilise de nombreux projets à code source ouvert, tels que :",
    openSource: 'Code source',
    dev: 'Développeurs',
    devBody:
      "Transit Tracker offre une API qui permet d'accéder facilement aux données en temps réel dans un format JSON ou GraphQL.",
    devSite: 'Sites pour développeurs',
    illustrations: 'Illustrations',
    illustrationsBody:
      "Les illustrations sur la page d'accueil ont été créées par Émilie Beaulieu. Les icônes à travers l'application proviennent de Material Design Icons.",
    by: 'Par Félix Desjardins - @felixinx',
    contact: 'Un problème, un commentaire ou une suggestion?',
    contactBtn: 'Contactez-moi',
  },
  maintenance: {
    title: 'Maintenance',
    description: 'Le serveur est présentement en mode de maintenance.',
    wait: 'Veuillez réessayer dans quelques minutes.',
    statusPage: "Voir l'état de l'application",
    statusPageUrl: 'https://ohdear.app/status-page/transittracker-fr',
  },
}
