import { Canvas } from "@react-three/fiber";
import RoomScan from "./RoomScan";
import * as THREE from "three";
import StarPoints from "./StarPoints";
import { Suspense, useRef } from "react";
import LoadingScreen from "./LoadingScreen";
import {
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
} from "@react-three/drei";
import OscarTheDog from "./OscarTheDog";
import { Physics, Debug } from "@react-three/rapier";
import SplineRoom from "./SplineRoom";
import Player from "./Player";

type Props = {};

function Main_scene({}: Props) {
  const roomScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  const roomPosition: THREE.Vector3 = new THREE.Vector3(0, -0.5, 0);
  const roomRotation: THREE.Vector3 = new THREE.Vector3(0, -1, 0);
  const oscarPosition: THREE.Vector3 = new THREE.Vector3(-3, 0, 3);
  const oscarRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas camera={{ fov: 45, position: [0, 0, -1] }}>
        <Suspense fallback={<LoadingScreen />}>
          <Physics>
            <Debug />
            <SplineRoom scale={0.05} />
            {/* <RoomScan
            scale={roomScale}
            rotation={roomRotation}
            position={roomPosition}
          /> */}
            <OscarTheDog
              scale={0.006}
              position={oscarPosition}
              rotation={oscarRotation}
            />
            <Player />
          </Physics>
          <PointerLockControls />
          <StarPoints numberOfStars={1000} starScale={0.09} />
          <ambientLight color={[1, 0, 0.1]} intensity={0.7} />
          <ambientLight color={[1, 1, 1]} intensity={0.4} />
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default Main_scene;
