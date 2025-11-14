import React from 'react';
import { HealthMetric } from './types';
import { BloodDropIcon, CholesterolIcon, KidneyIcon, PercentageIcon, PIcon } from './components/icons/MetricIcons';

// Define colors for value ranges
export const RANGE_COLORS = {
  normal: 'text-green-600',
  borderline: 'text-amber-600',
  high: 'text-red-600',
  default: 'text-slate-600',
};

interface MetricConfig {
  name: string;
  unit: string;
  color: string;
  icon: React.ReactNode;
  ranges: {
    normal: (value: number) => boolean;
    borderline?: (value: number) => boolean;
    high: (value: number) => boolean;
  };
}

export const METRIC_CONFIG: { 
    [key in HealthMetric]: MetricConfig 
} = {
  fs: { 
    name: 'Fasting Blood Sugar', 
    unit: 'mg/dL', 
    color: '#3b82f6', 
    icon: <BloodDropIcon className="w-5 h-5" />,
    ranges: {
        normal: v => v < 100,
        borderline: v => v >= 100 && v <= 125,
        high: v => v > 125,
    }
  },
  ppbs: { 
    name: 'Postprandial BS', 
    unit: 'mg/dL', 
    color: '#10b981', 
    icon: <BloodDropIcon className="w-5 h-5" />,
    ranges: {
        normal: v => v < 140,
        borderline: v => v >= 140 && v <= 199,
        high: v => v > 199,
    }
  },
  cholesterol: { 
    name: 'Total Cholesterol', 
    unit: 'mg/dL', 
    color: '#ef4444', 
    icon: <CholesterolIcon className="w-5 h-5" />,
    ranges: {
        normal: v => v < 200,
        borderline: v => v >= 200 && v < 240,
        high: v => v >= 240,
    }
  },
  hba1c: { 
    name: 'HBA1c', 
    unit: '%', 
    color: '#f97316', 
    icon: <PercentageIcon className="w-5 h-5" />,
    ranges: {
        normal: v => v < 5.7,
        borderline: v => v >= 5.7 && v <= 6.4,
        high: v => v > 6.4,
    }
  },
  creatinine: { 
    name: 'Creatinine', 
    unit: 'mg/dL', 
    color: '#8b5cf6', 
    icon: <KidneyIcon className="w-5 h-5" />,
    ranges: {
        normal: v => v >= 0.6 && v <= 1.2,
        high: v => v < 0.6 || v > 1.2,
    }
  },
  psa: { 
    name: 'PSA', 
    unit: 'ng/mL', 
    color: '#64748b', 
    icon: <PIcon className="w-5 h-5" />,
    ranges: {
        normal: v => v < 4.0,
        high: v => v >= 4.0,
    }
  },
};

export const METRIC_KEYS = Object.keys(METRIC_CONFIG) as HealthMetric[];

export const getValueColorClass = (metric: HealthMetric, value?: number): string => {
    if (value === undefined || value === null) {
        return RANGE_COLORS.default;
    }
    const { ranges } = METRIC_CONFIG[metric];

    if (ranges.high(value)) return RANGE_COLORS.high;
    if (ranges.borderline && ranges.borderline(value)) return RANGE_COLORS.borderline;
    if (ranges.normal(value)) return RANGE_COLORS.normal;
    
    return RANGE_COLORS.default;
};