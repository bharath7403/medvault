import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  GitCommit, 
  Share2, 
  ArrowRight, 
  Code,
  UserPlus
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onAuthModalOpen: (mode: 'LOGIN' | 'REGISTER') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onAuthModalOpen }) => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <header className="h-16 sm:h-20 border-b border-gray-800/80 px-4 sm:px-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white">
            Med<span className="text-indigo-400">Vault</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-semibold">
          <button 
            onClick={() => onAuthModalOpen('LOGIN')}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 transition-all"
          >
            Sign In
          </button>
          <button 
            onClick={() => onAuthModalOpen('REGISTER')}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all flex items-center space-x-1.5 sm:space-x-2"
          >
            <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Create ID</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-16 pb-16 sm:pb-24 space-y-12 sm:space-y-20">
        <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] sm:text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DigiLocker-Style Mobile Health Identity</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Your health history. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400">
              Organized, connected, yours.
            </span>
          </h1>

          <p className="text-xs sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-normal px-2">
            One mobile number, one lifelong digital health vault. Securely preserve medical records across hospitals, track lab trends, and grant temporary access to doctors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto w-full">
            <button
              onClick={() => onAuthModalOpen('REGISTER')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-indigo-600/40 transition-all flex items-center justify-center space-x-2"
            >
              <span>Create My Health Vault ID</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-bold text-xs sm:text-sm transition-all"
            >
              Explore Vault Demo
            </button>
          </div>
        </div>

        {/* Animated Visual Diagram Representation */}
        <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-gray-900/80 to-gray-950 border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-gray-500 mb-6 sm:mb-8">
            MedVault Architecture Flow
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">1</div>
              <h3 className="text-sm font-bold text-white">1 Phone = 1 Health ID</h3>
              <p className="text-xs text-gray-400">DigiLocker style unique registration backed by mobile number & security PIN.</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950 border border-indigo-500/40 space-y-3 ai-glow">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">2</div>
              <h3 className="text-sm font-bold text-white">Intelligent Ingestion</h3>
              <p className="text-xs text-gray-400">OCR & NER extract lab values, dosages, and map HL7 FHIR resources.</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">3</div>
              <h3 className="text-sm font-bold text-white">Longitudinal Timeline</h3>
              <p className="text-xs text-gray-400">Lifelong health event visual stream and quantitative metric plots.</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">4</div>
              <h3 className="text-sm font-bold text-white">Selective Sharing</h3>
              <p className="text-xs text-gray-400">Fintech-style access session tokens with instant one-click revocation.</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-gray-900/50 border border-gray-800 space-y-3">
            <GitCommit className="w-8 h-8 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Evidence Grounded</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every extracted medical fact links directly back to its original source document page with interactive bounding box highlighting.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gray-900/50 border border-gray-800 space-y-3">
            <Share2 className="w-8 h-8 text-teal-400" />
            <h3 className="text-lg font-bold text-white">Temporary Session Tokens</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Share only selected lab panels or radiology reports with a consulting doctor for 1h, 24h, or 7 days with live access logs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gray-900/50 border border-gray-800 space-y-3">
            <Code className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">HL7 FHIR Interoperability</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Normalizes extracted records into standard healthcare data structures (DiagnosticReport, MedicationStatement, Encounter).
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-8 text-center text-xs text-gray-500">
        MedVault Personal Health Record Platform • Built for B.Tech Information Technology Project
      </footer>
    </div>
  );
};
