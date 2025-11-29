'use client';
import { useState, type CSSProperties } from 'react';
import styles from './auth.module.css';

export default function AuthCard() {
  const [flipped, setFlipped] = useState(false);

  const cardStyle: CSSProperties = {
    perspective: '1000px',
    width: '80vw',
    height: '90vh',
  };

  const cardInnerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
  };

  const cardFaceStyle: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '10px',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const cardBackStyle: CSSProperties = {
    ...cardFaceStyle,
    backgroundColor: '#f0f0f0',
    color: 'black',
    transform: 'rotateY(180deg)',
  };

  return (
    <div className={styles.card} >
      <div  className='cardInner'>
        {/* Front side - Login */}
        <div style={{ ...cardFaceStyle, backgroundColor: 'white', color: 'black' }}>
          <h2 className='text-red-500'>Login</h2>
          {/* Put your Login form here */}
          <button onClick={() => setFlipped(true)} className={styles.blueText}>
            Go to Signup
          </button>
        </div>

        {/* Back side - Signup */}
        <div style={cardBackStyle}>
          <h2>Signup</h2>
          {/* Put your Signup form here */}
          <button onClick={() => setFlipped(false)} style={{ marginTop: '20px' }}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
