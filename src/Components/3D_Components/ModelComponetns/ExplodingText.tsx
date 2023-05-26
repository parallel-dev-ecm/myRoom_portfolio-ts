import { useEffect, useRef, useState } from "react";
import { RigidBody, RigidBodyApi, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import {
  getDistanceToPlayer,
  getDotFromCamera,
  getRandomNumber,
} from "../../../functions";
import * as THREE from "three";
import { RigidBodyType } from "@dimforge/rapier3d";
import { WorldApi } from "@react-three/rapier/dist/declarations/src/types";
import { sinCityShaders } from "../../../Constants";

type fallingTextProps = {
  text: string;
  minDistanceToTrigger: number;
  name: string;
  position: THREE.Vector3;
  textScale: number;
  getsBackUp: boolean;
  distanceBased: boolean;
};

function setLettersToDynamic(
  references: React.MutableRefObject<(RigidBodyApi | null)[]>,
  world: WorldApi
) {
  references.current.forEach((ref) => {
    if (ref) {
      const rb = world.getRigidBody(ref.handle);
      const bodyType: RigidBodyType = 0;
      rb?.setBodyType(bodyType);
    }
  });
}

export function ExplodingText({
  text,
  minDistanceToTrigger,
  name,
  position,
  textScale,
  getsBackUp,
  distanceBased,
}: fallingTextProps) {
  const sinMaterial = new THREE.ShaderMaterial({
    vertexShader: sinCityShaders.vertexShader,
    fragmentShader: sinCityShaders.fragmentShader,
  });

  const characters = text.split("");
  const rigidBodyRefs = useRef<(RigidBodyApi | null)[]>([]);

  const fallingTextRef = useRef<THREE.Group>(null);
  const [distance, setDistance] = useState<number>(100);
  const [dot, setDot] = useState<number>(0);
  const [viewed, setViewed] = useState<boolean>(false);
  const [onSight, setOnSight] = useState<boolean>(false);
  const { world } = useRapier();

  const material = new THREE.MeshToonMaterial({
    color: "rgb(21, 126, 232)",
  });

  useEffect(() => {
    rigidBodyRefs.current = rigidBodyRefs.current.slice(0, characters.length);
  }, [characters.length]);

  useFrame((state) => {
    if (fallingTextRef.current && rigidBodyRefs.current) {
      if (distanceBased) {
        const centerRef = Math.floor((rigidBodyRefs.current.length - 1) * 0.5);
        setDistance(
          getDistanceToPlayer({
            state: state,
            rapierVector: rigidBodyRefs.current[centerRef]?.translation(),
          })
        );
        setDot(
          getDotFromCamera({
            state: state,
            rapierVector: rigidBodyRefs.current[centerRef]?.translation(),
          })
        );
        if (dot > 0.9) {
          setOnSight(true);
          if (onSight && distance < minDistanceToTrigger && !viewed) {
            setLettersToDynamic(rigidBodyRefs, world);
            rigidBodyRefs.current.forEach((rigidBody) => {
              if (rigidBody) {
                const rb = world.getRigidBody(rigidBody.handle);
                rigidBody.setAngularDamping;
                if (rb) {
                  rb.setGravityScale(0, true);
                  const linvel = new THREE.Vector3(
                    getRandomNumber(-0.1, 0.1),
                    getRandomNumber(0, 0.1),
                    getRandomNumber(0.1, -0.1)
                  );
                  rb.setAngularDamping(2);
                  rb.setLinearDamping(2);
                  rb.setLinvel(linvel, true);
                }
              }
            });
            setViewed(true);
          }
        }
      } else if (!distanceBased) {
        const centerRef = Math.floor((rigidBodyRefs.current.length - 1) * 0.5);
        setDot(
          getDotFromCamera({
            state: state,
            rapierVector: rigidBodyRefs.current[centerRef]?.translation(),
          })
        );

        if (dot < 0.8) {
          setLettersToDynamic(rigidBodyRefs, world);
        }
        if (dot > 0.8 && getsBackUp) {
          rigidBodyRefs.current.forEach((rigidBody) => {
            if (rigidBody) {
              const rb = world.getRigidBody(rigidBody.handle);
              rb?.setGravityScale(0.1, true);

              if (rigidBody.translation().y < -2) {
                rigidBody.resetForces(true);
                const linvel = new THREE.Vector3(0, 1, 0);

                rigidBody.setLinvel(linvel, true);
              } else if (rigidBody.translation().y > 2) {
                rigidBody.resetForces(true);

                const linvel = new THREE.Vector3(0, -1, 0);
                rigidBody.setLinvel(linvel, true);
              }
            }
          });
        }
      }
    }
  });

  return (
    <>
      <group ref={fallingTextRef} name={name} position={position}>
        {characters.map((char, index) => (
          <RigidBody
            type="fixed"
            key={index}
            ref={(ref) => (rigidBodyRefs.current[index] = ref)}
            friction={0}
          >
            <Text3D
              key={index}
              material={sinMaterial}
              font={"./myFont.json"}
              position={[index * 0.5, 0, 0]}
              scale={textScale}
            >
              {char}
            </Text3D>
          </RigidBody>
        ))}
      </group>
    </>
  );
}
