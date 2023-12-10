export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type SickLeave = {
  startDate: string;
  endDate: string;
};

export type Entry = {
  id: string;
  date: string;
  specialist: string;
  type: string;
  description: string;
  healthCheckRating: number;
  diagnosisCodes: string[];
  sickLeave?: SickLeave;
};

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface HospitalEntry {
  type: 'Hospital';
  description: string;
  date: string;
  specialist: string;
  discharge: {
    date: string;
    criteria: string;
  };
  diagnosisCodes: string[];
}

export interface OccupationalHealthcareEntry {
  type: 'OccupationalHealthcare';
  description: string;
  date: string;
  specialist: string;
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  diagnosisCodes: string[];
}

export interface HealthCheckEntry {
  type: 'HealthCheck';
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: number;
}

export type EntryData =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
