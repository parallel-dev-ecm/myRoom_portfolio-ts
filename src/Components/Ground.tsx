import { Plane } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";

type Props = {};

function Ground({}: Props) {
  const rigidBodyRef = useRef<RigidBodyApi | null>(null);

  useEffect(() => {
    if (rigidBodyRef.current) {
      console.log(rigidBodyRef.current.translation());
    }
  });

  return (
    <>
      <RigidBody type="fixed" ref={rigidBodyRef} position={[0, -3, 0]}>
        <Plane
          args={[1000, 1000]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}
        >
          <meshBasicMaterial
            color={0xffffff}
            transparent={true}
            opacity={0}
            side={THREE.DoubleSide}
          />
        </Plane>
      </RigidBody>
    </>
  );
}

export default Ground;
