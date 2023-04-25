import React, { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Point, Points, Sphere, pointsMaterial } from "@react-three/drei";

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
    <group name="starGroup">
      {points.map((pos, index) => (
        <Star key={index} position={pos} starScale={starScale} />
      ))}
    </group>
  );
};

export default StarPoints;
