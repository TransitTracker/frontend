import en from 'vuetify/lib/locale/en'

export default {
  $vuetify: en,
  app: {
    tabHome: 'Home',
    tabMap: 'Map',
    tabTable: 'Table',
    tabDownload: 'Download',
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
    archived: 'Archived',
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
  vehicleFields: {
    geometry: {
      coordinates: 'Position',
    },
    properties: {
      trip: {
        id: 'Trip ID',
        shortName: 'Departure number',
        headsign: 'Trip Headsign',
        startTime: 'Trip Start Time',
        scheduleRelationship: 'Schedule Relationship',
        serviceId: 'Service ID',
        blockId: 'Block ID',
      },
      route: {
        id: 'Route ID',
        shortName: 'Route name',
      },
      vehicle: {
        id: 'Vehicle ID',
        label: 'Fleet number',
        licensePlate: 'License Plate',
        type: 'Vehicle Type',
      },
      position: {
        bearing: 'Bearing (°)',
        odometer: 'Odometer (km)',
        speed: 'Speed (km/h)',
      },
      currentStopSequence: 'Stop sequence',
      currentStatus: 'Status',
      congestionLevel: 'Congestion Level',
      occupancyStatus: 'Occupancy Status',
      firstSeenAt: 'First seen',
      lastSeenAt: 'Last seen',
      agencyId: 'Agency',
      tags: 'Tags',
      actions: 'Actions',
    },
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
  settings: {
    open: 'Open settings',
    title: 'Settings',
    pwa: {
      install: 'Install Transit Tracker',
      success: 'Success!',
      error: 'Error while installing',
      updateAvailable: 'An update is available',
      updatePending:
        'The update is being installed! When ready, the page will refresh.',
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
    table: 'Table columns',
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
    title: 'About ',
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
