import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Clock, DollarSign, Star, CheckCircle, ChevronDown, ChevronUp,
  Phone, Award, Car, Wrench, Zap, MapPin, Users, ThumbsUp, AlertCircle,
} from 'lucide-react';
import amplitude from '../utils/amplitude';

const BD_RED = '#E30613';
const BD_NAVY = '#001E62';
const BD_YELLOW = '#FFC72C';

// Unsplash CDN — free to use, no auth required
const UNSPLASH = {
  heroHero: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop',   // red sports car
  familyCar: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&auto=format&fit=crop',    // family car lifestyle
  cityDrive: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&auto=format&fit=crop', // car on city road
  roadTrip:  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80&auto=format&fit=crop', // road trip / open road
  claimsPerson: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop', // professional / advisor
};

// ─── Data ────────────────────────────────────────────────────────────────────

const awards = [
  { emoji: '🏆', label: 'Money Magazine', sub: 'Insurer of the Year 2025' },
  { emoji: '⭐', label: 'CANSTAR', sub: 'Insurer of the Year 2026' },
  { emoji: '🥇', label: 'CANSTAR Outstanding Value', sub: '19 Consecutive Years (2007–2025)' },
  { emoji: '🎖️', label: 'Money Magazine', sub: 'Best of the Best 2026' },
];

const reasons = [
  {
    icon: DollarSign,
    title: 'Save More Every Year',
    desc: 'Get 15% off your first year when you buy online. Plus, bundle policies for extra multi-policy discounts.',
  },
  {
    icon: Shield,
    title: 'Lifetime Repair Guarantee',
    desc: 'All repairs carried out by our authorised repairers are guaranteed for the life of your policy. Drive with confidence.',
  },
  {
    icon: Car,
    title: 'New Car Replacement',
    desc: "Written off within 2 years or 40,000 km? We'll replace it with a brand new equivalent model.",
  },
  {
    icon: Clock,
    title: '24/7 Claims Lodgement',
    desc: 'Lodge your claim any time — day or night — online or by phone. No waiting until business hours.',
  },
  {
    icon: Wrench,
    title: 'Towing Costs Covered',
    desc: "If your car can't be driven safely after an incident, we'll pay to tow it to the nearest repairer.",
  },
  {
    icon: MapPin,
    title: 'Low-Kilometre Policies',
    desc: 'Drive under 10,000 km a year? A low-kilometre policy could cut your premium significantly.',
  },
  {
    icon: Zap,
    title: 'Hire Car After Accident',
    desc: "Involved in a no-fault accident or theft? We'll arrange a hire car so you're never stranded.",
  },
  {
    icon: Award,
    title: '19 Years of Award-Winning Value',
    desc: "CANSTAR's Outstanding Value Car Insurance award — 19 consecutive years. Not a fluke. A habit.",
  },
];

const coverTiers = [
  {
    name: 'Comprehensive',
    badge: 'Most Popular',
    badgeColor: BD_RED,
    desc: 'Our most complete cover — protects your car and others',
    price: 'From $28/month',
    features: [
      'Accidental damage to your car',
      'Theft and attempted theft',
      'Fire, storm, hail, flood',
      'Windscreen repair & replacement',
      'Damage to other vehicles & property',
      'New car replacement (within 2 yrs/40,000 km)',
      'Hire car after no-fault accident',
      'Up to $20 million legal liability',
    ],
    notIncluded: ['Rideshare driving', 'Racing or motorsport'],
  },
  {
    name: 'Third Party, Fire & Theft',
    badge: 'Great Value',
    badgeColor: BD_NAVY,
    desc: 'Covers your car for fire and theft, plus third-party liability',
    price: 'From $12/month',
    features: [
      'Fire and theft damage to your car',
      'Damage to other vehicles & property',
      'Up to $20 million legal liability',
      'Towing after a covered loss',
    ],
    notIncluded: ['Accidental damage to your car', 'Hail or storm damage', 'Windscreen'],
  },
  {
    name: 'Third Party Property',
    badge: 'Budget-Friendly',
    badgeColor: '#059669',
    desc: 'Essential cover for damage you cause to others',
    price: 'From $7/month',
    features: [
      'Damage to other vehicles & property',
      'Up to $20 million legal liability',
    ],
    notIncluded: ['Any damage to your own car', 'Theft, fire, or storm', 'Windscreen'],
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Sydney, NSW',
    text: 'Saved $400 on my car insurance. The online quote took less than 5 minutes!',
    avatar: 'S',
    color: BD_RED,
  },
  {
    name: 'Dave T.',
    location: 'Melbourne, VIC',
    text: 'As a tradie I need reliable cover for my ute. Budget Direct made it affordable. Top stuff.',
    avatar: 'D',
    color: BD_NAVY,
  },
  {
    name: 'Margaret & Ron K.',
    location: 'Brisbane, QLD',
    text: "We've been with Budget Direct 8 years now. Claims process is straightforward and the staff are lovely.",
    avatar: 'M',
    color: '#059669',
  },
  {
    name: 'Josh L.',
    location: 'Perth, WA',
    text: 'Just got my licence and Budget Direct gave me a fair price when others wanted a fortune. Legend!',
    avatar: 'J',
    color: '#7C3AED',
  },
];

const faqs = [
  {
    q: 'How can I get cheaper car insurance?',
    a: 'Buying online gives you 15% off your first year. You can also reduce your premium by choosing a higher excess, opting for a low-kilometre policy if you drive under 10,000 km/year, or bundling with another Budget Direct policy for a multi-policy discount.',
  },
  {
    q: 'What does excess mean?',
    a: "Your excess is the amount you contribute towards a claim before we pay the rest. A higher excess usually means a lower premium, and vice versa. You choose your basic excess when you get a quote.",
  },
  {
    q: 'What factors affect my premium?',
    a: "We consider your car's make, model, age and value; your driving history; where you park overnight; how far you drive each year; your age and claims history; and the level of cover you choose.",
  },
  {
    q: "What's not covered?",
    a: 'Common exclusions include using your car for rideshare or hire, racing or motorsport events, driving unlicensed or under the influence, and intentional damage. Check the PDS for the full list.',
  },
  {
    q: 'Can I pay monthly?',
    a: "Yes. You can pay monthly by direct debit at no extra charge, or pay annually for simplicity. Monthly payments are interest-free.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRow({ n = 5 }: { n?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={14} fill={BD_YELLOW} color={BD_YELLOW} />
      ))}
    </span>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CarInsuranceLanding() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const trackedDepths = useRef<Set<number>>(new Set());
  const heroRef = useRef<HTMLElement>(null);

  // Track page view on mount
  useEffect(() => {
    amplitude.track('Landing Page Viewed', {
      page: 'car-insurance-landing',
      url: window.location.href,
    });
  }, []);

  // Track scroll depth milestones
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const pct = Math.round((window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100);
      setScrollPct(pct);

      [25, 50, 75, 100].forEach((depth) => {
        if (pct >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          amplitude.track('Landing Page Scroll Depth', {
            page: 'car-insurance-landing',
            depth_pct: depth,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startQuote = (source: string, coverType?: string) => {
    amplitude.track('Landing CTA Clicked', {
      page: 'car-insurance-landing',
      cta_position: source,
      cover_type: coverType ?? 'not_selected',
      scroll_depth_pct: scrollPct,
    });
    navigate('/quote/start');
  };

  const handleFaqToggle = (i: number, question: string) => {
    const opening = openFaq !== i;
    setOpenFaq(opening ? i : null);
    if (opening) {
      amplitude.track('FAQ Expanded', {
        page: 'car-insurance-landing',
        question,
        faq_index: i,
      });
    }
  };

  const handleTierSelect = (tierName: string) => {
    setSelectedTier(tierName);
    amplitude.track('Cover Type Selected', {
      page: 'car-insurance-landing',
      cover_type: tierName,
    });
  };

  const handlePhoneClick = () => {
    amplitude.track('Phone Click', { page: 'car-insurance-landing' });
    navigate('/help');
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Discount Banner ── */}
      <div style={{
        background: BD_YELLOW,
        color: BD_NAVY,
        textAlign: 'center',
        padding: '0.5rem 1rem',
        fontWeight: 700,
        fontSize: '0.9rem',
      }}>
        🎉 Save 15% on your first year when you buy online — limited time offer
      </div>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        background: `linear-gradient(135deg, #FFF5F5 0%, #fff 55%, #EEF2FF 100%)`,
        padding: '4rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative blob */}
        <div aria-hidden style={{
          position: 'absolute', right: -120, top: -80, width: 480, height: 480,
          borderRadius: '50%', background: `${BD_RED}10`, pointerEvents: 'none',
        }} />

        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Left copy */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: BD_YELLOW, color: BD_NAVY,
              padding: '0.35rem 1rem', borderRadius: 20,
              fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.5rem',
            }}>
              <Award size={14} /> Australia's #1 Direct Insurer
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 800, color: BD_NAVY,
              lineHeight: 1.1, letterSpacing: '-1px',
              marginBottom: '1.25rem',
            }}>
              Car Insurance<br />
              <span style={{ color: BD_RED }}>Quotes Online</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#4B5563', lineHeight: 1.65, marginBottom: '1rem' }}>
              Comprehensive, Third Party Fire &amp; Theft, or Third Party Property — get covered in minutes.
              Save <strong>15% on your first year</strong> when you purchase online.
            </p>

            <div style={{
              display: 'flex', gap: '0.75rem',
              padding: '1rem',
              background: 'rgba(255,199,44,0.12)',
              borderRadius: 12, marginBottom: '1.75rem',
              alignItems: 'center',
            }}>
              <Users size={20} color={BD_NAVY} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.9rem', color: BD_NAVY, fontWeight: 600, margin: 0 }}>
                4.4 / 5 from 40,805 verified reviews &nbsp;
                <StarRow />
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => startQuote('hero')}
              >
                Get a Quote — It's Free
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={handlePhoneClick}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Phone size={16} /> 1800 BUDGET
              </button>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#9CA3AF', marginTop: '0.75rem' }}>
              * Online discount applied to first year's premium. New policies only. T&Cs apply.
            </p>
          </div>

          {/* Right card */}
          <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,30,98,0.22)' }}>
            {/* Car hero image */}
            <img
              src={UNSPLASH.heroHero}
              alt="Red sports car on open road"
              style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }}
              loading="eager"
            />
            {/* Overlay card */}
            <div style={{
              background: `linear-gradient(145deg, ${BD_NAVY} 0%, #0a2a7a 100%)`,
              padding: '1.5rem',
              color: 'white',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
                <div style={{
                  background: BD_RED, borderRadius: 12,
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Car size={22} color="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>Comprehensive Cover</p>
                  <p style={{ fontSize: '0.78rem', opacity: 0.75, margin: 0 }}>Our most popular policy</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0 }}>From</p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800, color: BD_YELLOW, margin: 0 }}>$28/mo</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '1.25rem' }}>
                {[
                  'Accidental damage',
                  'Theft, fire & storm',
                  'Windscreen cover',
                  '$20M legal liability',
                  'New car replacement',
                  '24/7 claims',
                ].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem' }}>
                    <CheckCircle size={13} color={BD_YELLOW} style={{ flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>

              <button
                className="btn"
                style={{
                  width: '100%',
                  background: BD_YELLOW, color: BD_NAVY,
                  fontWeight: 700, fontSize: '1rem',
                  padding: '0.8rem',
                }}
                onClick={() => startQuote('hero-card', 'Comprehensive')}
              >
                Get My Quote
              </button>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:768px){
          .landing-hero-grid { grid-template-columns: 1fr !important; }
        }`}</style>
      </section>

      {/* ── Awards Strip ── */}
      <section style={{ background: BD_NAVY, padding: '1.25rem 0' }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'center',
          gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          {awards.map((a) => (
            <div key={a.label + a.sub} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: 'white', fontSize: '0.82rem', fontWeight: 600,
            }}>
              <span style={{ fontSize: '1.4rem' }}>{a.emoji}</span>
              <div>
                <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>{a.label}</div>
                <div>{a.sub}</div>
              </div>
            </div>
          ))}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'white', fontSize: '0.82rem', fontWeight: 600,
          }}>
            <span style={{ fontSize: '1.4rem' }}>💰</span>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>Claims Paid</div>
              <div>$1.5B in the last 12 months</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 Reasons to Choose ── */}
      <section style={{ padding: '4.5rem 0', background: '#F9FAFB' }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800, color: BD_NAVY,
            textAlign: 'center', marginBottom: '0.5rem',
          }}>
            8 Reasons Australians Choose Budget Direct
          </h2>
          <p style={{
            textAlign: 'center', color: '#6B7280',
            fontSize: '1.05rem', marginBottom: '3rem',
          }}>
            Award-winning value. Genuine cover. Zero fluff.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {reasons.map((r, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${BD_RED}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <r.icon size={24} color={BD_RED} />
                </div>
                <h3 style={{
                  fontSize: '1rem', fontWeight: 700,
                  color: BD_NAVY, marginBottom: '0.4rem',
                }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Strip ── */}
      <section style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', height: 260 }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={UNSPLASH.familyCar} alt="Family getting ready for a road trip"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,30,98,0.85))',
              padding: '1.5rem 1.25rem 1rem',
              color: 'white',
            }}>
              <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>Cover for every journey</p>
              <p style={{ fontSize: '0.82rem', opacity: 0.85, margin: '0.2rem 0 0' }}>Whether it's school runs or road trips</p>
            </div>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={UNSPLASH.cityDrive} alt="Car driving through city"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(227,6,19,0.85))',
              padding: '1rem 1rem 0.75rem',
              color: 'white',
            }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>City & suburban cover</p>
            </div>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={UNSPLASH.roadTrip} alt="Open road Australia"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,30,98,0.85))',
              padding: '1rem 1rem 0.75rem',
              color: 'white',
            }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>Australia-wide protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover Tiers ── */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800, color: BD_NAVY,
            textAlign: 'center', marginBottom: '0.5rem',
          }}>
            Choose Your Level of Cover
          </h2>
          <p style={{
            textAlign: 'center', color: '#6B7280',
            fontSize: '1.05rem', marginBottom: '3rem',
          }}>
            Three options. No surprises.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem', alignItems: 'start',
          }}>
            {coverTiers.map((tier) => {
              const isSelected = selectedTier === tier.name;
              return (
                <div
                  key={tier.name}
                  className="card"
                  style={{
                    padding: '1.75rem',
                    border: `2px solid ${isSelected ? tier.badgeColor : 'transparent'}`,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: isSelected ? `0 0 0 4px ${tier.badgeColor}18` : undefined,
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={() => handleTierSelect(tier.name)}
                >
                  {/* badge */}
                  <div style={{
                    position: 'absolute', top: -1, right: 20,
                    background: tier.badgeColor, color: 'white',
                    fontSize: '0.72rem', fontWeight: 700,
                    padding: '0.25rem 0.75rem', borderRadius: '0 0 8px 8px',
                  }}>
                    {tier.badge}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: BD_NAVY, marginBottom: '0.25rem' }}>
                    {tier.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.25rem' }}>{tier.desc}</p>

                  <div style={{
                    fontSize: '1.4rem', fontWeight: 800, color: BD_RED,
                    marginBottom: '1.25rem',
                  }}>
                    {tier.price}
                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6B7280' }}> *est.</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.25rem' }}>
                    {tier.features.map((f) => (
                      <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.875rem' }}>
                        <CheckCircle size={15} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ color: '#374151' }}>{f}</span>
                      </div>
                    ))}
                    {tier.notIncluded.map((f) => (
                      <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.875rem' }}>
                        <AlertCircle size={15} color="#9CA3AF" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ color: '#9CA3AF', textDecoration: 'line-through' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn"
                    style={{
                      width: '100%',
                      background: isSelected ? tier.badgeColor : 'transparent',
                      color: isSelected ? 'white' : tier.badgeColor,
                      border: `2px solid ${tier.badgeColor}`,
                      fontWeight: 700, padding: '0.75rem',
                      transition: 'all 0.2s',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTierSelect(tier.name);
                      startQuote('cover-card', tier.name);
                    }}
                  >
                    Get a {tier.name} Quote
                  </button>
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '0.78rem', marginTop: '1.5rem' }}>
            * Estimated monthly cost. Your actual premium depends on your vehicle, location, driving history, and chosen excess. See PDS for full details.
          </p>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <section style={{ background: BD_RED, padding: '3rem 0' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem', textAlign: 'center',
        }}>
          {[
            { value: '$1.5B', label: 'Paid in claims (last 12 months)' },
            { value: '40,805+', label: 'Verified customer reviews' },
            { value: '4.4 / 5', label: 'Average star rating' },
            { value: '19', label: 'Years of CANSTAR Outstanding Value' },
          ].map((s) => (
            <div key={s.label} style={{ color: 'white' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.5rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '4.5rem 0', background: '#F9FAFB' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: '0.5rem' }}>
            <ThumbsUp size={22} color={BD_RED} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: BD_NAVY, margin: 0 }}>
              What Our Customers Say
            </h2>
          </div>
          <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '1.05rem', marginBottom: '3rem' }}>
            Real reviews from real Australians
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: t.color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '1.1rem', flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '0.78rem', color: '#9CA3AF', margin: 0 }}>{t.location}</p>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <StarRow />
                  </div>
                </div>
                <p style={{
                  fontSize: '0.9rem', color: '#4B5563',
                  lineHeight: 1.65, fontStyle: 'italic', margin: 0,
                }}>
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section style={{
        background: `linear-gradient(135deg, ${BD_NAVY} 0%, #0a2a7a 100%)`,
        padding: '0',
        overflow: 'hidden',
      }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: '3rem', alignItems: 'center',
          padding: '3rem 1.5rem',
        }}>
          <div>
            <h2 style={{ color: 'white', fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Ready to save on your car insurance?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.75rem', fontSize: '1.05rem' }}>
              Get your personalised quote in under 4 minutes. No commitment required.
            </p>
            <button
              className="btn btn-lg"
              style={{
                background: BD_YELLOW, color: BD_NAVY,
                fontWeight: 800, fontSize: '1.1rem',
                padding: '1rem 2.5rem',
              }}
              onClick={() => startQuote('mid-page-cta')}
            >
              Get a Free Quote Now
            </button>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              15% online discount applied automatically at checkout
            </p>
          </div>
          <div style={{
            width: 200, height: 260,
            borderRadius: '120px 120px 0 0',
            overflow: 'hidden', flexShrink: 0,
            alignSelf: 'flex-end',
          }} className="cta-advisor-img">
            <img
              src={UNSPLASH.claimsPerson}
              alt="Friendly Budget Direct advisor"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </div>
        <style>{`@media(max-width:640px){ .cta-advisor-img { display: none !important; } }`}</style>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800, color: BD_NAVY,
            textAlign: 'center', marginBottom: '2.5rem',
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{
                  border: `1.5px solid ${isOpen ? BD_RED : '#E5E7EB'}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}>
                  <button
                    onClick={() => handleFaqToggle(i, faq.q)}
                    style={{
                      width: '100%', textAlign: 'left',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '1.1rem 1.25rem',
                      background: isOpen ? `${BD_RED}08` : 'white',
                      border: 'none', cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.95rem', color: BD_NAVY,
                      gap: 12,
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen
                      ? <ChevronUp size={18} color={BD_RED} style={{ flexShrink: 0 }} />
                      : <ChevronDown size={18} color="#6B7280" style={{ flexShrink: 0 }} />
                    }
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 1.25rem 1.25rem',
                      fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.7,
                      background: `${BD_RED}08`,
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Legal / Bottom Trust ── */}
      <section style={{ background: '#F3F4F6', padding: '2rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '2rem', flexWrap: 'wrap', marginBottom: '1.25rem',
          }}>
            {[
              { icon: Shield, label: 'General Insurance Code of Practice' },
              { icon: Award, label: 'APRA-regulated underwriter' },
              { icon: CheckCircle, label: 'AFCA member — dispute resolution' },
            ].map((b) => (
              <div key={b.label} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.82rem', color: '#6B7280', fontWeight: 600,
              }}>
                <b.icon size={15} color={BD_NAVY} />
                {b.label}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', maxWidth: 700, margin: '0 auto' }}>
            Insurance issued by Auto &amp; General Insurance Company Limited ABN 42 111 586 353 AFSL 285571.
            Consider the PDS, FSG and Target Market Determination available at budgetdirect.com.au before buying.
            * 15% online discount applies to first year's premium for new policies only. Available for purchase via budgetdirect.com.au only.
            Not available on renewals or third-party sites.
          </p>
        </div>
      </section>

      {/* ── Sticky bottom CTA (mobile) ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white',
        borderTop: '2px solid #E5E7EB',
        padding: '0.75rem 1rem',
        display: 'flex', gap: '0.75rem',
        zIndex: 50,
      }} className="sticky-cta">
        <button
          className="btn btn-primary"
          style={{ flex: 1, fontWeight: 700 }}
          onClick={() => startQuote('sticky-bottom-cta')}
        >
          Get a Quote
        </button>
        <button
          className="btn btn-outline"
          style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
          onClick={handlePhoneClick}
        >
          <Phone size={15} /> Call Us
        </button>
      </div>

      {/* bottom padding so sticky bar doesn't obscure content */}
      <div style={{ height: 68 }} />

      <style>{`
        @media (min-width: 769px) { .sticky-cta { display: none !important; } }
        @media (max-width: 768px) {
          .landing-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
