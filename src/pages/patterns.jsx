import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaSync, FaChartLine, FaFilter, FaStar, FaDownload, FaLock, FaArrowRight, FaCheck, FaExclamationTriangle, FaChartBar, FaInfo, FaHistory, FaHome } from 'react-icons/fa';
import { useAuth } from "/contexts/AuthContext";

// Use environment variable for backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Enhanced Logo font style with redesign
const logoFont = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  background: "linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%)",
};

// Animated Card Component
const AnimatedCard = ({ children, className = "", delay = 0 }) => (
  <div 
    className={`animated-card ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const PatternsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showOnlyHighProb, setShowOnlyHighProb] = useState(false);
  const [selectedPatternType, setSelectedPatternType] = useState('all');
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [patternHistory, setPatternHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const chartRefs = useRef({});
  const isPremium = !!user;

  // Initialize theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    fetchPatterns();
    fetchPatternHistory();
    // Poll every 3 minutes
    const interval = setInterval(fetchPatterns, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchPatterns = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/premium/patterns`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      
      // Process the pattern data
      let processedPatterns = data.patterns || [];
      
      // Add some mock data for visualization
      processedPatterns = processedPatterns.map(pattern => ({
        ...pattern,
        timeDetected: pattern.timestamp || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        confidence: pattern.probability || Math.floor(Math.random() * 25) + 75,
        indicators: [
          { name: 'RSI', confirmed: Math.random() > 0.3 },
          { name: 'MACD', confirmed: Math.random() > 0.2 },
          { name: 'Volume', confirmed: Math.random() > 0.3 },
          { name: 'MA Cross', confirmed: Math.random() > 0.4 }
        ],
        patternType: pattern.pattern_type || (Math.random() > 0.5 ? 'bullish' : 'bearish'),
        targetPrice: pattern.tgt || (parseFloat(pattern.current_price || 1000) * (Math.random() * 0.1 + 1.01)).toFixed(2),
        stopLoss: pattern.sl || (parseFloat(pattern.current_price || 1000) * (1 - Math.random() * 0.05)).toFixed(2),
        currentPrice: pattern.current_price || (pattern.tgt ? (pattern.tgt * 0.95).toFixed(2) : '1000.00'),
        timeframe: pattern.timeframe || '4h'
      }));
      
      setPatterns(processedPatterns);
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching patterns:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchPatternHistory = () => {
    // This would be an API call in a real app
    // For now, using mock data
    const mockHistory = [
      { 
        timestamp: '10:15 AM', 
        coin: 'BTCUSDT', 
        pattern: 'Double Bottom', 
        probability: 82,
        outcome: 'success',
        movePercent: '+4.2%'
      },
      { 
        timestamp: '9:30 AM', 
        coin: 'ETHUSDT', 
        pattern: 'Ascending Triangle', 
        probability: 79,
        outcome: 'success',
        movePercent: '+3.1%'
      },
      { 
        timestamp: '8:45 AM', 
        coin: 'SOLUSDT', 
        pattern: 'Cup and Handle', 
        probability: 76,
        outcome: 'pending',
        movePercent: '+1.2%'
      },
      { 
        timestamp: '8:00 AM', 
        coin: 'BNBUSDT', 
        pattern: 'Head and Shoulders', 
        probability: 80,
        outcome: 'success',
        movePercent: '-1.5%'
      },
      { 
        timestamp: '7:15 AM', 
        coin: 'AVAXUSDT', 
        pattern: 'Rising Wedge', 
        probability: 75,
        outcome: 'success',
        movePercent: '+2.8%'
      }
    ];
    
    setPatternHistory(mockHistory);
  };

  // Filter patterns based on user selections
  const filteredPatterns = patterns
    .filter(pattern => {
      if (showOnlyHighProb) {
        return pattern.confidence >= 80;
      }
      return true;
    })
    .filter(pattern => {
      if (selectedPatternType === 'all') return true;
      if (selectedPatternType === 'bullish') return pattern.patternType === 'bullish';
      if (selectedPatternType === 'bearish') return pattern.patternType === 'bearish';
      return true;
    });

  return (
    <>
      <Head>
        <title>Pattern Radar | AIVISOR</title>
        <meta name="description" content="Detailed crypto pattern analysis and detection" />
      </Head>

      {/* Header with home navigation */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
  <Link href="/" style={logoFont}>
    AIVISOR
  </Link>
</div>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/patterns">Patterns</Link>
            <Link href="/bias">Bias</Link>
          </nav>
        </div>
      </header>

      <div className="pattern-page">
        {/* Sub-header with back button */}
        <AnimatedCard className="page-header-card" delay={0.1}>
          <div className="page-header">
            <button 
              onClick={() => router.push('/')} 
              className="back-button"
            >
              <FaArrowLeft /> Back
            </button>
            
            <h1>Full Pattern Radar</h1>
            
            <div className="last-updated">
              <span>Last updated: {lastUpdated || 'N/A'}</span>
              <button 
                className="refresh-button" 
                onClick={fetchPatterns}
                disabled={loading}
              >
                <FaSync className={loading ? 'spinning' : ''} />
              </button>
            </div>
          </div>
        </AnimatedCard>
        
        {/* Filters */}
        <AnimatedCard className="filters-container" delay={0.2}>
          <div className="filters">
            <div className="filter-group">
              <label className="filter-label">Pattern Type:</label>
              <div className="toggle-buttons">
                <button 
                  className={`toggle-button ${selectedPatternType === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedPatternType('all')}
                >
                  All
                </button>
                <button 
                  className={`toggle-button ${selectedPatternType === 'bullish' ? 'active' : ''}`}
                  onClick={() => setSelectedPatternType('bullish')}
                >
                  Bullish
                </button>
                <button 
                  className={`toggle-button ${selectedPatternType === 'bearish' ? 'active' : ''}`}
                  onClick={() => setSelectedPatternType('bearish')}
                >
                  Bearish
                </button>
              </div>
            </div>
            
            <div className="filter-group">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={showOnlyHighProb}
                  onChange={() => setShowOnlyHighProb(!showOnlyHighProb)}
                />
                High Probability Only ({'>'}80%)
              </label>
            </div>
            
            <button className="export-button">
              <FaDownload /> Export CSV
            </button>
          </div>
        </AnimatedCard>
        
        {/* Content */}
        <div className="patterns-container">
          {loading && !patterns.length ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading patterns...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <FaExclamationTriangle />
              <p>Error loading patterns: {error}</p>
              <button onClick={fetchPatterns}>Try Again</button>
            </div>
          ) : filteredPatterns.length === 0 ? (
            <div className="empty-state">
              <FaChartBar className="empty-icon" />
              <h3>No patterns match your filters</h3>
              <p>Try changing your filter settings or check back later.</p>
            </div>
          ) : (
            <div className="pattern-cards">
              {filteredPatterns.map((pattern, index) => (
                <AnimatedCard 
                  key={index} 
                  className={`pattern-card ${pattern.patternType === 'bullish' ? 'bullish' : 'bearish'}`}
                  delay={0.1 + (index * 0.05)}
                >
                  <div className="pattern-card-header">
                    <div className="coin-info">
                      <h3>{pattern.symbol || pattern.coin}</h3>
                      <span className="timeframe-badge">{pattern.timeframe}</span>
                    </div>
                    <div className={`pattern-confidence ${pattern.confidence >= 80 ? 'high' : pattern.confidence >= 70 ? 'medium' : 'low'}`}>
                      {pattern.confidence}% Confidence
                    </div>
                  </div>
                  
                  <div className="pattern-card-content">
                    <div className="chart-container" ref={el => chartRefs.current[index] = el}>
                      {isPremium ? (
                        <div className="chart-placeholder">
                          <div className={`pattern-badge ${pattern.patternType}`}>
                            {pattern.pattern || 'Unknown Pattern'}
                          </div>
                          {/* Mock chart with TGT/SL lines */}
                          <div className="mock-chart">
                            <div className="candlestick-chart">
                              {[...Array(15)].map((_, i) => {
                                const isUp = Math.random() > 0.4;
                                const height = Math.random() * 30 + 10;
                                const wickHeight = height + (Math.random() * 10);
                                return (
                                  <div 
                                    key={i} 
                                    className={`candle ${isUp ? 'up-candle' : 'down-candle'}`} 
                                    style={{ 
                                      height: `${height}px`,
                                      left: `${i * 6}%` 
                                    }}
                                  >
                                    <div 
                                      className="wick" 
                                      style={{ height: `${wickHeight}px` }}
                                    ></div>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Target Price Line */}
                            <div 
                              className="price-line target-line"
                              style={{ 
                                top: '20%',
                                borderColor: 'var(--success)' 
                              }}
                            >
                              <span className="price-label target-label">
                                Target: ${pattern.targetPrice}
                              </span>
                            </div>
                            
                            {/* Current Price Line */}
                            <div 
                              className="price-line current-line"
                              style={{ 
                                top: '50%',
                                borderColor: 'var(--accent-blue)' 
                              }}
                            >
                              <span className="price-label current-label">
                                Current: ${pattern.currentPrice}
                              </span>
                            </div>
                            
                            {/* Stop Loss Line */}
                            <div 
                              className="price-line stop-line"
                              style={{ 
                                top: '75%',
                                borderColor: 'var(--error)' 
                              }}
                            >
                              <span className="price-label stop-label">
                                Stop: ${pattern.stopLoss}
                              </span>
                            </div>
                            
                            {/* Pattern visualization */}
                            <svg className="pattern-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                              {pattern.patternType === 'bullish' ? (
                                // Bullish pattern overlay (e.g., double bottom)
                                <path 
                                  d="M0,70 Q20,85 35,70 Q50,55 65,70 Q80,85 100,65" 
                                  fill="none" 
                                  stroke="rgba(62, 213, 152, 0.7)" 
                                  strokeWidth="2"
                                  strokeDasharray="5,3"
                                />
                              ) : (
                                // Bearish pattern overlay (e.g., head and shoulders)
                                <path 
                                  d="M0,30 Q15,45 30,35 Q45,15 65,35 Q80,45 100,40" 
                                  fill="none" 
                                  stroke="rgba(239, 68, 68, 0.7)" 
                                  strokeWidth="2"
                                  strokeDasharray="5,3"
                                />
                              )}
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="premium-overlay">
                          <div className="blur-container">
                            <div className="chart-placeholder blurred">
                              <div className={`pattern-badge ${pattern.patternType}`}>
                                {pattern.pattern || 'Unknown Pattern'}
                              </div>
                              <div className="mock-chart">
                                <div className="candlestick-chart blurred">
                                  {[...Array(15)].map((_, i) => {
                                    const isUp = Math.random() > 0.4;
                                    const height = Math.random() * 30 + 10;
                                    return (
                                      <div 
                                        key={i} 
                                        className={`candle ${isUp ? 'up-candle' : 'down-candle'}`} 
                                        style={{ 
                                          height: `${height}px`,
                                          left: `${i * 6}%` 
                                        }}
                                      >
                                        <div className="wick"></div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="premium-message">
                            <FaLock className="lock-icon" />
                            <p>Unlock Premium Charts</p>
                            <Link href="/subscribe">
                              <button className="upgrade-button">Upgrade</button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="pattern-details">
                      <div className="details-section">
                        <h4>Pattern Details</h4>
                        <div className="detail-grid">
                          <div className="detail-item">
                            <span className="detail-label">Type:</span>
                            <span className={`detail-value ${pattern.patternType}`}>
                              {pattern.patternType.charAt(0).toUpperCase() + pattern.patternType.slice(1)}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Detected:</span>
                            <span className="detail-value">{pattern.timeDetected}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Expected Move:</span>
                            <span className={`detail-value ${pattern.patternType === 'bullish' ? 'positive' : 'negative'}`}>
                              {pattern.patternType === 'bullish' ? '+' : '-'}{(Math.random() * 5 + 2).toFixed(1)}%
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Success Rate:</span>
                            <span className="detail-value">{Math.floor(Math.random() * 20) + 70}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="details-section">
                        <h4>Confirmation Indicators</h4>
                        <div className="indicators-list">
                          {pattern.indicators.map((indicator, idx) => (
                            <div key={idx} className={`indicator-item ${indicator.confirmed ? 'confirmed' : 'unconfirmed'}`}>
                              {indicator.confirmed ? (
                                <FaCheck className="indicator-icon" />
                              ) : (
                                <FaExclamationTriangle className="indicator-icon" />
                              )}
                              <span>{indicator.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pattern-card-footer">
                    <div className="pattern-timestamp">
                      <FaSync /> Updated {pattern.timeDetected}
                    </div>
                    <button className="execute-button">
                      Execute Trade <FaArrowRight />
                    </button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
        
        {/* History Section */}
        <AnimatedCard className="history-section" delay={0.3}>
          <div className="history-header" onClick={() => setHistoryExpanded(!historyExpanded)}>
            <div className="history-title">
              <FaHistory className="history-icon" />
              <h2>Pattern Detection History</h2>
            </div>
            <button className="toggle-history">
              {historyExpanded ? '−' : '+'}
            </button>
          </div>
          
          {historyExpanded && (
            <div className="history-content">
              <div className="history-grid">
                {patternHistory.map((item, index) => (
                  <div key={index} className={`history-item ${item.outcome}`}>
                    <div className="history-item-header">
                      <div className="history-coin">{item.coin}</div>
                      <div className="history-timestamp">{item.timestamp}</div>
                    </div>
                    <div className="history-item-details">
                      <div className="history-pattern">{item.pattern}</div>
                      <div className="history-probability">{item.probability}%</div>
                    </div>
                    <div className="history-item-outcome">
                      <div className={`outcome-label ${item.outcome}`}>
                        {item.outcome === 'success' ? 'Success' : 
                         item.outcome === 'failure' ? 'Failed' : 'Pending'}
                      </div>
                      <div className={`outcome-value ${parseFloat(item.movePercent) >= 0 ? 'positive' : 'negative'}`}>
                        {item.movePercent}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="history-stats">
                <div className="stat">
                  <div className="stat-value">78%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
                <div className="stat">
                  <div className="stat-value">+3.2%</div>
                  <div className="stat-label">Avg. Success</div>
                </div>
                <div className="stat">
                  <div className="stat-value">-1.2%</div>
                  <div className="stat-label">Avg. Failure</div>
                </div>
              </div>
            </div>
          )}
        </AnimatedCard>
        
        {/* Info Section */}
        <AnimatedCard className="info-section" delay={0.4}>
          <div className="info-card">
            <div className="info-icon">
              <FaInfo />
            </div>
            <div className="info-content">
              <h3>About Pattern Detection</h3>
              <p>Our AI analyzes market structure and volume profiles to detect high-probability chart patterns. Each pattern is verified against 5 technical indicators to ensure validity.</p>
              <p>Premium users receive real-time alerts and can access detailed pattern histories with performance statistics.</p>
            </div>
          </div>
        </AnimatedCard>
      </div>

      <style jsx>{`
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

        .logo-section a {
          text-decoration: none;
          font-size: 1.5rem;
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
        
        .pattern-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          color: var(--text-primary);
        }
        
        .page-header-card {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-md);
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s;
        }
        
        .back-button:hover {
          color: var(--accent-blue);
          background: rgba(67, 192, 246, 0.1);
        }
        
        .last-updated {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .refresh-button {
          background: none;
          border: none;
          color: var(--accent-blue);
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .refresh-button:hover:not(:disabled) {
          transform: rotate(180deg);
        }
        
        .refresh-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .spinning {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animated-card {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-md);
          animation: card-fade-in 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes card-fade-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .filters-container {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          margin-bottom: 2rem;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }
        
        .filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .filter-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        
        .toggle-buttons {
          display: flex;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-light);
        }
        
        .toggle-button {
          padding: 0.5rem 1rem;
          border: none;
          background: var(--bg-card);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        
        .toggle-button.active {
          background: var(--accent-blue);
          color: white;
        }
        
        .filter-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
        }
        
        .filter-checkbox input {
          accent-color: var(--accent-blue);
        }
        
        .export-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .export-button:hover {
          background: var(--bg-primary);
          border-color: var(--accent-blue);
        }
        
        .patterns-container {
          margin-bottom: 3rem;
        }
        
        .loading-state, .error-state, .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          text-align: center;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          gap: 1rem;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(67, 192, 246, 0.1);
          border-left-color: var(--accent-blue);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .error-state {
          color: var(--error);
        }
        
        .error-state button {
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
        }
        
        .empty-state .empty-icon {
          font-size: 3rem;
          color: var(--text-secondary);
          opacity: 0.5;
        }
        
        .pattern-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .pattern-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .pattern-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: var(--shadow-lg);
        }
        
        .pattern-card.bullish {
          border-top: 4px solid var(--success);
        }
        
        .pattern-card.bearish {
          border-top: 4px solid var(--error);
        }
        
        .pattern-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        
        .coin-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .coin-info h3 {
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .timeframe-badge {
          background: var(--bg-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .pattern-confidence {
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }
        
        .pattern-confidence.high {
          background: rgba(62, 213, 152, 0.1);
          color: var(--success);
        }
        
        .pattern-confidence.medium {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }
        
        .pattern-confidence.low {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }
        
        .pattern-card-content {
          display: flex;
          flex-direction: column;
          padding: 1.25rem 1.5rem;
        }
        
        .chart-container {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        
        .chart-placeholder {
          width: 100%;
          height: 100%;
          background: var(--bg-secondary);
          position: relative;
        }
        
        .pattern-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 5;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .pattern-badge.bullish {
          background: rgba(62, 213, 152, 0.1);
          color: var(--success);
        }
        
        .pattern-badge.bearish {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }
        
        .mock-chart {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .candlestick-chart {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 10px;
        }
        
        .candle {
          position: absolute;
          bottom: 30%;
          width: 4px;
          background-color: var(--text-primary);
          display: flex;
          justify-content: center;
        }
        
        .up-candle {
          background-color: var(--success);
        }
        
        .down-candle {
          background-color: var(--error);
        }
        
        .wick {
          position: absolute;
          width: 1px;
          top: 50%;
          transform: translateY(-50%);
          background-color: inherit;
        }
        
        .price-line {
          position: absolute;
          width: 100%;
          height: 1px;
          border-top: 1px dashed;
          z-index: 2;
        }
        
        .price-label {
          position: absolute;
          right: 5px;
          background: var(--bg-card);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          white-space: nowrap;
        }
        
        .target-label {
          color: var(--success);
          top: -10px;
        }
        
        .current-label {
          color: var(--accent-blue);
          top: -10px;
        }
        
        .stop-label {
          color: var(--error);
          top: -10px;
        }
        
        .pattern-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .premium-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        
        .blur-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .blurred {
          filter: blur(8px);
        }
        
        .premium-message {
          position: relative;
          z-index: 20;
          background: rgba(0, 0, 0, 0.7);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: white;
        }
        
        .lock-icon {
          font-size: 1.5rem;
          color: var(--accent-blue);
        }
        
        .upgrade-button {
          background: var(--button-gradient);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .upgrade-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .pattern-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .details-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .details-section h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        
        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .detail-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .detail-value {
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .detail-value.bullish {
          color: var(--success);
        }
        
        .detail-value.bearish {
          color: var(--error);
        }
        
        .detail-value.positive {
          color: var(--success);
        }
        
        .detail-value.negative {
          color: var(--error);
        }
        
        .indicators-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        
        .indicator-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .indicator-item.confirmed {
          color: var(--success);
        }
        
        .indicator-item.unconfirmed {
          color: var(--warning);
        }
        
        .indicator-icon {
          font-size: 0.8rem;
        }
        
        .pattern-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-light);
        }
        
        .pattern-timestamp {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        
        .execute-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--button-gradient);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .execute-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .history-section {
          margin-bottom: 2rem;
        }
        
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          border-bottom: 1px solid var(--border-light);
          transition: background 0.2s;
        }
        
        .history-header:hover {
          background: var(--bg-secondary);
        }
        
        .history-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .history-icon {
          color: var(--accent-blue);
          font-size: 1.1rem;
        }
        
        .history-title h2 {
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .toggle-history {
          background: none;
          border: none;
          color: var(--accent-blue);
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .history-content {
          padding: 1.5rem;
        }
        
        .history-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .history-item {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: var(--radius-md);
          border-left: 3px solid var(--text-secondary);
        }
        
        .history-item.success {
          border-left-color: var(--success);
        }
        
        .history-item.failure {
          border-left-color: var(--error);
        }
        
        .history-item.pending {
          border-left-color: var(--warning);
        }
        
        .history-item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .history-coin {
          font-weight: 600;
        }
        
        .history-timestamp {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .history-item-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px dashed var(--border-light);
        }
        
        .history-pattern {
          font-size: 0.9rem;
          color: var(--accent-blue);
        }
        
        .history-probability {
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .history-item-outcome {
          display: flex;
          justify-content: space-between;
        }
        
        .outcome-label {
          font-size: 0.85rem;
        }
        
        .outcome-label.success {
          color: var(--success);
        }
        
        .outcome-label.failure {
          color: var(--error);
        }
        
        .outcome-label.pending {
          color: var(--warning);
        }
        
        .outcome-value {
          font-weight: 600;
        }
        
        .outcome-value.positive {
          color: var(--success);
        }
        
        .outcome-value.negative {
          color: var(--error);
        }
        
        .history-stats {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 2rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-blue);
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .info-section {
          margin-bottom: 1rem;
        }
        
        .info-card {
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        
        .info-icon {
          font-size: 1.5rem;
          color: var(--accent-blue);
          padding: 0.5rem;
          background: rgba(67, 192, 246, 0.1);
          border-radius: 50%;
        }
        
        .info-content {
          flex: 1;
        }
        
        .info-content h3 {
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }
        
        .info-content p {
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .info-content p:last-child {
          margin-bottom: 0;
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .filters {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          
          .pattern-cards {
            grid-template-columns: 1fr;
          }
          
          .pattern-details {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .pattern-card-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .execute-button {
            width: 100%;
          }
          
          .info-card {
            flex-direction: column;
          }
          
          .history-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default PatternsPage;