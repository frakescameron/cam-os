export const level4 = {
  name: "Level 4: The Firewall",
  music: "fnfahh.mp3",
  background: "/video/level34.mp4",
   worldHeight: 18000,
  spawnPlatformId: 1,
  codecLeft: "Models/evilvga.png",

platforms: [
    // 1. Boot chamber
    { id: 1, x: 120, y: 17680, width: 520, height: 14 },
    { id: 3, x: 1180, y: 17340, width: 160, height: 14 },
    { id: 4, x: 1750, y: 17140, width: 250, height: 14 },

    // 2. First boxed room
   

    { id: 7, x: 1520, y: 16460, width: 130, height: 14 },
    { id: 8, x: 1220, y: 16280, width: 120, height: 14 },
    { id: 9, x: 1680, y: 16100, width: 160, height: 14 },

    // 3. Drop into left tunnel
    { id: 10, x: 680, y: 15920, width: 220, height: 14 },
    { id: 11, x: 220, y: 15730, width: 320, height: 14 },
    { id: 12, x: 80, y: 15480, width: 190, height: 14 },
    { id: 13, x: 520, y: 15280, width: 170, height: 14 },

    // 4. Zigzag box maze
    { id: 14, x: 860, y: 15360, width: 480, height: 14 },
    { id: 15, x: 1480, y: 14920, width: 120, height: 14 },
    
    { id: 17, x: 980, y: 14440, width: 120, height: 14 },
    { id: 18, x: 1940, y: 14240, width: 160, height: 14 },

    // 5. Far right elevator shaft
    { id: 19, x: 1760, y: 14020, width: 170, height: 14 },

    { id: 21, x: 1810, y: 13630, width: 110, height: 14 },

    { id: 23, x: 1800, y: 13240, width: 120, height: 14 },

    // 6. Long left escape
    { id: 24, x: 160, y: 13420, width: 150, height: 14 },
    { id: 25, x: 600, y: 13020, width: 150, height: 14 },
    { id: 26, x: 1640, y: 12620, width: 190, height: 14 },

    // 7. Left mechanical cage
    { id: 27, x: 160, y: 12380, width: 520, height: 14 },
    { id: 28, x: 220, y: 12140, width: 130, height: 14 },


    { id: 31, x: 1080, y: 11580, width: 140, height: 14 },

    // 8. Center pipe bridge
 
    { id: 33, x: 1480, y: 11460, width: 120, height: 14 },
 
    { id: 35, x: 1020, y: 11040, width: 130, height: 14 },
    { id: 36, x: 1620, y: 10560, width: 130, height: 14 },

    // 9. Split boxes
    { id: 37, x: 1000, y: 10320, width: 360, height: 14 },
  
    
   
    { id: 42, x: 180, y: 9400, width: 120, height: 14 },
    { id: 43, x: 800, y: 9120, width: 140, height: 14 },

    // 10. Diagonal slide factory
    { id: 44, x: 1360, y: 8880, width: 150, height: 14 },
    { id: 47, x: 1040, y: 8220, width: 120, height: 14 },
    { id: 48, x: 520, y: 8000, width: 120, height: 14 },

    // 11. Big rectangle climb
    
    { id: 50, x: 320, y: 7480, width: 130, height: 14 },
    { id: 51, x: 640, y: 7280, width: 130, height: 14 },
    { id: 52, x: 300, y: 7080, width: 130, height: 14 },
    { id: 53, x: 760, y: 6880, width: 160, height: 14 },

    // 12. Right data tower
    { id: 54, x: 1340, y: 6660, width: 280, height: 14 },
    { id: 56, x: 840, y: 6340, width: 110, height: 14 },
 
    { id: 58, x: 1700, y: 5880, width: 130, height: 14 },

    // 13. Screen-wide chaos
    { id: 59, x: 1120, y: 5660, width: 110, height: 14 },
    { id: 60, x: 620, y: 5440, width: 110, height: 14 },

    { id: 62, x: 740, y: 5000, width: 100, height: 14 },
    { id: 63, x: 1360, y: 4780, width: 100, height: 14 },
    { id: 64, x: 1860, y: 4560, width: 120, height: 14 },

    // 14. Top circuit rooms
    { id: 65, x: 2320, y: 4320, width: 420, height: 14 },
    { id: 66, x: 980, y: 4100, width: 140, height: 14 },
  

    { id: 69, x: 560, y: 3440, width: 120, height: 14 },
    { id: 70, x: 1080, y: 3220, width: 120, height: 14 },
  

    // 15. Final machine chamber
    { id: 72, x: 1020, y: 2740, width: 260, height: 14 },
    { id: 73, x: 1320, y: 2480, width: 110, height: 14 },
    { id: 74, x: 1580, y: 2300, width: 110, height: 14 },
    { id: 75, x: 1240, y: 2120, width: 110, height: 14 },
    { id: 76, x: 1660, y: 1940, width: 130, height: 14 },
 
    { id: 78, x: 1620, y: 1500, width: 130, height: 14 },
 
    { id: 80, x: 660, y: 1060, width: 120, height: 14 },
    { id: 81, x: 1120, y: 840, width: 120, height: 14 },
    { id: 82, x: 2140, y: 620, width: 100, height: 14 },
    
  ],

  walls: [
    // Boot chamber frame
    { id: 1, x: 80, y: 17280, width: 24, height: 420 },
    { id: 2, x: 660, y: 17280, width: 24, height: 420 },
    { id: 3, x: 80, y: 17280, width: 580, height: 24 },

    // First big box room
    { id: 4, x: 1140, y: 16100, width: 24, height: 780 },
    
  


    // Internal teeth in box
   
    { id: 9, x: 1540, y: 16220, width: 24, height: 260 },
    

    // Left tunnel walls
    { id: 11, x: 40, y: 15240, width: 24, height: 560 },
    { id: 12, x: 720, y: 15320, width: 24, height: 400 },

    { id: 14, x: 40, y: 15240, width: 460, height: 24 },

    // Center box maze frame
    { id: 15, x: 900, y: 14200, width: 24, height: 900 },
    { id: 16, x: 1520, y: 14200, width: 24, height: 900 },

    { id: 18, x: 900, y: 14200, width: 620, height: 24 },
    { id: 19, x: 1160, y: 14680, width: 24, height: 260 },
    { id: 20, x: 1360, y: 14480, width: 24, height: 260 },

    // Far right elevator shaft
    { id: 21, x: 1440, y: 13510, width: 24, height: 600 },
    { id: 22, x: 2280, y: 13200, width: 24, height: 900 },
    { id: 23, x: 1440, y: 14100, width: 540, height: 24 },



    // Long left escape walls
    { id: 26, x: 60, y: 12480, width: 24, height: 760 },
    { id: 27, x: 1340, y: 12600, width: 24, height: 520 },

    { id: 29, x: 760, y: 13040, width: 580, height: 24 },

    // Left mechanical cage
    { id: 30, x: 120, y: 11560, width: 24, height: 840 },


    

    { id: 35, x: 520, y: 11740, width: 24, height: 280 },

    // Center pipe bridge walls
    { id: 36, x: 820, y: 10440, width: 24, height: 940 },
    { id: 37, x: 1880, y: 10440, width: 24, height: 940 },
   
   
    { id: 40, x: 1280, y: 10840, width: 24, height: 260 },


    // Split box frames
    

    // Diagonal factory boundaries
    { id: 54, x: 200, y: 7800, width: 24, height: 1100 },
    { id: 55, x: 1880, y: 7800, width: 24, height: 1100 },

    // Big rectangle climb
    { id: 57, x: 220, y: 6860, width: 24, height: 900 },
    { id: 58, x: 940, y: 6860, width: 24, height: 900 },
  
    

    // Right data tower
  

    { id: 66, x: 1500, y: 6160, width: 24, height: 300 },

    // Screen-wide chaos boundary lines
    { id: 67, x: 40, y: 4480, width: 24, height: 1240 },
    { id: 68, x: 2000, y: 4480, width: 24, height: 1240 },
   

    // Top circuit rooms




    { id: 76, x: 1180, y: 4340, width: 680, height: 24 },


    // Final chamber frame
    { id: 78, x: 360, y: 720, width: 24, height: 1760 },
    { id: 79, x: 1900, y: 720, width: 24, height: 1760 },



  ],

  slopes: [
    { id: 1, x: 640, y: 17420, width: 360, height: 110, direction: "downRight" },
    { id: 2, x: 960, y: 17040, width: 380, height: 120, direction: "downLeft" },

    { id: 3, x: 1180, y: 16680, width: 320, height: 100, direction: "downRight" },
    { id: 4, x: 1420, y: 16480, width: 340, height: 110, direction: "downLeft" },

    { id: 5, x: 240, y: 15620, width: 360, height: 110, direction: "downRight" },


    { id: 7, x: 940, y: 14940, width: 360, height: 120, direction: "downRight" },
    { id: 8, x: 1120, y: 14400, width: 360, height: 120, direction: "downLeft" },

    { id: 9, x: 1500, y: 13720, width: 360, height: 120, direction: "downRight" },
    { id: 10, x: 1180, y: 13300, width: 660, height: 200, direction: "downLeft" },


    { id: 12, x: 380, y: 11720, width: 360, height: 120, direction: "downLeft" },

    { id: 13, x: 860, y: 11180, width: 420, height: 130, direction: "downRight" },
    { id: 14, x: 1340, y: 10740, width: 420, height: 130, direction: "downLeft" },

    { id: 15, x: 300, y: 9880, width: 360, height: 110, direction: "downRight" },
    { id: 16, x: 1060, y: 9680, width: 360, height: 110, direction: "downLeft" },
    { id: 17, x: 360, y: 9440, width: 380, height: 120, direction: "downRight" },

    { id: 18, x: 460, y: 8540, width: 380, height: 120, direction: "downRight" },
    { id: 19, x: 1380, y: 8300, width: 420, height: 130, direction: "downLeft" },
   

    { id: 21, x: 300, y: 7560, width: 360, height: 110, direction: "downRight" },



    { id: 24, x: 1480, y: 5980, width: 360, height: 120, direction: "downLeft" },

    { id: 25, x: 40, y: 5140, width: 420, height: 130, direction: "downRight" },


    { id: 27, x: 0, y: 3580, width: 420, height: 130, direction: "downRight" },
    { id: 28, x: 1560, y: 2860, width: 420, height: 130, direction: "downLeft" },

    { id: 29, x: 520, y: 1540, width: 420, height: 130, direction: "downRight" },

  ],

  goal: {
    x: 1680,
    y:  100,
    width: 80,
    height: 80,
  },
};