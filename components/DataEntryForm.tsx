import React, { useState } from 'react';
import { HealthRecord } from '../types';
import { METRIC_CONFIG, METRIC_KEYS } from '../constants';

interface DataEntryFormProps {
  onAddRecord: (record: Omit<HealthRecord, 'id'>) => void;
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({ onAddRecord }) => {
  const [formData, setFormData] = useState<Partial<HealthRecord>>({
    date: new Date().toISOString().split('T')[0],
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? undefined : (name === 'date' ? value : Number(value)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.date) {
      const recordToAdd: Omit<HealthRecord, 'id'> = { date: formData.date };
      METRIC_KEYS.forEach(key => {
        // Fix: The value for a metric in formData is either a number or undefined, so it cannot be an empty string.
        // The incorrect comparison `formData[key] !== ''` has been removed.
        if (formData[key] !== undefined && formData[key] !== null) {
          recordToAdd[key] = formData[key];
        }
      });

      onAddRecord(recordToAdd);
      
      const currentDate = formData.date;
      const emptyForm: Partial<HealthRecord> = { date: currentDate };
      setFormData(emptyForm);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 sticky top-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>

        {METRIC_KEYS.map(key => {
            const config = METRIC_CONFIG[key];
            return (
                 <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-slate-700">{config.name} ({config.unit})</label>
                    <input
                        type="number"
                        step="any"
                        id={key}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        placeholder={`e.g. 120`}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                </div>
            )
        })}

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
        >
          Save Record
        </button>

        {showSuccess && (
          <div className="mt-4 text-center p-2 rounded-md bg-green-100 text-green-700 text-sm animate-pulse">
            Record saved successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default DataEntryForm;
