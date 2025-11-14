import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataEntryForm from './components/DataEntryForm';
import HistoryTable from './components/HistoryTable';
import { useHealthData } from './hooks/useHealthData';

type View = 'dashboard' | 'history';

const App: React.FC = () => {
  const { records, addRecord, deleteRecord } = useHealthData();
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 no-print">
            <DataEntryForm onAddRecord={addRecord} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 no-print">
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className={`${
                      activeView === 'dashboard'
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveView('history')}
                    className={`${
                      activeView === 'history'
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                  >
                    History & Reports
                  </button>
                </nav>
              </div>
            </div>
            
            <div className="mt-6">
                <div className={activeView === 'dashboard' ? 'block' : 'hidden'}>
                    <Dashboard records={records} />
                </div>
                <div className={activeView === 'history' ? 'block' : 'hidden'}>
                     <HistoryTable records={records} deleteRecord={deleteRecord} />
                </div>
            </div>
          </div>
        </div>
      </main>
      <div className="hidden print-container">
        <h1 className="text-2xl font-bold mb-4 text-center">Health Report</h1>
        <HistoryTable records={records} deleteRecord={deleteRecord} isPrintView={true} />
      </div>
    </div>
  );
};

export default App;