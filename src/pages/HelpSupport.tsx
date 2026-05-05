import { useState } from 'react';
import { Phone, MessageCircle, Mail, ChevronDown, ChevronUp, Send } from 'lucide-react';
import amplitude from '../utils/amplitude';

const faqs = [
  { q: 'How do I make a claim?', a: 'You can make a claim online through your account dashboard, or call us on 1800 Budget. Have your policy number ready and details of the incident.' },
  { q: 'Can I change my cover level?', a: 'Yes, you can upgrade or downgrade your cover at any time through your account. Changes take effect immediately and your premium will be adjusted.' },
  { q: 'What does my excess mean?', a: 'Your excess is the amount you pay towards a claim. A higher excess means a lower premium. You can adjust your excess when getting a quote or through your account.' },
  { q: 'How do I add another driver?', a: 'Log into your account, select your policy, and click "Manage drivers". You can add or remove drivers at any time.' },
  { q: 'What\'s the difference between agreed and market value?', a: 'Agreed value means we pay you a set amount if your car is written off. Market value means we pay the current market price. Agreed value gives you certainty.' },
  { q: 'How do I cancel my policy?', a: 'You can cancel anytime by calling us or through your account. If you cancel within the cooling-off period (21 days), you\'ll get a full refund.' },
];

export default function HelpSupport() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', time: 'Morning' });
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [showCallbackSuccess, setShowCallbackSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'callback'>('contact');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    amplitude.track('Contact Customer Service');
    setShowContactSuccess(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setShowContactSuccess(false), 4000);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    amplitude.track('Request Callback', { 'Policy Tier': 'Gold' });
    setShowCallbackSuccess(true);
    setCallbackForm({ name: '', phone: '', time: 'Morning' });
    setTimeout(() => setShowCallbackSuccess(false), 4000);
  };

  return (
    <div className="container" style={{ maxWidth: 900, padding: '2rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)' }}>Help & Support</h1>
        <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>
          We're here to help. Find answers below or get in touch with our team.
        </p>
      </div>

      {/* Quick Contact Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { icon: Phone, label: 'Call Us', detail: '1800 Budget (283 438)', color: 'var(--red)' },
          { icon: MessageCircle, label: 'Live Chat', detail: 'Available 8am-8pm AEST', color: 'var(--navy)' },
          { icon: Mail, label: 'Email Us', detail: 'support@budgetdirect.com.au', color: '#059669' },
        ].map((item, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '1.5rem', cursor: 'pointer' }}
            onClick={() => { amplitude.track('Contact Customer Service'); }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: `${item.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem',
            }}>
              <item.icon size={22} color={item.color} />
            </div>
            <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.25rem' }}>{item.label}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{item.detail}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
        Frequently Asked Questions
      </h2>
      <div style={{ marginBottom: '2.5rem' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            borderBottom: '1px solid var(--gray-100)',
          }}>
            <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 0', background: 'none', border: 'none', textAlign: 'left',
              fontWeight: 600, color: 'var(--navy)', fontSize: '1rem',
            }}>
              {faq.q}
              {expandedFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {expandedFaq === i && (
              <p style={{ padding: '0 0 1rem', color: 'var(--gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Contact / Callback Forms */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
        Get in Touch
      </h2>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{
          display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
          background: 'var(--gray-100)', borderRadius: 8, padding: '0.25rem',
        }}>
          {(['contact', 'callback'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '0.625rem', borderRadius: 6, border: 'none',
              fontWeight: 600, fontSize: '0.9rem',
              background: activeTab === tab ? 'var(--white)' : 'transparent',
              color: activeTab === tab ? 'var(--navy)' : 'var(--gray-500)',
              boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              textTransform: 'capitalize',
            }}>
              {tab === 'contact' ? 'Send Message' : 'Request Callback'}
            </button>
          ))}
        </div>

        {activeTab === 'contact' ? (
          showContactSuccess ? (
            <div className="success-message">Thanks for your message! We'll get back to you within 24 hours.</div>
          ) : (
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={4} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required placeholder="How can we help?" style={{ resize: 'vertical' }} />
              </div>
              <button className="btn btn-primary" type="submit">
                <Send size={16} /> Send Message
              </button>
            </form>
          )
        ) : (
          showCallbackSuccess ? (
            <div className="success-message">We'll call you back at your preferred time. Speak soon!</div>
          ) : (
            <form onSubmit={handleCallbackSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={callbackForm.name} onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })} required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input type="tel" value={callbackForm.phone} onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })} required placeholder="04XX XXX XXX" />
              </div>
              <div className="form-group">
                <label>Preferred time</label>
                <select value={callbackForm.time} onChange={(e) => setCallbackForm({ ...callbackForm, time: e.target.value })}>
                  <option>Morning (8am-12pm)</option>
                  <option>Afternoon (12pm-5pm)</option>
                  <option>Evening (5pm-8pm)</option>
                </select>
              </div>
              <button className="btn btn-primary" type="submit">
                <Phone size={16} /> Schedule Callback
              </button>
            </form>
          )
        )}
      </div>

      {/* Chat Widget Mock */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 999,
      }}>
        <button onClick={() => amplitude.track('Contact Customer Service')} style={{
          width: 56, height: 56, borderRadius: '50%', background: 'var(--red)',
          border: 'none', color: 'white', display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: '0 4px 16px rgba(227, 6, 19, 0.4)',
          cursor: 'pointer', transition: 'transform 0.2s',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
}
