import { useEffect, useRef, useState } from "react";
import { RigidBody, RigidBodyApi, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { getDistanceToPlayer, removeRigidBody } from "../functions";
import * as THREE from "three";
import { RigidBodyType } from "@dimforge/rapier3d";
import { WorldApi } from "@react-three/rapier/dist/declarations/src/types";

type fallingTextProps = {
  text: string;
  minDistanceToTrigger: number;
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

export function FallingText({ text, minDistanceToTrigger }: fallingTextProps) {
  const characters = text.split("");
  const rigidBodyRefs = useRef<(RigidBodyApi | null)[]>([]);

  const fallingTextRef = useRef<THREE.Group>(null);
  const [distance, setDistance] = useState<number>(0);
  const { world } = useRapier();

  useEffect(() => {
    rigidBodyRefs.current = rigidBodyRefs.current.slice(0, characters.length);
  }, [characters.length]);

  useFrame((state) => {
    const camera = state.camera;
    if (fallingTextRef.current) {
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
    }
  });

  return (
    <>
      <group ref={fallingTextRef}>
        {characters.map((char, index) => (
          <RigidBody
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
