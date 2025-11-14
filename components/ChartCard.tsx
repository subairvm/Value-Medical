
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HealthMetric, HealthRecord } from '../types';
import { METRIC_CONFIG } from '../constants';

interface ChartCardProps {
  metric: HealthMetric;
  records: HealthRecord[];
}

const ChartCard: React.FC<ChartCardProps> = ({ metric, records }) => {
  const config = METRIC_CONFIG[metric];

  // Prepare data for the chart: filter out records without a value for the current metric
  // and format the date for better readability. Also, reverse for chronological order.
  const chartData = records
    .filter(record => record[metric] !== undefined && record[metric] !== null)
    .map(record => ({
      ...record,
      date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })).reverse();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-1.5 rounded-full" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
            {config.icon}
        </div>
        <h3 className="text-md font-semibold text-slate-700">{config.name} Trend</h3>
      </div>
      {chartData.length > 1 ? (
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend wrapperStyle={{fontSize: "14px"}} />
              <Line
                type="monotone"
                dataKey={metric}
                name={config.name}
                stroke={config.color}
                strokeWidth={2}
                dot={{ r: 4, fill: config.color }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
         <div className="h-[250px] flex items-center justify-center text-slate-500">
            <p>Not enough data to display trend. At least two records are needed.</p>
         </div>
      )}
    </div>
  );
};

export default ChartCard;
