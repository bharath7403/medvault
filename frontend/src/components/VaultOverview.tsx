import React from 'react';
import { 
  FolderOpen, 
  FileText, 
  Activity, 
  Clock, 
  Upload, 
  Share2, 
  Sparkles, 
  ArrowUpRight, 
  ChevronRight,
  ShieldCheck,
  FolderPlus
} from 'lucide-react';
import type { MedicalRecord, SharingSession, User as UserType } from '../types/medvault';

interface VaultOverviewProps {
  currentUser: UserType | null;
  records: MedicalRecord[];
  activeShares: SharingSession[];
  onUploadClick: () => void;
  onShareClick: () => void;
  onAiClick: () => void;
  onSelectRecord: (record: MedicalRecord) => void;
  onNavigateTab: (tab: any) => void;
  onRevokeShare: (shareId: string) => void;
}

export const VaultOverview: React.FC<VaultOverviewProps> = ({
  currentUser,
  records,
  activeShares,
  onUploadClick,
  onShareClick,
  onAiClick,
  onSelectRecord,
  onNavigateTab,
  onRevokeShare
}) => {
  const labReportsCount = records.filter(r => r.category === 'LAB_REPORT').length;
  const prescriptionsCount = records.filter(r => r.category === 'PRESCRIPTION').length;
  const userName = currentUser ? currentUser.name : 'Bharath';

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-900/50 via-gray-900 to-gray-950 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] sm:text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              Health Identity Active: {currentUser?.healthId || 'MV-98450-12345'}
            </span>
            <span className="text-[11px] sm:text-xs text-gray-400">• Last synced today</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Welcome, {userName}
          </h1>
          <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
            Your encrypted lifelong health records are organized, evidence-grounded, and fully under your control.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
          <button
            onClick={onUploadClick}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Record</span>
          </button>
          <button
            onClick={onShareClick}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 text-xs font-semibold transition-all"
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>Share Records</span>
          </button>
          <button
            onClick={onAiClick}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-all ai-glow"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Ask Vault AI</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div 
          onClick={() => onNavigateTab('documents')}
          className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-indigo-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold">Total Documents</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <FolderOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{records.length}</div>
          <div className="text-[11px] text-gray-500 mt-1">Stored securely</div>
        </div>

        <div 
          onClick={() => onNavigateTab('documents')}
          className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-teal-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold">Prescriptions</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{prescriptionsCount}</div>
          <div className="text-[11px] text-gray-500 mt-1">Active medications</div>
        </div>

        <div 
          onClick={() => onNavigateTab('trends')}
          className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold">Lab Panels</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{labReportsCount}</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-medium">Trends available</div>
        </div>

        <div 
          onClick={() => onNavigateTab('sharing')}
          className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold">Active Shares</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{activeShares.length}</div>
          <div className="text-[11px] text-amber-400 mt-1 font-medium">Temporary session</div>
        </div>
      </div>

      {/* Active Shares Countdown Section (If Any) */}
      {activeShares.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300">
                Active Sharing Session with {activeShares[0].recipientName}
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Purpose: {activeShares[0].purpose} • Expires: {activeShares[0].expiresAt}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => onRevokeShare(activeShares[0].id)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              Instant Revoke
            </button>
            <button
              onClick={() => onNavigateTab('sharing')}
              className="px-3 py-1.5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-xs font-medium border border-gray-800"
            >
              Manage Shares
            </button>
          </div>
        </div>
      )}

      {/* Recent Records Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Recent Health Records
          </h2>
          {records.length > 0 && (
            <button
              onClick={() => onNavigateTab('documents')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
            >
              <span>View All Locker Files</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {records.length === 0 ? (
          /* Empty Vault Card for New User Account */
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gray-900/40 border border-dashed border-gray-800 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <FolderPlus className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="space-y-1 max-w-md">
              <h3 className="text-sm sm:text-base font-bold text-white">Your Health Vault is Empty</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Health ID <span className="text-indigo-400 font-mono font-bold">{currentUser?.healthId}</span> is active. Upload your first medical document (PDF, PNG, JPG) to start building your longitudinal health history.
              </p>
            </div>
            <button
              onClick={onUploadClick}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload First Medical Document</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {records.slice(0, 6).map((record) => (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="p-4 sm:p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-indigo-500/50 hover:bg-gray-900 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-800 text-indigo-300 border border-gray-700">
                      {record.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">{record.documentDate}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {record.fileName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {record.hospital} • {record.doctor}
                    </p>
                  </div>

                  <p className="text-xs text-gray-300 bg-gray-950/60 p-3 rounded-xl border border-gray-800/80 leading-relaxed line-clamp-2">
                    {record.extraction.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs">
                  <span className="text-indigo-400 font-medium flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{record.extraction.facts.length} Verified Facts</span>
                  </span>
                  <div className="flex items-center space-x-1 text-indigo-400 group-hover:text-indigo-200 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20">
                    <span>View Document</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
