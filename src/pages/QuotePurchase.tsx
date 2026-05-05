import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Check } from 'lucide-react';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';
import StepIndicator from '../components/StepIndicator';

export default function QuotePurchase() {
  const navigate = useNavigate();
  const { quote, updateQuote } = useQuote();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [frequency, setFrequency] = useState(quote.paymentFrequency);
  const [processing, setProcessing] = useState(false);

  const monthlyPremium = Math.round(quote.premium / 12);
  const displayPremium = frequency === 'Annual' ? quote.premium : monthlyPremium;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    updateQuote({ paymentFrequency: frequency });

    amplitude.setGroup('Opportunity Id', 'OPP-BD-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    amplitude.track('Purchase Policy', {
      'Cover Type': quote.coverType,
      'Policy Tier': quote.policyTier,
      'Payment Frequency': frequency,
      'Quote Type': 'New Business',
    });

    setTimeout(() => {
      navigate('/quote/success');
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <StepIndicator current={4} />

      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem', textAlign: 'center' }}>
        Complete Your Purchase
      </h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: '2rem', textAlign: 'center' }}>
        You're almost there! Just a few more details to get you covered.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>
        {/* Payment Form */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <CreditCard size={22} color="var(--navy)" />
            <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--navy)' }}>Payment Details</h2>
          </div>

          {/* Frequency Toggle */}
          <div style={{
            display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
            background: 'var(--gray-100)', borderRadius: 8, padding: '0.25rem',
          }}>
            {['Annual', 'Monthly'].map((f) => (
              <button key={f} onClick={() => setFrequency(f)} style={{
                flex: 1, padding: '0.625rem', borderRadius: 6, border: 'none',
                fontWeight: 600, fontSize: '0.9rem',
                background: frequency === f ? 'var(--white)' : 'transparent',
                color: frequency === f ? 'var(--navy)' : 'var(--gray-500)',
                boxShadow: frequency === f ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}>
                {f === 'Annual' ? `$${quote.premium.toLocaleString()}/yr` : `$${monthlyPremium}/mo`}
              </button>
            ))}
          </div>

          <form onSubmit={handlePurchase}>
            <div className="form-group">
              <label>Name on card</label>
              <input type="text" placeholder="John Smith" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Card number</label>
              <input type="text" placeholder="4242 4242 4242 4242" value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                maxLength={19} required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Expiry</label>
                <input type="text" placeholder="MM/YY" value={expiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
                    setExpiry(val.substring(0, 5));
                  }}
                  maxLength={5} required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                  maxLength={3} required
                />
              </div>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--gray-50)', padding: '0.75rem', borderRadius: 8, marginBottom: '1.5rem',
              fontSize: '0.8rem', color: 'var(--gray-500)',
            }}>
              <Lock size={14} /> Your payment details are securely encrypted. This is a demo — no real charges.
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/quote/review')} style={{ flex: 1 }}>
                Back
              </button>
              <button type="submit" className="btn btn-primary btn-lg" disabled={processing} style={{ flex: 2, opacity: processing ? 0.7 : 1 }}>
                {processing ? 'Processing...' : `Confirm & Pay $${displayPremium.toLocaleString()}${frequency === 'Annual' ? '/yr' : '/mo'}`}
              </button>
            </div>
          </form>
        </div>

        {/* Policy Summary Sidebar */}
        <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: 88 }}>
          <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem', fontSize: '1rem' }}>Policy Summary</h3>
          <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-500)' }}>Vehicle</span>
              <span style={{ fontWeight: 600 }}>{quote.year} {quote.make} {quote.model}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-500)' }}>Cover</span>
              <span style={{ fontWeight: 600 }}>{quote.coverType}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-500)' }}>Tier</span>
              <span className="badge badge-green">{quote.policyTier}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-500)' }}>Excess</span>
              <span style={{ fontWeight: 600 }}>${quote.excess.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-500)' }}>Driver</span>
              <span style={{ fontWeight: 600 }}>{quote.driverAge}yo, {quote.ncdYears} NCD</span>
            </div>
            {quote.extras.length > 0 && (
              <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--gray-100)' }}>
                <span style={{ color: 'var(--gray-500)' }}>Extras:</span>
                {quote.extras.map((e) => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                    <Check size={12} color="var(--green)" /> {e}
                  </div>
                ))}
              </div>
            )}
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)', marginTop: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)' }}>
                <span>Total</span>
                <span>${quote.premium.toLocaleString()}/yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 360px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
