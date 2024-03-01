import { Html, MeshReflectorMaterial, CameraControls, useVideoTexture,OrbitControls , PerspectiveCamera} from '@react-three/drei'
import * as THREE from "three";


export default function Experience()
{

    return <>
        
        <OrbitControls/> 
        <mesh position={[1.5,-2,4]}>
            <sphereGeometry args={[10, 200, 200]} />
            {/* Radius nochmal verringert -> vorher 16  */}
            <VideoMaterial url="M09-1317.mp4" />
            {/* <meshStandardMaterial color="red" /> */}
        </mesh>
           
    </>
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false}  side={THREE.BackSide} />
  }