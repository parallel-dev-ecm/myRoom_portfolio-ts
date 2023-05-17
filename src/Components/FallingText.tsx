import { useEffect, useRef, useState } from "react";
import { RigidBody, RigidBodyApi, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import {
  getDistanceToPlayer,
  getDotFromCamera,
  getRotationQuaternionToPlayer,
} from "../functions";
import * as THREE from "three";
import { RigidBodyType } from "@dimforge/rapier3d";
import { WorldApi } from "@react-three/rapier/dist/declarations/src/types";

type fallingTextProps = {
  text: string;
  minDistanceToTrigger: number;
  name: string;
  position: THREE.Vector3;
};

function setLettersToDynamic(
  references: React.MutableRefObject<(RigidBodyApi | null)[]>,
  world: WorldApi
) {
  references.current.forEach((ref) => {
    if (ref) {
      const rb = world.getRigidBody(ref.handle);
      rb?.setGravityScale(Math.random(), true);
      const bodyType: RigidBodyType = 0;
      rb?.setBodyType(bodyType);
    }
  });
}

export function FallingText({
  text,
  minDistanceToTrigger,
  name,
  position,
}: fallingTextProps) {
  const characters = text.split("");
  const rigidBodyRefs = useRef<(RigidBodyApi | null)[]>([]);

  const fallingTextRef = useRef<THREE.Group>(null);
  const [distance, setDistance] = useState<number>(0);
  const { world } = useRapier();
  let dot;

  useEffect(() => {
    rigidBodyRefs.current = rigidBodyRefs.current.slice(0, characters.length);
  }, [characters.length]);

  useFrame((state) => {
    const camera = state.camera;
    if (fallingTextRef.current) {
      const name = fallingTextRef.current.name;
      dot = getDotFromCamera({ state, objectToGetDistanceFrom: name });
      setDistance(
        getDistanceToPlayer({
          state: state,
          rapierVector: fallingTextRef.current.position,
        })
      );
      //   rigidBodyRefs.current.forEach((rigidBody) => {
      //     const quaternion: THREE.Quaternion = getRotationQuaternionToPlayer({
      //       rapierVector: rigidBody?.translation(),
      //       state,
      //     });
      //     rigidBody?.setRotation(quaternion, true);
      //   });

      if (distance > minDistanceToTrigger) {
        setLettersToDynamic(rigidBodyRefs, world);
        // if (distance > minDistanceToTrigger + 20) {
        //   rigidBodyRefs.current.forEach((rigidBody) => {
        //     if (rigidBody) {
        //       const rb = world.getRigidBody(rigidBody.handle);
        //       if (rb) {
        //         removeRigidBody(world, rb);
        //         fallingTextRef.current?.traverse((child) => {
        //           console.log(child);
        //           state.scene.remove(child);
        //         });
        //       }
        //     }
        //   });
        // }
      }
      if (distance < minDistanceToTrigger) {
        rigidBodyRefs.current.forEach((rigidBody) => {
          if (rigidBody) {
            const rb = world.getRigidBody(rigidBody.handle);
            rb?.setGravityScale(0.1, true);

            if (rigidBody.translation().y < 0.5) {
              const linvel = new THREE.Vector3(0, 1, 0);

              rigidBody.setLinvel(linvel, true);
            }

            if (rigidBody.translation().y > 0.5) {
              const linvel = new THREE.Vector3(0, -1, 0);
              rigidBody.setLinvel(linvel, true);
            }
          }
        });
      }
    }
  });

  return (
    <>
      <group ref={fallingTextRef} name={name} position={position}>
        {characters.map((char, index) => (
          <RigidBody
            friction={0.1}
            type="fixed"
            key={index}
            ref={(ref) => (rigidBodyRefs.current[index] = ref)}
          >
            <Text3D
              key={index}
              font={"./myFont.json"}
              position={[index * 0.5, 0, 0]}
              scale={1}
            >
              {char}
            </Text3D>
          </RigidBody>
        ))}
      </group>
    </>
  );
}
