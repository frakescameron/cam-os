export const level2 = {
  name: "Level 2: Firewall",
  music: "frequnce.mp3",
  background: "/video/level2.mp4",
  worldHeight: 5000,
  spawnPlatformId: 1,
  codecLeft: "Models/oldcodec.png",

platforms: [
  // Start / lower left route
  { id: 1, x: 220, y: 2700, width: 360, height: 14 },
  { id: 2, x: 650, y: 2580, width: 130, height: 14 },
  { id: 3, x: 920, y: 2460, width: 150, height: 14 },

  // Left climb
  { id: 4, x: 320, y: 2360, width: 260, height: 14 },
  { id: 5, x: 120, y: 2210, width: 120, height: 14 },
  { id: 6, x: 300, y: 2050, width: 180, height: 14 },
  { id: 7, x: 560, y: 1880, width: 150, height: 14 },

  // Center transition
  { id: 8, x: 820, y: 2100, width: 170, height: 14 },
  { id: 9, x: 1040, y: 1920, width: 150, height: 14 },

  // Center tower climb
  { id: 10, x: 850, y: 1740, width: 180, height: 14 },
  { id: 11, x: 1090, y: 1580, width: 150, height: 14 },
  { id: 12, x: 820, y: 1420, width: 170, height: 14 },
  { id: 13, x: 1060, y: 1260, width: 160, height: 14 },

  // Right exit route
  { id: 14, x: 1320, y: 1450, width: 210, height: 14 },
  { id: 15, x: 1500, y: 1240, width: 380, height: 14 },
  { id: 16, x: 1165, y: 1040, width: 180, height: 14 },

  // Final platform
  { id: 17, x: 900, y: 820, width: 420, height: 14 },
  { id: 18, x: 920, y: 380, width: 280, height: 14 },
  { id: 19, x: 900, y: 120, width: 160, height: 14 },
],

walls: [
  // Left boundary
  { id: 1, x: 40, y: 2100, width: 24, height: 700 },

  // Simple left structure
  { id: 2, x: 300, y: 2360, width: 24, height: 180 },
  { id: 3, x: 580, y: 2360, width: 24, height: 180 },

  // Center tower sides
  { id: 4, x: 760, y: 1260, width: 24, height: 520 },
  { id: 5, x: 1230, y: 1260, width: 24, height: 520 },

  // Right structure
  { id: 6, x: 1550, y: 1040, width: 24, height: 440 },

  // Final blocker / edge
  { id: 7, x: 1320, y: 820, width: 24, height: 220 },
  { id: 8, x: 1870, y: 820, width: 60, height: 240 },
  { id: 9, x: 420, y: 300, width: 60, height: 240 },
  { id: 10, x: 420, y: -50, width: 60, height: 240 },
],

slopes: [
],

    goal: {
    x: 960,
    y: 50,
    width: 80,
    height: 80,
    }
};