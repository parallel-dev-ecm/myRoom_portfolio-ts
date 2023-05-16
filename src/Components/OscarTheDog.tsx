import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  getDistanceToPlayer,
  getDotFromCamera,
  getRotationQuaternionToPlayer,
} from "../functions";
import { useFrame } from "@react-three/fiber";
import { FallingText } from "./FallingText";

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

  const oscarRef = useRef<THREE.Group>(null);
  const parentGroupRef = useRef<THREE.Group>(null);

  const oscarAngryTextRef = useRef<THREE.Group>(null);

  const animations = useAnimations(oscar.animations, oscar.scene);
  let dotProduct: number;
  let distance: number;

  useEffect(() => {
    const idle = animations.actions.Idle;
    idle?.play();
    if (oscarRef.current) {
      oscarRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, []);

  useFrame((state) => {
    if (
      oscarRef.current &&
      rigidBodyRef.current &&
      oscarAngryTextRef.current &&
      parentGroupRef.current
    ) {
      //parentGroupRef.current.lookAt(state.camera.position);
      // oscarAngryTextRef.current.lookAt(state.camera.position);

      dotProduct = getDotFromCamera({
        state: state,
        objectToGetDistanceFrom: oscarRef.current.name,
      });

      distance = getDistanceToPlayer({
        state: state,
        rapierVector: rigidBodyRef.current.translation(),
      });
      // const quaternion = getRotationQuaternionToPlayer({
      //   state,
      //   rapierVector: rigidBodyRef.current.translation(),
      // });

      if (distance > 60) {
      } else {
      }
    }
  });

  return (
    <>
      <group ref={parentGroupRef} position={position}>
        <group ref={oscarAngryTextRef} rotation={[0, 90, 0]} visible={true}>
          <FallingText text="Where are you going?" minDistanceToTrigger={20} />
        </group>

        <RigidBody ref={rigidBodyRef} friction={0.3}>
          <group name="oscarTheDog" ref={oscarRef} position={[0, -2, 0]}>
            <primitive
              name={"oscarTheDog"}
              object={oscar.scene}
              scale={[scale, scale, scale]}
            />
          </group>
        </RigidBody>
      </group>
    </>
  );
}

export default OscarTheDog;
