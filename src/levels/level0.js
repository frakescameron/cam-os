export const level0 = {
  name: "Level 0: Open Ports",
  music: "Factory.mp3",
  background: "/video/spacehole.mp4",
  worldHeight: 3200,
  spawnPlatformId: 1,
  codecLeft: "Models/oldcodec.png",

  platforms: [
    { id: 1, x: 520, y: 3000, width: 400, height: 14 },
    { id: 2, x: 960, y: 2750, width: 200, height: 14 },
    { id: 3, x: 430, y: 2500, width: 180, height: 14 },
  ],

  walls: [
    { id: 1, x: 1170, y: 2460, width: 50, height: 400 },
  ],

  slopes: [],

    goal: {
    x: 860,
    y: 2150,
    width: 80,
    height: 80,
    }
};