import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { useKeyPress } from "react-use";

import React from "react";

function CameraController() {
  const [position, setPosition] = useState([0, 1.8, 0]);
  const moveSpeed = 0.1;

  const forwardRef = useRef(false);
  const backwardRef = useRef(false);
  const leftRef = useRef(false);
  const rightRef = useRef(false);

  const wKeyPressed = useKeyPress("w");
  const sKeyPressed = useKeyPress("s");
  const aKeyPressed = useKeyPress("a");
  const dKeyPressed = useKeyPress("d");

  useFrame(({ camera }) => {
    forwardRef.current = wKeyPressed;
    backwardRef.current = sKeyPressed;
    leftRef.current = aKeyPressed;
    rightRef.current = dKeyPressed;

    if (forwardRef.current) {
      camera.position.z -= moveSpeed;
    }
    if (backwardRef.current) {
      camera.position.z += moveSpeed;
    }
    if (leftRef.current) {
      camera.position.x -= moveSpeed;
    }
    if (rightRef.current) {
      camera.position.x += moveSpeed;
    }

    setPosition([camera.position.x, camera.position.y, camera.position.z]);
  });

  return <perspectiveCamera makeDefault position={position} />;
}

export default CameraController;
