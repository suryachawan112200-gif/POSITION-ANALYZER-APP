import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useAuth } from "/contexts/AuthContext";
import ProfileModal from "/components/ProfileModal";
import LoginPopup from "/components/LoginPopup";

// Enhanced Logo font style with redesign: Split AIVISOR into AI and VISOR with distinct gradients and subtle animation
const logoFont = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  background: "linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%)",
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
          Try Your First 2 Analyses Free (4h Timeframe)
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
    if (step === 2) return positionType;
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
            <h3>Position</h3>
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
                <span>Asset:</span>{" "}
                <strong>{result?.coin || "N/A"} ({result?.asset_class?.toUpperCase() || "N/A"})</strong>
              </div>
              <div className="summary-item">
                <span>Market:</span> <strong>{result?.market?.toUpperCase() || "N/A"}</strong>
              </div>
              <div className="summary-item">
                <span>Position:</span>{" "}
                <strong
                  className={result?.position_type === "long" ? "positive" : "negative"}
                >
                  {result?.position_type?.toUpperCase() || "N/A"}
                </strong>
              </div>
              <div className="summary-item">
                <span>Entry Price:</span>{" "}
                <strong className="highlight">
                  ${result?.entry_price?.toFixed(5) || "N/A"}
                </strong>
              </div>
              <div className="summary-item">
                <span>Live Price:</span>{" "}
                <strong className="highlight">
                  ${result?.current_price?.toFixed(5) || "N/A"}
                </strong>
              </div>
              <div className="summary-item">
                <span>P/L:</span>{" "}
                <strong className={result?.profit_loss >= 0 ? "positive" : "negative"}>
                  {result?.profit_loss || "N/A"}
                </strong>
              </div>
              <div className="summary-item">
                <span>Status:</span> <em>{result?.profitability_comment || "No Data"}</em>
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
                  {(result?.targets || []).map((target, idx) => (
                    <div key={idx} className="level positive">
                      T{idx + 1}: ${target?.toFixed(5) || "N/A"}
                    </div>
                  ))}
                </div>
              </div>
              <div className="levels-section">
                <h5>Stop Loss Levels</h5>
                <div className="levels-list">
                  {result?.user_stoploss && (
                    <div className="level negative">
                      User SL: ${result.user_stoploss?.toFixed(5) || "N/A"}
                    </div>
                  )}
                  {(result?.market_stoplosses || []).map((sl, idx) => (
                    <div key={idx} className="level negative">
                      SL{idx + 1}: ${sl?.toFixed(5) || "N/A"}
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
                <strong className="trend">{result?.market_trend?.toUpperCase() || "N/A"}</strong>
              </div>
              <div className="confidence-meter">
                <div className="meter-bar">
                  <div
                    className="meter-fill long"
                    style={{ width: `${result?.confidence_meter?.long || 0}%` }}
                  >
                    Long: {result?.confidence_meter?.long || 0}%
                  </div>
                  <div
                    className="meter-fill short"
                    style={{ width: `${result?.confidence_meter?.short || 0}%` }}
                  >
                    Short: {result?.confidence_meter?.short || 0}%
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <em>{result?.trend_comment || "No Comment"}</em>
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
                  Candlesticks:{" "}
                  {(result?.detected_patterns?.candlesticks || []).join(", ") || "None Detected"}
                </div>
                <div>
                  Chart Patterns:{" "}
                  {(result?.detected_patterns?.chart_patterns || []).join(", ") || "None Detected"}
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
                <strong className="trend">
                  {result?.recommended_action?.toUpperCase() || "HOLD"}
                </strong>
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

// Dynamically import RecentHistory to avoid SSR issues with localStorage
const RecentHistory = dynamic(() => import("/components/RecentHistory"), { ssr: false });

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

// Premium Section Component (Redesigned)
const PremiumSection = () => {
  return (
    <section className="premium-section">
      <div className="pricing-card">
        <h3 className="pricing-title">Pro</h3>
        <p className="pricing-price">$29/mo</p>
        <p className="pricing-description">Unlimited analyses with advanced insights</p>
        <ul className="pricing-features">
          <li><span className="feature-icon">✅</span> Unlimited daily analyses</li>
          <li><span className="feature-icon">✅</span> Priority support</li>
          <li><span className="feature-icon">✅</span> Early feature access</li>
          <li><span className="feature-icon">✅</span> Custom analytics tools</li>
        </ul>
        <Link href="/subscribe">
          <button className="pricing-button">Subscribe Now</button>
        </Link>
      </div>
    </section>
  );
};

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [market, setMarket] = useState("Futures");
  const [positionType, setPositionType] = useState("Long");
  const [coin, setCoin] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const count = parseInt(localStorage.getItem("aivisorAnalysisCount") || "0");
      setAnalysisCount(count);
    }
  }, []);

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveHistory = (input, resultData) => {
    if (typeof window === "undefined") return; // Prevent server-side execution
    try {
      const history = JSON.parse(localStorage.getItem("aivisorHistory") || "[]");
      const item = { timestamp: Date.now(), input, result: resultData };
      history.unshift(item);
      const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
      const filtered = history.filter((h) => h.timestamp > threeDaysAgo);
      localStorage.setItem("aivisorHistory", JSON.stringify(filtered.slice(0, 100)));
    } catch (err) {
      console.error("Error saving history:", err);
    }
  };

  const incrementAnalysisCount = () => {
    if (typeof window !== "undefined") {
      const newCount = analysisCount + 1;
      setAnalysisCount(newCount);
      localStorage.setItem("aivisorAnalysisCount", newCount.toString());
    }
  };

  const submitData = async () => {
    if (typeof window === "undefined") return; // Prevent server-side execution

    if (!user && analysisCount >= 2) {
      setShowLoginPopup(true);
      return;
    }

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
    const inputData = {
      coin,
      market,
      positionType,
      entryPrice: parsedEntryPrice,
      quantity: parsedQuantity,
    };
    const data = {
      asset_class: "crypto",
      coin: coin.toUpperCase(),
      market: market.toLowerCase(),
      position_type: positionType.toLowerCase(),
      entry_price: parsedEntryPrice,
      quantity: parsedQuantity,
      timeframe: "4h",
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
      saveHistory(inputData, resultData);
      incrementAnalysisCount();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>AIVISOR: Neural Crypto Analytics</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="AI-powered crypto position analytics for traders." />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🤖</div>
            <span style={logoFont}>AIVISOR</span>
            <span className="version-tag">[V3.2]</span>
          </div>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link href="#features" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link href="#howitworks" onClick={() => setMenuOpen(false)}>How It Works</Link>
            <Link href="#faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
            <Link href="/support" onClick={() => setMenuOpen(false)}>Support</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </nav>
          <div className="header-actions">
            <span className="user-greeting">
              {user ? `Hello, ${user.email.split("@")[0]}` : "Hello, Trader"}
            </span>
            <FaUserCircle
              className="profile-icon"
              onClick={() => setShowProfile(true)}
              aria-label="Open profile"
            />
            <FaBars
              className="menu-icon"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            />
          </div>
        </div>
      </header>

      <Hero scrollToDashboard={scrollToDashboard} />

      <section id="mission" className="mission-section">
        <div className="mission-card">
          <h2>Execute Neural Analysis</h2>
          <p>
            AIVISOR harnesses xAI-grade models to process live market data, technical indicators, and
            sentiment for precise position insights. <strong>Public Beta: Live</strong>
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
        <RecentHistory />
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
            <h3>4h Analysis</h3>
            <p>Focused 4h timeframe insights.</p>
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

      <PremiumSection />

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

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}

      <style jsx global>{`
        :root {
          --bg-primary: #FFFFFF;
          --bg-card: #F8FBFF;
          --accent-blue: #43C0F6;
          --text-primary: #333333;
          --text-muted: #6B7280;
          --success: #3ED598;
          --error: #EF4444;
          --button-gradient: linear-gradient(135deg, #43C0F6, #3AEAB6);
          --border-soft: #E5E7EB;
          --shadow-subtle: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-glow: 0 0 15px rgba(67, 192, 246, 0.3);
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
          position: relative;
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

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-soft);
          padding: 0.5rem 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          height: 50px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 1.5rem;
        }

        .version-tag {
          background: var(--accent-blue);
          color: #FFFFFF;
          padding: 0.15rem 0.3rem;
          border-radius: 0.3rem;
          font-size: 0.6rem;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.3s;
          white-space: nowrap;
        }

        .nav-links a:hover {
          color: var(--accent-blue);
        }

        .nav-links.open {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 50px;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          padding: 1rem;
          border-bottom: 1px solid var(--border-soft);
          box-shadow: var(--shadow-subtle);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .user-greeting {
          color: var(--accent-blue);
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .profile-icon, .menu-icon {
          font-size: 1.5rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.3s;
        }

        .profile-icon:hover, .menu-icon:hover {
          color: var(--accent-blue);
        }

        .login-btn, .support-btn, .pay-btn, .quick-demo {
          background: var(--button-gradient);
          color: #FFFFFF;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .login-btn:hover, .support-btn:hover, .pay-btn:hover, .quick-demo:hover {
          box-shadow: var(--shadow-hover);
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
          color: var(--accent-blue);
          border: 1px solid var(--border-soft);
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
          background: var(--button-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .aivi { color: var(--accent-blue); }
        .visor { color: var(--accent-blue); }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
        }

        .quick-demo:hover {
          box-shadow: var(--shadow-hover);
          transform: scale(1.05);
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
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--border-soft);
        }

        .mission-card h2 {
          color: var(--text-primary);
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

        .wizard, .result-tabs, .premium-section, .history-section {
          background: var(--bg-card);
          border-radius: 1rem;
          padding: 3rem;
          box-shadow: var(--shadow-subtle);
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid var(--border-soft);
        }

        .premium-section .pricing-card {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: var(--shadow-subtle);
          text-align: center;
          max-width: 300px;
          margin: 0 auto;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .premium-section .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover), var(--shadow-glow);
        }

        .pricing-title {
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .pricing-price {
          color: var(--accent-blue);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .pricing-description {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .pricing-features {
          list-style: none;
          text-align: left;
          margin-bottom: 1.5rem;
          padding: 0 1rem;
        }

        .pricing-features li {
          color: var(--text-primary);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .feature-icon {
          margin-right: 0.5rem;
        }

        .pricing-button {
          background: var(--button-gradient);
          color: #FFFFFF;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .pricing-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .history-section h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-weight: 600;
          text-align: center;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .history-card {
          display: block;
          background: #FFFFFF;
          padding: 1rem;
          border-radius: 0.75rem;
          border-left: 4px solid var(--accent-blue);
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.3s;
          box-shadow: var(--shadow-subtle);
        }

        .history-card:hover {
          background: var(--bg-card);
          transform: translateX(5px);
          box-shadow: var(--shadow-hover);
        }

        .history-preview {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .history-date {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .history-pl {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .progress-bar {
          background: #E5E7EB;
          height: 0.5rem;
          border-radius: 0.25rem;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .progress-fill {
          background: var(--button-gradient);
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
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .coin-suggest {
          position: relative;
        }

        .input-field {
          width: 100%;
          padding: 1rem;
          background: #FFFFFF;
          border: 1px solid var(--border-soft);
          border-radius: 0.5rem;
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s;
        }

        .input-field:focus {
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(67, 192, 246, 0.1);
          outline: none;
        }

        .input-field.suggest {
          padding-right: 2rem;
        }

        .toggle-group {
          display: flex;
          background: #FFFFFF;
          border-radius: 2rem;
          overflow: hidden;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-soft);
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
          background: var(--button-gradient);
          color: #FFFFFF;
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
          background: #FFFFFF;
          color: var(--text-muted);
          border: 1px solid var(--border-soft);
        }

        .nav-btn:not(.secondary) {
          background: var(--button-gradient);
          color: #FFFFFF;
        }

        .nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .analyze-btn {
          width: 100%;
          padding: 1.2rem;
          background: var(--button-gradient);
          color: #FFFFFF;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
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
          border: 1px solid var(--border-soft);
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
          border-bottom: 1px solid var(--border-soft);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
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
          white-space: nowrap;
        }

        .tab-headers button.active {
          color: var(--accent-blue);
          border-bottom: 2px solid var(--accent-blue);
        }

        .tab-content {
          animation: fadeIn 0.3s;
          overflow-x: hidden;
        }

        .result-card {
          background: #FFFFFF;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border-left: 4px solid var(--accent-blue);
          overflow: hidden;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-subtle);
        }

        .result-card h4 {
          color: var(--text-primary);
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
          color: var(--accent-blue);
          font-family: monospace;
          word-break: break-all;
        }

        .positive { color: var(--success); }
        .negative { color: var(--error); }
        .trend { color: var(--accent-blue); }

        .levels-section {
          margin: 1rem 0;
        }

        .levels-section h5 {
          color: var(--text-primary);
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
          word-break: break-all;
        }

        .level.positive {
          border-left: 3px solid var(--success);
          background: rgba(62, 213, 152, 0.1);
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
          background: var(--border-soft);
          border-radius: 0.25rem;
          overflow: hidden;
        }

        .meter-fill {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: #FFFFFF;
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
          background: var(--bg-card);
          border-radius: 0.25rem;
          font-size: 0.9rem;
          word-break: break-word;
        }

        .action-recommend {
          text-align: center;
          padding: 1rem;
          background: rgba(67, 192, 246, 0.1);
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
          background: var(--button-gradient);
          color: #FFFFFF;
        }

        .cta-btn.secondary {
          background: #FFFFFF;
          color: var(--text-primary);
          border: 1px solid var(--border-soft);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .section-grid {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .section-grid h2 {
          color: var(--text-primary);
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
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--border-soft);
        }

        .step-card:hover, .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }

        .step-icon, .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--accent-blue);
        }

        .testimonials-section, .faq-section, .premium-section, .security-section, .integrations-section, .roadmap-section {
          padding: 4rem 2rem;
          background: var(--bg-card);
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
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--border-soft);
        }

        .testimonial-card cite {
          display: block;
          margin-top: 1rem;
          color: var(--accent-blue);
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
          border-bottom: 1px solid var(--border-soft);
        }

        .faq-question {
          padding: 1rem 0;
          background: none;
          border: none;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
        }

        .faq-question:hover {
          color: var(--accent-blue);
        }

        .faq-toggle {
          font-size: 1rem;
          color: var(--accent-blue);
        }

        .faq-answer {
          padding: 0 0 1rem 1rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          animation: fadeIn 0.3s;
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
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--border-soft);
        }

        .roadmap-list li:before {
          content: '→';
          color: var(--accent-blue);
          margin-right: 0.5rem;
        }

        .footer {
          padding: 3rem 2rem;
          background: var(--bg-primary);
          border-top: 1px solid var(--border-soft);
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
          color: var(--accent-blue);
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
          color: var(--accent-blue);
        }

        .disclaimer {
          color: var(--error);
          font-size: 0.85rem;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .header-content {
            height: 50px;
          }
          .nav-links {
            display: none;
          }
          .header-actions .menu-icon {
            display: block;
          }
          .nav-links.open {
            display: flex;
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
          .dashboard, .premium-section {
            padding: 0;
            margin: 1rem 0;
          }
          .wizard, .result-tabs, .history-section, .premium-section {
            padding: 1.5rem;
            margin: 0 0.5rem;
            border-radius: 0.75rem;
          }
          .tab-headers {
            flex-direction: column;
            gap: 0;
          }
          .tab-headers button {
            border-bottom: none;
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-soft);
          }
          .tab-headers button.active {
            border-bottom: 1px solid var(--accent-blue);
            background: rgba(67, 192, 246, 0.05);
          }
          .summary-item {
            flex-direction: column;
            gap: 0.25rem;
            align-items: flex-start;
          }
          .summary-item strong {
            align-self: flex-end;
          }
          .levels-list .level {
            font-size: 0.85rem;
          }
          .history-preview {
            gap: 0.25rem;
          }
          .history-pl {
            justify-content: flex-start;
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
          .result-card, .history-card {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}