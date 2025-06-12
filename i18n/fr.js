import fr from 'vuetify/lib/locale/fr'

export default {
  $vuetify: fr,
  app: {
    tabHome: 'Accueil',
    tabMap: 'Carte',
    tabTable: 'Liste',
    tabDownload: 'Données',
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
    download: 'Télécharger',
    downloadTitle: 'Télécharger les données',
    vehicleTotal: 'véhicules actifs',
    secondsAgo: 'secondes',
    minutesAgo: 'minutes',
    outdated: 'Pas à jour',
    emptyTitle: 'Aucune agence sélectionnée',
    emptyBody:
      "Vous n'avez pas sélectionné d'agence pour cette région. Ajoutez l'agence proposée ci-dessous, utilisez les réglagles pour voir tous les choix (coin supérieur droit) ou changez de région.",
    emptyButton: 'Ajouter toutes les agences',
    emptyButtonShort: 'Toutes',
    creditsTitle: 'Crédits',
    refreshAriaLabel: 'Rafraîchir',
    archived: 'Archivé',
  },
  map: {
    seoTitle: 'Carte de {region}',
  },
  mapFooter: {
    select:
      'Veuillez sélectionner un véhicule pour y consulter toutes les informations',
    scroll: 'Défilez',
  },
  geometry: {
    coordinates: 'Position',
  },
  properties: {
    trip: {
      id: 'ID du voyage (Trip)',
      shortName: 'Numéro du départ',
      headsign: 'Destination du voyage',
      startTime: 'Heure de départ du voyage',
      scheduleRelationship: "Relation avec l'horaire",
      blockId: 'ID du Bloc',
      serviceId: 'ID du Service',
    },
    route: {
      id: 'ID de la route',
      shortName: 'Nom de la route',
    },
    vehicle: {
      id: 'ID du véhicule',
      label: 'Numéro du véhicule',
      licensePlate: "Plaque d'immatriculation",
      type: 'Type du véhicule',
    },
    position: {
      bearing: 'Direction (°)',
      odometer: 'Odomètre',
      speed: 'Vitesse (km/h)',
    },
    agencyId: 'Agence',
    currentStopSequence: "Séquence d'arrêt",
    currentStatus: 'Statut',
    congestionLevel: 'Niveau de congestion',
    occupancyStatus: 'Statut de la capacité',
    firstSeenAt: 'Première apparition',
    lastSeenAt: 'Dernière apparition',
    tags: 'Étiquettes',
    agencyShort: 'Agence (court)',
    actions: 'Actions',
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
  settings: {
    open: 'Ouvrir les paramètres',
    title: 'Paramètres',
    pwa: {
      install: 'Installer Transit Tracker',
      success: 'Succès!',
      error: "Erreur lors de l'installation",
      updateAvailable: 'Une mise à jour est disponible',
      updatePending:
        "La mise à jour est en cours d'installation! Lorsque prête, la page rafraîchira.",
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
    table: 'Colonnes de la liste',
    tableDesc:
      "Vous pouvez personnaliser l'ordre des colonnes affichées dans l'application et modifier leur visibilité.",
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
    snapshot: 'Archive',
    snapshotName: 'Archive de toutes les agences',
    snapshotLicense:
      'Les licences varient. Consultez chaque agence dans le menu ci-haut pour voir les licences.',
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
    by: 'Par Félix Desjardins - @felixinx',
    contact: 'Un problème, un commentaire ou une suggestion?',
    contactBtn: 'Contactez-moi',
  },
  maintenance: {
    title: 'Maintenance',
    description:
      'Le serveur est présentement en mode de maintenance. Veuillez réessayer dans quelques minutes.',
    statusPage: "Voir l'état de l'application",
    statusPageUrl: 'https://statut.transittracker.ca',
  },
  notifications: {
    title: 'Notifications',
    warning: 'Attention!',
    warning429:
      'Veillez attendre quelques minutes avant de réessayer à nouveau.',
    unavailable:
      'Les notifications ne sont pas disponibles dans votre navigateur.',
    authorize: 'Autoriser',
    authorizeTitle: 'Autorisez les notifications dans votre navigateur',
    authorizeBody:
      "Vous pourez ensuite choisir quel type de notifications vous souhaitez. Pour l'instant, vous pouvez vous abonnez à deux types de notifications : nouveaux véhicules et alertes générales.",
    authorizeError: 'La demande a été refusée :',
    selectNotifications: 'Sélectionnez les notifications',
    newVehicles: 'Nouveaux véhicules',
    newVehiclesCount:
      'Aucune agence activée | Une agence activée | {n} agences activées',
    newVehiclesDesc:
      'Obtenez une notification pour chaque nouveau véhicule, des agences de votre choix',
    generalNews: 'Nouvelles générales',
    generalNewsDesc:
      "Recevez des notifications pour de l'information sur les mises à jour, nouveautés, perturbations et autres de Transit Tracker",
    chooseAgencies: 'Sélectionnez vos agences',
    selectAll: 'Tout sélectionner',
    newVehiclesWeek:
      'Aucun nouveau véhicule récemment | Un nouveau véhicule dans la dernière semaine | {n} nouveaux véhicules dans la dernière semaine',
    agencyNotSelected:
      "Cette agence n'est pas visible dans Transit Tracker, vous pouvez l'ajouter dans les paramètres",
    save: 'Sauvegarder',
    inactive: 'Abonnement inactif',
    inactiveDesc:
      "Votre abonnement a été désactivé par votre navigateur et n'a pas pu être réactivé automatiquement. Veuillez vous désabonner et vous réabonner.",
    hideUuid: 'cacher',
    showUuid: 'montrer votre identifiant secret',
    unsubscribe: 'Se désabonner',
    active: 'Abonnement actif',
  },
  enums: {
    vehicleType: {
      label: {
        0: 'Tram',
        1: 'Métro',
        2: 'Train',
        3: 'Bus',
        4: 'Traversier',
        5: 'Tramway',
        6: 'Téléporté',
        7: 'Funiculaire',
        11: 'Trolleybus',
        12: 'Monorail',
      },
    },
    scheduleRelationship: {
      label: {
        0: 'Prévu',
        1: 'Ajouté',
        2: 'Non prévu',
        3: 'Annulé',
      },
    },
    currentStatus: {
      label: {
        0: 'Arrive au prochain arrêt',
        1: "À l'arrêt",
        2: 'En déplacement',
      },
    },
    congestionLevel: {
      label: {
        0: 'Niveau de congestion inconnu',
        1: 'Aucune congestion',
        2: 'Faible congestion',
        3: 'Congestion',
        4: 'Congestion sévère',
      },
    },
    occupancyStatus: {
      label: {
        0: 'Vide',
        1: 'Plusieurs sièges disponibles',
        2: 'Quelques sièges disponibles',
        3: 'Places debout seulement',
        4: 'Quelques places debout seulement',
        5: 'Plein',
        6: "N'accepte plus de passagers",
        7: 'Pas de données disponibles',
        8: 'Embarquement interdit',
      },
    },
  },
}
