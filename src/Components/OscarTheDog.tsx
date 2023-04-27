import { useGLTF, useAnimations, Reflector } from "@react-three/drei";
import {
  RigidBodyProps,
  RigidBody,
  useRapier,
  RigidBodyApi,
} from "@react-three/rapier";
import { useEffect, useRef, MutableRefObject } from "react";
import * as THREE from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type Props = {
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  speed?: number;
  rotationSpeed?: number;
};

function OscarTheDog({ scale, position, rotation }: Props) {
  const SPEED = 2.5;

  const directionVector = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const rotationVector = new THREE.Vector3();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  const ref = useRef<RigidBodyApi | null>(null);

  const oscar = useGLTF("./oscar_the_dog.glb");
  const groupRef = useRef<THREE.Group>(null);
  const animations = useAnimations(oscar.animations, oscar.scene);

  useEffect(() => {
    const idle = animations.actions.Idle;
    idle?.play();
  }, []);
  const tempEuler = new THREE.Euler();

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get();

    if (ref.current && groupRef.current) {
      const testVector = new THREE.Vector3();

      groupRef.current.getWorldDirection(testVector);
      console.log();
      testVector
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(state.camera.rotation);
      const velocity = ref.current.linvel();

      // Calculate the movement direction
      frontVector.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
      sideVector.set((left ? 1 : 0) - (right ? 1 : 0), 0, 0);

      // Combine the front and side vectors and apply the camera rotation
      directionVector
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED);

      // Update the RigidBody linear velocity
      ref.current.setLinvel({
        x: directionVector.x,
        y: velocity.y,
        z: directionVector.z,
      });

      // Smoothly interpolate (lerp) the character's rotation towards the target rotation
    }
  });

  return (
    <>
      <RigidBody ref={ref} friction={0.1}>
        <group name="oscarTheDog" ref={groupRef}>
          <primitive
            object={oscar.scene}
            scale={[scale, scale, scale]}
            position={position}
            rotation={[rotation.x, rotation.y, rotation.z]}
          />
        </group>
      </RigidBody>
    </>
  );
}

export default OscarTheDog;
