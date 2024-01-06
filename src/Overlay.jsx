export default function Overlay({cameraRoad, onToggleCameraRoad}) {
    return (
        <div className="m-6">
            <a href="https://mirevi.de/" target="_blank" className="absolute bottom-5 left-5 text-black hover:text-white">
                mirevi.de
            </a>
            {/* <div className="absolute top-6 left-6">menu —</div> */}
            <div className="text-2xl absolute top-5 left-5 cursor-pointer" onClick={onToggleCameraRoad}>
                {cameraRoad ? "OVERVIEW" : "ROADVIEW"}
            </div>
        </div>
    )
  }