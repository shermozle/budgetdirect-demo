import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Car, Home, Plane, PawPrint, Bike, Heart } from 'lucide-react';

const products = [
  { name: 'Car Insurance', icon: Car, path: '/quote/start' },
  { name: 'Home & Contents', icon: Home, path: '/quote/start' },
  { name: 'Travel Insurance', icon: Plane, path: '/quote/start' },
  { name: 'Pet Insurance', icon: PawPrint, path: '/quote/start' },
  { name: 'Bike Insurance', icon: Bike, path: '/quote/start' },
  { name: 'Life Insurance', icon: Heart, path: '/quote/start' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header style={{
      background: 'var(--white)',
      borderBottom: '2px solid var(--gray-100)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 72,
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--red)',
          textDecoration: 'none',
          letterSpacing: '-0.5px',
        }}>
          Budget Direct Demo
        </Link>

        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }} className="desktop-nav">
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: 600,
              color: 'var(--gray-700)',
              fontSize: '0.95rem',
            }}>
              Insurance Products <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: 'var(--white)',
                borderRadius: 12,
                boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                padding: '0.5rem',
                minWidth: 240,
                zIndex: 200,
              }}>
                {products.map((p) => (
                  <Link key={p.name} to={p.path} onClick={() => setDropdownOpen(false)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 8,
                    color: 'var(--gray-700)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gray-50)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <p.icon size={18} color="var(--red)" />
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/help" style={{ fontWeight: 600, color: 'var(--gray-700)', fontSize: '0.95rem', textDecoration: 'none' }}>
            Claims
          </Link>
          <Link to="/help" style={{ fontWeight: 600, color: 'var(--gray-700)', fontSize: '0.95rem', textDecoration: 'none' }}>
            Help & Support
          </Link>
          <Link to="/account" style={{ fontWeight: 600, color: 'var(--gray-700)', fontSize: '0.95rem', textDecoration: 'none' }}>
            My Account
          </Link>
          <button className="btn btn-primary" onClick={() => navigate('/quote/start')}>
            Get a Quote
          </button>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--gray-700)',
          }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          background: 'var(--white)',
          borderTop: '1px solid var(--gray-100)',
          padding: '1rem 1.5rem',
        }}>
          {products.map((p) => (
            <Link key={p.name} to={p.path} onClick={() => setMobileOpen(false)} style={{
              display: 'block',
              padding: '0.75rem 0',
              color: 'var(--gray-700)',
              fontWeight: 500,
              textDecoration: 'none',
            }}>
              {p.name}
            </Link>
          ))}
          <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--gray-100)' }} />
          <Link to="/help" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'var(--gray-700)', fontWeight: 500, textDecoration: 'none' }}>Claims</Link>
          <Link to="/help" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'var(--gray-700)', fontWeight: 500, textDecoration: 'none' }}>Help & Support</Link>
          <Link to="/account" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'var(--gray-700)', fontWeight: 500, textDecoration: 'none' }}>My Account</Link>
          <button className="btn btn-primary" onClick={() => { setMobileOpen(false); navigate('/quote/start'); }} style={{ width: '100%', marginTop: '0.5rem' }}>
            Get a Quote
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
