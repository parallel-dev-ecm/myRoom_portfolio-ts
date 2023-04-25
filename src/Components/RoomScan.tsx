import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

type Props = {
  scale: THREE.Vector3;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
};

function RoomScan({ scale, position, rotation }: Props) {
  const { scene } = useGLTF("./roomScan.glb");

  scene.traverse((child) => {
    if (child instanceof Mesh) {
      console.log(child.material);
    }
  });

  return (
    <primitive
      object={scene}
      scale={[scale.x, scale.y, scale.z]}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    />
  );
}

export default RoomScan;
