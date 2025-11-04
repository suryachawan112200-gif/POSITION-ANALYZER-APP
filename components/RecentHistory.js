import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHistory, FaChartLine, FaChevronRight } from "react-icons/fa";

export default function RecentHistory() {
  const [recentHistory, setRecentHistory] = useState([]);

  useEffect(() => {
    const loadRecentHistory = () => {
      try {
        const history = JSON.parse(localStorage.getItem("aivisorHistory") || "[]");
        const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
        const filtered = history.filter((h) => h.timestamp > threeDaysAgo);
        setRecentHistory(filtered.slice(0, 2));
      } catch (err) {
        console.error("Error loading history:", err);
      }
    };

    loadRecentHistory();
    const interval = setInterval(loadRecentHistory, 30000);
    return () => clearInterval(interval);
  }, []);

  if (recentHistory.length === 0) return null;

  return (
    <>
      <div className="recent-history-section">
        <div className="section-header">
          <FaHistory className="section-icon" />
          <h3 className="section-title">Recent Analyses</h3>
        </div>
        
        <div className="history-list">
          {recentHistory.map((item, idx) => {
            const pl = parseFloat(item.result.profit_loss) || 0;
            const isPositive = pl >= 0;
            
            return (
              <Link href="/history" key={idx} className="history-card">
                <div className="history-content">
                  <div className="history-main">
                    <strong className="history-asset">
                      {item.input.coin || "Unknown"} {item.input.positionType || ""}
                    </strong>
                  </div>
                  <div className="history-details">
                    <div className="history-pl">
                      <span>P/L: </span>
                      <strong className={isPositive ? "positive" : "negative"}>
                        ${Math.abs(pl).toFixed(2)} {isPositive ? '↑' : '↓'}
                      </strong>
                    </div>
                    <FaChevronRight className="history-arrow" />
                  </div>
                </div>
                <div className="history-meta">
                  <span className="history-date">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        
        <Link href="/history" className="view-all-link">
          <span>View Full History</span>
          <FaChevronRight className="link-arrow" />
        </Link>
      </div>

      <style jsx>{`
        .recent-history-section {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
          margin-top: 2rem;
          animation: fadeIn 0.5s ease-out;
        }

        [data-theme="dark"] .recent-history-section {
          background: var(--bg-secondary);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .section-icon {
          color: var(--accent-blue);
          font-size: 1.25rem;
        }

        .section-title {
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .history-card {
          display: block;
          text-decoration: none;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1rem;
          transition: all 0.3s;
          box-shadow: var(--shadow-sm);
        }

        [data-theme="dark"] .history-card {
          background: var(--bg-secondary);
        }

        .history-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-blue);
        }

        .history-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .history-main {
          flex: 1;
        }

        .history-asset {
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }

        .history-meta {
          margin-top: 0.5rem;
        }

        .history-date {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .history-details {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .history-pl {
          text-align: right;
        }

        .history-pl span {
          color: var(--text-muted);
          font-size: 0.85rem;
          display: block;
        }

        .history-pl strong {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .positive {
          color: var(--success);
        }

        .negative {
          color: var(--error);
        }

        .history-arrow {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .view-all-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--accent-blue);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          transition: all 0.3s;
          background: rgba(67, 192, 246, 0.05);
        }

        .view-all-link:hover {
          background: rgba(67, 192, 246, 0.1);
          color: var(--accent-purple);
        }

        .link-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s;
        }

        .view-all-link:hover .link-arrow {
          transform: translateX(3px);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .recent-history-section {
            padding: 1.25rem;
          }
          
          .history-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .history-details {
            width: 100%;
            justify-content: space-between;
          }
          
          .history-pl {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
}