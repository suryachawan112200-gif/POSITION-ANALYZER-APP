import { useState, useEffect } from "react";
import Link from "next/link";

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
    <div className="history-section">
      <h3>Recent Analyses</h3>
      <div className="history-list">
        {recentHistory.map((item, idx) => {
          const pl = parseFloat(item.result.profit_loss) || 0;
          return (
            <Link href="/history" key={idx} className="history-card">
              <div className="history-preview">
                <strong>{item.input.coin || "Unknown"} {item.input.positionType || ""}</strong>
                <span className="history-date">{new Date(item.timestamp).toLocaleDateString()}</span>
                <div className="history-pl">
                  <span>P/L: </span>
                  <strong className={pl >= 0 ? "positive" : "negative"}>${pl.toFixed(2)}</strong>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href="/history">
        <button className="cta-btn primary">View Full History</button>
      </Link>
    </div>
  );
}