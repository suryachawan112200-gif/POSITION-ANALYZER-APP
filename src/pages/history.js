import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle, FaAngleDown, FaChartLine, FaBullseye, FaShieldAlt, FaTrophy, FaHistory } from "react-icons/fa";

// ResultTabs Component
const ResultTabs = ({ result, onClose }) => {
  const [activeTab, setActiveTab] = useState("summary");

  const isTgtHit = result.targets?.some((tgt) => result.currentPrice >= tgt);
  const isSlHit =
    (result.user_stoploss && result.currentPrice <= result.user_stoploss) ||
    result.market_stoplosses?.some((sl) => result.currentPrice <= sl);
  const firstHit = isTgtHit ? "tgt" : isSlHit ? "sl" : null;

  return (
    <div className="result-overlay">
      <div className="result-panel">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="result-tabs">
          <div className="tab-headers" role="tablist">
            {["summary", "tgt-sl", "action"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab === "summary" && "📋 Summary"}
                {tab === "tgt-sl" && "🎯 TGT & SL"}
                {tab === "action" && "🚀 Action"}
              </button>
            ))}
          </div>
          <div className="tab-content" role="tabpanel">
            {activeTab === "summary" && (
              <div className="tab-panel">
                <div className="result-card">
                  <h4>Trade Summary</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span>Asset:</span>
                      <strong>
                        {result.coin} ({result.asset_class?.toUpperCase() ?? "N/A"})
                      </strong>
                    </div>
                    <div className="summary-item">
                      <span>Market:</span>
                      <strong>{result.market?.toUpperCase() ?? "N/A"}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Position:</span>
                      <strong
                        className={
                          result.position_type === "long" ? "positive" : "negative"
                        }
                      >
                        {result.position_type?.toUpperCase() ?? "N/A"}
                      </strong>
                    </div>
                    <div className="summary-item">
                      <span>Entry Price:</span>
                      <strong className="highlight">
                        ${result.entry_price?.toFixed(5) ?? "N/A"}
                      </strong>
                    </div>
                    <div className="summary-item">
                      <span>Status:</span>
                      <strong
                        className={
                          result.tgtHit ? "positive" : result.slHit ? "negative" : ""
                        }
                      >
                        {result.tgtHit
                          ? "Target Hit"
                          : result.slHit
                          ? "Stop Loss Hit"
                          : "Active"}
                      </strong>
                    </div>
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
                      {result.targets
                        ?.filter((v, i, a) => a.indexOf(v) === i)
                        .map((target, idx) => (
                          <div
                            key={idx}
                            className={`level positive ${
                              firstHit === "tgt" && idx === 0 ? "hit" : ""
                            }`}
                          >
                            T{idx + 1}: ${target?.toFixed(5) ?? "N/A"}
                            {firstHit === "tgt" && idx === 0 && (
                              <FaCheckCircle className="status-icon" />
                            )}
                          </div>
                        )) || <div className="level">No Targets Available</div>}
                    </div>
                  </div>
                  <div className="levels-section">
                    <h5>Stop Loss Levels</h5>
                    <div className="levels-list">
                      {result.user_stoploss && (
                        <div
                          className={`level negative ${
                            firstHit === "sl" && result.currentPrice <= result.user_stoploss
                              ? "hit"
                              : ""
                          }`}
                        >
                          User SL: ${result.user_stoploss?.toFixed(5) ?? "N/A"}
                          {firstHit === "sl" &&
                            result.currentPrice <= result.user_stoploss && (
                              <FaTimesCircle className="status-icon" />
                            )}
                        </div>
                      )}
                      {result.market_stoplosses
                        ?.filter((v, i, a) => a.indexOf(v) === i)
                        .map((sl, idx) => (
                          <div
                            key={idx}
                            className={`level negative ${
                              firstHit === "sl" && idx === 0 && result.currentPrice <= sl
                                ? "hit"
                                : ""
                            }`}
                          >
                            SL{idx + 1}: ${sl?.toFixed(5) ?? "N/A"}
                            {firstHit === "sl" && idx === 0 && result.currentPrice <= sl && (
                              <FaTimesCircle className="status-icon" />
                            )}
                          </div>
                        )) || <div className="level">No Stop Losses Available</div>}
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
                      {result.recommended_action?.toUpperCase() ?? "HOLD"}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="action-ctas">
            <button className="cta-btn secondary">📄 Export</button>
            <button className="cta-btn primary">🔔 Alert</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Portfolio Summary Component
const PortfolioSummary = ({ summary }) => (
  <div className="portfolio-summary">
    <div className="summary-header">
      <FaTrophy className="summary-icon" />
      <h2>Your Portfolio Performance</h2>
    </div>
    <div className="summary-grid">
      <div className="summary-card">
        <div className="card-icon">
          <FaBullseye />
        </div>
        <div className="card-content">
          <h3>{summary.tgtAccuracy}%</h3>
          <p>TGT Accuracy</p>
        </div>
      </div>
      <div className="summary-card">
        <div className="card-icon">
          <FaChartLine />
        </div>
        <div className="card-content">
          <h3 className={summary.totalPL >= 0 ? "positive" : "negative"}>
            {summary.totalPL >= 0 ? '+' : ''}{summary.totalPL}%
          </h3>
          <p>Total P/L</p>
        </div>
      </div>
      <div className="summary-card">
        <div className="card-icon">
          <FaShieldAlt />
        </div>
        <div className="card-content">
          <h3>{summary.topBias}</h3>
          <p>Top Bias</p>
        </div>
      </div>
      <div className="summary-card">
        <div className="card-icon">
          <FaHistory />
        </div>
        <div className="card-content">
          <h3>{summary.totalTrades}</h3>
          <p>Total Trades</p>
        </div>
      </div>
    </div>
    {summary.insights && (
      <div className="insights-banner">
        <p>{summary.insights}</p>
      </div>
    )}
  </div>
);

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [portfolioSummary, setPortfolioSummary] = useState({
    tgtAccuracy: 0,
    totalPL: 0,
    topBias: "N/A",
    totalTrades: 0,
    insights: ""
  });
  const [expandedItem, setExpandedItem] = useState(null);
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

  useEffect(() => {
    try {
      const storedHistory = JSON.parse(localStorage.getItem("aivisorHistory") || "[]");
      setHistory(storedHistory.sort((a, b) => b.timestamp - a.timestamp));
      updatePortfolioSummary(storedHistory);
    } catch (err) {
      console.error("Error loading history:", err);
      setHistory([]);
    }

    // Check trade status every 2 minutes
    const interval = setInterval(() => checkTradeStatus(), 120000);
    return () => clearInterval(interval);
  }, []);

  const updatePortfolioSummary = (historyData) => {
    if (historyData.length === 0) {
      setPortfolioSummary({
        tgtAccuracy: 0,
        totalPL: 0,
        topBias: "N/A",
        totalTrades: 0,
        insights: ""
      });
      return;
    }

    const totalTrades = historyData.length;
    const tgtHits = historyData.filter((item) => item.result.tgtHit).length;
    const tgtAccuracy = totalTrades > 0 ? ((tgtHits / totalTrades) * 100).toFixed(1) : 0;
    
    // Calculate total P/L
    const totalPL = historyData.reduce((sum, item) => {
      return sum + (parseFloat(item.result.profit_loss) || 0);
    }, 0).toFixed(2);
    
    // Determine top bias (simplified)
    const longTrades = historyData.filter(item => item.input?.positionType === "Long").length;
    const shortTrades = historyData.filter(item => item.input?.positionType === "Short").length;
    const topBias = longTrades > shortTrades ? "Strong Bull" : 
                   shortTrades > longTrades ? "Strong Bear" : "Neutral";
    
    // Generate insights
    let insights = "";
    if (tgtAccuracy > 70) {
      insights = "Excellent target accuracy! Keep up the great work.";
    } else if (tgtAccuracy > 50) {
      insights = "Good accuracy. Consider reviewing your entry criteria.";
    } else {
      insights = "Consider adjusting your strategy for better results.";
    }

    setPortfolioSummary({
      tgtAccuracy,
      totalPL,
      topBias,
      totalTrades,
      insights
    });
  };

  const checkTradeStatus = async () => {
    const updatedHistory = [...history];
    let needsUpdate = false;
    
    for (let item of updatedHistory) {
      const result = item.result;
      if (!result.tgtHit && !result.slHit) {
        try {
          const response = await fetch("/api/checkTradeStatus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              coin: result.coin,
              entryPrice: result.entry_price,
              targets: result.targets,
              userStoploss: result.user_stoploss,
              marketStoplosses: result.market_stoplosses,
              positionType: result.position_type,
              timestamp: item.timestamp
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.currentPrice) {
              result.currentPrice = data.currentPrice;
              result.tgtHit = data.tgtHit;
              result.slHit = data.slHit;
              
              if (result.tgtHit || result.slHit) {
                needsUpdate = true;
              }
            }
          }
        } catch (err) {
          console.error("Error checking trade status:", err);
        }
      }
    }
    
    if (needsUpdate) {
      localStorage.setItem("aivisorHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      updatePortfolioSummary(updatedHistory);
    }
  };

  const handleSelectHistory = (result) => {
    setSelectedResult(result);
  };

  const handleCloseResult = () => {
    setSelectedResult(null);
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      localStorage.removeItem("aivisorHistory");
      setHistory([]);
      updatePortfolioSummary([]);
    }
  };

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const getStatusText = (result) => {
    if (result.tgtHit) return "TGT Hit: +" + (parseFloat(result.profit_loss) || 0).toFixed(2) + "%";
    if (result.slHit) return "SL Hit: " + (parseFloat(result.profit_loss) || 0).toFixed(2) + "%";
    return "Open: Monitoring";
  };

  const getStatusClass = (result) => {
    if (result.tgtHit) return "status-success";
    if (result.slHit) return "status-error";
    return "status-warning";
  };

  return (
    <>
      <Head>
        <title>AIVISOR - Trade History</title>
        <meta name="description" content="View your past trade analyses and performance." />
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

      <div className="history-page">
        <PortfolioSummary summary={portfolioSummary} />
        
        {history.length === 0 ? (
          <div className="no-history-section">
            <div className="no-history-card">
              <FaHistory className="history-icon" />
              <h2>No Trade History</h2>
              <p>Start analyzing trades to build your performance history</p>
              <Link href="/">
                <button className="cta-btn primary large">🚀 Analyze Now</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="history-content">
            <div className="timeline-controls">
              <button onClick={handleClearHistory} className="cta-btn secondary">
                🗑️ Clear History
              </button>
              <Link href="/">
                <button className="cta-btn">⬅ Back to Dashboard</button>
              </Link>
            </div>
            
            <div className="timeline">
              {history.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div
                    className="timeline-card"
                    onClick={() => toggleExpand(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") toggleExpand(idx);
                    }}
                  >
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>
                          {item.input?.coin ?? "N/A"} {item.input?.positionType ?? ""}
                        </strong>
                        <span className="timeline-date">
                          {item.timestamp
                            ? new Date(item.timestamp).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                      <div className="timeline-details">
                        <div className="detail-item">
                          <span>Market:</span>
                          <strong>{item.input?.market ?? "N/A"}</strong>
                        </div>
                        <div className="detail-item">
                          <span>P/L:</span>
                          <strong
                            className={
                              parseFloat(item.result?.profit_loss) >= 0
                                ? "positive"
                                : "negative"
                            }
                          >
                            ${parseFloat(item.result?.profit_loss ?? 0).toFixed(2)}
                          </strong>
                        </div>
                        <div className="detail-item">
                          <span>Status:</span>
                          <strong className={getStatusClass(item.result)}>
                            {getStatusText(item.result)}
                          </strong>
                        </div>
                      </div>
                      <FaAngleDown className="expand-icon" />
                    </div>
                  </div>
                  {expandedItem === idx && (
                    <div className="history-details">
                      <ResultTabs result={item.result} onClose={() => toggleExpand(idx)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedResult && (
          <ResultTabs result={selectedResult} onClose={handleCloseResult} />
        )}
      </div>

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

        .history-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .portfolio-summary {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
          animation: fadeIn 0.5s ease-in;
        }

        [data-theme="dark"] .portfolio-summary {
          background: var(--bg-secondary);
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-icon {
          font-size: 2rem;
          color: var(--accent-blue);
        }

        .summary-header h2 {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .summary-card {
          background: var(--bg-card);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          transition: all 0.3s;
        }

        [data-theme="dark"] .summary-card {
          background: var(--bg-secondary);
        }

        .summary-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .card-icon {
          font-size: 1.5rem;
          color: var(--accent-blue);
        }

        .card-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .card-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .insights-banner {
          background: rgba(67, 192, 246, 0.1);
          border-radius: var(--radius-md);
          padding: 1rem;
          text-align: center;
          border-left: 4px solid var(--accent-blue);
        }

        .insights-banner p {
          color: var(--text-primary);
          font-weight: 500;
        }

        .no-history-section {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
        }

        .no-history-card {
          text-align: center;
          padding: 3rem;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
          max-width: 500px;
          width: 100%;
        }

        [data-theme="dark"] .no-history-card {
          background: var(--bg-secondary);
        }

        .history-icon {
          font-size: 4rem;
          color: var(--accent-blue);
          margin-bottom: 1.5rem;
        }

        .no-history-card h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .no-history-card p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .history-content {
          margin-top: 2rem;
        }

        .timeline-controls {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .timeline {
          width: 100%;
        }

        .timeline-item {
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .timeline-card {
          width: 100%;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          cursor: pointer;
          transition: all 0.3s;
          background: var(--bg-card);
          box-shadow: var(--shadow-sm);
          color: var(--text-primary);
        }

        [data-theme="dark"] .timeline-card {
          background: var(--bg-secondary);
        }

        .timeline-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .timeline-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .timeline-header {
          display: flex;
          flex-direction: column;
          font-size: 1.1rem;
        }

        .timeline-header strong {
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .timeline-date {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .timeline-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          flex: 1;
        }

        .detail-item {
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
        }

        .detail-item span {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .detail-item strong {
          font-size: 1rem;
        }

        .status-success {
          color: var(--success);
          font-weight: 600;
        }

        .status-error {
          color: var(--error);
          font-weight: 600;
        }

        .status-warning {
          color: var(--warning);
          font-weight: 600;
        }

        .expand-icon {
          font-size: 1.2rem;
          color: var(--text-muted);
          transition: transform 0.3s;
        }

        .timeline-card:hover .expand-icon {
          transform: rotate(180deg);
        }

        .history-details {
          width: 100%;
          margin-top: 1rem;
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .positive {
          color: var(--success);
        }

        .negative {
          color: var(--error);
        }

        .highlight {
          background: var(--button-gradient);
          -webkit-background-clip: text;
          color: transparent;
        }

        .result-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .result-panel {
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          max-width: 90%;
          width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-card);
          box-shadow: var(--shadow-xl);
        }

        [data-theme="dark"] .result-panel {
          background: var(--bg-secondary);
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--error);
          color: #FFFFFF;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .close-btn:hover {
          background: #ff5555;
        }

        .result-tabs {
          margin-top: 2rem;
        }

        .tab-headers {
          display: flex;
          gap: 1rem;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 1.5rem;
        }

        .tab-headers button {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1rem;
          cursor: pointer;
          transition: color 0.3s;
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        }

        .tab-headers button.active {
          color: var(--accent-blue);
          border-bottom: 3px solid var(--accent-blue);
          font-weight: 600;
          background: rgba(67, 192, 246, 0.05);
        }

        .result-card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          background: var(--bg-card);
          box-shadow: var(--shadow-sm);
        }

        [data-theme="dark"] .result-card {
          background: var(--bg-secondary);
        }

        .result-card h4 {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .summary-item {
          font-size: 1rem;
        }

        .summary-item span {
          color: var(--text-muted);
        }

        .summary-item strong {
          color: var(--text-primary);
          font-weight: bold;
        }

        .levels-section {
          margin: 1rem 0;
        }

        .levels-section h5 {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .levels-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .level {
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .level.positive {
          border-left: 4px solid var(--success);
          background: rgba(62, 213, 152, 0.1);
        }

        .level.negative {
          border-left: 4px solid var(--error);
          background: rgba(239, 68, 68, 0.1);
        }

        .level.hit {
          background: rgba(0, 0, 0, 0.05);
          font-weight: 600;
        }

        .status-icon {
          color: inherit;
          margin-left: 0.75rem;
        }

        .action-recommend {
          text-align: center;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: rgba(67, 192, 246, 0.1);
          box-shadow: var(--shadow-sm);
        }

        .action-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .cta-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-btn.primary {
          background: var(--button-gradient);
          color: #FFFFFF;
          box-shadow: var(--shadow-sm);
        }

        .cta-btn.primary.large {
          padding: 1rem 2rem;
          font-size: 1.1rem;
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

        .footer {
          padding: 2rem;
          text-align: center;
          background: var(--bg-card);
          border-top: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          margin-top: 3rem;
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
          .summary-grid {
            grid-template-columns: 1fr;
          }
          
          .timeline-details {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          
          .timeline-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .result-panel {
            width: 95%;
            padding: 1rem;
          }
          
          .tab-headers {
            flex-direction: column;
          }
          
          .cta-btn {
            width: 100%;
            justify-content: center;
          }
          
          .timeline-controls {
            flex-direction: column;
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