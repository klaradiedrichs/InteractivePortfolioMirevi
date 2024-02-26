import React, { useRef } from "react";
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import WallExperience from "./WallExperience";

export default function DemoWall() {
  const cubeRef = useRef();
  const speed = 0.1;

//   const handleKeyDown = (event) => {
//     switch (event.key) {
//       case "ArrowUp":
//       case "w":
//       case "W":
//         cubeRef.current.position.z -= speed;
//         break;
//       case "ArrowDown":
//       case "s":
//       case "S":
//         cubeRef.current.position.z += speed;
//         break;
//       case "ArrowLeft":
//       case "a":
//       case "A":
//         cubeRef.current.position.x -= speed;
//         break;
//       case "ArrowRight":
//       case "d":
//       case "D":
//         cubeRef.current.position.x += speed;
//         break;
//       default:
//         break;
//     }
//   };

  // Event listener for keyboard controls
//   window.addEventListener("keydown", handleKeyDown);

  // Cleanup function to remove the event listener when the component unmounts
//   React.useEffect(() => {
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   // Use useFrame to handle the animation loop and update the cube's position
//   useFrame(() => {
//     // Your animation logic goes here, if needed
//   });

  return (
    <>
      {/* <Sky /> */}
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
        ]}
      >

      <WallExperience />

      </KeyboardControls>
    </>
  );
}
