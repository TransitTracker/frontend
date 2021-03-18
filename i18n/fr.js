export default {
  app: {
    tabHome: 'Accueil',
    tabMap: 'Carte',
    tabTable: 'Liste',
    tabSettings: 'Paramètres',
    snackbarBold: 'Attention!',
    snackbarText:
      'Les données de certaines agences ne sont pas à jour et doivent être utilisées avec prudence.',
    snackbarBtn: 'Fermer',
    regionAriaLabel: 'Changer de région',
  },
  landing: {
    welcome: 'Bienvenue dans Transit&nbsp;Tracker',
    intro: "Une vue d'ensemble du réseau de transport en commun pour",
    introCities: 'plusieurs villes Canadiennes',
    body:
      'En ce moment, il y a {vehicles} véhicules actifs à travers {agencies} agences.',
    byodNew: 'Nouveau!',
    byodTitle: 'Importez vos propres données',
    byodBody:
      "Vous pouvez maintenant utiliser l'interface de Transit Tracker avec n'importe quel jeu de données GTFS Realtime.",
    byodStart: 'Commencez maintenant',
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
    open: 'Ouvrir les paramètres',
    title: 'Paramètres',
    pwa: {
      install: 'Installer Transit Tracker',
      success: 'Succès!',
      error: "Erreur lors de l'installation",
    },
    agenciesTitle: 'Agences',
    searchAgency: 'Rechercher une agence',
    autoRefresh: 'Rafraichissement automatique',
    autoRefreshOn: 'Activé',
    autoRefreshOnDesc: 'Mise à jour toutes les 60 secondes',
    autoRefreshOff: 'Désactivé',
    theme: 'Thème',
    themeLight: 'Thème clair',
    themeDark: 'Thème foncé',
    themeSystem: 'Système',
    themeSystemDesc: 'Selon les préférences de votre navigateur',
    defaultScreen: 'Écran par défaut',
    language: 'Langue',
    about: 'Par @felixinx',
    contact: 'Un problème, un commentaire ou une suggestion?',
    contactBtn: 'Contactez-moi',
  },
  alert: {
    readMore: 'Lire plus',
    markAsRead: 'Marquer comme lu',
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
      "Tous les véhicules: ceux enregistrés depuis la création de l'agence dans Transit Tracker - contient des véhicules inactifs (nécéssite un téléchargement - gros fichier)",
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
}
