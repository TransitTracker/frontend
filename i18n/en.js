import en from 'vuetify/lib/locale/en'

export default {
  $vuetify: en,
  app: {
    tabHome: 'Home',
    tabMap: 'Map',
    tabTable: 'Table',
    tabByod: 'BYOD',
    tabSettings: 'Settings',
  },
  error: {
    title: 'Error',
    return: 'Return to the home page',
    404: 'Are you lost?',
    500: 'Oops! We made an error.',
  },
  landing: {
    welcome: 'Welcome to Transit&nbsp;Tracker',
    intro: 'An overview of the public transport network for',
    introCities: 'several Canadian cities',
    body: 'There are currently {totalVehicles} active vehicles across {totalAgencies} agencies.',
    byodNew: 'New!',
    byodTitle: 'Import your own data',
    byodBody:
      'You can now use the Transit Tracker interface with any GTFS Realtime dataset.',
    byodStart: 'Start now',
    agencies: 'No agencies | 1 agency | {n} agencies',
    vehicles: 'No vehicles | 1 vehicle | {n} vehicles',
    openMap: 'Open map from {region}',
    openTable: 'Open table from {region}',
    seoTitle: 'An Overview of Public Transit for Several Canadian Cities',
    // Padding
    seoDescription:
      'Transit Tracker is an app that lets you find hundreds of buses, trains and streetcars from major Canadian cities, such as Montreal and Toronto, on a single map!',
  },
  home: {
    welcome: 'Welcome to ',
    version: 'Version',
    whatsNew: "What's new?",
    vehicleTotal: 'vehicles are active',
    download: 'Download',
    downloadTitle: 'Download data',
    secondsAgo: 'seconds ago',
    minutesAgo: 'minutes ago',
    outdated: 'Outdated',
    emptyTitle: 'No agencies selected',
    emptyBody:
      "You didn't select any agencies for this region. Add the suggested agency below, use the settings to add more agencies (top-right button) or change region.",
    emptyButton: 'Add all agencies',
    emptyButtonShort: 'All',
    creditsTitle: 'Credits',
    refreshAriaLabel: 'Refresh',
  },
  map: {
    seoTitle: 'Map of {region}',
  },
  mapFooter: {
    select: 'Please select a vehicle to see more information',
    // Padding
    scroll: 'Scroll',
  },
  mapTag: {
    electric: 'Electric',
    mirrorCameras: 'Mirror cameras',
  },
  properties: {
    agency: 'Agency',
    ref: 'Vehicle ID',
    label: 'Vehicle number (label)',
    tags: 'Tags',
    timestamp: 'Last seen',
    tripId: 'Trip ID',
    startTime: 'Trip Start Time',
    routeId: 'Route ID',
    bearing: 'Bearing (°)',
    speed: 'Speed (km/h)',
    vehicleType: 'Vehicle Type',
    plate: 'License Plate',
    odometer: 'Odometer',
    currentStopSequence: 'Stop sequence',
    createdAt: 'First seen',
    actions: 'Actions',
    trip: {
      headsign: 'Trip Headsign',
      shortName: 'Departure number',
      routeShortName: 'Route name',
      serviceId: 'Service ID',
    },
    position: {
      lat: 'Position',
    },
    currentStatus: {
      label: 'Status',
    },
    scheduleRelationship: {
      label: 'Schedule Relationship',
    },
    congestionLevel: {
      label: 'Congestion Level',
    },
    occupancyStatus: {
      label: 'Occupancy Status',
    },
  },
  mapBottomSheet: {
    close: 'Close',
    vehicle: 'Vehicle',
    seenAt: 'Seen at',
    openLink: 'Open the link in a new tab',
    properties: {
      label: 'Vehicle ID',
      plate: 'License plate',
      tripId: 'Trip ID',
      routeId: 'Route',
      headsign: 'Headsign',
      shortName: 'Departure number',
      startTime: 'Start time',
      currentStatus: 'Status',
      currentStopSequence: 'Stop sequence',
      bearing: 'Bearing',
      speed: 'Speed',
      odometer: 'Odometer',
      scheduleRelationship: 'Schedule relationship',
      congestionLevel: 'Congestion level',
      occupancyStatus: 'Occupancy status',
      createdAt: 'First seen',
    },
    help: {
      label:
        'This is the internal identifier assigned by the agency for this vehicle. Under normal circumstances, the label represents the number displayed to the public on the vehicle while the ID is not displayed.',
      tripId:
        'This is a unique identifier assigned for this trip. A single trip can be seen multiple times throughout the week, for example from Monday to Friday.',
      scheduleRelationship:
        'Typically, a trip is planned in advance. But sometimes, when ridership requires it or for other reasons, agencies have to add a trip in between. A vehicle may also have no timetable (a metro system for example) or be cancelled for various reasons.',
      currentStatus:
        'This is the status of the vehicle in relation to the stops. When a vehicle heads for a stop, it is "In transit to". When approaching, it becomes "incoming". Then at the stop, it is "Stopped at".',
      currentStopSequence:
        'This field represents the position of the vehicle in relation to the number of stops served by the trip. As the journey progresses and the vehicle approaches its final stop, this number increases.',
    },
    habs: 'This bus wears the colors of the Canadiens, during the playoffs.',
  },
  table: {
    empty: 'No vehicles!',
    dataAgency: 'Agency',
    dataRef: 'Vehicle number',
    dataRoute: 'Route',
    dataHeadsign: 'Headsign',
    dataTripId: 'Trip ID',
    dataStartTime: 'Start time',
    actions: 'Actions',
    viewOnMap: 'View on map',
    openLinks: 'Open external links',
    linksTitle: 'External links',
    filter: 'Filter',
    seoTitle: 'List of vehicles of {region}',
    filterRouteId: 'Apply filter only on route ID',
    routeId: 'Route ID',
  },
  byod: {
    title: 'Bring Your Own Data',
    subtitle:
      'You can use the interface of Transit Tracker with your own feeds from your favourite agencies from all over the world.',
    list: 'List of agencies',
    lastUpdated: 'Last updated:',
    noAgencies: 'No agencies',
    getStarted: 'To get started, click the button below',
    isSynced: 'This agency is synchronized with Transit Tracker',
    isNotSynced: 'This agency is not synchronized with Transit Tracker',
    rename: 'Rename agency',
    save: 'Save',
    sync: 'Sync agency with Transit Tracker',
    unSync: 'Remove agency from the current session of Transit Tracker',
    manage: 'Manage this agency (add static and real time GTFS files)',
    // Padding
    newAgency: 'New agency',
    removeModule: "Don't need the BYOD module anymore?",
    disable: 'Disable',
    addModule: 'BYOD is a feature for advanced users',
    addModuleDesc:
      'You need basic knowledge of the GTFS (<i>General Transit Feed Specification</i>) format to use this feature. Also take note that enabling this feature will have a performance impact on the overall performance of the application.',
    enable: 'Enable',
    createTitle: 'Create a new agency',
    validationEmpty: 'Name is required',
    validationLength: 'Name is too long',
    nameLabel: 'Agency name',
    iconLabel: 'Icon',
    bus: 'Bus',
    train: 'Train',
    tram: 'Tram',
    ferry: 'Ferry',
    createAdd: 'Add',
    seoDescription:
      'Use the Transit Tracker interface with your own GTFS Realtime feeds.',
    agency: {
      back: 'Back to all custom agencies',
      delete: 'Delete agency',
      syncNow: 'Sync now',
      staticGtfs: 'Static GTFS',
      staticType: 'Type',
      routes: 'routes',
      services: 'services',
      stops: 'stops',
      shapes: 'shapes',
      trips: 'trips',
      saved: '{n} {type} saved in your browser.',
      empty: "You haven't imported any {type} yet.",
      upload: 'Click to select the {file} file',
      message: 'Importing a new file will overwrite any existing {type}.',
      import: 'Import',
      realtimeTitle: 'GTFS Realtime entities',
      realtimeDesc: 'Upload a GTFS-RT feed in the protocol buffer format.',
      emptyExisting: 'Empty existing entities:',
      local: 'Local',
      remote: 'Remote',
      remoteUrl: 'Remote URL',
      realtimeMessage:
        'You can import as many files as you want. Entity with the same ID will be updated.',
      realtimeError: 'There was an error while fetching this URL:',
      corsError: 'This could be a CORS error.',
      autoRefresh: 'Auto refresh every minute',
      saveAndFetch: 'Save and fetch feed',
      note: 'If the agency is activated, and the vehicles imported, they will be accessible in every region of Transit Tracker. All imported data is saved directly in your browser.',
      wait: 'Please wait. It could take a couple of minutes.',
    },
    data: {
      backTo: 'Back to',
      id: 'ID',
      type: 'Type',
      entity: 'Entity',
      seoTitle: 'Real time entities',
    },
  },
  settings: {
    open: 'Open settings',
    title: 'Settings',
    pwa: {
      install: 'Install Transit Tracker',
      success: 'Success!',
      error: 'Error while installing',
      updateAvailable: 'An update is available',
      installUpdate: 'Refresh to update now',
    },
    agenciesTitle: 'Agencies',
    searchAgency: 'Search for an agency',
    agenciesAddAll: 'Add all agencies',
    autoRefresh: 'Auto refresh',
    autoRefreshDesc: 'Update every 60 or 120 seconds, depending on the agency.',
    // Padding
    autoRefreshOn: 'On',
    autoRefreshOff: 'Off',
    theme: 'Theme',
    themeLight: 'Light theme',
    themeDark: 'Dark theme',
    themeSystem: 'System',
    themeSystemDesc: 'According to your browser settings',
    defaultScreen: 'Default screen',
    noRedirect: 'Do not redirect',
    table: 'Table page - columns',
    tableDesc:
      'You can customize the orders of the columns displayed in the app, and change their visibility.',
    // Padding
    language: 'Language',
  },
  alert: {
    readMore: 'Read more',
    markAsRead: 'Mark as read',
    close: 'Close',
  },
  download: {
    title: 'Download data',
    close: 'Close',
    btnNext: 'Next',
    btnBack: 'Back',
    btnCancel: 'Cancel',
    agencyStep: 'Pick your agency',
    agencySelect: 'Agency',
    agencyLicense:
      'By continuing, you accept the license chosen by the agency.',
    agencyNotDownloadable:
      'The license of this agency does not authorize download.',
    agencyRead: 'Read the complete license',
    snapshot: 'Snapshot',
    snapshotName: 'Snapshot of all agencies',
    snapshotLicense:
      'Licenses vary. Consult each agency in the menu above to see the licenses.',
    formatStep: 'Choose the format',
    formatDesc: 'Both options are CSV files.',
    formatActive:
      'Active vehicles: all vehicles you can currently see in the application',
    formatAll:
      'All vehicles: recording since this agency was introduced in Transit Tracker - will contain inactive vehicles (download needed - larger file)',
    downloadStep: 'Download',
    downloadBtn: 'Download',
    downloadLoading: 'Downloading... this should take less than a minute.',
    // Padding
    downloadReady: 'Your file is now ready.',
    downloadError:
      'There was an error while preparing your file. Please try again later.',
    downloadError429:
      'You have exceeded the maximum number of download per hour. Please try again later.',
    fileEmpty: 'There is currently no vehicles, try later!',
  },
  regionSwitcher: {
    title: 'Change region',
    agency: '1 agency | {n} agencies',
    close: 'Close',
    next: 'Next',
    previous: 'Previous',
    changeTo: 'Change to this region',
    already: 'Already selected',
  },
  aboutDialog: {
    title: 'About Transit Tracker',
    body: 'Transit Tracker is an open-source application that transforms and visualizes real-time data from multiple transit agencies. The application uses many open source projects, such as:',
    openSource: 'Open source',
    dev: 'Developers',
    devBody:
      'Transit Tracker offers an API that allows easy access to real-time data in JSON or GraphQL format.',
    devSite: 'Developers site',
    by: 'By Félix Desjardins - @felixinx',
    contact: 'A problem, a comment or a suggestion?',
    contactBtn: 'Contact&nbsp;me',
  },
  maintenance: {
    title: 'Maintenance',
    description:
      'The server is currently in maintenance mode. Please try again in a few minutes.',
    statusPage: 'Status page',
    statusPageUrl: 'https://status.transittracker.ca',
  },
  notifications: {
    title: 'Notifications',
    warning: 'Wait!',
    warning429: 'Wait a few minutes before trying again.',
    // Padding
    unavailable: 'Notifications are not available in your browser.',
    // Padding
    authorize: 'Authorize',
    authorizeTitle: 'Allow notifications in your browser',
    authorizeBody:
      'You can then choose what type of notifications you want. For now, you can subscribe to two types of notifications: new vehicles and general alerts.',
    authorizeError: 'The request was refused:',
    selectNotifications: 'Select notifications',
    newVehicles: 'New vehicles',
    newVehiclesCount:
      'No agency activated | One agency activated | {n} agencies activated',
    newVehiclesDesc:
      'Get a notification for each new vehicle, from the agencies of your choice',
    generalNews: 'General news',
    generalNewsDesc:
      'Receive notifications for information on Transit Tracker updates, news, disruptions and more',
    chooseAgencies: 'Select your agencies',
    selectAll: 'Select all',
    newVehiclesWeek:
      'No new vehicle recently | No new vehicles recently | {n} new vehicles in the last week',
    agencyNotSelected:
      'This agency is not visible in Transit Tracker, you can activate it in the settings',
    save: 'Save',
    inactive: 'Inactive subscription',
    inactiveDesc:
      'Your subscription was deactivated by your browser and could not be reactivated automatically. Please unsubscribe and resubscribe.',
    hideUuid: 'hide',
    showUuid: 'show your secret id',
    unsubscribe: 'Unsubscribe',
    active: 'Active subscription',
  },
}
