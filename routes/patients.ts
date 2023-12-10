import express from 'express';
import patientService from '../services/patientService';
import { parseEntry, toNewPatientEntry } from '../utils';
import { RawEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatientById(id);

  res.status(200).json(patient);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.status(201).json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/diagnoses', (req, res) => {
  const { id } = req.params;
  try {
    const patient = patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    const newEntry = parseEntry(req.body as RawEntry);
    patient.entries.push(newEntry);
    const updatedPatient = patientService.updatePatient(patient);
    if (!updatedPatient) {
      return res.status(404).send({ error: 'Unable to add entry' });
    }
    return res.status(201).json(updatedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
