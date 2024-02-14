export default function Overlay({cameraRoad, onToggleCameraRoad, backToStart, handleStart}) {
    return (
        <div className="">
            <a href="https://mirevi.de/" target="_blank" className="absolute bottom-5 left-5 text-black hover:text-white">
                mirevi.de
            </a>
            <div className="text-xl absolute top-3 left-3 cursor-pointer" onClick={onToggleCameraRoad}>
                {cameraRoad ? "OVERVIEW" : "ROADVIEW"}
            </div>
            <div className="text-xl absolute top-16 left-3 cursor-pointer" onClick={handleStart}>
                BACK TO START
            </div>
        
        </div>
    )
  }