import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";
import * as THREE from "three";

type Props = {};

function Ground({}: Props) {
  return (
    <>
      <RigidBody type="fixed">
        <Plane args={[1000, 1000]} rotation={[-Math.PI / 2, 0, 0]}>
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
