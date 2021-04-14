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
    body:
      'There is currently {totalVehicles} active vehicles across {totalAgencies} agencies.',
    byodNew: 'New!',
    byodTitle: 'Import your own data',
    byodBody:
      'You can now use the Transit Tracker interface with any GTFS Realtime dataset.',
    byodStart: 'Start now',
    agencies: '{n} agencies',
    vehicles: '{n} vehicles',
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
      "You didn't select any agencies for this region. Head over to the settings to add some agencies (top-right button) or change region.",
    emptyButton: 'Change region',
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
    openLink: 'Open the link in a new tab',
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
      tripId:
        'This is a unique identifier assigned for this trip. A single trip can be seen multiple times throughout the week, for example from Monday to Friday.',
      scheduleRelationship:
        'Typically, a trip is planned in advance. But sometimes, when ridership requires it or for other reasons, agencies have to add a trip in between. A vehicle may also have no timetable (a metro system for example) or be canceled for various reasons.',
      currentStatus:
        'This is the status of the vehicle in relation to the stops. When a vehicle heads for a stop, it is "In transit to". When approaching, it becomes "incoming". Then at the stop, it is "Stopped at".',
      currentStopSequence:
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
  byod: {
    title: 'Bring Your Own Data',
    subtitle:
      'You can use the interface of Transit Tracker with your own feeds from your favorite agencies from all over the world.',
    list: 'List of agencies',
    lastUpdated: 'Last updated:',
    noAgencies: 'No agencies',
    getStarted: 'To get started, click the button below',
    newAgency: 'New agency',
    removeModule: "Don't need the BYOD module anymore?",
    disable: 'Disable',
    addModule: 'BYOD is a feature for advanced users',
    addModuleDesc:
      'You need basic knowledge of the GTFS (<i>General Transit Feed Specification</i>) format to use this feature. Also take note that enabling this feature will have a performance impact on the overall performance of the application.',
    enable: 'Enable',
    createTitle: 'Create a new agency',
    nameValidation: 'Name is required',
    nameLabel: 'Agency name',
    iconLabel: 'Icon',
    bus: 'Bus',
    train: 'Train',
    tram: 'Tram',
    ferry: 'Ferry',
    createAdd: 'Add',
    back: 'Back to all custom agencies',
    delete: 'Delete agency',
    routesCap: 'Routes',
    routes: 'routes',
    tripsCap: 'Trips',
    trips: 'trips',
    saved: '%{type} saved in your browser.',
    empty: "You don't have imported any %{type} yet.",
    upload: 'Click to select the %{file} file',
    message: 'Importing a new file will overwrite any existing %{type}.',
    import: 'Import',
    realtimeTitle: 'GTFS Realtime entities',
    realtimeDesc: 'Upload a GTFS-RT feed in the protocul buffer format.',
    emptyExisting: 'Empty existing entities:',
    local: 'Local',
    remote: 'Remote',
    realtimeMessage:
      'You can import as many files as you want. Entity with the same ID will be updated.',
    realtimeError: 'There was an error while fetching this URL:',
    corsError: 'This could be a CORS error.',
    autoRefresh: 'Auto refresh every minute',
    saveAndFetch: 'Save and fetch feed',
    note:
      'Once imported, your vehicles are accessible in every region of Transit Tracker. All imported data is saved directly in your browser.',
    wait: 'Please wait. It could take a couple of minutes.',
    backTo: 'Back to',
    id: 'ID',
    type: 'Type',
    entity: 'Entity',
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
    formatStep: 'Choose the format',
    formatDesc: 'Both options are CSV files.',
    formatActive:
      'Active vehicles: all vehicles you can currently see in the application',
    formatAll:
      'All vehicles: recording since this agency was introduced in Transit Tracker - will contain inactive vehicles (download needed - larger file)',
    downloadStep: 'Download',
    downloadBtn: 'Download',
    downloadLoading: 'Downloading... this should take less than a minute.',
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
}
