import { Html, MeshReflectorMaterial, CameraControls, useVideoTexture,OrbitControls } from '@react-three/drei'
import * as THREE from "three";


export default function Experience()
{

    return <>
        
        <OrbitControls /> 
        <mesh>
            <sphereGeometry args={[100, 200, 200]} />
            <VideoMaterial url="FraktaleSecondHD.mp4" />
            {/* <meshStandardMaterial color="red" /> */}
        </mesh>
           
    </>
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false}  side={THREE.BackSide} />
  }