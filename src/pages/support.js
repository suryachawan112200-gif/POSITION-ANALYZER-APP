import Head from "next/head";
import Link from "next/link";

export default function Support() {
  return (
    <>
      <Head>
        <title>AIVISOR Support - Get Help Fast</title>
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
            <Link href="/subscribe">Upgrade</Link>
          </nav>
          <div className="header-actions">
            <Link href="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </div>
      </header>

      <main className="support-main">
        <section className="hero-support">
          <h1>Need Help? We're Here 24/7</h1>
          <p className="subtitle">Quick access to live chat, email, and resources for all your AIVISOR questions.</p>
        </section>

        <nav className="support-nav">
          <ul>
            <li><a href="#live-chat">Live Chat Support</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#support">Support Resources</a></li>
          </ul>
        </nav>

        <section id="live-chat" className="support-block">
          <h2>Need Help? Live Chat Support</h2>
          <p>Live chat is available 24/7 for immediate assistance with position analysis, backend issues, or general queries.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">💬</span>
              <p>Access it via the footer link or in-app button for real-time responses from our support team.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⏱️</span>
              <p>Typical response time is under 2 minutes during peak hours.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🆔</span>
              <p>Provide your user ID or query details for faster resolution.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⭐</span>
              <p>No account required for basic help; premium users get priority.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📸</span>
              <p>For urgent issues, include screenshots of errors or outputs.</p>
            </div>
          </div>
          <button className="chat-btn">Start Live Chat</button>
        </section>

        <section id="contact" className="support-block">
          <h2>Contact Us</h2>
          <p>Reach out via email at support@aivisor.com for non-urgent inquiries.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🏢</span>
              <p>Our physical address: AIVISOR HQ, 123 Crypto Lane, Silicon Valley, CA 94043.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📞</span>
              <p>Phone support: +1 (800) 123-4567 (Mon-Fri, 9AM-5PM PST).</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🌐</span>
              <p>Social media: Follow us on X (@AIVISOR_Official) or LinkedIn for updates.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📝</span>
              <p>Submit feedback or feature requests through the form on our website.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⏳</span>
              <p>We respond to all contacts within 48 hours.</p>
            </div>
          </div>
          <button className="contact-btn">Send Email</button>
        </section>

        <section id="privacy" className="support-block">
          <h2>Privacy Policy</h2>
          <p>We collect minimal data: trade inputs like coin, entry price, and timeframe for analysis only.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🔒</span>
              <p>No personal financial details or API keys are stored or required.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🔑</span>
              <p>Data is encrypted with 256-bit AES and deleted after 30 days.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📜</span>
              <p>We comply with GDPR and CCPA; no data sharing with third parties without consent.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🗑️</span>
              <p>You can request data deletion via support@aivisor.com.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🍪</span>
              <p>Cookies are used for session management; opt-out available in settings.</p>
            </div>
          </div>
        </section>

        <section id="terms" className="support-block">
          <h2>Terms of Service</h2>
          <p>By using AIVISOR, you agree to our terms of service, effective October 15, 2025.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">⚠️</span>
              <p>This is not financial advice; all outputs are informational and for educational purposes.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🔞</span>
              <p>Users must be 18+ and responsible for their trading decisions.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📢</span>
              <p>We reserve the right to update terms with notice via email or app.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🚫</span>
              <p>Prohibited: Misuse for illegal activities or automated scraping.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⚖️</span>
              <p>Violation may lead to account suspension; disputes resolved under California law.</p>
            </div>
          </div>
        </section>

        <section id="support" className="support-block">
          <h2>Support Resources</h2>
          <p>Our knowledge base covers FAQs on usage, troubleshooting, and features.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🎟️</span>
              <p>Submit tickets via the app for technical issues like API errors or analysis discrepancies.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">👥</span>
              <p>Community forum available for user discussions and tips.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⭐</span>
              <p>Premium support includes dedicated agents and faster resolution.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📱</span>
              <p>Check status updates on our X page for downtime or maintenance.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💻</span>
              <p>For backend code issues, reference our GitHub repo (if open-source).</p>
            </div>
          </div>
          <button className="resources-btn">Browse Knowledge Base</button>
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

        .support-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero-support {
          text-align: center;
          padding: 4rem 0;
          background: var(--card-bg);
          border-radius: 1rem;
          margin-bottom: 3rem;
          box-shadow: var(--shadow-soft);
        }

        .hero-support h1 {
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

        .support-nav {
          background: var(--card-bg);
          padding: 1rem;
          border: 1px solid var(--card-border);
          border-radius: 1rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-soft);
        }

        .support-nav ul {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .support-nav a {
          color: var(--text-paragraph);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .support-nav a:hover {
          color: var(--text-title);
        }

        .support-block {
          background: var(--card-bg);
          padding: 2rem;
          border: 1px solid var(--card-border);
          border-radius: 1rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-soft);
        }

        .support-block h2 {
          color: var(--text-title);
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }

        .support-block p {
          margin-bottom: 1rem;
          color: var(--text-paragraph);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .benefit-card {
          background: var(--bg-primary);
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

        .chat-btn, .contact-btn, .resources-btn {
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

        .chat-btn:hover, .contact-btn:hover, .resources-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15), 0 3px 5px -1px rgba(0, 0, 0, 0.1);
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
          .support-nav ul {
            flex-direction: column;
            gap: 1rem;
          }
          .support-block {
            padding: 1.5rem;
          }
          .hero-support h1 {
            font-size: 2rem;
          }
          .benefits-grid {
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