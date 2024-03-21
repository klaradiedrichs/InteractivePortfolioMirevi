import { useStore } from './stores/useStore';
import { useState , useEffect} from 'react'


export default function Overlay({cameraRoad, onToggleCameraRoad, backToStart, handleStart, goBackToRoad}) {

    const setActive = useStore((state) => state.setActive);
    const setHovered = useStore((state) => state.setHovered);
    const active = useStore((state) => state.active);
    const hovered = useStore((state) => state.hovered);

 // click enter to go back Möglichkeit
    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            setActive(null); // Set the active state back to null
            setHovered(false)
          }
      };
      console.log("actvie" + active)
      document.addEventListener('keydown', handleKeyDown);

      // Clean up the event listener when the component unmounts
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, []);

    //   const handleBackToRoadClick = () => {
    //     setActive(null); // Set the active state back to null
    //     setHovered(false)
    // };

    return (
        <div className="z-[2]" tabIndex={0}>
            {active === null ? (
        <>
          <a href="https://mirevi.de/" target="_blank" className="absolute bottom-5 left-5 text-black hover:text-white">
            mirevi.de
          </a>
          <div className="text-base absolute top-3 left-2 cursor-pointer" onClick={onToggleCameraRoad}>
            {cameraRoad ? 'Overview' : 'ROADVIEW'}
          </div>
          {/* <div className="text-9xl text-white opacity-50 italic absolute top-[330px] left-[430px] cursor-pointer" >
            {cameraRoad ? 'FRAKTALE' : 'Roadview'}
          </div>
          <div className="text-6xl text-white italic absolute top-[440px] left-[400px] cursor-pointer" >
            --------------------------
          </div>
          <div className="text-6xl text-white italic absolute top-[480px] left-[400px] cursor-pointer" >
            fraktalis minimalis 2023
          </div> */}
          <div className="text-base absolute top-10 left-2 cursor-pointer" onClick={handleStart}>
            Back to Start
          </div>
        </>
      ) : (
        <div className="text-base fixed top-3 left-3 cursor-pointer">
          Click 'Enter' to leave
        </div>
      )}
        </div>
    )
  }