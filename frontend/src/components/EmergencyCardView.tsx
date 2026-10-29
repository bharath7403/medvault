import React from 'react';
import { 
  ShieldAlert, 
  Phone, 
  AlertOctagon, 
  Pill, 
  Heart, 
  ArrowLeft, 
  CheckCircle2, 
  QrCode,
  ExternalLink
} from 'lucide-react';

interface EmergencyCardViewProps {
  healthId: string;
  name?: string;
  bloodGroup?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  onExit: () => void;
  onOpenDoctorPortal?: () => void;
}

export const EmergencyCardView: React.FC<EmergencyCardViewProps> = ({
  healthId,
  name = 'Verified Patient',
  bloodGroup = 'O Positive (O+)',
  dob = '2000-01-01',
  gender = 'Male',
  phone = '+91 98450 12345',
  onExit,
  onOpenDoctorPortal
}) => {
  const isDemo = healthId.includes('DEMO') || name.toLowerCase().includes('bharath');
  const allergies = isDemo ? ['Dust Allergy', 'No Drug Allergies (NKDA)'] : ['No Known Drug Allergies'];
  const medications = isDemo ? ['Vitamin C 500mg Chewable'] : ['No Critical Medications Listed'];

  return (
    <div className="min-h-screen bg-[#070b12] text-gray-100 flex flex-col justify-between p-3 sm:p-6 selection:bg-rose-500 selection:text-white">
      {/* Top Emergency Header Bar */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-4 border-b border-rose-500/30">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              Emergency Responder Mode
            </span>
            <h1 className="text-sm sm:text-base font-extrabold text-white">MedVault Universal Emergency Health ID</h1>
          </div>
        </div>

        <button
          onClick={onExit}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Enter Portal</span>
        </button>
      </div>

      {/* Main Emergency Patient Card */}
      <div className="max-w-2xl mx-auto w-full my-auto py-6 space-y-5">
        <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-gray-900/90 to-gray-950 border-2 border-rose-500/40 shadow-2xl shadow-rose-950/40 relative overflow-hidden space-y-6">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top: Health ID Badge & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-800 gap-3">
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Permanent Digital Health ID
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight text-rose-400 mt-0.5 flex items-center space-x-2">
                <span>{healthId}</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 inline" />
              </div>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Verified Patient Record</span>
              </span>
            </div>
          </div>

          {/* Patient Primary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800/80 space-y-1">
              <span className="text-[11px] font-medium text-gray-400">Full Legal Name</span>
              <div className="text-lg font-extrabold text-white">{name}</div>
              <div className="text-xs text-gray-500">{gender} • Born {dob}</div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">Blood Group</span>
                <div className="text-2xl font-black text-rose-400 mt-0.5">{bloodGroup}</div>
              </div>
              <Heart className="w-8 h-8 text-rose-500/40 fill-rose-500/20" />
            </div>
          </div>

          {/* Primary Emergency Contact with One-Tap Dial */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5 uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Emergency Contact Verified</span>
              </span>
              <span className="text-[11px] text-gray-400">Direct Triage Dial</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-white">Family / Emergency Guardian</div>
                <div className="text-xs font-mono text-gray-300 mt-0.5">{phone}</div>
              </div>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Emergency Contact</span>
              </a>
            </div>
          </div>

          {/* Clinical Alerts: Allergies & Medications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Allergies */}
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800/80 space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                <AlertOctagon className="w-4 h-4" />
                <span>Known Allergies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allergies.map((a, i) => (
                  <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Critical Daily Meds */}
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800/80 space-y-2">
              <div className="text-xs font-bold text-indigo-400 flex items-center space-x-1.5">
                <Pill className="w-4 h-4" />
                <span>Active Daily Medications</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {medications.map((m, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Doctor / Provider Access Action */}
          <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-gray-500 flex items-center space-x-1.5 text-center sm:text-left">
              <QrCode className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>Scanned via MedVault Cryptographic QR Gateway</span>
            </span>

            {onOpenDoctorPortal && (
              <button
                onClick={onOpenDoctorPortal}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/20 transition-colors"
              >
                <span>Healthcare Provider Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto w-full pt-4 text-center border-t border-gray-900 text-[11px] text-gray-500">
        MedVault Personal Health Record System • Confidential Emergency Access Protocol
      </div>
    </div>
  );
};
