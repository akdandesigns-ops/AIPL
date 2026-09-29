import { useRef } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="hero-section" ref={heroRef}>
      {/* Decorative gradient orb */}
      <div className="hero-glow"></div>
      
      <div className="container hero-content">
        <div className="logo-container">
          <div className="logo-mark">
            <svg viewBox="0 0 100 50" width="120" height="60" className="aipl-svg">
              <path d="M10,40 L30,10 L50,40 L70,10 L90,40" fill="none" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20,25 L80,25" fill="none" stroke="var(--secondary)" strokeWidth="3" opacity="0.8"/>
            </svg>
            <div className="logo-text">
              <h2>Attur International</h2>
              <span className="tagline">Carve the engineering</span>
            </div>
          </div>
          <p className="sub-tagline">Innovative Engineering Solutions for a Sustainable Future</p>
        </div>

        <div className="invitation-text">
          <div className="invite-intro">YOU ARE CORDIALLY INVITED TO THE</div>
          <div className="invite-title">GRAND INAUGURATION</div>
          <div className="invite-of">OF OUR</div>
          <div className="invite-facility">MANUFACTURING FACILITY<br/>& WAREHOUSE</div>
        </div>

        <div className="hero-meta">
          <div className="meta-item">
            <Calendar className="meta-icon" />
            <div className="meta-text">
              <strong>10th OCTOBER 2026</strong>
              <span>SATURDAY</span>
            </div>
          </div>
          <div className="meta-item">
            <Clock className="meta-icon" />
            <div className="meta-text">
              <strong>10:00 AM</strong>
              <span>ONWARDS</span>
            </div>
          </div>
          <div className="meta-item meta-location">
            <MapPin className="meta-icon" />
            <div className="meta-text">
              <strong>Attur International Pvt. Ltd.</strong>
              <span>Behind Mahindra world city,<br/>Chengalpattu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
