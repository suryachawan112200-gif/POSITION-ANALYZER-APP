// pages/index.js - Main Page (Updated with larger box sizes, exciting CTA, & link to subscribe page)
import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

// Logo font style
const logoFont = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  color: "#00D4FF",
  textShadow: "0 0 8px rgba(0, 212, 255, 0.4), 0 0 16px rgba(124, 58, 237, 0.2)",
};

// Hero Component with Live Ticker
const Hero = ({ scrollToDashboard }) => {
  const [btcPrice, setBtcPrice] = useState(65000); // Placeholder for real-time API
  return (
    <div className="hero">
      <div className="ticker">BTC: ${btcPrice.toLocaleString()} <span className="ticker-change positive">+2.3%</span></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="aivi">AI</span>
          <span className="visor">VISOR</span>
        </h1>
        <p className="hero-subtitle">Neural Analytics for Crypto Positions</p>
        <button className="quick-demo" onClick={scrollToDashboard}>
          Try Your First 2 Analyses Free
        </button>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ step, total }) => (
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${(step / total) * 100}%` }}></div>
    <span className="progress-text">Step {step} of {total}</span>
  </div>
);

// Coin Auto-Suggest Component
const CoinSuggest = ({ value, onChange }) => {
  const suggestions = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];
  return (
    <div className="coin-suggest">
      <input
        type="text"
        placeholder="Search coin (e.g., BTCUSDT)"
        value={value}
        onChange={onChange}
        list="coin-suggestions"
        className="input-field suggest"
        aria-label="Select cryptocurrency"
      />
      <datalist id="coin-suggestions">
        {suggestions.map((coin) => (
          <option key={coin} value={coin} />
        ))}
      </datalist>
    </div>
  );
};

// Input Wizard Component
const InputWizard = ({
  coin,
  setCoin,
  market,
  setMarket,
  positionType,
  setPositionType,
  timeframe,
  setTimeframe,
  entryPrice,
  setEntryPrice,
  quantity,
  setQuantity,
  loading,
  submitData,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    if (step === 1) return coin && market;
    if (step === 2) return positionType && timeframe;
    if (step === 3) return entryPrice && quantity;
    return true;
  };

  return (
    <div className="wizard">
      <ProgressBar step={step} total={totalSteps} />
      <div className="wizard-step">
        {step === 1 && (
          <>
            <h3>Asset & Market</h3>
            <CoinSuggest value={coin} onChange={(e) => setCoin(e.target.value)} />
            <div className="toggle-group">
              <button
                className={`toggle-option ${market === "Futures" ? "active" : ""}`}
                onClick={() => setMarket("Futures")}
                aria-pressed={market === "Futures"}
              >
                Futures
              </button>
              <button
                className={`toggle-option ${market === "Spot" ? "active" : ""}`}
                onClick={() => setMarket("Spot")}
                aria-pressed={market === "Spot"}
              >
                Spot
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3>Position & Timeframe</h3>
            <div className="toggle-group">
              <button
                className={`toggle-option ${positionType === "Long" ? "active" : ""}`}
                onClick={() => setPositionType("Long")}
                aria-pressed={positionType === "Long"}
              >
                Long
              </button>
              <button
                className={`toggle-option ${positionType === "Short" ? "active" : ""}`}
                onClick={() => setPositionType("Short")}
                aria-pressed={positionType === "Short"}
              >
                Short
              </button>
            </div>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="input-field"
              aria-label="Select timeframe"
            >
              <option value="5m">5m</option>
              <option value="15m">15m</option>
              <option value="1h">1h</option>
              <option value="4h">4h</option>
              <option value="1d">1d</option>
              <option value="1week">1w</option>
              <option value="1month">1M</option>
            </select>
          </>
        )}
        {step === 3 && (
          <>
            <h3>Entry Details</h3>
            <div className="input-row">
              <input
                type="number"
                placeholder="Entry Price (USD)"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="input-field"
                aria-label="Entry price"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input-field"
                aria-label="Quantity"
              />
            </div>
          </>
        )}
        <div className="wizard-nav">
          {step > 1 && <button onClick={prevStep} className="nav-btn secondary">Back</button>}
          {step < totalSteps ? (
            <button onClick={nextStep} disabled={!isStepValid()} className="nav-btn">
              Next
            </button>
          ) : (
            <button onClick={submitData} disabled={loading || !isStepValid()} className="analyze-btn">
              {loading ? "Analyzing..." : "Analyze Position"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Result Tabs Component
const ResultTabs = ({ result }) => {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="result-tabs">
      <div className="tab-headers" role="tablist">
        <button
          className={activeTab === "summary" ? "active" : ""}
          onClick={() => setActiveTab("summary")}
          role="tab"
          aria-selected={activeTab === "summary"}
        >
          Summary
        </button>
        <button
          className={activeTab === "tgt-sl" ? "active" : ""}
          onClick={() => setActiveTab("tgt-sl")}
          role="tab"
          aria-selected={activeTab === "tgt-sl"}
        >
          TGT & SL Levels
        </button>
        <button
          className={activeTab === "market-sentiment" ? "active" : ""}
          onClick={() => setActiveTab("market-sentiment")}
          role="tab"
          aria-selected={activeTab === "market-sentiment"}
        >
          Market Sentiment
        </button>
        <button
          className={activeTab === "chart-patterns" ? "active" : ""}
          onClick={() => setActiveTab("chart-patterns")}
          role="tab"
          aria-selected={activeTab === "chart-patterns"}
        >
          Detected Chart Patterns
        </button>
        <button
          className={activeTab === "action" ? "active" : ""}
          onClick={() => setActiveTab("action")}
          role="tab"
          aria-selected={activeTab === "action"}
        >
          Recommended Action
        </button>
      </div>
      <div className="tab-content" role="tabpanel">
        {activeTab === "summary" && (
          <div className="tab-panel">
            <div className="result-card">
              <h4>Trade Summary</h4>
              <div className="summary-item">
                <span>Asset:</span> <strong>{result.coin} ({result.asset_class?.toUpperCase()})</strong>
              </div>
              <div className="summary-item">
                <span>Market:</span> <strong>{result.market?.toUpperCase()}</strong>
              </div>
              <div className="summary-item">
                <span>Position:</span>{" "}
                <strong className={result.position_type === "long" ? "positive" : "negative"}>
                  {result.position_type?.toUpperCase()}
                </strong>
              </div>
              <div className="summary-item">
                <span>Entry Price:</span>{" "}
                <strong className="highlight">${result.entry_price?.toFixed(5)}</strong>
              </div>
              <div className="summary-item">
                <span>Live Price:</span>{" "}
                <strong className="highlight">${result.current_price?.toFixed(5)}</strong>
              </div>
              <div className="summary-item">
                <span>P/L:</span>{" "}
                <strong className={result.profit_loss >= 0 ? "positive" : "negative"}>
                  {result.profit_loss || "N/A"}
                </strong>
              </div>
              <div className="summary-item">
                <span>Status:</span> <em>{result.profitability_comment || "No Data"}</em>
              </div>
            </div>
          </div>
        )}
        {activeTab === "tgt-sl" && (
          <div className="tab-panel">
            <div className="result-card">
              <h4>TGT & SL Levels</h4>
              <div className="levels-section">
                <h5>Take Profit Targets</h5>
                <div className="levels-list">
                  {result.targets?.map((target, idx) => (
                    <div key={idx} className="level positive">
                      T{idx + 1}: ${target?.toFixed(5)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="levels-section">
                <h5>Stop Loss Levels</h5>
                <div className="levels-list">
                  {result.user_stoploss && (
                    <div className="level negative">User SL: ${result.user_stoploss?.toFixed(5)}</div>
                  )}
                  {result.market_stoplosses?.map((sl, idx) => (
                    <div key={idx} className="level negative">
                      SL{idx + 1}: ${sl?.toFixed(5)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "market-sentiment" && (
          <div className="tab-panel">
            <div className="result-card">
              <h4>Market Sentiment</h4>
              <div className="summary-item">
                <span>Overall Trend:</span>{" "}
                <strong className="trend">{result.market_trend?.toUpperCase()}</strong>
              </div>
              <div className="confidence-meter">
                <div className="meter-bar">
                  <div
                    className="meter-fill long"
                    style={{ width: `${result.confidence_meter?.long}%` }}
                  >
                    Long: {result.confidence_meter?.long}%
                  </div>
                  <div
                    className="meter-fill short"
                    style={{ width: `${result.confidence_meter?.short}%` }}
                  >
                    Short: {result.confidence_meter?.short}%
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <em>{result.trend_comment || "No Comment"}</em>
              </div>
            </div>
          </div>
        )}
        {activeTab === "chart-patterns" && (
          <div className="tab-panel">
            <div className="result-card">
              <h4>Detected Chart Patterns</h4>
              <div className="patterns-list">
                <div>
                  Candlesticks: {result.detected_patterns?.candlesticks?.join(", ") || "None Detected"}
                </div>
                <div>
                  Chart Patterns: {result.detected_patterns?.chart_patterns?.join(", ") || "None Detected"}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "action" && (
          <div className="tab-panel">
            <div className="result-card">
              <h4>Recommended Action</h4>
              <div className="action-recommend">
                <strong className="trend">{result.recommended_action?.toUpperCase() || "HOLD"}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="action-ctas">
        <button className="cta-btn secondary">Export PDF</button>
        <button className="cta-btn primary">Set Alert</button>
        <button className="cta-btn secondary">Save to History</button>
      </div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default function Home() {
  // --- Original State and Logic (Unchanged) ---
  const [market, setMarket] = useState("Futures");
  const [positionType, setPositionType] = useState("Long");
  const [coin, setCoin] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [timeframe, setTimeframe] = useState("15m");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dashboardRef = useRef(null);

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      has_both_positions: false,
      risk_pct: 0.02,
    };
    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL || "https://python-backend-pr.vercel.app/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `HTTP Error Code ${response.status}: Analysis engine offline. ${errorDetail.substring(0, 50)}...`
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

  return (
    <>
      <Head>
        <title>AIVISOR: Neural Crypto Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="AI-powered crypto position analytics for traders." />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🤖</div>
            <span style={logoFont}>AIVISOR</span>
            <span className="version-tag">[V3.1]</span>
          </div>
          <nav className="nav-links">
            <Link href="#features">Features</Link>
            <Link href="#howitworks">How It Works</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="/support">Support</Link>
          </nav>
          <div className="header-actions">
            <select className="lang-select" aria-label="Select language">
              <option>ENG</option>
              <option>ESP</option>
            </select>
            <Link href="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </div>
      </header>

      <Hero scrollToDashboard={scrollToDashboard} />

      <section id="mission" className="mission-section">
        <div className="mission-card">
          <h2>Execute Neural Analysis</h2>
          <p>
            AIVISOR harnesses xAI-grade models to process live market data, technical indicators, and sentiment for precise position insights. <strong>Public Beta: Live</strong>
          </p>
        </div>
      </section>

      <main className="dashboard" ref={dashboardRef}>
        <InputWizard
          coin={coin}
          setCoin={setCoin}
          market={market}
          setMarket={setMarket}
          positionType={positionType}
          setPositionType={setPositionType}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          entryPrice={entryPrice}
          setEntryPrice={setEntryPrice}
          quantity={quantity}
          setQuantity={setQuantity}
          loading={loading}
          submitData={submitData}
        />
        {error && <div className="error-card">Error: {error}</div>}
        {loading && <div className="loading-card">Processing... <span className="spinner">⚙️</span></div>}
        {result && <ResultTabs result={result} />}
      </main>

      <section id="howitworks" className="section-grid">
        <h2>How It Works</h2>
        <div className="grid-4">
          <div className="step-card">
            <div className="step-icon">1</div>
            <h3>Connect</h3>
            <p>Input your trade parameters.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">2</div>
            <h3>Analyze</h3>
            <p>AI processes real-time signals.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">3</div>
            <h3>Act</h3>
            <p>Get precise targets & stops.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">4</div>
            <h3>Optimize</h3>
            <p>Refine with AI insights.</p>
          </div>
        </div>
      </section>

      <section id="features" className="section-grid">
        <h2>Core Features</h2>
        <div className="grid-4">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Live Data</h3>
            <p>Real-time market feeds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>AI Models</h3>
            <p>Deep learning on crypto data.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Risk Zones</h3>
            <p>Dynamic SL/TP levels.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Multi-Timeframe</h3>
            <p>Holistic chart analysis.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <h2>Testimonials</h2>
        <div className="carousel">
          <div className="testimonial-card">
            <p>"AIVISOR's risk zones are uncannily accurate."</p>
            <cite>- Alpha Trader, BTC Futures</cite>
          </div>
          <div className="testimonial-card">
            <p>"Confidence meter gives me the edge I need."</p>
            <cite>- Beta User, SOL Spot</cite>
          </div>
          <div className="testimonial-card">
            <p>"Clean, actionable—my go-to for perps."</p>
            <cite>- Gamma Pro, ETH</cite>
          </div>
        </div>
        <p className="stat">Trusted by 3,000+ traders globally.</p>
      </section>

      <section id="faq" className="faq-section">
        <h2>FAQ</h2>
        <FAQItem
          question="Is my trade data secure?"
          answer="AIVISOR uses 256-bit AES encryption. No API keys are stored."
        />
        <FAQItem
          question="How accurate is the AI?"
          answer="Backtested across market cycles for statistical edge."
        />
        <FAQItem
          question="Futures vs. Spot analysis?"
          answer="Futures includes leverage; Spot focuses on trends."
        />
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h3>Go Premium</h3>
          <p>Unlimited analysis, portfolio sync, priority AI.</p>
          <Link href="/subscribe">
            <button className="premium-btn">Start at $29/mo</button>
          </Link>
        </div>
      </section>

      <section className="security-section">
        <h2>Security & Compliance</h2>
        <p>256-bit AES Encryption | No API Keys | GDPR-Compliant</p>
      </section>

      <section className="integrations-section">
        <h2>Integrations</h2>
        <div className="logos">Binance | Coinbase | OKX | Bybit</div>
      </section>

      <section className="roadmap-section">
        <h2>Roadmap</h2>
        <ul className="roadmap-list">
          <li>Q4 2025: Portfolio Sync (Read-Only)</li>
          <li>Q1 2026: Backtesting Module</li>
          <li>Q1 2026: Forex Pairs</li>
        </ul>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="contact-cta">
            <span className="chat-icon">💬</span>
            <span>Need help? Live chat support.</span>
            <Link href="/support">
              <button className="support-btn">Contact Us</button>
            </Link>
          </div>
          <div className="footer-links">
            <Link href="/support#privacy">Privacy</Link>
            <Link href="/support#terms">Terms</Link>
            <Link href="/support#support">Support</Link>
          </div>
          <p className="disclaimer">Not financial advice. Trade at your own risk.</p>
          <p>© 2025 AIVISOR | Powered by xAI</p>
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
          overflow-x: hidden;
          position: relative;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: -1;
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
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
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: var(--accent-cyan);
          text-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .lang-select {
          background: var(--bg-secondary);
          color: var(--text-light);
          border: 1px solid var(--accent-cyan);
          padding: 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
        }

        .login-btn, .support-btn, .premium-btn {
          background: var(--gradient);
          color: var(--bg-primary);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .login-btn:hover, .support-btn:hover, .premium-btn:hover {
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
          transform: translateY(-2px);
        }

        .hero {
          padding: 6rem 2rem;
          text-align: center;
          position: relative;
        }

        .ticker {
          position: absolute;
          top: 1rem;
          right: 2rem;
          background: var(--bg-card);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          color: var(--accent-cyan);
        }

        .ticker-change.positive {
          color: var(--success);
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 5rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          animation: glow 3s infinite;
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px var(--accent-cyan); }
          50% { text-shadow: 0 0 30px var(--accent-violet); }
        }

        .aivi { color: var(--accent-cyan); }
        .visor { color: var(--accent-violet); }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
        }

        .quick-demo {
          background: var(--gradient);
          color: var(--bg-primary);
          padding: 1.2rem 3rem;
          border: none;
          border-radius: 3rem;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          animation: pulseGlow 2s infinite;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }

        .quick-demo:hover {
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.7);
          transform: scale(1.05);
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
          50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.8); }
        }

        .mission-section {
          padding: 4rem 2rem;
          text-align: center;
        }

        .mission-card {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background: var(--bg-card);
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .mission-card h2 {
          color: var(--accent-cyan);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .mission-card p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .dashboard {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .wizard, .result-tabs {
          background: var(--bg-card);
          border-radius: 1rem;
          padding: 3rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          max-width: 900px;
          margin: 0 auto;
        }

        .progress-bar {
          background: var(--bg-secondary);
          height: 0.5rem;
          border-radius: 0.25rem;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .progress-fill {
          background: var(--gradient);
          height: 100%;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: -1.5rem;
          right: 0;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .wizard-step {
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wizard-step h3 {
          color: var(--accent-violet);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .coin-suggest {
          position: relative;
        }

        .input-field {
          width: 100%;
          padding: 1rem;
          background: var(--bg-secondary);
          border: 1px solid transparent;
          border-radius: 0.5rem;
          color: var(--text-light);
          font-size: 1rem;
          transition: all 0.3s;
        }

        .input-field:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
          outline: none;
        }

        .input-field.suggest {
          padding-right: 2rem;
        }

        .toggle-group {
          display: flex;
          background: var(--bg-secondary);
          border-radius: 2rem;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .toggle-option {
          flex: 1;
          padding: 0.75rem;
          text-align: center;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .toggle-option.active {
          background: var(--gradient);
          color: var(--bg-primary);
          font-weight: 600;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .wizard-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }

        .nav-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-btn.secondary {
          background: var(--bg-secondary);
          color: var(--text-muted);
        }

        .nav-btn:not(.secondary) {
          background: var(--gradient);
          color: var(--bg-primary);
        }

        .nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
        }

        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .analyze-btn {
          width: 100%;
          padding: 1.2rem;
          background: var(--gradient);
          color: var(--bg-primary);
          border: none;
          border-radius: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
        }

        .analyze-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .error-card, .loading-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 0.5rem;
          text-align: center;
          margin: 1rem 0;
          font-size: 1.1rem;
        }

        .error-card {
          color: var(--error);
        }

        .loading-card .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .result-tabs {
          margin-top: 2rem;
        }

        .tab-headers {
          display: flex;
          border-bottom: 1px solid var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .tab-headers button {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .tab-headers button.active {
          color: var(--accent-cyan);
          border-bottom: 2px solid var(--accent-cyan);
        }

        .tab-content {
          animation: fadeIn 0.3s;
        }

        .result-card {
          background: rgba(10, 10, 35, 0.6);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border-left: 4px solid var(--accent-cyan);
        }

        .result-card h4 {
          color: var(--accent-violet);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .summary-item span {
          color: var(--text-muted);
        }

        .highlight {
          color: var(--accent-cyan);
          font-family: monospace;
        }

        .positive { color: var(--success); }
        .negative { color: var(--error); }
        .trend { color: var(--accent-violet); }

        .levels-section {
          margin: 1rem 0;
        }

        .levels-section h5 {
          color: var(--text-light);
          margin-bottom: 0.5rem;
        }

        .levels-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .level {
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }

        .level.positive {
          border-left: 3px solid var(--success);
          background: rgba(16, 185, 129, 0.1);
        }

        .level.negative {
          border-left: 3px solid var(--error);
          background: rgba(239, 68, 68, 0.1);
        }

        .confidence-meter {
          margin: 1rem 0;
        }

        .meter-bar {
          display: flex;
          height: 0.5rem;
          background: var(--bg-secondary);
          border-radius: 0.25rem;
          overflow: hidden;
        }

        .meter-fill {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: var(--bg-primary);
        }

        .meter-fill.long { background: var(--success); }
        .meter-fill.short { background: var(--error); }

        .patterns-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .patterns-list div {
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }

        .action-recommend {
          text-align: center;
          padding: 1rem;
          background: rgba(124, 58, 237, 0.1);
          border-radius: 0.5rem;
          font-size: 1rem;
        }

        .action-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .cta-btn.primary {
          background: var(--gradient);
          color: var(--bg-primary);
        }

        .cta-btn.secondary {
          background: var(--bg-secondary);
          color: var(--text-light);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
        }

        .section-grid {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .section-grid h2 {
          color: var(--accent-cyan);
          margin-bottom: 3rem;
          font-weight: 600;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .step-card, .feature-card {
          padding: 2rem;
          background: var(--bg-card);
          border-radius: 1rem;
          transition: transform 0.3s;
          cursor: pointer;
        }

        .step-card:hover, .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
        }

        .step-icon, .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--accent-cyan);
        }

        .testimonials-section, .faq-section, .cta-section, .security-section, .integrations-section, .roadmap-section {
          padding: 4rem 2rem;
          background: var(--bg-secondary);
        }

        .carousel {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-snap-type: x mandatory;
        }

        .testimonial-card {
          min-width: 300px;
          padding: 1.5rem;
          background: var(--bg-card);
          border-radius: 1rem;
          flex-shrink: 0;
          scroll-snap-align: center;
        }

        .testimonial-card cite {
          display: block;
          margin-top: 1rem;
          color: var(--accent-violet);
          text-align: right;
          font-style: normal;
          font-size: 0.9rem;
        }

        .stat {
          margin-top: 2rem;
          color: var(--text-muted);
          font-size: 1rem;
        }

        .faq-item {
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--text-muted);
        }

        .faq-question {
          padding: 1rem 0;
          background: none;
          border: none;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-light);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
        }

        .faq-question:hover {
          color: var(--accent-cyan);
        }

        .faq-toggle {
          font-size: 1rem;
          color: var(--accent-cyan);
        }

        .faq-answer {
          padding: 0 0 1rem 1rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          animation: fadeIn 0.3s;
        }

        .cta-card {
          max-width: 400px;
          margin: 0 auto;
          padding: 2rem;
          background: var(--bg-card);
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          text-align: center;
        }

        .cta-card h3 {
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .logos {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          color: var(--text-muted);
          font-size: 1rem;
        }

        .roadmap-list {
          list-style: none;
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
        }

        .roadmap-list li {
          padding: 0.75rem;
          background: var(--bg-card);
          margin-bottom: 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
        }

        .roadmap-list li:before {
          content: '→';
          color: var(--accent-cyan);
          margin-right: 0.5rem;
        }

        .footer {
          padding: 3rem 2rem;
          background: var(--bg-primary);
          border-top: 1px solid var(--accent-cyan);
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .chat-icon {
          font-size: 1.5rem;
          color: var(--accent-cyan);
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 1rem 0;
        }

        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
        }

        .footer-links a:hover {
          color: var(--accent-cyan);
        }

        .disclaimer {
          color: var(--error);
          font-size: 0.85rem;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            padding: 0 1rem;
          }
          .nav-links {
            display: none;
          }
          .hero-title {
            font-size: 3rem;
          }
          .ticker {
            top: 0.5rem;
            right: 1rem;
            font-size: 0.8rem;
          }
          .input-row {
            grid-template-columns: 1fr;
          }
          .carousel {
            flex-direction: column;
          }
          .grid-4 {
            grid-template-columns: 1fr;
          }
          .logos {
            flex-direction: column;
            gap: 1rem;
          }
          .action-ctas {
            flex-direction: column;
          }
          .dashboard {
            padding: 0;
          }
          .wizard, .result-tabs {
            padding: 1.5rem;
            margin: 0 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          .input-field, .nav-btn, .analyze-btn, .cta-btn {
            font-size: 0.9rem;
            padding: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}