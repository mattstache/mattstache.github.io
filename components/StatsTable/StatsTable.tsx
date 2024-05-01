import { getNumberOfFlights, getNumberOfFlightsPerSite, getNumberOfFlyingDays, getTotalAirtime } from '@/utils/logbook';
import React from 'react';
import StatCard from './StatCard';

import styles from './StatsTable.module.scss';

const StatsTable = () => {
  const numberOfFlights = getNumberOfFlights();
  // const numberOfFlightsPerSite = getNumberOfFlightsPerSite();
  const numberOfFlightDays = getNumberOfFlyingDays();
  const totalAirtime = getTotalAirtime();
  
  console.log('getNumberOfFlights', getNumberOfFlights());
console.log('getNumberOfFlightsPerSite', getNumberOfFlightsPerSite());
console.log('getNumberOfFlyingDays', getNumberOfFlyingDays());
console.log('getTotalAirtime', getTotalAirtime());
  return (
    <div className={ styles.statsTable }>
      <StatCard value={ numberOfFlights } label="Flights" />
      <StatCard value={ numberOfFlightDays } label="Flight Days" />
      <StatCard value={ `${ totalAirtime.hours }h${ totalAirtime.minutes }m` } label="Total Airtime" />
    </div>
  );
};

export default StatsTable;
