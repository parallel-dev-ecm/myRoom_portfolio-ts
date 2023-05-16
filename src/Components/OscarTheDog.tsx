import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDistanceToPlayer, getDotFromCamera } from "../functions";
import { useFrame } from "@react-three/fiber";

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
  let dotProduct: number;
  let distance: number;

  useEffect(() => {
    const idle = animations.actions.Idle;
    idle?.play();
    if (groupRef.current) {
      groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(position, true);
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current && rigidBodyRef.current) {
      dotProduct = getDotFromCamera(groupRef.current.name, state);
      distance = getDistanceToPlayer(
        state,
        undefined,
        rigidBodyRef.current.translation()
      );
      console.log("distance: ", distance);
    }
  });

  return (
    <>
      <RigidBody ref={rigidBodyRef} friction={0.3}>
        <group name="oscarTheDog" ref={groupRef}>
          <primitive
            name={"oscarTheDog"}
            object={oscar.scene}
            scale={[scale, scale, scale]}
            position={[0, 0, 0]}
          />
        </group>
      </RigidBody>
    </>
  );
}

export default OscarTheDog;
