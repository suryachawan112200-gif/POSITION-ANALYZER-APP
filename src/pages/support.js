import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaComments, FaEnvelope, FaLock, FaFileAlt, FaHeadset, FaQuestionCircle, FaShieldAlt } from "react-icons/fa";

export default function Support() {
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
        <title>AIVISOR Support - Get Help Fast</title>
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
            <Link href="/subscribe">Upgrade</Link>
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

      <main className="support-main">
        <section className="hero-support">
          <h1>Need Help? We're Here for You</h1>
          <p className="subtitle">Quick access to support resources and assistance for all your AIVISOR questions.</p>
        </section>

        <nav className="support-nav">
          <ul>
            <li><a href="#live-chat">Live Chat</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#resources">Resources</a></li>
          </ul>
        </nav>

        <section id="live-chat" className="support-block">
          <div className="section-header">
            <FaComments className="section-icon" />
            <h2>Live Chat Support</h2>
          </div>
          <p>Get immediate assistance with position analysis, technical issues, or general questions through our live chat system.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaHeadset />
              </div>
              <h3>24/7 Availability</h3>
              <p>Access live chat anytime through the support widget in your dashboard.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaComments />
              </div>
              <h3>Quick Response</h3>
              <p>Typical response time under 5 minutes during business hours.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaShieldAlt />
              </div>
              <h3>Secure Communication</h3>
              <p>All chat sessions are encrypted and private.</p>
            </div>
          </div>
          <button className="chat-btn">Open Live Chat</button>
        </section>

        <section id="contact" className="support-block">
          <div className="section-header">
            <FaEnvelope className="section-icon" />
            <h2>Contact Us</h2>
          </div>
          <p>Reach out to our support team for non-urgent inquiries and feedback.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaEnvelope />
              </div>
              <h3>Email Support</h3>
              <p>support@aivisor.com<br />Response within 24 hours</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaQuestionCircle />
              </div>
              <h3>Business Inquiries</h3>
              <p>partnerships@aivisor.com<br />For collaboration opportunities</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaHeadset />
              </div>
              <h3>Location</h3>
              <p>Mumbai, Maharashtra<br />India</p>
            </div>
          </div>
        </section>

        <section id="privacy" className="support-block">
          <div className="section-header">
            <FaLock className="section-icon" />
            <h2>Privacy Policy</h2>
          </div>
          <p>We are committed to protecting your privacy and handling your data responsibly.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaLock />
              </div>
              <h3>Data Collection</h3>
              <p>We only collect trade inputs (coin, entry price, timeframe) for analysis purposes.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaShieldAlt />
              </div>
              <h3>Data Security</h3>
              <p>All data is encrypted with 256-bit AES encryption during transmission and storage.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaFileAlt />
              </div>
              <h3>Data Retention</h3>
              <p>Analysis data is automatically deleted after 30 days unless required for legal purposes.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaQuestionCircle />
              </div>
              <h3>Your Rights</h3>
              <p>You can request data deletion or access to your information at any time.</p>
            </div>
          </div>
        </section>

        <section id="terms" className="support-block">
          <div className="section-header">
            <FaFileAlt className="section-icon" />
            <h2>Terms of Service</h2>
          </div>
          <p>By using AIVISOR, you agree to our terms of service. Please read carefully.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaQuestionCircle />
              </div>
              <h3>Disclaimer</h3>
              <p>AIVISOR provides analytical insights only. All trading decisions are your responsibility.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaShieldAlt />
              </div>
              <h3>Account Terms</h3>
              <p>Users must be at least 18 years old and responsible for maintaining account security.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaFileAlt />
              </div>
              <h3>Service Changes</h3>
              <p>We may modify services with notice. Continued use constitutes acceptance of changes.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaHeadset />
              </div>
              <h3>Limitation of Liability</h3>
              <p>Our liability is limited to the extent permitted by applicable law.</p>
            </div>
          </div>
        </section>

        <section id="resources" className="support-block">
          <div className="section-header">
            <FaQuestionCircle className="section-icon" />
            <h2>Support Resources</h2>
          </div>
          <p>Access our knowledge base and community resources for self-help and learning.</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaQuestionCircle />
              </div>
              <h3>Knowledge Base</h3>
              <p>Comprehensive guides and tutorials for using AIVISOR effectively.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaComments />
              </div>
              <h3>Community Forum</h3>
              <p>Connect with other users and share trading insights and strategies.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaFileAlt />
              </div>
              <h3>Release Notes</h3>
              <p>Stay updated with the latest features and improvements.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaHeadset />
              </div>
              <h3>Premium Support</h3>
              <p>Priority assistance and dedicated support for premium subscribers.</p>
            </div>
          </div>
          <button className="resources-btn">Visit Knowledge Base</button>
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

        .support-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hero-support {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          margin-bottom: 3rem;
          box-shadow: var(--shadow-md);
        }

        [data-theme="dark"] .hero-support {
          background: var(--bg-primary);
        }

        .hero-support h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .support-nav {
          background: var(--bg-card);
          padding: 1rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
          box-shadow: var(--shadow-md);
        }

        [data-theme="dark"] .support-nav {
          background: var(--bg-secondary);
        }

        .support-nav ul {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .support-nav a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
        }

        .support-nav a:hover {
          color: var(--accent-blue);
          background: rgba(67, 192, 246, 0.1);
        }

        .support-block {
          background: var(--bg-card);
          padding: 2rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
          box-shadow: var(--shadow-md);
        }

        [data-theme="dark"] .support-block {
          background: var(--bg-secondary);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .section-icon {
          font-size: 2rem;
          color: var(--accent-blue);
        }

        .support-block h2 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }

        .support-block p {
          margin-bottom: 2rem;
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .benefit-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }

        [data-theme="dark"] .benefit-card {
          background: var(--bg-secondary);
        }

        .benefit-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .benefit-icon {
          font-size: 1.5rem;
          color: var(--accent-blue);
          margin-bottom: 1rem;
        }

        .benefit-card h3 {
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }

        .benefit-card p {
          color: var(--text-secondary);
          margin-bottom: 0;
          font-size: 0.95rem;
        }

        .chat-btn, .contact-btn, .resources-btn {
          background: var(--button-gradient);
          color: var(--button-text);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--shadow-sm);
          font-size: 1rem;
        }

        .chat-btn:hover, .contact-btn:hover, .resources-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
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
          .support-nav ul {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .support-nav a {
            text-align: center;
          }
          
          .support-block {
            padding: 1.5rem;
          }
          
          .hero-support {
            padding: 2rem 1rem;
          }
          
          .hero-support h1 {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
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
          
          .footer-content {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}