import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors } from 'lucide-react';
import Confetti from './Confetti';
import './Ceremony.css';

gsap.registerPlugin(ScrollTrigger);

interface CeremonyProps {
  onOpened: () => void;
}

export default function Ceremony({ onOpened }: CeremonyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCoverRef = useRef<HTMLDivElement>(null);
  const rightCoverRef = useRef<HTMLDivElement>(null);
  const ribbonLeftRef = useRef<HTMLDivElement>(null);
  const ribbonRightRef = useRef<HTMLDivElement>(null);
  const bowRef = useRef<HTMLDivElement>(null);
  const scissorsRef = useRef<HTMLDivElement>(null);
  const instructionRef = useRef<HTMLDivElement>(null);
  
  const [stage, setStage] = useState<'loading' | 'ready' | 'opening' | 'opened'>('loading');

  useEffect(() => {
    // Simulate preloading
    const timer = setTimeout(() => setStage('ready'), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage !== 'ready' && stage !== 'opening') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (self.progress > 0 && stage === 'ready') {
              setStage('opening');
            }
            if (self.progress === 1 && (stage as string) !== 'opened') {
              setStage('opened');
              onOpened();
            }
          }
        }
      });

      // 0-10% (First scroll): Scissors cut
      tl.to(scissorsRef.current, {
        y: 20,
        rotation: -20,
        opacity: 1,
        duration: 0.1,
        ease: 'power2.in'
      }, 0)
      .to(scissorsRef.current, {
        rotation: 0, // Snip
        duration: 0.05
      }, 0.1)
      .to(scissorsRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.05
      }, 0.15)
      
      // Bow splits/fades
      .to(bowRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 0.1
      }, 0.1)

      // 10-30%: Ribbon recoils and moves outward
      .to(ribbonLeftRef.current, {
        x: '-100vw',
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0.15)
      .to(ribbonRightRef.current, {
        x: '100vw',
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0.15)
      .to(instructionRef.current, {
        opacity: 0,
        duration: 0.1
      }, 0.1)

      // 30-80%: Cover panels separate
      .to(leftCoverRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.inOut'
      }, 0.3)
      .to(rightCoverRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.inOut'
      }, 0.3)
      
      // 40-90%: Hero settles from enlarged scale
      // Note: we can't restrict to containerRef for this one because hero-section is outside.
      // So we just use global document.querySelector inside the animation or don't restrict the context.
      // Actually, gsap.context allows adding global selectors if we don't pass the scope, but we passed containerRef.
      // So we can select it manually:
      const heroEl = document.querySelector('.hero-section');
      if (heroEl) {
        tl.fromTo(heroEl, 
          { scale: 1.1 },
          { scale: 1, duration: 0.4, ease: 'power2.out' },
          0.4
        );
      }
      
      // Allow scroll to continue slightly
      tl.to({}, { duration: 0.2 }, 0.8);

    }, containerRef);

    return () => ctx.revert();
  }, [stage, onOpened]);

  if (stage === 'opened') return null;

  return (
    <div className={`ceremony-wrapper ${stage}`} ref={containerRef}>
      {/* Background layer representing the page beneath while opening */}
      <div className="ceremony-bg"></div>

      {/* Confetti plays during opening */}
      {stage === 'opening' && <Confetti />}

      {/* Ivory Covers */}
      <div className="cover left-cover" ref={leftCoverRef}></div>
      <div className="cover right-cover" ref={rightCoverRef}></div>

      {/* Ribbon Layer */}
      <div className="ribbon-layer">
        <div className="ribbon-half left-ribbon" ref={ribbonLeftRef}>
          <div className="ribbon-texture"></div>
        </div>
        
        <div className="ribbon-half right-ribbon" ref={ribbonRightRef}>
          <div className="ribbon-texture"></div>
        </div>

        <div className="ceremony-bow" ref={bowRef}>
          <div className="bow-knot"></div>
          <div className="bow-loop left-loop"></div>
          <div className="bow-loop right-loop"></div>
          <div className="bow-tail left-tail"></div>
          <div className="bow-tail right-tail"></div>
        </div>
        
        <div className="ceremony-scissors" ref={scissorsRef}>
          <Scissors size={48} color="#1e293b" />
        </div>
      </div>

      {/* Preloader / Logo */}
      <div className={`preloader-logo ${stage !== 'loading' ? 'fade-out' : ''}`}>
        <svg viewBox="0 0 100 50" width="80" height="40">
          <path d="M10,40 L30,10 L50,40 L70,10 L90,40" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20,25 L80,25" fill="none" stroke="var(--secondary)" strokeWidth="3" opacity="0.8"/>
        </svg>
      </div>

      <div className="instruction-text" ref={instructionRef}>
        <span className="desktop-text">Scroll to inaugurate</span>
        <span className="mobile-text">Swipe up to inaugurate</span>
        <div className="scroll-indicator"></div>
      </div>

      {/* Skip Button */}
      {stage === 'ready' && (
        <button className="skip-btn" onClick={() => { setStage('opened'); onOpened(); }}>
          Skip intro
        </button>
      )}
    </div>
  );
}
