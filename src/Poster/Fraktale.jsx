import { MeshPortalMaterial , useTexture} from '@react-three/drei'
import * as THREE from "three";
import { useSpring, animated } from '@react-spring/three'

export default function Fraktale({ portalMaterial, boxactive, hovered, children }) {
    
    

    return (
        <animated.mesh scale={scaleWindow} position={[0.9,-0.8,0.05]}>
            <planeGeometry args={[6.3,4.7]}/>
            <meshBasicMaterial map={portalElement} toneMapped={false} />;

            {/* Sicht in Portal */}
            {(hovered ) && (
                <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
                    <ambientLight intensity={0.5} />
                    {/*Individuelle Objekte */}
                    {children}
                </MeshPortalMaterial>
            )}
        </animated.mesh>
    );
}
