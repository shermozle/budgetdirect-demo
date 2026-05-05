import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, AlertCircle, Gift, Clock, Check } from 'lucide-react';
import amplitude from '../utils/amplitude';

const initialNotifications = [
  {
    id: 1,
    type: 'renewal',
    title: 'Your car insurance renewal is in 30 days',
    desc: 'Your policy POL-A8F3K2 is due for renewal on 15 Jan 2027. Review your cover and renew online.',
    time: '2 hours ago',
    read: false,
    icon: Clock,
    color: '#F59E0B',
  },
  {
    id: 2,
    type: 'claim',
    title: 'Your claim CLM-001 has been approved',
    desc: 'Your windscreen replacement claim has been approved. Payment of $385 will be processed within 3 business days.',
    time: '1 day ago',
    read: false,
    icon: Check,
    color: '#059669',
  },
  {
    id: 3,
    type: 'offer',
    title: 'New discount available: Bundle & Save 15%',
    desc: 'Add home insurance to your car policy and save 15% on both. Limited time offer.',
    time: '3 days ago',
    read: false,
    icon: Gift,
    color: '#E30613',
  },
  {
    id: 4,
    type: 'info',
    title: 'Policy document updated',
    desc: 'Your Product Disclosure Statement has been updated. View the latest version in your account.',
    time: '1 week ago',
    read: true,
    icon: AlertCircle,
    color: '#6B7280',
  },
  {
    id: 5,
    type: 'payment',
    title: 'Payment received — thank you!',
    desc: 'Your monthly payment of $138.50 for policy POL-A8F3K2 has been successfully processed.',
    time: '2 weeks ago',
    read: true,
    icon: Check,
    color: '#059669',
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    amplitude.track('Receive Renewal Notice', {
      'Communication Channel': 'Web',
      'Policy Tier': 'Gold',
    });
  }, []);

  const handleClick = (notif: typeof initialNotifications[0]) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    if (notif.type === 'renewal') {
      amplitude.track('View Renewal Notice', {
        'Communication Channel': 'Web',
        'Policy Tier': 'Gold',
      });
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container" style={{ maxWidth: 700, padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)' }}>
            <Bell size={24} style={{ verticalAlign: -5, marginRight: 8 }} />
            Notifications
          </h1>
          <p style={{ color: 'var(--gray-500)', marginTop: '0.25rem' }}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/account" className="btn btn-outline btn-sm">Back to Account</Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleClick(notif)}
            className="card"
            style={{
              cursor: 'pointer',
              display: 'flex',
              gap: '1rem',
              alignItems: 'start',
              padding: '1.25rem',
              background: notif.read ? 'var(--white)' : '#FEF2F2',
              border: notif.read ? '1px solid var(--gray-200)' : '1px solid var(--red)',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: `${notif.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <notif.icon size={18} color={notif.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)' }}>{notif.title}</p>
                {!notif.read && (
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', flexShrink: 0,
                  }} />
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>{notif.desc}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '0.375rem' }}>{notif.time}</p>
            </div>
            <ChevronRight size={16} color="var(--gray-300)" style={{ marginTop: 4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
