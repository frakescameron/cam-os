export const level5 = {
  background: "/video/final.mp4",
  music: "bossfight.mp3",
  name: "Final Boss: Core Trace",
  worldHeight: 10000,
  spawnPlatformId: 1,
  codecLeft: "Models/evilvga.png",
  questionEveryJumps: 5,
  risingHazard: {
    enabled: true,
    startY: 9999,
    speed: 0.15,
  },

  platforms: [
    // Start
    { id: 1, x: 160, y: 9700, width: 420, height: 14 },
    { id: 2, x: 760, y: 9520, width: 180, height: 14 },
    { id: 3, x: 1320, y: 9340, width: 180, height: 14 },
    { id: 4, x: 1780, y: 9160, width: 160, height: 14 },

    // Across and back
    { id: 5, x: 1260, y: 8920, width: 170, height: 14 },
    { id: 6, x: 720, y: 8680, width: 160, height: 14 },
    { id: 7, x: 220, y: 8440, width: 190, height: 14 },

    // Center climb
    { id: 8, x: 680, y: 8200, width: 150, height: 14 },
    { id: 9, x: 1180, y: 7960, width: 150, height: 14 },
    { id: 10, x: 720, y: 7420, width: 160, height: 14 },
    { id: 11, x: 1220, y: 7180, width: 150, height: 14 },
 

    // Slope section
    
    { id: 12, x: 520, y: 7000, width: 150, height: 14 },
    { id: 13, x: 140, y: 6760, width: 170, height: 14 },

    // Long jump section
    { id: 14, x: 760, y: 6480, width: 130, height: 14 },
    { id: 15, x: 1420, y: 6220, width: 130, height: 14 },
    { id: 16, x: 1840, y: 5960, width: 140, height: 14 },

    // Back left
    { id: 17, x: 1260, y: 5680, width: 140, height: 14 },
    { id: 18, x: 700, y: 5420, width: 130, height: 14 },
    { id: 19, x: 180, y: 5160, width: 160, height: 14 },

    // Precision middle
    { id: 20, x: 620, y: 4900, width: 120, height: 14 },
    { id: 21, x: 1060, y: 4660, width: 120, height: 14 },
    { id: 22, x: 920, y: 4220, width: 120, height: 14 },

    // Slope reset
    
    { id: 24, x: 920, y: 3880, width: 130, height: 14 },
    { id: 25, x: 220, y: 3520, width: 150, height: 14 },

    // Final climb
    { id: 26, x: 760, y: 3240, width: 120, height: 14 },
    { id: 27, x: 1280, y: 2960, width: 120, height: 14 },
    { id: 28, x: 1420, y: 2450, width: 140, height: 14 },
    { id: 29, x: 1220, y: 2260, width: 130, height: 14 },
    { id: 30, x: 720, y: 1960, width: 130, height: 14 },
    { id: 31, x: 260, y: 1660, width: 160, height: 14 },

    // End
    { id: 32, x: 760, y: 1320, width: 140, height: 14 },
    { id: 33, x: 1260, y: 980, width: 140, height: 14 },

  ],

  walls: [],

  slopes: [
    { id: 1, x: 1800, y: 7480, width: 360, height: 110, direction: "downLeft" },
    { id: 2, x: 800, y: 7540, width: 360, height: 110, direction: "downRight" },

    { id: 3, x: 1860, y: 4180, width: 340, height: 100, direction: "downLeft" },
    { id: 4, x: 340, y: 3900, width: 340, height: 100, direction: "downRight" },

    { id: 5, x: 1980, y: 2520, width: 340, height: 100, direction: "downLeft" },
  ],

  goal: {
    x: 1640,
    y: 520,
    width: 80,
    height: 80,
  },
};