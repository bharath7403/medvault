import React, { useState } from 'react';
import { 
  Share2, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  Plus, 
  X, 
  Copy,
  Check
} from 'lucide-react';
import type { SharingSession, DocumentCategory } from '../types/medvault';

interface SelectiveSharingProps {
  shares: SharingSession[];
  onShareCreated: (newShare: SharingSession) => void;
  onRevokeShare: (shareId: string) => void;
  apiService: any;
}

export const SelectiveSharing: React.FC<SelectiveSharingProps> = ({
  shares,
  onShareCreated,
  onRevokeShare,
  apiService
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('Dr. Ananya Rao');
  const [recipientEmail] = useState('ananya.rao@apexheart.org');
  const [purpose, setPurpose] = useState('Cardiology Consultation Second Opinion');
  const [selectedCategories, setSelectedCategories] = useState<DocumentCategory[]>([
    'LAB_REPORT', 'PRESCRIPTION', 'IMAGING_REPORT'
  ]);
  const [durationHours, setDurationHours] = useState<number>(24);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);

  const toggleCategory = (cat: DocumentCategory) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleCreateShare = async () => {
    if (!recipientName || selectedCategories.length === 0) return;

    const newShare = await apiService.createSharingSession(
      recipientName,
      recipientEmail,
      purpose,
      selectedCategories,
      durationHours
    );

    onShareCreated(newShare);
    setIsModalOpen(false);
  };

  const handleCopyToken = (token: string, id: string) => {
    navigator.clipboard.writeText(`https://medvault.health/share/${token}`);
    setCopiedTokenId(id);
    setTimeout(() => setCopiedTokenId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Selective Health Record Sharing</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Grant temporary, granular access to specific medical document categories with instant revocation control.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Doctor Access Token</span>
        </button>
      </div>

      {/* Sharing Sessions Table / Cards */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Active & Historical Sharing Sessions ({shares.length})
        </h2>

        <div className="space-y-3">
          {shares.map((session) => {
            const isActive = session.status === 'ACTIVE';
            return (
              <div 
                key={session.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isActive 
                    ? 'bg-gray-900/80 border-gray-800' 
                    : 'bg-gray-950/60 border-gray-900 opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-white">{session.recipientName}</span>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Purpose: {session.purpose} • Created: {session.createdAt}
                  </p>
                  
                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {session.categoriesAllowed.map((cat, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-mono"
                      >
                        {cat.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800 shrink-0">
                  {isActive && (
                    <>
                      <button
                        onClick={() => handleCopyToken(session.accessToken, session.id)}
                        className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition-colors"
                      >
                        {copiedTokenId === session.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied Link!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                            <span>Copy Access Link</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onRevokeShare(session.id)}
                        className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Revoke Access</span>
                      </button>
                    </>
                  )}
                  {!isActive && (
                    <span className="text-xs text-rose-400 font-semibold italic">
                      Session Terminated
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Share Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl space-y-4 sm:space-y-5 p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 sm:pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                <h3 className="text-sm font-bold text-white">Create Secure Sharing Session</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-white bg-gray-900 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Recipient Name / Doctor</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Consultation Purpose</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category Checkboxes */}
              <div>
                <label className="block text-gray-400 mb-2 font-semibold">Permitted Record Categories</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { cat: 'LAB_REPORT', label: 'Lab Panels' },
                    { cat: 'PRESCRIPTION', label: 'Prescriptions' },
                    { cat: 'IMAGING_REPORT', label: 'Radiology / MRI' },
                    { cat: 'DISCHARGE_SUMMARY', label: 'Discharge Summaries' }
                  ].map(({ cat, label }) => {
                    const isChecked = selectedCategories.includes(cat as DocumentCategory);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => toggleCategory(cat as DocumentCategory)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                            : 'bg-gray-900 border-gray-800 text-gray-400'
                        }`}
                      >
                        <span>{label}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expiration Duration Selector */}
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Access Duration</label>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {[1, 6, 24, 72, 168].map((h) => (
                    <button
                      type="button"
                      key={h}
                      onClick={() => setDurationHours(h)}
                      className={`py-2 rounded-xl border text-center font-bold text-xs transition-all ${
                        durationHours === h
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-gray-900 text-gray-400 border-gray-800'
                      }`}
                    >
                      {h < 24 ? `${h}h` : `${h / 24}d`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateShare}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all"
            >
              Generate Authorized Token Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
