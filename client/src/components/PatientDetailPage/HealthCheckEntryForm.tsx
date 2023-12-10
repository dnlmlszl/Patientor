import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { HealthCheckEntry } from '../../types';

interface Props {
  onSubmit: (entry: HealthCheckEntry) => void;
}

const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [entry, setEntry] = useState<HealthCheckEntry>({
    type: 'HealthCheck',
    description: '',
    date: '',
    specialist: '',
    healthCheckRating: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof entry;
    setEntry({
      ...entry,
      [name]: event.target.value,
    });
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
        variant="outlined"
        margin="normal"
        fullWidth
        value={entry.description}
        onChange={handleChange}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        variant="outlined"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={entry.date}
        onChange={handleChange}
      />
      <TextField
        label="Specialist"
        name="specialist"
        variant="outlined"
        margin="normal"
        fullWidth
        value={entry.specialist}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="healthCheckRating-label">
          Health Check Rating
        </InputLabel>
        <Select
          labelId="healthCheckRating-label"
          name="healthCheckRating"
          value={entry.healthCheckRating}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>Low Risk</MenuItem>
          <MenuItem value={2}>High Risk</MenuItem>
          <MenuItem value={3}>Critical Risk</MenuItem>
        </Select>
      </FormControl>
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

export default HealthCheckEntryForm;
