import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bell, CreditCard, FileText, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import amplitude from '../utils/amplitude';

const policies = [
  {
    type: 'Car Insurance',
    vehicle: '2022 Toyota Camry',
    policyNo: 'POL-A8F3K2',
    status: 'Active',
    renewal: '15 Jan 2027',
    daysLeft: 255,
    premium: '$1,662/yr',
    cover: 'Comprehensive',
    tier: 'Gold',
  },
  {
    type: 'Home & Contents',
    vehicle: '42 Pacific Drive, Bondi',
    policyNo: 'POL-H7D2M9',
    status: 'Active',
    renewal: '22 Mar 2027',
    daysLeft: 321,
    premium: '$1,240/yr',
    cover: 'Home & Contents',
    tier: 'Silver',
  },
];

const claims = [
  { id: 'CLM-001', date: '12 Aug 2025', type: 'Windscreen Replacement', status: 'Approved', amount: '$385' },
  { id: 'CLM-002', date: '03 Feb 2025', type: 'Minor Collision Repair', status: 'Settled', amount: '$2,150' },
];

const payments = [
  { date: '01 May 2026', amount: '$138.50', method: 'Visa ****4242', status: 'Paid' },
  { date: '01 Apr 2026', amount: '$138.50', method: 'Visa ****4242', status: 'Paid' },
  { date: '01 Mar 2026', amount: '$138.50', method: 'Visa ****4242', status: 'Paid' },
  { date: '01 Feb 2026', amount: '$138.50', method: 'Visa ****4242', status: 'Paid' },
];

export default function AccountDashboard() {
  useEffect(() => {
    amplitude.track('View Account Dashboard');
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: 1000 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)' }}>Welcome back, Sarah</h1>
        <p style={{ color: 'var(--gray-500)' }}>Here's an overview of your insurance policies and account.</p>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/quote/start" className="btn btn-primary btn-sm">Get New Quote</Link>
        <Link to="/help" className="btn btn-outline btn-sm">Make a Claim</Link>
        <Link to="/account/notifications" className="btn btn-outline btn-sm">
          <Bell size={14} /> Notifications
          <span style={{
            background: 'var(--red)', color: 'white', borderRadius: '50%',
            width: 20, height: 20, display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, marginLeft: 4,
          }}>3</span>
        </Link>
      </div>

      {/* Policies */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
        <Shield size={20} style={{ verticalAlign: -4, marginRight: 8 }} />
        Your Policies
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {policies.map((p) => (
          <div key={p.policyNo} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--navy)' }}>{p.type}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{p.vehicle}</p>
              </div>
              <span className="badge badge-green">{p.status}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--gray-400)' }}>Policy:</span> {p.policyNo}</div>
              <div><span style={{ color: 'var(--gray-400)' }}>Cover:</span> {p.cover}</div>
              <div><span style={{ color: 'var(--gray-400)' }}>Premium:</span> {p.premium}</div>
              <div><span style={{ color: 'var(--gray-400)' }}>Tier:</span> {p.tier}</div>
            </div>
            <div style={{
              marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Clock size={14} color="var(--gray-400)" />
                <span style={{ color: 'var(--gray-500)' }}>Renews {p.renewal}</span>
                <span className="badge badge-yellow">{p.daysLeft} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Claims */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
        <FileText size={20} style={{ verticalAlign: -4, marginRight: 8 }} />
        Recent Claims
      </h2>
      <div className="card" style={{ marginBottom: '2rem', padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Claim ID</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Type</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id} style={{ borderTop: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{c.id}</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--gray-500)' }}>{c.date}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{c.type}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span className={`badge ${c.status === 'Approved' ? 'badge-green' : 'badge-yellow'}`}>{c.status}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600 }}>{c.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payments */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
        <CreditCard size={20} style={{ verticalAlign: -4, marginRight: 8 }} />
        Payment History
      </h2>
      <div className="card" style={{ marginBottom: '2rem', padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Method</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} style={{ borderTop: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--gray-500)' }}>{p.date}</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{p.amount}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{p.method}</td>
                <td style={{ padding: '0.75rem 1rem' }}><span className="badge badge-green">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Links */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/account/notifications" className="card" style={{
          flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          textDecoration: 'none', color: 'var(--gray-700)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={18} color="var(--red)" /> Manage Notifications
          </div>
          <ChevronRight size={16} color="var(--gray-400)" />
        </Link>
        <Link to="/help" className="card" style={{
          flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          textDecoration: 'none', color: 'var(--gray-700)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={18} color="var(--red)" /> Help & Support
          </div>
          <ChevronRight size={16} color="var(--gray-400)" />
        </Link>
      </div>
    </div>
  );
}
