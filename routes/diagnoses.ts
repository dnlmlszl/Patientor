import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const diagnoses = diagnoseService.getNonSensitiveEntries();

    res.status(200).json(diagnoses);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching diagnoses');
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;
