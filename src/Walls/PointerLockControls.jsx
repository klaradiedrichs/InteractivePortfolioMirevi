import { useRef, useEffect } from "react";
import { PointerLockControls } from "@react-three/drei";
import { useStore } from "../stores/useStore";

export default function PointerLockerComponent({ enabled }) {
  const controlsRef = useRef();
  const setActive = useStore((state) => state.setActive);
  const active = useStore((state) => state.active);

  useEffect(() => {
    if (enabled && active === "WallExperience") {
      controlsRef.current?.lock();
    } else {
      controlsRef.current?.unlock();
    }
  }, [enabled, active]);

  return <PointerLockControls ref={controlsRef} />;
}