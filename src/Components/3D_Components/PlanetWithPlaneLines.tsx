import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = { position: THREE.Vector3 };

function PlanetWithPlaneLines({ position }: Props) {
  const astronautGLTF = useGLTF("./planet.glb");
  const scaleScalar = 100;
  const scale = new THREE.Vector3(scaleScalar, scaleScalar, scaleScalar);

  return (
    <>
      <group position={position} rotation={[5, 90, 10]}>
        <primitive
          name={"planetWithLines"}
          object={astronautGLTF.scene}
          scale={[scale.x, scale.y, scale.z]}
        />
      </group>
    </>
  );
}

export default PlanetWithPlaneLines;
