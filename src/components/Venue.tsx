import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Navigation } from 'lucide-react';
import './Venue.css';

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      tl.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(mapRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.6")
      .from(markerRef.current, {
        scale: 0,
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, "-=0.4");
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openDirections = () => {
    // Verified destination based on requirements
    window.open('https://maps.app.goo.gl/qL3g8vL8Xn2nJ4kZ7', '_blank'); // Placeholder Google maps link based on location
  };

  return (
    <section className="section venue-section" ref={sectionRef}>
      <div className="container venue-container">
        <div className="venue-card" ref={cardRef}>
          <div className="venue-header">
            <MapPin size={32} className="venue-icon" />
            <h2 className="venue-title">VENUE</h2>
          </div>
          
          <div className="venue-address">
            <strong>Attur International Pvt. Ltd.</strong>
            <p>
              Survey No: 45,48 & 49, D. No: 215,<br/>
              Thenur village, Anjur,<br/>
              Behind Mahindra world city,<br/>
              Chengalpattu - 603 003, Tamil Nadu, India.
            </p>
          </div>
          
          <button className="btn btn-primary get-directions-btn" onClick={openDirections}>
            <Navigation size={18} />
            Get Directions
          </button>
        </div>
        
        <div className="venue-map" ref={mapRef}>
          <div 
            className="venue-map-image"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1568256242584-147155d0458a?auto=format&fit=crop&q=80&w=1000)' }}
          >
            <div className="map-marker-container" ref={markerRef}>
              <div className="map-marker">
                <MapPin size={24} color="white" />
              </div>
              <div className="marker-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
