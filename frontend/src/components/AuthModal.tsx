import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  RefreshCw,
  User
} from 'lucide-react';
import type { User as UserType } from '../types/medvault';

interface AuthModalProps {
  initialMode?: 'LOGIN' | 'REGISTER';
  onClose: () => void;
  onAuthSuccess: (user: UserType) => void;
  apiService: any;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode = 'REGISTER',
  onClose,
  onAuthSuccess,
  apiService
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>(initialMode);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('2000-01-01');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');

  // Status & Error
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFillDemo = () => {
    setMode('LOGIN');
    setEmail('bharath.demo@medvault.health');
    setPassword('password123');
    setErrorMessage('');
  };

  const handleQuickDemoLogin = async () => {
    setMode('LOGIN');
    setEmail('bharath.demo@medvault.health');
    setPassword('password123');
    setErrorMessage('');
    setLoading(true);

    const result = await apiService.loginUser('bharath.demo@medvault.health', 'password123');
    setLoading(false);

    if (result.success && result.user) {
      onAuthSuccess(result.user);
    } else {
      setErrorMessage(result.message || 'Demo authentication failed.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters.');
      return;
    }

    setLoading(true);

    const result = await apiService.registerUser(
      email.trim(),
      password,
      name.trim(),
      phone.trim(),
      dob,
      gender,
      bloodGroup
    );

    setLoading(false);

    if (result.success && result.user) {
      onAuthSuccess(result.user);
    } else {
      setErrorMessage(result.message || 'Registration failed. Please try again.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    const result = await apiService.loginUser(email.trim(), password);
    setLoading(false);

    if (result.success && result.user) {
      onAuthSuccess(result.user);
    } else {
      setErrorMessage(result.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-4 sm:space-y-5 p-4 sm:p-6 relative max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-1.5 rounded-xl bg-gray-900 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 pb-3 border-b border-gray-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">MedVault Identity Portal</h2>
            <p className="text-xs text-gray-400">Secure Database Authentication</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-900 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { 
              setMode('REGISTER'); 
              setErrorMessage(''); 
            }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              mode === 'REGISTER'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Create New Account
          </button>
          <button
            type="button"
            onClick={() => { 
              setMode('LOGIN'); 
              setErrorMessage(''); 
            }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              mode === 'LOGIN'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Sign In with Email
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Mode 1: Registration Form */}
        {mode === 'REGISTER' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-gray-400 mb-1 font-semibold">Full Patient Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-semibold">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-semibold">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Mobile Phone (Optional)</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9845012345"
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B-">B Negative (B-)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Create Health Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Mode 2: Login Form */}
        {mode === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 mb-1 font-semibold">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-semibold">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Access Health Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Access Helpers */}
            <div className="pt-2 p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-center space-y-2.5">
              <div className="text-[11px] font-bold text-indigo-300">
                ⚡ Evaluation / Demo Shortcut
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="flex-1 py-2 px-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold transition-all"
                >
                  Autofill Credentials
                </button>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={loading}
                  className="flex-1 py-2 px-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white text-[11px] font-bold shadow-md shadow-indigo-500/20 transition-all"
                >
                  🚀 Instant Demo Login
                </button>
              </div>
              <div className="text-[10px] text-gray-400 font-mono">
                bharath.demo@medvault.health • password123
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
