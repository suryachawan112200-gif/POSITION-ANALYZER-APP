import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define a custom font style for the logo text
const logoFont = {
  fontFamily: "'Orbitron', monospace",
  color: "var(--primary-accent)",
  textShadow: "0 0 10px var(--primary-accent-glow), 0 0 25px var(--secondary-accent-glow-faint)",
};

// --- COMPONENT FOR THE MAIN ANIMATED LOGO ABOVE THE BOX (Updated to AIVISOR) ---
const AnimatedAivisorTitle = () => (
  <div className="animated-aivisor-title-container">
    <div className="animated-aivisor-title">
      <span className="aivi">AI</span>
      <span className="visor">VISOR</span>
    </div>
    <div className="title-subtitle">CRYPTO POSITION ANALYTICS TERMINAL</div>
  </div>
);
// -----------------------------------------------------------

// --- New Component: Collapsible FAQ Item ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? '[-]' : '[+]'} {question}</span>
        <span className="faq-toggle">{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default function Home() {
  // --- STATE AND LOGIC (SAME AS BEFORE, CLEANER CODE STRUCTURE) ---
  const [market, setMarket] = useState("Futures");
  const [positionType, setPositionType] = useState("Long");
  const [coin, setCoin] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [timeframe, setTimeframe] = useState("15m");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectMarket = (selected) => setMarket(selected);
  const selectPositionType = (selected) => setPositionType(selected);

  const submitData = async () => {
    setResult(null);
    setError(null);
    if (!coin || !entryPrice || !quantity) {
      return alert("ERROR: Input parameters missing. Initiate full data sequence.");
    }
    const parsedEntryPrice = parseFloat(entryPrice);
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedEntryPrice) || isNaN(parsedQuantity)) {
      return alert("ERROR: Price and Quantity must be numerical values.");
    }
    const data = {
      asset_class: "crypto",
      coin: coin.toUpperCase(),
      market: market.toLowerCase(),
      position_type: positionType.toLowerCase(),
      entry_price: parsedEntryPrice,
      quantity: parsedQuantity,
      timeframe: timeframe,
    };
    setLoading(true);
    try {
      // NOTE: Using a placeholder URL for demonstration. Replace with your actual backend URL.
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL || "https://python-backend-pr.vercel.app/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`HTTP Error Code ${response.status}: Analysis engine offline. ${errorDetail.substring(0, 50)}...`);
      }
      const resultData = await response.json();
      setResult(resultData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderMarketOptions = () => (
    <>
      <div className={`slider-option ${market === "Futures" ? "active" : ""}`} onClick={() => selectMarket("Futures")}>
        FUTURES
      </div>
      <div className={`slider-option ${market === "Spot" ? "active" : ""}`} onClick={() => selectMarket("Spot")}>
        SPOT
      </div>
    </>
  );

  const coinPlaceholder = "ASSET ID (e.g., BTCUSDT)";

  return (
    <>
      <header className="fixed-header">
        <div className="left-header">
          <div className="logo">
            <div className="logo-icon-wrapper">
              {/* Using a generic /icon placeholder since I don't have access to your image */}
              <div className="terminal-icon">🤖</div>
            </div>
            <span style={logoFont}>AIVISOR</span>
            <span className="app-tag">[V3.1]</span>
          </div>
          <nav className="main-nav">
            <Link href="#features">FEATURES</Link>|
            <Link href="#howitworks">FLOW</Link>|
            <Link href="#faq">FAQ</Link>|
            <Link href="#contact">CONTACT</Link>|
          </nav>
        </div>
        <div className="right-header">
          <select className="language-switcher">
            <option>ENG</option>
            <option>ESP</option>
          </select>
          <Link href="/login">
            <div className="profile-icon">LOGIN &gt;</div>
          </Link>
        </div>
      </header>

      {/* FIXED: Spacer height matches header height */}
      <div className="header-spacer"></div>

      {/* Increased top margin for better spacing */}
      <div style={{ marginTop: '50px' }}> 
        <AnimatedAivisorTitle />
      </div>

      {/* --- MISSION STATEMENT SECTION --- */}
      <section id="mission" className="info-panel mission-statement">
        <h2>&gt; EXECUTE AI-POWERED ANALYSIS</h2>
        <p>AIVISOR is the ultimate tool for preemptive position evaluation. We process live market data, technical indicators, and sentiment analysis via a proprietary deep-learning model to output precise targets and risk parameters, maximizing your capital efficiency. **ACCESS GRANTED: PUBLIC BETA**</p>
      </section>

      <div className="content-container">
        <div className="main-box">
          <div className="form-content active">
            <h2 className="terminal-prompt">:: INPUT_POSITION_PARAMETERS</h2>

            <label className="input-label">ASSET_CLASS: CRYPTO &gt;</label>
            <div className="slider-container asset-selector">
              <div className="slider-option active">CRYPTO [ENABLED]</div>
            </div>

            <input type="text" placeholder={coinPlaceholder} value={coin} onChange={(e) => setCoin(e.target.value)} className="terminal-input" />

            <label className="input-label">MARKET_TYPE &gt;</label>
            <div className="slider-container">{renderMarketOptions()}</div>

            <label className="input-label">POSITION_TYPE &gt;</label>
            <div className="slider-container">
              <div className={`slider-option ${positionType === "Long" ? "active" : ""}`} onClick={() => setPositionType("Long")}>
                LONG [BUY]
              </div>
              <div className={`slider-option ${positionType === "Short" ? "active" : ""}`} onClick={() => setPositionType("Short")}>
                SHORT [SELL]
              </div>
            </div>

            <label className="input-label">ANALYTICS_TIMEFRAME &gt;</label>
            <select className="select-timeframe terminal-input" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="5m">5 MIN</option>
              <option value="15m">15 MIN</option>
              <option value="1h">1 HR</option>
              <option value="4h">4 HR</option>
              <option value="1d">1 DAY</option>
              <option value="1week">1 WEEK</option>
              <option value="1month">1 MONTH</option>
            </select>

            <input type="number" placeholder="ENTRY_PRICE [USD]" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} className="terminal-input" />
            <input type="number" placeholder="POSITION_SIZE [UNITS]" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="terminal-input" />

            <button onClick={submitData} disabled={loading} className="analyze-button">
              {loading ? ":: INITIATING ANALYSIS SEQUENCE..." : ":: ANALYZE_POSITION &gt;"}
            </button>
          </div>

          {error && <p className="error-message">ERROR: {error}</p>}
          {loading && <div className="loading-message">PROCESSING DATA... STAND BY ⏳</div>}

          {result && (
            <div id="result" className="result">
              <h2 className="terminal-prompt">:: ANALYSIS_REPORT_V1.1</h2>

              <div className="result-block">
                <h3>[01] TRADE_SUMMARY</h3>
                <p><strong>ASSET_ID:</strong> {result.coin} ({result.asset_class?.toUpperCase()})</p>
                <p><strong>MARKET_ENV:</strong> {result.market?.toUpperCase()}</p>
                <p><strong>POSITION:</strong> <span className={`pnl-value ${result.position_type === 'long' ? 'positive' : 'negative'}`}>{result.position_type?.toUpperCase()}</span></p>
                <p><strong>ENTRY_P:</strong> <span className="price-value">${result.entry_price?.toFixed(5)}</span></p>
                <p><strong>LIVE_P:</strong> <span className="price-value">${result.current_price?.toFixed(5)}</span></p>
                <p><strong>UNREALIZED_P/L:</strong> <span className="pnl-value">{result.profit_loss || "N/A"}</span></p>
                <p><strong>STATUS_COMMENT:</strong> {result.profitability_comment || "[NO_DATA]"}</p>
              </div>

              <div className="result-block">
                <h3>[02] RISK_MANAGEMENT_PARAMETERS</h3>

                <h4>&gt; TARGET_ZONE (TGT)</h4>
                <div className="levels-grid">
                  {result.targets?.map((target, idx) => (
                    <div key={idx} className="level-item target-item">TGT-{idx + 1}: ${target?.toFixed(5)}</div>
                  ))}
                </div>

                <h4>&gt; STOP_LOSS_ZONE (SL)</h4>
                <div className="levels-grid">
                  {result.market_stoplosses?.map((sl, idx) => (
                    <div key={idx} className="level-item stoploss-item">SL-{idx + 1}: ${sl?.toFixed(5)}</div>
                  ))}
                </div>
              </div>

              <div className="result-block">
                <h3>[03] SENTIMENT_MATRIX</h3>
                <p><strong>MACRO_TREND:</strong> <span className="trend-value">{result.market_trend?.toUpperCase()}</span></p>
                <p><strong>CONFIDENCE_METER:</strong> </p>
                <div className="confidence-bar">
                  <div className="conf-long" style={{ width: `${result.confidence_meter?.long}%` }}>LONG: {result.confidence_meter?.long}%</div>
                  <div className="conf-short" style={{ width: `${result.confidence_meter?.short}%` }}>SHORT: {result.confidence_meter?.short}%</div>
                </div>
                <p><strong>MODEL_COMMENT:</strong> {result.trend_comment || "[NO_COMMENT]"}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- HOW IT WORKS: 3-STEP FLOW --- */}
      <section id="howitworks" className="info-panel how-it-works">
        <h2>:: HOW_IT_WORKS_FLOW</h2>
        <div className="flow-container">
          <div className="flow-step">
            <span className="step-number">1.</span>
            <h3>CONNECT &gt;</h3>
            <p>Input your trade parameters (Coin, Price, Size) into the terminal interface.</p>
          </div>
          <div className="flow-step">
            <span className="step-number">2.</span>
            <h3>ANALYZE &gt;</h3>
            <p>Our AI analyzes real-time data and market sentiment for predictive insights.</p>
          </div>
          <div className="flow-step">
            <span className="step-number">3.</span>
            <h3>ACT &gt;</h3>
            <p>Receive precise Stop-Loss (SL) and Take-Profit (TGT) zones for risk management.</p>
          </div>
          <div className="flow-step">
            <span className="step-number">4.</span>
            <h3>IMPROVE &gt;</h3>
            <p>Iterate and refine your trading strategy based on AI-generated performance data.</p>
          </div>
        </div>
      </section>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- QUICK FEATURES OVERVIEW SECTION (New) --- */}
      <section id="features" className="info-panel feature-grid">
        <h2>:: CORE_SYSTEM_FEATURES</h2>
        <div className="feature-card">
          <h3><span className="icon-pulse">⚡</span> Low Latency Data Stream</h3>
          <p>Integrates real-time price feeds for immediate and highly relevant analysis.</p>
        </div>
        <div className="feature-card">
          <h3><span className="icon-pulse">🧠</span> Proprietary AI Model</h3>
          <p>Trained on terabytes of historical crypto data to identify subtle market shifts.</p>
        </div>
        <div className="feature-card">
          <h3><span className="icon-pulse">🛡️</span> Dynamic Risk Zones</h3>
          <p>Calculates optimal take-profit and stop-loss levels based on volatility and support/resistance.</p>
        </div>
        <div className="feature-card">
          <h3><span className="icon-pulse">🌐</span> Multi-Timeframe Analysis</h3>
          <p>Consolidates insights from 5m to 1M charts for a holistic trade perspective.</p>
        </div>
      </section>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- TESTIMONIALS CAROUSEL SECTION (New) --- */}
      <section id="testimonials" className="info-panel testimonials-section">
        <h2>:: TESTIMONIALS_FEEDBACK_LOOP</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <p>"AIVISOR has made position sizing a no-brainer. The risk parameters are uncannily accurate."</p>
            <p className="testimonial-source">- Trader Alpha | BTC Futures</p>
          </div>
          <div className="testimonial-card">
            <p>"The confidence meter provides the psychological edge I needed before entering high-risk trades."</p>
            <p className="testimonial-source">- BetaBot | SOL Spot</p>
          </div>
          <div className="testimonial-card">
            <p>"Seamless interface, zero fluff. Pure data and actionable insight. Essential tool."</p>
            <p className="testimonial-source">- User Gamma | ETH Perpetual</p>
          </div>
        </div>
        <p className="trust-stat">Trusted by 3,000+ traders globally since the beta launch.</p>
      </section>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- FAQ SECTION (New) --- */}
      <section id="faq" className="info-panel faq-section">
        <h2>:: FREQUENTLY_ASKED_QUESTIONS</h2>
        <FAQItem 
          question="Is my trade data secure and private?" 
          answer="AIVISOR uses military-grade end-to-end encryption. We process trade parameters, not account credentials. Your privacy is our priority."
        />
        <FAQItem 
          question="How accurate is the AI model's analysis?" 
          answer="Our proprietary deep-learning model is trained on multiple market cycles and consistently back-tested. While not financial advice, its statistical edge is verifiable."
        />
        <FAQItem 
          question="What is the difference between Futures and Spot analysis?" 
          answer="Futures analysis includes dynamic leverage/liquidation considerations. Spot focuses purely on trend direction and volatility-based risk/reward levels."
        />
      </section>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- SUBSCRIPTIONS & EXPLANATORY LINE --- */}
      <div className="subscriptions info-panel">
        <div className="sub-card">
          <h3>&gt; SYSTEM_OVERRIDE_PREMIUM</h3>
          <p className="premium-explainer">Unlock real-time AI trend analysis and position insights.</p> {/* Explanatory line */}
          <p>Access advanced predictive models, unlimited usage, and priority data processing.</p>
          <Link href="/subscription">
            <button className="analyze-button">ACTIVATE PREMIUM ACCESS IN JUST $29</button>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- SECURITY AND COMPLIANCE (New) --- */}
      <section className="info-panel security-info">
        <h2>:: SECURITY_AND_COMPLIANCE</h2>
        <p>AIVISOR utilizes **256-bit AES Encryption** for all data transmission. We are compliant with industry-standard data protection protocols. **NO TRADING API KEYS ARE EVER REQUIRED OR STORED.**</p>
      </section>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- TRUST BADGES (New) --- */}
      <section className="info-panel trust-badges-section">
        <h2>:: PLATFORM_INTEGRATION_STATUS</h2>
        <div className="trust-logos">
          <span className="trust-logo-item">BINANCE &gt;</span>
          <span className="trust-logo-item">COINBASE &gt;</span>
          <span className="trust-logo-item">OKX &gt;</span>
          <span className="trust-logo-item">BYBIT &gt;</span>
        </div>
      </section>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- ROADMAP (New) --- */}
      <section className="info-panel roadmap-section">
        <h2>:: UPCOMING_FEATURES_V3.2</h2>
        <ul className="roadmap-list">
          <li>[Q4 2025] Automated Portfolio Sync (Read-Only)</li>
          <li>[Q1 2026] Integrated Historical Backtesting Module</li>
          <li>[Q1 2026] New Asset Class: Forex Major Pairs</li>
        </ul>
      </section>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}

      {/* --- TAGLINE (New) --- */}
      <div className="tagline-section">
        <h2 className="tagline-text">AI-Powered Insights for Smarter Crypto Decisions.</h2>
      </div>

      <div style={{ marginTop: '100px' }}></div> {/* Extra space */}


      <footer id="contact" className="footer">
        {/* Call-to-action Contact/Live Chat Section (New) */}
        <div className="contact-cta">
          <span className="chat-icon">💬</span> 
          <span>Questions? Reach us instantly via live chat.</span>
          <Link href="/live-chat">
            <button className="neon-cta-button">
              CONTACT_SUPPORT_LINK
            </button>
          </Link>
        </div>

        <div className="footer-links">
          <Link href="/privacy-policy" className="footer-link-item"><p>PRIVACY_POLICY</p></Link>
          <Link href="/terms-of-use" className="footer-link-item"><p>TERMS_OF_USE</p></Link>
          <Link href="/contact" className="footer-link-item"><p>SUPPORT_PORTAL</p></Link>
        </div>
        <p className="disclaimer">***WARNING: THIS IS NOT FINANCIAL ADVICE. ALL OUTPUTS ARE FOR INFORMATIONAL PURPOSES ONLY. RISK MANAGEMENT IS USER RESPONSIBILITY.***</p>
        <p className="copyright">AIVISOR CORE SYSTEM v3.1 | &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED | <span className="status-indicator">STATUS: ONLINE</span></p>
      </footer>

      {/* --- CYBERPUNK STYLES (UPDATED) --- */}
      <style jsx global>{`
        /* --- THEME & FONT DEFINITIONS (CYBERPUNK TERMINAL) --- */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        
        :root {
          --bg-dark: #0A0A1F; /* Deep Dark Blue/Black */
          --bg-light: #161633; /* Slightly Lighter Background */
          --bg-box: rgba(2, 2, 25, 0.9); /* Almost Black transparent */
          --bg-super-dark: #04041A; /* Even Darker for animated BG */
          
          --primary-accent: #39FF14; /* NEON GREEN */
          --secondary-accent: #00BFFF; /* ELECTRIC BLUE */
          
          --text-primary: #E0E0E0; /* Light Gray/White */
          --text-secondary: #8888AA; /* Muted Blue/Gray */
          
          --primary-accent-glow: rgba(57, 255, 20, 0.8);
          --secondary-accent-glow-faint: rgba(0, 191, 255, 0.3);
          
          --error-color: #FF4D4D;
          --positive-color: var(--primary-accent);
          --negative-color: var(--error-color);
        }

        /* --- KEYFRAMES (ADDED: Animated Gradient Background) --- */
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 5px var(--secondary-accent-glow-faint), 0 0 10px var(--primary-accent-glow); }
          50% { box-shadow: 0 0 15px var(--secondary-accent), 0 0 30px var(--primary-accent-glow); }
          100% { box-shadow: 0 0 5px var(--secondary-accent-glow-faint), 0 0 10px var(--primary-accent-glow); }
        }
        @keyframes scanline {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
        }

        @keyframes backgroundMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        /* --- BODY & FONT (UPDATED: Animated Background) --- */
        body {
          margin: 0;
          padding: 0;
          font-family: "Share Tech Mono", monospace; /* Robotic Monospace Font */
          color: var(--text-primary);
          min-height: 100vh;
          overflow-x: hidden;
          background-color: var(--bg-super-dark); /* Base dark color */
          background-image:
            linear-gradient(270deg, rgba(0, 191, 255, 0.05), rgba(57, 255, 20, 0.05)), /* Slow moving gradients */
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 400% 400%, 100% 4px, 4px 100%;
          animation: backgroundMove 30s linear infinite alternate; /* Slow gradient animation */
        }
        
        /* --- HEADER & NAVIGATION --- */
        .fixed-header {
          width: 100%;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-dark);
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          backdrop-filter: blur(5px);
          border-bottom: 2px solid var(--secondary-accent);
          height: 70px;
        }
        
        .header-spacer { 
          height: 70px;
        } 
        
        .left-header, .right-header, .logo { 
          display: flex; 
          align-items: center; 
          gap: 20px;
        }

        .terminal-icon {
            font-size: 30px;
            color: var(--primary-accent);
            animation: pulseGlow 4s infinite ease-in-out;
            text-shadow: 0 0 10px var(--primary-accent);
        }

        .app-tag {
          font-size: 10px;
          color: var(--secondary-accent);
          border: 1px solid var(--secondary-accent);
          padding: 2px 5px;
          border-radius: 2px;
        }
        
        .main-nav a {
            color: var(--text-primary);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s, text-shadow 0.3s;
        }
        .main-nav a:hover {
            color: var(--primary-accent);
            text-shadow: 0 0 10px var(--primary-accent);
        }

        .profile-icon {
            color: var(--primary-accent);
            font-size: 14px;
            padding: 8px 12px;
            border: 1px solid var(--primary-accent);
            transition: all 0.3s;
            cursor: pointer;
        }
        .profile-icon:hover {
            background: var(--primary-accent);
            color: var(--bg-dark);
            box-shadow: 0 0 15px var(--primary-accent-glow);
        }

        /* --- MAIN TITLE (AIVISOR - Updated) --- */
        .animated-aivisor-title-container {
            text-align: center;
            margin: 50px auto 50px auto; 
            max-width: 90%;
            border-bottom: 1px dashed var(--bg-light);
        }
        .animated-aivisor-title {
            font-family: 'Orbitron', monospace;
            font-size: 4.5em; 
            font-weight: 900;
            letter-spacing: 8px;
            text-shadow: 0 0 10px var(--primary-accent), 0 0 30px var(--secondary-accent);
            animation: pulseGlow 4s ease-in-out infinite;
            line-height: 1;
        }
        .aivi { color: var(--primary-accent); } /* AI- */
        .visor { color: var(--secondary-accent); } /* VISOR */
        .title-subtitle {
            font-size: 1em;
            color: var(--text-secondary);
            margin-top: 15px;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 5px;
            animation: blink 3s linear infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        
        /* --- GENERAL INFO PANELS (Mission/Features) --- */
        .info-panel {
            max-width: 900px;
            margin: 40px auto;
            padding: 30px;
            border: 1px solid var(--bg-light);
            background: var(--bg-box);
            box-shadow: 0 0 15px rgba(0, 191, 255, 0.1);
        }
        .info-panel h2 {
            color: var(--secondary-accent);
            border-bottom: 1px solid var(--secondary-accent);
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .mission-statement p {
            line-height: 1.6;
            color: var(--text-secondary);
        }

        /* --- HOW IT WORKS FLOW (New Style) --- */
        .flow-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            text-align: center;
            margin-top: 30px;
        }
        .flow-step {
            padding: 20px;
            border: 1px dashed var(--bg-light);
            transition: all 0.3s;
        }
        .flow-step:hover {
            border: 1px solid var(--primary-accent);
            box-shadow: 0 0 10px var(--primary-accent-glow);
        }
        .step-number {
            font-size: 2em;
            color: var(--primary-accent);
            display: block;
            margin-bottom: 5px;
            font-family: 'Orbitron', monospace;
        }
        .flow-step h3 {
            color: var(--secondary-accent);
            margin: 5px 0;
            font-size: 1.2em;
        }

        /* --- FEATURE GRID --- */
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .feature-card {
            background: rgba(4, 4, 30, 0.8);
            padding: 20px;
            border-left: 3px solid var(--primary-accent);
            box-shadow: 0 0 5px rgba(57, 255, 20, 0.2);
        }
        .feature-card h3 {
            color: var(--primary-accent);
            font-size: 1.1em;
            margin-top: 0;
            display: flex;
            align-items: center;
        }
        .icon-pulse {
            margin-right: 10px;
            font-size: 1.2em;
            animation: pulseGlow 2s infinite ease-out;
            animation-duration: 4s;
        }
        
        /* --- MAIN BOX & FORM ELEMENTS --- */
        .content-container {
          padding: 20px;
        }
        .main-box {
          max-width: 600px;
          margin: 0 auto;
          background: var(--bg-box); 
          border: 3px solid var(--primary-accent);
          box-shadow: 0 0 50px rgba(166, 3, 172, 0.75);
          padding: 40px;
          margin-bottom: 60px;
        }
        
        .terminal-prompt {
            color: var(--secondary-accent);
            font-size: 1.2em;
            margin-bottom: 25px;
            border-bottom: 1px dashed var(--secondary-accent);
            padding-bottom: 10px;
        }
        
        .input-label {
            display: block;
            color: var(--secondary-accent);
            margin-top: 20px;
            margin-bottom: 5px;
            text-transform: uppercase;
            font-size: 0.9em;
        }
        
        .terminal-input, .select-timeframe {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--primary-accent);
          background: rgba(57, 255, 20, 0.05); /* Light green tint */
          color: var(--text-primary);
          font-family: "Share Tech Mono", monospace;
          font-size: 1em;
          margin-bottom: 15px;
          box-shadow: inset 0 0 5px rgba(57, 255, 20, 0.3);
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
        }
        .terminal-input:focus {
            border-color: var(--secondary-accent);
            box-shadow: 0 0 10px var(--secondary-accent-glow-faint), inset 0 0 5px var(--secondary-accent-glow-faint);
            outline: none;
        }

        .slider-container {
            display: flex;
            background: var(--bg-light);
            padding: 3px;
            border: 1px solid var(--bg-light);
        }
        .slider-option {
            flex-grow: 1;
            text-align: center;
            padding: 10px 0;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9em;
            color: var(--text-secondary);
        }
        .slider-option.active {
            background: var(--primary-accent);
            color: var(--bg-dark);
            font-weight: bold;
            box-shadow: 0 0 10px var(--primary-accent-glow);
        }

        .analyze-button {
          width: 100%;
          padding: 15px;
          margin-top: 30px;
          background: var(--secondary-accent);
          color: var(--bg-dark);
          border: none;
          cursor: pointer;
          font-size: 1.1em;
          font-family: 'Orbitron', monospace;
          transition: all 0.3s;
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
          letter-spacing: 2px;
        }
        .analyze-button:hover:not(:disabled) {
            background: var(--primary-accent);
            box-shadow: 0 0 25px var(--primary-accent);
            color: var(--bg-dark);
        }
        .analyze-button:disabled {
            background: var(--bg-light);
            color: var(--text-secondary);
            cursor: not-allowed;
            box-shadow: none;
        }

        /* --- RESULT BOX & LEVELS --- */
        #result {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px dashed var(--secondary-accent);
        }
        .result-block {
            margin-bottom: 30px;
            padding: 15px;
            border: 1px solid var(--bg-light);
            background: rgba(10, 10, 31, 0.5);
        }
        .result-block h3 {
            color: var(--primary-accent);
            border-bottom: 1px dashed var(--primary-accent);
            padding-bottom: 5px;
            font-family: 'Orbitron', monospace;
            font-size: 1.1em;
        }
        .result-block p {
            margin: 8px 0;
        }
        
        .price-value { color: var(--secondary-accent); font-weight: bold; }
        .pnl-value { color: var(--primary-accent); font-weight: bold; }
        .pnl-value.negative { color: var(--error-color); }
        .pnl-value.positive { color: var(--primary-accent); }
        .trend-value { color: var(--secondary-accent); font-weight: bold; text-shadow: 0 0 5px var(--secondary-accent-glow-faint); }
        
        .levels-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
            margin: 15px 0;
            padding: 10px 0;
            border-top: 1px dotted var(--bg-light);
            border-bottom: 1px dotted var(--bg-light);
        }
        .level-item {
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            font-family: 'Orbitron', monospace;
            font-size: 0.9em;
            font-weight: 700;
        }
        .level-item.target-item { 
            border: 1px solid var(--primary-accent); 
            color: var(--primary-accent); 
            background: rgba(57, 255, 20, 0.1); 
            box-shadow: 0 0 5px rgba(118, 221, 16, 0.5);
        }
        .level-item.stoploss-item { 
            border: 1px solid var(--error-color); 
            color: var(--error-color); 
            background: rgba(255, 77, 77, 0.1); 
            box-shadow: 0 0 5px rgba(255, 77, 77, 0.5);
        }
        
        /* Confidence Bar */
        .confidence-bar {
            display: flex;
            height: 20px;
            margin: 10px 0 20px 0;
            border: 1px solid var(--bg-light);
            overflow: hidden;
        }
        .conf-long {
            background: var(--primary-accent);
            color: var(--bg-dark);
            text-align: center;
            font-weight: bold;
            font-size: 0.8em;
            line-height: 20px;
            transition: width 1s ease-out;
        }
        .conf-short {
            background: var(--error-color);
            color: var(--text-primary);
            text-align: center;
            font-weight: bold;
            font-size: 0.8em;
            line-height: 20px;
            transition: width 1s ease-out;
        }

        /* --- TESTIMONIALS (New Style) --- */
        .testimonials-section {
            text-align: center;
        }
        .testimonial-carousel {
            display: flex;
            overflow-x: auto;
            gap: 20px;
            padding: 20px 0;
            scroll-snap-type: x mandatory;
        }
        .testimonial-card {
            min-width: 80%;
            flex-shrink: 0;
            padding: 20px;
            border: 1px solid var(--secondary-accent);
            background: rgba(0, 191, 255, 0.1);
            scroll-snap-align: center;
        }
        .testimonial-card p {
            font-style: italic;
        }
        .testimonial-source {
            display: block;
            margin-top: 10px;
            color: var(--primary-accent);
            font-weight: bold;
        }
        .trust-stat {
          color: var(--text-secondary);
          margin-top: 20px;
          font-size: 0.9em;
        }

        /* --- FAQ (New Style) --- */
        .faq-section {
          margin-top: 80px;
        }
        .faq-item {
          margin-bottom: 10px;
          border-bottom: 1px dotted var(--bg-light);
          padding-bottom: 10px;
        }
        .faq-question {
          cursor: pointer;
          color: var(--primary-accent);
          font-weight: bold;
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
        }
        .faq-answer {
          padding: 10px 0 10px 20px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .faq-toggle {
          color: var(--secondary-accent);
          transition: transform 0.3s;
        }

        /* --- TAGLINE (New Style) --- */
        .tagline-section {
            max-width: 900px;
            margin: 60px auto;
            text-align: center;
            padding: 40px 20px;
            border: 1px solid var(--primary-accent);
            background: rgba(57, 255, 20, 0.05);
            box-shadow: 0 0 30px var(--primary-accent-glow);
        }
        .tagline-text {
            font-family: 'Orbitron', monospace;
            font-size: 1.8em;
            color: var(--primary-accent);
            text-shadow: 0 0 15px var(--primary-accent-glow);
            letter-spacing: 3px;
        }

        /* --- TRUST BADGES (New Style) --- */
        .trust-logos {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 20px;
          border-top: 1px dashed var(--bg-light);
          padding-top: 15px;
        }
        .trust-logo-item {
          font-family: 'Orbitron', monospace;
          color: var(--secondary-accent);
          font-size: 1.1em;
          margin: 10px 15px;
          text-shadow: 0 0 5px var(--secondary-accent-glow-faint);
        }

        /* --- ROADMAP (New Style) --- */
        .roadmap-list {
          list-style: none;
          padding: 0;
          margin-top: 20px;
        }
        .roadmap-list li {
          margin-bottom: 10px;
          padding: 8px 0;
          border-left: 3px solid var(--secondary-accent);
          padding-left: 15px;
          color: var(--text-primary);
        }

        /* --- SUBSCRIPTIONS & FOOTER --- */
        .sub-card {
            max-width: 450px;
            margin: 0 auto;
            border: 2px solid var(--secondary-accent);
            box-shadow: 0 0 15px var(--secondary-accent);
            padding: 30px;
            margin-bottom: 60px;
        }
        .sub-card h3 {
            color: var(--secondary-accent);
            font-family: 'Orbitron', monospace;
            text-align: center;
        }
        .premium-explainer { /* New explanatory line style */
            text-align: center;
            color: var(--primary-accent);
            font-weight: bold;
            margin-top: -10px;
            margin-bottom: 15px;
        }
        .sub-card p {
            text-align: center;
            color: var(--text-secondary);
        }

        .footer {
          background: var(--bg-dark);
          border-top: 2px solid var(--secondary-accent);
          padding: 40px 40px; /* Increased padding */
          text-align: center;
          font-size: 0.8em;
          color: var(--text-secondary);
        }

        /* --- CONTACT CTA (New Style) --- */
        .contact-cta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px dashed var(--bg-light);
          font-size: 1.1em;
          color: var(--text-primary);
        }
        .chat-icon {
          font-size: 2em;
          color: var(--primary-accent);
          animation: pulseGlow 3s infinite ease-out;
          animation-duration: 3s;
        }
        .neon-cta-button {
          padding: 10px 20px;
          background: transparent;
          color: var(--secondary-accent);
          border: 2px solid var(--secondary-accent);
          font-family: 'Orbitron', monospace;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 0 5px var(--secondary-accent), 0 0 10px var(--secondary-accent-glow-faint) inset;
        }
        .neon-cta-button:hover {
          background: var(--secondary-accent);
          color: var(--bg-dark);
          box-shadow: 0 0 15px var(--secondary-accent), 0 0 25px var(--secondary-accent-glow-faint);
        }

        .footer-links a { /* Anchor tag wrapper for hover effect */
            text-decoration: none;
            position: relative;
            margin: 0 15px;
        }
        .footer-links p {
            display: inline-block;
            color: var(--text-secondary);
            transition: color 0.3s;
            cursor: pointer;
        }
        .footer-links a:hover p { /* Subtle hover effect on link text */
            color: var(--primary-accent);
        }
        .footer-links a:after { /* Micro-interaction: Bottom line hover */
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background-color: var(--primary-accent);
          transition: width 0.3s ease-out;
        }
        .footer-links a:hover:after {
          width: 100%;
        }

        .disclaimer {
            margin-top: 15px;
            color: var(--error-color);
            font-size: 0.9em;
        }
        .copyright {
            margin-top: 10px;
            letter-spacing: 1px;
        }
        .status-indicator {
            color: var(--primary-accent);
            font-weight: bold;
            text-shadow: 0 0 5px var(--primary-accent-glow-faint);
            animation: blink 2s linear infinite;
        }
        
        /* --- RESPONSIVENESS --- */
        @media (max-width: 768px) {
            .fixed-header { padding: 0 15px; }
            .left-header { gap: 10px; }
            .app-tag { display: none; }
            .main-nav { display: none; }
            .animated-aivisor-title { font-size: 3em; letter-spacing: 3px; }
            .title-subtitle { font-size: 0.8em; letter-spacing: 3px; }
            .main-box { padding: 20px; }
            .feature-grid { grid-template-columns: 1fr; }
            .flow-container { grid-template-columns: 1fr; }
            .testimonial-carousel { overflow-x: scroll; }
            .contact-cta { flex-direction: column; gap: 10px; }
        }
      `}</style>
    </>
  );
}