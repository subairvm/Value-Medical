import React from 'react';
import { HealthRecord, HealthMetric } from '../types';
import { METRIC_CONFIG, METRIC_KEYS, getValueColorClass } from '../constants';
import ChartCard from './ChartCard';

interface DashboardProps {
  records: HealthRecord[];
}

const StatCard: React.FC<{ metric: HealthMetric; value?: number }> = ({ metric, value }) => {
    const config = METRIC_CONFIG[metric];
    const colorClass = getValueColorClass(metric, value);
    
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
                       {config.icon}
                    </div>
                    <h3 className="text-sm font-medium text-slate-500">{config.name}</h3>
                </div>
            </div>
            {value !== undefined && value !== null ? (
                <p className={`mt-2 text-3xl font-bold ${colorClass}`}>
                    {value.toLocaleString()} <span className="text-base font-normal text-slate-500">{config.unit}</span>
                </p>
            ) : (
                <p className="mt-2 text-xl font-medium text-slate-400">No Data</p>
            )}
        </div>
    );
}

const Dashboard: React.FC<DashboardProps> = ({ records }) => {
  const latestRecord = records.length > 0 ? records[0] : null;

  return (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-700">Latest Readings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {METRIC_KEYS.map((key) => (
                <StatCard key={key} metric={key} value={latestRecord?.[key]} />
            ))}
        </div>

        <h2 className="text-xl font-bold text-slate-700 pt-4">Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {METRIC_KEYS.map((key) => (
                 <ChartCard key={key} metric={key} records={records} />
            ))}
        </div>
    </div>
  );
};

export default Dashboard;