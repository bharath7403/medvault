import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Upload, 
  QrCode, 
  User, 
  Sparkles, 
  Clock, 
  Stethoscope, 
  LogOut, 
  ChevronDown, 
  UserPlus,
  Menu,
  X
} from 'lucide-react';
import type { Role, User as UserType } from '../types/medvault';

interface NavbarProps {
  currentUser: UserType | null;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  onUploadClick: () => void;
  onEmergencyClick: () => void;
  onAiClick: () => void;
  onAuthModalOpen: (mode: 'LOGIN' | 'REGISTER') => void;
  onLogout: () => void;
  activeShareCount: number;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRole,
  onRoleChange,
  onUploadClick,
  onEmergencyClick,
  onAiClick,
  onAuthModalOpen,
  onLogout,
  activeShareCount,
  isMobileMenuOpen = false,
  onToggleMobileMenu
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md sticky top-0 z-30 px-3 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger + Brand Logo */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white transition-colors"
            title="Toggle Menu"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-sans">
              Med<span className="text-indigo-400">Vault</span>
            </span>
            <span className="hidden xs:inline-block text-[9px] uppercase font-bold tracking-widest bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded-full border border-indigo-500/20">
              PHR
            </span>
          </div>
          <p className="text-[10px] text-gray-400 -mt-0.5 hidden sm:block">Digital Health Identity</p>
        </div>
      </div>

      {/* Global Search Bar (Hidden on Mobile/Tablet) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6 lg:mx-8 relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search records, medications, blood panels, doctors..."
          className="w-full pl-10 pr-4 py-2 bg-gray-900/90 border border-gray-800 rounded-xl text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 text-[10px] bg-gray-800 text-gray-400 rounded border border-gray-700">⌘</kbd>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-gray-800 text-gray-400 rounded border border-gray-700">K</kbd>
        </div>
      </div>

      {/* Right Controls & User Profile */}
      <div className="flex items-center space-x-1.5 sm:space-x-2.5">
        {/* Active Shares Badge (Desktop only) */}
        {activeShareCount > 0 && (
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>{activeShareCount} Share</span>
          </div>
        )}

        {/* AI Assistant Button */}
        <button
          onClick={onAiClick}
          className="relative group flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-all ai-glow"
          title="Ask Vault AI"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>

        {/* Upload Button */}
        <button
          onClick={onUploadClick}
          className="flex items-center space-x-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          title="Upload Medical Document"
        >
          <Upload className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        {/* Emergency QR Trigger */}
        <button
          onClick={onEmergencyClick}
          title="Emergency Health Profile & QR"
          className="p-1.5 sm:p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition-all shrink-0"
        >
          <QrCode className="w-4 h-4" />
        </button>

        {/* Role Switcher (Hidden on Mobile, Available in Drawer) */}
        <div className="hidden md:flex items-center bg-gray-900 p-1 rounded-xl border border-gray-800 text-xs shrink-0">
          <button
            onClick={() => onRoleChange('PATIENT')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
              currentRole === 'PATIENT'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <User className="w-3 h-3" />
            <span className="font-medium">Patient</span>
          </button>
          <button
            onClick={() => onRoleChange('PROVIDER')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
              currentRole === 'PROVIDER'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Stethoscope className="w-3 h-3" />
            <span className="font-medium">Doctor</span>
          </button>
        </div>

        {/* User Account / Auth Control Dropdown */}
        <div className="relative shrink-0">
          {currentUser ? (
            <div>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 p-1.5 sm:pr-2.5 rounded-xl transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center">
                  {currentUser.name.substring(0, 1)}
                </div>
                <div className="text-left hidden xl:block text-xs">
                  <div className="font-bold text-white leading-tight truncate max-w-[100px]">{currentUser.name}</div>
                  <div className="text-[10px] text-indigo-400 font-mono">{currentUser.healthId}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-3 space-y-3 z-50 animate-in fade-in duration-150">
                  <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 space-y-1">
                    <div className="text-xs font-bold text-white">{currentUser.name}</div>
                    <div className="text-[11px] text-gray-400 font-mono truncate">{currentUser.email || (currentUser.phone ? `+91 ${currentUser.phone}` : '')}</div>
                    <div className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded w-fit border border-indigo-500/20">
                      ID: {currentUser.healthId}
                    </div>
                  </div>

                  {/* Quick Role Switch for Mobile users */}
                  <div className="md:hidden pt-1 pb-2 border-b border-gray-800">
                    <div className="text-[10px] font-bold text-gray-500 uppercase px-1 mb-1.5">Portal View</div>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <button
                        onClick={() => { onRoleChange('PATIENT'); setShowProfileMenu(false); }}
                        className={`py-1.5 rounded-lg text-center font-semibold ${
                          currentRole === 'PATIENT' ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-gray-400'
                        }`}
                      >
                        Patient
                      </button>
                      <button
                        onClick={() => { onRoleChange('PROVIDER'); setShowProfileMenu(false); }}
                        className={`py-1.5 rounded-lg text-center font-semibold ${
                          currentRole === 'PROVIDER' ? 'bg-teal-600 text-white' : 'bg-gray-900 text-gray-400'
                        }`}
                      >
                        Doctor
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => { setShowProfileMenu(false); onAuthModalOpen('REGISTER'); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-gray-300 hover:bg-gray-900 flex items-center space-x-2"
                    >
                      <UserPlus className="w-4 h-4 text-indigo-400" />
                      <span>Create Another Health ID</span>
                    </button>
                    <button
                      onClick={() => { setShowProfileMenu(false); onLogout(); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2 font-bold"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => onAuthModalOpen('LOGIN')}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-semibold border border-gray-800"
              >
                Sign In
              </button>
              <button
                onClick={() => onAuthModalOpen('REGISTER')}
                className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
