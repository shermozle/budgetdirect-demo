import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Home, Plane, PawPrint, Bike, Heart, Shield, Clock, DollarSign, Star, MessageCircle, Phone } from 'lucide-react';
import amplitude from '../utils/amplitude';

const products = [
  { name: 'Car Insurance', icon: Car, desc: 'Save up to 30% on comprehensive cover', color: '#E30613' },
  { name: 'Home & Contents', icon: Home, desc: 'Protect what matters most', color: '#001E62' },
  { name: 'Travel Insurance', icon: Plane, desc: 'Cover for your next adventure', color: '#0891B2' },
  { name: 'Pet Insurance', icon: PawPrint, desc: 'Keep your furry friends covered', color: '#7C3AED' },
  { name: 'Bike Insurance', icon: Bike, desc: 'Two-wheel protection', color: '#059669' },
  { name: 'Life Insurance', icon: Heart, desc: 'Peace of mind for your family', color: '#DB2777' },
];

const testimonials = [
  { name: 'Sarah M.', location: 'Sydney, NSW', text: "Saved $400 on my car insurance compared to my old provider. The online quote took less than 5 minutes!", avatar: 'S' },
  { name: 'Dave T.', location: 'Melbourne, VIC', text: "As a tradie, I need reliable cover for my ute. Budget Direct made it easy and affordable. Top stuff.", avatar: 'D' },
  { name: 'Margaret & Ron K.', location: 'Brisbane, QLD', text: "We've been with Budget Direct for 8 years now. Claims process is straightforward and the staff are lovely.", avatar: 'M' },
  { name: 'Josh L.', location: 'Perth, WA', text: "Just got my licence and Budget Direct gave me a fair price when other insurers wanted a fortune. Legend!", avatar: 'J' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const handleStartQuote = () => {
    navigate('/quote/start');
  };

  const handleContact = () => {
    amplitude.track('Contact Customer Service');
    navigate('/help');
  };

  const handleCallback = () => {
    amplitude.track('Request Callback');
    navigate('/help');
  };

  const handleLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    amplitude.track('Lead Form Completed', { campaign_name: 'homepage_newsletter' });
    setShowSuccess(true);
    setEmail('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #FFF5F5 0%, #FFF 50%, #F0F9FF 100%)',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              background: 'var(--yellow)',
              color: 'var(--navy)',
              padding: '0.375rem 1rem',
              borderRadius: 20,
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}>
              Australia's #1 Direct Insurer
            </div>
            <h1 style={{
              fontSize: '3.25rem',
              fontWeight: 800,
              color: 'var(--navy)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              letterSpacing: '-1px',
            }}>
              Insurance that's actually a bit of all right.
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--gray-600)',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}>
              Save up to 30% on car insurance.* Get a quote in 4 minutes.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={handleStartQuote}>
                Start Car Insurance Quote
              </button>
              <button className="btn btn-outline btn-lg" onClick={handleCallback}>
                <Phone size={18} /> Speak to an Advisor
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '1rem' }}>
              *Savings compared to other major insurers. T&Cs apply.
            </p>
          </div>
          <div style={{
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          }}>
            <div style={{
              width: '100%',
              height: 400,
              background: 'linear-gradient(135deg, #FF6B6B 0%, #E30613 40%, #001E62 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              padding: '2rem',
            }}>
              <Car size={80} strokeWidth={1.5} />
              <p style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>Comprehensive Car Insurance</p>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '0.5rem' }}>From $28/month*</p>
              <div style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '1.5rem',
                fontSize: '0.9rem',
                opacity: 0.85,
              }}>
                <span>Agreed Value</span>
                <span>Roadside Assist</span>
                <span>New for Old</span>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            section:first-child .container { grid-template-columns: 1fr !important; }
            section:first-child h1 { font-size: 2.25rem !important; }
          }
        `}</style>
      </section>

      {/* Trust Strip */}
      <section style={{
        background: 'var(--navy)',
        padding: '1.25rem 0',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {[
            { icon: '🏆', text: 'Money Magazine Cheapest Car Insurer 2024' },
            { icon: '⭐', text: '4.7/5 Customer Rating' },
            { icon: '📊', text: '12+ Million Policies Sold' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--white)',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}>
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'var(--navy)',
            textAlign: 'center',
            marginBottom: '0.5rem',
          }}>
            Our Insurance Products
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--gray-500)',
            marginBottom: '2.5rem',
            fontSize: '1.1rem',
          }}>
            Simple, affordable cover for what matters most
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {products.map((p) => (
              <Link key={p.name} to="/quote/start" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: `${p.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <p.icon size={28} color={p.color} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--gray-800)' }}>{p.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.125rem' }}>{p.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Budget Direct */}
      <section style={{ padding: '4rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'var(--navy)',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}>
            Why Budget Direct?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { icon: DollarSign, title: 'Save More Money', desc: 'Consistently rated one of Australia\'s cheapest car insurers by Money Magazine.' },
              { icon: Shield, title: 'Award-Winning Cover', desc: 'Winner of Roy Morgan Customer Satisfaction Award for outstanding service.' },
              { icon: Clock, title: 'Quick & Easy Quotes', desc: 'Get a quote in just 4 minutes. No jargon, no fuss — just straightforward cover.' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <item.icon size={28} color="white" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'var(--navy)',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}>
            What Our Customers Say
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{
                border: testimonialIdx === i ? '2px solid var(--red)' : '2px solid transparent',
                cursor: 'pointer',
              }} onClick={() => setTestimonialIdx(i)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: ['#E30613', '#001E62', '#059669', '#7C3AED'][i],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{t.location}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={14} fill="var(--yellow)" color="var(--yellow)" />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Lead Form */}
      <section style={{
        background: 'linear-gradient(135deg, var(--red), #C00510)',
        padding: '3rem 0',
        color: 'white',
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>
            Stay in the loop
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
            Get the latest deals, tips, and insurance news straight to your inbox.
          </p>
          {showSuccess ? (
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: 8 }}>
              Thanks for subscribing! We'll be in touch.
            </div>
          ) : (
            <form onSubmit={handleLeadForm} style={{
              display: 'flex',
              gap: '0.75rem',
              maxWidth: 480,
              margin: '0 auto',
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '0.875rem 1rem',
                  borderRadius: 8,
                  border: 'none',
                  fontSize: '1rem',
                }}
              />
              <button className="btn btn-yellow" type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* Quick Help Strip */}
      <section style={{ padding: '2rem 0', background: 'var(--gray-50)' }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          <button className="btn btn-outline btn-sm" onClick={handleContact}>
            <MessageCircle size={16} /> Live Chat
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleContact}>
            <Phone size={16} /> 1800 Budget
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleCallback}>
            <Phone size={16} /> Request Callback
          </button>
        </div>
      </section>
    </div>
  );
}
