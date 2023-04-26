import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";

type Props = {};

function ThirdPersonCamera({}: Props) {
  const currentPosition: THREE.Vector3 = new THREE.Vector3();
  const currentLookAt: THREE.Vector3 = new THREE.Vector3();

  useFrame((state, delta, xrFrame) => {
    //FILLL IDEAL OFFSET AND IDEAL LOOKAT
  });
  return <OrbitControls />;
}

export default ThirdPersonCamera;
