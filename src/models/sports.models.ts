import {
  MOTORSPORTS_CHAMPIONSHIPS,
  SESSIONS,
  SPORTS_TYPES
} from '../constants';

export type SportType = (typeof SPORTS_TYPES)[number];

export type MotorsportChampionship = (typeof MOTORSPORTS_CHAMPIONSHIPS)[number];

export type ChampionshipId = MotorsportChampionship;

export type Session = (typeof SESSIONS)[number];

export interface IRegionalized<T extends { [key: string]: any }> {
  en: T;
  fr?: T;
}

export interface IEvent {
  id: string;
  sport: SportType;
  championship: ChampionshipId;
  regionalized: IRegionalized<{
    name: string;
    shortName?: string;
  }>;
  startTime: string;
  endTime: string;
  country: IEventCountry;
  location: IEventLocation;
}

export interface IEventCountry {
  code: string;
  flag: string;
}

export interface IEventLocation {
  regionalized: IRegionalized<{
    name: string;
    shortName?: string;
  }>;
  coordinates?: {
    lat: number;
    lng: number;
  };
  track?: string;
}

export interface ISession {
  id: string;
  eventId: string;
  sport: SportType;
  championship: ChampionshipId;
  type: Session;
  startTime: string;
  endTime: string;
}
