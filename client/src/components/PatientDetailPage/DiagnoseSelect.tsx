import { useState, useEffect, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { apiBaseUrl } from '../../constants';

interface Props {
  diagnosisCodes: string[];
  setDiagnosisCodes: (codes: string[]) => void;
}

const DiagnoseSelect: React.FC<Props> = ({
  diagnosisCodes,
  setDiagnosisCodes,
}) => {
  const [availableDiagnoses, setAvailableDiagnoses] = useState<
    { code: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get(`${apiBaseUrl}/diagnoses`);
        setAvailableDiagnoses(diagnoses);
      } catch (e) {
        console.error(e);
      }
    };

    fetchDiagnoses();
  }, []);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Diagnosis Codes</InputLabel>
      <Select multiple value={diagnosisCodes} onChange={handleChange}>
        {availableDiagnoses.map((diagnosis) => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnoseSelect;
