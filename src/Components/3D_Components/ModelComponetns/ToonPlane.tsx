import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

type Props = { scaleScalar: number };

function ToonPlane({ scaleScalar }: Props) {
  const model = useGLTF("./ww1Plane.glb");
  const animations = useAnimations(model.animations, model.scene);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const idle = animations.actions["Take 001"];
    idle?.play();
  }, []);
  return (
    <>
      <group ref={modelRef} name="toonAirplaneParentGroup">
        <primitive
          scale={[scaleScalar, scaleScalar, scaleScalar]}
          object={model.scene}
        />
      </group>
    </>
  );
}

export default ToonPlane;
