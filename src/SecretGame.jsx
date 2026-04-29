import { useEffect, useRef, useState } from "react";
import "./SecretGame.css";
import { levels } from "./levels";
import { questions } from "./questions";
import { dialogue } from "./dialogue";
import { level5 } from "./levels/level5";

const SETTINGS = {
  green: { label: "OPTIMAL", maxChargeMs: 2000 },
  yellow: { label: "DEGRADED", maxChargeMs: 5000 },
  red: { label: "UNSTABLE", maxChargeMs: 300 },
};

const PLAYER_SIZE = 55;

const BASE = import.meta.env.BASE_URL;
const CAMERA_DEAD_ZONE_Y = 280;

const LEVEL_CODES = {
  DNS: 0,
  TCP: 1,
  UDP: 2,
  PORT: 3,
  CAT6: 4,
  RJ45: 5,
};


function SecretGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = levels[levelIndex];
  const [levelCleared, setLevelCleared] = useState(false);

  const platforms = currentLevel.platforms;
  const walls = currentLevel.walls;
  const slopes = currentLevel.slopes;
  const goal = currentLevel.goal;
  const WORLD_HEIGHT = currentLevel.worldHeight;
  const [displayedText, setDisplayedText] = useState("");

  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const dialogueAudioRef = useRef(null);
  const skipTypingRef = useRef(false);
  const typingIntervalRef = useRef(null);

  const currentDialogueSet = dialogue[`level${levelIndex}`] || [];
  const currentLine = currentDialogueSet[dialogueIndex];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionJumpCount, setQuestionJumpCount] = useState(0);
  const [levelJumpCount, setLevelJumpCount] = useState(0);

  const currentQuestion = questions[questionIndex];

  const levelRef = useRef(currentLevel);

    useEffect(() => {
      levelRef.current = currentLevel;
    }, [currentLevel]);

  const [cameraY, setCameraY] = useState(WORLD_HEIGHT - window.innerHeight);
  const cameraYRef = useRef(WORLD_HEIGHT - window.innerHeight);

  const [screen, setScreen] = useState("pre");
  const [showQuestion, setShowQuestion] = useState(false);
  const [won, setWon] = useState(false);

  const [player, setPlayer] = useState({
    x: 600,
    y: WORLD_HEIGHT - 40,
    vx: 0,
    vy: 0,
    grounded: true,
  });

  const [answerState, setAnswerState] = useState(null);
  const [maxChargeMs, setMaxChargeMs] = useState(3000);
  const [chargeMs, setChargeMs] = useState(0);

  const audioRef = useRef(null);
  const startAudioRef = useRef(null);

  const [deaths, setDeaths] = useState(0);
  const deathAudioRef = useRef(null);
  const [unstableStreak, setUnstableStreak] = useState(0);

  const showDialogueRef = useRef(showDialogue);
    useEffect(() => {
      showDialogueRef.current = showDialogue;
    }, [showDialogue]);

  const keys = useRef({});
  const playerRef = useRef(player);
  const chargingRef = useRef(false);
  const chargeRef = useRef(0);
  const maxChargeRef = useRef(maxChargeMs);
  const screenRef = useRef(screen);
  const showQuestionRef = useRef(showQuestion);
  const answerStateRef = useRef(answerState);
  const wonRef = useRef(won);
  const displayedTextRef = useRef(displayedText);
  const currentLineRef = useRef(currentLine);
  const currentDialogueSetRef = useRef(currentDialogueSet);

  const [cutscene, setCutscene] = useState(null);
  const [levelCodeInput, setLevelCodeInput] = useState("");

  const [hazardY, setHazardY] = useState(null);
  const [bossDeathPrompt, setBossDeathPrompt] = useState(false);
  const hazardYRef = useRef(hazardY);
  const maxJumps = currentLevel.questionEveryJumps || 10;

useEffect(() => {
  hazardYRef.current = hazardY;
}, [hazardY]);

useEffect(() => {
  if (screen !== "game") return;
  if (!audioRef.current) return;

  audioRef.current.pause();
  audioRef.current.src = `${BASE}audio/${currentLevel.music}`;
  audioRef.current.currentTime = 0;
  audioRef.current.volume = 0.4;
  audioRef.current.play().catch((e) => console.log(e));
}, [levelIndex, screen]);

useEffect(() => {
  displayedTextRef.current = displayedText;
}, [displayedText]);

useEffect(() => {
  currentLineRef.current = currentLine;
  currentDialogueSetRef.current = currentDialogueSet;
}, [currentLine, currentDialogueSet]);

useEffect(() => {
  if (!showDialogue || !currentLine) return;

  if (typingIntervalRef.current) {
    clearInterval(typingIntervalRef.current);
  }

  let i = 0;
  skipTypingRef.current = false;
  setDisplayedText("");
  displayedTextRef.current = "";

  typingIntervalRef.current = setInterval(() => {
    if (skipTypingRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
      return;
    }

    i++;
    const nextText = currentLine.text.slice(0, i);

    setDisplayedText(nextText);
    displayedTextRef.current = nextText;

    if (i >= currentLine.text.length) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, 40);

  return () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  };
}, [dialogueIndex, showDialogue]);

  useEffect(() => {
  if (!showDialogue || !currentLine) return;

  const audio = new Audio(`${BASE}audio/${currentLine.voice}`);
  audio.volume = 0.7;
  audio.play().catch(() => {});
}, [dialogueIndex, showDialogue]);

  useEffect(() => {
  cameraYRef.current = cameraY;
}, [cameraY]);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    maxChargeRef.current = maxChargeMs;
  }, [maxChargeMs]);

  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);

  useEffect(() => {
    showQuestionRef.current = showQuestion;
  }, [showQuestion]);

  useEffect(() => {
    answerStateRef.current = answerState;
  }, [answerState]);

  useEffect(() => {
    wonRef.current = won;
  }, [won]);


  function continueToNextLevel() {
    setLevelCleared(false);
    setLevelJumpCount(0);
    setQuestionJumpCount(0);
    goToNextLevel();
  }

  function exitToMenu() {
    setLevelCleared(false);
    stopGameMusic();
    setScreen("start");
  }

  function skipToLevelByCode() {
  const code = levelCodeInput.trim().toUpperCase();
  const targetIndex = LEVEL_CODES[code];

  if (targetIndex === undefined) {
    alert("Invalid level code");
    return;
  }

  setLevelIndex(targetIndex);
  setLevelCodeInput("");
  setCutscene(null);
  setScreen("game");
  setShowDialogue(true);
  setDialogueIndex(0);
  setShowQuestion(false);
  setWon(false);
  setLevelCleared(false);
  setLevelJumpCount(0);
  setQuestionJumpCount(0);
  setAnswerState(null);

  

  const targetLevel = levels[targetIndex];
  const spawnPlatform = targetLevel.platforms.find(
    (p) => p.id === targetLevel.spawnPlatformId
  );

  const hazard = targetLevel.risingHazard;
setHazardY(hazard?.enabled ? hazard.startY : null);
setBossDeathPrompt(false);

  const nextPlayer = {
    x: spawnPlatform.x + spawnPlatform.width / 2,
    y: spawnPlatform.y - PLAYER_SIZE / 2,
    vx: 0,
    vy: 0,
    grounded: true,

  
  };

  setPlayer(nextPlayer);
  playerRef.current = nextPlayer;

  setCameraY(targetLevel.worldHeight - window.innerHeight);
  cameraYRef.current = targetLevel.worldHeight - window.innerHeight;
}
    
  function goToNextLevel() {
    const nextIndex = levelIndex + 1;

if (nextIndex >= levels.length) {
  setLevelCleared(false);
  setCutscene("ending");
  return;
}

    const nextLevel = levels[nextIndex];
    const spawnPlatform = nextLevel.platforms.find(
      (platform) => platform.id === nextLevel.spawnPlatformId
    );

    const nextPlayer = {
      x: spawnPlatform.x + spawnPlatform.width / 2,
      y: spawnPlatform.y - PLAYER_SIZE,
      vx: 0,
      vy: 0,
      grounded: true,
    };


    setShowDialogue(true);
    setDialogueIndex(0);
    setLevelIndex(nextIndex);
    setPlayer(nextPlayer);
    playerRef.current = nextPlayer;

    setCameraY(nextLevel.worldHeight - window.innerHeight);
    cameraYRef.current = nextLevel.worldHeight - window.innerHeight;

    setShowQuestion(false);
    setAnswerState(null);
    setChargeMs(0);
    chargeRef.current = 0;
    chargingRef.current = false;

    const hazard = nextLevel.risingHazard;
setHazardY(hazard?.enabled ? hazard.startY : null);
setBossDeathPrompt(false);
}



  function playMenuMusic() {
    if (!startAudioRef.current) return;

    startAudioRef.current.volume = 0.4;
    startAudioRef.current.play().catch((e) => console.log(e));
  }

  function playGameMusic() {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.4;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((e) => console.log(e));
  }

  function stopMenuMusic() {
    if (!startAudioRef.current) return;

    startAudioRef.current.pause();
    startAudioRef.current.currentTime = 0;
  }

  function stopGameMusic() {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  function restartLevel() {
  const current = levelRef.current;
  const spawnPlatform = current.platforms.find(
    (p) => p.id === current.spawnPlatformId
  );

  const restartedPlayer = {
    x: spawnPlatform.x + spawnPlatform.width / 2,
    y: spawnPlatform.y - PLAYER_SIZE,
    vx: 0,
    vy: 0,
    grounded: true,
  };

  setPlayer(restartedPlayer);
  playerRef.current = restartedPlayer;

  setCameraY(current.worldHeight - window.innerHeight);
  cameraYRef.current = current.worldHeight - window.innerHeight;

  setLevelJumpCount(0);
  setQuestionJumpCount(0);
  setBossDeathPrompt(false);

  const hazard = current.risingHazard;
  setHazardY(hazard?.enabled ? hazard.startY : null);

  setShowDialogue(true);
  setDialogueIndex(0);
  setShowQuestion(false);
  setAnswerState(null);
  setChargeMs(0);
  chargeRef.current = 0;
  chargingRef.current = false;
}

 function startGame() {
  setCameraY(WORLD_HEIGHT - window.innerHeight);
  cameraYRef.current = WORLD_HEIGHT - window.innerHeight;

  stopMenuMusic();
  setShowDialogue(true);
  setDialogueIndex(0);
  setScreen("game");
  setShowQuestion(false);
  setWon(false);
  setAnswerState(null);
  setChargeMs(0);
  chargeRef.current = 0;

  const hazard = currentLevel.risingHazard;
setHazardY(hazard?.enabled ? hazard.startY : null);
setBossDeathPrompt(false);

    const spawnPlatform = platforms[0];

    const startingPlayer = {
      x: spawnPlatform.x + spawnPlatform.width / 2,
      y: spawnPlatform.y - PLAYER_SIZE,
      vx: 0,
      vy: 0,
      grounded: true,
    };

  setPlayer(startingPlayer);
  playerRef.current = startingPlayer;
}

function respawnPlayer() {
  const deathSound = new Audio(`${BASE}audio/dial.mp3`);
  deathSound.volume = 0.7;
  deathSound.play().catch((e) => console.log(e));

  setDeaths((count) => count + 1);

  const current = levelRef.current;

  const spawnPlatform = current.platforms.find(
    (p) => p.id === current.spawnPlatformId
  );

  const respawnedPlayer = {
    x: spawnPlatform.x + spawnPlatform.width / 2,
    y: spawnPlatform.y - PLAYER_SIZE,
    vx: 0,
    vy: 0,
    grounded: true,
  };

  setPlayer(respawnedPlayer);
  playerRef.current = respawnedPlayer;

  setCameraY(current.worldHeight - window.innerHeight);
  cameraYRef.current = current.worldHeight - window.innerHeight;

  chargingRef.current = false;
  chargeRef.current = 0;
  setChargeMs(0);
}

  function backToStart() {
    stopGameMusic();
    setScreen("start");
  }

function chooseAnswer(result) {
  setAnswerState(result);
  setShowQuestion(false);

  if (result === "green") {
    setMaxChargeMs(950);
    setUnstableStreak(0);
  }

  if (result === "yellow") {
    setMaxChargeMs(5000);
    setUnstableStreak(0);
  }

  if (result === "red") {
    setMaxChargeMs(300);

    setUnstableStreak((streak) => {
      const nextStreak = streak + 1;

      if (nextStreak >= 3) {
        setTimeout(() => {
          respawnPlayer();
          setUnstableStreak(0);
        }, 0);

        return 0;
      }

      return nextStreak;
    });
  }

  setChargeMs(0);
  chargeRef.current = 0;
}


  function releaseJump() {
    const p = playerRef.current;

if (
      showQuestionRef.current ||
      screenRef.current !== "game" ||
      !answerStateRef.current ||
      wonRef.current ||
      !chargingRef.current
    ) {
      return;
    }

   const power = Math.min(chargeRef.current / maxChargeRef.current, 1);
const jumpPower = 7 + power * 8;

let horizontalPower = 0;

if (keys.current.ArrowLeft || keys.current.KeyA) {
  horizontalPower = -14;
}

if (keys.current.ArrowRight || keys.current.KeyD) {
  horizontalPower = 14;
}

const nextPlayer = {
  ...p,
  vx: horizontalPower * power,
  vy: -jumpPower,
  grounded: false,
};

setLevelJumpCount((count) => count + 1);

setQuestionJumpCount((count) => {
  const nextCount = count + 1;

  const jumpsNeeded = levelRef.current.questionEveryJumps || 10;

if (nextCount >= jumpsNeeded) {
    setShowQuestion(true);
    setQuestionIndex((index) => {
      const nextIndex = index + 1;
      return nextIndex >= questions.length ? 0 : nextIndex;
    });

    return 0;
  }

  return nextCount;
});
    setPlayer(nextPlayer);
    playerRef.current = nextPlayer;

    chargingRef.current = false;
    chargeRef.current = 0;
    setChargeMs(0);
  }

function checkGoalCollision(p) {
  const goal = levelRef.current.goal;

  return (
    p.x + PLAYER_SIZE / 2 > goal.x &&
    p.x - PLAYER_SIZE / 2 < goal.x + goal.width &&
    p.y + PLAYER_SIZE / 2 > goal.y &&
    p.y - PLAYER_SIZE / 2 < goal.y + goal.height
  );
}

function handlePlatformCollision(oldP, newP) {
  let p = { ...newP };

  for (const platform of levelRef.current.platforms) {
    const playerLeft = p.x - PLAYER_SIZE / 2;
    const playerRight = p.x + PLAYER_SIZE / 2;
    const playerTop = p.y - PLAYER_SIZE / 2;
    const playerBottom = p.y + PLAYER_SIZE / 2;

    const oldLeft = oldP.x - PLAYER_SIZE / 2;
    const oldRight = oldP.x + PLAYER_SIZE / 2;
    const oldTop = oldP.y - PLAYER_SIZE / 2;
    const oldBottom = oldP.y + PLAYER_SIZE / 2;

    const overlaps =
      playerRight > platform.x &&
      playerLeft < platform.x + platform.width &&
      playerBottom > platform.y &&
      playerTop < platform.y + platform.height;

    if (!overlaps) continue;

    // Land on top
    if (oldBottom <= platform.y) {
      p.y = platform.y - PLAYER_SIZE / 2;
      p.vy = 0;
      p.grounded = true;
    }

    // Hit underside
    else if (oldTop >= platform.y + platform.height) {
      p.y = platform.y + platform.height + PLAYER_SIZE / 2;
      p.vy = 0;
    }

    // Hit left side
    else if (oldRight <= platform.x) {
      p.x = platform.x - PLAYER_SIZE / 2;
      p.vx = -Math.abs(p.vx) * 0.4;
    }

    // Hit right side
    else if (oldLeft >= platform.x + platform.width) {
      p.x = platform.x + platform.width + PLAYER_SIZE / 2;
      p.vx = Math.abs(p.vx) * 0.4;
    }
  }

  return p;
}
    function skipDialogue() {
      setShowDialogue(false);
      setDialogueIndex(0);
      setDisplayedText("");
      setShowQuestion(true);
    } 


function handleWallCollision(oldP, newP) {
  let p = { ...newP };

  for (const wall of levelRef.current.walls) {
    const playerTop = p.y - PLAYER_SIZE / 2;
    const playerBottom = p.y + PLAYER_SIZE / 2;
    const playerLeft = p.x - PLAYER_SIZE / 2;
    const playerRight = p.x + PLAYER_SIZE / 2;

    const overlaps =
      playerRight > wall.x &&
      playerLeft < wall.x + wall.width &&
      playerBottom > wall.y &&
      playerTop < wall.y + wall.height;

    if (overlaps) {
      // came from left → hit left side of wall
      if (oldP.x < wall.x) {
        p.x = wall.x - PLAYER_SIZE / 2;

        // 🔥 bounce right → left
        p.vx = -Math.abs(p.vx) * 0.8;
      } else {
        // came from right → hit right side
        p.x = wall.x + wall.width + PLAYER_SIZE / 2;

        // 🔥 bounce left → right
        p.vx = Math.abs(p.vx) * 0.8;
      }
    }
  }

  return p;
}

function handleSlopeCollision(oldP, newP) {
  let p = { ...newP };

  for (const slope of levelRef.current.slopes) {
    const playerBottom = p.y + PLAYER_SIZE / 2;
    const playerTop = p.y - PLAYER_SIZE / 2;
    const oldBottom = oldP.y + PLAYER_SIZE / 2;
    const oldTop = oldP.y - PLAYER_SIZE / 2;

    const playerLeft = p.x - PLAYER_SIZE / 2;
    const playerRight = p.x + PLAYER_SIZE / 2;

    const overlappingX =
      playerRight > slope.x &&
      playerLeft < slope.x + slope.width;

    if (!overlappingX) continue;

    const t = (p.x - slope.x) / slope.width;

    let surfaceY;

    if (slope.direction === "downRight") {
      surfaceY = slope.y + t * slope.height;
    } else {
      surfaceY = slope.y + (1 - t) * slope.height;
    }

    // block jumping up through the diagonal platform
    const hitUnderside =
      oldTop >= surfaceY &&
      playerTop <= surfaceY &&
      p.vy < 0;

    if (hitUnderside) {
      p.y = surfaceY + PLAYER_SIZE / 2;
      p.vy = 0;
      return p;
    }

    const distance = playerBottom - surfaceY;

    if (
      p.vy >= -2 &&
      distance >= -4 &&
      distance <= 12
    ) {
      p.y = surfaceY - PLAYER_SIZE / 2;
      p.grounded = true;
      p.vy = 0;

      const dir = slope.direction === "downRight" ? 1 : -1;
      const slideSpeed = 1.2;

      p.vx = p.vx * 0.7 + dir * slideSpeed;
    }
  }

  return p;
}

 useEffect(() => {
  function keyDown(e) {
    keys.current[e.code] = true;

    

  if (e.code === "Escape" && cutscene) {
    e.preventDefault();

    if (cutscene === "intro") {
      setCutscene(null);
      startGame();
    }

    if (cutscene === "ending") {
      setCutscene(null);
      setScreen("start");
    }

    return;
  }

  if (showQuestionRef.current) {
    const numberMap = {
      Digit1: 0,
      Numpad1: 0,
      Digit2: 1,
      Numpad2: 1,
      Digit3: 2,
      Numpad3: 2,
    };

    const answerIndex = numberMap[e.code];

    if (answerIndex !== undefined) {
      e.preventDefault();
      const answer = currentQuestion.answers[answerIndex];

    if (answer) {
      chooseAnswer(answer.result);
    }

    return;
  }
}

    if (e.code === "Escape" && showDialogueRef.current) {
      e.preventDefault();
      skipDialogue();
      return;
    }

    if (e.code === "Space" && showDialogueRef.current) {
      e.preventDefault();

      const line = currentLineRef.current;
      const set = currentDialogueSetRef.current;

      if (!line) return;

      if (displayedTextRef.current !== line.text) {
        skipTypingRef.current = true;

        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }

        setDisplayedText(line.text);
        displayedTextRef.current = line.text;
        return;
      }

      setDialogueIndex((i) => {
        const next = i + 1;

        if (next >= set.length) {
          setShowDialogue(false);
          setShowQuestion(true);
          return 0;
        }

        return next;
      });

      return;
    }

    if (
      e.code === "Space" &&
      playerRef.current.grounded &&
      !chargingRef.current &&
      screenRef.current === "game" &&
      !showDialogueRef.current &&
      !showQuestionRef.current &&
      answerStateRef.current &&
      !wonRef.current
    ) {
      e.preventDefault();
      chargingRef.current = true;
      chargeRef.current = 0;
      setChargeMs(0);
    }
  }

  function keyUp(e) {
    keys.current[e.code] = false;

    if (e.code === "Space") {
      e.preventDefault();

      if (!showDialogueRef.current) {
        releaseJump();
      }
    }
  }

  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);

  return () => {
    window.removeEventListener("keydown", keyDown);
    window.removeEventListener("keyup", keyUp);
  };
}, []);

  useEffect(() => {
    let lastTime = performance.now();
    let animationId;

    function gameLoop(time) {
      const delta = time - lastTime;
      lastTime = time;

 if (
  screenRef.current !== "game" ||
  wonRef.current ||
  showDialogueRef.current ||
  levelCleared ||
  bossDeathPrompt
) {
        animationId = requestAnimationFrame(gameLoop);
        return;
      }

      const oldP = { ...playerRef.current };
      let p = { ...playerRef.current };

if (p.grounded) {
  p.vx *= 0.92;   // light friction so slopes can still move you
} else {
  p.vx *= 0.995;  // slight air drag
}
      if (!p.grounded) {
        p.vy += 0.22;
    }

      p.x += p.vx;
      p.y += p.vy;

      p.grounded = false;

      if (p.x < PLAYER_SIZE / 2) {
        p.x = PLAYER_SIZE / 2;
        p.vx = 0;
      }

      if (p.x > window.innerWidth - PLAYER_SIZE / 2) {
        p.x = window.innerWidth - PLAYER_SIZE / 2;
        p.vx = 0;
      }
      p = handlePlatformCollision(oldP, p);
      p = handleSlopeCollision(oldP, p);
      p = handleWallCollision(oldP, p);

      const hazard = levelRef.current.risingHazard;

if (hazard?.enabled && hazardYRef.current !== null) {
  const nextHazardY = hazardYRef.current - hazard.speed;

  hazardYRef.current = nextHazardY;
  setHazardY(nextHazardY);

  if (p.y + PLAYER_SIZE / 2 >= nextHazardY) {
    setBossDeathPrompt(true);
    setDeaths((count) => count + 1);
    animationId = requestAnimationFrame(gameLoop);
    return;
  }
}

      // allow holding SPACE before landing to start charging once grounded
if (
  p.grounded &&
  keys.current.Space &&
  !chargingRef.current &&
  !showQuestionRef.current &&
  answerStateRef.current &&
  !wonRef.current
) {
  chargingRef.current = true;
  chargeRef.current = 0;
  setChargeMs(0);
}

const currentWorldHeight = levelRef.current.worldHeight;

if (p.y > currentWorldHeight + 100) {
  respawnPlayer();
  animationId = requestAnimationFrame(gameLoop);
  return;
}

if (checkGoalCollision(p)) {
  setLevelCleared(true);
  animationId = requestAnimationFrame(gameLoop);
  return;
}

    let nextCameraY = cameraYRef.current;
            const playerScreenY = p.y - nextCameraY;

            // Follow upward
            if (playerScreenY < CAMERA_DEAD_ZONE_Y) {
              nextCameraY = p.y - CAMERA_DEAD_ZONE_Y;
            }

            // Follow downward when falling
            if (playerScreenY > window.innerHeight - 260) {
              nextCameraY = p.y - (window.innerHeight - 260);
            }

            nextCameraY = Math.max(
              0,
              Math.min(nextCameraY, levelRef.current.worldHeight - window.innerHeight)
            );

            cameraYRef.current = nextCameraY;
            setCameraY(nextCameraY);

      playerRef.current = p;
      setPlayer(p);

      if (chargingRef.current) {
        chargeRef.current += delta;
        setChargeMs(chargeRef.current);
      }

      animationId = requestAnimationFrame(gameLoop);
    }

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const chargePercent = Math.min((chargeMs / maxChargeMs) * 100, 100);

  if (cutscene === "intro") {
  return (
    <main className="cutscene-screen">
      <video
        className="cutscene-video"
        src={`${BASE}video/intro.mp4`}
        autoPlay
        onEnded={() => {
          setCutscene(null);
          startGame();
        }}
      />

      <button
        className="cutscene-skip"
        onClick={() => {
          setCutscene(null);
          startGame();
        }}
      >
        SKIP / ESC
      </button>
    </main>
  );
}

if (cutscene === "ending") {
  return (
    <main className="cutscene-screen">
      <video
        className="cutscene-video"
        src={`${BASE}video/ending.mp4`}
        autoPlay
        onEnded={() => {
          setCutscene(null);
          setScreen("start");
        }}
      />

      <button
        className="cutscene-skip"
        onClick={() => {
          setCutscene(null);
          setScreen("start");
        }}
      >
        SKIP / ESC
      </button>
    </main>
  );
}

  if (screen === "pre") {
  return (
    <main
      className="start-screen"
      onClick={() => {
        playMenuMusic();
        setScreen("start");
      }}
    >
      <video
        className="bg-video"
        src={`${BASE}video/starty.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />

      <audio ref={startAudioRef} src={`${BASE}audio/ironclad.mp3`} loop />
      <audio
          ref={audioRef}
          src={`${BASE}audio/chrometempest.mp3`}
          loop
          preload="auto"
        />

      <div className="start-card">
        <h1>Port Jumpers</h1>
        <p>Click anywhere to start</p>
      </div>
    </main>
  );
}

  if (screen === "start") {
    return (
      <main className="start-screen" onClick={playMenuMusic}>
        <video
          className="bg-video"
          src={`${BASE}video/starty.mp4`}
          autoPlay
          loop
          muted
          playsInline
        />

        <audio ref={startAudioRef} src={`${BASE}audio/ironclad.mp3`} loop />
        <audio ref={audioRef} loop />
        <audio ref={deathAudioRef} src={`${BASE}audio/dial.mp3`} preload="auto" />



        <div className="start-card">
          <h1>PORT JUMPERS</h1>
          <p>The network was fixed once. It did not stay that way.</p>

          <button onClick={() => setCutscene("intro")}>Play</button>
          <button onClick={() => setScreen("how")}>How to Play</button>
        </div>

        <div className="level-code-box">
  <p>Input code to skip to level</p>

  <input
  onKeyDown={(e) => {
  if (e.key === "Enter") {
    skipToLevelByCode();
  }
}}
    value={levelCodeInput}
    onChange={(e) => setLevelCodeInput(e.target.value)}
  />

  <button onClick={skipToLevelByCode}>Load Level</button>
</div>
      </main>
    );
  }

  if (screen === "how") {
    return (
      <main className="start-screen" onClick={playMenuMusic}>
        <video
          className="bg-video"
          src={`${BASE}video/starty.mp4`}
          autoPlay
          loop
          muted
          playsInline
        />

        <audio ref={startAudioRef} src={`${BASE}audio/ironclad.mp3`} loop />
        <audio ref={audioRef} loop />

        <div className="start-card">
          <h1>How to Play</h1>
          <p>Answer networking questions to control how your jump charges.</p>
          <p>Optimal = 3 second full charge.</p>
          <p>Degraded = 10 second full charge.</p>
          <p>Unstable = 1 second full charge.</p>
          <p>Move with A / D or arrow keys. Hold SPACE to charge. Release SPACE to jump.</p>

          <button onClick={startGame}>Play</button>
          <button onClick={() => setScreen("start")}>Back</button>
        </div>
              <div className="level-code-box">
        <p>Input code to skip to level</p>

        <input
          value={levelCodeInput}
          onChange={(e) => setLevelCodeInput(e.target.value)}
          onKeyDown={(e) => {
  if (e.key === "Enter") {
    skipToLevelByCode();
  }
}}
        />

        <button onClick={skipToLevelByCode}>Load Level</button>
      </div>
      </main>
    
    );
  }

let playerImage = `${BASE}Models/rjcuteyes.PNG`;

if (chargingRef.current) {
  playerImage = `${BASE}Models/player-squat-2.png`;
}

  return (
    <main className="game">


      {hazardY !== null && (
  <div
    className="rising-hazard"
    style={{
      top: hazardY - cameraY,
    }}
  />
)}

{bossDeathPrompt && (
  <div className="question-overlay">
    <div className="question-modal">
      <h2>CONNECTION TERMINATED</h2>
      <p>The core trace caught you.</p>

      <button onClick={restartLevel}>Restart Level</button>
      <button onClick={backToStart}>Main Menu</button>
    </div>
  </div>
)}
      
<div className="hud">
  <div>ERRORS: {deaths.toString(2).padStart(8, "0")}</div>
  <div>JUMPS: {levelJumpCount.toString(2).padStart(8, "0")}</div>
  <div>UNSTABLE: {unstableStreak}/3</div>


<div>
  JUMPS REMAINING: {maxJumps - (levelJumpCount % maxJumps)}
</div>
  
</div>

    <video
      key={currentLevel.background}
      className="bg-video"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={`${BASE}${currentLevel.background}`} type="video/mp4" />
    </video>

     <audio ref={audioRef} loop />

    <img
      src={`${BASE}Models/nas.png`}
      className="goal"
      style={{
        position: "absolute",
        left: goal.x,
        top: goal.y - cameraY,
        width: goal.width,
        height: goal.height,
        objectFit: "contain",
        pointerEvents: "none",
      }}
    />

{platforms.map((platform) => (
  <img
    key={platform.id}
    src={`${BASE}Models/switcher.webp`}
    className="platform"
    style={{
      position: "absolute",
      left: platform.x,
      top: platform.y - cameraY,
      width: platform.width,
      height: platform.height,
      objectFit: "cover",
      pointerEvents: "none",
    }}
  />
))}

{walls.map((wall) => (
  <img
    key={wall.id}
    src={`${BASE}Models/switcher.webp`}
    style={{
      position: "absolute",
      left: wall.x,
      top: wall.y - cameraY,
      width: wall.height,
      height: wall.width,
      objectFit: "cover",
      transform: "rotate(90deg) translateY(-100%)",
      transformOrigin: "top left",
      pointerEvents: "none",
    }}
  />
))}

{slopes.map((slope) => (
  <img
    key={slope.id}
    src={`${BASE}Models/switcher.webp`}
    style={{
      position: "absolute",
      left: slope.x,
      top: slope.y - cameraY,
      width: slope.width,
      height: slope.height, // ✅ MATCH REAL SIZE
      transform: `rotate(${slope.direction === "downRight" ? 25 : -25}deg)`,
      transformOrigin: "center",
      pointerEvents: "none",
    }}
  />
))}

      {answerState && (
        <div
          className={`player-indicator ${answerState}`}
          style={{
            left: player.x,
            top: player.y - cameraY - 85,
          }}
        >
          {SETTINGS[answerState].label}
        </div>
      )}

      {answerState && (
        <div
          className={`charge-bar ${answerState}`}
          style={{
            left: player.x - 35,
            top: player.y - cameraY - 58,
          }}
        >
          <div style={{ width: `${chargePercent}%` }}></div>
        </div>
      )}

 <img
  src={playerImage}
  className="player"
  style={{
    position: "absolute",
    left: player.x,
    top: player.y - cameraY - 6,
    width: 90,
    height: 90,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  }}
/>

{showDialogue && currentLine && (
  <div className="codec">
    <div className="codec-left">
      <img src={`${BASE}${currentLevel.codecLeft}`} />
    </div>

    <div className="codec-center">
      <button className="codec-skip" onClick={skipDialogue}>
        SKIP
      </button>
      <div className="codec-name">{currentLine.speaker}</div>
      <div className="codec-text">{displayedText}</div>

      <div className="codec-hint">PRESS SPACE TO CONTINUE...</div>
    </div>

    <div className="codec-right">
      <img src={`${BASE}Models/L.PNG`}/>
    </div>
  </div>
)}

      {showQuestion && (
        <div className="question-overlay">
          <div className="question-modal">
            <h2>{currentQuestion.text}</h2>

            <div className="answers">
              {currentQuestion.answers.map((answer, index) => (
                <button key={answer.text} onClick={() => chooseAnswer(answer.result)}>
                  {index + 1}. {answer.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {levelCleared && (
        <div className="question-overlay">
          <div className="question-modal">
            <h2>LEVEL COMPLETE</h2>

            <p>{currentLevel.name} cleared.</p>

            <p>
              JUMPS: {levelJumpCount} <br />
              ERRORS: {deaths}
            </p>

            <button onClick={continueToNextLevel}>Next Level</button>
            <button onClick={exitToMenu}>Exit</button>
          </div>
        </div>
      )}
      {won && (
        <div className="question-overlay">
          <div className="question-modal">
            <h2>You Win</h2>
            <p>The network survived. Somehow.</p>
            <button onClick={startGame}>Play Again</button>
            <button onClick={backToStart}>Main Menu</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default SecretGame;