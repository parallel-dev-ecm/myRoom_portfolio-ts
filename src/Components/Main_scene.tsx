import { Canvas } from "@react-three/fiber";
import RoomScan from "./RoomScan";
import * as THREE from "three";
import StarPoints from "./StarPoints";
import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";
import { OrbitControls } from "@react-three/drei";
import OscarTheDog from "./OscarTheDog";

type Props = {};

function Main_scene({}: Props) {
  const roomScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  const roomPosition: THREE.Vector3 = new THREE.Vector3(0, -0.5, -3);
  const roomRotation: THREE.Vector3 = new THREE.Vector3(0, -1, 0);

  const oscarPosition: THREE.Vector3 = new THREE.Vector3(-1, -1.9, -0.8);
  const oscarRotation: THREE.Vector3 = new THREE.Vector3(0, 0.4, 0);

  return (
    <Canvas>
      <Suspense fallback={<LoadingScreen />}>
        <RoomScan
          scale={roomScale}
          rotation={roomRotation}
          position={roomPosition}
        />
        <OscarTheDog
          scale={0.003}
          position={oscarPosition}
          rotation={oscarRotation}
        />

        <StarPoints numberOfStars={1000} starScale={0.09} />

        <ambientLight color={[1, 0, 0.1]} intensity={0.7} />

        <ambientLight color={[1, 1, 1]} intensity={0.4} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default Main_scene;
