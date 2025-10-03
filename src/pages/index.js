import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upload');
  const [market, setMarket] = useState('Futures');
  const [positionType, setPositionType] = useState('Long');
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);
  const [coin, setCoin] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);

  const switchTab = (tab) => setActiveTab(tab);
  const selectMarket = (selected) => setMarket(selected);
  const selectPositionType = (selected) => setPositionType(selected);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const submitData = async (mode) => {
    setResult(null);
    setError(null);

    let data;
    if (mode === 'upload') {
      if (!file) return alert('Please upload an image.');
      // Note: Backend doesn't support image upload yet. This is a placeholder.
      data = { image: file.name };
    } else {
      if (!coin || !entryPrice || !quantity) return alert('Please fill all fields.');
      data = {
        coin,
        market: market.toLowerCase(),
        position_type: positionType.toLowerCase(),
        entry_price: parseFloat(entryPrice),
        quantity: parseFloat(quantity),
      };
    }

    try {
      const response = await fetch('https://python-backend-pr.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resultData = await response.json();
      setResult(resultData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <header>
        <div className="logo">Position Analyzer</div>
        <select className="language-switcher">
          <option>Eng</option>
          <option>Esp</option>
          <option>Fra</option>
        </select>
      </header>

      <div className="main-box">
        <div className="tabs">
          <div className={`tab ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => switchTab('upload')}>
            Upload Position Image
          </div>
          <div className={`tab ${activeTab === 'enter' ? 'active' : ''}`} onClick={() => switchTab('enter')}>
            Enter Position Details
          </div>
        </div>

        {activeTab === 'upload' && (
          <div className="form-content active">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={() => submitData('upload')}>Upload</button>
          </div>
        )}

        {activeTab === 'enter' && (
          <div className="form-content active">
            <input
              type="text"
              placeholder="Coin"
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            />
            <div className="slider-container">
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
              <div
                className={`slider-option ${market === 'Crypto' ? 'active' : ''}`}
                onClick={() => selectMarket('Crypto')}
              >
                Crypto
              </div>
            </div>
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
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={() => submitData('enter')}>Analyze</button>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {result && (
          <div id="result" className="result">
            <h3>Analysis Results 📊</h3>
            <p><strong>Coin:</strong> {result.coin}</p>
            <p><strong>Market:</strong> {result.market.charAt(0).toUpperCase() + result.market.slice(1)}</p>
            <p><strong>Position Type:</strong> {result.position_type.charAt(0).toUpperCase() + result.position_type.slice(1)}</p>
            <p><strong>Entry Price:</strong> ${result.entry_price.toFixed(5)}</p>
            <p><strong>Current Price:</strong> ${result.current_price.toFixed(5)}</p>
            <p><strong>Profit/Loss:</strong> {result.profit_loss} 💰</p>
            <p><strong>Profitability Comment:</strong> {result.profitability_comment}</p>
            <p><strong>Market Trend:</strong> {result.market_trend.charAt(0).toUpperCase() + result.market_trend.slice(1)} (Confidence: {result.trend_confidence}%)</p>
            <p><strong>Trend Comment:</strong> {result.trend_comment}</p>
            <h4>Support Levels:</h4>
            <div className="levels-grid">
              {result.support_levels.map((level, idx) => (
                <div key={idx} className="level-item">${level.toFixed(5)}</div>
              ))}
            </div>
            <h4>Resistance Levels:</h4>
            <div className="levels-grid">
              {result.resistance_levels.map((level, idx) => (
                <div key={idx} className="level-item">${level.toFixed(5)}</div>
              ))}
            </div>
            <p><strong>Detected Patterns:</strong> {result.detected_patterns?.chart_patterns?.join(', ') || 'None'}</p>
            <h4>Targets:</h4>
            <div className="levels-grid">
              {result.targets.map((target, idx) => (
                <div key={idx} className="level-item">${target.toFixed(5)}</div>
              ))}
            </div>
            <h4>Stop Losses:</h4>
            <div className="levels-grid">
              {result.market_stoplosses.map((sl, idx) => (  // Changed from stoplosses to market_stoplosses
                <div key={idx} className="level-item">${sl.toFixed(5)}</div>
              ))}
              <p><strong>User Stop Loss:</strong> ${result.user_stoploss.toFixed(5)}</p>
            </div>
            <p><strong>Confidence Level:</strong> {result.confidence_level}%</p>
          </div>
        )}
      </div>

      <div className="instructions">
        <div className="step">
          <h3>1. Choose Input Method</h3>
          <p>Select upload or enter details.</p>
        </div>
        <div className="step">
          <h3>2. Upload/Enter Details</h3>
          <p>Provide your position info.</p>
        </div>
        <div className="step">
          <h3>3. View Analysis Results</h3>
          <p>See profit/loss and more.</p>
        </div>
      </div>

      <div className="subscriptions">
        <div className="sub-card">
          <h3>Basic Plan</h3>
          <p>$9.99/month</p>
          <button>Subscribe</button>
        </div>
        <div className="sub-card">
          <h3>Pro Plan</h3>
          <p>$19.99/month</p>
          <button>Subscribe</button>
        </div>
      </div>
    </>
  );
}