import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

// Reuse ResultTabs component from index.js
const ResultTabs = ({ result, onClose }) => {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="result-overlay">
      <div className="result-panel">
        <button className="close-btn" onClick={onClose}>×</button>
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
      </div>
    </div>
  );
};

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    try {
      const storedHistory = JSON.parse(localStorage.getItem("aivisorHistory") || "[]");
      setHistory(storedHistory);
    } catch (err) {
      console.error("Error loading history:", err);
    }
  }, []);

  const handleSelectHistory = (result) => {
    setSelectedResult(result);
  };

  const handleCloseResult = () => {
    setSelectedResult(null);
  };

  return (
    <>
      <Head>
        <title>AIVISOR: Trade History</title>
        <meta name="description" content="View and analyze your past trade analyses with AIVISOR." />
      </Head>
      <div className="history-page">
        <div className="header">
          <div className="logo-section">
            <div className="logo-icon">🤖</div>
            <span className="logo-text">AIVISOR</span>
            <span className="version-tag">[V3.1]</span>
          </div>
          <Link href="/">
            <button className="cta-btn primary">Back to Home</button>
          </Link>
        </div>
        <h1>Trade History Timeline</h1>
        {history.length === 0 ? (
          <p className="no-history">No trade history available. Start analyzing trades to build your history!</p>
        ) : (
          <div className="timeline">
            {history.map((item, idx) => {
              const pl = parseFloat(item.result.profit_loss) || 0;
              return (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div
                    className="timeline-card"
                    onClick={() => handleSelectHistory(item.result)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleSelectHistory(item.result)}
                  >
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>{item.input.coin} {item.input.positionType}</strong>
                        <span className="timeline-date">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="timeline-details">
                        <div className="detail-item">
                          <span>Market:</span> <strong>{item.input.market}</strong>
                        </div>
                        <div className="detail-item">
                          <span>Timeframe:</span> <strong>{item.input.timeframe}</strong>
                        </div>
                        <div className="detail-item">
                          <span>P/L:</span>{" "}
                          <strong className={pl >= 0 ? "positive" : "negative"}>
                            ${pl.toFixed(2)}
                          </strong>
                        </div>
                        <div className="detail-item">
                          <span>Action:</span>{" "}
                          <strong className="trend">{item.result.recommended_action?.toUpperCase() || "HOLD"}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {selectedResult && <ResultTabs result={selectedResult} onClose={handleCloseResult} />}
      </div>
      <style jsx>{`
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

        .history-page {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 2rem;
          background: var(--bg-card);
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          color: var(--text-light);
          position: relative;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--accent-cyan);
          margin-bottom: 2rem;
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

        .logo-text {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
        }

        .version-tag {
          background: var(--accent-violet);
          color: var(--bg-primary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
        }

        h1 {
          color: var(--accent-cyan);
          font-weight: 600;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2.5rem;
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        .no-history {
          text-align: center;
          color: var(--text-muted);
          font-size: 1.1rem;
          padding: 2rem;
        }

        .timeline {
          position: relative;
          padding-left: 2rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0.5rem;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--gradient);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2rem;
        }

        .timeline-dot {
          position: absolute;
          left: -1.8rem;
          top: 1rem;
          width: 16px;
          height: 16px;
          background: var(--accent-cyan);
          border-radius: 50%;
          border: 3px solid var(--bg-primary);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .timeline-card {
          background: rgba(10, 10, 35, 0.9);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border-left: 4px solid var(--accent-cyan);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .timeline-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
          background: rgba(0, 212, 255, 0.1);
        }

        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .timeline-header strong {
          font-size: 1.2rem;
          color: var(--accent-violet);
        }

        .timeline-date {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .timeline-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .detail-item span {
          color: var(--text-muted);
        }

        .positive { color: var(--success); }
        .negative { color: var(--error); }
        .trend { color: var(--accent-violet); }

        .result-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s;
        }

        .result-panel {
          background: var(--bg-card);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 90%;
          width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--error);
          color: var(--text-light);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: #ff5555;
          transform: scale(1.1);
        }

        .result-tabs {
          margin-top: 2rem;
        }

        .tab-headers {
          display: flex;
          border-bottom: 1px solid var(--text-muted);
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .history-page {
            padding: 1rem;
            margin: 1rem;
          }
          h1 {
            font-size: 1.8rem;
          }
          .timeline::before {
            left: 0.3rem;
            width: 3px;
          }
          .timeline-dot {
            left: -1.6rem;
            width: 12px;
            height: 12px;
          }
          .timeline-card {
            padding: 1rem;
          }
          .timeline-details {
            grid-template-columns: 1fr;
          }
          .result-panel {
            width: 95%;
            padding: 1.5rem;
          }
          .tab-headers {
            flex-direction: column;
            gap: 0;
          }
          .tab-headers button {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--text-muted);
          }
          .tab-headers button.active {
            border-bottom: 1px solid var(--accent-cyan);
            background: rgba(0, 212, 255, 0.05);
          }
          .summary-item {
            flex-direction: column;
            gap: 0.25rem;
            align-items: flex-start;
          }
          .summary-item strong {
            align-self: flex-end;
          }
        }

        @media (max-width: 480px) {
          .timeline-card {
            padding: 0.75rem;
          }
          .timeline-header strong {
            font-size: 1rem;
          }
          .timeline-date {
            font-size: 0.8rem;
          }
          .detail-item {
            font-size: 0.8rem;
          }
          .cta-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}