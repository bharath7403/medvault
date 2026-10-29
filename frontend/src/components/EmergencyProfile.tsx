import React, { useState } from 'react';
import { 
  QrCode, 
  AlertOctagon, 
  Phone, 
  Pill,
  ShieldCheck,
  Copy,
  Check,
  Eye,
  Heart
} from 'lucide-react';
import type { EmergencyProfileData } from '../types/medvault';
import { EmergencyCardView } from './EmergencyCardView';

interface EmergencyProfileProps {
  apiService: any;
}

export const EmergencyProfile: React.FC<EmergencyProfileProps> = ({ apiService }) => {
  const [profile, setProfile] = useState<EmergencyProfileData | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  React.useEffect(() => {
    apiService.getEmergencyProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  const baseOrigin = typeof window !== 'undefined' && window.location.origin 
    ? window.location.origin 
    : 'https://medvault.vercel.app';

  const emgUrl = `${baseOrigin}/?emg=${encodeURIComponent(profile.patientId)}&name=${encodeURIComponent(profile.fullName)}&bg=${encodeURIComponent(profile.bloodGroup)}&dob=${encodeURIComponent(profile.dateOfBirth)}&phone=${encodeURIComponent(profile.emergencyContacts[0]?.phone || '')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(emgUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (showPreviewModal) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95">
        <EmergencyCardView
          healthId={profile.patientId}
          name={profile.fullName}
          bloodGroup={profile.bloodGroup}
          dob={profile.dateOfBirth}
          phone={profile.emergencyContacts[0]?.phone}
          onExit={() => setShowPreviewModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-rose-400" />
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Emergency Health Profile & Universal QR</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Scanning this QR on any phone camera opens your verified Patient ID, Blood Group, and Emergency Contacts instantly.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency QR Active</span>
          </span>
        </div>
      </div>

      {/* Grid: QR Generator + Minimal Emergency Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* QR Code Card */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Scannable Health ID</div>
            <div className="text-base font-black text-rose-400 font-mono tracking-wider">{profile.patientId}</div>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-xl border-4 border-rose-500/30">
            <img 
              src={profile.qrCodeUrl} 
              alt="Emergency Health QR Code" 
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
            />
          </div>

          <div className="space-y-1 max-w-xs">
            <div className="text-xs font-bold text-white">Scan with Any Mobile Camera</div>
            <p className="text-[11px] text-gray-400 leading-snug">
              Point your smartphone camera at this code to view the live verified Emergency ID card.
            </p>
          </div>

          <div className="w-full space-y-2 pt-1">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center space-x-2"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Scanned ID Card</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white font-semibold text-xs border border-gray-800 transition-colors flex items-center justify-center space-x-1.5"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied QR Web Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Copy Scanned URL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Minimal Emergency Profile Display */}
        <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Emergency Profile Card Parameters
            </h2>
            <span className="text-[11px] font-mono text-gray-400">ID: {profile.patientId}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800">
              <div className="text-xs text-gray-400">Patient Full Name</div>
              <div className="text-base font-extrabold text-white mt-1">{profile.fullName}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Permanent Health ID: {profile.patientId}</div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-950 border border-rose-500/20 flex items-center justify-between">
              <div>
                <div className="text-xs text-rose-300 font-semibold">Blood Group</div>
                <div className="text-xl font-black text-rose-400 mt-1">{profile.bloodGroup}</div>
              </div>
              <Heart className="w-6 h-6 text-rose-500/30 fill-rose-500/20" />
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
              <span>Primary Emergency Contacts (Scannable Speed-Dial)</span>
            </div>
            <div className="space-y-2">
              {profile.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                  <div>
                    <span className="font-bold text-white">{contact.name}</span>
                    <span className="text-gray-400 ml-2">({contact.relation})</span>
                  </div>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="font-mono text-emerald-400 font-bold hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
