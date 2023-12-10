// DiagnosesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

interface DiagnosesContextValue {
  diagnoses: Diagnosis[];
}

const DiagnosesContext = createContext<DiagnosesContextValue>({
  diagnoses: [] as Diagnosis[],
});

export const useDiagnoses = () => useContext(DiagnosesContext);

interface DiagnosesProviderProps {
  children: React.ReactNode;
}

export const DiagnosesProvider = ({ children }: DiagnosesProviderProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnoses(diagnosesFromApi);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiagnoses();
  }, []);

  return (
    <DiagnosesContext.Provider value={{ diagnoses }}>
      {children}
    </DiagnosesContext.Provider>
  );
};
