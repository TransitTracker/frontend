import {
  mdiTram,
  mdiSubway,
  mdiTrain,
  mdiBus,
  mdiFerry,
  mdiTramSide,
} from '@mdi/js'

export const alertCategory = {
  0: {
    key: 'Update',
  },
  1: {
    key: 'NewAgency',
  },
  2: {
    key: 'Maintenance',
  },
  3: {
    key: 'StatusUpdate',
  },
}

export const alertStatus = {
  /* 0: Draft and 4: Hidden (both not available in API) */
  1: {
    key: 'Active',
    showOnTopBar: true,
    canBeClosed: true,
  },
  2: {
    key: 'Locked',
    showOnTopBar: true,
    canBeClosed: false,
  },
  3: {
    key: 'Archived',
    showOnTopBar: false,
    canBeClosed: false,
  },
}

export const carriageCategory = {
  0: {
    key: 'Locomotive',
  },
  1: {
    key: 'Coach',
  },
  2: {
    key: 'CabCar',
  },
}

export const vehicleTypes = {
  0: {
    key: 'Tram',
    icon: mdiTram,
  },
  1: {
    key: 'Subway',
    icon: mdiSubway,
  },
  2: {
    key: 'Train',
    icon: mdiTrain,
  },
  3: {
    key: 'Bus',
    icon: mdiBus,
  },
  4: {
    key: 'Ferry',
    icon: mdiFerry,
  },
  5: {
    key: 'Streetcar',
    icon: mdiTramSide,
  },
}
