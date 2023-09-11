import { isValid } from 'date-fns';

export const cleanArray = (array: any[]) =>
  array.filter((item) => item !== null && item !== undefined && item !== '');

export const isValidDate = (date: string) => isValid(new Date(date));
