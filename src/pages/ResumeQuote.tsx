import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Car, ArrowRight } from 'lucide-react';
import amplitude from '../utils/amplitude';
import { useQuote } from '../context/QuoteContext';

export default function ResumeQuote() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { quote } = useQuote();
  const quoteId = searchParams.get('id') || quote.quoteId;

  useEffect(() => {
    amplitude.track('Resume Saved Quote', {
      'Quote Validity': '30 days',
      'Policy Tier': quote.policyTier,
      'Payment Frequency': quote.paymentFrequency,
    });
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: '#FEF3C7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
        }}>
          <Clock size={36} color="#F59E0B" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
          Welcome back!
        </h1>
        <p style={{ color: 'var(--gray-500)', fontSize: '1.05rem' }}>
          We saved your quote. Pick up right where you left off.
        </p>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: '#FEE2E2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Car size={24} color="var(--red)" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)' }}>Car Insurance Quote</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Quote ID: {quoteId}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <div><span style={{ color: 'var(--gray-400)' }}>Vehicle:</span> {quote.year} {quote.make} {quote.model}</div>
          <div><span style={{ color: 'var(--gray-400)' }}>Cover:</span> {quote.coverType}</div>
          <div><span style={{ color: 'var(--gray-400)' }}>Driver age:</span> {quote.driverAge}</div>
          <div><span style={{ color: 'var(--gray-400)' }}>Location:</span> {quote.suburb}</div>
        </div>

        <div style={{
          background: 'var(--gray-50)', padding: '1rem', borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem',
        }}>
          <Clock size={16} color="var(--gray-400)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
            This quote is valid for 30 days. Saved on {new Date(Date.now() - 5 * 86400000).toLocaleDateString('en-AU')}.
          </span>
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => navigate('/quote/vehicle')} style={{ width: '100%' }}>
          Continue My Quote <ArrowRight size={18} />
        </button>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => navigate('/quote/start')} style={{
          background: 'none', border: 'none', color: 'var(--red)',
          fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
        }}>
          Start a new quote instead
        </button>
      </div>
    </div>
  );
}
