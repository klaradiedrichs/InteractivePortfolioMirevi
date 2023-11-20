export default function Overlay({cameraRoad, onToggleCameraRoad}) {
    return (
        <div className="">
            <a href="https://mirevi.de/" target="_blank" className="absolute bottom-6 left-6 text-black hover:text-white">
                mirevi.de
            </a>
            {/* <div className="absolute top-6 left-6">menu —</div> */}
            <div className="text-xl absolute top-6 left-3 cursor-pointer" onClick={onToggleCameraRoad}>
                {cameraRoad ? "Overview" : "Roadview"}
            </div>
        </div>
    )
  }