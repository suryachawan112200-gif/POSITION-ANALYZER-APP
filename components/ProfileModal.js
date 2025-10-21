import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function ProfileModal({ onClose }) {
  const { user, logout, changePassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(null);
    try {
      await changePassword(newPassword);
      setSuccess("Password changed successfully!");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="logo-section">
          <span className="logo-icon">🤖</span>
          <h2>Profile</h2>
        </div>
        {!user ? (
          <>
            <p>You are not logged in.</p>
            <Link href="/login">
              <button className="cta-btn primary">Login / Sign Up 🔐</button>
            </Link>
          </>
        ) : (
          <>
            <div className="user-info">
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handleChangePassword} className="cta-btn primary">
                Change Password 🔄
              </button>
            </div>
            <button onClick={handleLogout} className="cta-btn secondary">
              Logout 🚪
            </button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </>
        )}
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
          --success: #3ED598;
          --border-soft: #E5E7EB;
          --shadow-subtle: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .profile-overlay {
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

        .profile-modal {
          background: var(--bg-primary) !important;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-subtle);
          max-width: 400px;
          width: 90%;
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

        .user-info {
          margin-bottom: 1rem;
        }

        .user-info p {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        input {
          padding: 0.75rem;
          border: 1px solid var(--border-soft);
          border-radius: 0.5rem;
          font-size: 0.9rem;
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        input:focus {
          outline: none;
          border-color: var(--accent-blue);
        }

        .cta-btn {
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .cta-btn.primary {
          background: var(--gradient);
          color: #FFFFFF;
        }

        .cta-btn.secondary {
          background: var(--bg-primary);
          border: 1px solid var(--border-soft);
          color: var(--text-primary);
        }

        .cta-btn:hover {
          transform: scale(1.05);
        }

        .error {
          color: var(--error);
          font-size: 0.8rem;
          text-align: center;
          margin-top: 0.5rem;
        }

        .success {
          color: var(--success);
          font-size: 0.8rem;
          text-align: center;
          margin-top: 0.5rem;
        }

        @media (max-width: 480px) {
          .profile-modal {
            padding: 1rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          input,
          .cta-btn {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
