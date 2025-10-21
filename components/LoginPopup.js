import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPopup({ onClose }) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="logo-section">
          <span className="logo-icon">🤖</span>
          <h2>Login Required</h2>
        </div>
        <p>You've reached the free analysis limit (2 per session). Log in or sign up to continue analyzing unlimited positions.</p>
        <Link href="/login">
          <button className="cta-btn primary" onClick={handleLoginRedirect}>
            Login / Sign Up 🔐
          </button>
        </Link>
      </div>

      <style jsx>{`
        :root {
          --bg-primary: #FFFFFF;
          --accent-blue: #4B9BFF;
          --accent-purple: #7A5CFF;
          --gradient: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          --text-primary: #1A1A1A;
          --text-muted: #6B7280;
          --error: #EF4444;
          --border-soft: #E5E7EB;
          --shadow-subtle: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .login-popup-overlay {
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

        .login-popup {
          background: var(--bg-primary) !important;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-subtle);
          max-width: 400px;
          width: 90%;
          text-align: center;
        }

        .close-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: var(--error);
          color: #FFFFFF;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .close-btn:hover {
          background: #FF5555;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        h2 {
          font-size: 1.8rem;
          font-weight: 800;
          background: var(--gradient);
          -webkit-background-clip: text;
          color: transparent;
        }

        p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .cta-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
          background: var(--gradient);
          color: #FFFFFF;
        }

        .cta-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 480px) {
          .login-popup {
            padding: 1rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          p,
          .cta-btn {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
