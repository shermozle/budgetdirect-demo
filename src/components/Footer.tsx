import { Link } from 'react-router-dom';
import amplitude from '../utils/amplitude';

export default function Footer() {
  const handleContact = () => {
    amplitude.track('Contact Customer Service');
  };

  return (
    <footer style={{
      background: 'var(--navy)',
      color: 'var(--white)',
      padding: '3rem 0 1.5rem',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>Insurance</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/quote/start" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Car Insurance</Link>
              <Link to="/quote/start" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Home & Contents</Link>
              <Link to="/quote/start" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Travel Insurance</Link>
              <Link to="/quote/start" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Pet Insurance</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/help" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Help Centre</Link>
              <Link to="/help" onClick={handleContact} style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Contact Us</Link>
              <Link to="/help" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Make a Claim</Link>
              <Link to="/help" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>FAQs</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>Account</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/account" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>My Account</Link>
              <Link to="/account/notifications" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Notifications</Link>
              <Link to="/quote/resume?id=demo" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Resume Quote</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/help" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Product Disclosure Statement</Link>
              <Link to="/help" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Privacy Policy</Link>
              <Link to="/help" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Terms & Conditions</Link>
              <Link to="/help" style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Financial Services Guide</Link>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>
            Budget Direct Demo. This is a demo site for Amplitude analytics demonstrations.
            <br />Insurance products underwritten by Auto & General Insurance Company Limited.
          </p>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>
            ABN 72 000 000 000 | AFSL 000000
          </p>
        </div>
      </div>
    </footer>
  );
}
