import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  speed?: number;
  rotationSpeed?: number;
};

function OscarTheDog({ scale, position, rotation }: Props) {
  const oscar = useGLTF("./oscar_the_dog.glb");
  const groupRef = useRef<THREE.Group>(null);
  const animations = useAnimations(oscar.animations, oscar.scene);

  useEffect(() => {
    const idle = animations.actions.Idle;
    idle?.play();
  }, []);

  return (
    <>
      <group name="oscarTheDog" ref={groupRef}>
        <primitive
          object={oscar.scene}
          scale={[scale, scale, scale]}
          position={position}
          rotation={[rotation.x, rotation.y, rotation.z]}
        />
      </group>
    </>
  );
}

export default OscarTheDog;
