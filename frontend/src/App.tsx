import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="card">
        <h1>We're Building Something Amazing!</h1>
        <div className="icon-container">
          <div className="icon">🔨</div>
          <div className="icon rotating">⚙️</div>
          <div className="icon">🔧</div>
        </div>
        <p>Our team is working hard to bring you an incredible experience. Stay tuned!</p>
        <div className="progress-container">
          <p>Development Progress:</p>
          <div className="progress-controls">
            <button onClick={() => setCount((prevCount) => Math.max(0, prevCount - 1))}>-</button>
            <span className="progress-count">{count}%</span>
            <button onClick={() => setCount((prevCount) => Math.min(100, prevCount + 1))}>+</button>
          </div>
        </div>
        <p className="footer">Check back soon for updates!</p>
      </div>
    </div>
  );
}

export default App;

