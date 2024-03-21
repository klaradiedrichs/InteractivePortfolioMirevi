import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Shape, Extrude } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

const Logo = () => {
  const svgData = useLoader(SVGLoader, "/markerAnwendungspartner.svg");
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);

  return (
    <mesh scale={0.05} rotation={[1 * Math.PI, 0, 0]} position={[-27, 0.5, 65]}>
      {shapes.map((s, i) => (
        <group key={i}>
          <Extrude args={[s, { depth: 1, bevelEnabled: false, steps: 30 }]}>
            <Shape args={[s]} />
            <meshPhongMaterial />
          </Extrude>
        </group>
      ))}
    </mesh>
  );
};

export default Logo;
