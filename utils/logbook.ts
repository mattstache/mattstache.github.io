import { IFlight, IFlightBySite, ILogbookFilters } from '@/types';
import { logbook } from '../components/FlightTable/logbook';

export const getNumberOfFlights = () => (logbook.length);
export const getNumberOfFlyingDays = () => {
  const days: string[] = [];
  logbook.forEach(flight => {
    if (!days.includes(flight.date)) {
      days.push(flight.date);
    }
  })

  return days.length;
};
// export const getTotalAirtimeMinutes = () => (logbook
//   .map(flight => flight.airTime)
//   .reduce((a, b) => (a + b)));
export const getTotalAirtimeMinutes = () => {
  let totalAirttime = 0;
  logbook.forEach(flight => {
    if (typeof flight.airTime === 'number') {
      totalAirttime += flight.airTime;
    }
  })

  return totalAirttime;
}
export const getTotalAirtime = () => {
  const totalMinutes = getTotalAirtimeMinutes();
  const hours = Math.floor(totalMinutes / 60);          
  const minutes = totalMinutes % 60;

  return { hours, minutes };
};

export const getCanopiesFlown = () => {
  const canopiesFlown: string[] = [];

  logbook.forEach(flight => {
    const gliderName = flight.glider === 'A'
        ? 'Unknown student wings'
        : flight.glider;

    if (
      !canopiesFlown.includes(gliderName)
      && flight.glider.trim().length
    ){
      canopiesFlown.push(gliderName);
    }
  })

  return canopiesFlown;
}
export const getNumberOfFlightsPerSite = () => {
  const flightsBySite: IFlightBySite[] = [];

  logbook.forEach(flight => {
    const filteredArray = flightsBySite.find(({ site }) => {
      return site === flight.site;
    });

    if (!filteredArray) {
      flightsBySite.push({ site: flight.site, flightCount: 1 })
      return;
    }

    filteredArray.flightCount++;
  });

  return flightsBySite;
}
export const getLogbookSorted = () => {
  return logbook.sort((a, b) => {
    if (a.airTime === b.airTime) {
      return 0;
    }

    return a.airTime < b.airTime
      ? -1
      : 1;
  })
}

export const getHourPlusFlightCounts = () => {
  interface ISitesCountObj {
    [key: string]: number;
  }
  const counts: ISitesCountObj = {};

  for (const flight of logbook) {
    if (flight.airTime >= 60) {
      counts[flight.site] = counts[flight.site] ? counts[flight.site] + 1 : 1;    
    }
  }
  return counts;
}

export const getCountOfHourPlusFlightsBySite = (site: string) => {
  return getHourPlusFlightCounts()[site];
}

export const getHourPlusThermalFlightCount = () => (
  getFilteredLogbook({
    excludeSites: ['TPG'],
    hourPlus: true,
  }).length
)

export const getFilteredLogbook = (filters: ILogbookFilters) => {
  return logbook
  .filter((flight: IFlight) => {
    let result = true;
    const filterProps: string[] = Object.keys(filters);

    if (filterProps.length === 0) {
      return result;
    }

    filterProps.forEach((filter: keyof ILogbookFilters | string) => {
      if (filter === 'hourPlus') {
        if (flight.airTime < 60) {
          result = false;
        }
        
        return;
      }

      if (filter === 'excludeSites') {
        if (filters[filter]?.includes(flight.site)) {
          result = false;
        }

        return;
      }

      if (flight[filter] !== filters[filter as string]) {
        result = false;
        return false;
      }
    })
    return result;
  })
}
