import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Programme.css';

const schedule = [
  { time: "10:00 AM", event: "Guest Arrival & Registration" },
  { time: "10:30 AM", event: "Welcome Address" },
  { time: "10:45 AM", event: "Keynote Address" },
  { time: "11:15 AM", event: "Ribbon-Cutting Ceremony & Inauguration" },
  { time: "11:45 AM", event: "Guided Facility & Plant Tour" },
  { time: "12:30 PM", event: "Networking Lunch & Refreshments" }
];

export default function Programme() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw line as you scroll
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none'
        }
      );

      // Reveal each event
      itemsRef.current.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          x: -20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section programme-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center" style={{ background: 'linear-gradient(90deg, #d946ef 0%, #a855f7 100%)' }}>
          PROGRAM SCHEDULE
        </h2>
        
        <div className="timeline-container">
          <div className="timeline-line-bg"></div>
          <div className="timeline-line-fill" ref={lineRef}></div>
          
          <div className="timeline-items">
            {schedule.map((item, index) => (
              <div 
                key={index} 
                className="timeline-item"
                ref={el => { itemsRef.current[index] = el; }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-time">{item.time}</div>
                <div className="timeline-content">
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
