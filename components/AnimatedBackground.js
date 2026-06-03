// components/AnimatedBackground.js

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedBackground() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !vantaEffect.current) {
      const initVanta = async () => {
        const VANTA_BIRDS = (await import('vanta/dist/vanta.birds.min')).default;

        if (vantaRef.current) {
          vantaEffect.current = VANTA_BIRDS({
            el: vantaRef.current,
            THREE,
            alignment: 20,
            backgroundAlpha: 0,
            backgroundColor: 0x101010,
            birdSize: 1.5,
            cohesion: 20,
            color1: 0xffffff,
            color2: 0xdddddd,
            colorMode: 'varianceGradient',
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            mouseControls: true,
            quantity: 8,
            scale: 1,
            scaleMobile: 1,
            separation: 91,
            speedLimit: 3,
            touchControls: true,
            wingSpan: 30
          });
        }
      };

      initVanta();
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        width: '100vw',
        height: '100vh',
        zIndex: 1
      }}
    />
  );
}
