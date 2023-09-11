import { isValid } from 'date-fns';

export const cleanArray = <T>(array: T[]): T[] =>
  array.filter((item) => item !== null && item !== undefined && item !== '');

export const isValidDate = (date: string) => isValid(new Date(date));

export const isEmpty = (val: any): boolean =>
  val == null || !(Object.keys(val) || val).length;

export const isNotEmpty = (val: any): boolean => !isEmpty(val);
