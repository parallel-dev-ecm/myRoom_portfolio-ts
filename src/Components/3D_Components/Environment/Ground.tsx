import { useEffect, useRef } from "react";
import { CuboidCollider, RigidBody, RigidBodyApi } from "@react-three/rapier";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

type Props = {};

function Ground({}: Props) {
  const rigidBodyRef = useRef<RigidBodyApi | null>(null);
  const planeMaterial = new THREE.MeshToonMaterial({
    color: "rgb(227,218,201)",
  });

  useEffect(() => {
    if (rigidBodyRef.current) {
      //console.log(rigidBodyRef.current.translation());
    }
  });

  return (
    <>
      <RigidBody type="fixed" ref={rigidBodyRef} position={[0, -5, 0]}>
        {/* <Plane
          args={[60, 60]}
          rotation={[-Math.PI * 0.5, 0, 0]}
          position={[0, 0, 0]}
          material={planeMaterial}
          name="mainGroundPlaneRef"
        /> */}
        <CuboidCollider args={[1000, 0.5, 1000]} />
      </RigidBody>
    </>
  );
}

export default Ground;
