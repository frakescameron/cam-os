import { useEffect, useState } from "react";
import "./boot.css";

const bootText = [
  "CamOS BIOS v1.0",
  "Copyright (C) 2026 CamOS Systems",
  "",
  "Checking memory... 16384MB OK",
  "Detecting CPU... OK",
  "Detecting drives... OK",
  "",
  "Booting from /dev/portfolio...",
  "",
  "[ OK ] Mounted /projects",
  "[ OK ] Mounted /homelab",
  "[ OK ] Mounted /audio",
  "",
  "cam-os login: guest",
  "password: ********",
  "",
  "Starting desktop environment...",
  "",
  "Booting...",
];

export default function BootScreen() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setLines((prev) => {
        const updated = [...prev, bootText[index]];
        return updated.slice(-20);
      });

      index++;

      if (index >= bootText.length) {
        clearInterval(interval);
      }
    }, 140);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",   // 👈 THIS is the fix
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      className="terminal-boot"
    >
      <div className="terminal-lines">
        {lines.map((line, index) => (
          <p key={index}>
            {line}
            {index === lines.length - 1 && <span className="cursor">█</span>}
          </p>
        ))}
      </div>
    </div>
  );
}