import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldAlert, 
  ExternalLink, 
  Calendar
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { TrendDataPoint, MedicalRecord } from '../types/medvault';

interface HealthTrendsProps {
  apiService: any;
  records: MedicalRecord[];
  onSelectRecord: (record: MedicalRecord) => void;
}

export const HealthTrends: React.FC<HealthTrendsProps> = ({
  apiService,
  records,
  onSelectRecord
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('hba1c');
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);

  React.useEffect(() => {
    apiService.getTrends(selectedMetric).then(setTrendData);
  }, [selectedMetric]);

  const metricTitles: Record<string, string> = {
    hba1c: 'Glycated Hemoglobin (HbA1c %)',
    glucose: 'Fasting Plasma Glucose (mg/dL)',
    cholesterol: 'Total Serum Cholesterol (mg/dL)'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Metric Selector */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Structured Metric Trends</h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Historical progression of quantitative lab values extracted from your verified stored reports.
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {[
              { id: 'hba1c', label: 'HbA1c (%)' },
              { id: 'glucose', label: 'Glucose' },
              { id: 'cholesterol', label: 'Cholesterol' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMetric(m.id)}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
                  selectedMetric === m.id
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                    : 'bg-gray-950 text-gray-400 border-gray-800 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Recorded Observation Notice:</strong> Trend visualization displays values verbatim from your uploaded lab panels over time. It does not constitute automated diagnosis.
          </span>
        </div>
      </div>

      {/* Main Recharts Line Chart Card */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            {metricTitles[selectedMetric]} Longitudinal Plot
          </h2>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 self-start sm:self-auto">
            Reference Range: {trendData[0]?.referenceRange || 'Standard Range'}
          </span>
        </div>

        {trendData.length === 0 ? (
          <div className="h-60 sm:h-72 w-full flex flex-col items-center justify-center text-center p-6 bg-gray-950/40 rounded-2xl border border-dashed border-gray-800">
            <TrendingUp className="w-8 h-8 text-emerald-400/50 mb-2" />
            <h4 className="text-sm font-bold text-gray-300">No {metricTitles[selectedMetric]} Data Yet</h4>
            <p className="text-xs text-gray-500 max-w-sm mt-1">
              Upload blood tests or diagnostic panels to track quantitative clinical values over time.
            </p>
          </div>
        ) : (
          <div className="h-60 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.75rem', fontSize: '0.75rem' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#10b981', stroke: '#111827', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#34d399' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Source Records Data Points Table */}
      <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Recorded Data Points & Linked Documents ({trendData.length})
        </h3>

        {trendData.length === 0 ? (
          <div className="p-6 rounded-2xl bg-gray-950/50 border border-dashed border-gray-800/80 text-center text-xs text-gray-500">
            No source documents contributing to this metric.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendData.map((dp, idx) => {
              const matchingRec = records.find(r => r.id === dp.sourceRecordId) || records[0];
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{dp.date}</span>
                      <span>•</span>
                      <span>{dp.hospital}</span>
                    </div>
                    <div className="text-base font-extrabold text-white mt-1">
                      {dp.value} <span className="text-xs text-gray-400 font-normal">{dp.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectRecord(matchingRec)}
                    className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/40 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Source</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
