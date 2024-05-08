import { useStore } from '../stores/useStore';
import { useState , useEffect} from 'react'
import projectsData from '../projectinformation.json';
import useGameStore from "../wdr/useGameStore";
import '../index.css'
import linksvgWhite from '/svgs/linkiconWhite.svg';

export default function Overlay() {

    const setActive = useStore((state) => state.setActive);
    const setHovered = useStore((state) => state.setHovered);
    const active = useStore((state) => state.active);
    const [controls, setControls] = useState(true);
 
    const setVirtualGame = useStore((state) => state.setGameScene);
    const virtualGame = useStore((state) => state.gameScene);
    const setGenerationSpeaks = useStore((state) => state.setGenerationSpeaks);
    const generationSpeaks = useStore((state) => state.generationSpeaks);
    const setIdleVideo = useStore((state) => state.setIdleVideo);
    const cameraRoad = useStore((state) => state.cameraRoad);
    const setCameraRoad = useStore((state) => state.setCameraRoad);
    const score = useGameStore((state) => state.score);
    const start = useGameStore((state) => state.start);
    const setStart = useGameStore((state) => state.setStart);
    const clickedSpecificPoint = useStore((state) => state.clickedSpecificPoint);
    const setClickedSpecificPoint = useStore((state) => state.setClickedSpecificPoint);
    const setScrollBarColor = useStore((state) => state.setScrollBarColor);
    const [menu, setMenu] = useState(false)

    const handleControls = () => {
      setControls((prev) => !prev);
    };

    const handleMenu = () => {
      setMenu((prev) => !prev);
    }

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

 //click enter to go back Möglichkeit
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

    const handleStart = () => {
      console.log("START")
      setStart(true);
    }

    const toggleView = () => {

      // wenn aktuelle View Overview
      if(!cameraRoad){
        if(clickedSpecificPoint){
          // setBachToOverview
          // neuer State
          setClickedSpecificPoint(false)
        }
        else {
        setCameraRoad(true)
        }
      }
      else if(cameraRoad) {
        setCameraRoad(false)

      }

    }

    return (
        <>
        <div className="cursor-default" tabIndex={0}>
        {active === null ? (
          <>
          
            <a href="https://mirevi.de/" target="_blank" className="absolute z-0 bottom-3 left-3 hover:text-black">
              mirevi.de
            </a>
            <p className="absolute z-10 bottom-4 right-3">
              {/* End */}
            </p>
            <div className='text-base absolute z-0 top-3 left-3 flex flex-col gap-y-1'>
              
              {cameraRoad && (
              <div className="cursor-pointer" onClick={toggleView}>
                Overview
              </div>
              )}
              {!cameraRoad && (
              <div className="cursor-pointer" onClick={toggleView}>
                {clickedSpecificPoint ? 'Back' : 'Roadview'}
              </div>
              )}
              <div onClick={handleMenu} className="cursor-pointer" >
                About Mirevi
              </div>
              
            </div>
            <div id="menu-overlay" className={menu ? 'active' : ''}>
            {/* Hauptmenü */}
                <div className='h-screen flex flex-col gap-y-6 ml-12 justify-center items-start font-light text-2xl'>
                <p className='text-4xl pb-4'>References</p>
                {projectsData.projects.map((project, index) => (
                  <div className='flex pb-3 border-b'>
                    <div key={index} className='w-80'>{project.title}</div>
                    <a href={project.link} target="_blank" className='flex items-center'>
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.2897 9.88606C15.8755 9.88791 15.5412 10.2252 15.543 10.6394C15.5449 11.0536 15.8821 11.3879 16.2964 11.3861L18.7785 11.375C19.7859 11.3705 20.478 11.3685 21.0052 11.4261C21.1766 11.4448 21.3198 11.4689 21.4414 11.4981L10.8129 22.1265C10.52 22.4194 10.52 22.8943 10.8129 23.1872C11.1058 23.4801 11.5807 23.4801 11.8736 23.1872L22.5021 12.5587C22.5312 12.6803 22.5553 12.8235 22.574 12.9949C22.6316 13.5221 22.6297 14.2143 22.6252 15.2216L22.6141 17.7038C22.6122 18.118 22.9465 18.4553 23.3607 18.4571C23.7749 18.459 24.1122 18.1247 24.1141 17.7105L24.1253 15.1836C24.1296 14.2319 24.1331 13.4541 24.0652 12.832C23.9945 12.1852 23.839 11.6126 23.4576 11.1198C23.374 11.0117 23.2837 10.9092 23.1873 10.8128C23.0909 10.7164 22.9884 10.6261 22.8804 10.5425C22.3876 10.1612 21.8149 10.0056 21.1681 9.93497C20.5461 9.86704 19.7682 9.87053 18.8165 9.87479L16.2897 9.88606Z" fill="white"/>
                      </svg>
                      </a>
                  </div>
                ))}
                    
                  <div onClick={() => setMenu(false)}className='cursor-pointer absolute top-3 left-3'>
                    X
                  </div>
                </div>
                {/* Cross */}
                
                
            </div>
            
            {/* <div className="text-base text-white/50 w-3/4 z-20 absolute bottom-3 flex justify-around left-[12%]">
                {projectsData.projects.map((project, index) => (
                  <div className='flex flex-col items-center w-[150px] text-center'>
                    <div key={index} className="">
                      {project.title}
                    </div>
                    <svg className="" width="3" height="6">
                      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#4b5563" strokeWidth="1" />
                    </svg>
                  </div>
                  
                ))}
            </div> */}
            {cameraRoad && (
            <div className='absolute h-3/4 right-5 z-0 top-[14%] flex text-gray-500 ' >
            <div className="z-20 flex flex-col justify-around text-right">
                {projectsData.projects.map((project, index) => (
                   <div key={index}
                   id="scrollBarText"
                   
                   onPointerOver={() => setScrollBarColor(true)}
                   onMouseLeave={() => setScrollBarColor(false)}
                 >
                    {project.title}
                  </div>
                ))}
              </div>
            </div>
            )}
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
          {virtualGame && (
          <div className='z-20'>
          {!start && (
          <div className='absolute z-20 flex flex-col h-screen w-screen items-center justify-center'>
            <div className='text-center text-lg border border-slate-500/25 rounded-xl w-96 h-64 bg-slate-400/25 flex flex-col gap-y-8 items-center justify-center'>
              
              <p className='px-3'>
              Collect as many trash objects as possible in 30 seconds
              </p>
              <div>
                
              </div>
              <div onClick={handleStart} className='text-2xl bg-slate-500/50 rounded-lg px-3'>
                START
              </div>
            </div>
            
          </div>
          )}
          {start && (
          <div className='absolute text-4xl z-20 bottom-3 left-3'>
            <div>
              
            </div>
            <Timer onFinish={() => console.log('Time is up!')} />
            <div className='border-2 rounded-xl px-4 '>
              SCORE: {score}
            </div>
          </div>
          )}
          </div>
          )}
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

  function Timer({ onFinish }) {
    const [timeLeft, setTimeLeft] = useState(30);
  
    useEffect(() => {
      // Start the countdown when the component mounts
      const timer = setInterval(() => {
        // Decrease the time left every second
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
  
      // Clear the interval when the component unmounts or time runs out
      return () => clearInterval(timer);
    }, []);
  
    useEffect(() => {
      // Trigger onFinish callback when time runs out
      if (timeLeft === 0) {
        onFinish();
      }
    }, [timeLeft, onFinish]);
  
    return <div>{timeLeft} s</div>;
  }