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
  /** Was #7A766F: too low-contrast on BG for long body copy and forms */
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

        .container {
          width: 100%;
          max-width: var(--vy-content-max);
          margin-left: auto;
          margin-right: auto;
          padding-left: var(--vy-container-inline);
          padding-right: var(--vy-container-inline);
        }
        .container--narrow {
          max-width: min(100%, var(--vy-content-narrow));
        }

        .vy-section {
          border-top: 1px solid ${LINE};
          padding-block: var(--vy-section-y);
        }
        .vy-section--waitlist {
          padding-block-start: var(--vy-waitlist-pt);
          padding-block-end: var(--vy-section-y);
        }
        .vy-footer {
          border-top: 1px solid ${LINE};
          padding-block-start: var(--vy-footer-y-top);
          padding-block-end: var(--vy-footer-y-bottom);
        }

        .serif { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .sans { font-family: 'Inter', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(0.75rem); }
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

        /* forwards only; avoid backwards fill hiding content if animations never run */
        .fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.6s; }
        .delay-5 { animation-delay: 0.75s; }

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
          padding: 0.875rem 0;
          font-size: 1rem;
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
          padding: 0.875rem 1.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cta-btn:hover { background: #F2B566; transform: translateY(-0.0625rem); }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .cta-btn:disabled:hover { background: ${SAFFRON}; transform: none; }

        .mode-card {
          border: 1px solid ${LINE};
          padding: clamp(1.5rem, 4vw, 2.25rem) clamp(1.25rem, 3vw, 2rem);
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

        .waveform-panel {
          border: 1px solid ${LINE};
          padding: clamp(2rem, 6vw, 4rem) var(--vy-container-inline);
          background: rgba(232, 160, 74, 0.015);
          position: relative;
          overflow: hidden;
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
          font-size: 0.6875rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${SAFFRON};
        }

        /* Hero starts below fixed nav (center alignment was pulling content under the bar). */
        .hero-section {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          box-sizing: border-box;
          padding-top: calc(var(--vy-hero-nav-clearance) + env(safe-area-inset-top, 0px));
        }

        @media (max-width: 48rem) {
          .hero-title { font-size: 14vw !important; }
          .modes-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: var(--vy-grid-gap) !important; }
          .hero-section {
            padding-top: calc(var(--vy-hero-nav-clearance-mobile) + env(safe-area-inset-top, 0px));
          }
          .vyasa-nav {
            background: rgba(10, 9, 8, 0.94) !important;
            backdrop-filter: blur(0.875rem) !important;
            border-bottom-color: ${LINE} !important;
          }
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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: scrolled ? '1rem' : '1.75rem',
        paddingTop: `calc(${scrolled ? '1rem' : '1.75rem'} + env(safe-area-inset-top, 0px))`,
        background: scrolled ? 'rgba(10, 9, 8, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(0.75rem)' : 'none',
        borderBottom: scrolled ? `1px solid ${LINE}` : '1px solid transparent',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="serif" style={{ fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Vyasa</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--vy-space-5) var(--vy-space-7)', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.8125rem' }}>
            <a href="#how" className="nav-link sans">How it works</a>
            <a href="#privacy" className="nav-link sans">Privacy</a>
            <a href="#waitlist" className="nav-link sans" style={{ color: SAFFRON }}>Waitlist →</a>
          </div>
        </div>
      </nav>

      {/* HERO: padding-top on .hero-section clears fixed nav; content is top-aligned */}
      <section className="hero-section">
        <div className="container" style={{ paddingTop: 'var(--vy-space-10)', paddingBottom: 'var(--vy-space-20)', width: '100%', position: 'relative', zIndex: 2 }}>

          <div className="fade-up section-label" style={{ marginBottom: 'var(--vy-space-8)' }}>
            <span className="hero-pulse-dot" style={{ display: 'inline-block', width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: SAFFRON, marginRight: '0.625rem', animation: 'pulse 2.5s ease-in-out infinite', verticalAlign: 'middle' }} />
            By Avyay Labs · Bangalore
          </div>

          <h1 className="serif fade-up delay-1 hero-title" style={{
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.035em',
            marginBottom: 'var(--vy-space-4)', maxWidth: 'min(100%, 68.75rem)',
          }}>
            Vyasa.<br />
            Your conversations<br />
            <span style={{ color: SAFFRON }}>searchable.</span>
          </h1>

          <p className="sans fade-up delay-2" style={{
            fontSize: '1.0625rem', lineHeight: 1.45, color: FG, maxWidth: 'min(100%, 35rem)', marginBottom: 'var(--vy-space-4)', fontWeight: 400,
          }}>
            A wearable clip that remembers the last minute for you on the device.
          </p>

          <p className="sans fade-up delay-3" style={{
            fontSize: '1.1875rem', lineHeight: 1.55, color: MUTED,
            maxWidth: 'min(100%, 35rem)', marginBottom: 'var(--vy-space-12)', fontWeight: 300,
          }}>
            The clip keeps that stretch in temporary memory until you act: press once to save the last ~60 seconds, or hold to start a longer take. The rolling minute is prepended to that recording, then audio keeps going until you stop with a second hold.
          </p>

          <div className="fade-up delay-4" style={{ maxWidth: 'min(100%, 30rem)' }}>
            {!submitted ? (
              <div>
                <p className="sans" style={{ fontSize: '0.9375rem', color: FG, lineHeight: 1.5, marginBottom: 'var(--vy-space-4)', fontWeight: 400 }}>
                  Join the waitlist to try it in the first run.
                </p>
                <div style={{ display: 'flex', gap: 'var(--vy-space-4)', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <input type="email" placeholder="your@email.com" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && void handleSubmit(e)} />
                  </div>
                  <button type="button" disabled={loading} onClick={() => void handleSubmit()} className="cta-btn">Join waitlist</button>
                </div>
                {error && (
                  <p className="sans" role="alert" style={{ fontSize: '0.8125rem', color: '#c97a6a', marginTop: 'var(--vy-space-3)', lineHeight: 1.4 }}>
                    {error}
                  </p>
                )}
                <p className="mono" style={{ fontSize: '0.6875rem', color: MUTED, marginTop: '0.875rem', letterSpacing: '0.05em' }}>
                  No spam. We only email when there’s something worth saying.
                </p>
              </div>
            ) : (
              <div className="waitlist-reveal" style={{ borderLeft: `0.125rem solid ${SAFFRON}`, paddingLeft: 'var(--vy-space-5)', animation: 'fadeUp 0.5s ease-out forwards' }}>
                <p className="serif" style={{ fontSize: '1.375rem', marginBottom: 'var(--vy-space-2)' }}>
                  {waitlistDuplicate ? "You're already on the waitlist." : "You're in."}
                </p>
                <p className="sans" style={{ fontSize: '0.875rem', color: MUTED, lineHeight: 1.6 }}>
                  {waitlistDuplicate
                    ? "No need to sign up again. We'll email you when there's something worth knowing."
                    : "We'll email you when yours is ready."}
                </p>
              </div>
            )}
          </div>

        </div>

        <div className="fade-up delay-5" style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
          width: '40%', height: '60%', opacity: 0.5, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 'var(--vy-container-inline)',
        }}>
          <svg viewBox="0 0 400 600" style={{ width: '100%', height: '100%', maxWidth: '25rem' }}>
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
      <section className="vy-section">
        <div className="container">
          <div className="section-label" style={{ marginBottom: 'var(--vy-space-10)' }}>Why</div>
          <p className="serif" style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.3, fontWeight: 400,
            letterSpacing: '-0.02em', maxWidth: 'min(100%, 56.25rem)', color: FG,
          }}>
            Zoom meetings get transcribed. Off the call (in person, in motion, in the rest of your day), it usually doesn't.
          </p>
          <p className="serif" style={{
            fontSize: 'clamp(1.375rem, 2.6vw, 1.875rem)', lineHeight: 1.5, fontWeight: 300,
            letterSpacing: '-0.015em', maxWidth: 'min(100%, 56.25rem)', color: MUTED, marginTop: 'var(--vy-space-8)',
          }}>
            The hallway debrief after you left the Zoom room. The detail someone said once, fast,
            while you were looking at the wrong screen. The line in the contract you only half heard.
            You meant to remember. You didn't.
          </p>
        </div>
      </section>

      {/* THE TWO MODES */}
      <section id="how" className="vy-section">
        <div className="container">
          <div className="section-label" style={{ marginBottom: 'var(--vy-space-10)' }}>How it works</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-0.025em', marginBottom: 'var(--vy-space-6)', maxWidth: 'min(100%, 50rem)',
          }}>
            Two modes. One button.
          </h2>
          <p className="sans" style={{ fontSize: '1.0625rem', color: MUTED, maxWidth: 'min(100%, 45rem)', marginBottom: 'var(--vy-space-5)', lineHeight: 1.65, fontWeight: 300 }}>
            The two cards below are the whole model on one button: press once to save the last ~60 seconds from the rolling buffer; hold to prepend that same window to a new take, then keep recording until you stop with a second hold.
          </p>
          <p className="sans" style={{ fontSize: '1.0625rem', color: MUTED, maxWidth: 'min(100%, 45rem)', marginBottom: 'var(--vy-space-16)', lineHeight: 1.65, fontWeight: 300 }}>
            Each capture stays on the clip until it syncs to your phone, then lives as searchable text in the Vyasa app. Connect{' '}
            <span className="mono" style={{ fontSize: '0.875rem', color: SAFFRON }}>MCP</span>
            {' '}and assistants such as Claude or ChatGPT can query that same library, limited to what you enable in settings.
          </p>

          <div className="modes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--vy-space-6)', marginBottom: 'var(--vy-space-12)' }}>
            <button type="button" className={`mode-card ${activeMode === 'single' ? 'active' : ''}`} onClick={() => setActiveMode('single')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--vy-space-3)', marginBottom: 'var(--vy-space-7)' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: activeMode === 'single' ? SAFFRON : MUTED, transition: 'background 0.3s' }} />
                <span className="mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED }}>Press once</span>
              </div>
              <h3 className="serif" style={{ fontSize: '1.75rem', fontWeight: 400, marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>
                Keeps the last 60 seconds.
              </h3>
              <p className="sans" style={{ fontSize: '0.9375rem', color: MUTED, lineHeight: 1.65 }}>
                For the moments you didn't realize mattered until they were already happening.
              </p>
            </button>

            <button type="button" className={`mode-card ${activeMode === 'long' ? 'active' : ''}`} onClick={() => setActiveMode('long')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--vy-space-3)', marginBottom: 'var(--vy-space-7)' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: activeMode === 'long' ? SAFFRON : MUTED, transition: 'background 0.3s' }} />
                <span className="mono" style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED }}>Hold</span>
              </div>
              <h3 className="serif" style={{ fontSize: '1.75rem', fontWeight: 400, marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>
                Records until you stop it.
              </h3>
              <p className="sans" style={{ fontSize: '0.9375rem', color: MUTED, lineHeight: 1.65 }}>
                The last minute in the buffer is always prepended to the take; then audio keeps going until you stop. Meetings, doctor visits, customer calls. Haptic confirms start; hold again to stop.
              </p>
            </button>
          </div>

          <div className="waveform-panel">
            <svg
              viewBox="0 0 800 198"
              role="img"
              aria-label={activeMode === 'single'
                ? 'Illustrative waveform with a timeline rail: about the last sixty seconds at now are saved when you press once.'
                : 'Illustrative waveform with a timeline rail: about the last sixty seconds are prepended, then recording continues until you stop.'}
              style={{ width: '100%', height: 'auto', minHeight: '11rem', display: 'block' }}
            >
              <g aria-hidden="true">
                {Array.from({ length: 80 }).map((_, i) => {
                  const x = 10 + i * 10;
                  const phase = i / 80;
                  const isSingleBuf = activeMode === 'single' && phase > 0.7;
                  const isPrepend = activeMode === 'long' && phase < 0.18;
                  const isLive = activeMode === 'long' && phase >= 0.18 && phase < 0.88;
                  const hot = isSingleBuf || isPrepend || isLive;
                  const baseHeight = 8 + Math.abs(Math.sin(i * 0.4)) * 35 + Math.abs(Math.cos(i * 0.7)) * 20;
                  const yc = 52;
                  const opacity = hot ? (activeMode === 'long' && isLive ? 0.88 : 1) : 0.42;
                  return (
                    <line
                      key={`${activeMode}-${i}`}
                      x1={x}
                      y1={yc - baseHeight / 2}
                      x2={x}
                      y2={yc + baseHeight / 2}
                      stroke={hot ? SAFFRON : LINE}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{ transition: 'stroke 0.4s ease, opacity 0.4s ease', opacity }}
                    />
                  );
                })}
              </g>

              {/* Timeline rail: semantic layer under the decorative bars */}
              <line x1="40" y1="132" x2="760" y2="132" stroke={LINE} strokeWidth="1" />
              <polygon points="760,132 778,132 770,126" fill={LINE} />
              <text x="40" y="154" fill={MUTED} fontSize="10" fontFamily="system-ui, sans-serif">earlier</text>
              <text x="772" y="154" textAnchor="end" fill={MUTED} fontSize="10" fontFamily="system-ui, sans-serif">time →</text>

              {activeMode === 'single' ? (
                <g>
                  <rect
                    x="572"
                    y="122"
                    width="208"
                    height="12"
                    rx="2"
                    fill="rgba(232, 160, 74, 0.3)"
                    stroke={SAFFRON}
                    strokeWidth="1"
                  />
                  <text x="676" y="131" textAnchor="middle" fill={FG} fontSize="10" fontFamily="system-ui, sans-serif">
                    ~60s buffer
                  </text>
                  <line x1="768" y1="96" x2="768" y2="156" stroke={SAFFRON} strokeWidth="2" />
                  <text x="768" y="90" textAnchor="middle" fill={SAFFRON} fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600">
                    now
                  </text>
                  <text x="400" y="184" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
                    Bars = vibe · rail = what press-once saves (schematic)
                  </text>
                </g>
              ) : (
                <g>
                  <rect
                    x="44"
                    y="122"
                    width="118"
                    height="12"
                    rx="2"
                    fill="rgba(232, 160, 74, 0.34)"
                    stroke={SAFFRON}
                    strokeWidth="1"
                  />
                  <text x="103" y="131" textAnchor="middle" fill={FG} fontSize="10" fontFamily="system-ui, sans-serif">
                    prepended ~60s
                  </text>
                  <rect
                    x="170"
                    y="122"
                    width="518"
                    height="12"
                    rx="2"
                    fill="rgba(232, 160, 74, 0.14)"
                    stroke={SAFFRON}
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <text x="429" y="131" textAnchor="middle" fill={FG} fontSize="10" fontFamily="system-ui, sans-serif">
                    then recording
                  </text>
                  <line x1="688" y1="96" x2="688" y2="156" stroke={MUTED} strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="688" y="90" textAnchor="middle" fill={MUTED} fontSize="10" fontFamily="system-ui, sans-serif">
                    stop
                  </text>
                  <text x="400" y="184" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
                    Bars follow prepend + live regions · rail matches (schematic)
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div style={{ marginTop: 'var(--vy-space-20)' }}>
            <h3 className="serif" style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 400, lineHeight: 1.05,
              letterSpacing: '-0.025em', marginBottom: 'var(--vy-space-8)', maxWidth: 'min(100%, 56.25rem)',
            }}>
              From buffer to search.
            </h3>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: 'min(100%, 28rem)',
                border: `1px solid ${LINE}`,
                background: '#0F0E0C',
                padding: 'var(--vy-space-8) var(--vy-space-7)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8125rem',
                lineHeight: 1.8,
              }}>
                <div style={{ color: MUTED, marginBottom: 'var(--vy-space-2)', fontSize: '0.6875rem' }}>// claude, with vyasa connected</div>
                <div style={{ color: FG, marginBottom: 'var(--vy-space-4)' }}>
                  <span style={{ color: SAFFRON }}>&gt;</span> priya pricing tuesday
                </div>
                <div style={{ color: MUTED, fontSize: '0.6875rem', marginBottom: 'var(--vy-space-2)' }}>// found 1 match</div>
                <div style={{ color: FG, opacity: 0.85, fontSize: '0.75rem', lineHeight: 1.7 }}>
                  tue 4:18pm, koramangala<br />
                  priya: <span style={{ color: SAFFRON, opacity: 0.9 }}>"40k is fine for the pilot,</span><br />
                  <span style={{ color: SAFFRON, opacity: 0.9 }}>but quarterly review."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="vy-section">
        <div className="container">
          <div className="section-label" style={{ marginBottom: 'var(--vy-space-10)' }}>Privacy</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(2rem, 4.2vw, 3.5rem)', fontWeight: 400, lineHeight: 1.15,
            letterSpacing: '-0.02em', marginBottom: 'var(--vy-space-12)', maxWidth: 'min(100%, 56.25rem)',
          }}>
            Where your captures <span style={{ color: SAFFRON }}>live</span>
          </h2>

          <div style={{ maxWidth: 'min(100%, 45rem)' }}>
            <p className="sans" style={{ fontSize: '1.125rem', color: FG, lineHeight: 1.75, marginBottom: 'var(--vy-space-6)', fontWeight: 300 }}>
              The clip is where recording lands first: your buffer and each saved take stay on the device until they sync with your phone. After that, they live in the Vyasa app on your phone. That is where you search, play, export, or delete by default. Optional cloud backup is opt-in; when you turn it on, it is end-to-end encrypted. We do not train on your conversations.
            </p>
            <p className="sans" style={{ fontSize: '1.125rem', color: FG, lineHeight: 1.75, marginBottom: 'var(--vy-space-6)', fontWeight: 300 }}>
              We are not in the business of bricking hardware or holding your captures hostage. Your memories should not disappear because a vendor changed their mind.
            </p>
          </div>
        </div>
      </section>

      {/* THE NAME */}
      <section className="vy-section">
        <div className="container">
          <div className="section-label" style={{ marginBottom: 'var(--vy-space-10)' }}>The name</div>
          <p className="serif" style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.4, fontWeight: 400,
            letterSpacing: '-0.015em', maxWidth: 'min(100%, 56.25rem)', color: FG,
          }}>
            Vyasa is the sage who took the Mahabharata, which existed only as oral tradition,
            and committed it to permanent form.
          </p>
          <p className="sans" style={{
            fontSize: '1.0625rem', lineHeight: 1.7, color: MUTED, maxWidth: 'min(100%, 43.75rem)', marginTop: 'var(--vy-space-6)', fontWeight: 300,
          }}>
            We're doing a much smaller version of the same thing.
          </p>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="vy-section">
        <div className="container">
          <div className="section-label" style={{ marginBottom: 'var(--vy-space-10)' }}>From me</div>

          <div style={{ maxWidth: 'min(100%, 45rem)' }}>
            <p className="sans" style={{ fontSize: '1.1875rem', color: FG, lineHeight: 1.7, marginBottom: 'var(--vy-space-6)', fontWeight: 300 }}>
              I have ADHD. I forget things constantly. The number a vendor quoted, what my doctor said
              about my mom's medication, the actual reason a customer churned, what my girlfriend told me
              long back (kinda important). I take notes and lose the notes.
            </p>
            <p className="sans" style={{ fontSize: '1.1875rem', color: FG, lineHeight: 1.7, marginBottom: 'var(--vy-space-6)', fontWeight: 300 }}>
              I've spent years on ranking and relevance. Finding the right moment is a ranking problem.
              The same math that decides what shows up when you search can decide which moment from your week
              is the one you're trying to find.
            </p>
            <p className="sans" style={{ fontSize: '1.1875rem', color: FG, lineHeight: 1.7, marginBottom: 'var(--vy-space-10)', fontWeight: 300 }}>
              That's the whole pitch. I'm building this because I needed it. If you needed it too,
              get on the list.
            </p>
            <p className="serif" style={{ fontSize: '1.0625rem', color: MUTED, fontStyle: 'italic' }}>
              Dev. R.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="waitlist" className="vy-section vy-section--waitlist" style={{ position: 'relative' }}>
        <div className="container container--narrow" style={{ textAlign: 'left' }}>
          <h2 className="serif" style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1,
            letterSpacing: '-0.03em', marginBottom: 'var(--vy-space-8)',
          }}>
            Limited first run.
          </h2>
          <p className="sans" style={{ fontSize: '1.125rem', color: MUTED, marginBottom: 'var(--vy-space-6)', maxWidth: 'min(100%, 33.75rem)', lineHeight: 1.6, fontWeight: 300 }}>
            Hand-assembled. We ship to this list first. Drop your email and we'll let you know
            when yours is ready.
          </p>
          <p className="sans" style={{ fontSize: '0.9375rem', color: FG, lineHeight: 1.5, marginBottom: 'var(--vy-space-10)', maxWidth: 'min(100%, 33.75rem)', fontWeight: 400 }}>
            Missed the form up top? Same waitlist. Add your email here.
          </p>

          {!submitted ? (
            <div style={{ maxWidth: 'min(100%, 30rem)' }}>
              <div style={{ display: 'flex', gap: 'var(--vy-space-4)', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <input type="email" placeholder="your@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && void handleSubmit(e)} />
                </div>
                <button type="button" disabled={loading} onClick={() => void handleSubmit()} className="cta-btn">Join waitlist</button>
              </div>
              {error && (
                <p className="sans" role="alert" style={{ fontSize: '0.8125rem', color: '#c97a6a', marginTop: 'var(--vy-space-3)', lineHeight: 1.4 }}>
                  {error}
                </p>
              )}
            </div>
          ) : (
            <div className="waitlist-reveal" style={{ borderLeft: `0.125rem solid ${SAFFRON}`, paddingLeft: 'var(--vy-space-5)', maxWidth: 'min(100%, 30rem)', animation: 'fadeUp 0.5s ease-out forwards' }}>
              <p className="serif" style={{ fontSize: '1.375rem', marginBottom: 'var(--vy-space-2)' }}>
                {waitlistDuplicate ? "You're already on the waitlist." : "You're in."}
              </p>
              <p className="sans" style={{ fontSize: '0.875rem', color: MUTED, lineHeight: 1.6 }}>
                {waitlistDuplicate
                  ? "No need to sign up again. We'll email you when there's something worth knowing."
                  : "We'll email you when yours is ready."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vy-footer">
        <div className="container">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--vy-grid-gap)', alignItems: 'start' }}>
            <div>
              <div className="serif" style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: 'var(--vy-space-3)', letterSpacing: '-0.01em' }}>Vyasa</div>
              <p className="sans" style={{ fontSize: '0.8125rem', color: MUTED, lineHeight: 1.6, maxWidth: 'min(100%, 20rem)' }}>
                Your conversations searchable. Built by Avyay Labs in Bangalore.
              </p>
            </div>
            <div>
              <div className="mono" style={{ fontSize: '0.6875rem', color: MUTED, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 'var(--vy-space-4)' }}>Email</div>
              <a href="mailto:hi@avyaylabs.com" className="nav-link sans" style={{ fontSize: '0.875rem', display: 'block' }}>
                hi@avyaylabs.com
              </a>
            </div>
            <div>
              <div className="mono" style={{ fontSize: '0.6875rem', color: MUTED, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 'var(--vy-space-4)' }}>Elsewhere</div>
              <a href="https://x.com/avyaylabs" target="_blank" rel="noopener noreferrer" className="nav-link sans" style={{ fontSize: '0.875rem', display: 'block', marginBottom: 'var(--vy-space-2)' }}>X</a>
              <a href="https://www.linkedin.com/in/rdg07/" target="_blank" rel="noopener noreferrer" className="nav-link sans" style={{ fontSize: '0.875rem', display: 'block' }}>LinkedIn</a>
            </div>
          </div>

          <div style={{
            marginTop: 'var(--vy-space-16)', paddingTop: 'var(--vy-space-6)', borderTop: `1px solid ${LINE}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--vy-space-4)',
          }}>
            <p className="mono" style={{ fontSize: '0.6875rem', color: MUTED, letterSpacing: '0.05em' }}>
              © 2026 Avyay Labs · Bangalore
            </p>
            <p className="mono" style={{ fontSize: '0.6875rem', color: MUTED, letterSpacing: '0.05em' }}>
              VYAH-suh, fyi
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
