
export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value => value.trim() !== '' ? undefined : 'Cannot be empty';
export const validLength = value => value.trim().length === 5 ? undefined : 'Must be 5 numbers in length';
export const allNumbers = value => (value !== isNaN ? undefined : 'Must be all numbers');