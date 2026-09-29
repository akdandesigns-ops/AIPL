import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CalendarPlus, Phone, Mail, Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(elementsRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const addToCalendar = () => {
    // 10 October 2026 at 10:00 AM to 2:00 PM Asia/Kolkata
    // Basic formatting for Google Calendar
    const text = encodeURIComponent('AIPL Grand Inauguration');
    const dates = '20261010T043000Z/20261010T083000Z'; // 10:00 AM IST to 2:00 PM IST in UTC
    const details = encodeURIComponent('Join us for the grand inauguration of our Manufacturing Facility & Warehouse.');
    const location = encodeURIComponent('Attur International Pvt. Ltd., Chengalpattu, Tamil Nadu, India');
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="footer-section" ref={footerRef}>
      <svg className="footer-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.15)" />
            <stop offset="50%" stopColor="rgba(217, 4, 41, 0.15)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0.15)" />
          </linearGradient>
        </defs>
        <path fill="url(#wave-gradient)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      
      <div className="container footer-container">
        
        <div className="brand-statement" ref={el => { elementsRef.current[0] = el; }}>
          <h3>PROUD TO BE PART OF CHENNAI. BUILDING FOR INDIA.</h3>
          <h2 className="brand-highlight">ENGINEERING FOR THE WORLD.</h2>
        </div>

        <div className="footer-grid">
          <div className="footer-contact" ref={el => { elementsRef.current[1] = el; }}>
            <a href="tel:+919841736050" className="contact-link">
              <Phone size={20} />
              +91 98417 36050
            </a>
            <a href="mailto:sales@atturinternational.com" className="contact-link">
              <Mail size={20} />
              sales@atturinternational.com
            </a>
            <a href="https://www.atturinternational.com" target="_blank" rel="noreferrer" className="contact-link">
              <Globe size={20} />
              www.atturinternational.com
            </a>
          </div>

          <div className="footer-actions" ref={el => { elementsRef.current[2] = el; }}>
            <div className="social-links">
              <span>FOLLOW US</span>
              <a href="#" className="social-icon">IN</a>
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">IG</a>
            </div>
            
            <button className="btn btn-secondary calendar-btn" onClick={addToCalendar}>
              <CalendarPlus size={20} />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
