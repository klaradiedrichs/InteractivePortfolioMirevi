import { useStore } from './stores/useStore';
import { useState , useEffect} from 'react'
import projectsData from './projectinformation.json';


export default function Overlay({cameraRoad, onToggleCameraRoad, backToStart, handleStart, goBackToRoad}) {

    const setActive = useStore((state) => state.setActive);
    const setHovered = useStore((state) => state.setHovered);
    const active = useStore((state) => state.active);
    const hovered = useStore((state) => state.hovered);

    
    let activeControls = null;
    if (active !== null) {
        const activeFrameName = active;
        const activeProject = projectsData.projects.find(project => project.title === activeFrameName);
        activeControls = activeProject?.controls;
        console.log(activeControls)
    }

 // click enter to go back Möglichkeit
    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            setActive(null); // Set the active state back to null
            setHovered(null)
          }
      };
      document.addEventListener('keydown', handleKeyDown);

      // Clean up the event listener when the component unmounts
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, []);

      const handleBackToRoadClick = () => {
        setActive(null); // Set the active state back to null
        setHovered(null)
    };

    return (
        <>
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
          <>
          <div onClick={handleBackToRoadClick} className="z-20 text-base fixed top-3 left-3 cursor-pointer">
                Click 'Enter' to leave
          </div>
          </>
        )}
        {/* Steuerung Fenster */}
        {active !== null && (
        <div className='absolute top-3 right-2 w-fit h-fit bg-slate-200 opacity-25 rounded-lg text-white'>
          <h2>Controls</h2>
          <ul>
              {activeControls.map((control, index) => (
                  <li key={index}>{control}</li>
              ))}
          </ul>
        </div>
        )}
      </div>
      
      </>
    )
  }