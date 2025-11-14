
import { useState, useEffect, useCallback } from 'react';
import { HealthRecord } from '../types';

export const useHealthData = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('healthData');
      if (storedData) {
        const parsedData: HealthRecord[] = JSON.parse(storedData);
        // Sort by date descending
        parsedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecords(parsedData);
      }
    } catch (error) {
      console.error("Failed to load health data from localStorage", error);
    }
  }, []);

  const saveData = (data: HealthRecord[]) => {
    try {
      // Sort by date descending before saving
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const dataString = JSON.stringify(data);
      localStorage.setItem('healthData', dataString);
      setRecords(data);
    } catch (error) {
      console.error("Failed to save health data to localStorage", error);
    }
  };

  const addRecord = useCallback((newRecord: Omit<HealthRecord, 'id'>) => {
    setRecords(prevRecords => {
      const recordWithId = { ...newRecord, id: new Date().toISOString() };
      const updatedRecords = [recordWithId, ...prevRecords];
      saveData(updatedRecords);
      return updatedRecords;
    });
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords(prevRecords => {
        const updatedRecords = prevRecords.filter(record => record.id !== id);
        saveData(updatedRecords);
        return updatedRecords;
    });
  }, []);

  return { records, addRecord, deleteRecord };
};
