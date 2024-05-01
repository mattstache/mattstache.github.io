import React from 'react';

import { logbook } from './logbook';

import { IFlight, ILogbookFilters } from '../../types';

import Paper from '@mui/material/Paper';

import styles from './FlightTable.module.scss';

interface IFlightTable {
  flights: IFlight[];
}

const FlightTable = ({ flights }: IFlightTable) => {

  return (
    <>
    <Paper elevation={ 1 } className={ styles.paper }>
        <table className={ styles.table }>
          <thead>
            <tr>
              <th>Date</th>
              <th>Site</th>
              <th>Glider</th>
              <th className={ styles.cellRight }>Air time</th>
            </tr>
          </thead>
          <tbody>
              {
                flights
                  .map((flight: IFlight, index: number) => {
                  return <tr key={ index }>
                    <td>
                      { flight.date }
                    </td>
                    <td>
                      { flight.site }
                    </td>
                    <td>
                      { flight.glider }
                    </td>
                    <td className={ styles.cellRight }>
                      { flight.airTime }
                    </td>
                  </tr>
                })
              }
          </tbody>
        </table>
    </Paper>
    </>
  );
};

export default FlightTable;
