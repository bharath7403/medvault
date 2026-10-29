import React, { useState } from 'react';
import { 
  ShieldAlert, 
  UserCheck, 
  Shield
} from 'lucide-react';
import type { AuditLogEntry } from '../types/medvault';

interface PrivacyCenterProps {
  apiService: any;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({ apiService }) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  React.useEffect(() => {
    apiService.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Patient Privacy Center & Audit Trail</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Complete transparency into every healthcare provider, session token, and IP address that accessed your records.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 self-start md:self-auto">
          <Shield className="w-4 h-4" />
          <span>Zero Unconsented Access</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Access History Audit Logs ({logs.length})
        </h2>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs text-gray-300 min-w-[600px]">
            <thead className="bg-gray-950 text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Accessor Name</th>
                <th className="py-3 px-4">Action Performed</th>
                <th className="py-3 px-4">Target Document</th>
                <th className="py-3 px-4">IP Address & Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-900/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-gray-400">{log.timestamp}</td>
                  <td className="py-3 px-4 font-bold text-white flex items-center space-x-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{log.accessorName}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      log.action === 'DOWNLOAD_RECORD'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {log.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-200 font-medium truncate max-w-[200px]">
                    {log.documentTitle || 'Full Timeline Summary'}
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-400 text-[11px]">
                    {log.ipAddress} • {log.userAgent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
