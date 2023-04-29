import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type OscarProps = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  speed?: number;
  rotationSpeed?: number;
};

function OscarTheDog({ scale, position, rotation }: OscarProps) {
  const oscar = useGLTF("./oscar_the_dog.glb");
  const rigidBodyRef = useRef<RigidBodyApi | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const animations = useAnimations(oscar.animations, oscar.scene);

  useEffect(() => {
    const idle = animations.actions.Idle;
    idle?.play();
    if (groupRef.current) {
      groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, []);

  return (
    <>
      <RigidBody ref={rigidBodyRef} friction={0.1}>
        <group name="oscarTheDog" ref={groupRef}>
          <primitive
            name={"oscarTheDog"}
            object={oscar.scene}
            scale={[scale, scale, scale]}
            position={position}
          />
        </group>
      </RigidBody>
    </>
  );
}

export default OscarTheDog;
