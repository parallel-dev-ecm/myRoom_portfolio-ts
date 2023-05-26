import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";

type Props = { scaleScalar: number };

function LauchRocket({ scaleScalar }: Props) {
  const model = useGLTF("./launchRocket.glb");
  const animations = useAnimations(model.animations, model.scene);
  useEffect(() => {
    const idle = animations.actions.Walking;
    idle?.play();
  }, []);

  return (
    <>
      <RigidBody position={[0, 0, -10]} mass={1000}>
        <primitive
          name={"launchRocket"}
          object={model.scene}
          scale={[scaleScalar, scaleScalar, scaleScalar]}
        />
      </RigidBody>
    </>
  );
}

export default LauchRocket;
