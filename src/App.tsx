import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ceremony from './components/Ceremony';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Highlights from './components/Highlights';
import Programme from './components/Programme';
import Venue from './components/Venue';
import Footer from './components/Footer';
import './ceremony-layout.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      setIsOpened(true); // Skip ceremony for reduced motion
    });

    return () => mm.revert();
  }, []);

  const handleCeremonyOpened = () => {
    setIsOpened(true);
    // Reset scroll to top immediately so the normal page scroll starts from the top
    window.scrollTo(0, 0);
    // Refresh ScrollTriggers so they recalculate positions without the ceremony spacer
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
  };

  return (
    <div className="app-container" ref={containerRef}>
      {!isOpened && (
        <Ceremony onOpened={handleCeremonyOpened} />
      )}
      
      {/* We keep the rest of the app in the DOM so it's ready and can be revealed */}
      <div className={`main-content ${!isOpened ? 'is-hidden-behind-ceremony' : ''}`}>
        <Hero />
        <Welcome />
        <Highlights />
        <Programme />
        <Venue />
        <Footer />
      </div>
    </div>
  );
}

export default App;
