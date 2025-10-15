// pages/support.js - Support Page
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
          <ul>
            <li>Access it via the footer link or in-app button for real-time responses from our support team.</li>
            <li>Typical response time is under 2 minutes during peak hours.</li>
            <li>Provide your user ID or query details for faster resolution.</li>
            <li>No account required for basic help; premium users get priority.</li>
            <li>For urgent issues, include screenshots of errors or outputs.</li>
          </ul>
          <button className="chat-btn">Start Live Chat</button>
        </section>

        <section id="contact" className="support-block">
          <h2>Contact Us</h2>
          <p>Reach out via email at support@aivisor.com for non-urgent inquiries.</p>
          <ul>
            <li>Our physical address: AIVISOR HQ, 123 Crypto Lane, Silicon Valley, CA 94043.</li>
            <li>Phone support: +1 (800) 123-4567 (Mon-Fri, 9AM-5PM PST).</li>
            <li>Social media: Follow us on X (@AIVISOR_Official) or LinkedIn for updates.</li>
            <li>Submit feedback or feature requests through the form on our website.</li>
            <li>We respond to all contacts within 48 hours.</li>
          </ul>
          <button className="contact-btn">Send Email</button>
        </section>

        <section id="privacy" className="support-block">
          <h2>Privacy Policy</h2>
          <p>We collect minimal data: trade inputs like coin, entry price, and timeframe for analysis only.</p>
          <ul>
            <li>No personal financial details or API keys are stored or required.</li>
            <li>Data is encrypted with 256-bit AES and deleted after 30 days.</li>
            <li>We comply with GDPR and CCPA; no data sharing with third parties without consent.</li>
            <li>You can request data deletion via support@aivisor.com.</li>
            <li>Cookies are used for session management; opt-out available in settings.</li>
          </ul>
        </section>

        <section id="terms" className="support-block">
          <h2>Terms of Service</h2>
          <p>By using AIVISOR, you agree to our terms of service, effective October 15, 2025.</p>
          <ul>
            <li>This is not financial advice; all outputs are informational and for educational purposes.</li>
            <li>Users must be 18+ and responsible for their trading decisions.</li>
            <li>We reserve the right to update terms with notice via email or app.</li>
            <li>Prohibited: Misuse for illegal activities or automated scraping.</li>
            <li>Violation may lead to account suspension; disputes resolved under California law.</li>
          </ul>
        </section>

        <section id="support" className="support-block">
          <h2>Support Resources</h2>
          <p>Our knowledge base covers FAQs on usage, troubleshooting, and features.</p>
          <ul>
            <li>Submit tickets via the app for technical issues like API errors or analysis discrepancies.</li>
            <li>Community forum available for user discussions and tips.</li>
            <li>Premium support includes dedicated agents and faster resolution.</li>
            <li>Check status updates on our X page for downtime or maintenance.</li>
            <li>For backend code issues, reference our GitHub repo (if open-source).</li>
          </ul>
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

        .support-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero-support {
          text-align: center;
          padding: 3rem 0;
          background: var(--bg-secondary);
          border-radius: 1rem;
          margin-bottom: 2rem;
        }

        .hero-support h1 {
          font-size: 2.5rem;
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.2rem;
          color: var(--text-muted);
        }

        .support-nav {
          background: var(--bg-card);
          padding: 1rem;
          border-radius: 1rem;
          margin-bottom: 2rem;
        }

        .support-nav ul {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .support-nav a {
          color: var(--accent-cyan);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .support-nav a:hover {
          color: var(--accent-violet);
        }

        .support-block {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .support-block h2 {
          color: var(--accent-cyan);
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }

        .support-block p {
          margin-bottom: 1rem;
          color: var(--text-light);
        }

        .support-block ul {
          list-style: none;
          margin-bottom: 1.5rem;
        }

        .support-block li {
          padding: 0.5rem 0;
          color: var(--text-muted);
        }

        .chat-btn, .contact-btn, .resources-btn {
          background: var(--gradient);
          color: var(--bg-primary);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .chat-btn:hover, .contact-btn:hover, .resources-btn:hover {
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
          transform: translateY(-2px);
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
        }
      `}</style>
    </>
  );
}