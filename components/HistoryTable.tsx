import React from 'react';
import { HealthRecord } from '../types';
import { METRIC_CONFIG, METRIC_KEYS, getValueColorClass } from '../constants';
import { TrashIcon } from './icons/MetricIcons';

interface HistoryTableProps {
  records: HealthRecord[];
  deleteRecord: (id: string) => void;
  isPrintView?: boolean;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ records, deleteRecord, isPrintView = false }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-200 ${isPrintView ? '' : 'p-6'}`}>
      <div className={`flex justify-between items-center mb-4 ${isPrintView ? 'hidden' : ''}`}>
        <h2 className="text-xl font-bold text-slate-800">Data History</h2>
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Print Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-10">Date</th>
              {METRIC_KEYS.map(key => (
                <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {METRIC_CONFIG[key].name}
                </th>
              ))}
               {!isPrintView && <th scope="col" className="relative px-6 py-3"><span className="sr-only">Delete</span></th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {records.map(record => (
              <tr key={record.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 sticky left-0 bg-white hover:bg-slate-50 z-10">
                  {new Date(record.date).toLocaleDateString('en-GB')}
                </td>
                {METRIC_KEYS.map(key => {
                    const value = record[key];
                    const colorClass = getValueColorClass(key, value);
                    return (
                        <td key={key} className="px-6 py-4 whitespace-nowrap text-sm">
                            {value !== undefined ? (
                                <span className={`font-semibold ${colorClass}`}>{value}</span>
                            ) : (
                                <span className="text-slate-400">N/A</span>
                            )}
                        </td>
                    )
                })}
                {!isPrintView && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => deleteRecord(record.id)} className="text-red-500 hover:text-red-700 transition-colors">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 && (
            <div className="text-center py-10 text-slate-500">
                <p>No records found. Add a new record to get started.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;