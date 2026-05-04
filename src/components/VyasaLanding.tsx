"use client";

import { useState, useEffect, type FormEvent, type KeyboardEvent, type MouseEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function VyasaLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistDuplicate, setWaitlistDuplicate] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMode, setActiveMode] = useState<"single" | "long">("single");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e?: FormEvent | MouseEvent | KeyboardEvent) => {
    if (e && "preventDefault" in e) e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setError("That doesn’t look like a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        duplicate?: boolean;
      };
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Try again.");
        return;
      }
      setWaitlistDuplicate(Boolean(data.duplicate));
      setSubmitted(true);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const SAFFRON = '#E8A04A';
  const BG = '#0A0908';
  const FG = '#F5F2EC';
  /** Was #7A766F — too low-contrast on BG for long body copy and forms */
  const MUTED = '#ADA8A1';
  const LINE = '#2E2A24';

  return (
    <div
      style={{
        background: BG,
        color: FG,
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');

        html {
          scroll-behavior: smooth;
          background-color: ${BG};
          color: ${FG};
        }

        body {
          background-color: ${BG};
          color: ${FG};
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .serif { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .sans { font-family: 'Inter', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes slowPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.45; }
        }

        /* forwards only — avoid backwards fill hiding content if animations never run */
        .fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.6s; }

        .vyasa-nav {
          transition: padding 0.28s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1), border-bottom-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link { color: ${MUTED}; transition: color 0.2s ease; text-decoration: none; }
        .nav-link:hover { color: ${FG}; }

        input[type="email"] {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${LINE};
          color: ${FG};
          padding: 14px 0;
          font-size: 16px;
          width: 100%;
          outline: none;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }
        input[type="email"]:focus { border-bottom-color: ${SAFFRON}; }
        input[type="email"]::placeholder { color: ${MUTED}; opacity: 0.95; }

        .cta-btn {
          background: ${SAFFRON};
          color: ${BG};
          border: none;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cta-btn:hover { background: #F2B566; transform: translateY(-1px); }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .cta-btn:disabled:hover { background: ${SAFFRON}; transform: none; }

        .mode-card {
          border: 1px solid ${LINE};
          padding: 36px 32px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
          text-align: left;
          width: 100%;
          font-family: inherit;
          color: inherit;
        }
        .mode-card:hover { border-color: ${MUTED}; }
        .mode-card.active {
          border-color: ${SAFFRON};
          background: rgba(232, 160, 74, 0.03);
        }

        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          mix-blend-mode: overlay;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${SAFFRON};
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 14vw !important; }
          .container { padding: 0 24px !important; }
          .modes-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          .vyasa-nav {
            transition: none !important;
          }
          .fade-up {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
          .hero-pulse-dot {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
          .hero-spectrum-line {
            animation: none !important;
            opacity: 0.55;
          }
          .waitlist-reveal {
            animation: none !important;
          }
          .cta-btn:hover,
          .cta-btn:active {
            transform: none !important;
          }
        }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav className="vyasa-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '16px 0' : '28px 0',
        background: scrolled ? 'rgba(10, 9, 8, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${LINE}` : '1px solid transparent',
      }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>Vyasa</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 28px', alignItems: 'center', justifyContent: 'flex-end', fontSize: 13 }}>
            <a href="#how" className="nav-link sans">How it works</a>
            <a href="#privacy" className="nav-link sans">Privacy</a>
            <a href="#waitlist" className="nav-link sans" style={{ color: SAFFRON }}>Waitlist →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 48px 80px', width: '100%', position: 'relative', zIndex: 2 }}>

          <div className="fade-up section-label" style={{ marginBottom: 32 }}>
            <span className="hero-pulse-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: SAFFRON, marginRight: 10, animation: 'pulse 2.5s ease-in-out infinite', verticalAlign: 'middle' }} />
            By Avyay Labs · Bangalore
          </div>

          <h1 className="serif fade-up delay-1 hero-title" style={{
            fontSize: 'clamp(56px, 8vw, 120px)',
            fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.035em',
            marginBottom: 32, maxWidth: 1100,
          }}>
            Vyasa.<br />
            Your conversations<br />
            <span style={{ color: SAFFRON }}>searchable.</span>
          </h1>

          <p className="sans fade-up delay-2" style={{
            fontSize: 19, lineHeight: 1.55, color: MUTED,
            maxWidth: 560, marginBottom: 56, fontWeight: 300,
          }}>
            The clip always holds a temporary memory of the last minute on the device. When something lands, press once to save just that stretch, or hold if you already want a longer take. Then search it in the Vyasa app, or connect it to tools that support MCP.
          </p>

          <div className="fade-up delay-3" style={{ maxWidth: 480 }}>
            {!submitted ? (
              <div>
                <p className="sans" style={{ fontSize: 15, color: FG, lineHeight: 1.5, marginBottom: 16, fontWeight: 400 }}>
                  Join the waitlist to try it in the first run.
                </p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <input type="email" placeholder="your@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && void handleSubmit(e)} />
                  </div>
                  <button type="button" disabled={loading} onClick={() => void handleSubmit()} className="cta-btn">Join waitlist</button>
                </div>
                {error && (
                  <p className="sans" role="alert" style={{ fontSize: 13, color: '#c97a6a', marginTop: 12, lineHeight: 1.4 }}>
                    {error}
                  </p>
                )}
                <p className="mono" style={{ fontSize: 11, color: MUTED, marginTop: 14, letterSpacing: '0.05em' }}>
                  No spam. We only email when there’s something worth saying.
                </p>
              </div>
            ) : (
              <div className="waitlist-reveal" style={{ borderLeft: `2px solid ${SAFFRON}`, paddingLeft: 20, animation: 'fadeUp 0.5s ease-out forwards' }}>
                <p className="serif" style={{ fontSize: 22, marginBottom: 6 }}>
                  {waitlistDuplicate ? "You're already on the waitlist." : "You're in."}
                </p>
                <p className="sans" style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                  {waitlistDuplicate
                    ? "No need to sign up again. We'll email you when there's something worth knowing."
                    : "We'll email you when yours is ready."}
                </p>
              </div>
            )}
          </div>

        </div>

        <div className="fade-up delay-4" style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
          width: '40%', height: '60%', opacity: 0.5, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 48,
        }}>
          <svg viewBox="0 0 400 600" style={{ width: '100%', height: '100%', maxWidth: 400 }}>
            {Array.from({ length: 28 }).map((_, i) => {
              const x = 60 + i * 12;
              const baseHeight = 40 + Math.sin(i * 0.5) * 80 + Math.cos(i * 0.3) * 60;
              const height = Math.max(20, Math.min(280, baseHeight));
              return (
                <line className="hero-spectrum-line" key={i} x1={x} y1={300 - height / 2} x2={x} y2={300 + height / 2}
                  stroke={i % 7 === 3 ? SAFFRON : LINE} strokeWidth="1.5" strokeLinecap="round"
                  style={{ animation: `slowPulse ${3 + (i % 4)}s ease-in-out infinite`, animationDelay: `${i * 0.08}s` }} />
              );
            })}
          </svg>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section style={{ padding: '120px 0', borderTop: `1px solid ${LINE}` }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>Why</div>
          <p className="serif" style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.3, fontWeight: 400,
            letterSpacing: '-0.02em', maxWidth: 900, color: FG,
          }}>
            Zoom meetings get transcribed. Everything else doesn't.
          </p>
          <p className="serif" style={{
            fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.5, fontWeight: 300,
            letterSpacing: '-0.015em', maxWidth: 900, color: MUTED, marginTop: 32,
          }}>
            The hallway debrief after you left the Zoom room. The detail someone said once, fast,
            while you were looking at the wrong screen. The line in the contract you only half heard.
            You meant to remember. You didn't.
          </p>
        </div>
      </section>

      {/* THE TWO MODES */}
      <section id="how" style={{ padding: '120px 0', borderTop: `1px solid ${LINE}` }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>How it works</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-0.025em', marginBottom: 24, maxWidth: 800,
          }}>
            Two modes. One button.
          </h2>
          <p className="sans" style={{ fontSize: 17, color: MUTED, maxWidth: 720, marginBottom: 20, lineHeight: 1.65, fontWeight: 300 }}>
            The two mode cards below are the whole interaction model: one tap versus one hold, on the same button.
          </p>
          <p className="sans" style={{ fontSize: 17, color: MUTED, maxWidth: 720, marginBottom: 20, lineHeight: 1.65, fontWeight: 300 }}>
            This waitlist is for the clip. Broader phone recall and MCP are on the roadmap so memory is not locked to the hardware alone.
          </p>
          <p className="sans" style={{ fontSize: 17, color: MUTED, maxWidth: 600, marginBottom: 64, lineHeight: 1.6 }}>
            Wear it as a clip, a pin, or on a lanyard.
          </p>

          <div className="modes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
            <button type="button" className={`mode-card ${activeMode === 'single' ? 'active' : ''}`} onClick={() => setActiveMode('single')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: activeMode === 'single' ? SAFFRON : MUTED, transition: 'background 0.3s' }} />
                <span className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED }}>Press once</span>
              </div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 14, letterSpacing: '-0.01em' }}>
                Keeps the last 60 seconds.
              </h3>
              <p className="sans" style={{ fontSize: 15, color: MUTED, lineHeight: 1.65 }}>
                For the moments you didn't realize mattered until they were already happening.
              </p>
            </button>

            <button type="button" className={`mode-card ${activeMode === 'long' ? 'active' : ''}`} onClick={() => setActiveMode('long')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: activeMode === 'long' ? SAFFRON : MUTED, transition: 'background 0.3s' }} />
                <span className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED }}>Hold</span>
              </div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 14, letterSpacing: '-0.01em' }}>
                Records until you stop it.
              </h3>
              <p className="sans" style={{ fontSize: 15, color: MUTED, lineHeight: 1.65 }}>
                Meetings, doctor visits, customer calls. Haptic confirms start. Hold again to stop.
              </p>
            </button>
          </div>

          <div style={{
            border: `1px solid ${LINE}`, padding: '64px 48px',
            background: 'rgba(232, 160, 74, 0.015)', position: 'relative', overflow: 'hidden',
          }}>
            <svg viewBox="0 0 800 120" style={{ width: '100%', height: 100 }}>
              {Array.from({ length: 80 }).map((_, i) => {
                const x = 10 + i * 10;
                const phase = i / 80;
                const isInBuffer = activeMode === 'single' && phase > 0.7;
                const isLongRecord = activeMode === 'long' && phase > 0.3 && phase < 0.85;
                const baseHeight = 8 + Math.abs(Math.sin(i * 0.4)) * 35 + Math.abs(Math.cos(i * 0.7)) * 20;
                return (
                  <line key={`${activeMode}-${i}`} x1={x} y1={60 - baseHeight / 2} x2={x} y2={60 + baseHeight / 2}
                    stroke={(isInBuffer || isLongRecord) ? SAFFRON : LINE} strokeWidth="2" strokeLinecap="round"
                    style={{ transition: 'stroke 0.4s ease', opacity: (isInBuffer || isLongRecord) ? 1 : 0.5 }} />
                );
              })}
            </svg>
            <div className="mono" style={{ position: 'absolute', bottom: 20, left: 48, fontSize: 11, color: SAFFRON, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {activeMode === 'single' ? '↑ saved: last 60 seconds' : '↑ recording: continuous'}
            </div>
          </div>
        </div>
      </section>

      {/* RECALL */}
      <section style={{ padding: '120px 0', borderTop: `1px solid ${LINE}` }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>Recall</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-0.025em', marginBottom: 32, maxWidth: 900,
          }}>
            From buffer to search.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="modes-grid">
            <div>
              <p className="sans" style={{ fontSize: 17, color: FG, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
                After you commit a slice from the sixty-second window, or finish a long hold, it becomes text you can actually search. Use the Vyasa app on your phone, or connect{' '}
                <span className="mono" style={{ fontSize: 14, color: SAFFRON }}>MCP</span>
                {' '}so Claude, ChatGPT, or anything that speaks the protocol can pull from the same memory.
              </p>
              <p className="sans" style={{ fontSize: 17, color: MUTED, lineHeight: 1.7, fontWeight: 300 }}>
                Export, delete, or move it from the app when you want. We don't see it unless you ask us to.
              </p>
            </div>

            <div style={{
              border: `1px solid ${LINE}`, background: '#0F0E0C', padding: '32px 28px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.8,
            }}>
              <div style={{ color: MUTED, marginBottom: 8, fontSize: 11 }}>// claude, with vyasa connected</div>
              <div style={{ color: FG, marginBottom: 16 }}>
                <span style={{ color: SAFFRON }}>&gt;</span> priya pricing tuesday
              </div>
              <div style={{ color: MUTED, fontSize: 11, marginBottom: 6 }}>// found 1 match</div>
              <div style={{ color: FG, opacity: 0.85, fontSize: 12, lineHeight: 1.7 }}>
                tue 4:18pm, koramangala<br />
                priya: <span style={{ color: SAFFRON, opacity: 0.9 }}>"40k is fine for the pilot,</span><br />
                <span style={{ color: SAFFRON, opacity: 0.9 }}>but quarterly review."</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" style={{ padding: '120px 0', borderTop: `1px solid ${LINE}` }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>Privacy</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(32px, 4.2vw, 56px)', fontWeight: 400, lineHeight: 1.15,
            letterSpacing: '-0.02em', marginBottom: 48, maxWidth: 900,
          }}>
            Where your captures <span style={{ color: SAFFRON }}>live</span>
          </h2>

          <div style={{ maxWidth: 720 }}>
            <p className="sans" style={{ fontSize: 18, color: FG, lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>
              By default audio stays on your phone. Cloud sync is opt-in; when you turn it on, it's end-to-end encrypted. We don't train on your conversations. That's spelled out in the terms, with subprocessors listed there too.
            </p>
            <p className="sans" style={{ fontSize: 18, color: FG, lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>
              The device doesn't brick. Your memories don't disappear. We are not in the business of holding your stuff hostage.
            </p>
          </div>
        </div>
      </section>

      {/* THE NAME */}
      <section style={{ padding: '120px 0', borderTop: `1px solid ${LINE}` }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>The name</div>
          <p className="serif" style={{
            fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.4, fontWeight: 400,
            letterSpacing: '-0.015em', maxWidth: 900, color: FG,
          }}>
            Vyasa is the sage who took the Mahabharata, which existed only as oral tradition,
            and committed it to permanent form.
          </p>
          <p className="sans" style={{
            fontSize: 17, lineHeight: 1.7, color: MUTED, maxWidth: 700, marginTop: 24, fontWeight: 300,
          }}>
            We're doing a much smaller version of the same thing.
          </p>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section style={{ padding: '120px 0', borderTop: `1px solid ${LINE}` }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>From me</div>

          <div style={{ maxWidth: 720 }}>
            <p className="sans" style={{ fontSize: 19, color: FG, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
              I have ADHD. I forget things constantly. The number a vendor quoted, what my doctor said
              about my mom's medication, the actual reason a customer churned, what my girlfriend told me
              long back (kinda important). I take notes and lose the notes.
            </p>
            <p className="sans" style={{ fontSize: 19, color: FG, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
              I've spent years on ranking and relevance. Recall is a ranking problem.
              The same math that decides what shows up when you search can decide which moment from your week
              is the one you're trying to find.
            </p>
            <p className="sans" style={{ fontSize: 19, color: FG, lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
              That's the whole pitch. I'm building this because I needed it. If you needed it too,
              get on the list.
            </p>
            <p className="serif" style={{ fontSize: 17, color: MUTED, fontStyle: 'italic' }}>
              Dev. R.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="waitlist" style={{ padding: '160px 0 120px', borderTop: `1px solid ${LINE}`, position: 'relative' }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '0 48px', textAlign: 'left' }}>
          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400, lineHeight: 1,
            letterSpacing: '-0.03em', marginBottom: 32,
          }}>
            Limited first run.
          </h2>
          <p className="sans" style={{ fontSize: 18, color: MUTED, marginBottom: 24, maxWidth: 540, lineHeight: 1.6, fontWeight: 300 }}>
            Hand-assembled. We ship to this list first. Drop your email and we'll let you know
            when yours is ready.
          </p>
          <p className="sans" style={{ fontSize: 15, color: FG, lineHeight: 1.5, marginBottom: 40, maxWidth: 540, fontWeight: 400 }}>
            Join the waitlist to try it in the first run.
          </p>

          {!submitted ? (
            <div style={{ maxWidth: 480 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <input type="email" placeholder="your@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && void handleSubmit(e)} />
                </div>
                <button type="button" disabled={loading} onClick={() => void handleSubmit()} className="cta-btn">Join waitlist</button>
              </div>
              {error && (
                <p className="sans" role="alert" style={{ fontSize: 13, color: '#c97a6a', marginTop: 12, lineHeight: 1.4 }}>
                  {error}
                </p>
              )}
            </div>
          ) : (
            <div className="waitlist-reveal" style={{ borderLeft: `2px solid ${SAFFRON}`, paddingLeft: 20, maxWidth: 480, animation: 'fadeUp 0.5s ease-out forwards' }}>
              <p className="serif" style={{ fontSize: 22, marginBottom: 6 }}>
                {waitlistDuplicate ? "You're already on the waitlist." : "You're in."}
              </p>
              <p className="sans" style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                {waitlistDuplicate
                  ? "No need to sign up again. We'll email you when there's something worth knowing."
                  : "We'll email you when yours is ready."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 0 48px', borderTop: `1px solid ${LINE}` }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="serif" style={{ fontSize: 24, fontWeight: 500, marginBottom: 12, letterSpacing: '-0.01em' }}>Vyasa</div>
              <p className="sans" style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, maxWidth: 320 }}>
                Your conversations searchable. Built by Avyay Labs in Bangalore.
              </p>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: MUTED, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Email</div>
              <a href="mailto:hi@avyaylabs.com" className="nav-link sans" style={{ fontSize: 14, display: 'block' }}>
                hi@avyaylabs.com
              </a>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: MUTED, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Elsewhere</div>
              <a href="https://x.com/avyaylabs" target="_blank" rel="noopener noreferrer" className="nav-link sans" style={{ fontSize: 14, display: 'block', marginBottom: 6 }}>X</a>
              <a href="https://www.linkedin.com/in/rdg07/" target="_blank" rel="noopener noreferrer" className="nav-link sans" style={{ fontSize: 14, display: 'block' }}>LinkedIn</a>
            </div>
          </div>

          <div style={{
            marginTop: 64, paddingTop: 24, borderTop: `1px solid ${LINE}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <p className="mono" style={{ fontSize: 11, color: MUTED, letterSpacing: '0.05em' }}>
              © 2026 Avyay Labs · Bangalore
            </p>
            <p className="mono" style={{ fontSize: 11, color: MUTED, letterSpacing: '0.05em' }}>
              VYAH-suh, fyi
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
