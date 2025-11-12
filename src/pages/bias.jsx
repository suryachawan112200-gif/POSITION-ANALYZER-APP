import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaSync, FaChartLine, FaFilter, FaStar, FaDownload, FaLock, FaArrowRight, FaCheck, FaExclamationTriangle, FaChartBar, FaInfo, FaArrowUp, FaArrowDown, FaHistory, FaHome } from 'react-icons/fa';
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

const BiasPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [biases, setBiases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showOnlyStrong, setShowOnlyStrong] = useState(false);
  const [biasDirection, setBiasDirection] = useState('all');
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [biasHistory, setBiasHistory] = useState([]);
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
    fetchBiases();
    fetchBiasHistory();
    // Poll every 3 minutes
    const interval = setInterval(fetchBiases, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchBiases = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/premium/bias`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      
      // Process the bias data
      let processedBiases = data.biases || [];
      
      // Add some mock data for visualization
      processedBiases = processedBiases.map(bias => ({
        ...bias,
        timeDetected: bias.timestamp || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        strength: bias.strength || Math.floor(Math.random() * 25) + 75,
        dayChange: (Math.random() * 10 - 5).toFixed(2),
        expectedMove: (Math.random() * 5 + 2).toFixed(2),
        hourlyChange: (Math.random() * 3 - 1).toFixed(2),
        volume24h: `$${(Math.random() * 100 + 50).toFixed(1)}M`,
        marketCap: `$${(Math.random() * 10 + 1).toFixed(2)}B`,
        currentPrice: `$${(Math.random() * 1000 + 100).toFixed(2)}`,
        priceTarget: (price => `$${(price * (1 + (Math.random() * 0.1))).toFixed(2)}`)(parseFloat((Math.random() * 1000 + 100).toFixed(2))),
        supportLevel: (price => `$${(price * (1 - (Math.random() * 0.05))).toFixed(2)}`)(parseFloat((Math.random() * 1000 + 100).toFixed(2))),
        indicators: [
          { name: 'MA Cross', value: Math.random() > 0.3 ? 'Bullish' : 'Bearish' },
          { name: 'RSI', value: Math.floor(Math.random() * 100) },
          { name: 'OBV', value: Math.random() > 0.5 ? 'Rising' : 'Falling' },
          { name: 'MACD', value: Math.random() > 0.4 ? 'Bullish' : 'Bearish' }
        ]
      }));
      
      setBiases(processedBiases);
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching biases:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchBiasHistory = () => {
    // This would be an API call in a real app
    // For now, using mock data
    const mockHistory = [
      { 
        timestamp: '10:15 AM', 
        coin: 'BTCUSDT', 
        bias: 'Bullish', 
        strength: 82,
        outcome: 'success',
        movePercent: '+4.2%'
      },
      { 
        timestamp: '9:30 AM', 
        coin: 'ETHUSDT', 
        bias: 'Bullish', 
        strength: 79,
        outcome: 'success',
        movePercent: '+3.1%'
      },
      { 
        timestamp: '8:45 AM', 
        coin: 'SOLUSDT', 
        bias: 'Bullish', 
        strength: 76,
        outcome: 'pending',
        movePercent: '+1.2%'
      },
      { 
        timestamp: '8:00 AM', 
        coin: 'BNBUSDT', 
        bias: 'Bearish', 
        strength: 80,
        outcome: 'success',
        movePercent: '-1.5%'
      },
      { 
        timestamp: '7:15 AM', 
        coin: 'AVAXUSDT', 
        bias: 'Bearish', 
        strength: 75,
        outcome: 'failure',
        movePercent: '+2.8%'
      }
    ];
    
    setBiasHistory(mockHistory);
  };

  // Filter biases based on user selections
  const filteredBiases = biases
    .filter(bias => {
      if (showOnlyStrong) {
        return bias.strength >= 80;
      }
      return true;
    })
    .filter(bias => {
      if (biasDirection === 'all') return true;
      if (biasDirection === 'bullish') return bias.bias === 'Bullish';
      if (biasDirection === 'bearish') return bias.bias === 'Bearish';
      return true;
    });

  return (
    <>
      <Head>
        <title>Market Bias | AIVISOR</title>
        <meta name="description" content="Detailed market bias analysis for crypto assets" />
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

      <div className="bias-page">
        {/* Sub-header with back button */}
        <AnimatedCard className="page-header-card" delay={0.1}>
          <div className="page-header">
            <button 
              onClick={() => router.push('/')} 
              className="back-button"
            >
              <FaArrowLeft /> Back
            </button>
            
            <h1>Market Bias Analysis</h1>
            
            <div className="last-updated">
              <span>Last updated: {lastUpdated || 'N/A'}</span>
              <button 
                className="refresh-button" 
                onClick={fetchBiases}
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
              <label className="filter-label">Bias Direction:</label>
              <div className="toggle-buttons">
                <button 
                  className={`toggle-button ${biasDirection === 'all' ? 'active' : ''}`}
                  onClick={() => setBiasDirection('all')}
                >
                  All
                </button>
                <button 
                  className={`toggle-button ${biasDirection === 'bullish' ? 'active' : ''}`}
                  onClick={() => setBiasDirection('bullish')}
                >
                  Bullish
                </button>
                <button 
                  className={`toggle-button ${biasDirection === 'bearish' ? 'active' : ''}`}
                  onClick={() => setBiasDirection('bearish')}
                >
                  Bearish
                </button>
              </div>
            </div>
            
            <div className="filter-group">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={showOnlyStrong}
                  onChange={() => setShowOnlyStrong(!showOnlyStrong)}
                />
                Strong Bias Only ({'>'}80%)
              </label>
            </div>
            
            <button className="export-button">
              <FaDownload /> Export CSV
            </button>
          </div>
        </AnimatedCard>
        
        {/* Content */}
        <div className="biases-container">
          {loading && !biases.length ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading market bias data...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <FaExclamationTriangle />
              <p>Error loading bias data: {error}</p>
              <button onClick={fetchBiases}>Try Again</button>
            </div>
          ) : filteredBiases.length === 0 ? (
            <div className="empty-state">
              <FaChartBar className="empty-icon" />
              <h3>No market bias data match your filters</h3>
              <p>Try changing your filter settings or check back later.</p>
            </div>
          ) : (
            <div className="bias-cards">
              {filteredBiases.map((bias, index) => (
                <AnimatedCard 
                  key={index} 
                  className={`bias-card ${bias.bias === 'Bullish' ? 'bullish' : 'bearish'}`}
                  delay={0.1 + (index * 0.05)}
                >
                  <div className="bias-card-header">
                    <div className="coin-info">
                      <h3>{bias.symbol}</h3>
                      <div className="coin-stats">
                        <span className="mcap">{bias.marketCap}</span>
                        <span className="vol">Vol: {bias.volume24h}</span>
                      </div>
                    </div>
                    <div className={`bias-strength ${bias.strength >= 80 ? 'high' : bias.strength >= 70 ? 'medium' : 'low'}`}>
                      {bias.strength}% Strength
                    </div>
                  </div>
                  
                  <div className="bias-card-content">
                    <div className="chart-container" ref={el => chartRefs.current[index] = el}>
                      {isPremium ? (
                        <div className="chart-placeholder">
                          <div className={`bias-badge ${bias.bias === 'Bullish' ? 'bullish' : 'bearish'}`}>
                            {bias.bias} Bias
                          </div>
                          
                          <div className="mock-chart">
                            {/* Price trend line */}
                            <div className="trend-line">
                              {/* Candlestick chart */}
                              <div className="candlestick-chart">
                                {[...Array(15)].map((_, i) => {
                                  // For bullish bias, more green candles, otherwise more red
                                  const isUp = bias.bias === 'Bullish' 
                                    ? Math.random() > 0.3 
                                    : Math.random() > 0.7;
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
                                  Target: {bias.priceTarget}
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
                                  Current: {bias.currentPrice}
                                </span>
                              </div>
                              
                              {/* Support Level Line */}
                              <div 
                                className="price-line support-line"
                                style={{ 
                                  top: '75%',
                                  borderColor: 'var(--error)' 
                                }}
                              >
                                <span className="price-label support-label">
                                  Support: {bias.supportLevel}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bias-overlay">
                              <div className={`bias-direction ${bias.bias === 'Bullish' ? 'bullish' : 'bearish'}`}>
                                {bias.bias === 'Bullish' ? (
                                  <FaArrowUp className="direction-icon" />
                                ) : (
                                  <FaArrowDown className="direction-icon" />
                                )}
                                <div className="bias-percentage">
                                  Expected: {bias.bias === 'Bullish' ? '+' : '-'}{bias.expectedMove}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="premium-overlay">
                          <div className="blur-container">
                            <div className="chart-placeholder blurred">
                              <div className={`bias-badge ${bias.bias === 'Bullish' ? 'bullish' : 'bearish'}`}>
                                {bias.bias} Bias
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
                            <p>Unlock Premium Analysis</p>
                            <Link href="/subscribe">
                              <button className="upgrade-button">Upgrade</button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bias-details">
                      <div className="details-section">
                        <h4>Market Performance</h4>
                        <div className="performance-stats">
                          <div className="performance-item">
                            <span className="stat-label">24h Change:</span>
                            <span className={`stat-value ${parseFloat(bias.dayChange) >= 0 ? 'positive' : 'negative'}`}>
                              {parseFloat(bias.dayChange) >= 0 ? '+' : ''}{bias.dayChange}%
                            </span>
                          </div>
                          <div className="performance-item">
                            <span className="stat-label">1h Change:</span>
                            <span className={`stat-value ${parseFloat(bias.hourlyChange) >= 0 ? 'positive' : 'negative'}`}>
                              {parseFloat(bias.hourlyChange) >= 0 ? '+' : ''}{bias.hourlyChange}%
                            </span>
                          </div>
                          <div className="performance-item">
                            <span className="stat-label">Expected Move:</span>
                            <span className={`stat-value ${bias.bias === 'Bullish' ? 'positive' : 'negative'}`}>
                              {bias.bias === 'Bullish' ? '+' : '-'}{bias.expectedMove}%
                            </span>
                          </div>
                          <div className="performance-item">
                            <span className="stat-label">Confidence:</span>
                            <span className="stat-value">{bias.strength}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="details-section">
                        <h4>Technical Indicators</h4>
                        <div className="indicators-list">
                          {bias.indicators.map((indicator, idx) => (
                            <div key={idx} className="indicator-item">
                              <span className="indicator-name">{indicator.name}:</span>
                              <span className={`indicator-value ${
                                indicator.value === 'Bullish' || indicator.value === 'Rising' ? 'positive' : 
                                indicator.value === 'Bearish' || indicator.value === 'Falling' ? 'negative' : 
                                typeof indicator.value === 'number' ? 
                                  (indicator.name === 'RSI' ? 
                                    (indicator.value > 70 ? 'negative' : 
                                     indicator.value < 30 ? 'positive' : '') : 
                                  '') : ''
                              }`}>
                                {indicator.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bias-card-footer">
                    <div className="bias-timestamp">
                      <FaSync /> Updated {bias.timeDetected}
                    </div>
                    <button className="execute-button">
                      Trade With Bias <FaArrowRight />
                    </button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
        
        {/* Summary Section */}
        <AnimatedCard className="summary-section" delay={0.3}>
          <div className="section-header">
            <h2>Market Bias Summary</h2>
            <span className="summary-updated">as of {lastUpdated}</span>
          </div>
          
          <div className="summary-container">
            <div className="summary-stats">
              <div className="summary-stat">
                <span className="stat-number">{biases.filter(b => b.bias === 'Bullish').length}</span>
                <span className="stat-label bullish">Bullish Assets</span>
              </div>
              <div className="summary-stat">
                <span className="stat-number">{biases.filter(b => b.bias === 'Bearish').length}</span>
                <span className="stat-label bearish">Bearish Assets</span>
              </div>
              <div className="summary-stat">
                <span className="stat-number">{biases.filter(b => b.strength >= 80).length}</span>
                <span className="stat-label">Strong Signals</span>
              </div>
            </div>
            
            <div className="market-direction">
              <div className="direction-label">Overall Market Direction:</div>
              <div className={`direction-value ${biases.filter(b => b.bias === 'Bullish').length > biases.filter(b => b.bias === 'Bearish').length ? 'bullish' : 'bearish'}`}>
                {biases.filter(b => b.bias === 'Bullish').length > biases.filter(b => b.bias === 'Bearish').length ? 'Bullish' : 'Bearish'}
                {biases.filter(b => b.bias === 'Bullish').length > biases.filter(b => b.bias === 'Bearish').length ? (
                  <FaArrowUp className="direction-icon" />
                ) : (
                  <FaArrowDown className="direction-icon" />
                )}
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        {/* History Section */}
        <AnimatedCard className="history-section" delay={0.4}>
          <div className="history-header" onClick={() => setHistoryExpanded(!historyExpanded)}>
            <div className="history-title">
              <FaHistory className="history-icon" />
              <h2>Bias Analysis History</h2>
            </div>
            <button className="toggle-history">
              {historyExpanded ? '−' : '+'}
            </button>
          </div>
          
          {historyExpanded && (
            <div className="history-content">
              <div className="history-grid">
                {biasHistory.map((item, index) => (
                  <div key={index} className={`history-item ${item.outcome}`}>
                    <div className="history-item-header">
                      <div className="history-coin">{item.coin}</div>
                      <div className="history-timestamp">{item.timestamp}</div>
                    </div>
                    <div className="history-item-details">
                      <div className="history-bias">{item.bias}</div>
                      <div className="history-strength">{item.strength}%</div>
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
                  <div className="stat-value">82%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
                <div className="stat">
                  <div className="stat-value">+2.8%</div>
                  <div className="stat-label">Avg. Move</div>
                </div>
                <div className="stat">
                  <div className="stat-value">70%</div>
                  <div className="stat-label">Bearish Success</div>
                </div>
              </div>
            </div>
          )}
        </AnimatedCard>
        
        {/* Info Section */}
        <AnimatedCard className="info-section" delay={0.5}>
          <div className="info-card">
            <div className="info-icon">
              <FaInfo />
            </div>
            <div className="info-content">
              <h3>About Market Bias Analysis</h3>
              <p>Our proprietary AI algorithm analyzes over 20 technical indicators, on-chain metrics, and price action patterns to determine the most likely market bias direction for each crypto asset.</p>
              <p>Premium users receive real-time bias alerts and detailed movement expectations based on historical market behavior.</p>
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
        
        .bias-page {
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
        
        .biases-container {
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
        
        .bias-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .bias-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .bias-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: var(--shadow-lg);
        }
        
        .bias-card.bullish {
          border-top: 4px solid var(--success);
        }
        
        .bias-card.bearish {
          border-top: 4px solid var(--error);
        }
        
        .bias-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        
        .coin-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .coin-info h3 {
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .coin-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        
        .bias-strength {
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }
        
        .bias-strength.high {
          background: rgba(62, 213, 152, 0.1);
          color: var(--success);
        }
        
        .bias-strength.medium {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }
        
        .bias-strength.low {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }
        
        .bias-card-content {
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
        
        .bias-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 5;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .bias-badge.bullish {
          background: rgba(62, 213, 152, 0.1);
          color: var(--success);
        }
        
        .bias-badge.bearish {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }
        
        .mock-chart {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .trend-line {
          width: 100%;
          height: 100%;
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
        
        .support-label {
          color: var(--error);
          top: -10px;
        }
        
        .bias-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .bias-direction {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .bias-direction.bullish .direction-icon {
          font-size: 3rem;
          color: var(--success);
        }
        
        .bias-direction.bearish .direction-icon {
          font-size: 3rem;
          color: var(--error);
        }
        
        .bias-percentage {
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          background: rgba(0, 0, 0, 0.1);
        }
        
        .bullish .bias-percentage {
          color: var(--success);
        }
        
        .bearish .bias-percentage {
          color: var(--error);
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
        
        .bias-details {
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
        
        .performance-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        
        .performance-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .stat-value {
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .stat-value.positive {
          color: var(--success);
        }
        
        .stat-value.negative {
          color: var(--error);
        }
        
        .indicators-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        
        .indicator-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.5rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
        }
        
        .indicator-name {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        
        .indicator-value {
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .indicator-value.positive {
          color: var(--success);
        }
        
        .indicator-value.negative {
          color: var(--error);
        }
        
        .bias-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-light);
        }
        
        .bias-timestamp {
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
        
        .summary-section {
          margin-bottom: 2rem;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1rem;
        }
        
        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .summary-updated {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: normal;
        }
        
        .summary-container {
          padding: 1.5rem;
        }
        
        .summary-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .summary-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .stat-label.bullish {
          color: var(--success);
        }
        
        .stat-label.bearish {
          color: var(--error);
        }
        
        .market-direction {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          flex-wrap: wrap;
        }
        
        .direction-label {
          font-size: 1.1rem;
          font-weight: 500;
        }
        
        .direction-value {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;
          font-weight: 700;
        }
        
        .direction-value.bullish {
          color: var(--success);
        }
        
        .direction-value.bearish {
          color: var(--error);
        }
        
        .direction-icon {
          font-size: 1.2rem;
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
        
        .history-bias {
          font-size: 0.9rem;
          color: var(--accent-blue);
        }
        
        .history-strength {
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
          
          .bias-cards {
            grid-template-columns: 1fr;
          }
          
          .bias-details {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .bias-card-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .execute-button {
            width: 100%;
          }
          
          .summary-stats {
            flex-direction: column;
            align-items: center;
          }
          
          .market-direction {
            flex-direction: column;
            text-align: center;
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

export default BiasPage;