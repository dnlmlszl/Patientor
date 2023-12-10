import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { HospitalEntry } from '../../types';
import DiagnoseSelect from './DiagnoseSelect';

interface Props {
  onSubmit: (entry: HospitalEntry) => void;
}

const HospitalEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [entry, setEntry] = useState<HospitalEntry>({
    type: 'Hospital',
    description: '',
    date: '',
    specialist: '',
    discharge: {
      date: '',
      criteria: '',
    },
    diagnosisCodes: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'dischargeDate' || name === 'dischargeCriteria') {
      setEntry({
        ...entry,
        discharge: {
          ...entry.discharge,
          [name === 'dischargeDate' ? 'date' : 'criteria']: value,
        },
      });
    } else {
      setEntry({ ...entry, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(entry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        name="description"
        value={entry.description}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={entry.date}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Specialist"
        name="specialist"
        value={entry.specialist}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <DiagnoseSelect
        diagnosisCodes={entry.diagnosisCodes}
        setDiagnosisCodes={(codes) =>
          setEntry({ ...entry, diagnosisCodes: codes })
        }
      />
      <TextField
        label="Discharge Date"
        name="dischargeDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={entry.discharge.date}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />

      <TextField
        label="Discharge Criteria"
        name="dischargeCriteria"
        value={entry.discharge.criteria}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
        style={{ margin: '2rem 0' }}
      >
        Submit
      </Button>
    </form>
  );
};

export default HospitalEntryForm;
