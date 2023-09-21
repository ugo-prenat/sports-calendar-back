import {
  COMBAT_SPORTS_CHAMPIONSHIP,
  MOTORSPORTS_CHAMPIONSHIPS,
  SESSIONS,
  SPORTS_TYPES
} from '../constants';

export type SportType = (typeof SPORTS_TYPES)[number];

export type MotorsportChampionship = (typeof MOTORSPORTS_CHAMPIONSHIPS)[number];
export type CombatSportChampionship =
  (typeof COMBAT_SPORTS_CHAMPIONSHIP)[number];

export type ChampionshipId = MotorsportChampionship | CombatSportChampionship;

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
    shortName: string;
  }>;
  startTime: string;
  endTime: string;
  country: IEventCountry;
  location: IEventLocation;
}

export interface IEventCountry {
  regionalized: IRegionalized<{
    code: string;
    name?: string; // i18n à partir du code ?
  }>;
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
  track?: string; // juste pour les sports mécaniques
}

export interface ISession {
  id: string;
  // eventId: string;
  sport: SportType;
  championship: ChampionshipId;
  type: Session;
  startTime: string;
  endTime: string;
}
