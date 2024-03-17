import { Environment, OrbitControls } from "@react-three/drei"


export default function VirtualGame () {

    return(

        <>
        <OrbitControls />
        <Environment files='./UnderwaterWorld.hdr' background />
        <mesh>
            <sphereGeometry />
            <meshBasicMaterial />
        </mesh>
        </>
    )
}