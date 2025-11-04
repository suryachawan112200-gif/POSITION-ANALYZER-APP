import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaUser, FaEdit, FaSignOutAlt, FaSave, FaStar, FaChartLine, FaTrophy } from "react-icons/fa";

export default function ProfileModal({ onClose }) {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("starter");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setExperience(user.experience || "starter");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setError(null);
    setSuccess(null);
    try {
      // Simulate profile update (replace with your actual update function)
      await new Promise(resolve => setTimeout(resolve, 500));
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
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

  const getExperienceLabel = (exp) => {
    switch(exp) {
      case 'starter': return 'Starter Trader';
      case 'intermediate': return 'Intermediate Trader';
      case 'expert': return 'Expert Trader';
      default: return 'Starter Trader';
    }
  };

  const getExperienceIcon = (exp) => {
    switch(exp) {
      case 'starter': return <FaStar />;
      case 'intermediate': return <FaChartLine />;
      case 'expert': return <FaTrophy />;
      default: return <FaStar />;
    }
  };

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        
        {!user ? (
          <div className="profile-content">
            <div className="logo-section">
              <div className="logo-icon">🤖</div>
              <h2 className="logo-text">AIVISOR</h2>
            </div>
            <p className="login-prompt">You are not logged in.</p>
            <Link href="/login">
              <button className="cta-btn primary">Login / Sign Up</button>
            </Link>
          </div>
        ) : (
          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  <span className="user-initial">
                    {name ? name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="user-info">
                  <h3 className="user-name">{name || "User"}</h3>
                  <div className="user-experience">
                    <span className="experience-icon">{getExperienceIcon(experience)}</span>
                    <span className="experience-label">{getExperienceLabel(experience)}</span>
                  </div>
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled
                  />
                  <p className="field-note">Email cannot be changed</p>
                </div>
                
                <div className="form-group">
                  <label>Phone (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="form-group">
                  <label>Trading Experience</label>
                  <div className="experience-options">
                    {['starter', 'intermediate', 'expert'].map((exp) => (
                      <button
                        key={exp}
                        className={`experience-option ${experience === exp ? 'selected' : ''}`}
                        onClick={() => setExperience(exp)}
                      >
                        <span className="exp-icon">{getExperienceIcon(exp)}</span>
                        <span className="exp-label">{getExperienceLabel(exp)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-actions">
                  <button onClick={() => setIsEditing(false)} className="cta-btn secondary">
                    Cancel
                  </button>
                  <button onClick={handleSaveProfile} className="cta-btn primary">
                    <FaSave /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{email}</span>
                </div>
                
                {phone && (
                  <div className="detail-item">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{phone}</span>
                  </div>
                )}
                
                <div className="detail-item">
                  <span className="detail-label">Experience</span>
                  <span className="detail-value experience-badge">
                    <span className="exp-icon-small">{getExperienceIcon(experience)}</span>
                    {getExperienceLabel(experience)}
                  </span>
                </div>
                
                <button
                  onClick={() => setIsEditing(true)}
                  className="cta-btn secondary edit-btn"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            )}
            
            <div className="profile-actions">
              <button onClick={handleLogout} className="cta-btn logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </div>
            
            {error && <div className="message error"><span className="error-icon">⚠️</span> {error}</div>}
            {success && <div className="message success"><span className="success-icon">✅</span> {success}</div>}
          </div>
        )}
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

        .profile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .profile-modal {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-xl);
          max-width: 450px;
          width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalAppear 0.3s ease-out;
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--error);
          color: #FFFFFF;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .close-btn:hover {
          background: #ff5555;
          transform: scale(1.1);
        }

        .profile-content {
          padding-top: 1rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .logo-icon {
          font-size: 2.5rem;
        }

        .logo-text {
          font-weight: 800;
          font-size: 2rem;
          background: linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-prompt {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .profile-avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .avatar-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-lg);
          border: 3px solid white;
        }

        .user-initial {
          font-size: 3rem;
          color: #FFFFFF;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .user-info {
          text-align: center;
        }

        .user-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .user-experience {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(67, 192, 246, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          width: fit-content;
          margin: 0 auto;
        }

        .experience-icon {
          color: var(--accent-blue);
          font-size: 1rem;
        }

        .experience-label {
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .profile-form {
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          text-align: left;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.9rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 1rem;
          background: var(--bg-card);
          color: var(--text-primary);
          transition: all 0.3s;
        }

        [data-theme="dark"] .form-group input {
          background: var(--bg-secondary);
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(67, 192, 246, 0.2);
        }

        .form-group input:disabled {
          background: var(--bg-secondary);
          color: var(--text-muted);
          cursor: not-allowed;
        }

        .field-note {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.3rem;
          text-align: left;
        }

        .experience-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .experience-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background: var(--bg-card);
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
        }

        [data-theme="dark"] .experience-option {
          background: var(--bg-secondary);
        }

        .experience-option:hover {
          border-color: var(--accent-blue);
          transform: translateY(-2px);
        }

        .experience-option.selected {
          border-color: var(--accent-blue);
          background: rgba(67, 192, 246, 0.1);
          box-shadow: var(--shadow-sm);
        }

        .exp-icon {
          font-size: 1.2rem;
          color: var(--accent-blue);
        }

        .exp-label {
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .profile-details {
          margin-bottom: 2rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-light);
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-label {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .detail-value {
          color: var(--text-primary);
          font-weight: 600;
        }

        .experience-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(67, 192, 246, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
        }

        .exp-icon-small {
          font-size: 0.8rem;
          color: var(--accent-blue);
        }

        .cta-btn {
          padding: 0.9rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s;
          width: 100%;
        }

        .cta-btn.primary {
          background: var(--button-gradient);
          color: #FFFFFF;
          box-shadow: var(--shadow-sm);
        }

        .cta-btn.secondary {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .cta-btn.secondary {
          background: var(--bg-secondary);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .cta-btn:active {
          transform: translateY(0);
        }

        .edit-btn {
          margin-top: 1.5rem;
        }

        .profile-actions {
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .logout-btn {
          background: rgba(239, 68, 68, 0.1) !important;
          color: var(--error) !important;
          border: 1px solid var(--error) !important;
        }

        .logout-btn:hover {
          background: var(--error) !important;
          color: white !important;
        }

        .message {
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error);
          color: var(--error);
        }

        .success {
          background: rgba(62, 213, 152, 0.1);
          border: 1px solid var(--success);
          color: var(--success);
        }

        .error-icon, .success-icon {
          font-size: 1.2rem;
        }

        @media (max-width: 480px) {
          .profile-modal {
            padding: 1.5rem 1rem;
            margin: 1rem;
          }
          
          .logo-text {
            font-size: 1.5rem;
          }
          
          .avatar-circle {
            width: 80px;
            height: 80px;
          }
          
          .user-initial {
            font-size: 2rem;
          }
          
          .user-name {
            font-size: 1.2rem;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .cta-btn {
            font-size: 0.9rem;
            padding: 0.8rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}