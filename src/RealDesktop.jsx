import { useEffect, useRef, useState } from "react";
import "./RealDesktop.css";

const apps = [
  { id: "projects", name: "Projects", icon: "📁" },
  { id: "homelab", name: "Homelab", icon: "🖥️" },
  { id: "terminal", name: "Terminal", icon: "💻" },
  { id: "calculator", name: "Calculator", icon: "🧮" },
  { id: "clock", name: "Clock", icon: "🕒" },
  { id: "notepad", name: "Notepad", icon: "📝" },
  { id: "drawpad", name: "Drawpad", icon: "🎨" },
];

export default function RealDesktop() {
  const [openApps, setOpenApps] = useState([]);
  const [search, setSearch] = useState("");
  const [calc, setCalc] = useState("");
  const [note, setNote] = useState("");
  const [time, setTime] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (app) => {
    if (!openApps.find((item) => item.id === app.id)) {
      setOpenApps([...openApps, app]);
    }
    setSearch("");
    setStartOpen(false);
  };

  const closeApp = (id) => {
    setOpenApps(openApps.filter((app) => app.id !== id));
  };

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const pressCalc = (value) => {
    if (value === "C") return setCalc("");
    if (value === "⌫") return setCalc(calc.slice(0, -1));
    if (value === "=") {
      try {
        const result = Function(`"use strict"; return (${calc})`)();
        setCalc(String(result));
      } catch {
        setCalc("Error");
      }
      return;
    }
    setCalc(calc + value);
  };

  return (
    <div className="real-desktop">
      <div className="desktop-scale">
        <div className="desktop-icons">
          {apps.slice(0, 3).map((app) => (
            <button
              key={app.id}
              className="desktop-icon"
              onDoubleClick={() => openApp(app)}
            >
              <span>{app.icon}</span>
              <p>{app.name}</p>
            </button>
          ))}
        </div>

        <div className="window-area">
          {openApps.map((app) => (
            <div className="app-window" key={app.id}>
              <div className="window-titlebar">
                <span>{app.icon} {app.name}</span>
                <button onClick={() => closeApp(app.id)}>×</button>
              </div>

              <div className="window-content">
                {app.id === "projects" && (
                  <>
                    <h2>Projects</h2>
                    <p>Website projects, automation scripts, school projects, and GitHub work will go here.</p>
                  </>
                )}

                {app.id === "homelab" && (
                  <>
                    <h2>Homelab</h2>
                    <p>Proxmox, Windows Server, Active Directory, DNS, DHCP, Linux, and cybersecurity labs.</p>
                  </>
                )}

                {app.id === "terminal" && <TerminalApp />}

                {app.id === "calculator" && (
                  <div className="calculator-app">
                    <input value={calc} readOnly placeholder="0" />
                    <div className="calc-grid">
                      {["C", "⌫", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", "0", ".", "(", ")"].map((btn) => (
                        <button key={btn} onClick={() => pressCalc(btn)}>
                          {btn}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {app.id === "clock" && (
                  <div className="clock-app">
                    <h1>{time.toLocaleTimeString()}</h1>
                    <p>{time.toLocaleDateString()}</p>
                  </div>
                )}

                {app.id === "notepad" && (
                  <textarea
                    className="notepad"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write notes here..."
                  />
                )}

                {app.id === "drawpad" && <Drawpad />}
              </div>
            </div>
          ))}
        </div>

        {startOpen && (
          <div className="start-menu">
            <div className="start-header">
              <div className="start-avatar">C</div>
              <div>
                <h3>CamOS</h3>
                <p>Guest session</p>
              </div>
            </div>

            <div className="start-app-grid">
              {apps.map((app) => (
                <button key={app.id} onClick={() => openApp(app)}>
                  <span>{app.icon}</span>
                  {app.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="taskbar">
          <button className="menu-button" onClick={() => setStartOpen(!startOpen)}>
            ◉ CamOS
          </button>

          <div className="search-box">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search apps..."
            />

            {search && (
              <div className="search-results">
                {filteredApps.map((app) => (
                  <button key={app.id} onClick={() => openApp(app)}>
                    <span>{app.icon}</span> {app.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="taskbar-apps">
            {openApps.map((app) => (
              <button key={app.id} onClick={() => openApp(app)}>
                {app.icon} {app.name}
              </button>
            ))}
          </div>

          <div className="tray">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalApp() {
  const [history, setHistory] = useState([
    "CamOS Terminal v1.0",
    "Type 'help' for available commands.",
  ]);
  const [command, setCommand] = useState("");

  const runCommand = (e) => {
    e.preventDefault();
    const input = command.trim().toLowerCase();
    let output = "";

    if (input === "help") output = "commands: help, whoami, projects, homelab, clear, date";
    else if (input === "whoami") output = "guest@camos";
    else if (input === "projects") output = "Projects: CamOS portfolio, church website, automation scripts, WGU backend project";
    else if (input === "homelab") output = "Homelab: Proxmox, Windows Server, AD DS, DNS, DHCP, Linux labs";
    else if (input === "date") output = new Date().toString();
    else if (input === "clear") {
      setHistory([]);
      setCommand("");
      return;
    } else output = `command not found: ${input}`;

    setHistory([...history, `guest@camos:~$ ${command}`, output]);
    setCommand("");
  };

  return (
    <div className="terminal-app">
      <div className="terminal-output">
        {history.map((line, index) => <p key={index}>{line}</p>)}
      </div>

      <form onSubmit={runCommand} className="terminal-input-line">
        <span>guest@camos:~$</span>
        <input value={command} onChange={(e) => setCommand(e.target.value)} autoFocus />
      </form>
    </div>
  );
}

function Drawpad() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  const getPos = (e) => {
  const rect = canvasRef.current.getBoundingClientRect();

  const scaleX = canvasRef.current.width / rect.width;
  const scaleY = canvasRef.current.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};

  const startDrawing = (e) => {
    drawing.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="drawpad-app">
      <canvas
        ref={canvasRef}
        width="500"
        height="260"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
}