import { Box, RoundedBox } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import GalleryWall from "../ModelComponetns/GalleryWall";
import * as THREE from "three";
import { ShrinkingText } from "../ModelComponetns/ShrinkingText";

type Props = {};

function Gallery({}: Props) {
  //idle animation play on first render

  return (
    <>
      <group
        name="galleryWallNorth"
        position={[0, -1, -20]}
        rotation={[0, 0, 0]}
      >
        <GalleryWall width={10} height={5} />

        <group position={[-4.5, 1.2, 0.1]} scale={0.5}>
          <ShrinkingText
            textColor="rgb(0,0,0)"
            textScale={1}
            text="Software Engineer"
            shrinkingThreshold={0.97}
            lookAtUser={false}
            name="testName"
          />
        </group>

        <group position={[-4.5, -0.3, 0.1]} scale={0.4}>
          <ShrinkingText
            textColor="rgb(255,0,0)"
            textScale={1}
            text="Ts  Python  "
            shrinkingThreshold={0.97}
            lookAtUser={false}
            name="testName2"
          />
        </group>
      </group>
    </>
  );
}

export default Gallery;
