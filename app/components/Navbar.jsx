import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser } from '../../lib/auth';
import { Home, LayoutDashboard, LogOut, ChevronDown, Shield, Zap, Building2, Users, GraduationCap } from 'lucide-react';

export default async function Navbar() {
const user = await getCurrentUser();
  const avatarUrl = user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand-link">
        <div className="nav-logo-wrapper">
          <Image 
            src="/stadtwerkeprofdilbild.webp" 
            alt="Logo" 
            width={38} 
            height={38} 
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span className="nav-brand-text">Stadtwerke Neubrücken</span>
      </Link>
      
      <div className="nav-menu-links">
        <Link href="/" className="nav-home-btn">
          <Home size={16} />
          <span>Startseite</span>
        </Link>
      </div>

      <div>
        {user ? (
          <div className="dropdown-wrapper">
            <div className="user-pill">
              <img src={avatarUrl} alt="Avatar" className="user-avatar" />
              <span className="user-name">{user.username}</span>
              <ChevronDown size={14} className="dropdown-arrow" />
            </div>
            
            <div className="dropdown-content">
              <div className="dropdown-header">
                <span className="dropdown-subtitle">Angemeldet als</span>
                <span className="dropdown-title">{user.global_name || user.username}</span>
              </div>

              <div className="dropdown-section-title">Unternehmensbereiche</div>
              <Link href="/entstoerungsdienst" className="dropdown-item"><Zap size={16} className="text-cyan" /> Entstörungsdienst</Link>
              <Link href="/fuehrungsebene" className="dropdown-item"><Building2 size={16} className="text-indigo" /> Führungsebene</Link>
              <Link href="/personal" className="dropdown-item"><Users size={16} className="text-emerald" /> Personalabteilung</Link>
              <Link href="/ausbilder" className="dropdown-item"><GraduationCap size={16} className="text-amber" /> Ausbilder</Link>
              <Link href="/mitarbeiter" className="dropdown-item border-bot"><Shield size={16} className="text-blue" /> Mitarbeiter</Link>
              
              <div className="dropdown-section-title">Verwaltung</div>
              <Link href="/dashboard" className="dropdown-item highlight"><LayoutDashboard size={16} /> Mitarbeiter-Dashboard</Link>
              <a href="/api/auth/logout" className="dropdown-item logout"><LogOut size={16} /> Abmelden</a>
            </div>
          </div>
        ) : (
          <a href="/auth/discord" className="btn-discord-login">
            Discord Anmelden
          </a>
        )}
      </div>
    </nav>
  );
}
