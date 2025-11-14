import { useState, useEffect, useCallback } from 'react';
import { HealthRecord } from '../types';
import { db } from '../firebase';
import { 
    collection, 
    query, 
    where, 
    onSnapshot, 
    addDoc, 
    deleteDoc, 
    doc, 
    orderBy, 
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

export const useHealthData = (userId?: string) => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) {
      setRecords([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const recordsCol = collection(db, 'healthRecords');
    const q = query(recordsCol, where('userId', '==', userId), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRecords: HealthRecord[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedRecords.push({ 
          id: doc.id,
          date: (data.date as Timestamp).toDate().toISOString().split('T')[0],
          fs: data.fs,
          ppbs: data.ppbs,
          cholesterol: data.cholesterol,
          hba1c: data.hba1c,
          creatinine: data.creatinine,
          psa: data.psa
        });
      });
      setRecords(fetchedRecords);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching health data from Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addRecord = useCallback(async (newRecord: Omit<HealthRecord, 'id'>) => {
    if (!userId) {
        console.error("Cannot add record without a user.");
        return;
    }
    try {
      await addDoc(collection(db, 'healthRecords'), {
        ...newRecord,
        date: new Date(newRecord.date),
        userId: userId,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }, [userId]);

  const deleteRecord = useCallback(async (id: string) => {
    if (!userId) {
        console.error("Cannot delete record without a user.");
        return;
    }
    try {
      await deleteDoc(doc(db, 'healthRecords', id));
    } catch (error)      {
      console.error("Error deleting document: ", error);
    }
  }, [userId]);

  return { records, addRecord, deleteRecord, loading };
};
