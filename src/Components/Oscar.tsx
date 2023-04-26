import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";

function Oscar(props) {
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const ref = useRef();

  const oscar = useGLTF("./oscar_the_dog.glb");
  const groupRef = useRef < THREE.Group > null;

  const animations = useAnimations(oscar.animations, oscar.scene);
  console.log(animations);

  useEffect(() => {
    const idle = animations.actions.Idle;
    idle?.play();
  }, []);

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();
    const velocity = ref.current.linvel();
    // update camera
    state.camera.position.set(...ref.current.translation());
    // update axe
    axe.current.children[0].rotation.x = lerp(
      axe.current.children[0].rotation.x,
      Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6,
      0.1
    );
    axe.current.rotation.copy(state.camera.rotation);
    axe.current.position
      .copy(state.camera.position)
      .add(state.camera.getWorldDirection(rotation).multiplyScalar(1));
    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // jumping
    const world = rapier.world.raw();
    const ray = world.castRay(
      new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 })
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
  });

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 10, 0]}
      enabledRotations={[false, false, false]}
    >
      <group name="oscarTheDog" ref={groupRef}>
        <primitive
          object={oscar.scene}
          scale={[props.scale, props.scale, props.scale]}
          position={props.position}
          rotation={[props.rotation.x, props.rotation.y, props.rotation.z]}
        />
      </group>
    </RigidBody>
  );
}
export default Oscar;
