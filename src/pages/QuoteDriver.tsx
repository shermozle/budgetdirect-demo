import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';
import StepIndicator from '../components/StepIndicator';

export default function QuoteDriver() {
  const navigate = useNavigate();
  const { quote, updateQuote } = useQuote();
  const [driverAge, setDriverAge] = useState(quote.driverAge);
  const [licenceType, setLicenceType] = useState(quote.licenceType);
  const [ncdYears, setNcdYears] = useState(quote.ncdYears);
  const [claimsHistory, setClaimsHistory] = useState(quote.claimsHistory);
  const [postcode, setPostcode] = useState(quote.postcode);
  const [suburb, setSuburb] = useState(quote.suburb);
  const [additionalDrivers, setAdditionalDrivers] = useState('0');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuote({ driverAge, licenceType, ncdYears, claimsHistory, postcode, suburb });

    const id = new amplitude.Identify();
    id.set('Age', driverAge);
    id.set('No Claims Discount Years', ncdYears);
    id.set('Policy Term', '12 months');
    amplitude.identify(id);

    amplitude.track('Add Driver Details', {
      'Cover Type': quote.coverType,
      'Policy Tier': quote.policyTier,
    });
    navigate('/quote/cover');
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <StepIndicator current={2} />
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
        About you and your drivers
      </h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>
        Tell us about the main driver and anyone else who'll be behind the wheel.
      </p>

      <div className="card" style={{ padding: '2rem' }}>
        <form onSubmit={handleContinue}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
            Main Driver
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Age</label>
              <select value={driverAge} onChange={(e) => setDriverAge(e.target.value)}>
                {Array.from({ length: 63 }, (_, i) => String(i + 18)).map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Licence type</label>
              <select value={licenceType} onChange={(e) => setLicenceType(e.target.value)}>
                <option>Full</option>
                <option>Provisional (P2)</option>
                <option>Provisional (P1)</option>
                <option>Learner</option>
                <option>International</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>No Claims Discount years</label>
            <select value={ncdYears} onChange={(e) => setNcdYears(e.target.value)}>
              <option>None</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </select>
          </div>

          <div className="form-group">
            <label>Claims history (last 5 years)</label>
            <select value={claimsHistory} onChange={(e) => setClaimsHistory(e.target.value)}>
              <option>No claims</option>
              <option>1 at-fault claim</option>
              <option>2+ at-fault claims</option>
              <option>Not-at-fault claims only</option>
            </select>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', margin: '1.5rem 0 1rem' }}>
            Your Address
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Postcode</label>
              <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g. 2000" maxLength={4} />
            </div>
            <div className="form-group">
              <label>Suburb</label>
              <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} placeholder="e.g. Sydney" />
            </div>
          </div>

          <div className="form-group">
            <label>Additional drivers</label>
            <select value={additionalDrivers} onChange={(e) => setAdditionalDrivers(e.target.value)}>
              <option value="0">No additional drivers</option>
              <option value="1">1 additional driver</option>
              <option value="2">2 additional drivers</option>
              <option value="3">3+ additional drivers</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/quote/vehicle')} style={{ flex: 1 }}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
