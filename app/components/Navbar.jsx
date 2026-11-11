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
  Train, 
  Shield, 
  Users, 
  GraduationCap, 
  Zap 
} from 'lucide-react';

export default function Navbar({ user }) {
  const isLoggedIn = !!user;

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
              {user.avatar ? (
                <Image 
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} 
                  alt={user.username} 
                  width={28} 
                  height={28} 
                  className="user-avatar"
                />
              ) : (
                <div className="user-avatar-placeholder">
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

              {/* Aktive Bereiche */}
              <div className="dropdown-section-title">Interne Bereiche</div>
              <Link href="/mitarbeiter" className="dropdown-item">
                <Shield size={16} /> Mitarbeiter-Portal
              </Link>
              <Link href="/fuehrungsebene" className="dropdown-item highlight">
                <ShieldAlert size={16} /> Führungsebene
              </Link>
              <Link href="/entstoerungsdienst" className="dropdown-item">
                <Zap size={16} /> Entstörungsdienst
              </Link>
              <Link href="/personal" className="dropdown-item">
                <Users size={16} /> Personalabteilung
              </Link>
              <Link href="/ausbilder" className="dropdown-item">
                <GraduationCap size={16} /> Ausbildung & Lehre
              </Link>

              {/* GESPERRTE ABTEILUNGEN (Coming Soon) */}
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

              <div className="dropdown-item disabled-nav-link sub-item">
                <Train size={15} />
                <span>Schienenverkehr</span>
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
          /* KORRIGIERT: Ohne /api/ vorne */
          <a href="/auth/discord" className="btn-discord-login">
            Discord Anmelden
          </a>
        )}
      </nav>
    </header>
  );
}
