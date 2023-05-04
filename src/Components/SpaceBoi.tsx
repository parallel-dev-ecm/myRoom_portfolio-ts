import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getDotFromCamera } from "../functions";

type Props = { position: THREE.Vector3 };
let dotProduct: number;

function SpaceBoi({ position }: Props) {
  const spaceBoiRef = useRef<THREE.Group>(null);
  const model = useGLTF("./space_boi.glb");
  const scale = 5;

  useFrame((state) => {
    if (spaceBoiRef.current) {
      dotProduct = getDotFromCamera(spaceBoiRef.current.name, state);
    }
    console.log("dotProduct: ", dotProduct);
  });

  return (
    <>
      <primitive
        ref={spaceBoiRef}
        name={"spaceBoi"}
        object={model.scene}
        scale={[scale, scale, scale]}
        position={position}
        rotation={[0, 3, 0]}
      />
    </>
  );
}

export default SpaceBoi;
