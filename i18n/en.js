export default {
  app: {
    tabHome: 'Home',
    tabMap: 'Map',
    tabTable: 'Table',
    tabByod: 'BYOD',
    tabSettings: 'Settings',
    snackbarBold: 'Warning!',
    snackbarText:
      'Data from some agencies are outdated and should be used with caution.',
    snackbarBtn: 'Close',
    regionAriaLabel: 'Change region',
  },
  landing: {
    welcome: 'Welcome to Transit&nbsp;Tracker',
    intro: 'An overview of the public transport network for',
    introCities: 'several Canadian cities',
    body:
      'There is currently {vehicles} active vehicles across {agencies} agencies.',
    byodNew: 'New!',
    byodTitle: 'Import your own data',
    byodBody:
      'You can now use the Transit Tracker interface with any GTFS Realtime dataset.',
    byodStart: 'Start now',
  },
  home: {
    welcome: 'Welcome to ',
    version: 'Version',
    exitBeta: 'Exit beta version',
    vehicleTotal: 'vehicles are active',
    download: 'Download',
    secondsAgo: 'seconds ago',
    minutesAgo: 'minutes ago',
    outdated: 'Outdated',
    emptyTitle: 'No agencies selected',
    emptyBody:
      "You didn't select any agencies for this region. Head over to the settings tab to add some agencies or change region using the top-right button.",
    emptyButton: 'Add agencies',
    creditsTitle: 'Credits',
    refreshAriaLabel: 'Refresh',
  },
  mapFooter: {
    select: 'Please select a vehicle to see more information',
  },
  mapBottomSheet: {
    close: 'Close',
    vehicle: 'Vehicle',
    seenAt: 'Seen at',
    properties: {
      label: 'Vehicle ID:',
      plate: 'License plate:',
      tripId: 'Trip ID:',
      routeId: 'Route:',
      headsign: 'Headsign:',
      shortName: 'Departure number:',
      startTime: 'Start time:',
      currentStatus: 'Status:',
      currentStopSequence: 'Stop sequence:',
      bearing: 'Bearing:',
      speed: 'Speed:',
      odometer: 'Odometer:',
      scheduleRelationship: 'Schedule relationship:',
      congestionLevel: 'Congestion level:',
      occupancyStatus: 'Occupancy status:',
    },
    help: {
      label:
        'This is the internal identifier assigned by the agency for this vehicule. Under normal circumstances, the label represents the number displayed to the public on the vehicle while the ID is not displayed.',
      gtfs_trip:
        'This is a unique identifier assigned for this trip. A single trip can be seen multiple times throughout the week, for example from Monday to Friday.',
      relationship:
        'Typically, a trip is planned in advance. But sometimes, when ridership requires it or for other reasons, agencies have to add a trip in between. A vehicle may also have no timetable (a metro system for example) or be canceled for various reasons.',
      status:
        'This is the status of the vehicle in relation to the stops. When a vehicle heads for a stop, it is "In transit to". When approaching, it becomes "incoming". Then at the stop, it is "Stopped at".',
      stop_sequence:
        'This field represents the position of the vehicle in relation to the number of stops served by the trip. As the journey progresses and the vehicle approaches its final stop, this number increases.',
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
  },
  settings: {
    open: 'Open settings',
    title: 'Settings',
    pwa: {
      install: 'Install Transit Tracker',
      success: 'Success!',
      error: 'Error while installing',
    },
    agenciesTitle: 'Agencies',
    searchAgency: 'Search for an agency',
    autoRefresh: 'Auto refresh',
    autoRefreshOn: 'On',
    autoRefreshOnDesc: 'Update every 60 seconds',
    autoRefreshOff: 'Off',
    theme: 'Theme',
    themeLight: 'Light theme',
    themeDark: 'Dark theme',
    themeSystem: 'System',
    themeSystemDesc: 'According to your browser settings',
    defaultScreen: 'Default screen',
    language: 'Language',
    about: 'By @felixinx',
    contact: 'A problem, a comment or a suggestion?',
    contactBtn: 'Contact&nbsp;me',
  },
  alert: {
    readMore: 'Read more',
    markAsRead: 'Mark as read',
    close: 'Close',
  },
  download: {
    cardTitle: 'Download data',
    btnCancel: 'Cancel',
    agencyStep: 'Pick your agency',
    agencySelect: 'Agency',
    agencyLicense:
      'By continuing, you accept the license chosen by the agency.',
    agencyNotDownloadable:
      'The license of this agency does not authorize download.',
    agencyRead: 'Read the complete license',
    formatStep: 'Choose the format',
    formatDesc:
      'Both options are CSV files. They contain a similar structure, but have different datasets.',
    formatLoaded:
      'Loaded vehicles (all vehicles you can currently see in the application)',
    formatDump:
      'All vehicles (recording since the beginning of Transit Tracker - will contain inactive vehicles)',
    formatNotLoaded:
      'This agency is not currently loaded. Activate it on the settings tab to choose the loaded option.',
    downloadStep: 'Download',
    downloadBtn: 'Download',
    downloadLoading: 'Downloading... it should take less than a minute.',
    downloadReady: 'Your file is now ready.',
    downloadError:
      'There was an error while preparing your file. Please try again later.',
    downloadError429:
      'You have exceeded the maximum number of download per hour. Please try again later.',
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
}
