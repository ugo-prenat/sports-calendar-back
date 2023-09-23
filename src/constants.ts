// ENV
export const DEFAULT_PORT = '3000';
export const DEFAULT_NODE_ENV = 'development';

export const MORGGAN_FORMAT = 'dev';

// SPORTS
export const MOTORSPORTS = 'motorsports';
export const COMBAT_SPORTS = 'combat-sports';
export const SPORTS_TYPES = [MOTORSPORTS, COMBAT_SPORTS] as const;

// CHAMIPONSHIPS

// /!\ à chaque ajout d'un nouveau championnat :
//        - ajouter son id ci-dessous
//        - ajouter son id dans le tableau {SPORT_TYPE}_CHAMPIONSHIPS
//        - ajouter sa configuration dans le tableau CHAMIPONSHIP_CONFS
//        - faire la même chose côté front

export const F1 = 'f1';
export const F2 = 'f2';
export const F3 = 'f3';
export const WEC = 'wec';
export const F1_ACADEMY = 'f1-academy';
export const GT_WORLD_CHALLENGE = 'gt-world-challenge';

export const MOTORSPORTS_CHAMPIONSHIPS = [
  F1,
  F2,
  F3,
  WEC,
  F1_ACADEMY,
  GT_WORLD_CHALLENGE
] as const;

export const UFC = 'ufc';
export const COMBAT_SPORTS_CHAMPIONSHIP = [UFC] as const;

export const CHAMPIONSHIPS = [
  ...MOTORSPORTS_CHAMPIONSHIPS,
  ...COMBAT_SPORTS_CHAMPIONSHIP
] as const;

// SESSIONS
export const FREE_PRACTICE = 'free-practice';
export const FREE_PRACTICE_1 = 'free-practice-1';
export const FREE_PRACTICE_2 = 'free-practice-2';
export const FREE_PRACTICE_3 = 'free-practice-3';
export const PRE_QUALIFYING = 'pre-qualifying';
export const QUALIFYING = 'qualifying';
export const SPRINT = 'sprint';
export const RACE = 'race';
export const RACE_1 = 'race-1';
export const RACE_2 = 'race-2';

export const SESSIONS = [
  FREE_PRACTICE,
  FREE_PRACTICE_1,
  FREE_PRACTICE_2,
  FREE_PRACTICE_3,
  PRE_QUALIFYING,
  QUALIFYING,
  SPRINT,
  RACE,
  RACE_1,
  RACE_2
] as const;
