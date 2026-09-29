import { useEffect, useRef } from 'react';
import gsap from 'gsap';
// @ts-ignore
import { SplitText } from '../gsap/SplitText.js';
import './Welcome.css';

gsap.registerPlugin(SplitText);

export default function Welcome() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup SplitText for the title
      const splitTitle = new SplitText(".welcome-title span", { type: "lines,words" });
      
      // Text stagger reveal
      gsap.from(splitTitle.words, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        rotateX: -30,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      });

      gsap.from('.welcome-p, .welcome-subtitle', {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Factory image parallax (rises according to scroll trigger)
      gsap.fromTo('.welcome-image-inner', 
        { 
          scale: 1.1,
          y: '10%' 
        },
        {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: 1
          },
          scale: 1,
          y: '-10%',
          ease: 'none'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section welcome-section" ref={sectionRef}>
      <div className="container welcome-container">
        <div className="welcome-text" ref={textRef}>
          <h2 className="welcome-title">
            <span>INAUGURATION &</span>
            <span>GROWTH PARTNERSHIP MEET</span>
          </h2>
          <h3 className="welcome-subtitle">Dear Valued Partner,</h3>
          <p className="welcome-p">
            We are delighted to invite you to join us as we celebrate a significant milestone in our journey.
          </p>
          <p className="welcome-p">
            We cordially invite you to the grand inauguration of our state-of-the-art <strong>Manufacturing Facility & Warehouse</strong>.
          </p>
          <p className="welcome-p highlight-p">
            Your presence and support will encourage us as we embark on this new chapter of growth, innovation and excellence.
          </p>
        </div>
        <div className="welcome-image" ref={imageRef}>
          <div className="welcome-image-wrapper">
            <div className="image-overlay"></div>
            <div 
              className="welcome-image-inner" 
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
