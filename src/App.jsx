import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Flame,
  Sparkles,
  Zap,
  ShieldCheck,
  RefreshCw,
  Instagram,
  Globe,
  ShoppingBag,
  Star,
  MessageCircle,
  Send,
  Ghost,
  User,
  Lock,
  Mic,
} from 'lucide-react';

const QUESTIONS = {
  silver: [
    'What fantasy would you play out if no one ever found out?',
    'What is your most underrated turn-on?',
    'What is one thing you secretly crave hearing in a voice note?',
  ],
  gold: [
    'What would your ideal private after-hours session look like?',
    'What word could I whisper once that would melt you instantly?',
    'If we broke one rule tonight, which one would it be?',
  ],
  vip: [
    'What is the one command you would obey without hesitation?',
    'Describe the exact moment you would lose total control.',
    'What secret should only booth insiders ever know about you?',
  ],
};

const Card = ({ tier, color, glow, icon: Icon, questions }) => {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const shuffle = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <motion.button
      type="button"
      className={`relative min-h-56 rounded-2xl border p-5 text-left text-white shadow-xl ${color} ${glow}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setFlipped((prev) => !prev)}
      aria-label={`Flip to reveal ${tier} tier prompt`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!flipped ? (
          <motion.div
            key="front"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.2 }}
            className="flex h-full flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] opacity-80">{tier}</p>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-2xl font-semibold">Tap to reveal a booth prompt</p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Mic className="h-4 w-4" aria-hidden="true" />
              Voice tease ready
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.2 }}
            className="flex h-full flex-col justify-between"
          >
            <p className="text-sm uppercase tracking-[0.2em] opacity-80">{tier} prompt</p>
            <p className="text-xl font-medium leading-relaxed">{questions[index]}</p>
            <button
              type="button"
              aria-label="Shuffle question"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/50 px-3 py-1 text-sm"
              onClick={shuffle}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Shuffle question
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'NaughtyHeyLee',
      text: "Welcome to the Booth. What's on your mind tonight?",
      admin: true,
    },
    { id: 2, user: 'Guest88', text: 'Is the Gold tier actually secret??' },
  ]);
  const [input, setInput] = useState('');
  const idFallbackCounter = useRef(0);

  const createMessageId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${idFallbackCounter.current++}`;

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: createMessageId(), user: 'You', text, admin: false }]);
    setInput('');
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 px-4 py-1 text-xs uppercase tracking-[0.25em] text-pink-300">
            <Ghost className="h-3.5 w-3.5" aria-hidden="true" />
            HeyLee's Private Booth
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Choose your tease tier</h1>
          <p className="max-w-3xl text-slate-300">
            Flip any card for a playful prompt, then keep the vibe alive inside the private chat booth.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Card
            tier="Silver"
            color="bg-gradient-to-br from-slate-600 to-slate-800"
            glow="shadow-slate-500/50"
            icon={Sparkles}
            questions={QUESTIONS.silver}
          />
          <Card
            tier="Gold"
            color="bg-gradient-to-br from-amber-500 to-orange-700"
            glow="shadow-amber-500/50"
            icon={Crown}
            questions={QUESTIONS.gold}
          />
          <Card
            tier="VIP"
            color="bg-gradient-to-br from-fuchsia-600 to-rose-700"
            glow="shadow-fuchsia-500/50"
            icon={Flame}
            questions={QUESTIONS.vip}
          />
        </section>

        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-4">
          <div className="flex items-center gap-2 text-slate-200">
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            Verified privacy
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Zap className="h-4 w-4 text-yellow-300" aria-hidden="true" />
            Instant unlocks
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Lock className="h-4 w-4 text-sky-300" aria-hidden="true" />
            Hidden perks
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Star className="h-4 w-4 text-pink-300" aria-hidden="true" />
            Top fan badges
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-pink-300" aria-hidden="true" />
              <h2 className="text-xl font-semibold">Private Booth Chat</h2>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              <Globe className="h-4 w-4" aria-hidden="true" />
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>

          <div
            className="mb-4 max-h-72 space-y-3 overflow-auto rounded-xl bg-black/20 p-3"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Chat message history"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg p-3 ${
                  message.admin
                    ? 'mr-8 border border-pink-400/30 bg-pink-500/10'
                    : 'ml-8 border border-white/10 bg-slate-800/80'
                }`}
              >
                <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-300">
                  {message.admin ? (
                    <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <User className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {message.user}
                </p>
                <p className="text-sm text-slate-100">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              aria-label="Chat message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.isComposing) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Send a message..."
              className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-2 outline-none ring-pink-400/50 placeholder:text-slate-500 focus:ring"
            />
            <button
              type="button"
              aria-label="Send message"
              onClick={sendMessage}
              className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2 font-medium text-white hover:bg-pink-500"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
