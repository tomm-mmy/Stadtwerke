'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
  ChevronDown, 
  LogOut, 
  ShieldAlert, 
  Lock, 
  Truck, 
  Bus, 
  Shield, 
  Users, 
  GraduationCap, 
  Zap,
  Wrench
} from 'lucide-react';

export default function Navbar({ user }) {
  const isLoggedIn = !!user;

  // Discord Avatar URL sicher generieren oder Fallback nutzen
  const avatarUrl = user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` 
    : null;

  return (
    <header className="navbar">
      {/* Brand Logo & Title */}
      <Link href="/" className="nav-brand-link">
        <div className="nav-logo-wrapper">
          <Image 
            src="/stadtwerkeprofdilbild.webp" 
            alt="Stadtwerke Neubrücken Logo" 
            width={38} 
            height={38} 
            priority
          />
        </div>
        <span>Stadtwerke Neubrücken</span>
      </Link>

      {/* Navigation Buttons */}
      <nav className="nav-menu-links">
        <Link href="/" className="nav-home-btn">
          <Home size={16} /> Startseite
        </Link>

        {isLoggedIn ? (
          <div className="dropdown-wrapper">
            <div className="user-pill">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={avatarUrl} 
                  alt={user.username} 
                  width={28} 
                  height={28} 
                  className="user-avatar"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="user-avatar-placeholder" style={{
                  width: '28px', height: '28px', borderRadius: '50%', background: '#38bdf8', color: '#070b14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px'
                }}>
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="user-name">{user.username}</span>
              <ChevronDown size={14} style={{ color: '#94a3b8' }} />
            </div>

            <div className="dropdown-content">
              <div className="dropdown-header">
                <span className="dropdown-subtitle">Angemeldet als</span>
                <span className="dropdown-title">{user.username}</span>
              </div>

              {/* KATEGORIE 1: LEITUNG & VERWALTUNG */}
              <div className="dropdown-section-title">Leitung & Verwaltung</div>
              <Link href="/fuehrungsebene" className="dropdown-item highlight">
                <ShieldAlert size={16} /> Führungsebene
              </Link>
              <Link href="/personal" className="dropdown-item">
                <Users size={16} /> Personalabteilung
              </Link>
              <Link href="/ausbilder" className="dropdown-item">
                <GraduationCap size={16} /> Ausbildung & Lehre
              </Link>

              {/* KATEGORIE 2: OPERATIVER BETRIEB */}
              <div className="dropdown-section-title">Operativer Betrieb</div>
              <Link href="/mitarbeiter" className="dropdown-item">
                <Shield size={16} /> Mitarbeiter-Portal
              </Link>
              <Link href="/entstoerungsdienst" className="dropdown-item">
                <Zap size={16} /> Entstörungsdienst
              </Link>

              {/* KATEGORIE 3: IN ENTWICKLUNG (SOON) */}
              <div className="dropdown-section-title">In Entwicklung</div>
              
              <div className="dropdown-item disabled-nav-link">
                <Truck size={16} />
                <span>Transport & Logistik</span>
                <span className="coming-soon-tag"><Lock size={10} /> Soon</span>
              </div>

              <div className="dropdown-item disabled-nav-link sub-item">
                <Bus size={15} />
                <span>Bus & Taxi</span>
                <span className="coming-soon-tag"><Lock size={10} /> Soon</span>
              </div>

              <div className="dropdown-item disabled-nav-link">
                <Wrench size={16} />
                <span>Bau & Abriss</span>
                <span className="coming-soon-tag"><Lock size={10} /> Soon</span>
              </div>

              {/* Logout */}
              <div className="border-bot" />
              <a href="/api/auth/logout" className="dropdown-item logout">
                <LogOut size={16} /> Abmelden
              </a>
            </div>
          </div>
        ) : (
          <a href="/auth/discord" className="btn-discord-login">
            Discord Anmelden
          </a>
        )}
      </nav>
    </header>
  );
}
