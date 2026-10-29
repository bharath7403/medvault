import React from 'react';
import { 
  LayoutDashboard, 
  GitCommit, 
  FolderOpen, 
  TrendingUp, 
  Pill, 
  Share2, 
  ShieldAlert, 
  QrCode,
  FileCheck,
  X,
  ShieldCheck,
  User,
  Stethoscope
} from 'lucide-react';
import type { Role } from '../types/medvault';

export type ActiveTab = 
  | 'overview' 
  | 'timeline' 
  | 'documents' 
  | 'trends' 
  | 'medications' 
  | 'sharing' 
  | 'privacy' 
  | 'emergency';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  recordCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  currentRole?: Role;
  onRoleChange?: (role: Role) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  recordCount,
  isMobileOpen = false,
  onCloseMobile,
  currentRole,
  onRoleChange
}) => {
  const navItems = [
    { id: 'overview', label: 'Vault Overview', icon: LayoutDashboard, badge: null },
    { id: 'timeline', label: 'Health Timeline', icon: GitCommit, badge: 'Interactive' },
    { id: 'documents', label: 'Document Center', icon: FolderOpen, badge: `${recordCount}` },
    { id: 'trends', label: 'Health Trends', icon: TrendingUp, badge: 'Insights' },
    { id: 'medications', label: 'Medication History', icon: Pill, badge: null },
    { id: 'sharing', label: 'Selective Sharing', icon: Share2, badge: 'Secured' },
    { id: 'privacy', label: 'Privacy & Audit Trail', icon: ShieldAlert, badge: null },
    { id: 'emergency', label: 'Emergency Profile', icon: QrCode, badge: 'QR Gateway' },
  ];

  const handleSelectTab = (tabId: ActiveTab) => {
    onTabChange(tabId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const navContent = (
    <div className="space-y-1.5">
      <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-gray-500">
        Personal Health Locker
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleSelectTab(item.id as ActiveTab)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
              isActive
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm font-bold'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/60 border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : 'bg-gray-900 text-gray-400 border border-gray-800'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (Visible on >= lg screens) */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 flex-col justify-between py-6 px-4 shrink-0 hidden lg:flex h-[calc(100vh-4rem)] sticky top-16">
        {navContent}

        {/* Footer Trust Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-gray-900 to-gray-950 border border-indigo-500/20 text-xs mt-4">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold mb-1">
            <FileCheck className="w-4 h-4" />
            <span>Patient Governed Data</span>
          </div>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Your records are client-controlled and evidence-anchored in PostgreSQL. No AI diagnosis performed.
          </p>
        </div>
      </aside>

      {/* Mobile Drawer (Visible on < lg screens when toggled) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
            onClick={onCloseMobile}
          />

          {/* Slide-out Sidebar Drawer */}
          <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-gray-950 border-r border-gray-800 p-5 shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-left duration-200 overflow-y-auto">
            <div className="space-y-4">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-white">MedVault Navigation</div>
                    <div className="text-[10px] text-indigo-400 font-mono">DigiLocker PHR</div>
                  </div>
                </div>

                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-lg bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
                  aria-label="Close Navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Role Switcher */}
              {onRoleChange && currentRole && (
                <div className="p-1 rounded-xl bg-gray-900 border border-gray-800 flex text-xs">
                  <button
                    onClick={() => onRoleChange('PATIENT')}
                    className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      currentRole === 'PATIENT' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Patient</span>
                  </button>
                  <button
                    onClick={() => onRoleChange('PROVIDER')}
                    className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      currentRole === 'PROVIDER' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Doctor</span>
                  </button>
                </div>
              )}

              {/* Navigation Items */}
              {navContent}
            </div>

            {/* Mobile Footer Trust Box */}
            <div className="pt-4 border-t border-gray-800 text-xs">
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-gray-300">
                <div className="text-indigo-400 font-bold mb-0.5">🔒 Patient-First Architecture</div>
                Encrypted storage under your sole control.
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
