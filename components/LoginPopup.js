import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPopup({ onClose }) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    console.log("Redirecting to /login");
    router.push("/login");
  };

  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      background: "rgba(0, 0, 0, 0.5)", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      zIndex: 5000 
    }}>
      <div style={{ 
        background: "#f0f2eaff", 
        padding: "2rem", 
        borderRadius: "1rem", 
        border: "1px solid #7da4f4ff", 
        maxWidth: "400px", 
        width: "90%", 
        textAlign: "center", 
        position: "relative", 
        overflow: "visible" 
      }}>
        <button 
          style={{ 
            position: "absolute", 
            top: "0.5rem", 
            right: "0.5rem", 
            background: "#EF4444", 
            color: "#FFFFFF", 
            border: "none", 
            borderRadius: "50%", 
            width: "24px", 
            height: "24px", 
            fontSize: "0.9rem", 
            cursor: "pointer" 
          }} 
          onClick={onClose}
        >
          ×
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "2rem" }}>🤖</span>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, background: "linear-gradient(135deg, #4B9BFF, #7A5CFF)", WebkitBackgroundClip: "text", color: "transparent" }}>
            Login Required
          </h2>
        </div>
        <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: "1.4" }}>
          You've reached the free analysis limit (2 per session). Log in or sign up to continue analyzing unlimited positions.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button 
            style={{ 
              padding: "0.75rem 1.5rem", 
              border: "none", 
              borderRadius: "0.5rem", 
              fontSize: "1rem", 
              fontWeight: 600, 
              cursor: "pointer", 
              background: "linear-gradient(135deg, #4B9BFF, #7A5CFF)", 
              color: "#FFFFFF", 
              display: "inline-block", 
              opacity: 1, 
              visibility: "visible" 
            }} 
            onClick={handleLoginRedirect}
          >
            Login / Sign Up 🔐
          </button>
        </div>
      </div>
    </div>
  );
}