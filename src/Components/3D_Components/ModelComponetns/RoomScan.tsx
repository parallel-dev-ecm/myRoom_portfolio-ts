import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

type Props = {
  scale: THREE.Vector3;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
};

function RoomScan({ scale, position, rotation }: Props) {
  const { scene } = useGLTF("./roomScan.glb");

  return (
    <RigidBody type="fixed">
      <primitive
        object={scene}
        scale={[scale.x, scale.y, scale.z]}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
      />
    </RigidBody>
  );
}

export default RoomScan;
