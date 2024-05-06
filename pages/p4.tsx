import React, { useEffect, useMemo, useState } from 'react';

// TODO move to a layout
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import ParaglidingIcon from '@mui/icons-material/Paragliding';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FlightTable from '@/components/FlightTable/FlightTable';

import '../app/globals.css';
import styles from './p4.module.scss';

import { getCanopiesFlown, getCountOfHourPlusFlightsBySite, getFilteredLogbook, getHourPlusFlightCounts, getHourPlusThermalFlightCount, getNumberOfFlights, getNumberOfFlightsPerSite, getNumberOfFlyingDays, getTotalAirtime, } from '@/utils/logbook';
import classNames from 'classnames';
import { IFlight, IFlightBySite, ILogbookFilters } from '@/types';
import { logbook } from '@/components/FlightTable/logbook';
import { useIsMobile } from '@/utils/Dom';
import Note from '@/components/Note/Note';

interface IViewFlightRequirementsProps {
  setFilters: (filters: ILogbookFilters) => void;
  buttonClassnames: string;
};

interface IFlightsPerSiteRequiremnetProps {
  filters: ILogbookFilters;
  setFilters: (filters: ILogbookFilters) => void;
  flightsPerSite: IFlightBySite[];
}

const FlightCountRequirement = () => {
  return <div className={styles.req}>
    <span className={styles.reqMin}>
      Minimum 250 flights
    </span>
    <div className={styles.reqActualBlock}>
      <CheckCircleIcon className={styles.reqIcon} />
      <span className={styles.reqActual}>
        Actual <span className={styles.reqValueBlue}>{getNumberOfFlights()}</span> flights
      </span>
    </div>
  </div>;
}

const FlightsPerSiteRequiremnet = ({
  filters,
  setFilters, 
  flightsPerSite,
}: IFlightsPerSiteRequiremnetProps) => {
  const isMobile = useIsMobile();

  return <div className={styles.req}>
    <span className={styles.reqMin}>
      5 flights at 5 different sites in Intermediate conditions
    </span>
    <div>
      <div className={styles.reqActualBlock}>
        <CheckCircleIcon className={styles.reqIcon} />
        <span className={styles.reqActual}>
          Flights per site
        </span>
      </div>
      <div className={classNames("text-xs text-center", styles.tableSmallText)}>
        *Click a site to { isMobile ? 'view' : 'filter' }  the flight log
      </div>
      <div className={styles.siteTableWrapper}>
        <table
          className={styles.siteTable}
        >
          <thead>
            <tr>
              <th>Site</th>
              <th className={styles.cellRight}>Flights</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={classNames(styles.siteTableRow, { [styles.selected]: !isMobile && typeof filters.site === 'undefined' })}
              onClick={() => setFilters({})}
              key={ 'allsites' }
            >
              <td>All sites</td>
              <td className={styles.cellRight}>{getNumberOfFlights()}</td>
            </tr>
            {flightsPerSite.map(flightBySite => (
              flightBySite.site.length > 0
                ? <tr
                  key={flightBySite.site}
                  className={classNames(styles.siteTableRow, { [styles.selected]: !isMobile && flightBySite.site === filters.site })}
                  onClick={() => setFilters({ site: flightBySite.site })}
                >
                  <td>
                    {flightBySite.site}
                  </td>
                  <td className={styles.cellRight}>
                    {flightBySite.flightCount}
                  </td>
                </tr>
                : <></>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

const FlyingDaysRequirement = () => {
  return <div className={styles.req}>
    <span className={styles.reqMin}>
      Minimum of 80 flying days
    </span>
    <div className={styles.reqActualBlock}>
      <CheckCircleIcon className={styles.reqIcon} />
      <span className={styles.reqActual}>
        Actual <span className={styles.reqValueBlue}>{getNumberOfFlyingDays()}</span> flying days
      </span>
    </div>
  </div>;
}

const ThermalRequirements = ({ setFilters, buttonClassnames }: IViewFlightRequirementsProps) => {
  return <div className={styles.req}>
    <span className={styles.reqMin}>
      Three 1 hour flights in thermal lift
    </span>
    <div className={styles.reqActualBlock}>
      <div className={styles.reqActualBlockLeft}>
        <CheckCircleIcon className={styles.reqIcon} />
        <span className={styles.reqActual}>
          <span className={styles.reqValueBlue}>{getHourPlusThermalFlightCount()}</span> qualifying flights
        </span>
      </div>
      <button
        type="button"
        onClick={() => setFilters({
          excludeSites: ['TPG'],
          hourPlus: true,
        })}
        className={buttonClassnames}
      >
        View flights
      </button>
    </div>
  </div>;
}

const RidgeRequirements = ({ setFilters, buttonClassnames }: IViewFlightRequirementsProps) => {
  return <div className={styles.req}>
    <span className={styles.reqMin}>
      One 1 hour flight in ridge lift
    </span>
    <div className={styles.reqActualBlock}>
      <div className={styles.reqActualBlockLeft}>
        <CheckCircleIcon className={styles.reqIcon} />
        <span className={styles.reqActual}>
          <span className={styles.reqValueBlue}>{getCountOfHourPlusFlightsBySite('TPG')}</span> one-hour+ flights at <span className={styles.reqValueBlue}>TPG</span>
        </span>
      </div>
      <button
        type="button"
        onClick={() => setFilters({
          site: 'TPG',
          hourPlus: true,
        })}
        className={buttonClassnames}
      >
        View flights
      </button>
    </div>
  </div>;
}

const AirtimeRequirement = () => {
  return <div className={styles.req}>
    <span className={styles.reqMin}>
      75 flying hours
    </span>
    <div className={styles.reqActualBlock}>
      <CheckCircleIcon className={styles.reqIcon} />
      <span className={styles.reqActual}>
        Actual <span className={styles.reqValueBlue}>{`${getTotalAirtime().hours}+`}</span> hours
      </span>
    </div>
  </div>;
}

const CanopiesFlownRequirement = () => {
  return <div className={styles.req}>
    <span className={styles.reqMin}>
      Minimum 5 canopies flown
    </span>
    <div className={styles.reqActualBlock}>
      <CheckCircleIcon className={styles.reqIcon} />
      <span className={styles.reqActual}>
        Actual <span className={styles.reqValueBlue}>{getCanopiesFlown().length}</span> canopies flown
      </span>
    </div>
    <div className={styles.reqActualBlock}>
      <div className={styles.siteTableWrapper}>
        <table
          className={styles.siteTable}
        >
          <thead>
            <tr>
              <th>Canopies flown</th>
            </tr>
          </thead>
          <tbody>
            {getCanopiesFlown().map(canopy => (
              <tr
                key={canopy}
                className={classNames(styles.siteTableRow)}
              >
                <td>
                  {canopy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

const P4 = () => {
  const [filters, setFilters] = useState<ILogbookFilters>({});
  const [flights, setFlights] = useState<IFlight[]>(logbook);
  const isMobile = useIsMobile();
  const [isMobileLogVisible, setIsMobileLogVisible] = useState(false);
  const labelClass = classNames("decoration-blue-500 font-semibold underline text-4xl text-gray-900", styles.label);
  const [flightsPerSite, setFlightsPerSite] = useState<IFlightBySite[]>([]);
  const buttonClassnames = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  const isLogVisible = isMobile
    ? isMobileLogVisible
    : true;

  useEffect(() => setFlightsPerSite(getNumberOfFlightsPerSite()), []);

  useEffect(() => {
    setFlights(getFilteredLogbook(filters));    
  }, [filters])

  const onSetFilterTableVisible = (filters: ILogbookFilters) => {
    window.scrollTo(0, 0);
    setIsMobileLogVisible(true);
    setFilters(filters);
  }

  return (
    <div className={ styles.p4 }>
      {/* <div>
        <img src={ '../public/greenhelmet.png' } alt="" />
      </div> */}
      <div className={ styles.container }>
        <div className={ styles.table }>

          { isLogVisible &&
            <div className={ styles.data }>
              { isMobile &&
                <button
                type='button'
                onClick={ () => setIsMobileLogVisible(false) }
                >
                  <ArrowBackIcon /> back to Logged Requirements
                </button>
              }
              <div className={ labelClass }>
                Flight log
              </div>
              <FlightTable flights={ flights } />
              <div className="text-xs">
                *scroll table to view more
              </div>
            </div>
          }

          { ((!isLogVisible && isMobile) || !isMobile) &&
            <div className={ styles.loggedRequirements }>
              <div className={ labelClass }>
                Logged Requirements
              </div>
              <FlightCountRequirement />
              <FlightsPerSiteRequiremnet filters={ filters } setFilters={ onSetFilterTableVisible } flightsPerSite={ flightsPerSite } />
              <FlyingDaysRequirement />
              <ThermalRequirements setFilters={ onSetFilterTableVisible } buttonClassnames={ buttonClassnames } />
              <RidgeRequirements setFilters={ onSetFilterTableVisible } buttonClassnames={ buttonClassnames } />
              <AirtimeRequirement />
              <CanopiesFlownRequirement />
            </div>
          }
        </div>
        
        { ((!isLogVisible && isMobile) || !isMobile) &&
          <div className={ styles.logbookSection }>
            <div className={ labelClass }>
              Logbook Notes
            </div>
            In the context of presenting my logs, I have left my notes off. In regards to my logbook, I also record general conditions and flight statistics (when I fly with instrumentation). Here are just a few notable notes:
            <div className={ styles.notesContainer }>
              <Note message={ 'You almost died! Huge collapse very close to the terain while going downwind. BE LESS LIKELY TO FLY IF FRIENDS ARE AROUND. I flew  in super super strong cross wind. I would have stayed home most likely if my (non-flying) friends werent going. That was a bad decision.' } />
              <Note message={ 'Super nice of whatshisname to lend the chili. Good height. Glider felt like it wanted to twist on me.' } />
              <Note message={ 'Crazy low save x 3! Be careful scratching so close to the cliff. Cheers for landing up top.' } />
              <Note message={ 'Remember to keep your legs tight! Got twisted and started to spiral.' } />
              <Note message={ 'First flight at Marshall! Huge success. Great decision making in terms of when to launch, where to launch, and flight plan. Stayed above 90% of the other gliders. Noticed a lot of people making turns while not in lift. Stayed straight along the ridge of the mountain until I found lift and then turned in it. Fantastic video: https://www.youtube.com/watch?v=J-RHzQ45fI8' } />
              <Note message={ 'Low save! Held on when everyone else was gone by staying on the corner of the north face. Left when someone else was coming wand was able to top land.' } />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default P4;




