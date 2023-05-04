import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import StarPoints from "./StarPoints";
import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";
import {
  KeyboardControls,
  PointerLockControls,
  Stars,
} from "@react-three/drei";
import OscarTheDog from "./OscarTheDog";
import { Physics, Debug } from "@react-three/rapier";
import Player from "./Player";
import SpaceBoi from "./SpaceBoi";
import Ground from "./Ground";

type Props = {};

function Main_scene({}: Props) {
  const oscarPosition: THREE.Vector3 = new THREE.Vector3(-10, 0, 0);
  const oscarRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  const spaceBoiPosition: THREE.Vector3 = new THREE.Vector3(0, -7, 150);

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
      <Canvas camera={{ position: [0, 0, -1] }}>
        <Suspense fallback={<LoadingScreen />}>
          <Physics>
            <Debug />

            <OscarTheDog
              scale={0.006}
              position={oscarPosition}
              rotation={oscarRotation}
            />
            <Player />
            <Ground />
          </Physics>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <SpaceBoi position={spaceBoiPosition} />
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
