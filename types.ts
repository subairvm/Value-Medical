
export type HealthMetric = 'fs' | 'ppbs' | 'cholesterol' | 'hba1c' | 'creatinine' | 'psa';

export interface HealthRecord {
  id: string;
  date: string; // YYYY-MM-DD
  fs?: number;
  ppbs?: number;
  cholesterol?: number;
  hba1c?: number;
  creatinine?: number;
  psa?: number;
}
