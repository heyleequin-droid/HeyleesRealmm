import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Flame, Sparkles, Zap, ShieldCheck, RefreshCw } from 'lucide-react';

const AnimatedCard = motion.div;

const QUESTIONS = {
  Copper: ["What's your biggest guilty pleasure?", "First thing you notice in a room?", "Most naughty thing in public?", "What's a fashion choice that's a turn-on?"],
  Silver: ["Describe your perfect midnight date?", "A secret fantasy never told?", "24 hours with me, no rules?", "What makes you blush instantly?"],
  Gold: ["The ultimate 'Naughty HeyLee' move?", "When were you the most 'un-approved'?", "One thing you're too shy to ask?", "What does 'Luxury' feel like to you?"]
};

const VaultCard = ({ tier, color, glow, icon: Icon }) => {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const shuffle = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % QUESTIONS[tier].length);
  };

  return (
    <div style={{ perspective: '1200px', margin: '15px' }}>
      <AnimatedCard
        onClick={() => setFlipped(!flipped)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ width: '280px', height: '400px', position: 'relative', transformStyle: 'preserve-3d', cursor: 'pointer' }}
      >
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          backgroundColor: '#0a0a0a', border: `2px solid ${color}`, borderRadius: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px', boxShadow: `0 0 25px ${glow}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: color }}>
            <Icon size={16} /> <span style={{ fontSize: '10px', letterSpacing: '4px', fontWeight: 'bold' }}>{tier}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontFamily: 'serif', fontStyle: 'italic', fontSize: '30px', margin: 0 }}>Naughty<br/>HeyLee</h2>
            <div style={{ border: '1px solid rgba(212, 175, 55, 0.4)', padding: '3px 10px', borderRadius: '50px', marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <ShieldCheck size={10} color="#d4af37" />
              <span style={{ fontSize: '8px', color: '#d4af37' }}>APPROVED</span>
            </div>
          </div>
          <div style={{ color: 'white', fontSize: '9px', opacity: 0.4 }}>CLICK TO UNLOCK</div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
          backgroundColor: '#000', border: `1px solid ${color}`, borderRadius: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '30px', textAlign: 'center'
        }}>
          <p style={{ color: 'white', fontSize: '19px', fontFamily: 'serif', fontStyle: 'italic', lineHeight: '1.4' }}>
            &ldquo;{QUESTIONS[tier][index]}&rdquo;
          </p>
          <button onClick={shuffle} style={{ marginTop: '20px', background: 'none', border: `1px solid ${color}`, color: color, padding: '5px 15px', borderRadius: '50px', fontSize: '10px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <RefreshCw size={10} /> SHUFFLE
          </button>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default function App() {
  return (
    <div style={{ backgroundColor: '#020202', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      <header style={{ padding: '60px 20px', textAlign: 'center' }}>
        <Crown size={40} color="#d4af37" style={{ marginBottom: '10px' }} />
        <h1 style={{ color: 'white', fontFamily: 'serif', fontStyle: 'italic', fontSize: '45px', margin: 0 }}>The Vault</h1>
        <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '5px' }}>BY NAUGHTY HEYLEE</p>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '60px' }}>
        <VaultCard tier="Copper" color="#cd7f32" glow="rgba(205, 127, 50, 0.2)" icon={Sparkles} />
        <VaultCard tier="Silver" color="#e2e2e2" glow="rgba(255, 255, 255, 0.1)" icon={Zap} />
        <VaultCard tier="Gold" color="#d4af37" glow="rgba(212, 175, 55, 0.3)" icon={Flame} />
      </div>
    </div>
  );
}
