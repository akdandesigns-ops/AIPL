import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Scissors, Factory, Users, Handshake } from 'lucide-react';
import './Highlights.css';

const highlights = [
  {
    icon: Scissors,
    title: "Ribbon-Cutting Ceremony",
    desc: "Inaugurating a new chapter of growth and innovation."
  },
  {
    icon: Factory,
    title: "Facility & Plant Tour",
    desc: "Explore our advanced manufacturing and warehouse capabilities."
  },
  {
    icon: Users,
    title: "Networking Lunch",
    desc: "Connect, collaborate and create new opportunities."
  },
  {
    icon: Handshake,
    title: "Celebrating Partnerships",
    desc: "Honoring the trust and support that drives our success."
  }
];

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section highlights-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center">EVENT HIGHLIGHTS</h2>
        <div className="highlights-grid">
          {highlights.map((item, index) => (
            <div 
              key={index} 
              className="highlight-card"
              ref={el => { cardsRef.current[index] = el; }}
            >
              <div className="icon-wrapper">
                <item.icon size={32} />
              </div>
              <div className="card-content">
                <h4 className="card-title">{item.title}</h4>
                <p className="card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
