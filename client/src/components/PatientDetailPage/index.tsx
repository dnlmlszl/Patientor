import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EntryData, Patient } from '../../types';
import { apiBaseUrl } from '../../constants';
import axios from 'axios';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import PatientEntryDetail from './PatientEntryDetail';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [entryType, setEntryType] = useState('Hospital');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        setPatient(patientData);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatient();
  }, [id]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEntryTypeChange = (type: string) => {
    setEntryType(type);
    openModal();
  };

  const handleEntrySubmit = async (entryData: EntryData) => {
    console.log(entryData);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/patients/${id}/diagnoses`,
        entryData
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting entry: ', error);
    } finally {
      closeModal();
    }
  };

  const renderEntryForm = () => {
    switch (entryType) {
      case 'Hospital':
        return {
          form: <HospitalEntryForm onSubmit={handleEntrySubmit} />,
          title: 'Add Hospital Entry',
        };
      case 'OccupationalHealthcare':
        return {
          form: (
            <OccupationalHealthcareEntryForm onSubmit={handleEntrySubmit} />
          ),
          title: 'Add Occupational Healthcare Entry',
        };
      case 'HealthCheck':
        return {
          form: <HealthCheckEntryForm onSubmit={handleEntrySubmit} />,
          title: 'Add Health Check Entry',
        };
      default:
        return {
          form: <div>Invalid entry type</div>,
          title: 'Invalid Entry Type',
        };
    }
  };

  const { form, title } = renderEntryForm();

  if (!patient) return <div>Loading...</div>;

  return (
    <Card variant="outlined" style={{ marginTop: '2rem' }}>
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'center',
          maxWidth: '876px',
          width: 'max-content%',
          background: '#f9f9f9',
        }}
      >
        <Typography variant="h5" component="h2">
          {patient.name}{' '}
          {patient.gender === 'male' ? (
            <MaleIcon />
          ) : patient.gender === 'female' ? (
            <FemaleIcon />
          ) : (
            <Diversity2Icon />
          )}
        </Typography>
        <Typography color="textSecondary">
          DOB: {patient.dateOfBirth}
        </Typography>
        <Typography color="textSecondary">SSN: {patient.ssn}</Typography>
        <Typography color="textSecondary">
          Occupation: {patient.occupation}
        </Typography>
        <Typography variant="body2" component="div">
          <List>
            <div>
              <Typography
                variant="h5"
                component="h3"
                style={{ marginBottom: '1rem' }}
              >
                Entries:
              </Typography>
              <Divider />
            </div>
            {patient.entries &&
              patient.entries.map((entry, index) => (
                <ListItem key={index}>
                  <PatientEntryDetail entry={entry} />
                </ListItem>
              ))}
          </List>
        </Typography>
      </CardContent>

      <ButtonGroup
        variant="contained"
        color="primary"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '2rem 0',
          background: '#f9f9f9',
          gap: '2rem',
        }}
      >
        <Button onClick={() => handleEntryTypeChange('Hospital')}>
          Add Hospital Entry
        </Button>
        <Button onClick={() => handleEntryTypeChange('OccupationalHealthcare')}>
          Add Occupational Healthcare Entry
        </Button>
        <Button onClick={() => handleEntryTypeChange('HealthCheck')}>
          Add Health Check Entry
        </Button>
      </ButtonGroup>

      <Dialog fullWidth={true} open={modalOpen} onClose={closeModal}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{form}</DialogContent>
      </Dialog>
    </Card>
  );
};

export default PatientDetailPage;
