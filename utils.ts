import { Gender, NewPatientEntry, NewPatientEntryObject } from './types';

const isValidString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isValidString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isValidString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isValidString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseSocialSecurityNumber = (ssn: unknown): string => {
  if (!ssn || !isValidString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isValidGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isValidString(gender) || !isValidGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const toNewPatientEntry = (object: NewPatientEntryObject): NewPatientEntry => {
  if (!object || typeof object !== 'object' || object === null) {
    throw new Error('Incorrect or missing object');
  }
  console.log(object);

  const gender: Gender = parseGender(object.gender);

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSocialSecurityNumber(object.ssn),
      gender: gender,
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
