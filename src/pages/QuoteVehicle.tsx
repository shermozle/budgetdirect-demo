import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';
import StepIndicator from '../components/StepIndicator';

export default function QuoteVehicle() {
  const navigate = useNavigate();
  const { quote, updateQuote } = useQuote();
  const [usage, setUsage] = useState(quote.usage);
  const [kms, setKms] = useState(quote.kmsPerYear);
  const [parking, setParking] = useState(quote.parking);
  const [security, setSecurity] = useState(quote.security);
  const [modifications, setModifications] = useState('None');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuote({ usage, kmsPerYear: kms, parking, security });
    amplitude.track('Add Vehicle Details', {
      'Cover Type': quote.coverType,
      'Policy Tier': quote.policyTier,
    });
    navigate('/quote/driver');
  };

  const handleSave = () => {
    amplitude.track('Save Quote for Later', { 'Policy Tier': quote.policyTier, 'Quote Validity': '30 days', 'Quote Channel': 'Web' });
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <StepIndicator current={1} />
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
        Tell us about your {quote.year} {quote.make} {quote.model}
      </h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>
        A few more details about your vehicle helps us get you the best price.
      </p>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          background: 'var(--gray-50)',
          borderRadius: 8,
          marginBottom: '1.5rem',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 8, background: 'var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '1.25rem',
          }}>
            🚗
          </div>
          <div>
            <p style={{ fontWeight: 700 }}>{quote.year} {quote.make} {quote.model}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Registration: {quote.rego || 'Not provided'}</p>
          </div>
        </div>

        <form onSubmit={handleContinue}>
          <div className="form-group">
            <label>How is the vehicle used?</label>
            <select value={usage} onChange={(e) => setUsage(e.target.value)}>
              <option>Private</option>
              <option>Business</option>
              <option>Rideshare</option>
            </select>
          </div>
          <div className="form-group">
            <label>Estimated kilometres per year</label>
            <select value={kms} onChange={(e) => setKms(e.target.value)}>
              <option>Under 5,000</option>
              <option>5,000 - 10,000</option>
              <option>10,000 - 15,000</option>
              <option>15,000 - 20,000</option>
              <option>20,000 - 30,000</option>
              <option>30,000+</option>
            </select>
          </div>
          <div className="form-group">
            <label>Where is it usually parked at night?</label>
            <select value={parking} onChange={(e) => setParking(e.target.value)}>
              <option>Garage</option>
              <option>Carport</option>
              <option>Driveway</option>
              <option>Street</option>
              <option>Secure car park</option>
            </select>
          </div>
          <div className="form-group">
            <label>Security features</label>
            <select value={security} onChange={(e) => setSecurity(e.target.value)}>
              <option>Factory immobiliser</option>
              <option>Aftermarket alarm</option>
              <option>Steering lock</option>
              <option>GPS tracker</option>
              <option>None</option>
            </select>
          </div>
          <div className="form-group">
            <label>Any modifications?</label>
            <select value={modifications} onChange={(e) => setModifications(e.target.value)}>
              <option>None</option>
              <option>Cosmetic only</option>
              <option>Performance</option>
              <option>Lift kit / suspension</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/quote/start')} style={{ flex: 1 }}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              Continue
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={handleSave} style={{ background: 'none', border: 'none', color: 'var(--gray-500)', fontSize: '0.9rem', textDecoration: 'underline', cursor: 'pointer' }}>
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
