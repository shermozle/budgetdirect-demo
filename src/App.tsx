import { Routes, Route } from 'react-router-dom';
import { QuoteProvider } from './context/QuoteContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QuoteStart from './pages/QuoteStart';
import QuoteVehicle from './pages/QuoteVehicle';
import QuoteDriver from './pages/QuoteDriver';
import QuoteCover from './pages/QuoteCover';
import QuoteReview from './pages/QuoteReview';
import QuotePurchase from './pages/QuotePurchase';
import QuoteSuccess from './pages/QuoteSuccess';
import AccountDashboard from './pages/AccountDashboard';
import Notifications from './pages/Notifications';
import HelpSupport from './pages/HelpSupport';
import ResumeQuote from './pages/ResumeQuote';
import CarInsuranceLanding from './pages/CarInsuranceLanding';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <QuoteProvider>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quote/start" element={<QuoteStart />} />
            <Route path="/quote/vehicle" element={<QuoteVehicle />} />
            <Route path="/quote/driver" element={<QuoteDriver />} />
            <Route path="/quote/cover" element={<QuoteCover />} />
            <Route path="/quote/review" element={<QuoteReview />} />
            <Route path="/quote/purchase" element={<QuotePurchase />} />
            <Route path="/quote/success" element={<QuoteSuccess />} />
            <Route path="/quote/resume" element={<ResumeQuote />} />
            <Route path="/account" element={<AccountDashboard />} />
            <Route path="/account/notifications" element={<Notifications />} />
            <Route path="/help" element={<HelpSupport />} />
            <Route path="/landing" element={<CarInsuranceLanding />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </QuoteProvider>
  );
}

export default App;
