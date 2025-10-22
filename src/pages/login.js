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
import { FaEnvelope, FaLock, FaGoogle, FaRocket, FaShieldAlt, FaKey } from "react-icons/fa";

// Helper to detect mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Logo font style matching index.js
const logoFont = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  fontSize: "3rem",
  color: "#4B9BFF", // Dark blue to match main page
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
  const router = useRouter();
  const provider = new GoogleAuthProvider();

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
          <h2>{isSignup ? "Sign Up" : "Login"} to AIVISOR</h2>
          {showVerificationMessage ? (
            <div className="verification-message">
              <p>Please verify your email. If not verified in {verificationTimer} seconds, you'll be redirected to login.</p>
            </div>
          ) : showForgotPassword ? (
            <form onSubmit={handleForgotPassword}>
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
              <form onSubmit={handleEmailSubmit}>
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
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                    disabled={loading}
                  />
                </div>
                <button type="submit" className="cta-btn primary" disabled={loading}>
                  {loading ? (
                    <span className="spinner">⚙️</span>
                  ) : (
                    <>
                      <FaRocket className="btn-icon" />
                      {isSignup ? "Sign Up" : "Login"}
                    </>
                  )}
                </button>
              </form>
              <div className="divider">OR</div>
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
              {!isSignup && (
                <p className="toggle-auth">
                  Forgot password?{" "}
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="link-btn"
                    disabled={loading}
                  >
                    Reset Password
                  </button>
                </p>
              )}
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <p className="toggle-auth">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="link-btn"
                  disabled={loading}
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </p>
            </>
          )}
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
      <style jsx>{`
        :root {
          --bg-primary: #FFFFFF !important;
          --bg-secondary: rgba(255, 255, 255, 0.1) !important;
          --accent-purple: #7A5CFF !important;
          --gradient: linear-gradient(135deg, #4B9BFF, #7A5CFF) !important;
          --text-primary: #1A1A1A !important;
          --text-muted: #6B7280 !important;
          --success: #3ED598 !important;
          --error: #EF4444 !important;
          --border-soft: rgba(229, 231, 235, 0.5) !important;
          --shadow-subtle: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
          --shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          --shadow-neumorphic: 5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2) !important;
          --glass-bg: rgba(255, 255, 255, 0.15) !important;
          --glass-border: rgba(255, 255, 255, 0.3) !important;
        }

        html,
        body,
        .login-page {
          background: var(--bg-primary) !important;
          background-color: var(--bg-primary) !important;
          font-family: "Inter", sans-serif !important;
          color: var(--text-primary) !important;
          line-height: 1.6 !important;
          overflow-x: hidden !important;
          position: relative !important;
          margin: 0 !important;
          padding: 0 !important;
          backdrop-filter: blur(5px) !important;
        }

        body::before {
          content: '' !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(135deg, rgba(75, 155, 255, 0.1) 0%, rgba(122, 92, 255, 0.1) 100%) !important;
          pointer-events: none !important;
          z-index: -1 !important;
          animation: gradientShift 10s ease infinite !important;
        }

        .particles {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          pointer-events: none !important;
          z-index: -2 !important;
        }

        .particles::after {
          content: '' !important;
          position: absolute !important;
          width: 10px !important;
          height: 10px !important;
          background: rgba(75, 155, 255, 0.3) !important;
          border-radius: 50% !important;
          animation: float 8s infinite !important;
        }

        .login-page {
          min-height: 100vh !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 2rem !important;
          animation: fadeIn 0.5s ease-in !important;
        }

        .login-card {
          max-width: 450px !important;
          width: 100% !important;
          padding: 2.5rem !important;
          background: var(--glass-bg) !important;
          border: 1px solid var(--glass-border) !important;
          border-radius: 1.5rem !important;
          box-shadow: var(--shadow-neumorphic) !important;
          backdrop-filter: blur(10px) !important;
          text-align: center !important;
          animation: slideUp 0.5s ease-out !important;
          transition: transform 0.3s !important;
        }

        .login-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: var(--shadow-hover) !important;
        }

        .logo-section {
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
          justify-content: center !important;
          margin-bottom: 1.5rem !important;
        }

        .logo-icon {
          font-size: 3rem !important;
          color: var(--accent-purple) !important;
          animation: pulse 2s infinite !important;
        }

        h1 {
          font-size: 3.5rem !important;
          font-weight: 800 !important;
          letter-spacing: 0.1em !important;
          color: #4B9BFF !important; /* Solid blue like main page */
        }

        .aivi {
          color: #4B9BFF !important;
        }

        .visor {
          color: #4B9BFF !important;
        }

        .version-tag {
          background: var(--accent-purple) !important;
          color: #FFFFFF !important;
          padding: 0.3rem 0.6rem !important;
          border-radius: 0.6rem !important;
          font-size: 0.8rem !important;
          margin-left: 0.6rem !important;
          animation: bounce 1.5s infinite !important;
        }

        h2 {
          font-size: 1.8rem !important;
          color: var(--text-primary) !important;
          margin-bottom: 1.8rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1rem !important;
        }

        form {
          display: flex !important;
          flex-direction: column !important;
          gap: 1.2rem !important;
        }

        .input-group {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          background: var(--glass-bg) !important;
          border-radius: 0.6rem !important;
          overflow: hidden !important;
          transition: box-shadow 0.3s !important;
        }

        .input-group:hover {
          box-shadow: 0 0 10px rgba(122, 92, 255, 0.3) !important;
        }

        .input-icon {
          position: absolute !important;
          left: 1.2rem !important;
          color: var(--text-muted) !important;
          font-size: 1.2rem !important;
          transition: color 0.3s !important;
        }

        input {
          width: 100% !important;
          padding: 0.9rem 0.9rem 0.9rem 3rem !important;
          border: none !important;
          border-radius: 0.6rem !important;
          font-size: 1rem !important;
          background: var(--glass-bg) !important;
          color: var(--text-primary) !important;
          transition: all 0.3s !important;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1) !important;
        }

        input:focus {
          outline: none !important;
          box-shadow: 0 0 10px rgba(122, 92, 255, 0.5) !important;
          background: rgba(255, 255, 255, 0.2) !important;
        }

        input:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
        }

        .cta-btn {
          padding: 0.9rem !important;
          border: none !important;
          border-radius: 0.6rem !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.6rem !important;
          transition: all 0.3s !important;
          text-transform: uppercase !important;
        }

        .cta-btn.primary {
          background: #4B9BFF !important; /* Matches logo color */
          color: #FFFFFF !important;
          box-shadow: var(--shadow-neumorphic) !important;
        }

        .cta-btn.google {
          background: var(--glass-bg) !important;
          border: 1px solid var(--glass-border) !important;
          color: var(--text-primary) !important;
        }

        .cta-btn:hover:not(:disabled) {
          transform: scale(1.05) !important;
          box-shadow: var(--shadow-hover) !important;
        }

        .cta-btn:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
        }

        .btn-icon {
          font-size: 1.3rem !important;
          animation: bounce 1.5s infinite !important;
        }

        .divider {
          text-align: center !important;
          color: var(--text-muted) !important;
          margin: 1.8rem 0 !important;
          font-size: 1rem !important;
          position: relative !important;
          text-transform: uppercase !important;
        }

        .divider::before,
        .divider::after {
          content: '' !important;
          position: absolute !important;
          top: 50% !important;
          width: 40% !important;
          height: 2px !important;
          background: var(--border-soft) !important;
          animation: pulse 2s infinite !important;
        }

        .divider::before {
          left: 0 !important;
        }

        .divider::after {
          right: 0 !important;
        }

        .error {
          color: var(--error) !important;
          font-size: 0.9rem !important;
          text-align: center !important;
          margin-top: 0.6rem !important;
          animation: shake 0.5s !important;
        }

        .success {
          color: var(--success) !important;
          font-size: 0.9rem !important;
          text-align: center !important;
          margin-top: 0.6rem !important;
          animation: bounce 0.5s !important;
        }

        .toggle-auth {
          text-align: center !important;
          color: var(--text-muted) !important;
          font-size: 1rem !important;
          margin-top: 1.2rem !important;
        }

        .link-btn {
          background: none !important;
          border: none !important;
          color: var(--accent-purple) !important;
          cursor: pointer !important;
          font-weight: 600 !important;
          transition: color 0.3s !important;
          text-transform: uppercase !important;
          text-decoration: underline !important;
        }

        .link-btn:hover:not(:disabled) {
          color: #5B3EFF !important;
        }

        .link-btn:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
        }

        .icon {
          font-size: 1.3rem !important;
        }

        .spinner {
          animation: spin 1s linear infinite !important;
          font-size: 1.2rem !important;
        }

        .verification-message {
          text-align: center;
          padding: 1rem;
          background: var(--glass-bg);
          border-radius: 0.6rem;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg) !important; }
        }

        @keyframes fadeIn {
          from { opacity: 0 !important; }
          to { opacity: 1 !important; }
        }

        @keyframes slideUp {
          from { opacity: 0 !important; transform: translateY(20px) !important; }
          to { opacity: 1 !important; transform: translateY(0) !important; }
        }

        @keyframes pulse {
          0% { transform: scale(1) !important; }
          50% { transform: scale(1.1) !important; }
          100% { transform: scale(1) !important; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0) !important; }
          50% { transform: translateY(-10px) !important; }
        }

        @keyframes float {
          0% { transform: translate(0, 0) !important; }
          50% { transform: translate(20px, 20px) !important; }
          100% { transform: translate(0, 0) !important; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50% !important; }
          50% { background-position: 100% 50% !important; }
          100% { background-position: 0% 50% !important; }
        }

        @keyframes shake {
          0% { transform: translateX(0) !important; }
          25% { transform: translateX(-5px) !important; }
          50% { transform: translateX(5px) !important; }
          75% { transform: translateX(-5px) !important; }
          100% { transform: translateX(0) !important; }
        }

        .footer {
          padding: 2rem 0 !important;
          text-align: center !important;
          background: var(--glass-bg) !important;
          border-top: 1px solid var(--glass-border) !important;
          border-radius: 0.5rem !important;
          width: 100% !important;
          max-width: 450px !important;
        }

        .footer-links {
          display: flex !important;
          justify-content: center !important;
          gap: 1.8rem !important;
          margin-bottom: 1rem !important;
        }

        .footer-links a {
          color: var(--text-muted) !important;
          text-decoration: none !important;
          font-size: 1rem !important;
          transition: color 0.3s !important;
        }

        .footer-links a:hover {
          color: var(--accent-purple) !important;
          text-decoration: underline !important;
        }

        .disclaimer {
          color: var(--error) !important;
          font-size: 0.9rem !important;
          margin-top: 0.6rem !important;
        }

        @media (max-width: 480px) {
          .login-page { padding: 1rem !important; }
          .login-card { padding: 1.5rem !important; margin: 0 0.5rem !important; }
          h1 { font-size: 2.5rem !important; }
          h2 { font-size: 1.4rem !important; }
          input, .cta-btn { font-size: 0.9rem !important; padding: 0.7rem 0.7rem 0.7rem 2.5rem !important; }
          .input-icon { font-size: 1rem !important; }
          .divider { font-size: 0.9rem !important; }
          .footer-links { flex-direction: column !important; gap: 0.6rem !important; }
        }
      `}</style>
    </>
  );
}