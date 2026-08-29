import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Language, Department, ServiceItem, Scheme } from './types';
import { sampleServices } from './data/portalData';

// Global Header & Existing Components
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LandingHero } from './components/LandingHero';
import { MainDashboard } from './components/MainDashboard';
import { DepartmentsView } from './components/DepartmentsView';

// Modals
import { DepartmentDetailModal } from './components/DepartmentDetailModal';
import { ServiceDetailDrawer } from './components/ServiceDetailDrawer';
import { TrackApplicationModal } from './components/TrackApplicationModal';
import { GrievanceModal } from './components/GrievanceModal';
import { SchemesModal } from './components/SchemesModal';
import { HelpCenterModal } from './components/HelpCenterModal';
import { ApiIntegrationsModal } from './components/ApiIntegrationsModal';

// Citizen Pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { CitizenProfilePage } from './pages/citizen/CitizenProfilePage';
import { CitizenServicesPage } from './pages/citizen/CitizenServicesPage';
import { CitizenServiceDetailPage } from './pages/citizen/CitizenServiceDetailPage';
import { CitizenApplyPage } from './pages/citizen/CitizenApplyPage';
import { CitizenApplicationsPage } from './pages/citizen/CitizenApplicationsPage';
import { CitizenApplicationDetailPage } from './pages/citizen/CitizenApplicationDetailPage';
import { CitizenConsentPage } from './pages/citizen/CitizenConsentPage';
import { CitizenNotificationsPage } from './pages/citizen/CitizenNotificationsPage';
import { CitizenGrievancesPage } from './pages/citizen/CitizenGrievancesPage';
import { CitizenInteropDemoPage } from './pages/citizen/CitizenInteropDemoPage';

// Officer Pages
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { OfficerApplicationsPage } from './pages/officer/OfficerApplicationsPage';
import { OfficerApplicationDetailPage } from './pages/officer/OfficerApplicationDetailPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { AdminIntegrationsPage } from './pages/admin/AdminIntegrationsPage';
import { AdminApiLogsPage } from './pages/admin/AdminApiLogsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminWorkflowsPage } from './pages/admin/AdminWorkflowsPage';

// Public Auth & Docs Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPages';
import { ApiDocsPage } from './pages/ApiDocsPage';

function AppContent() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');

  // Modals & State for existing dashboard components
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackInitialId, setTrackInitialId] = useState<string>('');
  const [grievanceModalOpen, setGrievanceModalOpen] = useState(false);
  const [schemesModalOpen, setSchemesModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [integrationsModalOpen, setIntegrationsModalOpen] = useState(false);

  // Router listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrack = (id?: string) => {
    setTrackInitialId(id || '');
    setTrackModalOpen(true);
  };

  const handleOpenServiceDetail = (serviceId: string) => {
    navigate(`/citizen/services/${serviceId}`);
  };

  const handleApplyScheme = (scheme: Scheme) => {
    navigate(`/citizen/apply/srv-${scheme.id}`);
  };

  // Helper route matcher
  const renderRoute = () => {
    const path = currentPath;

    // 1. Static Citizen Routes
    if (path === '/citizen/dashboard') return <CitizenDashboard onNavigate={navigate} />;
    if (path === '/citizen/profile') return <CitizenProfilePage onNavigate={navigate} />;
    if (path === '/citizen/services') return <CitizenServicesPage onNavigate={navigate} />;
    if (path === '/citizen/applications') return <CitizenApplicationsPage onNavigate={navigate} />;
    if (path === '/citizen/consent') return <CitizenConsentPage onNavigate={navigate} />;
    if (path === '/citizen/notifications') return <CitizenNotificationsPage onNavigate={navigate} />;
    if (path === '/citizen/grievances') return <CitizenGrievancesPage onNavigate={navigate} />;
    if (path === '/citizen/interoperability-demo') return <CitizenInteropDemoPage onNavigate={navigate} />;

    // Dynamic Citizen Routes
    if (path.startsWith('/citizen/services/')) {
      const id = path.replace('/citizen/services/', '');
      return <CitizenServiceDetailPage serviceId={id} onNavigate={navigate} />;
    }
    if (path.startsWith('/citizen/apply/')) {
      const id = path.replace('/citizen/apply/', '');
      return <CitizenApplyPage serviceId={id} onNavigate={navigate} />;
    }
    if (path.startsWith('/citizen/applications/')) {
      const id = path.replace('/citizen/applications/', '');
      return <CitizenApplicationDetailPage applicationId={id} onNavigate={navigate} />;
    }

    // 2. Officer Routes
    if (path === '/officer/dashboard') return <OfficerDashboard onNavigate={navigate} />;
    if (path === '/officer/applications') return <OfficerApplicationsPage onNavigate={navigate} />;
    if (path.startsWith('/officer/applications/')) {
      const id = path.replace('/officer/applications/', '');
      return <OfficerApplicationDetailPage applicationId={id} onNavigate={navigate} />;
    }

    // 3. Admin Routes
    if (path === '/admin/dashboard') return <AdminDashboard onNavigate={navigate} />;
    if (path === '/admin/departments') return <AdminDepartmentsPage onNavigate={navigate} />;
    if (path === '/admin/integrations') return <AdminIntegrationsPage onNavigate={navigate} />;
    if (path === '/admin/api-logs') return <AdminApiLogsPage onNavigate={navigate} />;
    if (path === '/admin/audit-logs') return <AdminAuditLogsPage onNavigate={navigate} />;
    if (path === '/admin/users') return <AdminUsersPage onNavigate={navigate} />;
    if (path === '/admin/workflows') return <AdminWorkflowsPage onNavigate={navigate} />;

    // 4. Public Auth & Docs Routes
    if (path === '/login') return <AuthPage mode="login" onNavigate={navigate} />;
    if (path === '/register') return <AuthPage mode="register" onNavigate={navigate} />;
    if (path === '/api-docs') return <ApiDocsPage onNavigate={navigate} />;

    // 5. Existing Departments View
    if (path === '/departments') {
      return (
        <DepartmentsView
          lang={currentLang}
          onSelectDepartment={(dept) => setSelectedDept(dept)}
          onOpenHelpModal={() => setHelpModalOpen(true)}
          onOpenSearchFocus={() => {
            const el = document.getElementById('dept-search-input');
            if (el) el.focus();
          }}
        />
      );
    }

    // 6. Existing Main Dashboard
    if (path === '/dashboard') {
      return (
        <MainDashboard
          lang={currentLang}
          onNavigate={(view) => {
            if (view === 'departments') navigate('/departments');
            else if (view === 'landing') navigate('/');
            else navigate('/dashboard');
          }}
          onSelectDepartment={(dept) => setSelectedDept(dept)}
          onOpenTrackModal={handleOpenTrack}
          onOpenGrievanceModal={() => setGrievanceModalOpen(true)}
          onOpenSchemesModal={() => setSchemesModalOpen(true)}
          onOpenHelpModal={() => setHelpModalOpen(true)}
          onOpenServiceDetail={handleOpenServiceDetail}
        />
      );
    }

    // Default: Landing Page (Preserving original UI + Direct Persona Action Cards)
    return (
      <div className="space-y-8">
        <LandingHero
          lang={currentLang}
          onLanguageChange={setCurrentLang}
          onStart={() => navigate('/citizen/dashboard')}
        />
        <LandingPage onNavigate={navigate} />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-800 selection:bg-emerald-200 selection:text-emerald-900 font-['Outfit',sans-serif]">
      
      {/* 1. Global Navigation Header with Active Persona Switcher */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        lang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* 2. Main Page Render */}
      <main className="flex-1 pb-16">
        <ErrorBoundary>
          {renderRoute()}
        </ErrorBoundary>
      </main>

      {/* 3. Global Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-serif font-black text-white text-base">माझी ओळख (Majhi Olakh)</span>
            <p className="text-slate-400 leading-relaxed text-xs">
              State Government Interoperability Platform for Unified Citizen Services and Cross-Department Data Exchange (SIH 26129).
            </p>
          </div>

          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-[11px]">Role Portals</span>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/citizen/dashboard')} className="hover:text-emerald-400 cursor-pointer">Citizen Unified Dashboard</button></li>
              <li><button onClick={() => navigate('/officer/dashboard')} className="hover:text-emerald-400 cursor-pointer">Officer Scrutiny Console</button></li>
              <li><button onClick={() => navigate('/admin/dashboard')} className="hover:text-emerald-400 cursor-pointer">System Architecture Hub</button></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-[11px]">Interoperability</span>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/citizen/services')} className="hover:text-emerald-400 cursor-pointer">Unified Service Catalog</button></li>
              <li><button onClick={() => navigate('/admin/integrations')} className="hover:text-emerald-400 cursor-pointer">Legacy System Adapter (CDM)</button></li>
              <li><button onClick={() => navigate('/admin/governance')} className="hover:text-emerald-400 cursor-pointer">API Governance & Security</button></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-[11px]">Compliance & Security</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Built in accordance with Digital Personal Data Protection (DPDP) Act 2023 and API Setu Interoperability Standards.
            </p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-800">
              Zero-Trust TLS 1.3 Verified
            </span>
          </div>
        </div>
      </footer>

      {/* Modals for Legacy & Quick Triggers */}
      {trackModalOpen && (
        <TrackApplicationModal
          initialId={trackInitialId}
          lang={currentLang}
          onClose={() => setTrackModalOpen(false)}
        />
      )}

      {grievanceModalOpen && (
        <GrievanceModal
          lang={currentLang}
          onClose={() => setGrievanceModalOpen(false)}
        />
      )}

      {schemesModalOpen && (
        <SchemesModal
          lang={currentLang}
          onClose={() => setSchemesModalOpen(false)}
          onApplyScheme={handleApplyScheme}
        />
      )}

      {helpModalOpen && (
        <HelpCenterModal
          lang={currentLang}
          onClose={() => setHelpModalOpen(false)}
        />
      )}

      <DepartmentDetailModal
        department={selectedDept}
        lang={currentLang}
        onClose={() => setSelectedDept(null)}
        onSelectService={(srv) => {
          setSelectedDept(null);
          navigate(`/citizen/services/${srv.id}`);
        }}
        onOpenIntegrations={() => setIntegrationsModalOpen(true)}
      />

      <ServiceDetailDrawer
        service={selectedService}
        lang={currentLang}
        onClose={() => setSelectedService(null)}
        onTrackNewApplication={(appId) => {
          setSelectedService(null);
          handleOpenTrack(appId);
        }}
      />

      <ApiIntegrationsModal
        isOpen={integrationsModalOpen}
        onClose={() => setIntegrationsModalOpen(false)}
        lang={currentLang}
        onSelectDemoService={(srvId) => {
          setIntegrationsModalOpen(false);
          navigate(`/citizen/services/${srvId}`);
        }}
      />

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
