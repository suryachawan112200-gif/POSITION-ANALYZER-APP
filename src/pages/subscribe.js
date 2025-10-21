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
                  --bg-primary: #FFFFFF;
                  --accent-gradient: linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 100%);
                  --green-highlight: #3ED598;
                  --text-title: #1A1A1A;
                  --text-paragraph: #6B7280;
                  --card-bg: #F5F8FF;
                  --card-border: #E5E7EB;
                  --shadow-soft: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  --button-text: #FFFFFF;
                  --success: #3ED598;
                  --error: #EF4444;
                  --text-muted: #6B7280;
                }

                * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
                }

                body {
                  font-family: 'Inter', sans-serif;
                  background: var(--bg-primary);
                  color: var(--text-title);
                  line-height: 1.6;
                }

                .header {
                  background: var(--bg-primary);
                  border-bottom: 1px solid var(--card-border);
                  padding: 1rem 0;
                  box-shadow: var(--shadow-soft);
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
                  background: var(--accent-gradient);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }

                .version-tag {
                  background: var(--card-bg);
                  color: var(--text-paragraph);
                  padding: 0.25rem 0.5rem;
                  border-radius: 9999px;
                  font-size: 0.75rem;
                  box-shadow: var(--shadow-soft);
                }

                .nav-links {
                  display: flex;
                  gap: 2rem;
                }

                .nav-links a {
                  color: var(--text-paragraph);
                  text-decoration: none;
                  transition: color 0.3s;
                }

                .nav-links a:hover {
                  color: var(--text-title);
                }

                .login-btn {
                  background: var(--accent-gradient);
                  color: var(--button-text);
                  padding: 0.75rem 1.5rem;
                  border: none;
                  border-radius: 9999px;
                  font-weight: 600;
                  cursor: pointer;
                  box-shadow: var(--shadow-soft);
                }

                .login-btn:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15), 0 3px 5px -1px rgba(0, 0, 0, 0.1);
                }

                .subscribe-main {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 2rem;
                }

                .hero-subscribe {
                  text-align: center;
                  padding: 4rem 0;
                  background: var(--card-bg);
                  border-radius: 1rem;
                  margin-bottom: 3rem;
                  box-shadow: var(--shadow-soft);
                }

                .hero-subscribe h1 {
                  font-size: 3rem;
                  font-weight: 800;
                  color: var(--text-title);
                  margin-bottom: 1rem;
                }

                .subtitle {
                  font-size: 1.5rem;
                  color: var(--text-paragraph);
                  margin-bottom: 3rem;
                }

                .price-card {
                  background: var(--bg-primary);
                  padding: 3rem;
                  border: 1px solid var(--card-border);
                  border-radius: 1rem;
                  max-width: 400px;
                  margin: 0 auto;
                  box-shadow: var(--shadow-soft);
                }

                .price-card h2 {
                  font-size: 4rem;
                  color: var(--green-highlight);
                  margin-bottom: 1rem;
                }

                .price-card h2 span {
                  font-size: 1.5rem;
                }

                .price-card p {
                  color: var(--text-paragraph);
                  margin-bottom: 2rem;
                }

                .activate-btn, .activate-btn.large {
                  background: var(--accent-gradient);
                  color: var(--button-text);
                  padding: 1rem 3rem;
                  border: none;
                  border-radius: 9999px;
                  font-size: 1.2rem;
                  font-weight: 700;
                  cursor: pointer;
                  transition: all 0.3s;
                  box-shadow: var(--shadow-soft);
                }

                .activate-btn.large {
                  padding: 1.5rem 4rem;
                  font-size: 1.5rem;
                }

                .activate-btn:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15), 0 3px 5px -1px rgba(0, 0, 0, 0.1);
                }

                .benefits-section {
                  text-align: center;
                  margin-bottom: 3rem;
                }

                .benefits-section h2 {
                  font-size: 2.5rem;
                  color: var(--text-title);
                  margin-bottom: 1rem;
                }

                .intro-text {
                  font-size: 1.2rem;
                  color: var(--text-paragraph);
                  max-width: 800px;
                  margin: 0 auto 3rem;
                }

                .benefits-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  gap: 2rem;
                }

                .benefit-card {
                  background: var(--card-bg);
                  padding: 2rem;
                  border: 1px solid var(--card-border);
                  border-radius: 1rem;
                  text-align: center;
                  box-shadow: var(--shadow-soft);
                }

                .benefit-icon {
                  font-size: 3rem;
                  margin-bottom: 1rem;
                  color: #4B9BFF;
                }

                .benefit-card h3 {
                  color: var(--text-title);
                  margin-bottom: 1rem;
                }

                .plus-points {
                  text-align: center;
                  padding: 3rem 0;
                  background: var(--card-bg);
                  border-radius: 1rem;
                  margin-bottom: 3rem;
                  box-shadow: var(--shadow-soft);
                }

                .plus-points h2 {
                  font-size: 2.5rem;
                  color: var(--text-title);
                  margin-bottom: 2rem;
                }

                .plus-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                  gap: 2rem;
                }

                .plus-item {
                  background: var(--bg-primary);
                  padding: 1.5rem;
                  border: 1px solid var(--card-border);
                  border-radius: 1rem;
                  text-align: center;
                  box-shadow: var(--shadow-soft);
                }

                .plus-item h3 {
                  color: var(--text-title);
                  margin-bottom: 0.5rem;
                }

                .cta-final {
                  text-align: center;
                  padding: 3rem 0;
                }

                .cta-final h2 {
                  color: var(--text-title);
                  margin-bottom: 1rem;
                }

                .cta-final p {
                  color: var(--text-paragraph);
                  margin-bottom: 2rem;
                }

                .footer {
                  padding: 2rem;
                  text-align: center;
                  background: var(--bg-primary);
                  border-top: 1px solid var(--card-border);
                  box-shadow: var(--shadow-soft);
                }

                .footer-content {
                  max-width: 1200px;
                  margin: 0 auto;
                }

                .home-btn {
                  background: var(--accent-gradient);
                  color: var(--button-text);
                  padding: 0.75rem 1.5rem;
                  border: none;
                  border-radius: 9999px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s;
                  box-shadow: var(--shadow-soft);
                }

                .home-btn:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15), 0 3px 5px -1px rgba(0, 0, 0, 0.1);
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
                  .header-content {
                    flex-direction: column;
                    gap: 1rem;
                    padding: 0 1rem;
                  }
                  .nav-links {
                    flex-direction: column;
                    gap: 1rem;
                  }
                }
              `}</style>
            </>
          );
        }