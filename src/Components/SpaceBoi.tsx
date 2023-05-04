import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = { position: THREE.Vector3 };
let dotProduct: number;

const getDot = (
  playerForward: THREE.Vector3,
  toOther: THREE.Vector3
): number => {
  console.log("playerForward: ", playerForward);
  console.log("toOther: ", toOther);
  const direction: THREE.Vector3 = playerForward.sub(toOther).normalize();
  const dot: number = playerForward.dot(direction);
  return dot;
};

function SpaceBoi({ position }: Props) {
  const spaceBoiRef = useRef<THREE.Group>(null);
  const model = useGLTF("./space_boi.glb");
  const scale = 5;
  const cameraDirection: THREE.Vector3 = new THREE.Vector3();

  useFrame((state) => {
    state.camera.getWorldDirection(cameraDirection);
    dotProduct = getDot(cameraDirection, position);
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
