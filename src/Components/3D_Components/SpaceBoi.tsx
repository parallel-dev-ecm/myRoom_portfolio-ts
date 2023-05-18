import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getDotFromCamera, getDistanceToPlayer } from "../../functions";
import { gsap } from "gsap";
import { ShrinkingText } from "./ShrinkingText";

type Props = { position: THREE.Vector3; rotation: THREE.Vector3 };
let dotProduct: number;
let distanceToPlayer: number;

function SpaceBoi({ position, rotation }: Props) {
  const spaceBoiRef = useRef<THREE.Group>(null);
  const model = useGLTF("./space_boi.glb");
  const scale = 8;

  useFrame((state) => {
    if (spaceBoiRef.current) {
      dotProduct = getDotFromCamera({
        state: state,
        objectToGetDistanceFrom: spaceBoiRef.current.name,
      });
      distanceToPlayer = getDistanceToPlayer({
        state: state,
        objectToGetDistanceFrom: spaceBoiRef.current.name,
      });

      if (dotProduct > 0.6 && distanceToPlayer < 310) {
        gsap.to(spaceBoiRef.current.scale, {
          x: scale,
          y: scale,
          z: scale,
        });
      } else {
        gsap.to(spaceBoiRef.current.scale, { x: 0, y: 0, z: 0 });
      }
    }
  });

  return (
    <>
      <group ref={spaceBoiRef} position={position} name={"spaceBoiWithText"}>
        <primitive
          object={model.scene}
          rotation={[rotation.x, rotation.y, rotation.z]}
        />

        <group name="introText" position={[20, 10, 0]}>
          <ShrinkingText
            text="Hello Welcome To My world"
            name="leftSideSpaceBoyText"
            textScale={1}
          />
        </group>
      </group>
    </>
  );
}

export default SpaceBoi;
