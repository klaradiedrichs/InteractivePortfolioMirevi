import { useStore } from '../stores/useStore';
import { useState , useEffect} from 'react'
import projectsData from '../projectinformation.json';


export default function Overlay({cameraRoad, onToggleCameraRoad, backToStart, handleStart, goBackToRoad}) {

    const setActive = useStore((state) => state.setActive);
    const setHovered = useStore((state) => state.setHovered);
    const active = useStore((state) => state.active);
    const hovered = useStore((state) => state.hovered);
    const [controls, setControls] = useState(false);
    const setWdrExperienceScene = useStore((state) => state.setWdrExperienceScene);
    const wdrExperienceScene = useStore((state) => state.wdrExperienceScene);
    const setVirtualGame = useStore((state) => state.setGameScene);
    const virtualGame = useStore((state) => state.gameScene);

    const handleControls = () => {
      setControls((prev) => !prev);
    };

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
        setWdrExperienceScene(false);
    };

    return (
        <>
        <div className="z-[2]" tabIndex={0}>
        {active === null ? (
          <>
          <p>Learn more about</p>
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
          <div className="z-20 text-base flex flex-col gap-y-1 fixed top-3 left-3 cursor-pointer">
            <div onClick={handleBackToRoadClick} >
                  Tab 'Enter' to leave
            </div>
            {wdrExperienceScene && ( // fixed
            <div className='flex items-center gap-x-2' onClick={() => setWdrExperienceScene(false)}>
              <svg width="12" height="13" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 15V13H10.1C11.15 13 12.0625 12.6667 12.8375 12C13.6125 11.3333 14 10.5 14 9.5C14 8.5 13.6125 7.66667 12.8375 7C12.0625 6.33333 11.15 6 10.1 6H3.8L6.4 8.6L5 10L0 5L5 0L6.4 1.4L3.8 4H10.1C11.7167 4 13.1042 4.525 14.2625 5.575C15.4208 6.625 16 7.93333 16 9.5C16 11.0667 15.4208 12.375 14.2625 13.425C13.1042 14.475 11.7167 15 10.1 15H3Z" fill="white"/>
              </svg>
              <p>Back to WDR Menu</p>
            </div>
            )}
          </div>
          </>
        )}
        {/* Steuerung Fenster */}
        {active !== null && (
        <div className='absolute top-3 px-2 right-2 w-64 h-fit bg-slate-300 opacity-100 rounded-lg text-white'>
          <div className='flex items-center gap-x-2'>
            <div className="" onClick={handleControls}>
                <svg width="16" height="8" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5564 0.77832L8.77818 8.55649L1 0.77832" stroke="white" stroke-width="2"/>
                </svg>
            </div>
            <h2 className='text-lg'>CONTROLS</h2>
          </div>
          {controls && (
          <ul>
              {activeControls.map((control, index) => (
                  <li key={index}>{control}</li>
              ))}
          </ul>
          )}
        </div>
        )}
      </div>
      
      </>
    )
  }