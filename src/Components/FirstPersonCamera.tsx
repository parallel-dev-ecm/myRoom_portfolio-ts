import React, { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FirstPersonControls } from "@react-three/drei";

type Props = {};

type KeyState = {
  KeyW?: boolean;
  KeyA?: boolean;
  KeyS?: boolean;
  KeyD?: boolean;
};

function FirstPersonCamera({}: Props) {
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const moveSpeed = 0.1;

  const [keysPressed, setKeysPressed] = useState<KeyState>({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((keys) => ({ ...keys, [event.code]: true }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((keys) => ({ ...keys, [event.code]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(({ camera }) => {
    if (keysPressed.KeyW) {
      camera.position.z -= moveSpeed;
    }
    if (keysPressed.KeyS) {
      camera.position.z += moveSpeed;
    }
    if (keysPressed.KeyA) {
      camera.position.x -= moveSpeed;
    }
    if (keysPressed.KeyD) {
      camera.position.x += moveSpeed;
    }

    setPosition(
      new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
    );
  });

  return <FirstPersonControls />;
}

export default FirstPersonCamera;
