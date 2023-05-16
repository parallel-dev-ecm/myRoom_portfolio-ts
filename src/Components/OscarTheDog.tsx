import { useGLTF, useAnimations, Text3D } from "@react-three/drei";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getDistanceToPlayer, getDotFromCamera } from "../functions";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

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
  const oscarAngryTextRef = useRef<THREE.Group>(null);

  const animations = useAnimations(oscar.animations, oscar.scene);
  let dotProduct: number;
  let distance: number;

  useEffect(() => {
    const idle = animations.actions.Idle;
    idle?.play();
    if (groupRef.current) {
      groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current && rigidBodyRef.current && oscarAngryTextRef.current) {
      groupRef.current.lookAt(state.camera.position);
      oscarAngryTextRef.current.lookAt(state.camera.position);

      dotProduct = getDotFromCamera({
        state: state,
        objectToGetDistanceFrom: groupRef.current.name,
      });

      distance = getDistanceToPlayer({
        state: state,
        rapierVector: rigidBodyRef.current.translation(),
      });
      if (distance > 20) {
        gsap.to(oscarAngryTextRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
        });
      } else {
        gsap.to(oscarAngryTextRef.current.scale, { x: 0, y: 0, z: 0 });
      }
    }
  });

  return (
    <>
      <group position={position}>
        <group ref={oscarAngryTextRef}>
          <Text3D font={"./myFont.json"} position={[-2, -1, 0]}>
            Where are you going?
          </Text3D>
          <Text3D font={"./myFont.json"} position={[0, -3, 0]}>
            Come back!
          </Text3D>
        </group>

        <RigidBody ref={rigidBodyRef} friction={0.3}>
          <group name="oscarTheDog" ref={groupRef}>
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
