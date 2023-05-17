import { useRef } from "react";
import * as THREE from "three";
import { RigidBody, RigidBodyApi, CapsuleCollider } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type Props = {};

const SPEED = 10;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

function Player({}: Props) {
  const rigidBodyRef = useRef<RigidBodyApi | null>(null);
  const [, get] = useKeyboardControls();

  useFrame((state) => {
    const { forward, backward, left, right } = get();

    const oscarTheDog: THREE.Object3D | undefined =
      state.scene.getObjectByName("oscarTheDog");
    const oscarTheDogVector: THREE.Vector3 = new THREE.Vector3();
    oscarTheDog?.getWorldPosition(oscarTheDogVector);

    if (rigidBodyRef.current) {
      const velocity = rigidBodyRef.current.linvel();

      const translation = rigidBodyRef.current.translation();
      state.camera.position.set(translation.x, translation.y, translation.z);

      frontVector.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
      sideVector.set((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(state.camera.rotation);
      rigidBodyRef.current.setLinvel({
        x: direction.x,
        y: velocity.y,
        z: direction.z,
      });
      // const world = rapier.world.raw();
      // const ray = world.castRay(
      //   new RAPIER.Ray(rigidBodyRef.current.translation(), {
      //     x: 0,
      //     y: -1,
      //     z: 0,
      //   }),
      //   0.01,
      //   true
      // );
      // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
      // if (jump && grounded)
      //   rigidBodyRef.current.setLinvel({ x: 0, y: 7.5, z: 0 });
    }
  });
  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        mass={1}
        gravityScale={9.81}
        position={[0, 0, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[1, 0.75]} />
      </RigidBody>
    </>
  );
}

export default Player;
