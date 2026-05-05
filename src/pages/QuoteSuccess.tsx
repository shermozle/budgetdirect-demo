import { Link } from 'react-router-dom';
import { Check, Download, Car, Home, PartyPopper } from 'lucide-react';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';

export default function QuoteSuccess() {
  const { quote } = useQuote();
  const policyNumber = 'POL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1);

  const handleRenew = () => {
    amplitude.track('Renew Policy', {
      'Cover Type': quote.coverType,
      'Policy Tier': quote.policyTier,
      'Payment Frequency': quote.paymentFrequency,
      'Quote Type': 'Renewal',
    });
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
      {/* Celebration */}
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--green-light), #A7F3D0)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem',
        animation: 'slideUp 0.5s ease',
      }}>
        <PartyPopper size={56} color="var(--green)" />
      </div>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
        You're covered!
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--gray-500)', marginBottom: '2rem' }}>
        Your {quote.coverType} car insurance policy is now active. Here are your details.
      </p>

      {/* Policy Card */}
      <div className="card" style={{
        padding: '2rem', textAlign: 'left', marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #001E62, #003399)',
        color: 'white',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.25rem' }}>Policy Number</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{policyNumber}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.375rem 0.75rem', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600 }}>
            Active
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
          <div>
            <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>Vehicle</p>
            <p style={{ fontWeight: 600 }}>{quote.year} {quote.make} {quote.model}</p>
          </div>
          <div>
            <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>Cover Type</p>
            <p style={{ fontWeight: 600 }}>{quote.coverType}</p>
          </div>
          <div>
            <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>Start Date</p>
            <p style={{ fontWeight: 600 }}>{startDate.toLocaleDateString('en-AU')}</p>
          </div>
          <div>
            <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>End Date</p>
            <p style={{ fontWeight: 600 }}>{endDate.toLocaleDateString('en-AU')}</p>
          </div>
          <div>
            <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>Premium</p>
            <p style={{ fontWeight: 600 }}>${quote.premium.toLocaleString()}/yr</p>
          </div>
          <div>
            <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>Excess</p>
            <p style={{ fontWeight: 600 }}>${quote.excess.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="card" style={{ padding: '1.5rem', textAlign: 'left', marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>What happens next</h3>
        {[
          { icon: Check, text: 'Your Certificate of Insurance has been emailed to you' },
          { icon: Check, text: 'Your policy starts immediately — you\'re covered from now' },
          { icon: Check, text: 'You can manage your policy anytime from your account dashboard' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <item.icon size={14} color="var(--green)" />
            </div>
            {item.text}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => alert('PDS downloaded (demo)')}>
          <Download size={16} /> Download PDS
        </button>
        <Link to="/account" className="btn btn-secondary" style={{ flex: 1 }}>
          Go to My Account
        </Link>
      </div>

      {/* Cross-sell */}
      <div className="card" style={{ padding: '1.5rem', background: 'var(--gray-50)' }}>
        <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>Bundle and save more</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
          Add another policy and save an extra 10% on both.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/quote/start" className="btn btn-outline btn-sm">
            <Car size={16} /> Add Another Vehicle
          </Link>
          <Link to="/quote/start" className="btn btn-outline btn-sm">
            <Home size={16} /> Bundle Home Insurance
          </Link>
        </div>
      </div>

      {/* Renewal Simulation */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#FEF3C7', borderRadius: 12, textAlign: 'left' }}>
        <p style={{ fontWeight: 700, color: '#92400E', marginBottom: '0.5rem' }}>
          Demo: Simulate Renewal Flow
        </p>
        <p style={{ fontSize: '0.85rem', color: '#92400E', marginBottom: '0.75rem' }}>
          In the real flow, this would fire 12 months after purchase. Click below to simulate.
        </p>
        <button className="btn btn-yellow btn-sm" onClick={handleRenew}>
          Simulate Renewal (fires "Renew Policy" event)
        </button>
      </div>
    </div>
  );
}
