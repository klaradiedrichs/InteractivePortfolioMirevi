import { useStore } from '../stores/useStore';
import { useState , useEffect} from 'react'
import projectsData from '../projectinformation.json';


export default function Overlay({ backToStart, handleStart, goBackToRoad}) {

    const setActive = useStore((state) => state.setActive);
    const setHovered = useStore((state) => state.setHovered);
    const active = useStore((state) => state.active);
    const [controls, setControls] = useState(true);
 
    const setVirtualGame = useStore((state) => state.setGameScene);
    const virtualGame = useStore((state) => state.gameScene);
    const setGenerationSpeaks = useStore((state) => state.setGenerationSpeaks);
    const generationSpeaks = useStore((state) => state.generationSpeaks);
    const idleVideo = useStore((state) => state.idleVideo);
    const setIdleVideo = useStore((state) => state.setIdleVideo);
    const cameraRoad = useStore((state) => state.cameraRoad);
    const setCameraRoad = useStore((state) => state.setCameraRoad);

    const handleControls = () => {
      setControls((prev) => !prev);
    };

    let activeControls = null;
    if (active !== null) {
        const activeFrameName = active;
        const activeProject = projectsData.projects.find(project => project.title === activeFrameName);
        if(generationSpeaks) {
          activeControls = activeProject?.controlsWdrBegegnung;
        }
        if(virtualGame) {
          activeControls = activeProject?.controlsWdrGame;
        }
        else {
        activeControls = activeProject?.controls;
        }
        console.log(activeControls)
    }

 // click enter to go back Möglichkeit
    useEffect(() => {
      console.log(cameraRoad)
      const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            setActive(null); // Set the active state back to null
            setHovered(null); 
            setIdleVideo(true);
            // only important for wdr project:
            setVirtualGame(false); 
            setGenerationSpeaks(false);
          }
      };
      document.addEventListener('keydown', handleKeyDown);

      // Clean up the event listener when the component unmounts
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, [cameraRoad]);

      const handleBackToRoadClick = () => {
        setActive(null)
        setHovered(null)
        setVirtualGame(false);
        setGenerationSpeaks(false);
        setIdleVideo(true);

    };
      const handleBackToWDRMenu = () => {
        setVirtualGame(false);
        setGenerationSpeaks(false);
        setIdleVideo(true);

    };

    const toggleView = () => {

      // setCameraRoad(false);
      if(!cameraRoad){
        setCameraRoad(true)

      }
      else if(cameraRoad) {
        setCameraRoad(false)

      }

    }
    // const toggleeView = () => {
    //   setCameraRoad(true);

    //   console.log(cameraRoad)
    // }

    return (
        <>
        <div className="cursor-default" tabIndex={0}>
        {active === null ? (
          <>
          
            <a href="https://mirevi.de/" target="_blank" className="absolute z-10 bottom-3 left-3 hover:text-white">
              mirevi.de
            </a>
            <div className='text-base absolute z-20 top-3 left-3 flex flex-col gap-y-1'>
              <div className="cursor-pointer" onClick={toggleView}>
                {cameraRoad ? 'Overview' : 'Roadview'}
                
              </div>
              <div className="cursor-pointer" >
                Back to start
              </div>
              
            </div>
            <div className="h-screen absolute z-20 right-5 flex flex-col justify-between">
                {[1, 2, 3, 4, 5, 6, 7].map((number) => (
                  <div key={number} className=" justify-between">
                    {number}
                  </div>
                ))}
              </div>
            
          </>

        ) : (
        <>
        <div className="z-50 text-sm flex flex-col gap-y-1 fixed top-3 left-3 cursor-pointer text-gray-600 ">
                <div onClick={handleBackToRoadClick}>
                  Press 'Enter' to leave
                </div>
                {(virtualGame || generationSpeaks) && (
                  <div className='flex items-center gap-x-1' onClick={handleBackToWDRMenu}>
                    <svg width="10" height="11" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 15V13H10.1C11.15 13 12.0625 12.6667 12.8375 12C13.6125 11.3333 14 10.5 14 9.5C14 8.5 13.6125 7.66667 12.8375 7C12.0625 6.33333 11.15 6 10.1 6H3.8L6.4 8.6L5 10L0 5L5 0L6.4 1.4L3.8 4H10.1C11.7167 4 13.1042 4.525 14.2625 5.575C15.4208 6.625 16 7.93333 16 9.5C16 11.0667 15.4208 12.375 14.2625 13.425C13.1042 14.475 11.7167 15 10.1 15H3Z" fill="#475577" />
                    </svg>
                    <p>WDR Menu</p>
                  </div>
                )}
          </div>
          <div className='absolute z-20 top-3 px-2 right-3 w-fit max-w-64 h-fit bg-gray-400/25 rounded-lg text-gray-600'>
            <div onClick={handleControls} className='flex items-center gap-x-1 cursor-pointer'>
              <div className="" >
                <svg width="14" height="7" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5564 0.77832L8.77818 8.55649L1 0.77832" stroke="#475577" stroke-width="2" />
                </svg>
              </div>
              <h2 className='text-right'>Controls</h2>
            </div>
            {controls && (
              <ul className='list-disc pl-5 '>
                {activeControls.map((control, index) => (
                  <li key={index} >{control}</li>
                ))}
              </ul>
            )}
          </div>
          </>
        )}
      </div>
      </>
    )
  }