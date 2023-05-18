import { useEffect, useMemo, useRef } from "react";

import * as THREE from "three";

import { Sphere } from "@react-three/drei";
import { gsap } from "gsap";

type Props = { numberOfStars: number; starScale: number };

type StarProps = { position: THREE.Vector3; starScale: number };

const StarPoints = ({ numberOfStars, starScale }: Props) => {
  const starGroupRef = useRef<THREE.Group>(null);

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

  useEffect(() => {
    if (starGroupRef.current) {
      gsap.to(starGroupRef.current.rotation, {
        x: 0,
        y: 360,
        z: 0,
        repeat: -1,
        duration: 100000,
      });
    }
  });

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
      <group name="starGroup" ref={starGroupRef}>
        {points.map((pos, index) => (
          <Star key={index} position={pos} starScale={starScale} />
        ))}
      </group>

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
