import { Divider, ListItem, Typography } from '@material-ui/core';
import { Diagnosis, SickLeave } from '../../types';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../constants';
import axios from 'axios';
import { List } from '@mui/material';

type PatientEntryDetailProps = {
  entry: {
    description: string;
    type: string;
    date: string;
    specialist: string;
    healthCheckRating: number;
    diagnosisCodes: string[];
    sickLeave?: SickLeave;
    diagnosis?: {
      code: string;
      name: string;
    };
  };
};

type DiagnosisEntry = {
  code: string;
  name: string;
};

const PatientEntryDetail: React.FC<PatientEntryDetailProps> = ({ entry }) => {
  const [diagnosisEntry, setDiagnosisEntry] = useState<DiagnosisEntry[]>([]);

  const getHealthCheckRatingDescription = (rating: number) => {
    switch (rating) {
      case 0:
        return 'No health issues';
      case 1:
        return 'Minor health issues';
      case 2:
        return 'Moderate health issues';
      // További értékek és leírások...
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    const getDiagnosis = async () => {
      try {
        if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0) {
          setDiagnosisEntry([]);
          return;
        }
        const response = await axios.get(`${apiBaseUrl}/diagnoses`);
        if (response.status === 200) {
          const data = response.data;

          if (Array.isArray(data)) {
            const diagnosisEntries = entry.diagnosisCodes.map((code) => {
              const diagnosis = data.find((d: Diagnosis) => d.code === code);

              return diagnosis
                ? diagnosis
                : { code, name: 'Unknown diagnosis' };
            });

            setDiagnosisEntry(diagnosisEntries);
          } else {
            console.error('Diagnosis data is not an array');
          }
        } else {
          console.error('Failed to fetch diagnosis names');
        }
      } catch (error) {
        console.error('Error fetching diagnosis names:', error);
      }
    };

    getDiagnosis();
  }, [entry.diagnosisCodes]);

  return (
    <section>
      <ListItem
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="body2" component="p">
          Type:
        </Typography>
        <Typography color="textSecondary">{entry.type}</Typography>
      </ListItem>
      <ListItem
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="body2" component="p">
          Date:
        </Typography>
        <Typography color="textSecondary">{entry.date}</Typography>
      </ListItem>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
        <ListItem
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'start',
            justifyContent: 'flex-start',
          }}
        >
          <Typography
            variant="body2"
            component="p"
            style={{ paddingTop: '0.5rem' }}
          >
            Diagnosis Codes:
          </Typography>
          <List style={{ width: '100%' }}>
            {diagnosisEntry.map((diagnosis, index) => (
              <ListItem
                key={index}
                style={{ padding: 0, marginBottom: '0.25rem' }}
              >
                <Typography color="textSecondary">
                  {diagnosis.code}: {diagnosis.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ) : (
        <ListItem
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="body2" component="p">
            Diagnosis Codes:
          </Typography>
          <Typography color="textSecondary">No data available</Typography>
        </ListItem>
      )}
      <ListItem
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="body2" component="p">
          Specialist:
        </Typography>
        <Typography color="textSecondary">{entry.specialist}</Typography>
      </ListItem>
      {entry.healthCheckRating !== undefined && (
        <ListItem
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="body2" component="p">
            Health Check Rating:
          </Typography>
          <Typography color="textSecondary">
            {entry.healthCheckRating} -{' '}
            {getHealthCheckRatingDescription(entry.healthCheckRating)}
          </Typography>
        </ListItem>
      )}
      <ListItem
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="body2" component="p">
          Description:
        </Typography>
        <Typography color="textSecondary">{entry.description}</Typography>
      </ListItem>
      {entry.sickLeave && (
        <ListItem
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="body2" component="p">
            Sick leave:
          </Typography>
          <Typography color="textSecondary">
            Start date: {entry.sickLeave.startDate} - End date:{' '}
            {entry.sickLeave.endDate}
          </Typography>
        </ListItem>
      )}
      <Divider />
    </section>
  );
};

export default PatientEntryDetail;
