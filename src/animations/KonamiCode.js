import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right B A

const KonamiCode = () => {
  const [input, setInput] = useState([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setInput(prev => {
        const next = [...prev, e.keyCode].slice(-10);
        if (next.length === 10 && next.every((v, i) => v === KONAMI[i])) {
          setActivated(true);
          setTimeout(() => setActivated(false), 5000);
        }
        return next;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            pointerEvents: 'none',
            background: 'rgba(77, 4, 160, 0.15)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <motion.div
            initial={{ y: 50, rotateZ: -5 }}
            animate={{ y: 0, rotateZ: 0 }}
            style={{
              background: 'linear-gradient(135deg, #3A0268, #4D04A0)',
              color: 'white',
              padding: '40px 60px',
              borderRadius: '24px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(77, 4, 160, 0.4)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              You found it!
            </div>
            <div style={{ fontSize: '20px', opacity: 0.8 }}>
              Achievement Unlocked: Secret Developer Mode
            </div>
            <div style={{ fontSize: '14px', opacity: 0.5, marginTop: '12px' }}>
              ...there's nothing here though. Just vibes.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiCode;
