import { useProgress, Html } from "@react-three/drei";
import React from "react";
useProgress;

type Props = {};

function LoadingScreen({}: Props) {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html center style={{ color: "white" }}>
      {progress} % loaded
    </Html>
  );
}

export default LoadingScreen;
