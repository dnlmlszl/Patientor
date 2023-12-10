import diagnoses from '../data/diagnoses';

import { DiagnoseEntry, NonsensitiveDiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

const getNonSensitiveEntries = (): NonsensitiveDiagnoseEntry[] => {
  return diagnoses.map(({ code, name }) => ({ code, name }));
};

const addDiagnose = (newDiagnose: DiagnoseEntry): DiagnoseEntry => {
  diagnoses.push(newDiagnose);
  return newDiagnose;
};

export default { getEntries, getNonSensitiveEntries, addDiagnose };
