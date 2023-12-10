// OccupationalHealthcareEntryForm.jsx
import { FormEvent, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { OccupationalHealthcareEntry } from '../../types';
import DiagnoseSelect from './DiagnoseSelect';

interface Props {
  onSubmit: (entry: OccupationalHealthcareEntry) => void;
}

const OccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [entry, setEntry] = useState<OccupationalHealthcareEntry>({
    type: 'OccupationalHealthcare',
    description: '',
    date: '',
    specialist: '',
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    },
    diagnosisCodes: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'sickLeaveStart' || name === 'sickLeaveEnd') {
      setEntry({
        ...entry,
        sickLeave: {
          ...entry.sickLeave,
          [name === 'sickLeaveStart' ? 'startDate' : 'endDate']: value,
        },
      });
    } else {
      setEntry({ ...entry, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      <TextField
        label="Employer Name"
        name="employerName"
        value={entry.employerName}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Sick Leave Start Date"
        name="sickLeaveStart"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={entry.sickLeave.startDate}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Sick Leave End Date"
        name="sickLeaveEnd"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={entry.sickLeave.endDate}
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

export default OccupationalHealthcareEntryForm;
