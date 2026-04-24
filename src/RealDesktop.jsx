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
  { id: "battleblocks", name: "Battle Blocks", icon: "🧱" },
  { id: "aboutme", name: "About Me", icon: "📄" },
  { id: "fileexplorer", name: "File Explorer", icon: "🗂️" },
  { id: "chrome", name: "Chrome", icon: "🌐" },
];

export default function RealDesktop() {
  const [desktopFiles, setDesktopFiles] = useState([]);
  const [openApps, setOpenApps] = useState([]);
  const [search, setSearch] = useState("");
  const [calc, setCalc] = useState("");
  const [note, setNote] = useState("");
  const [time, setTime] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const [windowPositions, setWindowPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [maximizedApps, setMaximizedApps] = useState([]);
  const [shutdown, setShutdown] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);
  const deleteLastFile = () => {
    setDesktopFiles((prev) => prev.slice(0, -1));
    setContextMenu(null); 
  };
  const addDesktopFile = () => {
  const newFile = {
    id: crypto.randomUUID(),
    name: `New File ${desktopFiles.length + 1}.txt`,
    content: "",
  };

  setDesktopFiles([...desktopFiles, newFile]);
  setContextMenu(null);
};

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


  const minimizeApp = (id) => {
    setMinimizedApps((prev) => [...new Set([...prev, id])]);
  };

  const restoreApp = (id) => {
    setMinimizedApps((prev) => prev.filter((appId) => appId !== id));
  };

  const toggleMaximize = (id) => {
    setMaximizedApps((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const restartSystem = () => {
    window.location.reload();
  };

  const shutdownSystem = () => {
    setShutdown(true);
  };

  const powerOn = () => {
    window.location.reload();
  };

  const openContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const closeApp = (id) => {
    setOpenApps(openApps.filter((app) => app.id !== id));
  };

  const startDrag = (e, appId) => {
    if (e.target.tagName === "BUTTON") return;

    const currentPosition = windowPositions[appId] || { x: 180, y: 110 };

    setDragging({
      appId,
      offsetX: e.clientX - currentPosition.x,
      offsetY: e.clientY - currentPosition.y,
    });
  };

  const dragWindow = (e) => {
    if (!dragging) return;

    setWindowPositions((prev) => ({
      ...prev,
      [dragging.appId]: {
        x: e.clientX - dragging.offsetX,
        y: e.clientY - dragging.offsetY,
      },
    }));
  };

  const stopDrag = () => {
    setDragging(null);
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
    <div
          className="real-desktop"
          onMouseMove={dragWindow}
          onMouseUp={stopDrag}
          onContextMenu={openContextMenu}
          onClick={closeContextMenu}
        > 
        {shutdown && (
       <div className="shutdown-screen">
        <button onClick={powerOn} className="power-button">⏻</button>
      </div>
)}
      <div className="desktop-scale">
        <div className="desktop-icons">
  {/* existing icons */}
  {apps
    .filter((app) =>
      ["projects", "homelab", "terminal", "aboutme"].includes(app.id)
    )
    .map((app) => (
      <button
        key={app.id}
        className="desktop-icon"
        onDoubleClick={() => openApp(app)}
      >
        <span>{app.icon}</span>
        <p>{app.name}</p>
      </button>
    ))}

  {/* 👇 ADD THIS HERE */}
  {desktopFiles.map((file) => (
    <button
      key={file.id}
      className="desktop-icon"
      onDoubleClick={() =>
        openApp({
          id: file.id,
          name: file.name,
          icon: "📄",
          type: "textfile",
        })
      }
    >
      <span>📄</span>
      <p>{file.name}</p>
    </button>
  ))}
</div>

        <div className="window-area">
          {openApps.map((app) => (
            <div
              className={`app-window ${maximizedApps.includes(app.id) ? "maximized" : ""} ${  minimizedApps.includes(app.id) ? "minimized" : "" }`}
              key={app.id}
              style={{
                left: windowPositions[app.id]?.x ?? 180,
                top: windowPositions[app.id]?.y ?? 110,
              }}
            >
                <div
                  className="window-titlebar"
                  onMouseDown={(e) => startDrag(e, app.id)}
                >
                  <span>
                    {app.icon} {app.name}
                  </span>

                  <div className="window-controls">
                    <button onClick={() => minimizeApp(app.id)}>—</button>
                    <button onClick={() => toggleMaximize(app.id)}>□</button>
                    <button onClick={() => closeApp(app.id)}>×</button>
                  </div>
                </div>

              <div className="window-content">
                {app.type === "textfile" && (
                        <textarea
                          className="notepad"
                          value={desktopFiles.find((file) => file.id === app.id)?.content || ""}
                          onChange={(e) =>
                            setDesktopFiles((prev) =>
                              prev.map((file) =>
                                file.id === app.id ? { ...file, content: e.target.value } : file
                              )
                            )
                          }
                          placeholder="Write your file here..."
                        />
                      )}
                {app.id === "aboutme" && (
                    <div className="text-document">
                      <h2>About Me</h2>
                      <p>
                        Write your introduction here. Talk about school, homelab, networking,
                        audio, projects, and what you are working toward.
                      </p>
                    </div>
                  )}
                  {app.id === "aboutme" && (
                      <div className="text-document">
                        <h2>About Me</h2>
                        <p>
                          Write your introduction here. Talk about who you are, your CS degree,
                          homelab, networking, audio work, and what you are building toward.
                        </p>
                      </div>
                    )}
                  {app.id === "fileexplorer" && (
                    <div className="file-explorer">
                      <aside>
                        <p>📁 Projects</p>
                        <p>📄 About Me</p>
                        <p>🖥️ Homelab</p>
                      </aside>

                      <main>
                        <h2>Projects</h2>
                        <button onDoubleClick={() => openApp(apps.find((a) => a.id === "projects"))}>
                          📄 Website Project.txt
                        </button>
                        <button onDoubleClick={() => openApp(apps.find((a) => a.id === "homelab"))}>
                          📄 Homelab Notes.txt
                        </button>
                      </main>
                    </div>
                  )}

                  {app.id === "chrome" && (
                    <div className="chrome-app">
                      <div className="chrome-bar">
                        <span>🌐</span>
                        <input value="https://www.google.com" readOnly />
                        <button onClick={() => window.open("https://www.google.com", "_blank")}>
                          Open
                        </button>
                      </div>

                      <iframe
                        title="Google"
                        src="https://www.google.com/webhp?igu=1"
                      />
                    </div>
                  )}
                
                
                
                {app.id === "projects" && (
                  <>
                    <h2>Projects</h2>
                    <p>
                      Website projects, automation scripts, school projects, and
                      GitHub work will go here.
                    </p>
                  </>
                )}

                {app.id === "homelab" && (
                  <>
                    <h2>Homelab</h2>
                    <p>
                      Proxmox, Windows Server, Active Directory, DNS, DHCP,
                      Linux, and cybersecurity labs.
                    </p>
                  </>
                )}

                {app.id === "terminal" && <TerminalApp />}

                {app.id === "calculator" && (
                  <div className="calculator-app">
                    <input value={calc} readOnly placeholder="0" />

                    <div className="calc-grid">
                      {[
                        "C",
                        "⌫",
                        "/",
                        "*",
                        "7",
                        "8",
                        "9",
                        "-",
                        "4",
                        "5",
                        "6",
                        "+",
                        "1",
                        "2",
                        "3",
                        "=",
                        "0",
                        ".",
                        "(",
                        ")",
                      ].map((btn) => (
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

                {app.id === "battleblocks" && <BlocksGame />}
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
              <div className="start-power">
              <button onClick={restartSystem}>↻ Restart</button>
              <button onClick={shutdownSystem}>⏻ Shut Down</button>
            </div>
          </div>
        )}
          {contextMenu && (
  <div
    className="desktop-context-menu"
    style={{ left: contextMenu.x, top: contextMenu.y }}
  >
    <button onClick={() => openApp(apps.find((a) => a.id === "fileexplorer"))}>
      Open File Explorer
    </button>

    <button onClick={() => openApp(apps.find((a) => a.id === "terminal"))}>
      Open Terminal
    </button>

    <button onClick={addDesktopFile}>
      Add File
    </button>

    <button onClick={deleteLastFile}>
     Delete Last File
    </button>
  </div>
)}
        <div className="taskbar">
          <button
            className="menu-button"
            onClick={() => setStartOpen(!startOpen)}
          >
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
              <button key={app.id} onClick={() => restoreApp(app.id)}>
              {app.icon} {app.name}
              </button>
            ))}
          </div>

          <div className="tray">
              <button onClick={() => setWifiOpen(!wifiOpen)}>📶</button>
              <button onClick={() => setCalendarOpen(!calendarOpen)}>📅</button>
              <span>
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {wifiOpen && (
              <div className="tray-popup wifi-popup">
                <h3>Network</h3>
                <p>📶 CamOS-WiFi</p>
                <p>Status: Connected</p>
                <p>IP: 192.168.50.23</p>
              </div>
            )}

            {calendarOpen && (
              <div className="tray-popup calendar-popup">
                <h3>{time.toLocaleDateString()}</h3>
                <p>{time.toLocaleTimeString()}</p>
              </div>
            )}
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

    if (input === "help") {
      output = "commands: help, whoami, projects, homelab, clear, date";
    } else if (input === "whoami") {
      output = "guest@camos";
    } else if (input === "projects") {
      output =
        "Projects: CamOS portfolio, church website, automation scripts, WGU backend project";
    } else if (input === "homelab") {
      output =
        "Homelab: Proxmox, Windows Server, AD DS, DNS, DHCP, Linux labs";
    } else if (input === "date") {
      output = new Date().toString();
    } else if (input === "clear") {
      setHistory([]);
      setCommand("");
      return;
    } else {
      output = `command not found: ${input}`;
    }

    setHistory([...history, `guest@camos:~$ ${command}`, output]);
    setCommand("");
  };

  return (
    <div className="terminal-app">
      <div className="terminal-output">
        {history.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <form onSubmit={runCommand} className="terminal-input-line">
        <span>guest@camos:~$</span>
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          autoFocus
        />
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

function BlocksGame() {
  const width = 10;
  const height = 16;

  const shapes = [
    [[1, 1, 1, 1]],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
  ];

  const randomPiece = () => ({
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    x: 3,
    y: 0,
  });

  const emptyBoard = () =>
    Array.from({ length: height }, () => Array(width).fill(0));

  const [board, setBoard] = useState(emptyBoard());
  const [piece, setPiece] = useState(randomPiece());
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const collides = (testPiece, testBoard = board) => {
    return testPiece.shape.some((row, y) =>
      row.some((cell, x) => {
        if (!cell) return false;

        const newX = testPiece.x + x;
        const newY = testPiece.y + y;

        return (
          newX < 0 ||
          newX >= width ||
          newY >= height ||
          (newY >= 0 && testBoard[newY][newX])
        );
      })
    );
  };

  const mergePiece = (currentPiece, currentBoard) => {
    const newBoard = currentBoard.map((row) => [...row]);

    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;

          if (boardY >= 0) {
            newBoard[boardY][boardX] = 1;
          }
        }
      });
    });

    return newBoard;
  };

  const clearLines = (currentBoard) => {
    const remaining = currentBoard.filter((row) => row.some((cell) => !cell));
    const cleared = height - remaining.length;

    const newRows = Array.from({ length: cleared }, () =>
      Array(width).fill(0)
    );

    if (cleared > 0) {
      setScore((prev) => prev + cleared * 100);
      setLines((prev) => prev + cleared);
    }

    return [...newRows, ...remaining];
  };

  const dropPiece = () => {
    if (!running || gameOver) return;

    const moved = {
      ...piece,
      y: piece.y + 1,
    };

    if (!collides(moved)) {
      setPiece(moved);
    } else {
      const merged = mergePiece(piece, board);
      const cleared = clearLines(merged);
      const next = randomPiece();

      if (collides(next, cleared)) {
        setGameOver(true);
        setRunning(false);
      } else {
        setBoard(cleared);
        setPiece(next);
      }
    }
  };

  const movePiece = (dx) => {
    if (!running || gameOver) return;

    const moved = {
      ...piece,
      x: piece.x + dx,
    };

    if (!collides(moved)) {
      setPiece(moved);
    }
  };

  const rotatePiece = () => {
    if (!running || gameOver) return;

    const rotatedShape = piece.shape[0].map((_, index) =>
      piece.shape.map((row) => row[index]).reverse()
    );

    const rotated = {
      ...piece,
      shape: rotatedShape,
    };

    if (!collides(rotated)) {
      setPiece(rotated);
    }
  };

  const startGame = () => {
    setBoard(emptyBoard());
    setPiece(randomPiece());
    setScore(0);
    setLines(0);
    setGameOver(false);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      dropPiece();
    }, 550);

    return () => clearInterval(interval);
  });

  const hardDrop = () => {
  if (!running || gameOver) return;

  let newY = piece.y;

  // keep moving down until collision
  while (
    !collides({
      ...piece,
      y: newY + 1,
    })
  ) {
    newY++;
  }

  const droppedPiece = { ...piece, y: newY };

  const merged = mergePiece(droppedPiece, board);
  const cleared = clearLines(merged);
  const next = randomPiece();

  if (collides(next, cleared)) {
    setGameOver(true);
    setRunning(false);
  } else {
    setBoard(cleared);
    setPiece(next);
  }
};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!running) return;

      if (e.key === "ArrowLeft") movePiece(-1);
      if (e.key === "ArrowRight") movePiece(1);
      if (e.key === "ArrowDown") dropPiece();
      if (e.key === "ArrowUp") rotatePiece();
      if (e.code === "Space") {
  e.preventDefault(); // stops page scroll
  hardDrop();
}
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const displayBoard = mergePiece(piece, board);

  return (
    <div className="blocks-game">
      <div className="blocks-board playable">
        {displayBoard.flat().map((cell, i) => (
          <div key={i} className={`block-cell ${cell ? "filled" : ""}`} />
        ))}
      </div>

      <div className="blocks-side">
        <h3>Battle Blocks</h3>
        <p>Score: {String(score).padStart(4, "0")}</p>
        <p>Lines: {String(lines).padStart(2, "0")}</p>

        {gameOver && <p className="game-over">Game Over</p>}

        <button onClick={startGame}>{running ? "Restart" : "Start"}</button>

        <div className="blocks-controls">
          <p>← → Move</p>
          <p>↑ Rotate</p>
          <p>↓ Drop</p>
        </div>
      </div>
    </div>
  );
}