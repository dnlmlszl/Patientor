// export type Gender = 'male' | 'female' | 'other';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatientEntry = Omit<
  PatientEntry,
  'dateOfBirth' | 'ssn'
>;

export type NonsensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonsensitivePatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntryObject = {
  entries?: Entry[];
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
};

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: DiagnoseEntry['code'][];
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry
  | DiagnoseEntry;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

// // Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type RawEntry = {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  type: string;

  discharge?: {
    date: string;
    criteria: string;
  };
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  healthCheckRating?: HealthCheckRating;
};
