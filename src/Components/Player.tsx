import React, { useRef } from "react";
import * as THREE from "three";
import {
  RigidBody,
  RigidBodyApi,
  useRapier,
  CapsuleCollider,
} from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type Props = {};

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

function Player({}: Props) {
  const lerp = THREE.MathUtils.lerp;
  const rigidBodyRef = useRef<RigidBodyApi | null>(null);
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();

    if (rigidBodyRef.current) {
      const velocity = rigidBodyRef.current.linvel();

      const translation = rigidBodyRef.current.translation();
      state.camera.position.set(translation.x, translation.y, translation.z);

      frontVector.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
      sideVector.set((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(state.camera.rotation);
      rigidBodyRef.current.setLinvel({
        x: direction.x,
        y: velocity.y,
        z: direction.z,
      });
    }
  });
  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 10, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[1, 0.75]} />
      </RigidBody>
    </>
  );
}

export default Player;
