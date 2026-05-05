import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Car } from 'lucide-react';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';
import StepIndicator from '../components/StepIndicator';

const makes = ['Toyota', 'Mazda', 'Hyundai', 'Ford', 'Holden', 'Kia', 'Mitsubishi', 'Subaru', 'Nissan', 'Honda'];
const models: Record<string, string[]> = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'HiLux', 'Yaris', 'LandCruiser'],
  Mazda: ['CX-5', 'Mazda3', 'CX-3', 'CX-9', 'MX-5', 'BT-50'],
  Hyundai: ['Tucson', 'i30', 'Kona', 'Santa Fe', 'i20', 'Venue'],
  Ford: ['Ranger', 'Everest', 'Escape', 'Mustang', 'Focus', 'Puma'],
  Holden: ['Commodore', 'Colorado', 'Astra', 'Captiva', 'Trax'],
  Kia: ['Cerato', 'Sportage', 'Seltos', 'Carnival', 'Picanto'],
  Mitsubishi: ['Outlander', 'ASX', 'Triton', 'Eclipse Cross', 'Pajero Sport'],
  Subaru: ['Forester', 'Outback', 'XV', 'Impreza', 'WRX', 'BRZ'],
  Nissan: ['X-Trail', 'Qashqai', 'Navara', 'Patrol', 'Juke', 'Leaf'],
  Honda: ['CR-V', 'Civic', 'HR-V', 'Jazz', 'Accord', 'City'],
};
const years = Array.from({ length: 15 }, (_, i) => String(2026 - i));

const variants = ['Control', 'Treatment A', 'Treatment B'];

export default function QuoteStart() {
  const navigate = useNavigate();
  const { quote, updateQuote } = useQuote();
  const [mode, setMode] = useState<'rego' | 'manual'>('rego');
  const [rego, setRego] = useState('');
  const [make, setMake] = useState(quote.make);
  const [model, setModel] = useState(quote.model);
  const [year, setYear] = useState(quote.year);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const abVariant = variants[Math.floor(Math.random() * variants.length)];

    updateQuote({
      rego: mode === 'rego' ? rego : '',
      make,
      model,
      year,
      abVariant,
    });

    const id = new amplitude.Identify();
    id.set('utm_campaign', 'car_insurance_2024');
    id.set('utm_source', 'google');
    id.set('utm_medium', 'cpc');
    id.set('utm_term', 'cheap car insurance australia');
    id.set('utm_content', 'hero_cta');
    id.set('A/B Testing', abVariant);
    id.set('Driver Risk Profile', 'Standard');
    id.set('Marketing Consent', true);
    id.set('Customer Segment', 'New Customer');
    id.set('First Quote Date', new Date().toISOString().slice(0, 10));
    id.set('Vehicle Value', '$20,000 - $35,000');
    id.set('Saved Quote Status', 'No Saved Quote');
    amplitude.identify(id);

    amplitude.setGroup('Org Id', 'ORG-BD-00142');

    amplitude.track('Start Quote', {
      'Cover Type': 'Comprehensive',
      'Policy Tier': 'Gold',
    });

    navigate('/quote/vehicle');
  };

  const handleSaveForLater = () => {
    amplitude.track('Save Quote for Later', {
      'Policy Tier': 'Gold',
      'Quote Validity': '30 days',
      'Quote Channel': 'Web',
    });
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <StepIndicator current={1} />

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#FEE2E2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
        }}>
          <Car size={32} color="var(--red)" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)' }}>
          Let's start your car insurance quote
        </h1>
        <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>
          It only takes about 4 minutes. You can save and come back any time.
        </p>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          background: 'var(--gray-100)',
          borderRadius: 8,
          padding: '0.25rem',
        }}>
          <button
            onClick={() => setMode('rego')}
            style={{
              flex: 1,
              padding: '0.625rem',
              borderRadius: 6,
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: mode === 'rego' ? 'var(--white)' : 'transparent',
              color: mode === 'rego' ? 'var(--navy)' : 'var(--gray-500)',
              boxShadow: mode === 'rego' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <Search size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
            Rego Lookup
          </button>
          <button
            onClick={() => setMode('manual')}
            style={{
              flex: 1,
              padding: '0.625rem',
              borderRadius: 6,
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: mode === 'manual' ? 'var(--white)' : 'transparent',
              color: mode === 'manual' ? 'var(--navy)' : 'var(--gray-500)',
              boxShadow: mode === 'manual' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Manual Entry
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'rego' ? (
            <div className="form-group">
              <label>Registration Number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. ABC123"
                  value={rego}
                  onChange={(e) => setRego(e.target.value.toUpperCase())}
                  style={{ textTransform: 'uppercase', paddingLeft: '2.75rem' }}
                />
                <Search size={18} color="var(--gray-400)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.375rem' }}>
                We'll look up your vehicle details automatically
              </p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Make</label>
                <select value={make} onChange={(e) => { setMake(e.target.value); setModel(models[e.target.value]?.[0] || ''); }}>
                  {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Model</label>
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                  {(models[make] || []).map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </>
          )}

          <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
            Continue
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={handleSaveForLater}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gray-500)',
              fontSize: '0.9rem',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            I'll do this later
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: 'center',
        marginTop: '1.5rem',
        color: 'var(--gray-400)',
        fontSize: '0.85rem',
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'var(--green-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '1.1rem' }}>🔒</span>
        </div>
        Your details are secure and encrypted
      </div>
    </div>
  );
}
