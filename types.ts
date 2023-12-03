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

export type NewPatientEntryObject = {
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
};

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
