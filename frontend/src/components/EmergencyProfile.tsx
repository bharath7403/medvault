import React, { useState } from 'react';
import { 
  QrCode, 
  AlertOctagon, 
  Phone, 
  ExternalLink,
  Pill
} from 'lucide-react';
import type { EmergencyProfileData } from '../types/medvault';

interface EmergencyProfileProps {
  apiService: any;
}

export const EmergencyProfile: React.FC<EmergencyProfileProps> = ({ apiService }) => {
  const [profile, setProfile] = useState<EmergencyProfileData | null>(null);

  React.useEffect(() => {
    apiService.getEmergencyProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-rose-400" />
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Emergency Health Profile & Secure QR</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Exposes ONLY essential life-saving information (blood group, critical allergies, contacts) during emergency triage — never full PDFs.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20">
            Gateway QR Active
          </span>
        </div>
      </div>

      {/* Grid: QR Generator + Minimal Emergency Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* QR Code Card */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-xl border-4 border-rose-500/30">
            <img 
              src={profile.qrCodeUrl} 
              alt="Emergency Health QR Code" 
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
            />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-white">Scan for Emergency Card</div>
            <p className="text-[11px] text-gray-400">Token: {profile.publicToken}</p>
          </div>

          <a
            href={profile.qrCodeUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Gateway Link</span>
          </a>
        </div>

        {/* Minimal Emergency Profile Display */}
        <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4 sm:space-y-5">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Minimal Emergency Health Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
              <div className="text-xs text-gray-400">Blood Group</div>
              <div className="text-lg font-black text-rose-400 mt-1">{profile.bloodGroup}</div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
              <div className="text-xs text-gray-400">Date of Birth</div>
              <div className="text-sm font-bold text-white mt-1">{profile.dateOfBirth}</div>
            </div>
          </div>

          {/* Critical Allergies */}
          <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
              <AlertOctagon className="w-4 h-4" />
              <span>Critical Allergies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.allergies.map((allergy, idx) => (
                <span key={idx} className="text-xs font-bold px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {allergy}
                </span>
              ))}
            </div>
          </div>

          {/* Critical Medications */}
          <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
            <div className="text-xs font-bold text-indigo-400 flex items-center space-x-1.5">
              <Pill className="w-4 h-4" />
              <span>Critical Daily Medications</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.criticalMedications.map((med, idx) => (
                <span key={idx} className="text-xs font-medium px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {med}
                </span>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
              <Phone className="w-4 h-4" />
              <span>Primary Emergency Contacts</span>
            </div>
            <div className="space-y-2">
              {profile.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">{contact.name}</span>
                    <span className="text-gray-400 ml-2">({contact.relation})</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">{contact.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
