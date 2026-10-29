import React, { useState } from 'react';
import { ShieldCheck, Search, FileText, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface DoctorPortalProps {
  apiService: any;
  onBackToApp: () => void;
}

export const DoctorPortal: React.FC<DoctorPortalProps> = ({ apiService, onBackToApp }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setSessionData(null);

    const cleanToken = tokenInput.trim();
    const result = await apiService.getSharedAccessData(cleanToken);

    setLoading(false);
    if (result.valid) {
      setSessionData(result);
    } else {
      setErrorMsg(result.message || 'Access token invalid or expired.');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/20">
              Provider Portal
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-white mt-1">Doctor & Healthcare Consultation Gateway</h1>
          <p className="text-xs text-gray-400">Verify temporary patient consent tokens to view authorized medical records</p>
        </div>
        <button
          onClick={onBackToApp}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold rounded-xl border border-gray-700 self-start sm:self-auto"
        >
          Exit Doctor View
        </button>
      </div>

      {/* Token Verification Form */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/40 border border-gray-800 max-w-xl mx-auto space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Enter Patient Consent Token</span>
        </h2>
        <form onSubmit={handleVerifyToken} className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="e.g. mv_tok_xxxxxxxxxxxx"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <span>Verifying Consent Token...</span> : <span>Unlock Authorized Records</span>}
          </button>
        </form>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Render Authorized Records if Token Valid */}
      {sessionData && (
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/40 border border-teal-500/40 space-y-5 sm:space-y-6 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">Consent Verified</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">Authorized to: {sessionData.session?.recipientName}</h3>
              <p className="text-xs text-gray-400">Purpose: {sessionData.session?.purpose}</p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>Expires: {sessionData.session?.expiresAt}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">
              Permitted Documents ({sessionData.documents?.length || 0})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionData.documents?.map((doc: any) => (
                <div key={doc.id} className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-800 text-teal-300">
                      {doc.category}
                    </span>
                    <span className="text-xs text-gray-500">{doc.documentDate}</span>
                  </div>
                  <div className="text-sm font-bold text-white flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-teal-400" />
                    <span>{doc.fileName}</span>
                  </div>
                  <p className="text-xs text-gray-400">{doc.hospital} • {doc.doctor}</p>
                  <p className="text-xs text-gray-300 bg-gray-900 p-2.5 rounded-xl border border-gray-800">
                    {doc.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
