import { Html, MeshReflectorMaterial, CameraControls, useVideoTexture,OrbitControls , PerspectiveCamera, Environment} from '@react-three/drei'
import * as THREE from "three";
import { useStore } from '../stores/useStore';


export default function Experience()
{

    const active = useStore((state) => state.active);

    

    return <>
        
        {/* <PerspectiveCamera fov={60} makeDefault /> */}
        {/* <OrbitControls target={[0, 0, 0]} />
        <Environment preset='night' background blur={0.5} />
        <mesh position={[0,-1,0]}>
            <sphereGeometry args={[11, 200, 200]}/>
            <VideoMaterial url="M09-1317.mp4" />        
        </mesh>
            */}
        <PerspectiveCamera position={[0,-1,0]} fov={60} makeDefault />
        {active != null && (
        <OrbitControls enableZoom={false} enablePan={false} target={[0, -1, 0]} />
        )}
        <mesh position={[0,-1,0]}>
            <sphereGeometry args={[1, 200, 200]}/>
            <VideoMaterial url="/M09-1317.mp4" />        
        </mesh>
        <Html>
            <p>Test</p>
        </Html>

    </>
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false}  side={THREE.BackSide} />
  }