import { useEffect, useRef, useState } from "react";
import "./RealDesktop.css";
import SecretGame from "./SecretGame";

const apps = [
  { id: "projects", name: "Projects", icon: "📁" },
  { id: "homelab", name: "Homelab", icon: "🖥️" },
  { id: "terminal", name: "Terminal", icon: "💻" },
  { id: "aboutme", name: "About Me", icon: "📄" },
  { id: "resume", name: "Resume", icon: "🧾" },
  { id: "fileexplorer", name: "File Explorer", icon: "🗂️" },
  { id: "chrome", name: "Chrome", icon: "🌐" },
  { id: "calculator", name: "Calculator", icon: "🧮" },
  { id: "clock", name: "Clock", icon: "🕒" },
  { id: "notepad", name: "Notepad", icon: "📝" },
  { id: "drawpad", name: "Drawpad", icon: "🎨" },
  { id: "battleblocks", name: "Battle Blocks", icon: "🧱" },
  
];

const desktopAppIds = ["projects", "homelab", "terminal", "aboutme", "resume"];

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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (app) => {
  if (!app) return;

  setOpenApps((prev) => {
    if (prev.find((item) => item.id === app.id)) return prev;
    return [...prev, app];
  });

  setMinimizedApps((prev) => prev.filter((id) => id !== app.id));

  if (app.type === "secretgame") {
    setMaximizedApps((prev) => [...new Set([...prev, app.id])]);
  }

  setSearch("");
  setStartOpen(false);
};

  const closeApp = (id) => {
    setOpenApps((prev) => prev.filter((app) => app.id !== id));
    setMinimizedApps((prev) => prev.filter((appId) => appId !== id));
    setMaximizedApps((prev) => prev.filter((appId) => appId !== id));
    
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

  const addDesktopFile = () => {
    const newFile = {
      id: crypto.randomUUID(),
      name: `New File ${desktopFiles.length + 1}.txt`,
      content: "",
    };

    setDesktopFiles((prev) => [...prev, newFile]);
    setStartOpen(false);
  };

  const deleteLastFile = () => {
    setDesktopFiles((prev) => prev.slice(0, -1));
    setStartOpen(false);
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

  const startDrag = (e, appId) => {
    if (e.target.tagName === "BUTTON") return;
    if (window.innerWidth <= 768) return; // skip dragging on mobile

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
    <div className="real-desktop" onMouseMove={dragWindow} onMouseUp={stopDrag}>
      {shutdown && (
        <div className="shutdown-screen">
          <button onClick={powerOn} className="power-button">
            ⏻
          </button>
        </div>
      )}

      <div className="desktop-scale">
        <div className="desktop-icons">
          {apps
            .filter((app) => desktopAppIds.includes(app.id))
            .map((app) => (
              <button
                key={app.id}
                className="desktop-icon"
                onClick={() => openApp(app)}
              >
                <span>{app.icon}</span>
                <p>{app.name}</p>
              </button>
            ))}

          {desktopFiles.map((file) => (
            <button
              key={file.id}
              className="desktop-icon"
              onClick={() =>
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
              key={app.id}
              className={`app-window ${
                maximizedApps.includes(app.id) ? "maximized" : ""
              } ${minimizedApps.includes(app.id) ? "minimized" : ""}`}
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
                    value={
                      desktopFiles.find((file) => file.id === app.id)?.content ||
                      ""
                    }
                    onChange={(e) =>
                      setDesktopFiles((prev) =>
                        prev.map((file) =>
                          file.id === app.id
                            ? { ...file, content: e.target.value }
                            : file
                        )
                      )
                    }
                    placeholder="Write your file here..."
                  />
                )}

                {app.id === "projects" && <ProjectsApp openApp={openApp} />}

                {app.id === "homelab" && <HomelabApp />}

                {app.id === "aboutme" && <AboutMeApp />}

                {app.id === "resume" && <ResumeApp />}

                {app.id === "fileexplorer" && (
                  <FileExplorer
                    apps={apps}
                    desktopFiles={desktopFiles}
                    openApp={openApp}
                  />
                )}

                {app.id === "chrome" && <ChromeApp />}

                {app.id === "terminal" && <TerminalApp openApp={openApp} />}

                {app.id === "calculator" && (
                  <CalculatorApp calc={calc} pressCalc={pressCalc} />
                )}

                {app.id === "clock" && <ClockApp time={time} />}

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

                {app.type === "secretgame" && <SecretGame />}
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
              <button onClick={addDesktopFile}>＋ Add File</button>
              <button onClick={deleteLastFile}>🗑 Delete File</button>
            </div>

            <div className="start-power">
              <button onClick={restartSystem}>↻ Restart</button>
              <button onClick={shutdownSystem}>⏻ Shut Down</button>
            </div>
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

function ProjectsApp({ openApp }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const files = [
    {
      name: "Rock Church Music",
      ext: "txt",
      type: "Text Document",
      modified: "8/12/2026 3:41 PM",
      size: "4 KB",
      url: "https://github.com/frakescameron/Rock-Church-Music",
    },
    {
      name: "cam-os",
      ext: "txt",
      type: "Text Document",
      modified: "8/20/2026 9:02 AM",
      size: "12 KB",
      url: "https://github.com/frakescameron/cam-os",
    },
    {
      name: "Network 2 Rewired",
      ext: "txt",
      type: "Text Document",
      modified: "7/30/2026 6:18 PM",
      size: "3 KB",
      url: "https://github.com/frakescameron/network-2-rewired",
    },
    {
      name: "Odin Recipes",
      ext: "txt",
      type: "Text Document",
      modified: "6/14/2026 11:05 AM",
      size: "2 KB",
      url: "https://github.com/frakescameron/odin-recipes",
    },
    {
      name: "Windows 11 Setup Tool",
      ext: "txt",
      type: "Text Document",
      modified: "5/2/2026 1:27 PM",
      size: "6 KB",
      url: "https://github.com/frakescameron/win11-setup-tool",
    },
    {
      name: "File Forge",
      ext: "txt",
      type: "Text Document",
      modified: "4/18/2026 4:53 PM",
      size: "5 KB",
      url: "https://github.com/frakescameron/file-forge",
    },
    {
      name: "Pyclass",
      ext: "txt",
      type: "Text Document",
      modified: "3/9/2026 10:11 AM",
      size: "3 KB",
      url: "https://github.com/frakescameron/PyClass",
    },
    {
      name: "Homelab-Documentation",
      ext: "txt",
      type: "Text Document",
      modified: "8/25/2026 8:30 PM",
      size: "9 KB",
      url: "https://github.com/frakescameron/Homelab-Documentation",
    },
    {
      name: "CheckQuest",
      ext: "txt",
      type: "Text Document",
      modified: "2/27/2026 2:44 PM",
      size: "7 KB",
      url: "https://github.com/frakescameron/CheckQuest",
    },
  ];

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const goToQuickAccess = (id) => {
    if (id === "projects") return; // already here
    if (!openApp) return;

    const targets = {
      homelab: { id: "homelab", name: "Homelab", icon: "🖥️" },
      aboutme: { id: "aboutme", name: "About Me", icon: "📄" },
    };

    openApp(targets[id]);
  };

  return (
    <div className="explorer-app">
      <div className="explorer-toolbar">
        <div className="explorer-nav-buttons">
          <button disabled>←</button>
          <button disabled>→</button>
          <button disabled>↑</button>
        </div>
        <div className="explorer-address">
          <span>📁 This PC</span>
          <span className="sep">›</span>
          <span>Projects</span>
        </div>
        <div className="explorer-search">
          <input
            placeholder="Search Projects"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="explorer-body">
        <aside className="explorer-sidebar">
          <p className="sidebar-label">Quick access</p>
          <p className="sidebar-item active">📁 Projects</p>
          <p
            className="sidebar-item clickable"
            onClick={() => goToQuickAccess("homelab")}
          >
            🖥️ Homelab
          </p>
          <p
            className="sidebar-item clickable"
            onClick={() => goToQuickAccess("aboutme")}
          >
            📄 About Me
          </p>
        </aside>

        <div className="explorer-main">
          <div className="explorer-header-row">
            <span className="col-name">Name</span>
            <span className="col-date">Date modified</span>
            <span className="col-type">Type</span>
            <span className="col-size">Size</span>
          </div>

          <div className="explorer-list">
            {filteredFiles.length === 0 && (
              <p className="explorer-empty">
                No items match "{search}".
              </p>
            )}

            {filteredFiles.map((file) => (
              <div

                    key={file.name}
                    className={`explorer-row ${selected === file.name ? "selected" : ""}`}
                    onClick={() => {
                      setSelected(file.name);
                      window.open(file.url, "_blank");   // combine select + open into one tap
                    }}
                  >
                <span className="col-name">
                  <span className="file-icon">📄</span>
                  {file.name}.{file.ext}
                </span>
                <span className="col-date">{file.modified}</span>
                <span className="col-type">{file.type}</span>
                <span className="col-size">{file.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="explorer-statusbar">
        <span>{filteredFiles.length} items</span>
        {selected && <span>1 item selected</span>}
      </div>
    </div>
  );
}

function HomelabApp() {
  return (
    <div className="text-document">
      <div className="about-header">
        <div className="about-avatar">🖥️</div>
        <div>
          <h2>Homelab</h2>
          <p className="about-role">Proxmox · pfSense · VLANs</p>
        </div>
      </div>

      <div className="about-badges">
        <span className="badge badge-earned">Proxmox VE</span>
        <span className="badge badge-earned">pfSense</span>
        <span className="badge badge-earned">LXC</span>
        <span className="badge badge-earned">802.1Q Trunking</span>
        <span className="badge badge-progress">VPN (planned)</span>
      </div>

      <section className="about-section">
        <h3>Server &amp; Virtualization</h3>
        <p>
          My homelab is built around a dedicated server running Proxmox VE,
          which I use to gain hands-on experience with virtualization,
          networking, and self-hosted infrastructure. The server currently
          hosts three LXC containers: Nextcloud for private cloud storage and
          file sync, Pi-hole for network-wide DNS filtering, and Nginx Proxy
          Manager for reverse proxies and internal services.
        </p>
      </section>

      <section className="about-section">
        <h3>Network Architecture</h3>
        <p>
          The network is routed by a dedicated Lenovo PC running pfSense with
          two 1 Gbps NICs — one to a Motorola modem for WAN, the other to a
          fanless managed Cisco 2960 switch. It's segmented into three VLANs
          using Router-on-a-Stick: VLAN 10 for homelab infrastructure, VLAN 20
          for wireless clients, and VLAN 30 for wired clients on the switch.
          Inter-VLAN routing runs over an 802.1Q trunk between the router and
          switch. A VPN isn't configured yet but is planned for secure remote
          access.
        </p>
      </section>

      <section className="about-section">
        <h3>What's Next</h3>
        <p>
          I want to eventually run Windows Server throughout the house. I've
          run it before, but that VM is shut down for now until I get some
          home desktops set up for the offices.
        </p>
      </section>

      <section className="about-section about-closing">
        <p>
          Building and maintaining this lab has given me practical experience
          with Proxmox, LXC, pfSense, VLAN configuration, 802.1Q trunking, DNS
          management, and reverse proxies — and I keep expanding it as I learn
          more about networking, sysadmin, and security.
        </p>
      </section>

      <button
        className="doc-link-button"
        onClick={() =>
          window.open(
            "https://github.com/frakescameron/Homelab-Documentation",
            "_blank"
          )
        }
      >
        📄 My Homelab Documentation
      </button>
    </div>
  );
}

function ResumeApp() {
  return (
    <div className="text-document">
      <div className="about-header">
        <div className="about-avatar">CF</div>
        <div>
          <h2>Cameron Frakes</h2>
          <p className="about-role">Pocatello, ID · frakescameron@gmail.com</p>
        </div>
      </div>

      <div className="about-badges">
        <span className="badge badge-earned">✅ CCNA</span>
        <span className="badge badge-earned">✅ Linux Essentials</span>
        <span className="badge badge-progress">📘 Security+ (in progress)</span>
      </div>

      <a
        href="/resume.pdf"
        download="Cameron-Frakes-Resume.pdf"
        className="doc-link-button resume-download"
      >
        ⬇️ Download Resume (PDF)
      </a>

      <section className="about-section">
        <h3>Summary</h3>
        <p>
          Motivated and detail-oriented professional with a strong foundation
          in technology, problem solving, and critical thinking. Experienced
          in hardware and software troubleshooting, customer support, and
          collaborative project work, with the ability to quickly learn new
          technologies and adapt to dynamic environments.
        </p>
      </section>

      <section className="about-section">
        <h3>Experience</h3>

        <div className="resume-entry">
          <div className="resume-entry-head">
            <strong>Customer Service Specialist</strong>
            <span>Nov 2024 – Present</span>
          </div>
          <p className="resume-entry-sub">The Home Depot · Pocatello, ID</p>
          <p>
            Managed inventory and product stocking, implemented planograms to
            optimize displays, and maintained the garden department while
            assisting customers with plant care and gardening solutions.
          </p>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-head">
            <strong>Computer Repair Technician</strong>
            <span>May 2020 – Present</span>
          </div>
          <p className="resume-entry-sub">Self Employed · Pocatello, ID</p>
          <p>
            Handle hardware repairs and diagnostics for local clients —
            disassembling and reassembling desktops and laptops, replacing
            drives, RAM, power supplies, and motherboards, plus OS setup and
            driver support.
          </p>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-head">
            <strong>Dispute Resolution Specialist</strong>
            <span>May 2023 – Nov 2024</span>
          </div>
          <p className="resume-entry-sub">
            Idaho Central Credit Union · Pocatello, ID
          </p>
          <p>
            Handled fraud cases and resolved discrepancies on the dispute
            team, using strong attention to detail to uphold company security
            standards.
          </p>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-head">
            <strong>Assistant Store Manager</strong>
            <span>Nov 2021 – Apr 2023</span>
          </div>
          <p className="resume-entry-sub">AutoZone · Pocatello, ID</p>
          <p>
            Performed vehicle diagnostics, identified required parts, and
            managed inventory to keep operations running smoothly.
          </p>
        </div>

        <details className="resume-more">
          <summary>Show earlier experience</summary>

          <div className="resume-entry">
            <div className="resume-entry-head">
              <strong>Automotive Service Technician</strong>
              <span>May 2021 – Oct 2021</span>
            </div>
            <p className="resume-entry-sub">Nissan · Pocatello, ID</p>
            <p>
              Performed routine maintenance and diagnostics including tire
              rotations, oil changes, brake flushes, and inspections.
            </p>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-head">
              <strong>Assistant Director of Dining Services</strong>
              <span>Aug 2020 – Nov 2020</span>
            </div>
            <p className="resume-entry-sub">
              Brookdale Senior Living · Pocatello, ID
            </p>
            <p>
              Coordinated dining area setup and upkeep, overseeing dishwashing
              operations and maintaining a welcoming environment for guests.
            </p>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-head">
              <strong>Grounds Maintenance Supervisor</strong>
              <span>Jan 2019 – Jan 2020</span>
            </div>
            <p className="resume-entry-sub">
              Grace Lutheran School · Pocatello, ID
            </p>
            <p>
              Managed full lawn care for the complex with minimal supervision.
            </p>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-head">
              <strong>Summer Maintenance Technician</strong>
              <span>May 2018 – Aug 2018</span>
            </div>
            <p className="resume-entry-sub">21st Century · Pocatello, ID</p>
            <p>
              Supported facility management with trench digging, furniture
              relocation, and general upkeep.
            </p>
          </div>
        </details>
      </section>

      <section className="about-section">
        <h3>Education</h3>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <strong>B.S. Computer Science</strong>
            <span>Oct 2024 – Present</span>
          </div>
          <p className="resume-entry-sub">WGU · Remote</p>
        </div>
      </section>

      <section className="about-section">
        <h3>Certifications</h3>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <strong>Cisco Certified Network Associate (CCNA)</strong>
            <span>Aug 2026 – Aug 2029</span>
          </div>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-head">
            <strong>Linux Essentials Certificate</strong>
            <span>May 2026 – Present</span>
          </div>
          <p className="resume-entry-sub">Linux Professional Institute</p>
        </div>
      </section>

      <section className="about-section about-closing">
        <p>Authorized to work in the US for any employer.</p>
      </section>
    </div>
  );
}


function AboutMeApp() {
  return (
    <div className="text-document">
      <div className="about-header">
        <div className="about-avatar">CF</div>
        <div>
          <h2>Cameron</h2>
          <p className="about-role">Computer Science Student · WGU</p>
        </div>
      </div>

      <div className="about-badges">
        <span className="badge badge-earned">✅ CCNA</span>
        <span className="badge badge-progress">📘 Security+ (in progress)</span>
      </div>

      <section className="about-section">
        <h3>Who I Am</h3>
        <p>
          I'm a Computer Science student focused on building real-world systems,
          not just completing coursework. My main interests are networking,
          cybersecurity, and web development, and I spend a lot of time working
          hands-on in my homelab to actually understand how things work under
          the hood.
        </p>
      </section>

      <section className="about-section">
        <h3>What I'm Working On</h3>
        <p>
          I'm running a Proxmox-based environment with Windows Server, Active
          Directory, DNS, DHCP, and domain-joined clients to simulate real
          enterprise setups and troubleshoot things the way they'd happen in an
          actual IT environment. I recently earned my CCNA and I'm now working
          toward Security+, while continuing to expand into Linux and
          security-focused tooling.
        </p>
      </section>

      <section className="about-section">
        <h3>Development</h3>
        <p>
          On the development side, I've built backend applications using
          Spring Boot and JPA, creating APIs and working with relational data
          models. I like projects that combine software with infrastructure —
          things that behave like real systems instead of isolated apps.
        </p>
      </section>

      <section className="about-section">
        <h3>Outside of Tech</h3>
        <p>
          I'm involved in live audio production, running sound for events and
          working with digital mixing consoles, routing, and signal flow.
          That's pushed me to think more about system design, troubleshooting,
          and consistency under pressure.
        </p>
      </section>

      <section className="about-section about-closing">
        <p>
          This project (CamOS) is a mix of everything I enjoy — development,
          systems thinking, and building something interactive that reflects
          how I approach learning. The goal isn't just to show what I know,
          but how I build, test, and improve things over time.
        </p>
      </section>
    </div>
  );
}

function FileExplorer({ apps, desktopFiles, openApp }) {
  return (
    <div className="file-explorer">
      <aside>
        <p>📁 Desktop</p>
        <p>📁 Projects</p>
        <p>📁 Apps</p>
      </aside>

      <main>
        <h2>Desktop</h2>

        {apps
          .filter((app) => ["projects", "homelab", "aboutme"].includes(app.id))
          .map((app) => (
            <button key={app.id} onClick={() => openApp(app)}>
              {app.icon} {app.name}
            </button>
          ))}

        {desktopFiles.map((file) => (
          <button
            key={file.id}
            onClick={() =>
              openApp({
                id: file.id,
                name: file.name,
                icon: "📄",
                type: "textfile",
              })
            }
          >
            📄 {file.name}
          </button>
        ))}
      </main>
    </div>
  );
}

function ChromeApp() {
  return (
    <div className="chrome-app">
      <div className="chrome-bar">
        <span>🌐</span>
        <input value="https://www.google.com" readOnly />
        <button onClick={() => window.open("https://www.google.com", "_blank")}>
          Open
        </button>
      </div>

      <iframe title="Google" src="https://www.google.com/webhp?igu=1" />
    </div>
  );
}

function CalculatorApp({ calc, pressCalc }) {
  const buttons = [
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
  ];

  return (
    <div className="calculator-app">
      <input value={calc} readOnly placeholder="0" />

      <div className="calc-grid">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => pressCalc(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

function ClockApp({ time }) {
  return (
    <div className="clock-app">
      <h1>{time.toLocaleTimeString()}</h1>
      <p>{time.toLocaleDateString()}</p>
    </div>
  );
}

function TerminalApp({ openApp }) {
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
      output = "commands: help, whoami, projects, homelab, clear, date, secretgame";
    } else if (input === "whoami") {
      output = "guest@camos";
    } else if (input === "projects") {
      output = "Projects: CamOS portfolio, church website, automation scripts";
    } else if (input === "homelab") {
      output = "Homelab: Proxmox, AD DS, DNS, DHCP, Linux labs";
    } else if (input === "date") {
      output = new Date().toString();
    } else if (input === "secretgame") {
          openApp({
            id: "secretgame",
            name: "Secret Game",
            icon: "🕹️",
            type: "secretgame",
          });
          output = "Launching Secret Game...";
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

  const getTouchPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };
  };

  const startDrawingTouch = (e) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getTouchPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const drawTouch = (e) => {
    e.preventDefault();
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getTouchPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
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
        onTouchStart={startDrawingTouch}
        onTouchMove={drawTouch}
        onTouchEnd={stopDrawing}
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

    const moved = { ...piece, y: piece.y + 1 };

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

    const moved = { ...piece, x: piece.x + dx };

    if (!collides(moved)) {
      setPiece(moved);
    }
  };

  const rotatePiece = () => {
    if (!running || gameOver) return;

    const rotatedShape = piece.shape[0].map((_, index) =>
      piece.shape.map((row) => row[index]).reverse()
    );

    const rotated = { ...piece, shape: rotatedShape };

    if (!collides(rotated)) {
      setPiece(rotated);
    }
  };

  const hardDrop = () => {
    if (!running || gameOver) return;

    let newY = piece.y;

    while (!collides({ ...piece, y: newY + 1 })) {
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

    const interval = setInterval(dropPiece, 550);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!running) return;

      if (e.key === "ArrowLeft") movePiece(-1);
      if (e.key === "ArrowRight") movePiece(1);
      if (e.key === "ArrowDown") dropPiece();
      if (e.key === "ArrowUp") rotatePiece();

      if (e.code === "Space") {
        e.preventDefault();
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
          <p>Space Quick Drop</p>
        </div>
        <div className="blocks-touch-controls">
          <button onClick={() => movePiece(-1)}>←</button>
          <button onClick={rotatePiece}>⟳</button>
          <button onClick={() => movePiece(1)}>→</button>
          <button onClick={dropPiece}>↓</button>
          <button onClick={hardDrop}>⤓</button>
        </div>
      </div>
    </div>
  );
}