import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, Shield, Plus } from 'lucide-react';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';
import StepIndicator from '../components/StepIndicator';

const coverTiers = [
  {
    name: 'Comprehensive',
    tier: 'Gold',
    price: '$1,847/yr',
    monthly: '$158/mo',
    popular: true,
    features: ['Damage to your car', 'Damage to other vehicles/property', 'Fire & theft', 'Storm & flood', 'Windscreen', 'New for old replacement (< 2yrs)', 'Agreed value', 'Choice of repairer'],
  },
  {
    name: 'Third Party Fire & Theft',
    tier: 'Silver',
    price: '$684/yr',
    monthly: '$59/mo',
    popular: false,
    features: ['Damage to other vehicles/property', 'Fire & theft', 'Up to $5,000 for uninsured driver damage'],
  },
  {
    name: 'Third Party Property',
    tier: 'Bronze',
    price: '$412/yr',
    monthly: '$36/mo',
    popular: false,
    features: ['Damage to other vehicles/property', 'Up to $5,000 for uninsured driver damage'],
  },
];

const extras = [
  { name: 'Roadside Assistance', price: '$89/yr', type: 'Roadside' },
  { name: 'Hire Car after Accident', price: '$145/yr', type: 'Hire Car' },
  { name: 'Windscreen Replacement', price: '$65/yr', type: 'Windscreen' },
];

export default function QuoteCover() {
  const navigate = useNavigate();
  const { quote, updateQuote } = useQuote();
  const [selectedCover, setSelectedCover] = useState(0);
  const [excess, setExcess] = useState(quote.excess);
  const [expandedTier, setExpandedTier] = useState<number | null>(null);
  const [comparisonViewed, setComparisonViewed] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const handleToggleComparison = (idx: number) => {
    if (expandedTier === idx) {
      setExpandedTier(null);
    } else {
      setExpandedTier(idx);
      if (!comparisonViewed) {
        setComparisonViewed(true);
        amplitude.track('Compare Cover Levels', {
          'Comparison Source': 'Cover Selection Page',
          'Cover Difference': `${coverTiers[0].name} vs ${coverTiers[idx].name}`,
        });
      }
    }
  };

  const handleToggleExtra = (extra: typeof extras[0]) => {
    const isSelected = selectedExtras.includes(extra.name);
    if (isSelected) {
      setSelectedExtras(selectedExtras.filter((n) => n !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra.name]);
      amplitude.track('Add Optional Extras', {
        'Extra Type': extra.type,
        'Extra Bundle': selectedExtras.length >= 1 ? 'Bundle' : 'Single',
      });
    }
  };

  const handleContinue = () => {
    const tier = coverTiers[selectedCover];
    updateQuote({
      coverType: tier.name,
      policyTier: tier.tier,
      excess,
      extras: selectedExtras,
    });
    amplitude.track('Select Cover Options', {
      'Cover Type': tier.name,
      'Policy Tier': tier.tier,
    });
    navigate('/quote/review');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <StepIndicator current={3} />
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem', textAlign: 'center' }}>
        Choose your cover level
      </h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: '2rem', textAlign: 'center' }}>
        Compare cover options to find the right fit for you.
      </p>

      {/* Cover Tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {coverTiers.map((tier, i) => (
          <div key={tier.name} className="card" style={{
            border: selectedCover === i ? '2px solid var(--red)' : '2px solid var(--gray-200)',
            cursor: 'pointer',
            position: 'relative',
            padding: '1.5rem',
          }} onClick={() => setSelectedCover(i)}>
            {tier.popular && (
              <div style={{
                position: 'absolute',
                top: -12,
                right: 16,
                background: 'var(--yellow)',
                color: 'var(--navy)',
                padding: '0.25rem 0.75rem',
                borderRadius: 12,
                fontSize: '0.75rem',
                fontWeight: 700,
              }}>
                Most Popular
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: selectedCover === i ? '2px solid var(--red)' : '2px solid var(--gray-300)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selectedCover === i && <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--red)' }} />}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem' }}>{tier.name}</h3>
            </div>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)' }}>{tier.price}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>or {tier.monthly}</p>

            <button
              onClick={(e) => { e.stopPropagation(); handleToggleComparison(i); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--red)',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginTop: '1rem',
                cursor: 'pointer',
              }}
            >
              What's included {expandedTier === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {expandedTier === i && (
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)' }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                    <Check size={14} color="var(--green)" /> {f}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Excess Slider */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '1rem' }}>
          <Shield size={18} style={{ verticalAlign: -3, marginRight: 6 }} />
          Choose your excess
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
          A higher excess means lower premiums. Choose what works for your budget.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[500, 850, 1500].map((val) => (
            <button key={val} onClick={() => setExcess(val)} style={{
              flex: 1,
              padding: '1rem',
              borderRadius: 8,
              border: excess === val ? '2px solid var(--red)' : '2px solid var(--gray-200)',
              background: excess === val ? '#FEF2F2' : 'var(--white)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: excess === val ? 'var(--red)' : 'var(--gray-600)',
              cursor: 'pointer',
            }}>
              ${val.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Optional Extras */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '1rem' }}>
          Optional Extras
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {extras.map((extra) => {
            const isSelected = selectedExtras.includes(extra.name);
            return (
              <div key={extra.name} onClick={() => handleToggleExtra(extra)} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: 8,
                border: isSelected ? '2px solid var(--green)' : '2px solid var(--gray-200)',
                background: isSelected ? 'var(--green-light)' : 'var(--white)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {isSelected ? <Check size={18} color="var(--green)" /> : <Plus size={18} color="var(--gray-400)" />}
                  <span style={{ fontWeight: 600 }}>{extra.name}</span>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{extra.price}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-outline" onClick={() => navigate('/quote/driver')} style={{ flex: 1 }}>
          Back
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleContinue} style={{ flex: 2 }}>
          Continue to Your Quote
        </button>
      </div>
    </div>
  );
}
