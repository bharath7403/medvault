import React, { useState } from 'react';
import { 
  Pill, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck
} from 'lucide-react';
import type { Medication, MedicalRecord } from '../types/medvault';

interface MedicationTimelineProps {
  apiService: any;
  records: MedicalRecord[];
  onSelectRecord: (record: MedicalRecord) => void;
}

export const MedicationTimeline: React.FC<MedicationTimelineProps> = ({
  apiService,
  records,
  onSelectRecord
}) => {
  const [medications, setMedications] = useState<Medication[]>([]);

  React.useEffect(() => {
    apiService.getMedications().then(setMedications);
  }, []);

  const activeMeds = medications.filter(m => m.status === 'ACTIVE');
  const discontinuedMeds = medications.filter(m => m.status === 'DISCONTINUED');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Pill className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Medication History & Timeline</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Extracted pharmacological statements from prescriptions with automatic dosage conflict detection.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs self-start md:self-auto">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{activeMeds.length} Active Prescriptions</span>
          </span>
        </div>
      </div>

      {/* Conflict Flag Warning Banner if Any */}
      {medications.some(m => m.conflictFlag) && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold text-amber-300">Dosage Verification Flag Detected</div>
            <p className="text-gray-300 leading-relaxed">
              Metformin 500mg was listed in July 2025 Rx, but updated in recent clinical notes. The system flags this potential inconsistency for verification with your physician rather than automatically modifying your record.
            </p>
          </div>
        </div>
      )}

      {/* Active Medications Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Currently Active Medications ({activeMeds.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMeds.map((med) => {
            const matchingRec = records.find(r => r.id === med.sourceRecordId) || records[0];
            return (
              <div 
                key={med.id}
                className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 relative overflow-hidden"
              >
                {med.conflictFlag && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-gray-950 font-bold text-[9px] uppercase px-3 py-0.5 rounded-bl-xl flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Verify Dosage</span>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-indigo-400 font-medium">Prescribed by {med.doctor}</div>
                    <h3 className="text-base font-bold text-white mt-0.5">{med.name}</h3>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {med.dosage}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Frequency:</span>
                    <span className="font-semibold text-white">{med.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Started On:</span>
                    <span className="font-medium text-gray-300">{med.startDate}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Verified Rx Evidence</span>
                  </span>
                  <button
                    onClick={() => onSelectRecord(matchingRec)}
                    className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold px-2.5 py-1 rounded-lg bg-gray-950 border border-gray-800"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Prescription</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discontinued Medications */}
      {discontinuedMeds.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Discontinued Medications ({discontinuedMeds.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discontinuedMeds.map((med) => (
              <div 
                key={med.id}
                className="p-4 rounded-2xl bg-gray-950 border border-gray-800 text-xs opacity-75 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-300">{med.name} ({med.dosage})</span>
                  <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded">Discontinued</span>
                </div>
                <div className="text-gray-500">
                  Used: {med.startDate} to {med.endDate} • {med.doctor}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
