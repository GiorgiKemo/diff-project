import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center flex-1">
      {/* Progress Bar - Type 1 (Progressing): 280×80px */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16px',
        gap: '8px',
        width: '280px',
        height: '80px',
        background: '#FFFFFF',
        border: '1px solid #E1E1E1',
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}>

        {/* Icons: 40×40 blue-ring circle */}
        <div style={{
          position: 'relative',
          width: '40px',
          height: '40px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Static outer ring */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: '2px solid #4571E4',
          }} />
          {/* Spinning arc (Progressing Animation) */}
          <div className="animate-spin" style={{
            position: 'absolute',
            inset: '3px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#4571E4',
          }} />
          {/* Center dot (Ellipse 1): 25% of 36px inner = ~9px */}
          <div style={{
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            background: '#4571E4',
            zIndex: 1,
          }} />
        </div>

        {/* Info + Indicator */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '2px',
          flex: 1,
        }}>
          {/* Status text */}
          <span style={{
            fontSize: '10px',
            lineHeight: '16px',
            color: 'rgba(56, 58, 72, 0.6)',
            fontFamily: 'Helvetica',
          }}>
            Converting...Thank you For your Patience
          </span>

          {/* Frame 428: percentage + bar */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', width: '100%' }}>
            {/* 30% label */}
            <span style={{
              fontSize: '16px',
              fontWeight: '700',
              lineHeight: '24px',
              color: '#383A48',
              fontFamily: 'Helvetica',
              minWidth: '38px',
            }}>
              {progress}%
            </span>

            {/* Progress track (F6F9FF, 8px tall, radius 64px) */}
            <div style={{
              flex: 1,
              height: '8px',
              background: '#F6F9FF',
              borderRadius: '64px',
              overflow: 'hidden',
            }}>
              {/* Filled indicator (#4571E4) */}
              <div style={{
                width: `${progress}%`,
                height: '8px',
                background: '#4571E4',
                borderRadius: '64px',
                transition: 'width 30ms linear',
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
