import React, { useState } from 'react';
// import { Diagnosis } from '../../types';
import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { apiBaseUrl } from '../../constants';

interface Props {
  onCancel: () => void;
  id: string | undefined;
}

const AddDiagnoseForm = ({ onCancel, id }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newEntry = {
        description,
        date,
        specialist,
        healthCheckRating: parseInt(healthCheckRating, 10),
        diagnosisCodes: diagnosisCodes.split(',').map((code) => code.trim()),
      };
      await axios.post(`${apiBaseUrl}/patients/${id}/diagnoses`, newEntry);
      onCancel();
    } catch (error) {
      console.error(error || 'Unknown Error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ marginTop: 20 }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          label="Health Check Rating"
          type="number"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Grid
          container
          spacing={2}
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              style={{ float: 'right' }}
              type="submit"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddDiagnoseForm;
