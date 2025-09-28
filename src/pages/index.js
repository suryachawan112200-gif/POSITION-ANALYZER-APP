// pages/index.js
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

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const selectMarket = (selected) => {
    setMarket(selected);
  };

  const selectPositionType = (selected) => {
    setPositionType(selected);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitData = async (mode) => {
    let data;
    if (mode === 'upload') {
      if (!file) return alert('Please upload an image.');
      data = { image: file.name }; // In real, use FormData
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

    // Placeholder for API call
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   body: mode === 'upload' ? new FormData().append('image', file) : JSON.stringify(data),
    //   headers: mode === 'upload' ? {} : { 'Content-Type': 'application/json' },
    // });
    // const resultData = await response.json();
    // setResult(resultData);

    // Simulate response
    const simulatedResponse = {
      coin: "TRUUSDT",
      market: "futures",
      position_type: "long",
      entry_price: 0.02735,
      current_price: 0.02717,
      profit_loss: "-0.1800 (-0.66%)",
      profitability_comment: "Standard profit/loss.",
      market_trend: "sideways",
      trend_confidence: 70,
      trend_comment: "Market moving sideways. Bullish patterns detected, extending target range and increasing confidence.",
      support_levels: [0.02358, 0.02803, 0.02843, 0.03021, 0.03024, 0.03155],
      resistance_levels: [0.03267, 0.03333, 0.03415, 0.03565, 0.03617, 0.03838],
      detected_patterns: {
        candlesticks: [],
        chart_patterns: ["Falling Wedge"]
      },
      targets: [0.03267, 0.03333],
      stoplosses: [0.02358],
      confidence_level: 75
    };
    setResult(simulatedResponse);
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
          <div className={`tab ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => switchTab('upload')}>Upload Position Image</div>
          <div className={`tab ${activeTab === 'enter' ? 'active' : ''}`} onClick={() => switchTab('enter')}>Enter Position Details</div>
        </div>

        {activeTab === 'upload' && (
          <div className="form-content active">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={() => submitData('upload')}>Upload</button>
          </div>
        )}

        {activeTab === 'enter' && (
          <div className="form-content active">
            <input type="text" placeholder="Coin" value={coin} onChange={(e) => setCoin(e.target.value)} />
            <div className="slider-container">
              <div className={`slider-option ${market === 'Futures' ? 'active' : ''}`} onClick={() => selectMarket('Futures')}>Futures</div>
              <div className={`slider-option ${market === 'Spot' ? 'active' : ''}`} onClick={() => selectMarket('Spot')}>Spot</div>
              <div className={`slider-option ${market === 'Crypto' ? 'active' : ''}`} onClick={() => selectMarket('Crypto')}>Crypto</div>
            </div>
            <div className="slider-container">
              <div className={`slider-option ${positionType === 'Long' ? 'active' : ''}`} onClick={() => selectPositionType('Long')}>Long</div>
              <div className={`slider-option ${positionType === 'Short' ? 'active' : ''}`} onClick={() => selectPositionType('Short')}>Short</div>
            </div>
            <input type="number" placeholder="Entry Price" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button onClick={() => submitData('enter')}>Analyze</button>
          </div>
        )}

        {result && (
          <div id="result" style={{ display: 'block' }}>
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
              {result.support_levels.map((level, idx) => <div key={idx} className="level-item">${level.toFixed(5)}</div>)}
            </div>
            <h4>Resistance Levels:</h4>
            <div className="levels-grid">
              {result.resistance_levels.map((level, idx) => <div key={idx} className="level-item">${level.toFixed(5)}</div>)}
            </div>
            <p><strong>Detected Patterns:</strong> {result.detected_patterns.chart_patterns.join(', ') || 'None'}</p>
            <h4>Targets:</h4>
            <div className="levels-grid">
              {result.targets.map((target, idx) => <div key={idx} className="level-item">${target.toFixed(5)}</div>)}
            </div>
            <h4>Stop Losses:</h4>
            <div className="levels-grid">
              {result.stoplosses.map((sl, idx) => <div key={idx} className="level-item">${sl.toFixed(5)}</div>)}
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

      <style jsx global>{`
        /* Global Styles */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(to bottom, #001f3f, #003366);
          color: white;
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
          background: rgba(0, 0, 0, 0.2);
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #00bfff;
        }

        .language-switcher {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .main-box {
          max-width: 600px;
          width: 90%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 20px;
          margin: 40px 0;
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
        }

        .tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .tab {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px 10px 0 0;
          cursor: pointer;
          margin-right: 10px;
          transition: background 0.3s;
        }

        .tab.active {
          background: rgba(0, 191, 255, 0.5);
        }

        .form-content {
          display: block;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 10px;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .slider-container {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }

        .slider-option {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .slider-option.active {
          background: #00bfff;
        }

        button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(to right, #00bfff, #1e90ff);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
        }

        #result {
          margin-top: 20px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          width: 100%;
          max-width: 700px;
        }

        #result h3 {
          margin-top: 0;
          color: #00bfff;
        }

        #result p {
          margin: 10px 0;
        }

        .levels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .level-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 5px;
          border-radius: 5px;
          text-align: center;
        }

        .instructions {
          display: flex;
          justify-content: space-around;
          width: 90%;
          max-width: 800px;
          margin: 40px 0;
        }

        .step {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          width: 30%;
          transition: transform 0.3s;
        }

        .step:hover {
          transform: translateY(-10px);
        }

        .subscriptions {
          display: flex;
          justify-content: space-around;
          width: 90%;
          max-width: 800px;
          margin-bottom: 40px;
        }

        .sub-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 20px;
          width: 40%;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .sub-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
        }

        @media (max-width: 768px) {
          .instructions, .subscriptions {
            flex-direction: column;
            align-items: center;
          }

          .step, .sub-card {
            width: 80%;
            margin-bottom: 20px;
          }

          #result {
            max-width: 90%;
          }
        }
      `}</style>
    </>
  );
}