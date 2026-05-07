import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Loading' }) => {
  const isDark = typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') === 'dark'
    : false;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        {/* Spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            border: `3px solid ${isDark ? 'rgba(120, 70, 200, 0.15)' : 'rgba(77, 4, 160, 0.12)'}`,
            borderTopColor: isDark ? '#b07dff' : '#4D04A0',
            margin: '0 auto 16px',
          }}
        />

        {/* Pulsing dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '14px' }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: isDark ? '#b07dff' : '#4D04A0',
              }}
            />
          ))}
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: isDark ? '#9a93a8' : '#4D04A0',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          {message}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
