/* Main R3F SCENE  */
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import StarPoints from "./Environment/StarPoints";
import { Suspense } from "react";
import LoadingScreen from "./Environment/LoadingScreen";
import {
  KeyboardControls,
  PointerLockControls,
  Stars,
} from "@react-three/drei";
import OscarTheDog from "./ModelComponetns/OscarTheDog";
import { Physics, Debug } from "@react-three/rapier";
import Player from "./Player";
import Ground from "./Environment/Ground";
import TopDomeScene from "./Environment/TopDomeScene";
import SpaceBoi from "./ModelComponetns/SpaceBoi";
import LeftADomeScene from "./Environment/LeftADomeScene";
import LauchRocket from "./ModelComponetns/LaunchRocket";
import Gallery from "./Environment/Gallery";

type Props = {};

function Main_scene({}: Props) {
  /* Controls */
  /* Oscar = Dog Model */
  // spaceBoi = Black doodle with orbiting planets

  const oscarPosition: THREE.Vector3 = new THREE.Vector3(-20, 0, 0);
  const oscarRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  const spaceBoiPosition: THREE.Vector3 = new THREE.Vector3(0, 100, 250);

  const spaceBoiRotation: THREE.Vector3 = new THREE.Vector3(
    -Math.PI * 0.3,
    -Math.PI * 1.2,
    0
  );

  return (
    // AWSD controls
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas camera={{ position: [0, 0, -1], near: 1, far: 10000 }}>
        {/* Loading screen */}
        <Suspense fallback={<LoadingScreen />}>
          <PointerLockControls />

          {/* DOME SCENES */}
          <group name="topDomeScene" position={[0, 400, 0]}>
            <TopDomeScene />
          </group>
          <group scale={1} position={[1000, 200, 250]}>
            <LeftADomeScene name="leftADomeScene" />
          </group>

          <Physics>
            <Gallery />
            {/* <LauchRocket scaleScalar={1} /> */}

            {/* <Debug /> */}
            {/* <FallingText text="Hello" minDistanceToTrigger={20} /> */}
            <OscarTheDog
              scale={0.006}
              position={oscarPosition}
              rotation={oscarRotation}
            />
            <Player />
            <Ground />
          </Physics>

          {/* Stars Background */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <SpaceBoi position={spaceBoiPosition} rotation={spaceBoiRotation} />

          {/* Stars in env not in background */}
          <StarPoints numberOfStars={1000} starScale={0.09} />
          <spotLight color={0xffffff} intensity={1} position={[0, 0, 0]} />

          {/* Lights */}
          <ambientLight color={[1, 1, 1]} intensity={1} />

          {/* <PlanetWithPlaneLines position={planetWithLinesPosition} /> */}
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default Main_scene;
