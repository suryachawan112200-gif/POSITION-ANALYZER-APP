import { useRouter } from "next/router";
import Link from "next/link";
import { FaRobot, FaTimes, FaLock, FaUserPlus, FaChartLine } from "react-icons/fa";

export default function LoginPopup({ onClose }) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    console.log("Redirecting to /login");
    router.push("/login");
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup-modal">
        <button 
          className="popup-close-btn" 
          onClick={onClose}
          aria-label="Close popup"
        >
          <FaTimes />
        </button>
        
        <div className="popup-header">
          <div className="popup-logo-section">
            <FaRobot className="popup-logo-icon" />
            <h2 className="popup-title">AIVISOR</h2>
          </div>
          <h3 className="popup-subtitle">Login Required</h3>
        </div>
        
        <div className="popup-content">
          <div className="popup-icon">
            <FaLock />
          </div>
          
          <p className="popup-message">
            You've reached the free analysis limit (2 per session). 
            Log in or sign up to continue analyzing unlimited positions.
          </p>
          
          <div className="popup-benefits">
            <div className="benefit-item">
              <FaChartLine className="benefit-icon" />
              <span>Unlimited analyses per day</span>
            </div>
            <div className="benefit-item">
              <FaUserPlus className="benefit-icon" />
              <span>Advanced trading insights</span>
            </div>
          </div>
          
          <button 
            className="popup-login-btn"
            onClick={handleLoginRedirect}
          >
            Login / Sign Up
          </button>
          
          <div className="popup-footer">
            <p>Join 3,000+ professional traders</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --bg-primary: #FFFFFF;
          --bg-secondary: #F8FBFF;
          --bg-card: #FFFFFF;
          --accent-blue: #43C0F6;
          --accent-purple: #7A5CFF;
          --text-primary: #333333;
          --text-secondary: #6B7280;
          --text-muted: #9CA3AF;
          --success: #3ED598;
          --error: #EF4444;
          --warning: #F59E0B;
          --button-gradient: linear-gradient(135deg, #43C0F6, #3AEAB6);
          --border-light: #E5E7EB;
          --border-medium: #D1D5DB;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          --radius-sm: 0.25rem;
          --radius-md: 0.5rem;
          --radius-lg: 0.75rem;
          --radius-xl: 1rem;
        }

        [data-theme="dark"] {
          --bg-primary: #0F172A;
          --bg-secondary: #1E293B;
          --bg-card: #1E293B;
          --text-primary: #F1F5F9;
          --text-secondary: #CBD5E1;
          --text-muted: #94A3B8;
          --border-light: #334155;
          --border-medium: #475569;
        }

        .login-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 5000;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .login-popup-modal {
          background: var(--bg-card);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-xl);
          max-width: 450px;
          width: 95%;
          position: relative;
          animation: modalAppear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .popup-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--error);
          color: #FFFFFF;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .popup-close-btn:hover {
          background: #ff5555;
          transform: scale(1.1);
        }

        .popup-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .popup-logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .popup-logo-icon {
          font-size: 2.5rem;
          color: var(--accent-blue);
        }

        .popup-title {
          font-weight: 800;
          font-size: 2rem;
          background: linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .popup-subtitle {
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .popup-content {
          text-align: center;
        }

        .popup-icon {
          font-size: 3rem;
          color: var(--accent-blue);
          margin: 1rem 0;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .popup-message {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .popup-benefits {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          background: rgba(67, 192, 246, 0.05);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(67, 192, 246, 0.1);
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .benefit-icon {
          color: var(--accent-blue);
          font-size: 1.2rem;
        }

        .popup-login-btn {
          background: var(--button-gradient);
          color: #FFFFFF;
          padding: 1rem 2rem;
          border: none;
          border-radius: 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--shadow-md);
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .popup-login-btn:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        .popup-login-btn:active {
          transform: translateY(-1px);
        }

        .popup-footer {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 480px) {
          .login-popup-modal {
            padding: 2rem 1.5rem;
          }
          
          .popup-title {
            font-size: 1.8rem;
          }
          
          .popup-subtitle {
            font-size: 1.3rem;
          }
          
          .popup-icon {
            font-size: 2.5rem;
          }
          
          .popup-message {
            font-size: 0.9rem;
          }
          
          .popup-login-btn {
            padding: 0.9rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}