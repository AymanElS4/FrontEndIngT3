import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { HomePage } from './components/HomePage';
import { LegalCaseManager } from './components/LegalCaseManager';
import { LegalCodeManager } from './components/LegalCodeManager';
import { NewsSection } from './components/NewsSection';
import { AccountSection } from './components/AccountSection';
import { SubscriptionPage } from './components/SubscriptionPage';
import { PaymentPage } from './components/PaymentPage';
import { PaymentConfirmation } from './components/PaymentConfirmation';
import { MembersManager } from './components/MembersManager';
import { Button } from './components/ui/button';
import { Home, FileText, Scale, Newspaper, User, LogOut, CreditCard, Users } from 'lucide-react';

type Section = 'home' | 'cases' | 'codes' | 'news' | 'account' | 'subscription' | 'payment' | 'confirmation' | 'members';
type UserTier = 'Básico' | 'Profesional' | 'Empresa' | 'Administrador';

interface SelectedPlan {
  name: string;
  price: string;
  features: string[];
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [userTier, setUserTier] = useState<UserTier>('Básico'); // Default to basic tier
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Set tier to Administrador if logging in from admin page
    if (showAdminLogin) {
      setUserTier('Administrador');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection('home');
    setShowAdminLogin(false);
    setUserTier('Básico');
  };

  const handleShowAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const handleBackToUserLogin = () => {
    setShowAdminLogin(false);
  };

  const handleSelectPlan = (plan: SelectedPlan) => {
    setSelectedPlan(plan);
    setActiveSection('payment');
  };

  const handlePaymentConfirm = () => {
    setActiveSection('confirmation');
  };

  const handleGoHome = () => {
    setActiveSection('home');
    setSelectedPlan(null);
  };

  const handleBackFromPayment = () => {
    setActiveSection('subscription');
  };

  if (!isLoggedIn) {
    if (showAdminLogin) {
      return <AdminLoginPage onLogin={handleLogin} onBackToUserLogin={handleBackToUserLogin} />;
    }
    return <LoginPage onLogin={handleLogin} onShowAdminLogin={handleShowAdminLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl text-gray-900">Gestor de Archivos Legales</h1>
            </div>
            
            <nav className="flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Inicio
              </Button>
              <Button
                variant={activeSection === 'cases' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('cases')}
                className="gap-2"
              >
                <FileText className="w-4 h-4" />
                Casos Legales
              </Button>
              <Button
                variant={activeSection === 'codes' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('codes')}
                className="gap-2"
              >
                <Scale className="w-4 h-4" />
                Artículos Legales
              </Button>
              <Button
                variant={activeSection === 'news' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('news')}
                className="gap-2"
              >
                <Newspaper className="w-4 h-4" />
                Noticias
              </Button>
              <Button
                variant={activeSection === 'subscription' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('subscription')}
                className="gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Planes
              </Button>
              {userTier === 'Administrador' && (
                <Button
                  variant={activeSection === 'members' ? 'default' : 'ghost'}
                  onClick={() => setActiveSection('members')}
                  className="gap-2"
                >
                  <Users className="w-4 h-4" />
                  Miembros
                </Button>
              )}
              <Button
                variant={activeSection === 'account' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('account')}
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Cuenta
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'home' && <HomePage onSelectPlan={handleSelectPlan} onNavigateToNews={() => setActiveSection('news')} />}
        {activeSection === 'cases' && <LegalCaseManager userTier={userTier} />}
        {activeSection === 'codes' && <LegalCodeManager userTier={userTier} />}
        {activeSection === 'news' && <NewsSection />}
        {activeSection === 'account' && <AccountSection onNavigateToSubscription={() => setActiveSection('subscription')} userTier={userTier} onTierChange={setUserTier} />}
        {activeSection === 'subscription' && <SubscriptionPage onSelectPlan={handleSelectPlan} />}
        {activeSection === 'payment' && selectedPlan && (
          <PaymentPage 
            selectedPlan={selectedPlan} 
            onConfirm={handlePaymentConfirm}
            onBack={handleBackFromPayment}
          />
        )}
        {activeSection === 'confirmation' && selectedPlan && (
          <PaymentConfirmation 
            plan={selectedPlan}
            onGoHome={handleGoHome}
          />
        )}
        {activeSection === 'members' && <MembersManager />}
      </main>
    </div>
  );
}