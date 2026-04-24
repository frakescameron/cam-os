import "./realDesktop.css";

export default function RealDesktop() {
  return (
    <div className="real-desktop">
      <div className="icon">
        <span>📁</span>
        <p>Projects</p>
      </div>

      <div className="icon">
        <span>🖥️</span>
        <p>Homelab</p>
      </div>

      <div className="icon">
        <span>🎛️</span>
        <p>Audio</p>
      </div>
    </div>
  );
}