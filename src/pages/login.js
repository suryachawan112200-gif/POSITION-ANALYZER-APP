import { useState, useEffect } from "react";
import { auth } from "/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { FaEnvelope, FaLock, FaGoogle, FaRocket, FaShieldAlt, FaKey, FaEye, FaEyeSlash, FaUserPlus, FaSignInAlt } from "react-icons/fa";

// Helper to detect mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Logo font style matching index.js
const logoFont = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  fontSize: "3rem",
  background: "linear-gradient(135deg, #4B9BFF 0%, #7A5CFF 50%, #4B9BFF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(60);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  // Theme state
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (prefersDark) {
        setTheme('dark');
      }
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    let timerInterval;
    if (showVerificationMessage && verificationTimer > 0) {
      timerInterval = setInterval(() => {
        setVerificationTimer((prev) => prev - 1);
      }, 1000);
    } else if (showVerificationMessage && verificationTimer === 0) {
      router.push("/login");
    }

    // Handle redirect result for mobile Google sign-in
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          if (user.emailVerified) {
            setSuccess("Logged in with Google! Redirecting...");
            setTimeout(() => router.push("/"), 1500);
          } else {
            setError("Google account email is not verified. Please verify it with Google first.");
            await auth.signOut();
          }
        }
      } catch (err) {
        console.error("Redirect result error:", err);
        setError(err.message || "Google sign-in failed. Please try again.");
      }
    };

    handleRedirectResult();
    return () => clearInterval(timerInterval);
  }, [showVerificationMessage, verificationTimer, router]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setShowVerificationMessage(true);
        setSuccess("Account created! Verification email sent. Please check your inbox (or spam folder) and verify within 60 seconds.");
        auth.signOut(); // Log out after signup to enforce verification
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in. Check your inbox for the verification link.");
          return;
        }
        setSuccess("Logged in! Redirecting...");
        setTimeout(() => router.push("/"), 1500);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");

      if (isMobile()) {
        // Use redirect for mobile to avoid popup issues
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup for desktop
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user.emailVerified) {
          setSuccess("Logged in with Google! Redirecting...");
          setTimeout(() => router.push("/"), 1500);
        } else {
          setError("Google account email is not verified. Please verify it with Google first.");
          await auth.signOut();
        }
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent to:", email);
      setSuccess("Password reset email sent! Check your inbox (or spam folder) to reset your password.");
      setShowForgotPassword(false);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AIVISOR: {isSignup ? "Sign Up" : "Login"}</title>
        <meta name="description" content="Login or sign up to access AIVISOR's trade analytics." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="login-page">
        <div className="particles"></div>
        <div className="login-card">
          <div className="logo-section">
            <FaShieldAlt className="logo-icon" />
            <h1 style={logoFont}>
              <span className="aivi">AI</span>
              <span className="visor">VISOR</span>
            </h1>
            <span className="version-tag">[V3.2]</span>
          </div>
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
          <p className="subtitle">{isSignup ? "Join our community of traders" : "Access your trading analytics dashboard"}</p>
          
          {showVerificationMessage ? (
            <div className="verification-message">
              <div className="verification-icon">📧</div>
              <h3>Email Verification Required</h3>
              <p>Please check your inbox for a verification email. If not verified in {verificationTimer} seconds, you'll be redirected to login.</p>
            </div>
          ) : showForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                  disabled={loading}
                />
              </div>
              <button type="submit" className="cta-btn primary" disabled={loading}>
                {loading ? (
                  <span className="spinner">⚙️</span>
                ) : (
                  <>
                    <FaKey className="btn-icon" />
                    Send Reset Link
                  </>
                )}
              </button>
              <p className="toggle-auth">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="link-btn"
                  disabled={loading}
                >
                  Back to Login
                </button>
              </p>
            </form>
          ) : (
            <>
              <form onSubmit={handleEmailSubmit} className="auth-form">
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email"
                    disabled={loading}
                  />
                </div>
                <div className="input-group password-group">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                {!isSignup && (
                  <div className="form-options">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Remember me
                    </label>
                    <button
                      onClick={() => setShowForgotPassword(true)}
                      className="link-btn forgot-password"
                      disabled={loading}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
                
                <button type="submit" className="cta-btn primary" disabled={loading}>
                  {loading ? (
                    <span className="spinner">⚙️</span>
                  ) : (
                    <>
                      {isSignup ? <FaUserPlus className="btn-icon" /> : <FaSignInAlt className="btn-icon" />}
                      {isSignup ? "Create Account" : "Sign In"}
                    </>
                  )}
                </button>
              </form>
              
              <div className="divider">
                <span>OR</span>
              </div>
              
              <button onClick={handleGoogleSignIn} className="cta-btn google" disabled={loading}>
                {loading ? (
                  <span className="spinner">⚙️</span>
                ) : (
                  <>
                    <FaGoogle className="btn-icon" />
                    Continue with Google
                  </>
                )}
              </button>
              
              {error && <div className="message error"><span className="error-icon">⚠️</span> {error}</div>}
              {success && <div className="message success"><span className="success-icon">✅</span> {success}</div>}
              
              <p className="toggle-auth">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="link-btn"
                  disabled={loading}
                >
                  {isSignup ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </>
          )}
        </div>
        
        <div className="theme-toggle-container">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <footer className="footer">
          <div className="footer-links">
            <a href="/support#privacy">Privacy</a>
            <a href="/support#terms">Terms</a>
            <a href="/support#support">Support</a>
          </div>
          <p className="disclaimer">Not financial advice. Trade at your own risk.</p>
          <p>© 2025 AIVISOR | Powered by xAI</p>
        </footer>
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

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body,
        .login-page {
          background: var(--bg-primary);
          font-family: 'Inter', sans-serif;
          color: var(--text-primary);
          line-height: 1.6;
          overflow-x: hidden;
          position: relative;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(67, 192, 246, 0.05) 0%, rgba(58, 234, 182, 0.05) 100%);
          pointer-events: none;
          z-index: -1;
        }

        [data-theme="dark"] body::before {
          background: linear-gradient(135deg, rgba(67, 192, 246, 0.03) 0%, rgba(58, 234, 182, 0.03) 100%);
        }

        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -2;
        }

        .particles::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: rgba(75, 155, 255, 0.3);
          border-radius: 50%;
          animation: float 8s infinite;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.5s ease-in;
          position: relative;
        }

        .login-card {
          max-width: 450px;
          width: 100%;
          padding: 2.5rem;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          text-align: center;
          animation: slideUp 0.5s ease-out;
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .login-card {
          border: 1px solid var(--border-light);
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          font-size: 3rem;
          color: var(--accent-purple);
          animation: pulse 2s infinite;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .aivi { color: var(--accent-blue); }
        .visor { color: var(--accent-purple); }

        .version-tag {
          background: var(--accent-purple);
          color: #FFFFFF;
          padding: 0.3rem 0.6rem;
          border-radius: 0.6rem;
          font-size: 0.8rem;
          margin-left: 0.6rem;
          animation: bounce 1.5s infinite;
        }

        h2 {
          font-size: 1.8rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .subtitle {
          color: var(--text-secondary);
          margin-bottom: 1.8rem;
          font-size: 1rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: box-shadow 0.3s;
          border: 1px solid var(--border-light);
        }

        [data-theme="dark"] .input-group {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
        }

        .input-group:hover {
          box-shadow: 0 0 10px rgba(122, 92, 255, 0.3);
        }

        .input-icon {
          position: absolute;
          left: 1.2rem;
          color: var(--text-muted);
          font-size: 1.2rem;
          transition: color 0.3s;
        }

        input {
          width: 100%;
          padding: 0.9rem 0.9rem 0.9rem 3rem;
          border: none;
          font-size: 1rem;
          background: transparent;
          color: var(--text-primary);
          transition: all 0.3s;
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(67, 192, 246, 0.2);
        }

        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .password-group {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 1.2rem;
          transition: color 0.3s;
        }

        .password-toggle:hover {
          color: var(--accent-blue);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .checkbox-container input {
          width: auto;
          margin-right: 0.5rem;
        }

        .forgot-password {
          font-size: 0.9rem;
          text-decoration: none;
        }

        .cta-btn {
          padding: 0.9rem;
          border: none;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cta-btn.primary {
          background: var(--button-gradient);
          color: #FFFFFF;
          box-shadow: var(--shadow-md);
        }

        .cta-btn.google {
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
        }

        [data-theme="dark"] .cta-btn.google {
          background: var(--bg-secondary);
        }

        .cta-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .cta-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-icon {
          font-size: 1.3rem;
        }

        .divider {
          text-align: center;
          color: var(--text-muted);
          margin: 1.8rem 0;
          font-size: 1rem;
          position: relative;
          text-transform: uppercase;
        }

        .divider span {
          background: var(--bg-card);
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }

        [data-theme="dark"] .divider span {
          background: var(--bg-secondary);
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--border-light);
        }

        .message {
          padding: 1rem;
          border-radius: var(--radius-md);
          margin: 1rem 0;
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

        .toggle-auth {
          text-align: center;
          color: var(--text-secondary);
          font-size: 1rem;
          margin-top: 1.2rem;
        }

        .link-btn {
          background: none;
          border: none;
          color: var(--accent-blue);
          cursor: pointer;
          font-weight: 600;
          transition: color 0.3s;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0;
        }

        .link-btn:hover:not(:disabled) {
          color: var(--accent-purple);
          text-decoration: underline;
        }

        .link-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
          font-size: 1.2rem;
        }

        .verification-message {
          text-align: center;
          padding: 1.5rem;
          background: rgba(67, 192, 246, 0.1);
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
          border: 1px solid var(--accent-blue);
        }

        .verification-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .verification-message h3 {
          margin-bottom: 0.5rem;
          color: var(--accent-blue);
        }

        .theme-toggle-container {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .theme-toggle {
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s;
          box-shadow: var(--shadow-sm);
        }

        [data-theme="dark"] .theme-toggle {
          background: var(--bg-secondary);
        }

        .theme-toggle:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-md);
        }

        .footer {
          padding: 2rem 0;
          text-align: center;
          background: var(--bg-card);
          border-top: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 450px;
          margin-top: 2rem;
        }

        [data-theme="dark"] .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-light);
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.8rem;
          margin-bottom: 1rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: var(--accent-blue);
          text-decoration: underline;
        }

        .disclaimer {
          color: var(--error);
          font-size: 0.9rem;
          margin-top: 0.6rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
          100% { transform: translate(0, 0); }
        }

        @media (max-width: 480px) {
          .login-page { padding: 1rem; }
          .login-card { padding: 1.5rem; margin: 0 0.5rem; }
          h1 { font-size: 2.5rem; }
          h2 { font-size: 1.4rem; }
          input, .cta-btn { font-size: 0.9rem; padding: 0.7rem 0.7rem 0.7rem 2.5rem; }
          .input-icon { font-size: 1rem; }
          .divider { font-size: 0.9rem; }
          .footer-links { flex-direction: column; gap: 0.6rem; }
          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}