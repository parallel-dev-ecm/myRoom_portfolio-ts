import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getDotFromCamera, getDistanceToPlayer } from "../functions";
import { gsap } from "gsap";
import { Text3D } from "@react-three/drei";

type Props = { position: THREE.Vector3; rotation: THREE.Vector3 };
let dotProduct: number;
let distanceToPlayer: number;

function SpaceBoi({ position, rotation }: Props) {
  const spaceBoiRef = useRef<THREE.Group>(null);
  const model = useGLTF("./space_boi.glb");
  const scale = 8;
  const textRef = useRef<THREE.Group>(null);

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

      if (dotProduct > 0.8 && distanceToPlayer < 310) {
        gsap.to(spaceBoiRef.current.scale, {
          x: scale,
          y: scale,
          z: scale,
        });
      } else {
        gsap.to(spaceBoiRef.current.scale, { x: 0, y: 0, z: 0 });
      }
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <>
      <group ref={spaceBoiRef} position={position} name={"spaceBoiWithText"}>
        <primitive
          object={model.scene}
          rotation={[rotation.x, rotation.y, rotation.z]}
        />
        <group name="introText" ref={textRef} position={[15, 5, -5]}>
          <Text3D position={[0, 0, 0]} font={"./myFont.json"}>
            Welcome To
          </Text3D>
          <Text3D position={[0, -1.5, 0]} font={"./myFont.json"}>
            @parallel-dev-ecm
          </Text3D>
        </group>
      </group>
    </>
  );
}

export default SpaceBoi;
