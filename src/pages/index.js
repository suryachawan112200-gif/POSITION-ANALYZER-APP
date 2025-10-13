import { useState } from "react";
import Head from "next/head"; // <-- CRITICAL: Import Head for the viewport meta tag
import Link from "next/link";
// import Image from "next/image"; // Removed since it's not strictly used in the logic

// Define a custom font style for the logo text
const logoFont = {
  fontFamily: "'Orbitron', monospace",
  color: "var(--primary-accent)",
  textShadow:
    "0 0 10px var(--primary-accent-glow), 0 0 25px var(--secondary-accent-glow-faint)",
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
        <span>
          {isOpen ? "[-]" : "[+]"} {question}
        </span>
        <span className="faq-toggle">{isOpen ? "▼" : "▶"}</span>
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
      return alert(
        "ERROR: Input parameters missing. Initiate full data sequence."
      );
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
        process.env.NEXT_PUBLIC_BACKEND_URL ||
          "https://python-backend-pr.vercel.app/analyze",
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
        throw new Error(
          `HTTP Error Code ${
            response.status
          }: Analysis engine offline. ${errorDetail.substring(0, 50)}...`
        );
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
      <div
        className={`slider-option ${market === "Futures" ? "active" : ""}`}
        onClick={() => selectMarket("Futures")}
      >
        FUTURES
      </div>
      <div
        className={`slider-option ${market === "Spot" ? "active" : ""}`}
        onClick={() => selectMarket("Spot")}
      >
        SPOT
      </div>
    </>
  );

  const coinPlaceholder = "ASSET ID (e.g., BTCUSDT)";

  return (
    <>
      {/* ------------------------------------------- */}
      {/* --- FIX 1: ADD VIEWPORT META TAG VIA Head --- */}
      {/* ------------------------------------------- */}
      <Head>
        <title>AIVISOR: Crypto Position Analytics Terminal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>

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
      <div style={{ marginTop: "50px" }}>
        <AnimatedAivisorTitle />
      </div>

      {/* --- MISSION STATEMENT SECTION --- */}
      <section id="mission" className="info-panel mission-statement">
        <h2>&gt; EXECUTE AI-POWERED ANALYSIS</h2>
        <p>
          AIVISOR is the ultimate tool for preemptive position evaluation. We
          process live market data, technical indicators, and sentiment analysis
          via a proprietary deep-learning model to output precise targets and
          risk parameters, maximizing your capital efficiency. **ACCESS GRANTED:
          PUBLIC BETA**
        </p>
      </section>

      <div className="content-container">
        <div className="main-box">
          <div className="form-content active">
            <h2 className="terminal-prompt">:: INPUT_POSITION_PARAMETERS</h2>

            <label className="input-label">ASSET_CLASS: CRYPTO &gt;</label>
            <div className="slider-container asset-selector">
              <div className="slider-option active">CRYPTO [ENABLED]</div>
            </div>

            <input
              type="text"
              placeholder={coinPlaceholder}
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="terminal-input"
            />

            <label className="input-label">MARKET_TYPE &gt;</label>
            <div className="slider-container">{renderMarketOptions()}</div>

            <label className="input-label">POSITION_TYPE &gt;</label>
            <div className="slider-container">
              <div
                className={`slider-option ${
                  positionType === "Long" ? "active" : ""
                }`}
                onClick={() => setPositionType("Long")}
              >
                LONG [BUY]
              </div>
              <div
                className={`slider-option ${
                  positionType === "Short" ? "active" : ""
                }`}
                onClick={() => setPositionType("Short")}
              >
                SHORT [SELL]
              </div>
            </div>

            <label className="input-label">ANALYTICS_TIMEFRAME &gt;</label>
            <select
              className="select-timeframe terminal-input"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="5m">5 MIN</option>
              <option value="15m">15 MIN</option>
              <option value="1h">1 HR</option>
              <option value="4h">4 HR</option>
              <option value="1d">1 DAY</option>
              <option value="1week">1 WEEK</option>
              <option value="1month">1 MONTH</option>
            </select>

            <input
              type="number"
              placeholder="ENTRY_PRICE [USD]"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="terminal-input"
            />
            <input
              type="number"
              placeholder="POSITION_SIZE [UNITS]"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="terminal-input"
            />

            <button
              onClick={submitData}
              disabled={loading}
              className="analyze-button"
            >
              {loading
                ? ":: INITIATING ANALYSIS SEQUENCE..."
                : ":: ANALYZE_POSITION >"}
            </button>
          </div>

          {error && <p className="error-message">ERROR: {error}</p>}
          {loading && (
            <div className="loading-message">PROCESSING DATA... STAND BY ⏳</div>
          )}

          {result && (
            <div id="result" className="result">
              <h2 className="terminal-prompt">:: ANALYSIS_REPORT_V1.1</h2>

              <div className="result-block">
                <h3>[01] TRADE_SUMMARY</h3>
                <p>
                  <strong>ASSET_ID:</strong> {result.coin} (
                  {result.asset_class?.toUpperCase()})
                </p>
                <p>
                  <strong>MARKET_ENV:</strong> {result.market?.toUpperCase()}
                </p>
                <p>
                  <strong>POSITION:</strong>{" "}
                  <span
                    className={`pnl-value ${
                      result.position_type === "long" ? "positive" : "negative"
                    }`}
                  >
                    {result.position_type?.toUpperCase()}
                  </span>
                </p>
                <p>
                  <strong>ENTRY_P:</strong>{" "}
                  <span className="price-value">
                    ${result.entry_price?.toFixed(5)}
                  </span>
                </p>
                <p>
                  <strong>LIVE_P:</strong>{" "}
                  <span className="price-value">
                    ${result.current_price?.toFixed(5)}
                  </span>
                </p>
                <p>
                  <strong>UNREALIZED_P/L:</strong>{" "}
                  <span className="pnl-value">
                    {result.profit_loss || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>STATUS_COMMENT:</strong>{" "}
                  {result.profitability_comment || "[NO_DATA]"}
                </p>
              </div>

              <div className="result-block">
                <h3>[02] RISK_MANAGEMENT_PARAMETERS</h3>

                <h4>&gt; TARGET_ZONE (TGT)</h4>
                <div className="levels-grid">
                  {result.targets?.map((target, idx) => (
                    <div key={idx} className="level-item target-item">
                      TGT-{idx + 1}: ${target?.toFixed(5)}
                    </div>
                  ))}
                </div>

                <h4>&gt; STOP_LOSS_ZONE (SL)</h4>
                <div className="levels-grid">
                  {result.market_stoplosses?.map((sl, idx) => (
                    <div key={idx} className="level-item stoploss-item">
                      SL-{idx + 1}: ${sl?.toFixed(5)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="result-block">
                <h3>[03] SENTIMENT_MATRIX</h3>
                <p>
                  <strong>MACRO_TREND:</strong>{" "}
                  <span className="trend-value">
                    {result.market_trend?.toUpperCase()}
                  </span>
                </p>
                <p>
                  <strong>CONFIDENCE_METER:</strong>{" "}
                </p>
                <div className="confidence-bar">
                  <div
                    className="conf-long"
                    style={{ width: `${result.confidence_meter?.long}%` }}
                  >
                    LONG: {result.confidence_meter?.long}%
                  </div>
                  <div
                    className="conf-short"
                    style={{ width: `${result.confidence_meter?.short}%` }}
                  >
                    SHORT: {result.confidence_meter?.short}%
                  </div>
                </div>
                <p>
                  <strong>MODEL_COMMENT:</strong>{" "}
                  {result.trend_comment || "[NO_COMMENT]"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

      {/* --- HOW IT WORKS: 3-STEP FLOW --- */}
      <section id="howitworks" className="info-panel how-it-works">
        <h2>:: HOW_IT_WORKS_FLOW</h2>
        <div className="flow-container">
          <div className="flow-step">
            <span className="step-number">1.</span>
            <h3>CONNECT &gt;</h3>
            <p>
              Input your trade parameters (Coin, Price, Size) into the terminal
              interface.
            </p>
          </div>
          <div className="flow-step">
            <span className="step-number">2.</span>
            <h3>ANALYZE &gt;</h3>
            <p>
              Our AI analyzes real-time data and market sentiment for predictive
              insights.
            </p>
          </div>
          <div className="flow-step">
            <span className="step-number">3.</span>
            <h3>ACT &gt;</h3>
            <p>
              Receive precise Stop-Loss (SL) and Take-Profit (TGT) zones for risk
              management.
            </p>
          </div>
          <div className="flow-step">
            <span className="step-number">4.</span>
            <h3>IMPROVE &gt;</h3>
            <p>
              Iterate and refine your trading strategy based on AI-generated
              performance data.
            </p>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

      {/* --- QUICK FEATURES OVERVIEW SECTION (New) --- */}
      <section id="features" className="info-panel feature-grid">
        <h2>:: CORE_SYSTEM_FEATURES</h2>
        <div className="feature-card">
          <h3>
            <span className="icon-pulse">⚡</span> Low Latency Data Stream
          </h3>
          <p>
            Integrates real-time price feeds for immediate and highly relevant
            analysis.
          </p>
        </div>
        <div className="feature-card">
          <h3>
            <span className="icon-pulse">🧠</span> Proprietary AI Model
          </h3>
          <p>
            Trained on terabytes of historical crypto data to identify subtle
            market shifts.
          </p>
        </div>
        <div className="feature-card">
          <h3>
            <span className="icon-pulse">🛡️</span> Dynamic Risk Zones
          </h3>
          <p>
            Calculates optimal take-profit and stop-loss levels based on
            volatility and support/resistance.
          </p>
        </div>
        <div className="feature-card">
          <h3>
            <span className="icon-pulse">🌐</span> Multi-Timeframe Analysis
          </h3>
          <p>
            Consolidates insights from 5m to 1M charts for a holistic trade
            perspective.
          </p>
        </div>
      </section>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

      {/* --- TESTIMONIALS CAROUSEL SECTION (New) --- */}
      <section id="testimonials" className="info-panel testimonials-section">
        <h2>:: TESTIMONIALS_FEEDBACK_LOOP</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <p>
              "AIVISOR has made position sizing a no-brainer. The risk parameters
              are uncannily accurate."
            </p>
            <p className="testimonial-source">- Trader Alpha | BTC Futures</p>
          </div>
          <div className="testimonial-card">
            <p>
              "The confidence meter provides the psychological edge I needed
              before entering high-risk trades."
            </p>
            <p className="testimonial-source">- BetaBot | SOL Spot</p>
          </div>
          <div className="testimonial-card">
            <p>
              "Seamless interface, zero fluff. Pure data and actionable insight.
              Essential tool."
            </p>
            <p className="testimonial-source">- User Gamma | ETH Perpetual</p>
          </div>
        </div>
        <p className="trust-stat">
          Trusted by 3,000+ traders globally since the beta launch.
        </p>
      </section>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

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

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

      {/* --- SUBSCRIPTIONS & EXPLANATORY LINE --- */}
      <div className="subscriptions info-panel">
        <div className="sub-card">
          <h3>&gt; AIVISOR_PREMIUM</h3>
          <p className="premium-explainer">
            Unlock real-time AI trend analysis and position insights.
          </p>{" "}
          {/* Explanatory line */}
          <p>
            Access advanced predictive models, unlimited usage, and priority data
            processing.
          </p>
          <Link href="/subscription">
            <button className="analyze-button">
              ACTIVATE PREMIUM ACCESS IN JUST $29
            </button>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

      {/* --- SECURITY AND COMPLIANCE (New) --- */}
      <section className="info-panel security-info">
        <h2>:: SECURITY_AND_COMPLIANCE</h2>
        <p>
          AIVISOR utilizes **256-bit AES Encryption** for all data transmission.
          We are compliant with industry-standard data protection protocols.
          **NO TRADING API KEYS ARE EVER REQUIRED OR STORED.**
        </p>
      </section>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

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

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

      {/* --- ROADMAP (New) --- */}
      <section className="info-panel roadmap-section">
        <h2>:: UPCOMING_FEATURES_V3.2</h2>
        <ul className="roadmap-list">
          <li>[Q4 2025] Automated Portfolio Sync (Read-Only)</li>
          <li>[Q1 2026] Integrated Historical Backtesting Module</li>
          <li>[Q1 2026] New Asset Class: Forex Major Pairs</li>
        </ul>
      </section>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

      {/* --- TAGLINE (New) --- */}
      <div className="tagline-section">
        <h2 className="tagline-text">
          AI-Powered Insights for Smarter Crypto Decisions.
        </h2>
      </div>

      <div style={{ marginTop: "100px" }}></div> {/* Extra space */}

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
          <Link href="/privacy-policy" className="footer-link-item">
            <p>PRIVACY_POLICY</p>
          </Link>
          <Link href="/terms-of-use" className="footer-link-item">
            <p>TERMS_OF_USE</p>
          </Link>
          <Link href="/contact" className="footer-link-item">
            <p>SUPPORT_PORTAL</p>
          </Link>
        </div>
        <p className="disclaimer">
          ***WARNING: THIS IS NOT FINANCIAL ADVICE. ALL OUTPUTS ARE FOR
          INFORMATIONAL PURPOSES ONLY. RISK MANAGEMENT IS USER RESPONSIBILITY.***
        </p>
        <p className="copyright">
          AIVISOR CORE SYSTEM v3.1 | &copy; {new Date().getFullYear()} ALL
          RIGHTS RESERVED | <span className="status-indicator">STATUS: ONLINE</span>
        </p>
      </footer>

      {/* --- CYBERPUNK STYLES (UPDATED FOR RESPONSIVENESS) --- */}
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

        /* --- KEYFRAMES --- (omitted for brevity, assume they are correct) */
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

        /* ---------------------------------------------------- */
        /* --- FIX 2: EXPLICITLY HIDE HORIZONTAL OVERFLOW --- */
        /* ---------------------------------------------------- */
        html, body {
            max-width: 100%; /* Ensures no element exceeds the device width */
            overflow-x: hidden; /* Hides horizontal scrolling */
            margin: 0;
            padding: 0;
            font-family: "Share Tech Mono", monospace;
            color: var(--text-primary);
            min-height: 100vh;
            background-color: var(--bg-super-dark);
            background-image:
              linear-gradient(270deg, rgba(0, 191, 255, 0.05), rgba(57, 255, 20, 0.05)),
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
            background-size: 400% 400%, 100% 4px, 4px 100%;
            animation: backgroundMove 30s linear infinite alternate;
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

        /* --- MAIN TITLE (AIVISOR) --- */
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
            box-sizing: border-box; /* Important for padding/border not to cause overflow */
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

        /* --- HOW IT WORKS FLOW (Responsive) --- */
        .flow-container {
            display: grid;
            grid-template-columns: 1fr; 
            gap: 20px;
            text-align: center;
            margin-top: 30px;
        }
        .flow-step {
            padding: 20px;
            border: 1px dashed var(--bg-light);
            transition: all 0.3s;
            box-sizing: border-box;
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

        /* --- FEATURE GRID (Responsive) --- */
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px;
        }
        .feature-card {
            background: rgba(4, 4, 30, 0.8);
            padding: 20px;
            border-left: 3px solid var(--primary-accent);
            box-shadow: 0 0 5px rgba(57, 255, 20, 0.2);
            box-sizing: border-box;
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
          padding: 10px; 
        }
        .main-box {
          max-width: 600px;
          width: 95%; /* Use 95% to give some buffer on very small screens */
          margin: 0 auto;
          background: var(--bg-box); 
          border: 3px solid var(--primary-accent);
          box-shadow: 0 0 50px rgba(166, 3, 172, 0.75);
          padding: 40px;
          margin-bottom: 60px;
          box-sizing: border-box; /* CRITICAL: Padding included in width */
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
          background: rgba(57, 255, 20, 0.05); 
          color: var(--text-primary);
          font-family: "Share Tech Mono", monospace;
          font-size: 1em;
          margin-bottom: 15px;
          box-shadow: inset 0 0 5px rgba(57, 255, 20, 0.3);
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box; /* CRITICAL: Ensure inputs don't overflow */
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

        /* --- RESULT BOX & LEVELS (Responsive) --- */
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
            box-sizing: border-box;
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
            word-wrap: break-word; 
        }
        
        .price-value { color: var(--secondary-accent); font-weight: bold; }
        .pnl-value { color: var(--primary-accent); font-weight: bold; }
        .pnl-value.negative { color: var(--error-color); }
        .pnl-value.positive { color: var(--primary-accent); }
        .trend-value { color: var(--secondary-accent); font-weight: bold; text-shadow: 0 0 5px var(--secondary-accent-glow-faint); }
        
        .levels-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 15px;
            margin: 15px 0;
            padding: 10px 0;
            border-top: 1px dotted var(--bg-light);
            border-bottom: 1px dotted var(--bg-light);
        }
        .level-item {
            padding: 10px;
            border-radius: 4px;
            font-size: 0.9em;
            text-align: center;
        }
        .target-item {
            background: rgba(57, 255, 20, 0.1);
            color: var(--primary-accent);
            border: 1px solid var(--primary-accent);
        }
        .stoploss-item {
            background: rgba(255, 77, 77, 0.1);
            color: var(--error-color);
            border: 1px solid var(--error-color);
        }
        
        /* --- CONFIDENCE BAR --- */
        .confidence-bar {
            display: flex;
            height: 30px;
            margin: 10px 0 15px 0;
            border: 1px solid var(--bg-light);
            overflow: hidden;
        }
        .conf-long, .conf-short {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            transition: width 1s ease-out;
            min-width: 0; 
        }
        .conf-long {
            background: var(--primary-accent);
            color: var(--bg-dark);
            text-shadow: 0 0 5px var(--bg-dark);
        }
        .conf-short {
            background: var(--error-color);
            color: var(--bg-dark);
            text-shadow: 0 0 5px var(--bg-dark);
        }

        /* --- TESTIMONIALS (Responsive) --- */
        .testimonials-section {
            background: var(--bg-box);
        }
        .testimonial-carousel {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 20px;
            margin-top: 20px;
            overflow: auto; 
        }
        .testimonial-card {
            background: rgba(0, 191, 255, 0.05);
            padding: 20px;
            border: 1px solid var(--secondary-accent);
            border-radius: 4px;
            flex-shrink: 0;
            box-sizing: border-box;
        }
        .testimonial-source {
            display: block;
            margin-top: 10px;
            color: var(--primary-accent);
            font-size: 0.85em;
            text-align: right;
        }
        .trust-stat {
            text-align: center;
            margin-top: 30px;
            color: var(--text-secondary);
        }

        /* --- FAQ SECTION --- */
        .faq-section {
            background: var(--bg-box);
        }
        .faq-item {
            border-bottom: 1px dashed var(--bg-light);
            margin-bottom: 10px;
        }
        .faq-question {
            padding: 15px 0;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            color: var(--secondary-accent);
            transition: color 0.3s;
        }
        .faq-question:hover {
            color: var(--primary-accent);
        }
        .faq-toggle {
            font-size: 0.8em;
            color: var(--primary-accent);
        }
        .faq-answer {
            padding: 0 0 15px 20px;
            font-size: 0.9em;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        /* --- SUBSCRIPTION --- */
        .subscriptions {
          text-align: center;
          border: 1px solid var(--primary-accent);
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
          box-sizing: border-box;
        }
        .sub-card {
            padding: 20px;
        }
        .sub-card h3 {
            color: var(--primary-accent);
            font-family: 'Orbitron', monospace;
            font-size: 1.5em;
        }
        .premium-explainer {
            font-style: italic;
            color: var(--secondary-accent);
            margin-bottom: 15px;
        }

        /* --- TRUST BADGES (Responsive) --- */
        .trust-logos {
            display: flex;
            flex-wrap: wrap; 
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .trust-logo-item {
            color: var(--text-secondary);
            font-family: 'Orbitron', monospace;
            font-size: 1.1em;
            padding: 5px 10px;
            border: 1px dashed var(--bg-light);
            white-space: nowrap; 
        }
        .trust-logo-item:hover {
            color: var(--secondary-accent);
            border-color: var(--secondary-accent);
            cursor: default;
        }

        /* --- ROADMAP --- */
        .roadmap-section {
            background: var(--bg-box);
        }
        .roadmap-list {
            list-style: none;
            padding-left: 0;
        }
        .roadmap-list li {
            padding: 10px 0;
            border-bottom: 1px dotted var(--bg-light);
            color: var(--text-secondary);
            font-size: 0.9em;
        }
        .roadmap-list li::before {
            content: '>> ';
            color: var(--primary-accent);
            font-weight: bold;
        }

        /* --- TAGLINE --- */
        .tagline-section {
            text-align: center;
            padding: 40px 10px;
        }
        .tagline-text {
            color: var(--secondary-accent);
            font-family: 'Orbitron', monospace;
            font-size: 2em;
            text-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
            margin: 0;
        }

        /* --- FOOTER (Responsive) --- */
        .footer {
          background: var(--bg-dark);
          padding: 30px 20px;
          border-top: 2px solid var(--primary-accent);
          text-align: center;
          font-size: 0.8em;
          color: var(--text-secondary);
        }
        .contact-cta {
            display: flex;
            flex-direction: column; 
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid var(--secondary-accent);
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        .chat-icon {
            font-size: 1.5em;
            color: var(--secondary-accent);
        }
        .neon-cta-button {
            padding: 10px 20px;
            background: var(--primary-accent);
            color: var(--bg-dark);
            border: none;
            cursor: pointer;
            font-family: 'Orbitron', monospace;
            font-size: 0.9em;
            box-shadow: 0 0 10px var(--primary-accent);
            transition: all 0.3s;
        }
        .neon-cta-button:hover {
             box-shadow: 0 0 20px var(--primary-accent);
        }

        .footer-links {
            display: flex;
            flex-wrap: wrap; 
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
        }
        .footer-link-item p {
            margin: 0;
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.3s;
        }
        .footer-link-item:hover p {
            color: var(--primary-accent);
        }
        .disclaimer {
            color: var(--error-color);
            margin-top: 20px;
            font-size: 0.9em;
        }
        .copyright {
            margin-top: 15px;
        }
        .status-indicator {
            color: var(--primary-accent);
        }

        /* ------------------------------------------- */
        /* --- MEDIA QUERIES FOR MOBILE ADAPTATION --- */
        /* ------------------------------------------- */

        /* Tablet/Small Desktop (Max 900px) */
        @media (max-width: 900px) {
            .info-panel {
                padding: 20px;
                margin: 30px 10px; 
            }
            .flow-container {
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
            }
        }

        /* Mobile (Max 768px) */
        @media (max-width: 768px) {
            .fixed-header {
                padding: 0 15px; 
                height: 60px; 
            }
            .header-spacer {
                height: 60px;
            }
            .left-header {
                gap: 10px;
            }
            .main-nav {
                display: none; 
            }
            .right-header {
                gap: 10px;
            }

            .animated-aivisor-title {
                font-size: 2.5em; 
                letter-spacing: 4px;
            }
            .title-subtitle {
                font-size: 0.8em; 
                letter-spacing: 2px;
            }

            .main-box {
                padding: 20px; 
            }

            .flow-container {
                grid-template-columns: 1fr; 
            }
            
            .levels-grid {
                grid-template-columns: 1fr; 
            }
            
            .testimonial-carousel {
                grid-template-columns: 1fr; 
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .feature-grid {
                grid-template-columns: 1fr; 
            }

            .tagline-text {
                font-size: 1.5em; 
            }
            
            .trust-logos {
                flex-direction: column; 
                align-items: center;
            }
            .trust-logo-item {
                font-size: 1em;
            }
            
            .footer-links {
                flex-direction: column; 
                gap: 10px;
            }
        }

        /* Very Small Mobile (Max 480px) */
        @media (max-width: 480px) {
            .logo span {
                font-size: 1.2em;
            }
            .app-tag {
                display: none; 
            }
            .profile-icon {
                 font-size: 12px;
                 padding: 6px 8px;
            }
        }
      `}</style>
    </>
  );
}