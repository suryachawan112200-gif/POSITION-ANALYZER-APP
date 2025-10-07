import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, canAnalyze, incrementAnalysisCount } = useContext(AuthContext);
  
  // NEW STATE for Asset Class
  const [assetClass, setAssetClass] = useState('crypto'); // 'crypto' or 'forex'
  
  // Market state now depends on assetClass
  const [market, setMarket] = useState('Futures'); // 'Futures', 'Spot', or 'Forex'
  const [positionType, setPositionType] = useState('Long');
  const [result, setResult] = useState(null);
  const [coin, setCoin] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // NEW loading state

  const selectAssetClass = (selected) => {
    setAssetClass(selected);
    // Reset market when asset class changes
    if (selected === 'forex') {
        setMarket('Forex');
    } else {
        setMarket('Futures'); // Default crypto to Futures
    }
    setResult(null);
  };
  
  const selectMarket = (selected) => setMarket(selected);
  const selectPositionType = (selected) => setPositionType(selected);

  const submitData = async () => {
    setResult(null);
    setError(null);
    
    if (!canAnalyze()) {
      return alert('You have used your 2 free analyses. Please login and subscribe for more.');
    }

    if (!coin || !entryPrice || !quantity) return alert('Please fill all fields.');
    
    // Determine the market value to send to the backend
    let marketToSend = '';
    if (assetClass === 'forex') {
        marketToSend = 'forex';
    } else {
        marketToSend = market.toLowerCase();
    }

    // JSON Payload updated to include 'asset_class'
    const data = {
      asset_class: assetClass, // 'crypto' or 'forex'
      coin: coin.toUpperCase(),
      market: marketToSend,
      position_type: positionType.toLowerCase(),
      entry_price: parseFloat(entryPrice),
      quantity: parseFloat(quantity),
    };
    
    console.log("Sending JSON to backend:", data);

    setLoading(true);

    try {
      const response = await fetch('https://python-backend-pr.vercel.app/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorDetail}`);
      }

      const resultData = await response.json();
      setResult(resultData);
      incrementAnalysisCount();  // Increment after success
    } catch (err) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };
  
  // Conditional rendering for Market options
  const renderMarketOptions = () => {
    if (assetClass === 'crypto') {
      return (
        <>
            <div
                className={`slider-option ${market === 'Futures' ? 'active' : ''}`}
                onClick={() => selectMarket('Futures')}
            >
                Futures
            </div>
            <div
                className={`slider-option ${market === 'Spot' ? 'active' : ''}`}
                onClick={() => selectMarket('Spot')}
            >
                Spot
            </div>
        </>
      );
    } else { // forex
      return (
        <div 
            className={`slider-option ${market === 'Forex' ? 'active' : ''}`}
            onClick={() => selectMarket('Forex')}
        >
            Forex
        </div>
      );
    }
  };

  const coinPlaceholder = assetClass === 'crypto' ? 'Coin Symbol (e.g., BTCUSDT)' : 'Currency Pair (e.g., EURUSD)';

  return (
    <>
      <header>
        <div className="logo">Position Analyzer 📈</div>
        <select className="language-switcher">
          <option>Eng</option>
          <option>Esp</option>
          <option>Fra</option>
        </select>
        <Link to={user ? '/profile' : '/login'}>
          <div className="profile-icon">👤</div>
        </Link>
      </header>

      <div className="main-box">
        <div className="form-content active">
            {/* NEW: Asset Class Selector */}
            <label className="input-label">Choose Asset Class:</label>
            <div className="slider-container asset-selector">
                <div 
                    className={`slider-option ${assetClass === 'crypto' ? 'active' : ''}`} 
                    onClick={() => selectAssetClass('crypto')}
                >
                    Crypto ₿
                </div>
                <div 
                    className={`slider-option ${assetClass === 'forex' ? 'active' : ''}`} 
                    onClick={() => selectAssetClass('forex')}
                >
                    Forex 💵
                </div>
            </div>

            <input
              type="text"
              placeholder={coinPlaceholder}
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            />
            
            {/* Market Selection based on Asset Class */}
            <label className="input-label">{assetClass === 'crypto' ? 'Choose Crypto Market:' : 'Choose Forex Market:'}</label>
            <div className="slider-container">
                {renderMarketOptions()}
            </div>
            
            <label className="input-label">Choose Position Type:</label>
            <div className="slider-container">
              <div
                className={`slider-option ${positionType === 'Long' ? 'active' : ''}`}
                onClick={() => selectPositionType('Long')}
              >
                Long
              </div>
              <div
                className={`slider-option ${positionType === 'Short' ? 'active' : ''}`}
                onClick={() => selectPositionType('Short')}
              >
                Short
              </div>
            </div>
            <input
              type="number"
              placeholder="Entry Price"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity / Lot Size"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={submitData} disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Position'}
            </button>
        </div>

        {error && <p className="error-message">Error: {error}</p>}
        {loading && <div className="loading-message">Analyzing position... 🚀</div>}
        
        {/* Result Display Block */}
        {result && (
          <div id="result" className="result">
            <h3>Analysis Results 📊</h3>
            <p><strong>Asset:</strong> {result.coin} ({result.asset_class.toUpperCase()})</p>
            <p><strong>Market:</strong> {result.market.charAt(0).toUpperCase() + result.market.slice(1)}</p>
            <p><strong>Position Type:</strong> {result.position_type.charAt(0).toUpperCase() + result.position_type.slice(1)}</p>
            <hr/>
            <p><strong>Entry Price:</strong> ${result.entry_price.toFixed(5)}</p>
            <p><strong>Current Price:</strong> ${result.current_price.toFixed(5)}</p>
            <p><strong>Profit/Loss:</strong> {result.profit_loss || 'N/A'} 💰</p>
            <p><strong>Profitability Comment:</strong> {result.profitability_comment || 'No comment provided.'}</p>
            <hr/>
            <p><strong>Market Trend:</strong> {result.market_trend.charAt(0).toUpperCase() + result.market_trend.slice(1)} (Confidence: {result.trend_confidence}%)</p>
            <p><strong>Trend Comment:</strong> {result.trend_comment}</p>
            
            {/* Enhanced Levels Display */}
            <h4>Support Levels (SL Area):</h4>
            <div className="levels-grid support-grid">
              {result.support_levels?.map((level, idx) => (
                <div key={idx} className="level-item support-item">${level.toFixed(5)}</div>
              ))}
            </div>
            <h4>Resistance Levels (TGT Area):</h4>
            <div className="levels-grid resistance-grid">
              {result.resistance_levels?.map((level, idx) => (
                <div key={idx} className="level-item resistance-item">${level.toFixed(5)}</div>
              ))}
            </div>
            
            <p><strong>Detected Patterns:</strong> {result.detected_patterns?.chart_patterns?.join(', ') || result.detected_patterns?.candlesticks?.join(', ') || 'None'}</p>
            
            <h4>Suggested Targets:</h4>
            <div className="levels-grid">
              {result.targets?.map((target, idx) => (
                <div key={idx} className="level-item target-item">${target.toFixed(5)}</div>
              ))}
            </div>
            <h4>Suggested Stop Losses:</h4>
            <div className="levels-grid">
              {result.market_stoplosses?.map((sl, idx) => (
                <div key={idx} className="level-item stoploss-item">${sl.toFixed(5)}</div>
              ))}
            </div>
            
            <p style={{marginTop: '15px'}}><strong>User Stop Loss:</strong> ${result.user_stoploss?.toFixed(5) || 'N/A'}</p>
            <p><strong>Confidence Level:</strong> {result.confidence_level}%</p>
          </div>
        )}
      </div>

      <div className="instructions">
        <div className="step">
          <h3>1. Choose & Enter</h3>
          <p>Select **Asset Class** and fill details.</p>
        </div>
        <div className="step">
          <h3>2. Get Analysis</h3>
          <p>Click the **Analyze** button.</p>
        </div>
        <div className="step">
          <h3>3. Results</h3>
          <p>View price levels, trend, and confidence.</p>
        </div>
      </div>

      <div className="subscriptions">
        <div className="sub-card">
          <h3>Premium Subscription</h3>
          <p>$29.99 / 30 days</p>
          <Link to="/subscription"><button>Buy Now</button></Link>
        </div>
      </div>
      
      <style jsx global>{`
        /* Global Styles: Neon Blue/Dark Theme */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          /* New Gradient: Dark Blue to Deep Black */
          background: linear-gradient(to bottom, #00122e, #000000); 
          color: #e0f7fa; /* Light Cyan for text */
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-x: hidden;
        }

        header {
          width: 100%;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
        }
        
        .profile-icon {
            font-size: 24px;
            color: #00e5ff;
            cursor: pointer;
            padding: 5px;
            border: 1px solid #00e5ff;
            border-radius: 50%;
        }

        .logo {
          font-size: 28px;
          font-weight: 700;
          color: #00e5ff; /* Neon Blue */
          letter-spacing: 1px;
        }

        .language-switcher {
          background: none;
          border: 1px solid #00e5ff;
          color: #e0f7fa;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 15px;
        }

        .main-box {
          max-width: 650px;
          width: 90%;
          /* Main Card Background */
          background: rgba(0, 50, 80, 0.3); 
          border-radius: 20px;
          padding: 30px;
          margin: 40px 0;
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.4); /* Neon Blue shadow glow */
        }
        
        .input-label {
            display: block;
            margin-top: 15px;
            margin-bottom: 5px;
            font-weight: bold;
            color: #79a1f2; /* Lighter blue label */
            font-size: 0.9em;
        }

        input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 10px;
          border: 1px solid #00e5ff; /* Neon Blue border */
          background: rgba(0, 0, 0, 0.5);
          color: white;
          box-shadow: inset 0 1px 5px rgba(0, 229, 255, 0.2);
        }

        .slider-container {
          display: flex;
          justify-content: space-between;
          margin: 5px 0 20px 0;
          gap: 10px;
        }

        .slider-option {
          flex-grow: 1;
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          transition: background 0.3s, border 0.3s;
          border: 1px solid rgba(0, 229, 255, 0.2);
        }

        .slider-option.active {
          background: #00e5ff; /* Neon Blue active */
          color: #00122e;
          font-weight: bold;
          box-shadow: 0 0 10px #00e5ff;
        }
        
        .asset-selector {
            margin-bottom: 25px;
        }

        button {
          width: 100%;
          padding: 15px;
          /* Button Gradient: Strong Blue */
          background: linear-gradient(to right, #008cff, #0056e6); 
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 900;
          font-size: 1.1em;
          cursor: pointer;
          margin-top: 20px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        button:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(0, 140, 255, 0.7);
        }
        
        button:disabled {
            background: #444;
            cursor: not-allowed;
            opacity: 0.6;
        }

        .loading-message {
            text-align: center;
            padding: 20px;
            font-size: 1.1em;
            color: #00e5ff;
        }
        
        .error-message {
            color: #ff4d4d;
            background: rgba(255, 77, 77, 0.1);
            padding: 10px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
        }

        #result {
          margin-top: 30px;
          padding: 25px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 15px;
          width: 100%;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
          border-left: 5px solid #00e5ff;
        }

        #result h3, #result h4 {
          margin-top: 0;
          color: #00e5ff; /* Cyan headings */
          border-bottom: 1px solid rgba(0, 229, 255, 0.3);
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        
        #result hr {
            border-color: rgba(255, 255, 255, 0.1);
            margin: 15px 0;
        }

        .levels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .level-item {
          background: rgba(255, 255, 255, 0.08);
          padding: 8px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9em;
        }
        
        .resistance-item { border: 1px solid #ff4d4d; color: #ff4d4d; } /* Red for Resistance/TGT */
        .support-item { border: 1px solid #00ff7f; color: #00ff7f; } /* Neon Green for Support/SL */
        .target-item { background: #00e5ff33; border: 1px solid #00e5ff; } 
        .stoploss-item { background: #ff4d4d33; border: 1px solid #ff4d4d; } 

        .instructions {
          display: flex;
          justify-content: space-around;
          width: 90%;
          max-width: 800px;
          margin: 40px 0;
          gap: 20px;
        }

        .step {
          text-align: center;
          padding: 25px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          width: 30%;
          transition: transform 0.3s;
          border-top: 3px solid #00e5ff;
        }

        .step:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 229, 255, 0.3);
        }

        .subscriptions {
          display: flex;
          justify-content: center;
          width: 90%;
          max-width: 600px;
          margin-bottom: 40px;
        }

        .sub-card {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #008cff;
        }

        .sub-card button {
            background: linear-gradient(to right, #00e5ff, #008cff);
            color: #00122e;
            font-weight: 900;
        }

        .sub-card:hover {
          transform: scale(1.03);
          box-shadow: 0 0 25px rgba(0, 140, 255, 0.7);
        }

        @media (max-width: 768px) {
          .instructions {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .step {
            width: 90%;
          }

          .main-box, #result, .subscriptions {
            max-width: 95%;
          }
        }
      `}</style>
    </>
  );
}