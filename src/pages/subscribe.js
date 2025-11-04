import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaRocket, FaChartLine, FaHistory, FaFilePdf, FaBolt, FaHeadset, FaUserCog, FaDownload, FaGlobe, FaFlask, FaChartBar, FaCoffee } from "react-icons/fa";

export default function Subscribe() {
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (prefersDark) {
        setTheme('dark');
      }
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Head>
        <title>AIVISOR Premium - Upgrade Your Edge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🤖</div>
            <span className="logo-text">AIVISOR</span>
            <span className="version-tag">[V3.2]</span>
          </div>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/support">Support</Link>
          </nav>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link href="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </div>
      </header>

      <main className="subscribe-main">
        <section className="hero-subscribe">
          <h1>Transform Your Trading with AIVISOR Premium</h1>
          <p className="subtitle">Professional-grade analytics for serious traders</p>
          <div className="pricing-cards">
            <div className="pricing-card monthly">
              <div className="pricing-header">
                <h3>Monthly</h3>
                <div className="price">$29<span>/month</span></div>
                <p className="billing">Billed monthly</p>
              </div>
              <button className="activate-btn">Get Started</button>
              <div className="pricing-footer">
                <p>Cancel anytime</p>
              </div>
            </div>
            
            <div className="pricing-card yearly">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Yearly</h3>
                <div className="price">$290<span>/year</span></div>
                <p className="billing">Billed annually</p>
                <div className="savings">Save $58/year</div>
              </div>
              <button className="activate-btn primary">Get Started</button>
              <div className="pricing-footer">
                <p>30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <h2>🚀 Everything You Get with Premium</h2>
          <p className="intro-text">
            Unlock unlimited access to advanced analytics, priority support, and exclusive features designed for professional traders.
          </p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaRocket />
              </div>
              <h3>Unlimited Analyses Per Day</h3>
              <p>Run as many position checks as needed (vs. 2 free limit), including multi-TF comparisons—perfect for active scalpers testing 15m/1h entries without cutoffs.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaHistory />
              </div>
              <h3>Extended History Retention</h3>
              <p>Keep 6 months of analysis logs (vs. 3 days free), with searchable filters by coin/outcome—helps users review patterns like "BTC longs in greed phases."</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaFilePdf />
              </div>
              <h3>Custom Backtest Reports</h3>
              <p>Generate PDF exports of your strategy's hit rates (e.g., 58% TGT wins on 1h data) for specific coins/timeframes—exportable for personal journaling or tax prep.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaBolt />
              </div>
              <h3>Priority API Rate Limits</h3>
              <p>Faster backend responses (&lt;50ms) during peak hours, plus higher Bybit data pulls—reduces wait times for live price/hit polls in the dashboard.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaHeadset />
              </div>
              <h3>Dedicated Email Support</h3>
              <p>24-hour response SLA for queries (e.g., "Why did SL snap to this pivot?") vs. community forums—includes 1:1 setup help for integrations like n8n alerts.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaUserCog />
              </div>
              <h3>Personalized Risk Profiles</h3>
              <p>Save user prefs (e.g., conservative SL at 1 ATR) across sessions, auto-applied to new analyses—tracks how it impacts your avg hold time.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaDownload />
              </div>
              <h3>Advanced Export Options</h3>
              <p>CSV/PDF downloads of full history with hit timelines and P/L curves—integrates with Google Sheets for custom tracking (no watermarks on premium).</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaGlobe />
              </div>
              <h3>Multi-Asset Expansion</h3>
              <p>Access forex/stock pairs (e.g., EURUSD, AAPL) beyond crypto—leverages your engine's adaptability for diversified portfolios.</p>
            </div>
          </div>
        </section>

        <section className="exclusive-section">
          <h2>💎 Yearly-Only Exclusives</h2>
          <div className="exclusive-grid">
            <div className="exclusive-card">
              <div className="exclusive-icon">
                <FaFlask />
              </div>
              <h3>Early Feature Beta Access</h3>
              <p>Test upcoming modules like portfolio sync (read-only Bybit import) or AI chat refinements—get 2 weeks head-start on feedback loops.</p>
            </div>
            
            <div className="exclusive-card">
              <div className="exclusive-icon">
                <FaChartBar />
              </div>
              <h3>Quarterly Strategy Reviews</h3>
              <p>Automated email recaps of your top-performing biases (e.g., "78% accuracy on strong bull shorts") with tweaks based on your history data.</p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>What Premium Traders Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"The unlimited analyses saved me 5+ hours weekly. My win rate jumped 23% after using custom risk profiles."</p>
              <div className="testimonial-author">
                <span className="author-name">Michael T.</span>
                <span className="author-role">BTC Futures Trader</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p>"Priority support resolved my API integration in under 2 hours. The backtesting reports are gold for my journaling."</p>
              <div className="testimonial-author">
                <span className="author-name">Sarah K.</span>
                <span className="author-role">SOL Spot Trader</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p>"The multi-asset expansion let me apply AIVISOR's edge to forex. Worth every penny for diversified traders."</p>
              <div className="testimonial-author">
                <span className="author-name">David L.</span>
                <span className="author-role">Forex & Crypto</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-final">
          <h2>Ready to Level Up Your Trading?</h2>
          <p>Join 3,000+ professional traders who trust AIVISOR Premium</p>
          <div className="cta-buttons">
            <button className="activate-btn large">Get Premium - $29/Mo</button>
            <div className="money-back">
              <FaCoffee className="coffee-icon" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
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
        :root {
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8FBFF;
          --bg-card: #FFFFFF;
          --accent-blue: #43C0F6;
          --accent-purple: #7A5CFF;
          --text-primary: #333333;
          --text-secondary: #6B7280;
          --text-muted: #9CA3AF;
          --success: #3ED598;
          --error: #EF4444;
          --warning: #F59E0B;
          --button-gradient: linear-gradient(135deg, #43C0F6, #3AEAB6);
          --border-light: #E5E7EB;
          --border-medium: #D1D5DB;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          --radius-sm: 0.25rem;
          --radius-md: 0.5rem;
          --radius-lg: 0.75rem;
          --radius-xl: 1rem;
        }

        [data-theme="dark"] {
          --bg-primary: #0F172A;
          --bg-secondary: #1E293B;
          --bg-card: #1E293B;
          --text-primary: #F1F5F9;
          --text-secondary: #CBD5E1;
          --text-muted: #94A3B8;
          --border-light: #334155;
          --border-medium: #475569;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(67, 192, 246, 0.05) 0%, rgba(58, 234, 182, 0.05) 100%);
          pointer-events: none;
          z-index: -1;
        }

        [data-theme="dark"] body::before {
          background: linear-gradient(135deg, rgba(67, 192, 246, 0.03) 0%, rgba(58, 234, 182, 0.03) 100%);
        }

        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-light);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        [data-theme="dark"] .header {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 1px solid var(--border-light);
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
          font-size: 1.5rem;
          background: linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .version-tag {
          background: var(--accent-blue);
          color: #FFFFFF;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          box-shadow: var(--shadow-sm);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s;
          font-weight: 500;
        }

        .nav-links a:hover {
          color: var(--accent-blue);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 1.25rem;
          transition: color 0.3s;
        }

        .theme-toggle:hover {
          color: var(--accent-blue);
        }

        .login-btn {
          background: var(--button-gradient);
          color: var(--button-text);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .subscribe-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero-subscribe {
          text-align: center;
          padding: 3rem 0;
          margin-bottom: 3rem;
        }

        .hero-subscribe h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .pricing-cards {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .pricing-card {
          background: var(--bg-card);
          padding: 2rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          max-width: 350px;
          width: 100%;
          box-shadow: var(--shadow-md);
          position: relative;
          transition: all 0.3s;
        }

        [data-theme="dark"] .pricing-card {
          background: var(--bg-secondary);
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .pricing-card.yearly {
          border: 2px solid var(--accent-blue);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--warning);
          color: white;
          padding: 0.25rem 1rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .pricing-header {
          margin-bottom: 2rem;
        }

        .pricing-header h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .price {
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent-blue);
          margin-bottom: 0.5rem;
        }

        .price span {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .billing {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .savings {
          background: rgba(62, 213, 152, 0.1);
          color: var(--success);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .activate-btn {
          background: var(--bg-card);
          color: var(--text-primary);
          padding: 1rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          margin-bottom: 1rem;
        }

        [data-theme="dark"] .activate-btn {
          background: var(--bg-secondary);
        }

        .activate-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .activate-btn.primary {
          background: var(--button-gradient);
          color: white;
          border: none;
        }

        .pricing-footer {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .benefits-section {
          text-align: center;
          margin-bottom: 4rem;
        }

        .benefits-section h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .intro-text {
          font-size: 1.1rem;
          color: var(--text-secondary);
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
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }

        [data-theme="dark"] .benefit-card {
          background: var(--bg-secondary);
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .benefit-icon {
          font-size: 2.5rem;
          color: var(--accent-blue);
          margin-bottom: 1.5rem;
        }

        .benefit-card h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .benefit-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .exclusive-section {
          text-align: center;
          margin-bottom: 4rem;
          background: var(--bg-secondary);
          padding: 3rem 2rem;
          border-radius: var(--radius-lg);
        }

        [data-theme="dark"] .exclusive-section {
          background: var(--bg-primary);
        }

        .exclusive-section h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .exclusive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .exclusive-card {
          background: var(--bg-card);
          padding: 2rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }

        [data-theme="dark"] .exclusive-card {
          background: var(--bg-secondary);
        }

        .exclusive-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .exclusive-icon {
          font-size: 2.5rem;
          color: var(--accent-purple);
          margin-bottom: 1.5rem;
        }

        .exclusive-card h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .exclusive-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .testimonials-section {
          text-align: center;
          margin-bottom: 4rem;
        }

        .testimonials-section h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: var(--bg-card);
          padding: 2rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          text-align: left;
          position: relative;
        }

        [data-theme="dark"] .testimonial-card {
          background: var(--bg-secondary);
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 4rem;
          color: var(--accent-blue);
          opacity: 0.2;
          font-family: serif;
        }

        .testimonial-card p {
          color: var(--text-primary);
          font-style: italic;
          margin-bottom: 1.5rem;
          padding-top: 2rem;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-light);
          padding-top: 1rem;
        }

        .author-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .author-role {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .cta-final {
          text-align: center;
          padding: 4rem 0;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          margin-bottom: 3rem;
        }

        [data-theme="dark"] .cta-final {
          background: var(--bg-primary);
        }

        .cta-final h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .cta-final p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .activate-btn.large {
          background: var(--button-gradient);
          color: white;
          padding: 1.25rem 3rem;
          border: none;
          border-radius: 2rem;
          font-size: 1.25rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--shadow-md);
        }

        .activate-btn.large:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .money-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .coffee-icon {
          color: var(--accent-blue);
        }

        .footer {
          padding: 2rem;
          text-align: center;
          background: var(--bg-card);
          border-top: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }

        [data-theme="dark"] .footer {
          background: var(--bg-secondary);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .home-btn {
          background: var(--button-gradient);
          color: var(--button-text);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--shadow-sm);
        }

        .home-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            padding: 0 1rem;
          }
          
          .nav-links {
            flex-direction: column;
            gap: 1rem;
          }
          
          .hero-subscribe h1 {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .pricing-cards {
            flex-direction: column;
            align-items: center;
          }
          
          .benefits-grid, .exclusive-grid, .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 1rem;
          }
          
          .cta-final {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </>
  );
}