'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

function HomePage() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get('x');

  const [from, setFrom] = useState(null);
  const [customMsg, setCustomMsg] = useState(null);
  const [animateKey, setAnimateKey] = useState(0);
  const [message, setMessage] = useState('');
  const [lastIndex, setLastIndex] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const affirmations = [
    'you’re not behind. you’re on divine time, babe.',
    'the universe is literally obsessed with you.',
    'ur higher self said “trust me, i got this.”',
    'you’re hot, healing, and slightly unhinged. perfect.',
    'romanticize everything. even your panic nap.',
    'you’re not too much. they were just low bandwidth.',
    'ur glow-up is loading… buffering in peace.',
    'cry if you need to. you’re still the main character.',
    'rest. rot. rebloom.',
  ];

  const hugReplies = [
    'Right back at you 🫶',
    'Feeling your love, here’s mine 💌',
    'Thinking of you too ✨',
    'Hug loop initiated 🔁',
    'You’re in my heart too',
    'Softness returned with interest',
    'Catch this energy boost ⚡',
  ];

  // Decode the x param (Base64 -> JSON)
  useEffect(() => {
    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
        setFrom(decoded.from || null);
        setCustomMsg(decoded.msg || null);
      } catch (err) {
        setFrom(null);
        setCustomMsg(null);
      }
    }
  }, [encoded]);

  // Load random affirmation + hearts
  useEffect(() => {
    const index = Math.floor(Math.random() * affirmations.length);
    setMessage(affirmations[index]);
    setLastIndex(index);

    const generatedHearts = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDelay: `${Math.random() * 5}s`,
    }));
    setHearts(generatedHearts);
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

  const handleCopyLink = () => {
    if (!senderName.trim() || !userMessage.trim()) {
      setError('Please enter both your name and a message.');
      return;
    }

    const payload = {
      from: senderName,
      msg: userMessage,
    };

    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    const base = window.location.origin;
    const link = `${base}?x=${encoded}`;

    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setShowModal(false);
      setError('');
      setSenderName('');
      setUserMessage('');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setError('Something went wrong. Try copying again.');
    });
  };

  const openReplyModal = () => {
    const reply = hugReplies[Math.floor(Math.random() * hugReplies.length)];
    setUserMessage(reply);
    setSenderName('');
    setShowModal(true);
  };

  return (
    <div>
      <img src="/sparkles.png" alt="sparkles" className="sparkles" />

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

      {from && (
        <motion.p
          className="from-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {from} sent you this hug 💌
        </motion.p>
      )}

      {customMsg && (
        <motion.p
          className="custom-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          “{customMsg}”
        </motion.p>
      )}

      <motion.img
        key={`gif-${animateKey}`}
        src="/hug.gif"
        alt="hug gif"
        className="hug-gif"
        loading="lazy"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {!customMsg && (
        <>
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
        </>
      )}

      {from ? (
        <button className="hug-button" onClick={openReplyModal}>
          Send a Hug Back
        </button>
      ) : (
        <>
          <button className="hug-button" onClick={handleReplay}>
            Hug Me Again
          </button>
          <button className="send-hug-button" onClick={() => setShowModal(true)}>
            💌 Send a Hug
          </button>
        </>
      )}

      {copied && <p className="copied-message">Link copied to clipboard ✨</p>}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Send a Hug 💖</h2>
            <input
              type="text"
              placeholder="Your name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            <textarea
              placeholder="Your message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={3}
            />
            {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
            <button className="hug-button" onClick={handleCopyLink}>
              Generate Link
            </button>
            <button className="send-hug-button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div>loading hug...</div>}>
      <HomePage />
    </Suspense>
  );
}