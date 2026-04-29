export const level1 = {
  name: "Level 1: Network Basics",
  music: "Concre.mp3",
  background: "video/spacehole.mp4",
  worldHeight: 3500,
  spawnPlatformId: 1,
  codecLeft: "Models/oldcodec.png",

  platforms: [
    // Spawn / early climb
    { id: 1, x: 420, y: 3000, width: 520, height: 14 },
    { id: 2, x: 700, y: 2700, width: 800, height: 80 },
    { id: 3, x: 1000, y: 2200, width: 400, height: 14 },
    { id: 4, x: 600, y: 1800, width: 200, height: 14 },
    { id: 5, x: 300, y: 1600, width: 200, height: 14 },
    { id: 6, x: 1300, y: 1370, width: 200, height: 14 },
    { id: 7, x: 500, y: 1000, width: 200, height: 14 },
    { id: 8, x: 1200, y: 800, width: 200, height: 14 },
    { id: 9, x: 200, y: 500, width: 800, height: 14 },

  ],

  walls: [
    // Lower area blockers
    { id: 1, x: 180, y: 2400, width: 24, height: 500 },
    { id: 2, x: 1700, y: 2000, width: 24, height: 500 },
  ],

  slopes: [
    { id: 1, x: 450, y: 2560, width: 280, height: 90, direction: "downRight" },
    { id: 2, x: 900, y: 1400, width: 400, height: 120, direction: "downLeft" },
  ],

  goal: {
    x: 560,
    y: 120,
    width: 160,
    height: 160,
  },
};