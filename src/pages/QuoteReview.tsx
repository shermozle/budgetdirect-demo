import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Tag, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';
import StepIndicator from '../components/StepIndicator';

export default function QuoteReview() {
  const navigate = useNavigate();
  const { quote, updateQuote } = useQuote();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [premium, setPremium] = useState(quote.premium);

  useEffect(() => {
    amplitude.track('View Premium Quote', {
      'Policy Tier': quote.policyTier,
      'Communication Channel': 'Web',
    });

    const timer = setTimeout(() => {
      if (quote.abVariant === 'Treatment B' || quote.abVariant === 'Control' || quote.abVariant === 'Treatment A') {
        setShowModal(true);
        amplitude.track('View Discount Offer', { 'Offer Type': 'Multi-Policy Bundle' });
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const applyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
      const newPremium = Math.round(premium * 0.9);
      setPremium(newPremium);
      updateQuote({ premium: newPremium });
      amplitude.track('Apply Discount Code', {
        'Cover Type': quote.coverType,
        'Policy Tier': quote.policyTier,
      });
    }
  };

  const handleDismissModal = () => {
    setShowModal(false);
    amplitude.track('Dismiss Discount Offer', { 'Offer Type': 'Multi-Policy Bundle' });
  };

  const handleModalApply = () => {
    setShowModal(false);
    setDiscountCode('MULTIPOLICY10');
    setDiscountApplied(true);
    const newPremium = Math.round(premium * 0.9);
    setPremium(newPremium);
    updateQuote({ premium: newPremium });
    amplitude.track('Apply Discount Code', {
      'Cover Type': quote.coverType,
      'Policy Tier': quote.policyTier,
    });
  };

  const handleAbandon = () => {
    amplitude.track('Abandon Quote', {
      'Abandon Reason': 'Premium Too High',
      'Abandon Stage': 'Quote Review',
    });
    navigate('/');
  };

  const handleContinue = () => {
    navigate('/quote/purchase');
  };

  const monthlyPremium = Math.round(premium / 12);

  const isPreApplied = quote.abVariant === 'Treatment A';

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <StepIndicator current={4} />

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
          Your Quote
        </h1>
        <p style={{ color: 'var(--gray-500)' }}>
          Here's your personalised {quote.coverType} car insurance quote
        </p>
      </div>

      {/* Premium Display */}
      <div className="card" style={{
        textAlign: 'center',
        padding: '2.5rem 2rem',
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #FEFCE8, #FFF)',
        border: '2px solid var(--yellow)',
      }}>
        {isPreApplied && !discountApplied && (
          <div style={{
            display: 'inline-block',
            background: 'var(--green-light)',
            color: 'var(--green)',
            padding: '0.375rem 1rem',
            borderRadius: 20,
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            Multi-policy discount pre-applied!
          </div>
        )}

        {discountApplied && (
          <div style={{
            display: 'inline-block',
            background: 'var(--green-light)',
            color: 'var(--green)',
            padding: '0.375rem 1rem',
            borderRadius: 20,
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            <Check size={14} style={{ verticalAlign: -2, marginRight: 4 }} />
            10% discount applied!
          </div>
        )}

        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>
          ${premium.toLocaleString()}
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--gray-500)' }}> / year</span>
        </div>
        <p style={{ fontSize: '1.25rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
          or ${monthlyPremium} / month
        </p>

        {discountApplied && (
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', marginTop: '0.5rem', textDecoration: 'line-through' }}>
            Was ${quote.premium.toLocaleString()} / year
          </p>
        )}
      </div>

      {/* Quote Details */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 700, color: 'var(--navy)' }}>Quote Summary</h3>
          <span className="badge badge-green">{quote.coverType}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
          <div><span style={{ color: 'var(--gray-500)' }}>Vehicle:</span> {quote.year} {quote.make} {quote.model}</div>
          <div><span style={{ color: 'var(--gray-500)' }}>Driver age:</span> {quote.driverAge}</div>
          <div><span style={{ color: 'var(--gray-500)' }}>Excess:</span> ${quote.excess.toLocaleString()}</div>
          <div><span style={{ color: 'var(--gray-500)' }}>NCD:</span> {quote.ncdYears} years</div>
          <div><span style={{ color: 'var(--gray-500)' }}>Location:</span> {quote.suburb}, {quote.postcode}</div>
          <div><span style={{ color: 'var(--gray-500)' }}>Policy tier:</span> {quote.policyTier}</div>
        </div>
        {quote.extras.length > 0 && (
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)' }}>
            <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>Extras: </span>
            {quote.extras.join(', ')}
          </div>
        )}
      </div>

      {/* How we calculated */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <button onClick={() => setShowBreakdown(!showBreakdown)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          background: 'none', border: 'none', fontWeight: 700, color: 'var(--navy)', fontSize: '1rem',
        }}>
          How we calculated this
          {showBreakdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {showBreakdown && (
          <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--gray-100)' }}>
              <span>Base premium</span><span>$2,180</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--gray-100)', color: 'var(--green)' }}>
              <span>No Claims Discount ({quote.ncdYears}yr)</span><span>-$285</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--gray-100)', color: 'var(--green)' }}>
              <span>Security discount</span><span>-$48</span>
            </div>
            {discountApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--gray-100)', color: 'var(--green)' }}>
                <span>Promotional discount (10%)</span><span>-${Math.round(quote.premium * 0.1)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', fontWeight: 700, fontSize: '1.1rem' }}>
              <span>Your premium</span><span>${premium.toLocaleString()}/yr</span>
            </div>
          </div>
        )}
      </div>

      {/* Discount Code */}
      {!discountApplied && (
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Tag size={18} color="var(--red)" />
            <h3 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>Have a discount code?</h3>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="Enter code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
              style={{
                flex: 1, padding: '0.75rem 1rem', border: '2px solid var(--gray-200)',
                borderRadius: 8, fontSize: '1rem', textTransform: 'uppercase',
              }}
            />
            <button className="btn btn-primary" onClick={applyDiscount}>Apply</button>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.5rem' }}>
            Try "MULTIPOLICY10" for 10% off
          </p>
        </div>
      )}

      {/* What's included visual */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>What's included</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {[
            'Agreed value cover',
            'Roadside assistance',
            'New for old (< 2yrs)',
            'Choice of repairer',
            'Hire car after theft',
            'Personal belongings',
            'Emergency accommodation',
            'Towing after accident',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)', padding: '0.375rem 0' }}>
              <Check size={14} color="var(--green)" /> {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-outline" onClick={() => navigate('/quote/cover')} style={{ flex: 1 }}>
          Back
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleContinue} style={{ flex: 2 }}>
          Continue to Purchase
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={handleAbandon} style={{
          background: 'none', border: 'none', color: 'var(--gray-500)',
          fontSize: '0.9rem', textDecoration: 'underline', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
        }}>
          <AlertCircle size={14} /> I'll think about it
        </button>
      </div>

      {/* Discount Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleDismissModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleDismissModal}><X size={20} /></button>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: '#FEF3C7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', fontSize: '2rem',
              }}>
                💰
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                Save 10% with our multi-policy bundle!
              </h2>
              <p style={{ color: 'var(--gray-500)', marginBottom: '1.5rem' }}>
                Bundle your car and home insurance together and save 10% on both policies. That's a saving of ${Math.round(premium * 0.1)} per year!
              </p>
              <button className="btn btn-primary btn-lg" onClick={handleModalApply} style={{ width: '100%', marginBottom: '0.75rem' }}>
                Apply Bundle Discount
              </button>
              <button onClick={handleDismissModal} style={{
                background: 'none', border: 'none', color: 'var(--gray-500)',
                fontSize: '0.9rem', cursor: 'pointer',
              }}>
                No thanks, continue without discount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
