import { MeshPortalMaterial } from '@react-three/drei'
import * as THREE from "three";
import { useSpring, animated } from '@react-spring/three'

export default function Kin({ portalMaterial, boxactive, hovered, children }) {
    const { scale: scaleWindow } = useSpring({ 
        scale: hovered ? 1.4 : 1,
    });

    return (
        <animated.mesh scale={scaleWindow} position={[-2.5,-1,0.05]}>
            <planeGeometry args={[5.5,3.5]}/>
            <meshBasicMaterial color="black" />
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
