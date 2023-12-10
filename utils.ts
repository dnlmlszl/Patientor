import {
  Entry,
  Gender,
  HealthCheckEntry,
  HospitalEntry,
  NewPatientEntry,
  NewPatientEntryObject,
  OccupationalHealthcareEntry,
  RawEntry,
} from './types';

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

const parseHospitalEntry = (entry: RawEntry): HospitalEntry => {
  // Ide jön a HospitalEntry specifikus mezőinek ellenőrzése és feldolgozása
  // Például: discharge mező feldolgozása
  if (!entry.discharge) {
    throw new Error('Missing discharge information for Hospital entry');
  }
  return entry as HospitalEntry;
};

const parseOccupationalHealthcareEntry = (
  entry: RawEntry
): OccupationalHealthcareEntry => {
  // Ide jön az OccupationalHealthcareEntry specifikus mezőinek ellenőrzése és feldolgozása
  // Például: employerName mező feldolgozása
  if (!entry.employerName) {
    throw new Error('Missing employer name for OccupationalHealthcare entry');
  }
  return entry as OccupationalHealthcareEntry;
};

const parseHealthCheckEntry = (entry: RawEntry): HealthCheckEntry => {
  // Ide jön a HealthCheckEntry specifikus mezőinek ellenőrzése és feldolgozása
  // Például: healthCheckRating mező feldolgozása
  if (entry.healthCheckRating === undefined) {
    throw new Error('Missing health check rating for HealthCheck entry');
  }
  return entry as HealthCheckEntry;
};

export const parseEntry = (entry: RawEntry): Entry => {
  switch (entry.type) {
    case 'Hospital':
      return parseHospitalEntry(entry);
    case 'OccupationalHealthcare':
      return parseOccupationalHealthcareEntry(entry);
    case 'HealthCheck':
      return parseHealthCheckEntry(entry);
    default:
      throw new Error('Invalid entry type');
  }
};

// const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> => {
//   if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//     // we will just trust the data to be in correct form
//     return [] as Array<DiagnoseEntry['code']>;
//   }

//   return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
// };

export const toNewPatientEntry = (
  object: NewPatientEntryObject & { entries?: RawEntry[] }
): NewPatientEntry => {
  if (!object || typeof object !== 'object' || object === null) {
    throw new Error('Incorrect or missing object');
  }

  const gender: Gender = parseGender(object.gender);

  const entries = object.entries ? object.entries.map(parseEntry) : [];

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
      entries: entries,
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

// export const toNewDiagnosisEntry = (object: DiagnoseEntry): DiagnoseEntry => {
//   if (!object || typeof object !== 'object' || object === null) {
//     throw new Error('Incorrect or missing object');
//   }
//   if ('name' in object && 'code' in object && 'latin' in object) {
//     const newDiagnosisEntry: DiagnoseEntry = {
//       code: object.code,
//       name: object.name,
//       latin: object.latin ? object.latin : undefined,
//     };
//     return newDiagnosisEntry;
//   }
//   throw new Error('Incorrect data: some fields are missing');
// };

export const toNewDiagnosisEntry = (object: RawEntry): Entry => {
  if (!object || typeof object !== 'object' || object === null) {
    throw new Error('Incorrect or missing object');
  }

  return parseEntry(object);
};
