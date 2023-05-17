import { useEffect, useRef } from "react";
import { CuboidCollider, RigidBody, RigidBodyApi } from "@react-three/rapier";

type Props = {};

function Ground({}: Props) {
  const rigidBodyRef = useRef<RigidBodyApi | null>(null);

  useEffect(() => {
    if (rigidBodyRef.current) {
      //console.log(rigidBodyRef.current.translation());
    }
  });

  return (
    <>
      <RigidBody type="fixed" ref={rigidBodyRef} position={[0, -3, 0]}>
        <CuboidCollider args={[1000, 0.5, 1000]} position={[0, -3, 0]} />
      </RigidBody>
    </>
  );
}

export default Ground;
