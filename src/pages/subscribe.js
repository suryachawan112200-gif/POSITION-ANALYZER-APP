// pages/subscribe.js - Subscription Page
import Head from "next/head";
import Link from "next/link";

export default function Subscribe() {
  return (
    <>
      <Head>
        <title>AIVISOR Premium - Upgrade Your Edge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🤖</div>
            <span className="logo-text">AIVISOR</span>
            <span className="version-tag">[V3.1]</span>
          </div>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/support">Support</Link>
          </nav>
          <div className="header-actions">
            <Link href="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </div>
      </header>

      <main className="subscribe-main">
        <section className="hero-subscribe">
          <h1>Why Upgrade to AIVISOR Premium?</h1>
          <p className="subtitle">Unlock Your Edge for Just $29/Month</p>
          <div className="price-card">
            <h2>$29<span>/month</span></h2>
            <p>Less than a daily coffee—pays for itself in one trade</p>
            <button className="activate-btn">ACTIVATE PREMIUM NOW</button>
          </div>
        </section>

        <section className="benefits-section">
          <h2>🚀 The Smart Move for Serious Traders</h2>
          <p className="intro-text">
            Tired of guessing trades? AIVISOR Premium turns analysis into action—your AI co-pilot for crypto dominance. 
            At $29/month (less than a daily coffee run), it's the upgrade that pays for itself in one winning position. 
            No fluff, just firepower.
          </p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">∞</span>
              <h3>Unlimited Analyses</h3>
              <p>Run 100s of position scans daily—no caps, no waiting. Test every idea, every timeframe.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🔔</span>
              <h3>Real-Time Alerts</h3>
              <p>Get push notifications for trend shifts, pattern breaks, or when your SL/TP hits. Never miss a move.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🔄</span>
              <h3>Advanced Backtesting</h3>
              <p>Simulate trades on 6+ months of data. See win rates, RR ratios, and optimize strategies before going live.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⚙️</span>
              <h3>Custom Risk Profiles</h3>
              <p>Tailor SL/TP to your style—aggressive or conservative—with personalized RR calculators.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💬</span>
              <h3>Priority Support</h3>
              <p>24/7 live chat with experts + exclusive webinars on AI trading secrets.</p>
            </div>
          </div>
        </section>

        <section className="plus-points">
          <h2>💎 The Plus Points That Make It a No-Brainer</h2>
          <div className="plus-grid">
            <div className="plus-item">
              <h3>Save Time, Stack Gains</h3>
              <p>Skip hours of chart staring; get pro-level insights in seconds. Users report 2-3x faster decision-making.</p>
            </div>
            <div className="plus-item">
              <h3>Risk-Proof Your Portfolio</h3>
              <p>Premium's dynamic SL/TP zones cut losses by up to 30% on average—backed by our backtests.</p>
            </div>
            <div className="plus-item">
              <h3>Edge Over the Crowd</h3>
              <p>While free users wait, you get first dibs on emerging signals. Join 3K+ pros crushing markets.</p>
            </div>
            <div className="plus-item">
              <h3>30-Day Money-Back</h3>
              <p>Try risk-free. If it doesn't boost your P/L, full refund—no questions.</p>
            </div>
          </div>
        </section>

        <section className="cta-final">
          <h2>Ready to Level Up?</h2>
          <p>Hit "ACTIVATE" below and transform guesswork into gains. Your next 10x starts here. 💰</p>
          <button className="activate-btn large">ACTIVATE PREMIUM - $29/MO</button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 AIVISOR | Powered by xAI</p>
          <Link href="/">
            <button className="home-btn">← Back to Home</button>
          </Link>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --bg-primary: #000000;
          --bg-secondary: #0A0A23;
          --bg-card: rgba(10, 10, 35, 0.85);
          --accent-cyan: #00D4FF;
          --accent-violet: #7C3AED;
          --text-light: #E2E8F0;
          --text-muted: #94A3B8;
          --success: #10B981;
          --error: #EF4444;
          --gradient: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg-primary);
          color: var(--text-light);
          line-height: 1.6;
        }

        .header {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--accent-cyan);
          padding: 1rem 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          font-weight: 800;
          color: var(--accent-cyan);
        }

        .version-tag {
          background: var(--accent-violet);
          color: var(--bg-primary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: var(--accent-cyan);
        }

        .login-btn {
          background: var(--gradient);
          color: var(--bg-primary);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
        }

        .subscribe-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero-subscribe {
          text-align: center;
          padding: 4rem 0;
          background: var(--bg-secondary);
          border-radius: 1rem;
          margin-bottom: 3rem;
        }

        .hero-subscribe h1 {
          font-size: 3rem;
          font-weight: 800;
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.5rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .price-card {
          background: var(--bg-card);
          padding: 3rem;
          border-radius: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .price-card h2 {
          font-size: 4rem;
          color: var(--success);
          margin-bottom: 1rem;
        }

        .price-card h2 span {
          font-size: 1.5rem;
        }

        .price-card p {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .activate-btn, .activate-btn.large {
          background: var(--gradient);
          color: var(--bg-primary);
          padding: 1rem 3rem;
          border: none;
          border-radius: 3rem;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          animation: pulseGlow 2s infinite;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }

        .activate-btn.large {
          padding: 1.5rem 4rem;
          font-size: 1.5rem;
        }

        .activate-btn:hover {
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.7);
          transform: scale(1.05);
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
          50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.8); }
        }

        .benefits-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .benefits-section h2 {
          font-size: 2.5rem;
          color: var(--accent-violet);
          margin-bottom: 1rem;
        }

        .intro-text {
          font-size: 1.2rem;
          color: var(--text-muted);
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .benefit-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .benefit-card h3 {
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .plus-points {
          text-align: center;
          padding: 3rem 0;
          background: var(--bg-secondary);
          border-radius: 1rem;
          margin-bottom: 3rem;
        }

        .plus-points h2 {
          font-size: 2.5rem;
          color: var(--success);
          margin-bottom: 2rem;
        }

        .plus-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .plus-item {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 1rem;
          text-align: center;
        }

        .plus-item h3 {
          color: var(--accent-violet);
          margin-bottom: 0.5rem;
        }

        .cta-final {
          text-align: center;
          padding: 3rem 0;
        }

        .cta-final h2 {
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .cta-final p {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .footer {
          padding: 2rem;
          text-align: center;
          background: var(--bg-primary);
          border-top: 1px solid var(--accent-cyan);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .home-btn {
          background: var(--gradient);
          color: var(--bg-primary);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .home-btn:hover {
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
        }

        @media (max-width: 768px) {
          .hero-subscribe h1 {
            font-size: 2rem;
          }
          .subtitle {
            font-size: 1.2rem;
          }
          .benefits-grid, .plus-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}