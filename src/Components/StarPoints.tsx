import { useMemo } from "react";

import * as THREE from "three";
import { Sphere, Stars, Cloud } from "@react-three/drei";

type Props = { numberOfStars: number; starScale: number };

type StarProps = { position: THREE.Vector3; starScale: number };

const StarPoints = ({ numberOfStars, starScale }: Props) => {
  const points = useMemo(() => {
    const tempPoints: THREE.Vector3[] = [];
    for (let i = 0; i < numberOfStars; i++) {
      const x = Math.random() * 200 - 50;
      const y = Math.random() * 200 - 50;
      const z = Math.random() * 200 - 50;

      const point = new THREE.Vector3(x, y, z);
      tempPoints.push(point);
    }
    return tempPoints;
  }, [numberOfStars]);

  function Star({ position }: StarProps) {
    return (
      <>
        <Sphere
          position={[position.x, position.y, position.z]}
          scale={starScale}
        >
          <meshBasicMaterial />
        </Sphere>
      </>
    );
  }

  return (
    <>
      <group name="starGroup">
        {points.map((pos, index) => (
          <Star key={index} position={pos} starScale={starScale} />
        ))}
      </group>

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      {/* <Cloud
        opacity={0.1}
        speed={0.4} // Rotation speed
        width={0.1} // Width of the full cloud
        depth={0.1} // Z-dir depth
        segments={19} // Number of particles
        position={[1, 0, 1]}
        scale={0.1}
      /> */}
    </>
  );
};

export default StarPoints;
