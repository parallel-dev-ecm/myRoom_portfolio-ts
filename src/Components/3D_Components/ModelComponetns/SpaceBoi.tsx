import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { getDotFromCamera, getDistanceToPlayer } from "../../../functions";
import { gsap } from "gsap";
import { ShrinkingText } from "./ShrinkingText";

type Props = { position: THREE.Vector3; rotation: THREE.Vector3 };
let dotProduct: number;
let distanceToPlayer: number;

function SpaceBoi({ position, rotation }: Props) {
  const spaceBoiRef = useRef<THREE.Group>(null);
  const model = useGLTF("./space_boi.glb");
  const scale = 8;
  const tl: GSAPTimeline = gsap.timeline();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spaceBoy = spaceBoiRef.current;
      if (spaceBoy) {
        tl.add(
          gsap.to(spaceBoiRef.current.scale, {
            x: scale,
            y: scale,
            z: scale,
          })
        );
      }
    }, spaceBoiRef); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

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

      if (dotProduct > 0.9) {
        tl.play();
      } else {
        tl.reverse();
      }
    }
  });

  return (
    <>
      <group
        ref={spaceBoiRef}
        position={position}
        name={"spaceBoiWithText"}
        scale={0}
      >
        <primitive
          object={model.scene}
          rotation={[rotation.x, rotation.y, rotation.z]}
        />

        <group name="groupIntroTextLeft" position={[20, 10, 0]}>
          <ShrinkingText
            text="Welcome To My World!"
            name="introTextLeft"
            textScale={1}
            lookAtUser={true}
            textColor={"rgb(255,255,255)"}
          />
        </group>
        <group name="groupIntroTextRight" position={[-10, 10, 0]}>
          <ShrinkingText
            lookAtUser={true}
            text="@ parallel-dev-ecm "
            name="introTextRight"
            textScale={1}
            textColor={"rgb(255,255,255)"}
          />
        </group>
      </group>
    </>
  );
}

export default SpaceBoi;
