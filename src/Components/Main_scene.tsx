import { Canvas } from "@react-three/fiber";

import RoomScan from "./RoomScan";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import StarPoints from "./StarPoints";

import { Physics } from "@react-three/rapier";
import FirstPersonCamera from "./FirstPersonCamera";

type Props = {};

function Main_scene({}: Props) {
  const roomScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  const roomPosition: THREE.Vector3 = new THREE.Vector3(0, -0.5, -3);
  const roomRotation: THREE.Vector3 = new THREE.Vector3(0, -1, 0);

  return (
    <Canvas>
      <Physics gravity={[0, -30, 0]}>
        <RoomScan
          scale={roomScale}
          rotation={roomRotation}
          position={roomPosition}
        />
      </Physics>
      <FirstPersonCamera />
      <StarPoints numberOfStars={1000} starScale={0.09} />

      <ambientLight color={[1, 0, 0.1]} intensity={0.7} />

      <ambientLight color={[1, 1, 1]} intensity={0.4} />
    </Canvas>
  );
}

export default Main_scene;