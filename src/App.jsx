import { useEffect, useState } from "react";
import BootScreen from "./BootScreen";
import Welcome from "./Desktop"; // this is your welcome screen
import RealDesktop from "./RealDesktop";

export default function App() {
  const [screen, setScreen] = useState("boot");

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen("welcome");
    }, 3900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {screen === "boot" && <BootScreen />}
      {screen === "welcome" && (
        <Welcome onFinish={() => setScreen("desktop")} />
      )}
      {screen === "desktop" && <RealDesktop />}
    </>
  );
}