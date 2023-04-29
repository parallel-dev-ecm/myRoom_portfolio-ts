import { useGLTF } from "@react-three/drei";

type Props = {};

function SpaceBoi({}: Props) {
  const model = useGLTF("./space_boi.glb");
  const scale = 5;

  return (
    <>
      <primitive
        name={"spaceBoi"}
        object={model.scene}
        scale={[scale, scale, scale]}
        position={[0, -7, 150]}
        rotation={[0, 3, 0]}
      />
    </>
  );
}

export default SpaceBoi;
