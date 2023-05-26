import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";

type Props = { width: number; height: number };
//10,5,0.2

function GalleryWall({ width, height }: Props) {
  return (
    <>
      <RigidBody type="fixed" mass={1000}>
        <RoundedBox args={[width, height, 0.2]} />
      </RigidBody>
    </>
  );
}

export default GalleryWall;
