'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage() {
  const [animateKey, setAnimateKey] = useState(0);
  const [message, setMessage] = useState('');
  const [lastIndex, setLastIndex] = useState(null);

  const affirmations = [
    'you’re not behind. you’re on divine time, babe.',
    'the universe is literally obsessed with you.',
    'you’re hot, healing, and slightly unhinged. perfect.',
    'romanticize everything. even your panic nap.',
    'you’re not too much. they were just low bandwidth.',
    'ur glow-up is loading… buffering in peace.',
    'cry if you need to. you’re still the main character.',
    'you don’t chase, you attract (and sometimes ignore).',
    'ur reality is delulu by design. keep going.',
    'you’re safe. even when it feels like chaos.',
    'the soft life is your birthright. claim it.',
    'drink water. fix your vibe. hug again.',
    'you literally ARE the plot twist.',
    'it’s giving healing. it’s giving rebirth.',
    'some days it’s survival. some days it’s slay.',
    'you can rest without earning it. softness is sacred.',
    'you’re allowed to start again. as many times as you need.',
    'you weren’t “too sensitive.” you were tuned in.',
    'even your chaos is cute. divine timing is messy sometimes.',
    'you don’t need fixing. you need witnessing.',
    'you were never the problem. just the upgrade.',
    'your softness is your spell. keep casting.',
    'you are always right, big dawg',
    'rest. rot. rebloom.',
  ];

  useEffect(() => {
    // show a first affirmation on initial load
    const index = Math.floor(Math.random() * affirmations.length);
    setMessage(affirmations[index]);
    setLastIndex(index);
  }, []);

  const handleReplay = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * affirmations.length);
    } while (newIndex === lastIndex);

    setLastIndex(newIndex);
    setMessage(affirmations[newIndex]);
    setAnimateKey(prev => prev + 1);
  };

  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const generatedHearts = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDelay: `${Math.random() * 5}s`,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div>
     

      {/* Floating Hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            animationDelay: heart.animationDelay,
          }}
        />
      ))}

      {/* Hug GIF */}
      <motion.img
        key={`gif-${animateKey}`}
        src="/hug.gif.mp4"
        alt="hug gif"
        className="hug-gif"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Main Hug Text */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={`title-${animateKey}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          Here’s your hug.
        </motion.h1>
      </AnimatePresence>

      {/* Affirmation */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`msg-${animateKey}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
        >
          {message}
        </motion.p>
      </AnimatePresence>

      {/* Hug Again Button */}
      <button className="hug-button" onClick={handleReplay}>
        Hug Me Again
      </button>
    </div>
  );
}