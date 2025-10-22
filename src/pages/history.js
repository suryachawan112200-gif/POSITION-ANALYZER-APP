import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle, FaAngleDown } from "react-icons/fa";

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

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [totalAnalysis, setTotalAnalysis] = useState({ tgtHit: 0, slHit: 0 });
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    try {
      const storedHistory = JSON.parse(localStorage.getItem("aivisorHistory") || "[]");
      setHistory(storedHistory.sort((a, b) => b.timestamp - a.timestamp));
      updateAnalysis(storedHistory);
    } catch (err) {
      console.error("Error loading history:", err);
      setHistory([]);
    }

    const interval = setInterval(() => checkTradeStatus(), 300000);
    return () => clearInterval(interval);
  }, []);

  const updateAnalysis = (historyData) => {
    const totalTrades = historyData.length;
    const tgtHits = historyData.filter((item) => item.result.tgtHit).length;
    const tgtAccuracy = totalTrades > 0 ? ((tgtHits / totalTrades) * 100).toFixed(2) : 0;
    const analysis = {
      totalTrades,
      tgtAccuracy,
      tgtHit: tgtHits,
      slHit: historyData.filter((item) => item.result.slHit).length,
    };
    setTotalAnalysis(analysis);
  };

  const checkTradeStatus = async () => {
    const updatedHistory = [...history];
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
            }),
          });
          const data = await response.json();
          if (data.currentPrice) {
            result.currentPrice = data.currentPrice;
            result.tgtHit = data.tgtHit;
            result.slHit = data.slHit;
            if (result.tgtHit || result.slHit) {
              localStorage.setItem("aivisorHistory", JSON.stringify(updatedHistory));
              setHistory(updatedHistory);
              updateAnalysis(updatedHistory);
            }
          }
        } catch (err) {
          console.error("Error checking trade status:", err);
        }
      }
    }
  };

  const handleSelectHistory = (result) => {
    setSelectedResult(result);
  };

  const handleCloseResult = () => {
    setSelectedResult(null);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("aivisorHistory");
    setHistory([]);
    setTotalAnalysis({ totalTrades: 0, tgtAccuracy: 0, tgtHit: 0, slHit: 0 });
  };

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Trade History</title>
        <meta name="description" content="View your past trade analyses." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="history-page">
        <section className="stats-section">
          <div className="stats-panel">
            <div className="stats-item">
              <span>Total Trades:</span>
              <strong>{totalAnalysis.totalTrades}</strong>
            </div>
            <div className="stats-item">
              <span>Target Hit Accuracy:</span>
              <strong>{totalAnalysis.tgtAccuracy}%</strong>
            </div>
            <div className="stats-item">
              <span>Total Targets Hit:</span>
              <strong className="positive">{totalAnalysis.tgtHit}</strong>
            </div>
          </div>
          <Link href="/">
            <button className="cta-btn back-btn">⬅ Back</button>
          </Link>
        </section>

        {history.length === 0 ? (
          <div className="no-history-card">
            <p>No trade history. Start analyzing now!</p>
            <Link href="/">
              <button className="cta-btn primary">🚀 Analyze</button>
            </Link>
          </div>
        ) : (
          <div className="timeline">
            <div className="timeline-controls">
              <button onClick={handleClearHistory} className="cta-btn secondary">
                🗑️ Clear
              </button>
            </div>
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
                        <strong
                          className={
                            item.result.tgtHit
                              ? "positive"
                              : item.result.slHit
                              ? "negative"
                              : ""
                          }
                        >
                          {item.result.tgtHit
                            ? "Target Hit"
                            : item.result.slHit
                            ? "Stop Loss Hit"
                            : "Active"}
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
        )}

        {selectedResult && (
          <ResultTabs result={selectedResult} onClose={handleCloseResult} />
        )}
      </div>

      <style jsx>{`
        .stats-section {
          width: 100%;
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid var(--border-soft);
          margin: 2rem 0;
          background: var(--bg-primary);
          box-shadow: var(--shadow-subtle);
        }

        .stats-panel {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .stats-item {
          background: rgba(114, 170, 234, 0.1);
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-subtle);
          color: var(--text-primary);
        }

        .stats-item span {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .stats-item strong {
          color: var(--text-primary);
          font-weight: bold;
        }

        .back-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.3s, background 0.3s;
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border-soft);
        }

        .back-btn:hover {
          transform: scale(1.05);
          background: var(--accent-blue);
          color: #FFFFFF;
        }

        .timeline {
          width: 100%;
          padding: 2rem 0;
        }

        .timeline-item {
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .timeline-card {
          width: 100%;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--border-soft);
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          background: rgba(114, 126, 233, 0.1);
          box-shadow: var(--shadow-subtle);
          color: var(--text-primary);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .timeline-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .timeline-content {
          flex-grow: 1;
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .timeline-header strong {
          color: var(--text-primary);
        }

        .timeline-date {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .timeline-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .detail-item {
          color: var(--text-primary);
        }

        .detail-item span {
          color: var(--text-muted);
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
          background: var(--gradient);
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
          border-radius: 1rem;
          border: 1px solid var(--border-soft);
          max-width: 90%;
          width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
          border-bottom: 2px solid var(--border-soft);
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
        }

        .tab-headers button.active {
          color: var(--accent-blue);
          border-bottom: 3px solid var(--accent-blue);
          font-weight: 600;
        }

        .result-card {
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border-soft);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: var(--shadow-subtle);
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
          border-radius: 0.5rem;
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
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: var(--shadow-subtle);
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
          border-radius: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.3s, background 0.3s;
        }

        .cta-btn.primary {
          background: var(--gradient);
          color: #FFFFFF;
        }

        .cta-btn.secondary {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border-soft);
        }

        .cta-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .stats-panel {
            flex-direction: column;
            gap: 1rem;
          }
          .timeline-details,
          .summary-grid {
            grid-template-columns: 1fr;
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
          }
        }
      `}</style>
    </>
  );
}