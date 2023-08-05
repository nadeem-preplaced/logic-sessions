

const listOfSessions = [
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-08-04T07:46:45.818Z',
    sessionHistory: [{ type: 'Unschedule' }, { type: 'Attended' }],
    recordId: 1,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-08-03T07:46:45.818Z',
    recordId: 2,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-08-23T07:46:45.818Z',
    recordId: 3,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-08-22T07:46:45.818Z',
    recordId: 4,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-08-30T07:46:45.818Z',
    recordId: 5,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-08-31T07:46:45.818Z',
    recordId: 6,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-09-06T07:46:45.818Z',
    recordId: 7,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-09-07T07:46:45.818Z',
    recordId: 8,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-09-14T07:46:45.818Z',
    recordId: 9,
  },
  {
    sessionName: '1:1 SyncUp With Keshav Bhaiya',
    sessionDateTime: '2023-09-15T07:46:45.818Z',
    recordId: 10,
  },
];

enum FilterValues {
  ALL = 'all',
  UPCOMING = 'upcoming',
  PAST = 'past',
  UNATTENDED = 'unattended',
}

const dateRanges = {
  past: { startAt: '1 Jan 2020', endAt: '23 July 2023' },
  lastWeek: { startAt: '', endAt: '' },
  thisWeek: { startAt: '', endAt: '' },
  nextWeek: { startAt: '', endAt: '' },
  later: { startAt: '', endAt: '' },
};

const getSessionsDataForUI = (listOfSessions, filterValue = 'all') => {
  if (!listOfSessions.length) return;
  let renderUIDataForSessions = {
    past: {
      title: 'Past',
      sessions: {},
    },
    lastWeek: {
      title: 'LastWeek',
      sessions: {},
    },
    thisWeek: {
      title: 'ThisWeek',
      sessions: {},
    },
    nextWeek: {
      title: 'NextWeek',
      sessions: {},
    },
    later: {
      title: 'LaterWeek',
      sessions: {},
    },
  };
  switch (filterValue) {
    case FilterValues.ALL:
      listOfSessions?.forEach((sessionDetails) => {
        for (let key in dateRanges) {
          const value = dateRanges[key];
          const targetDate = moment(sessionDetails.sessionDateTime);
          const startDate = moment(value.startAt);
          const endDate = moment(value.endAt);
          const isWithinRange = targetDate.isBetween(
            startDate,
            endDate,
            null,
            '[]'
          );
          if (isWithinRange) {
            renderUIDataForSessions[key].sessions[sessionDetails.recordId] =
              sessionDetails;
          }
          break;
        }
      });
      break;
    case FilterValues.UPCOMING:
      listOfSessions?.forEach((sessionDetails) => {
        const currentDate = moment();
        if (moment(sessionDetails.sessionDateTime).isAfter(currentDate)) {
          for (let key in dateRanges) {
            const value = dateRanges[key];
            const targetDate = moment(sessionDetails.sessionDateTime);
            const startDate = moment(value.startAt);
            const endDate = moment(value.endAt);
            const isWithinRange = targetDate.isBetween(
              startDate,
              endDate,
              null,
              '[]'
            );
            if (isWithinRange) {
              renderUIDataForSessions[key].sessions[sessionDetails.recordId] =
                sessionDetails;
            }
            break;
          }
        }
      });
      break;
    case FilterValues.PAST:
      listOfSessions?.forEach((sessionDetails) => {
        const currentDate = moment();
        if (moment(sessionDetails.sessionDateTime).isBefore(currentDate)) {
          for (let key in dateRanges) {
            const value = dateRanges[key];
            const targetDate = moment(sessionDetails.sessionDateTime);
            const startDate = moment(value.startAt);
            const endDate = moment(value.endAt);
            const isWithinRange = targetDate.isBetween(
              startDate,
              endDate,
              null,
              '[]'
            );
            if (isWithinRange) {
              renderUIDataForSessions[key].sessions[sessionDetails.recordId] =
                sessionDetails;
            }
            break;
          }
        }
      });
      break;

    case FilterValues.UNATTENDED:
    default:
      listOfSessions?.forEach((sessionDetails) => {
        if (
          sessionDetails.sessionHistory.some(
            (item) => item.type === 'Unschedule'
          )
        ) {
          for (let key in dateRanges) {
            const value = dateRanges[key];
            const targetDate = moment(sessionDetails.sessionDateTime);
            const startDate = moment(value.startAt);
            const endDate = moment(value.endAt);
            const isWithinRange = targetDate.isBetween(
              startDate,
              endDate,
              null,
              '[]'
            );
            if (isWithinRange) {
              renderUIDataForSessions[key].sessions[sessionDetails.recordId] =
                sessionDetails;
            }
            break;
          }
        }
      });
  }
};

console.log('getSessionDataForUI ALL', getSessionsDataForUI(listOfSessions));

console.log(
  'getSessionDataForUI UPCOMING',
  getSessionsDataForUI(listOfSessions, FilterValues.UPCOMING)
);

console.log(
  'getSessionDataForUI PAST',
  getSessionsDataForUI(listOfSessions, FilterValues.PAST)
);

console.log(
  'getSessionDataForUI UNSCHEDULE',
  getSessionsDataForUI(listOfSessions, FilterValues.UNATTENDED)
);
