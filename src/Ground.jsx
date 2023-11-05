import {Grid} from '@react-three/drei'

export default function Ground() {
    const gridConfig = {
      sectionSize: 2.3,
      sectionColor: '#9d4b4b',
      fadeDistance: 40,
      fadeStrength: 1,
      // followCamera: false,
      infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0.1]} args={[10.5, 10.5]} {...gridConfig} />
  }
