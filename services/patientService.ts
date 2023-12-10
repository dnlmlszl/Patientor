import patients from '../data/patients';
import { v1 as uuid } from 'uuid';
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  DiagnoseEntry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatientById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((patient) => patient.id === id);

  if (patient && !patient.entries) {
    return { ...patient, entries: [] };
  }

  return patient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addDiagnosis = (
  patientId: string,
  diagnosis: DiagnoseEntry
): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  const newDiagnosisEntry: DiagnoseEntry = {
    code: diagnosis.code,
    name: diagnosis.name,
    latin: diagnosis.latin,
  };

  patient.entries.push(newDiagnosisEntry);

  return patient;
};

const updatePatient = (
  updatedPatient: PatientEntry
): PatientEntry | undefined => {
  const index = patients.findIndex((p) => p.id === updatedPatient.id);
  if (index !== -1) {
    patients[index] = updatedPatient;
    return updatedPatient;
  }
  return undefined;
};

export default {
  getEntries,
  getPatientById,
  getNonSensitiveEntries,
  addPatient,
  addDiagnosis,
  updatePatient,
};
