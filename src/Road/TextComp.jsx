import { Html, Text} from '@react-three/drei'



export default function TextComp({name, position, rotation}) {



    return (
        <>
        <Text position={position} rotation={rotation} font="fonts/PlayfairDisplay-Regular.ttf" fontSize={1.6}>
            {name}
            <meshBasicMaterial color="grey" opacity={0.6} toneMapped={false} />
        </Text>
        
        </>
    )
}