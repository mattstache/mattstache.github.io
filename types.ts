export interface IFlight {
  [key: string]: string | number;
  date: string;
  glider: string;
  site: string;
  notes: string;
  airTime: number;
}

export interface IFlightBySite {
  site: string;
  flightCount: number;
}

export interface ILogbookFilters {
  [key: string]: string | undefined | string[] | boolean;
  glider?: string;
  site?: string;
  excludeSites?: string[];
  hourPlus?: boolean;
}