import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number; // radius/size
  d: number; // density (speed)
  color: string;
  tilt: number;
  tiltAngleIncrement: number;
  tiltAngle: number;
}

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Fewer particles on mobile
    const mp = W < 768 ? 40 : 100; // max particles
    const particles: Particle[] = [];
    const colors = [
      '#d4af37', '#f3e5ab', // Golds
      '#c0c0c0', '#e5e4e2'  // Silvers
    ];

    for (let i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H - H, // Start above screen
        r: Math.random() * 6 + 4,
        d: Math.random() * mp, // density
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
        tiltAngle: 0
      });
    }

    let angle = 0;
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        // Draw a metallic looking flake (simple line that rotates)
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();
      }
      update();
    };

    const update = () => {
      angle += 0.01;
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) / 2;
        p.x += Math.sin(angle);
        p.tilt = (Math.sin(p.tiltAngle - (i / 3))) * 15;

        // Loop particles to top if they go out of bounds (only up to a certain point for non-continuous)
        // Since we want the effect to taper off, we won't reset them when they fall off.
        // Wait, to keep it looking nice while the covers open, we can reset them for a bit, then let them fall.
        // We'll just let them fall continuously for the duration of the component.
        if (p.y > H + 20) {
          // If we wanted to taper off, we could remove them. But since the component unmounts,
          // letting them loop is fine for the short duration of the opening.
          p.x = Math.random() * W;
          p.y = -20;
          p.tilt = Math.floor(Math.random() * 10) - 10;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 15
      }} 
    />
  );
}
