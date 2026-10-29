import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  GitCommit, 
  FolderOpen, 
  TrendingUp, 
  Sparkles, 
  Menu 
} from 'lucide-react';
import type { Role, MedicalRecord, SharingSession, User as UserType } from './types/medvault';
import { apiService } from './services/api';
import { Navbar } from './components/Navbar';
import { Sidebar, type ActiveTab } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { VaultOverview } from './components/VaultOverview';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { SplitScreenViewer } from './components/SplitScreenViewer';
import { HealthTimeline } from './components/HealthTimeline';
import { HealthTrends } from './components/HealthTrends';
import { MedicationTimeline } from './components/MedicationTimeline';
import { SelectiveSharing } from './components/SelectiveSharing';
import { PrivacyCenter } from './components/PrivacyCenter';
import { EmergencyProfile } from './components/EmergencyProfile';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { AuthModal } from './components/AuthModal';
import { DoctorPortal } from './components/DoctorPortal';

export function App() {
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentRole, setCurrentRole] = useState<Role>('PATIENT');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [shares, setShares] = useState<SharingSession[]>([]);

  // Modals & Viewers State
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'LOGIN' | 'REGISTER' }>({
    isOpen: false,
    mode: 'REGISTER'
  });
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const usr = await apiService.getCurrentUser();
    setCurrentUser(usr);

    const recs = await apiService.getRecords();
    const time = await apiService.getTimeline();
    const shrs = await apiService.getSharingSessions();

    setRecords(recs);
    setTimelineEvents(time);
    setShares(shrs);
  };

  const handleAuthSuccess = async (user: UserType) => {
    setCurrentUser(user);
    setAuthModalState({ isOpen: false, mode: 'REGISTER' });
    setShowLanding(false);
    
    // Refresh state dynamically for the newly logged-in / created ID
    const recs = await apiService.getRecords();
    const time = await apiService.getTimeline();
    const shrs = await apiService.getSharingSessions();
    setRecords(recs);
    setTimelineEvents(time);
    setShares(shrs);
  };

  const handleLogout = async () => {
    await apiService.logout();
    setCurrentUser(null);
    setRecords([]);
    setTimelineEvents([]);
    setShares([]);
    setShowLanding(true);
  };

  const handleUploadSuccess = (newRecord: MedicalRecord) => {
    setRecords(prev => [newRecord, ...prev]);
    setIsUploadOpen(false);
    setSelectedRecord(newRecord);
  };

  const handleShareCreated = (newShare: SharingSession) => {
    setShares(prev => [newShare, ...prev]);
  };

  const handleRevokeShare = async (shareId: string) => {
    await apiService.revokeSharingSession(shareId);
    setShares(prev => prev.map(s => s.id === shareId ? { ...s, status: 'REVOKED' } : s));
  };

  const activeSharesCount = shares.filter(s => s.status === 'ACTIVE').length;

  if (showLanding && !authModalState.isOpen) {
    return (
      <>
        <LandingPage
          onEnterApp={() => setShowLanding(false)}
          onAuthModalOpen={(mode) => setAuthModalState({ isOpen: true, mode })}
        />
        {authModalState.isOpen && (
          <AuthModal
            initialMode={authModalState.mode}
            onClose={() => setAuthModalState({ isOpen: false, mode: 'REGISTER' })}
            onAuthSuccess={handleAuthSuccess}
            apiService={apiService}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onUploadClick={() => setIsUploadOpen(true)}
        onEmergencyClick={() => setActiveTab('emergency')}
        onAiClick={() => setIsAiOpen(true)}
        onAuthModalOpen={(mode) => setAuthModalState({ isOpen: true, mode })}
        onLogout={handleLogout}
        activeShareCount={activeSharesCount}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Layout Container */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          recordCount={records.length}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 pb-24 lg:pb-8 overflow-y-auto">
          {currentRole === 'PROVIDER' ? (
            <DoctorPortal
              apiService={apiService}
              onBackToApp={() => setCurrentRole('PATIENT')}
            />
          ) : (
            <>
              {activeTab === 'overview' && (
                <VaultOverview
                  currentUser={currentUser}
                  records={records}
                  activeShares={shares.filter(s => s.status === 'ACTIVE')}
                  onUploadClick={() => setIsUploadOpen(true)}
                  onShareClick={() => setActiveTab('sharing')}
                  onAiClick={() => setIsAiOpen(true)}
                  onSelectRecord={setSelectedRecord}
                  onNavigateTab={setActiveTab}
                  onRevokeShare={handleRevokeShare}
                />
              )}

          {activeTab === 'timeline' && (
            <HealthTimeline
              timelineEvents={timelineEvents}
              records={records}
              onSelectRecord={setSelectedRecord}
            />
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-gray-900/60 border border-gray-800">
                <div>
                  <h1 className="text-xl font-extrabold text-white">Document Center</h1>
                  <p className="text-xs text-gray-400 mt-1">Smart categorized medical documents with evidence viewer</p>
                </div>
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Upload New Document
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {records.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecord(rec)}
                    className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-indigo-500/50 hover:bg-gray-900/80 transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-800 text-indigo-300 border border-gray-700">
                          {rec.category.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">{rec.documentDate}</span>
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{rec.fileName}</h3>
                      <p className="text-xs text-gray-400">{rec.hospital} • {rec.doctor}</p>
                      <p className="text-xs text-gray-300 bg-gray-950/60 p-3 rounded-xl border border-gray-800 line-clamp-2">
                        {rec.extraction.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs">
                      <span className="text-indigo-400 font-medium">
                        {rec.extraction.facts.length} Verified Facts
                      </span>
                      <span className="text-indigo-300 group-hover:text-white font-semibold flex items-center space-x-1 bg-indigo-500/10 group-hover:bg-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-500/20 transition-all">
                        <span>Open Document</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <HealthTrends
              apiService={apiService}
              records={records}
              onSelectRecord={setSelectedRecord}
            />
          )}

          {activeTab === 'medications' && (
            <MedicationTimeline
              apiService={apiService}
              records={records}
              onSelectRecord={setSelectedRecord}
            />
          )}

          {activeTab === 'sharing' && (
            <SelectiveSharing
              shares={shares}
              onShareCreated={handleShareCreated}
              onRevokeShare={handleRevokeShare}
              apiService={apiService}
            />
          )}

          {activeTab === 'privacy' && (
            <PrivacyCenter apiService={apiService} />
          )}

          {activeTab === 'emergency' && (
            <EmergencyProfile apiService={apiService} />
          )}
            </>
          )}
        </main>
      </div>

      {/* DigiLocker Auth Modal */}
      {authModalState.isOpen && (
        <AuthModal
          initialMode={authModalState.mode}
          onClose={() => setAuthModalState({ isOpen: false, mode: 'REGISTER' })}
          onAuthSuccess={handleAuthSuccess}
          apiService={apiService}
        />
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <DocumentUploadModal
          onClose={() => setIsUploadOpen(false)}
          onUploadSuccess={handleUploadSuccess}
          apiService={apiService}
        />
      )}

      {/* Split Screen Evidence Viewer Modal */}
      {selectedRecord && (
        <SplitScreenViewer
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

      {/* AI RAG Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        apiService={apiService}
        onSelectRecordById={(docId) => {
          const rec = records.find(r => r.id === docId);
          if (rec) setSelectedRecord(rec);
        }}
      />

      {/* Mobile Sticky Bottom Navigation Bar (Visible on < lg screens) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-gray-950/95 border-t border-gray-800 backdrop-blur-md z-40 flex items-center justify-around px-2 shadow-2xl">
        <button
          onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'overview' && !isMobileMenuOpen ? 'text-indigo-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Vault</span>
        </button>

        <button
          onClick={() => { setActiveTab('documents'); setIsMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 rounded-xl transition-all relative ${
            activeTab === 'documents' && !isMobileMenuOpen ? 'text-indigo-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <FolderOpen className="w-5 h-5" />
          <span className="text-[10px]">Records</span>
          {records.length > 0 && (
            <span className="absolute top-0 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
          )}
        </button>

        <button
          onClick={() => { setActiveTab('timeline'); setIsMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'timeline' && !isMobileMenuOpen ? 'text-indigo-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <GitCommit className="w-5 h-5" />
          <span className="text-[10px]">Timeline</span>
        </button>

        <button
          onClick={() => { setActiveTab('trends'); setIsMobileMenuOpen(false); }}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'trends' && !isMobileMenuOpen ? 'text-indigo-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px]">Trends</span>
        </button>

        <button
          onClick={() => setIsAiOpen(true)}
          className="flex flex-col items-center justify-center space-y-1 py-1 px-2.5 rounded-xl text-teal-400 hover:text-teal-300 font-bold transition-all ai-glow"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">Ask AI</span>
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2.5 rounded-xl transition-all ${
            isMobileMenuOpen ? 'text-indigo-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px]">More</span>
        </button>
      </nav>
    </div>
  );
}
export default App;
