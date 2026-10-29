import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  FileText, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

interface DoctorPortalProps {
  apiService: any;
  onBackToApp: () => void;
  initialToken?: string;
  onSelectRecord?: (record: any) => void;
}

export const DoctorPortal: React.FC<DoctorPortalProps> = ({ 
  apiService, 
  onBackToApp, 
  initialToken = '',
  onSelectRecord
}) => {
  const [tokenInput, setTokenInput] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialToken) {
      setTokenInput(initialToken);
      verifyCode(initialToken);
    }
  }, [initialToken]);

  const verifyCode = async (code: string) => {
    const cleanToken = code.trim();
    if (!cleanToken) return;

    setLoading(true);
    setErrorMsg('');
    setSessionData(null);

    const result = await apiService.getSharedAccessData(cleanToken);

    setLoading(false);
    if (result.valid) {
      setSessionData(result);
    } else {
      setErrorMsg(result.message || 'Invalid or expired 5-digit doctor code.');
    }
  };

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(tokenInput);
  };

  const handleQuickFillDemo = () => {
    setTokenInput('48201');
    verifyCode('48201');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Provider Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-teal-500/10 text-teal-400 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              Provider Mode
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-white mt-1">
            Doctor & Healthcare Consultation Gateway
          </h1>
          <p className="text-xs text-gray-400">
            Enter the patient's 5-digit temporary sharing PIN to unlock authorized health records.
          </p>
        </div>

        <button
          onClick={onBackToApp}
          className="flex items-center space-x-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold rounded-xl border border-gray-700 self-start sm:self-auto transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Doctor Mode</span>
        </button>
      </div>

      {/* 5-Digit PIN Form */}
      <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 max-w-lg mx-auto space-y-5 text-center shadow-2xl">
        <div className="space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white pt-2">
            Enter 5-Digit Patient Consent Code
          </h2>
          <p className="text-xs text-gray-400">
            Provided verbally or via secure message by the patient.
          </p>
        </div>

        <form onSubmit={handleVerifyToken} className="space-y-4">
          <div>
            <input
              type="text"
              maxLength={10}
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value.replace(/\s+/g, ''))}
              placeholder="5 8 2 0 4"
              className="w-full py-3 sm:py-4 px-4 bg-gray-950 border-2 border-gray-800 hover:border-teal-500/60 focus:border-teal-500 rounded-2xl text-xl sm:text-2xl text-teal-300 font-mono text-center tracking-[0.3em] font-black focus:outline-none transition-all shadow-inner"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading || !tokenInput.trim()}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Verifying 5-Digit PIN...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Authorized Patient Records</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Pill Helper */}
        <div className="pt-2 border-t border-gray-800/80 flex items-center justify-center space-x-2 text-xs">
          <span className="text-gray-500">Quick test:</span>
          <button
            type="button"
            onClick={handleQuickFillDemo}
            className="text-teal-400 hover:text-teal-300 font-mono font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 hover:bg-teal-500/20 transition-colors"
          >
            Try PIN: 48201
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2 text-left">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Render Authorized Records if Token Valid */}
      {sessionData && (
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-teal-500/40 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-gray-800 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">Patient Consent Verified</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                Authorized for: {sessionData.session?.recipientName}
              </h3>
              <p className="text-xs text-gray-400">
                Purpose: {sessionData.session?.purpose} • Patient Reference: <span className="text-teal-300 font-mono font-bold">{sessionData.session?.patientPhone}</span>
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/20 shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>Expires: {sessionData.session?.expiresAt}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Authorized Patient Records ({sessionData.documents?.length || 0})
              </h4>
              <span className="text-[11px] text-teal-400 font-mono">
                5-Digit PIN: {sessionData.session?.accessToken}
              </span>
            </div>

            {sessionData.documents?.length === 0 ? (
              <div className="p-8 rounded-2xl bg-gray-950 text-center text-xs text-gray-500 border border-gray-800">
                The patient currently has no documents matching the authorized categories ({sessionData.session?.categoriesAllowed}).
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessionData.documents?.map((doc: any) => (
                  <div 
                    key={doc.id} 
                    className="p-4 sm:p-5 rounded-2xl bg-gray-950 border border-gray-800 hover:border-teal-500/40 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gray-800 text-teal-300 border border-gray-700">
                        {doc.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{doc.documentDate}</span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                        <span className="truncate">{doc.fileName}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{doc.hospital} • {doc.doctor}</p>
                    </div>

                    <p className="text-xs text-gray-300 bg-gray-900/80 p-3 rounded-xl border border-gray-800/80 leading-relaxed">
                      {doc.summary || doc.extraction?.summary}
                    </p>

                    {onSelectRecord && (
                      <div className="pt-2 border-t border-gray-800/80 flex justify-end">
                        <button
                          type="button"
                          onClick={() => onSelectRecord(doc)}
                          className="flex items-center space-x-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Inspect Evidence Sheet</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
