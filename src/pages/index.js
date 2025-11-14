import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaUserCircle, FaBars, FaMoon, FaSun, FaChartLine, FaRobot, FaCog, FaHistory, FaBolt, FaFire, FaChartBar, FaTrophy, FaShareAlt, FaArrowUp, FaArrowDown, FaExchangeAlt, FaPercentage, FaClock, FaUsers, FaSearch, FaStar, FaInfoCircle, FaDownload, FaBell, FaLock, FaCheck, FaTimes, FaArrowRight, FaRedoAlt } from "react-icons/fa";
import { useAuth } from "/contexts/AuthContext";
import ProfileModal from "/components/ProfileModal";
import LoginPopup from "/components/LoginPopup";
import useSWR from 'swr';

// Fixed: Added quotes around the URL string
const BACKEND_URL = "https://python-backend-pr.vercel.app";

// SWR fetcher function
const fetcher = async (url) => {
  const res = await fetch(`${BACKEND_URL}${url}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// Enhanced Logo font style with redesign
const logoFont = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  background: "linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%)",
};

// Theme Toggle Component
const ThemeToggle = ({ theme, toggleTheme }) => (
  <button 
    className="theme-toggle" 
    onClick={toggleTheme}
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {theme === 'dark' ? <FaSun /> : <FaMoon />}
  </button>
);

// Animated Card Component
const AnimatedCard = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    className={`animated-card ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);



// Enhanced Pattern Highlight Box
const PatternHighlightBox = ({ patterns, loading }) => {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const refreshPatterns = () => {
    setLastUpdated(new Date());
  };
  
  const navigateToPatterns = () => {
    router.push('/patterns');
  };
  
  const topPatterns = patterns?.patterns?.slice(0, 2) || [];
  
  return (
    <motion.div 
      className="highlight-box pattern-box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="highlight-header">
        <div className="header-left">
          <div className="header-icon">🔥</div>
          <h3>Top Patterns Detected</h3>
        </div>
        <div className="header-right">
          <div className="updated-badge">
            <FaClock /> Last Updated: {lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          <button className="refresh-btn" onClick={refreshPatterns} aria-label="Refresh data">
            <FaRedoAlt />
          </button>
        </div>
      </div>
      
      <div className="highlight-content">
        {loading ? (
          <div className="loading-indicator">Loading latest patterns...</div>
        ) : topPatterns.length > 0 ? (
          <div className="pattern-items">
            {topPatterns.map((pattern, index) => (
              <div key={index} className="pattern-item">
                <div className="pattern-title">
                  {pattern.symbol || "ETHUSDT"}: {pattern.pattern || "Rectangle"} ({pattern.bias || "Bullish"})
                </div>
                <div className="pattern-details">
                  <div className="probability">Prob: <span className="premium-value">{pattern.probability || "82"}%</span></div>
                  <div className="target">TGT: <span className="premium-blur">$3,300</span></div>
                  <div className="stoploss">SL: <span className="premium-blur">$3,150</span></div>
                  <div className="timestamp">Updated: {pattern.timestamp || lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No significant patterns detected</div>
        )}
        
        <div className="premium-badge">
          <FaLock /> Premium: Unlock 10+ Daily
        </div>
        
        <button className="view-full-btn" onClick={navigateToPatterns}>
          View All Patterns <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

// Enhanced Bias Highlight Box
const BiasHighlightBox = ({ biases, loading }) => {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const refreshBiases = () => {
    setLastUpdated(new Date());
  };
  
  const navigateToBias = () => {
    router.push('/bias');
  };
  
  const topBiases = biases?.biases?.slice(0, 2) || [];
  
  return (
    <motion.div 
      className="highlight-box bias-box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="highlight-header">
        <div className="header-left">
          <div className="header-icon">📈</div>
          <h3>Strong Bias Moves</h3>
        </div>
        <div className="header-right">
          <div className="updated-badge">
            <FaClock /> Last Updated: {lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          <button className="refresh-btn" onClick={refreshBiases} aria-label="Refresh data">
            <FaRedoAlt />
          </button>
        </div>
      </div>
      
      <div className="highlight-content">
        {loading ? (
          <div className="loading-indicator">Loading latest bias data...</div>
        ) : topBiases.length > 0 ? (
          <div className="bias-items">
            {topBiases.map((bias, index) => (
              <div key={index} className="bias-item">
                <div className="bias-title">
                  {bias.symbol || "SOLUSDT"}: Strong {bias.bias || "Bullish"} ({bias.strength || "85"}%)
                </div>
                <div className="bias-details">
                  <div className="movement">24h Move: <span className={bias.move > 0 ? "positive" : "negative"}>{bias.move || "+2.3"}%</span></div>
                  <div className="expected">Expected: <span className="premium-blur">{bias.expected || "+3.5"}%</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No strong bias detected</div>
        )}
        
        <div className="premium-badge">
          <FaLock /> Premium: Unlock Full Analysis
        </div>
        
        <button className="view-full-btn" onClick={navigateToBias}>
          View All Bias Data <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

// History Panel Component
const HistoryPanel = () => {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("aivisorHistory");
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.slice(0, 3));
      }
    } catch (err) {
      console.error("Error loading history:", err);
    }
  }, []);
  
  if (history.length === 0) return null;
  
  return (
    <details className="history-panel">
      <summary className="history-header">
        <FaHistory /> Recent Updates
      </summary>
      <div className="history-content">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-time">
              {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
            <div className="history-description">
              {item.result?.trade_summary?.coin || "BTC"} - {item.result?.patterns?.[0] || "Pattern"} | Prob {item.result?.position_confidence || "78"}%
            </div>
          </div>
        ))}
      </div>
    </details>
  );
};

// Statistic Card Component
const StatCard = ({ title, value, icon, trend }) => (
  <AnimatedCard className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <h3>{value}</h3>
      <p>{title}</p>
      {trend && <span className={`trend ${trend > 0 ? 'positive' : 'negative'}`}>{trend > 0 ? '+' : ''}{trend}%</span>}
    </div>
  </AnimatedCard>
);

// Market Data Card Component
const MarketDataCard = ({ title, value, change, icon, isPositive, isDominance = false }) => (
  <div className="market-data-card">
    <div className="market-card-header">
      <div className="market-icon">{icon}</div>
      <h4>{title}</h4>
    </div>
    <div className="market-card-content">
      <div className={`market-value ${isDominance ? 'dominance-value' : ''}`}>{value}</div>
      {change && (
        <div className={`market-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <FaArrowUp /> : <FaArrowDown />} {change}
        </div>
      )}
    </div>
  </div>
);

// Fear & Greed Indicator Component
const FearGreedIndicator = ({ value, status }) => {
  const getStatusColor = () => {
    if (value >= 75) return 'extreme-greed';
    if (value >= 55) return 'greed';
    if (value >= 45) return 'neutral';
    if (value >= 25) return 'fear';
    return 'extreme-fear';
  };

  return (
    <div className="fear-greed-card">
      <div className="fear-greed-header">
        <FaFire className="fire-icon" />
        <h3>Fear & Greed Index</h3>
        <span className="live-badge">LIVE</span>
      </div>
      <div className="fear-greed-content">
        <div className="fear-greed-value">{value}</div>
        <div className={`fear-greed-status ${getStatusColor()}`}>{status}</div>
        <div className="fear-greed-bar">
          <div 
            className={`fear-greed-fill ${getStatusColor()}`} 
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <div className="fear-greed-scale">
          <span>0 Fear</span>
          <span>100 Greed</span>
        </div>
      </div>
    </div>
  );
};

// Top Volume Coins Component
const TopVolumeCoins = ({ coins }) => (
  <div className="top-volume-card">
    <div className="top-volume-header">
      <FaChartBar className="volume-icon" />
      <h3>Top Volume Coins (24h)</h3>
    </div>
    <div className="top-volume-list">
      {coins.map((coin, index) => (
        <div key={index} className="volume-item">
          <div className="coin-rank">#{index + 1}</div>
          <div className="coin-name">{coin.symbol}</div>
          <div className="coin-volume">${coin.volume}</div>
        </div>
      ))}
    </div>
  </div>
);

// Market Dominance Component
const MarketDominance = ({ futures, spot }) => (
  <div className="dominance-card">
    <div className="dominance-header">
      <FaPercentage className="percent-icon" />
      <h3>Market Dominance</h3>
    </div>
    <div className="dominance-content">
      <div className="dominance-section">
        <h4>Futures</h4>
        <div className="dominance-list">
          {futures.map((coin, index) => (
            <div key={index} className="dominance-item">
              <div className="coin-name">{coin.symbol}</div>
              <div className="coin-dominance">{coin.dominance}%</div>
            </div>
          ))}
        </div>
      </div>
      <div className="dominance-section">
        <h4>Spot</h4>
        <div className="dominance-list">
          {spot.map((coin, index) => (
            <div key={index} className="dominance-item">
              <div className="coin-name">{coin.symbol}</div>
              <div className="coin-dominance">{coin.dominance}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Price Trend Component
const PriceTrend = ({ coins }) => (
  <div className="price-trend-card">
    <div className="price-trend-header">
      <FaChartLine className="trend-icon" />
      <h3>7D Price Trend</h3>
    </div>
    <div className="price-trend-list">
      {coins.map((coin, index) => (
        <div key={index} className="trend-item">
          <div className="coin-name">{coin.symbol}</div>
          <div className={`trend-change ${coin.change > 0 ? 'positive' : 'negative'}`}>
            {coin.change > 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(coin.change)}%
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Hero Component with Live Ticker and Enhanced Background
const Hero = ({ scrollToDashboard, tickerData, theme, stats }) => (
  <div className="hero">
    <div className="ticker">
      {tickerData.map((item, index) => (
        <span key={index} className="ticker-item">
          {item.symbol}: ${item.price} <span className={`ticker-change ${item.change > 0 ? 'positive' : 'negative'}`}>{item.change > 0 ? '+' : ''}{item.change}%</span>
        </span>
      ))}
    </div>
    <div className="hero-content">
      <h1 className="hero-title">
        <span className="aivi">AI</span>
        <span className="visor">VISOR</span>
      </h1>
      <p className="hero-subtitle">Neural Analytics for Crypto Positions</p>
      <button className="quick-demo" onClick={scrollToDashboard}>
        Try Your First 2 Analyses Free (4h Timeframe)
      </button>
      <div className="hero-stats">
        <StatCard title="Active Users" value={stats.activeUsers} icon={<FaUsers />} />
        <StatCard title="Analyses Today" value={stats.analysesToday} icon={<FaChartLine />} />
        <StatCard title="Accuracy Rate" value={`${stats.accuracyRate}%`} icon={<FaRobot />} trend={2.4} />
      </div>
    </div>
    
    {/* Enhanced background elements */}
    <div className="bg-elements">
      <div className="grid-lines"></div>
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      <div className="floating-elements">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="floating-element"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              backgroundColor: theme === 'dark' ? 'rgba(75, 155, 255, 0.1)' : 'rgba(75, 155, 255, 0.05)'
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Progress Bar Component
const ProgressBar = ({ step, total }) => (
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${(step / total) * 100}%` }}></div>
    <span className="progress-text">Step {step} of {total}</span>
  </div>
);

// Coin Auto-Suggest Component
const CoinSuggest = ({ value, onChange }) => {
  const suggestions = [
    "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT", 
    "ADAUSDT", "DOTUSDT", "AVAXUSDT", "LINKUSDT", "MATICUSDT"
  ];
  
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
      <FaChartLine className="input-icon" />
    </div>
  );
};

// Timeframe Selector Component
const TimeframeSelector = ({ value, onChange }) => (
  <div className="timeframe-selector">
    <label>Timeframe</label>
    <div className="toggle-group">
      <button
        className={`toggle-option ${value === "15m" ? "active" : ""}`}
        onClick={() => onChange("15m")}
      >
        15m
      </button>
      <button
        className={`toggle-option ${value === "1h" ? "active" : ""}`}
        onClick={() => onChange("1h")}
      >
        1h
      </button>
      <button
        className={`toggle-option ${value === "4h" ? "active" : ""}`}
        onClick={() => onChange("4h")}
      >
        4h
      </button>
    </div>
  </div>
);

// Input Wizard Component
const InputWizard = ({
  coin,
  setCoin,
  market,
  setMarket,
  timeframe,
  setTimeframe,
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
    if (step === 2) return entryPrice && quantity;
    if (step === 3) return timeframe;
    return true;
  };

  return (
    <AnimatedCard className="wizard">
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
            <h3>Entry Details</h3>
            <div className="input-row">
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="Entry Price (USD)"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  className="input-field"
                  aria-label="Entry price"
                />
                <FaCog className="input-icon" />
              </div>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input-field"
                  aria-label="Quantity"
                />
                <FaChartLine className="input-icon" />
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h3>Analysis Settings</h3>
            <TimeframeSelector value={timeframe} onChange={setTimeframe} />
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
    </AnimatedCard>
  );
};

// Pattern Mini Chart Component
const PatternMiniChart = ({ patternCoords, currentPrice }) => {
  if (!patternCoords) return null;
  
  return (
    <div className="pattern-mini-chart">
      <h4>Pattern Visualization</h4>
      {Object.entries(patternCoords).map(([patternName, coords]) => (
        <div key={patternName} className="pattern-chart-item">
          <div className="pattern-header">
            <strong>{patternName}</strong>
            <span className="pattern-score">Score: {coords.score || 'N/A'}</span>
          </div>
          <div className="pattern-details">
            <span className="pattern-type">Type: {coords.type || 'N/A'}</span>
            {coords.peak_prices && (
              <div className="pattern-prices">
                Prices: {coords.peak_prices.map(p => `$${parseFloat(p).toFixed(2)}`).join(' → ')}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Detailed Result Card Component
const DetailedResultCard = ({ title, children, icon }) => (
  <div className="detailed-result-card">
    <div className="card-header">
      <div className="card-icon">{icon}</div>
      <h4>{title}</h4>
    </div>
    <div className="card-content">
      {children}
    </div>
  </div>
);

// Risk Gauge Component
const RiskGauge = ({ value, label }) => (
  <div className="risk-gauge">
    <div className="gauge-container">
      <svg viewBox="0 0 36 36" className="circular-chart">
        <path className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path className={`circle ${value > 70 ? 'high-risk' : value > 40 ? 'medium-risk' : 'low-risk'}`}
          strokeDasharray={`${value}, 100`}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="percentage">{value}%</text>
      </svg>
    </div>
    <span className="gauge-label">{label}</span>
  </div>
);

// Result Tabs Component
const ResultTabs = ({ result }) => {
  const [activeTab, setActiveTab] = useState("summary");

  // Calculate risk score based on position confidence
  const riskScore = result?.position_confidence ? 
    parseInt(result.position_confidence.toString().replace('%', '')) : 45;

  return (
    <AnimatedCard className="result-tabs">
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
          className={activeTab === "patterns" ? "active" : ""}
          onClick={() => setActiveTab("patterns")}
          role="tab"
          aria-selected={activeTab === "patterns"}
        >
          Detected Patterns
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
          <div className="tab-panel summary-tab">
            <div className="summary-grid">
              <DetailedResultCard title="Trade Overview" icon={<FaChartLine />}>
                <div className="summary-item">
                  <span>Asset:</span>{" "}
                  <strong>{result?.trade_summary?.coin || "N/A"} ({result?.trade_summary?.market?.toUpperCase() || "N/A"})</strong>
                </div>
                <div className="summary-item">
                  <span>Position:</span>{" "}
                  <strong
                    className={result?.trade_summary?.position_type === "long" ? "positive" : "negative"}
                  >
                    {result?.trade_summary?.position_type?.toUpperCase() || "N/A"}
                  </strong>
                </div>
                <div className="summary-item">
                  <span>Entry Price:</span>{" "}
                  <strong className="highlight">
                    ${result?.trade_summary?.entry_price?.toFixed(2) || "N/A"}
                  </strong>
                </div>
                <div className="summary-item">
                  <span>Live Price:</span>{" "}
                  <strong className="highlight">
                    ${result?.trade_summary?.current_price?.toFixed(2) || "N/A"}
                  </strong>
                </div>
                <div className="summary-item">
                  <span>P/L:</span>{" "}
                  <strong className={parseFloat(result?.trade_summary?.profit_loss?.split(' ')[0] || 0) >= 0 ? "positive" : "negative"}>
                    {result?.trade_summary?.profit_loss || "N/A"}
                  </strong>
                </div>
                {result?.warning && (
                  <div className="summary-item">
                    <span>Warning:</span> <em className="warning-text">{result.warning}</em>
                  </div>
                )}
              </DetailedResultCard>
              
              <DetailedResultCard title="Risk Assessment" icon={<FaCog />}>
                <div className="risk-assessment">
                  <RiskGauge value={riskScore} label="Position Confidence" />
                  <RiskGauge value={result?.market_confidence?.bullish || 50} label="Bullish Confidence" />
                  <RiskGauge value={result?.market_confidence?.bearish || 50} label="Bearish Confidence" />
                </div>
              </DetailedResultCard>
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
                  {result?.targets_and_stoplosses?.tgt1 && (
                    <div className="level positive">
                      TGT1: ${parseFloat(result.targets_and_stoplosses.tgt1).toFixed(2)}
                    </div>
                  )}
                  {result?.targets_and_stoplosses?.tgt2 && (
                    <div className="level positive">
                      TGT2: ${parseFloat(result.targets_and_stoplosses.tgt2).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
              <div className="levels-section">
                <h5>Stop Loss Levels</h5>
                <div className="levels-list">
                  {result?.targets_and_stoplosses?.user_sl && (
                    <div className="level negative">
                      User SL: ${parseFloat(result.targets_and_stoplosses.user_sl).toFixed(2)}
                    </div>
                  )}
                  {result?.targets_and_stoplosses?.market_sl && (
                    <div className="level negative">
                      Market SL: ${parseFloat(result.targets_and_stoplosses.market_sl).toFixed(2)}
                    </div>
                  )}
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
                <span>Sentiment:</span>{" "}
                <strong className={result?.sentiment?.toLowerCase().includes('bullish') ? "positive" : result?.sentiment?.toLowerCase().includes('bearish') ? "negative" : ""}>
                  {result?.sentiment?.toUpperCase() || "N/A"}
                </strong>
              </div>
              <div className="confidence-meter">
                <div className="meter-bar">
                  <div
                    className="meter-fill long"
                    style={{ width: `${result?.market_confidence?.bullish || 0}%` }}
                  >
                    Bullish: {result?.market_confidence?.bullish || 0}%
                  </div>
                  <div
                    className="meter-fill short"
                    style={{ width: `${result?.market_confidence?.bearish || 0}%` }}
                  >
                    Bearish: {result?.market_confidence?.bearish || 0}%
                  </div>
                </div>
              </div>
              {result?.enhanced_sentiment && (
                <div className="sentiment-details">
                  <div className="summary-item">
                    <span>Market Bias:</span> <strong>{result.enhanced_sentiment['Market Bias'] || 'N/A'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Strength:</span> <strong>{result.enhanced_sentiment['Strength'] || 'N/A'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Trend:</span> <strong>{result.enhanced_sentiment['Short-Term Trend'] || 'N/A'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Volume:</span> <strong>{result.enhanced_sentiment['Volume Status'] || 'N/A'}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "patterns" && (
          <div className="tab-panel">
            <div className="result-card">
              <h4>Detected Patterns</h4>
              {result?.patterns && Array.isArray(result.patterns) && result.patterns.length > 0 ? (
                <div className="patterns-list">
                  {result.patterns.map((pattern, index) => (
                    <div key={index} className="pattern-tag">
                      {typeof pattern === 'string' ? pattern : pattern.pattern || pattern.name || 'Unknown Pattern'}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No patterns detected</p>
              )}
              
              {result?.pattern_coords && (
                <PatternMiniChart 
                  patternCoords={result.pattern_coords}
                  currentPrice={result.trade_summary?.current_price}
                />
              )}
            </div>
          </div>
        )}
        {activeTab === "action" && (
          <div className="tab-panel">
            <div className="result-card">
              <h4>Recommended Action</h4>
              <div className="action-recommend">
                <strong className={result?.sentiment?.toLowerCase().includes('bullish') ? "positive" : result?.sentiment?.toLowerCase().includes('bearish') ? "negative" : ""}>
                  {result?.sentiment?.toUpperCase() || "HOLD"}
                </strong>
              </div>
              <div className="action-details">
                <p>{result?.warning || "No specific action recommended"}</p>
                {result?.enhanced_sentiment?.Note && (
                  <p><em>{result.enhanced_sentiment.Note}</em></p>
                )}
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
    </AnimatedCard>
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

// Premium Section Component (Enhanced)
const PremiumSection = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  
  const plans = {
    monthly: {
      price: '$29',
      period: '/month',
      features: [
        'Unlimited daily analyses',
        'Priority support',
        'Early feature access',
        'Custom analytics tools',
        'Portfolio integration',
        'Historical backtesting'
      ]
    },
    yearly: {
      price: '$290',
      period: '/year',
      features: [
        'Everything in Monthly',
        '2 months free',
        'Exclusive market reports',
        'Personalized AI advisor',
        'Advanced charting tools',
        'API access'
      ],
      savings: 'Save $58/year'
    }
  };

  return (
    <section className="premium-section">
      <div className="pricing-header">
        <h2>Choose Your Plan</h2>
        <p>Unlock advanced analytics and insights</p>
      </div>
      
      <div className="plan-toggle">
        <button 
          className={selectedPlan === 'monthly' ? 'active' : ''}
          onClick={() => setSelectedPlan('monthly')}
        >
          Monthly
        </button>
        <button 
          className={selectedPlan === 'yearly' ? 'active' : ''}
          onClick={() => setSelectedPlan('yearly')}
        >
          Yearly
          <span className="popular-badge">Popular</span>
        </button>
      </div>
      
      <div className="pricing-card">
        <div className="pricing-card-header">
          <h3 className="pricing-title">Pro Plan</h3>
          <div className="pricing-amount">
            <span className="price">{plans[selectedPlan].price}</span>
            <span className="period">{plans[selectedPlan].period}</span>
          </div>
          {selectedPlan === 'yearly' && (
            <div className="savings-badge">{plans[selectedPlan].savings}</div>
          )}
        </div>
        
        <ul className="pricing-features">
          {plans[selectedPlan].features.map((feature, index) => (
            <li key={index}>
              <span className="feature-icon">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <Link href="/subscribe">
          <button className="pricing-button">Get Started</button>
        </Link>
        
        <div className="pricing-footer">
          <p>7-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

// Feature Highlight Component
const FeatureHighlight = ({ icon, title, description }) => (
  <AnimatedCard className="feature-highlight">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </AnimatedCard>
);

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      text: "AIVISOR's risk zones are uncannily accurate. Saved me from a major loss last week.",
      author: "Michael Rodriguez",
      role: "BTC Futures Trader"
    },
    {
      text: "The confidence meter gives me the edge I need. My win rate improved by 23% since using it.",
      author: "Sarah Johnson",
      role: "SOL Spot Trader"
    },
    {
      text: "Clean, actionable insights. My go-to tool for perpetual contracts.",
      author: "David Chen",
      role: "ETH Options Trader"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <h2>Trader Testimonials</h2>
      <div className="carousel">
        {testimonials.map((testimonial, index) => (
          <AnimatedCard key={index} className="testimonial-card" delay={index * 0.1}>
            <p>"{testimonial.text}"</p>
            <cite>- {testimonial.author}, {testimonial.role}</cite>
          </AnimatedCard>
        ))}
      </div>
      <p className="stat">Trusted by 3,000+ traders globally.</p>
    </section>
  );
};

// Live Market Analysis Section with Pattern and Bias Boxes
const LiveMarketAnalysis = ({ marketData }) => {
  // Use SWR for data fetching with auto-refresh
   const { data: patternData, error: patternError, isLoading: patternLoading } = 
    useSWR('/premium/patterns', fetcher, { refreshInterval: 180000 });

   const { data: biasData, error: biasError, isLoading: biasLoading } = 
     useSWR('/premium/bias', fetcher, { refreshInterval: 180000 });

  return (
    <section className="market-analysis-section" id="market-analysis">
      <div className="section-header">
        <h2>Live Market Analysis</h2>
        <div className="refresh-indicator">
          <FaBolt className="bolt-icon" />
          <span>Updated just now</span>
        </div>
      </div>
      
      <div className="analysis-container">
        <div className="analysis-highlights">
          <PatternHighlightBox patterns={patternData} loading={patternLoading} />
          <BiasHighlightBox biases={biasData} loading={biasLoading} />
          <HistoryPanel />
        </div>
        
        <div className="market-grid">
          <FearGreedIndicator 
            value={marketData.fearGreed.value} 
            status={marketData.fearGreed.status} 
          />
          
          <TopVolumeCoins coins={marketData.topVolume} />
          
          <MarketDominance 
            futures={marketData.dominance.futures} 
            spot={marketData.dominance.spot} 
          />
          
          <PriceTrend coins={marketData.priceTrend} />
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [market, setMarket] = useState("Futures");
  const [positionType, setPositionType] = useState("Long");
  const [timeframe, setTimeframe] = useState("4h");
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
  const [theme, setTheme] = useState('light');
  const [tickerData, setTickerData] = useState([
    { symbol: 'BTC', price: '64,720.09', change: 2.3 },
    { symbol: 'ETH', price: '3,420.00', change: -1.2 },
    { symbol: 'SOL', price: '142.00', change: 5.7 }
  ]);
  const [stats, setStats] = useState({
    activeUsers: "2,847",
    analysesToday: "11,892",
    accuracyRate: "82"
  });
  const [marketData, setMarketData] = useState({
    fearGreed: { value: 65, status: 'GREED' },
    topVolume: [
      { symbol: 'BTCUSDT', volume: '1.2B' },
      { symbol: 'ETHUSDT', volume: '850M' },
      { symbol: 'SOLUSDT', volume: '420M' },
      { symbol: 'BNBUSDT', volume: '380M' },
      { symbol: 'XRPUSDT', volume: '310M' }
    ],
    dominance: {
      futures: [
        { symbol: 'BTC', dominance: '52.3' },
        { symbol: 'ETH', dominance: '18.7' },
        { symbol: 'SOL', dominance: '7.2' },
        { symbol: 'BNB', dominance: '4.8' },
        { symbol: 'ADA', dominance: '3.1' }
      ],
      spot: [
        { symbol: 'BTC', dominance: '48.7' },
        { symbol: 'ETH', dominance: '19.2' },
        { symbol: 'USDT', dominance: '8.3' },
        { symbol: 'SOL', dominance: '6.1' },
        { symbol: 'BNB', dominance: '3.8' }
      ]
    },
    priceTrend: [
      { symbol: 'BTCUSDT', change: 5.2 },
      { symbol: 'ETHUSDT', change: 3.8 },
      { symbol: 'SOLUSDT', change: 12.5 },
      { symbol: 'BNBUSDT', change: -2.1 },
      { symbol: 'AVAXUSDT', change: 8.7 }
    ]
  });

  const dashboardRef = useRef(null);

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
      
      const count = parseInt(localStorage.getItem("aivisorAnalysisCount") || "0");
      setAnalysisCount(count);
      
      // Simulate stats updates
      const statsInterval = setInterval(() => {
        setStats(prev => ({
          activeUsers: `${Math.floor(Math.random() * 1000) + 2500}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          analysesToday: `${parseInt(prev.analysesToday.toString().replace(/,/g, "")) + Math.floor(Math.random() * 100) + 50}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          accuracyRate: `${Math.min(85, Math.max(70, parseInt(prev.accuracyRate.toString()) + (Math.random() > 0.5 ? 1 : -1)))}`
        }));
      }, 60000); // Update every minute
      
      return () => {
        clearInterval(statsInterval);
      };
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Fetch real market data from Bybit API
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch ticker data
        const tickerRes = await fetch('https://api.bybit.com/v5/market/tickers?category=spot');
        const tickerData = await tickerRes.json();
        
        // Process ticker data for top coins
        const topCoins = tickerData.result.list
          .filter(coin => ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'].includes(coin.symbol))
          .map(coin => ({
            symbol: coin.symbol.replace('USDT', ''),
            price: parseFloat(coin.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            change: parseFloat(coin.price24hPcnt) * 100
          }));
        
        setTickerData(topCoins);
        
        // Fetch Fear & Greed Index (using alternative API)
        const fearGreedRes = await fetch('https://api.alternative.me/fng/?limit=1');
        const fearGreedData = await fearGreedRes.json();
        const fearGreedValue = parseInt(fearGreedData.data[0].value);
        const fearGreedStatus = fearGreedData.data[0].value_classification;
        
        // Fetch top volume coins
        const volumeRes = await fetch('https://api.bybit.com/v5/market/tickers?category=spot');
        const volumeData = await volumeRes.json();
        const topVolume = volumeData.result.list
          .filter(coin => coin.symbol.endsWith('USDT'))
          .sort((a, b) => parseFloat(b.turnover24h) - parseFloat(a.turnover24h))
          .slice(0, 5)
          .map(coin => ({
            symbol: coin.symbol,
            volume: `$${(parseFloat(coin.turnover24h) / 1000000).toFixed(0)}M`
          }));
        
        // Update state with real data
        setMarketData(prev => ({
          ...prev,
          fearGreed: { value: fearGreedValue, status: fearGreedStatus },
          topVolume
        }));
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    // Fetch data immediately and then every 30 seconds
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveHistory = (input, resultData) => {
    if (typeof window === "undefined") return;
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
    if (typeof window === "undefined") return;

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
      timeframe,
      positionType,
      entryPrice: parsedEntryPrice,
      quantity: parsedQuantity,
    };
    const data = {
      asset_class: "crypto",
      coin: coin.toUpperCase(),
      market: market.toLowerCase(),
      timeframe: timeframe.toLowerCase(),
      position_type: positionType.toLowerCase(),
      entry_price: parsedEntryPrice,
      quantity: parsedQuantity,
      has_both_positions: false,
      risk_pct: 0.02,
    };
    setLoading(true);
    try {
      const response = await fetch(
      `${BACKEND_URL}/analyze`,  // Now uses the fixed string
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    // ... (rest unchanged)
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  if (authLoading) {
    return <div className="loading-page">Loading...</div>;
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <span style={logoFont}>AIVISOR</span>
          </div>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link href="#features" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link href="#howitworks" onClick={() => setMenuOpen(false)}>How It Works</Link>
            <Link href="#market-analysis" onClick={() => setMenuOpen(false)}>Market Analysis</Link>
            <Link href="#faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
            <Link href="/patterns">Patterns</Link>
            <Link href="/bias">Bias Data</Link>
            <Link href="/support" onClick={() => setMenuOpen(false)}>Support</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </nav>
          <div className="header-actions">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
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

      <Hero scrollToDashboard={scrollToDashboard} tickerData={tickerData} theme={theme} stats={stats} />

      <section id="mission" className="mission-section">
        <AnimatedCard className="mission-card">
          <h2>Execute Neural Analysis</h2>
          <p>
            AIVISOR harnesses xAI-grade models to process live market data, technical indicators, and
            sentiment for precise position insights. <strong>Public Beta: Live</strong>
          </p>
          <div className="mission-stats">
            <div className="stat-item">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">&lt;100ms</span>
              <span className="stat-label">Response Time</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Monitoring</span>
            </div>
          </div>
        </AnimatedCard>
      </section>

      <main className="dashboard" ref={dashboardRef}>
        <InputWizard
          coin={coin}
          setCoin={setCoin}
          market={market}
          setMarket={setMarket}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
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

      <LiveMarketAnalysis marketData={marketData} />

      <section id="howitworks" className="section-grid">
        <h2>How It Works</h2>
        <div className="grid-4">
          <AnimatedCard className="step-card" delay={0.1}>
            <div className="step-icon">1</div>
            <h3>Connect</h3>
            <p>Input your trade parameters.</p>
          </AnimatedCard>
          <AnimatedCard className="step-card" delay={0.2}>
            <div className="step-icon">2</div>
            <h3>Analyze</h3>
            <p>AI processes real-time signals.</p>
          </AnimatedCard>
          <AnimatedCard className="step-card" delay={0.3}>
            <div className="step-icon">3</div>
            <h3>Act</h3>
            <p>Get precise targets & stops.</p>
          </AnimatedCard>
          <AnimatedCard className="step-card" delay={0.4}>
            <div className="step-icon">4</div>
            <h3>Optimize</h3>
            <p>Refine with AI insights.</p>
          </AnimatedCard>
        </div>
      </section>

      <section id="features" className="section-grid">
        <h2>Core Features</h2>
        <div className="grid-4">
          <FeatureHighlight 
            icon="⚡" 
            title="Live Data" 
            description="Real-time market feeds with millisecond updates." 
          />
          <FeatureHighlight 
            icon="🧠" 
            title="AI Models" 
            description="Deep learning on crypto data with continuous training." 
          />
          <FeatureHighlight 
            icon="🛡️" 
            title="Risk Zones" 
            description="Dynamic SL/TP levels based on volatility clusters." 
          />
          <FeatureHighlight 
            icon="📊" 
            title="Multi-Timeframe" 
            description="Analysis across 15m, 1h, and 4h timeframes." 
          />
        </div>
      </section>

      <Testimonials />

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
        <FAQItem
          question="Can I export reports?"
          answer="Yes, premium users can export PDF reports with custom branding."
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
          <li>Q2 2026: Mobile App Release</li>
          <li>Q3 2026: AI-Powered Alerts</li>
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
          position: relative;
          transition: background-color 0.3s, color 0.3s;
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
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-light);
          padding: 0.5rem 0;
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
          padding: 0 1rem;
          height: 50px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-links a {
          color: var(--text-secondary);
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
          border-bottom: 1px solid var(--border-light);
          box-shadow: var(--shadow-md);
        }

        [data-theme="dark"] .nav-links.open {
          background: rgba(15, 23, 42, 0.95);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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

        .user-greeting {
          color: var(--accent-blue);
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .profile-icon, .menu-icon {
          font-size: 1.5rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.3s;
        }

        .profile-icon:hover, .menu-icon:hover {
          color: var(--accent-blue);
        }

        .login-btn, .support-btn, .pay-btn, .quick-demo, .pricing-button {
          background: var(--button-gradient);
          color: #FFFFFF;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-btn:hover, .support-btn:hover, .pay-btn:hover, .quick-demo:hover, .pricing-button:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }

        .hero {
          padding: 6rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }

        [data-theme="dark"] .hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        }
        
        /* Enhanced background elements */
        .bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .grid-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to right, rgba(67, 192, 246, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(67, 192, 246, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.3;
        }
        
        [data-theme="dark"] .grid-lines {
          background-image: linear-gradient(to right, rgba(67, 192, 246, 0.07) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(67, 192, 246, 0.07) 1px, transparent 1px);
        }
        
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(67, 192, 246, 0.2);
          animation: float-particle 15s infinite linear;
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.4; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.2; }
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
          border: 1px solid var(--border-light);
          display: flex;
          gap: 1rem;
          animation: ticker-scroll 30s linear infinite;
        }

        .ticker-item {
          white-space: nowrap;
        }

        .ticker-change.positive {
          color: var(--success);
        }

        .ticker-change.negative {
          color: var(--error);
        }

        @keyframes ticker-scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 5rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          background: var(--button-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          animation: gradient-shift 3s ease-in-out infinite alternate;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .aivi { color: var(--accent-blue); }
        .visor { color: var(--accent-purple); }

        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 15s infinite ease-in-out;
        }

        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-100px) translateX(50px) rotate(180deg); opacity: 0.15; }
          100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 0.1; }
        }

        .stat-card {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          font-size: 2rem;
          color: var(--accent-blue);
        }

        .stat-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .stat-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .trend {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .trend.positive {
          color: var(--success);
        }

        .trend.negative {
          color: var(--error);
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
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
        }

        .mission-card h2 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .mission-card p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .mission-stats {
          display: flex;
          justify-content: space-around;
          gap: 1rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-blue);
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .dashboard {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        .animated-card {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-md);
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid var(--border-light);
        }

        .wizard, .result-tabs, .premium-section, .history-section {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-md);
          max-width: 900px;
          margin: 2rem auto;
          overflow: hidden;
          border: 1px solid var(--border-light);
        }
        
        /* New highlight box styles */
        .analysis-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .analysis-highlights {
          max-width: 800px;
          margin: 0 auto 3rem;
        }
        
        .highlight-box {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
          margin-bottom: 1.5rem;
          overflow: hidden;
        }
        
        .highlight-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .header-icon {
          font-size: 1.25rem;
          color: var(--accent-blue);
        }
        
        .highlight-header h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .updated-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-md);
        }
        
        .refresh-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--accent-blue);
          font-size: 1rem;
          transition: transform 0.2s;
        }
        
        .refresh-btn:hover {
          transform: rotate(180deg);
        }
        
        .highlight-content {
          position: relative;
        }
        
        .pattern-items, .bias-items {
          margin-bottom: 2rem;
        }
        
        .pattern-item, .bias-item {
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1rem;
        }
        
        [data-theme="dark"] .pattern-item, 
        [data-theme="dark"] .bias-item {
          background: rgba(67, 192, 246, 0.05);
        }
        
        .pattern-title, .bias-title {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        
        .pattern-details, .bias-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .probability, .target, .stoploss, .timestamp, .movement, .expected {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        
        .premium-value {
          color: var(--accent-blue);
          font-weight: 600;
        }
        
        .premium-blur {
          filter: blur(3px);
          color: var(--text-muted);
          user-select: none;
        }
        
        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(67, 192, 246, 0.1), rgba(122, 92, 255, 0.1));
          color: var(--accent-purple);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .view-full-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: var(--button-gradient);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .view-full-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .loading-indicator {
          text-align: center;
          color: var(--text-secondary);
          padding: 1rem;
        }
        
        .empty-state {
          text-align: center;
          color: var(--text-secondary);
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          font-style: italic;
        }
        
        .pattern-box {
          border-top: 4px solid #FFA500;
        }
        
        .bias-box {
          border-top: 4px solid var(--accent-blue);
        }
        
        /* History panel styles */
        .history-panel {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          margin-top: 1rem;
          overflow: hidden;
        }
        
        .history-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          cursor: pointer;
          font-weight: 600;
          color: var(--text-primary);
          background: var(--bg-secondary);
          transition: background-color 0.3s;
        }
        
        [data-theme="dark"] .history-header {
          background: rgba(67, 192, 246, 0.05);
        }
        
        .history-header:hover {
          background: rgba(67, 192, 246, 0.1);
        }
        
        .history-content {
          padding: 1rem 1.5rem;
        }
        
        .history-item {
          display: flex;
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-light);
        }
        
        .history-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .history-time {
          min-width: 80px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .history-description {
          flex: 1;
          font-size: 0.9rem;
        }

        .premium-section {
          max-width: 1200px;
          padding: 3rem 2rem;
          background: var(--bg-secondary);
          border: none;
        }

        [data-theme="dark"] .premium-section {
          background: var(--bg-primary);
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .pricing-header h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .pricing-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .plan-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          background: var(--bg-card);
          border-radius: var(--radius-md);
          padding: 0.25rem;
          max-width: 300px;
          margin: 0 auto 2rem;
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .plan-toggle {
          background: var(--bg-secondary);
        }

        .plan-toggle button {
          flex: 1;
          padding: 0.75rem;
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          border-radius: var(--radius-sm);
          transition: all 0.3s;
        }

        .plan-toggle button.active {
          background: var(--button-gradient);
          color: white;
        }

        .popular-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--warning);
          color: white;
          font-size: 0.6rem;
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
        }

        .pricing-card {
          max-width: 400px;
          margin: 0 auto;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-light);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        [data-theme="dark"] .pricing-card {
          background: var(--bg-secondary);
        }

        .pricing-card-header {
          margin-bottom: 2rem;
        }

        .pricing-title {
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .pricing-amount {
          margin-bottom: 1rem;
        }

        .price {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-blue);
        }

        .period {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .savings-badge {
          background: rgba(62, 213, 152, 0.1);
          color: var(--success);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
          margin-top: 0.5rem;
        }

        .pricing-features {
          list-style: none;
          text-align: left;
          margin-bottom: 2rem;
          padding: 0;
        }

        .pricing-features li {
          color: var(--text-primary);
          font-size: 0.95rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          padding-left: 1.5rem;
          position: relative;
        }

        .feature-icon {
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        .pricing-footer {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
          color: var(--text-secondary);
          font-size: 0.9rem;
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
          background: var(--bg-card);
          padding: 1rem;
          border-radius: var(--radius-md);
          border-left: 4px solid var(--accent-blue);
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.3s;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
        }

        .history-card:hover {
          background: var(--bg-secondary);
          transform: translateX(5px);
          box-shadow: var(--shadow-md);
        }

        .history-preview {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .history-date {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .history-pl {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
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
          background: var(--button-gradient);
          height: 100%;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: -1.5rem;
          right: 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
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
          margin-bottom: 1.5rem;
        }

        .input-wrapper {
          position: relative;
          margin-bottom: 1rem;
        }

        .input-field {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s;
        }

        [data-theme="dark"] .input-field {
          background: var(--bg-secondary);
        }

        .input-field:focus {
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(67, 192, 246, 0.1);
          outline: none;
        }

        .input-field.suggest {
          padding-right: 2rem;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .timeframe-selector {
          margin-bottom: 1.5rem;
        }

        .timeframe-selector label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .toggle-group {
          display: flex;
          background: var(--bg-card);
          border-radius: 2rem;
          overflow: hidden;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .toggle-group {
          background: var(--bg-secondary);
        }

        .toggle-option {
          flex: 1;
          padding: 0.75rem;
          text-align: center;
          color: var(--text-secondary);
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
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-btn.secondary {
          background: var(--bg-card);
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .nav-btn.secondary {
          background: var(--bg-secondary);
        }

        .nav-btn:not(.secondary) {
          background: var(--button-gradient);
          color: #FFFFFF;
        }

        .nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
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
          border-radius: var(--radius-md);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .analyze-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .analyze-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .error-card, .loading-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          text-align: center;
          margin: 1rem 0;
          font-size: 1.1rem;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-md);
        }

        .error-card {
          color: var(--error);
          border-left: 4px solid var(--error);
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
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tab-headers button {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
          position: relative;
        }

        .tab-headers button.active {
          color: var(--accent-blue);
        }

        .tab-headers button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-blue);
        }

        .tab-content {
          animation: fadeIn 0.3s;
          overflow-x: hidden;
        }

        .summary-tab {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .detailed-result-card {
          background: var(--bg-card);
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }

        [data-theme="dark"] .detailed-result-card {
          background: var(--bg-secondary);
        }

        .card-header {
          padding: 1rem 1.5rem;
          background: rgba(67, 192, 246, 0.05);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .card-icon {
          font-size: 1.25rem;
          color: var(--accent-blue);
        }

        .card-content {
          padding: 1.5rem;
        }

        .result-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border-left: 4px solid var(--accent-blue);
          overflow: hidden;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }

        [data-theme="dark"] .result-card {
          background: var(--bg-secondary);
        }

        .result-card h4 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px dashed var(--border-light);
        }

        .summary-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .summary-item span {
          color: var(--text-secondary);
        }

        .highlight {
          color: var(--accent-blue);
          font-family: monospace;
          word-break: break-all;
        }

        .warning-text {
          color: var(--warning);
        }

        .positive { color: var(--success); }
        .negative { color: var(--error); }

        .levels-section {
          margin: 1.5rem 0;
        }

        .levels-section h5 {
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .levels-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .level {
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          word-break: break-all;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .level.positive {
          border-left: 3px solid var(--success);
          background: rgba(62, 213, 152, 0.05);
        }

        .level.negative {
          border-left: 3px solid var(--error);
          background: rgba(239, 68, 68, 0.05);
        }

        .confidence-meter {
          margin: 1.5rem 0;
        }

        .meter-bar {
          display: flex;
          height: 0.75rem;
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
          color: #FFFFFF;
          transition: width 0.5s ease;
        }

        .meter-fill.long { background: var(--success); }
        .meter-fill.short { background: var(--error); }

        .patterns-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .pattern-tag {
          background: var(--bg-secondary);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
        }

        [data-theme="dark"] .pattern-tag {
          background: var(--bg-card);
        }

        .pattern-mini-chart {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .pattern-mini-chart h4 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .pattern-chart-item {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.75rem;
        }

        [data-theme="dark"] .pattern-chart-item {
          background: var(--bg-card);
        }

        .pattern-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .pattern-score {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .pattern-details {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

       
          

        .pattern-type, .pattern-prices, .pattern-bars {
          margin: 0.25rem 0;
        }

        .action-recommend {
          text-align: center;
          padding: 1.5rem;
          background: rgba(67, 192, 246, 0.1);
          border-radius: var(--radius-md);
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .action-details {
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        [data-theme="dark"] .action-details {
          background: var(--bg-card);
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
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-btn.primary {
          background: var(--button-gradient);
          color: #FFFFFF;
        }

        .cta-btn.secondary {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .cta-btn.secondary {
          background: var(--bg-secondary);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .risk-assessment {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .risk-gauge {
          text-align: center;
          flex: 1;
          min-width: 100px;
        }

        .gauge-container {
          width: 100px;
          height: 100px;
          margin: 0 auto 0.5rem;
        }

        .circular-chart {
          display: block;
          margin: 10px auto;
          max-width: 80%;
          max-height: 250px;
        }

        .circle-bg {
          fill: none;
          stroke: var(--border-light);
          stroke-width: 3.8;
        }

        .circle {
          fill: none;
          stroke-width: 2.8;
          stroke-linecap: round;
          animation: progress 1s ease-out forwards;
        }

        @keyframes progress {
          0% { stroke-dasharray: 0 100; }
        }

        .low-risk { stroke: var(--success); }
        .medium-risk { stroke: var(--warning); }
        .high-risk { stroke: var(--error); }

        .percentage {
          fill: var(--text-primary);
          font-size: 0.5em;
          text-anchor: middle;
        }

        .gauge-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .sentiment-details {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
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

        .step-card, .feature-card, .feature-highlight {
          padding: 2rem;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          transition: transform 0.3s;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
          position: relative;
          overflow: hidden;
        }

        [data-theme="dark"] .step-card, 
        [data-theme="dark"] .feature-card, 
        [data-theme="dark"] .feature-highlight {
          background: var(--bg-secondary);
        }

        .step-card:hover, .feature-card:hover, .feature-highlight:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .step-card::before, .feature-card::before, .feature-highlight::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--button-gradient);
        }

        .step-icon, .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--accent-blue);
        }

        .market-analysis-section {
          padding: 4rem 2rem;
          background: var(--bg-secondary);
        }

        [data-theme="dark"] .market-analysis-section {
          background: var(--bg-primary);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          max-width: 1200px;
          margin: 0 auto 2rem;
          padding: 0 1rem;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 600;
        }

        .refresh-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .bolt-icon {
          color: var(--accent-blue);
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .market-data-card, .fear-greed-card, .top-volume-card, .dominance-card, .price-trend-card {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .market-data-card, 
        [data-theme="dark"] .fear-greed-card, 
        [data-theme="dark"] .top-volume-card, 
        [data-theme="dark"] .dominance-card,
        [data-theme="dark"] .price-trend-card {
          background: var(--bg-secondary);
        }

        .market-card-header, .fear-greed-header, .top-volume-header, .dominance-header, .price-trend-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .market-icon, .fire-icon, .volume-icon, .percent-icon, .trend-icon {
          font-size: 1.25rem;
          color: var(--accent-blue);
        }

        .market-card-header h4, .fear-greed-header h3, .top-volume-header h3, .dominance-header h3, .price-trend-header h3 {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .live-badge {
          background: var(--accent-blue);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-weight: 600;
        }

        .market-card-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .market-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .market-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
        }

        .market-change.positive {
          color: var(--success);
        }

        .market-change.negative {
          color: var(--error);
        }

        .fear-greed-content {
          text-align: center;
        }

        .fear-greed-value {
          font-size: 3rem;
          font-weight: 700;
          margin: 0.5rem 0;
        }

        .fear-greed-status {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .extreme-greed { color: var(--success); }
        .greed { color: #93C5FD; }
        .neutral { color: var(--warning); }
        .fear { color: #F87171; }
        .extreme-fear { color: var(--error); }

        .fear-greed-bar {
          height: 1rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .fear-greed-fill {
          height: 100%;
          transition: width 0.5s ease;
        }

        .fear-greed-scale {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .top-volume-list, .dominance-list, .price-trend-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .volume-item, .dominance-item, .trend-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
        }

        [data-theme="dark"] .volume-item, 
        [data-theme="dark"] .dominance-item,
        [data-theme="dark"] .trend-item {
          background: var(--bg-card);
        }

        .coin-rank {
          font-weight: 600;
          color: var(--accent-blue);
          width: 30px;
        }

        .coin-name {
          font-weight: 600;
        }

        .coin-volume, .coin-dominance {
          font-weight: 600;
        }

        .dominance-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .dominance-section h4 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .testimonials-section, .faq-section, .security-section, .integrations-section, .roadmap-section {
          padding: 4rem 2rem;
          background: var(--bg-secondary);
        }

        [data-theme="dark"] .testimonials-section, 
        [data-theme="dark"] .faq-section, 
        [data-theme="dark"] .security-section, 
        [data-theme="dark"] .integrations-section, 
        [data-theme="dark"] .roadmap-section {
          background: var(--bg-primary);
        }

        .carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 1rem 0;
          scroll-snap-type: x mandatory;
        }

        .testimonial-card {
          min-width: 300px;
          padding: 1.5rem;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          flex-shrink: 0;
          scroll-snap-align: center;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .testimonial-card {
          background: var(--bg-secondary);
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
          color: var(--text-secondary);
          font-size: 1rem;
          text-align: center;
        }

        .faq-item {
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
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
          color: var(--text-secondary);
          font-size: 0.9rem;
          animation: fadeIn 0.3s;
        }

        .logos {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          color: var(--text-secondary);
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
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
        }

        [data-theme="dark"] .roadmap-list li {
          background: var(--bg-secondary);
        }

        .roadmap-list li:before {
          content: '→';
          color: var(--accent-blue);
          margin-right: 0.5rem;
          font-weight: bold;
        }

        .footer {
          padding: 3rem 2rem;
          background: var(--bg-card);
          border-top: 1px solid var(--border-light);
          text-align: center;
        }

        [data-theme="dark"] .footer {
          background: var(--bg-secondary);
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
          color: var(--text-secondary);
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

        .loading-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.5rem;
          color: var(--accent-blue);
        }

        /* Add styles for pattern and bias boxes */
        .refresh-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--accent-blue);
          font-size: 1rem;
          transition: transform 0.2s;
        }

        .refresh-btn:hover {
          transform: rotate(180deg);
        }

        .bias-list {
          max-height: 150px;
          overflow-y: auto;
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
            border-radius: var(--radius-md);
          }
          .tab-headers {
            flex-direction: column;
            gap: 0;
          }
          .tab-headers button {
            border-bottom: none;
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-light);
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
          .summary-tab {
            grid-template-columns: 1fr;
          }
          .hero-stats {
            grid-template-columns: 1fr;
          }
          .market-grid {
            grid-template-columns: 1fr;
          }
          .section-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .plan-toggle {
            width: 100%;
          }
          .dominance-content {
            grid-template-columns: 1fr;
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
          .mission-stats {
            flex-direction: column;
            gap: 1rem;
          }
          .pricing-card {
            padding: 1.5rem;
          }
          .price {
            font-size: 2rem;
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