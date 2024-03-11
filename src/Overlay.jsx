import { useStore } from './stores/useStore';


export default function Overlay({cameraRoad, onToggleCameraRoad, backToStart, handleStart, goBackToRoad}) {

    const setActive = useStore((state) => state.setActive);
    const setHovered = useStore((state) => state.setHovered);
    const active = useStore((state) => state.active);
    const hovered = useStore((state) => state.hovered);

    const handleBackToRoadClick = () => {
        setActive(null); // Set the active state back to null
        setHovered(false)
    };

    return (
        <div className="">
            {active === null ? (
        <>
          <a href="https://mirevi.de/" target="_blank" className="absolute bottom-5 left-5 text-black hover:text-white">
            mirevi.de
          </a>
          <div className="text-xl absolute top-3 left-3 cursor-pointer" onClick={onToggleCameraRoad}>
            {cameraRoad ? 'OVERVIEW' : 'ROADVIEW'}
          </div>
          <div className="text-xl absolute top-16 left-3 cursor-pointer" onClick={handleStart}>
            BACK TO START
          </div>
        </>
      ) : (
        <div className="text-xl absolute top-3 left-3 cursor-pointer" onClick={handleBackToRoadClick}>
          BACK TO ROAD
        </div>
      )}
        </div>
    )
  }