import { Divider, ListItem, Typography, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles(() => ({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1.5rem',
    width: '100%',
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '1.1rem',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  innerListItem: {
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: '0.25rem',
  },
}));

const PatientEntryDetail: React.FC<PatientEntryDetailProps> = ({ entry }) => {
  const [diagnosisEntry, setDiagnosisEntry] = useState<DiagnosisEntry[]>([]);

  const classes = useStyles();

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
      <ListItem className={classes.listContainer}>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.title}
        >
          Type:
        </Typography>
        <Typography color="textSecondary" className={classes.text}>
          {entry.type}
        </Typography>
      </ListItem>
      <ListItem className={classes.listContainer}>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.title}
        >
          Date:
        </Typography>
        <Typography color="textSecondary" className={classes.text}>
          {entry.date}
        </Typography>
      </ListItem>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ListItem className={classes.listContainer}>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            className={classes.title}
          >
            Diagnosis Codes:
          </Typography>
          <List style={{ width: '100%', marginTop: 0, paddingTop: 0 }}>
            {diagnosisEntry.map((diagnosis, index) => (
              <ListItem key={index} className={classes.innerListItem}>
                <Typography color="textSecondary" className={classes.text}>
                  {diagnosis.code}: {diagnosis.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </ListItem>
      )}
      <ListItem className={classes.listContainer}>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.title}
        >
          Specialist:
        </Typography>
        <Typography color="textSecondary" className={classes.text}>
          {entry.specialist}
        </Typography>
      </ListItem>
      {entry.healthCheckRating !== undefined && (
        <ListItem className={classes.listContainer}>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            className={classes.title}
          >
            Health Check Rating:
          </Typography>
          <Typography color="textSecondary" className={classes.text}>
            {entry.healthCheckRating} -{' '}
            {getHealthCheckRatingDescription(entry.healthCheckRating)}
          </Typography>
        </ListItem>
      )}
      <ListItem className={classes.listContainer}>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          className={classes.title}
        >
          Description:
        </Typography>
        <Typography color="textSecondary" className={classes.text}>
          {entry.description}
        </Typography>
      </ListItem>
      {entry.sickLeave && (
        <ListItem className={classes.listContainer}>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            className={classes.title}
          >
            Sick leave:
          </Typography>
          <Typography color="textSecondary" className={classes.text}>
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
