import { useEffect } from "react";
import "./desktop.css";

export default function Desktop({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // time on welcome screen

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <div className="user-icon">C</div>
        <h1>Welcome to CamOS</h1>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}