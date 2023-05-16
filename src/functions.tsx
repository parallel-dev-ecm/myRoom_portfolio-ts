import { RootState } from "@react-three/fiber";
import * as THREE from "three";

//Camera = player

interface inputData {
  state: RootState;
  objectToGetDistanceFrom?: string;
  rapierVector?: THREE.Vector3;
}

export const getDistanceToPlayer = (inputData: inputData): number => {
  const state = inputData.state;
  const rapierVector = inputData.rapierVector;
  const objectToGetDistanceFrom = inputData.objectToGetDistanceFrom;

  const camera = state.camera;
  const cameraPosition: THREE.Vector3 = camera.position;
  const scene = state.scene;

  if (rapierVector) {
    const distance: number = cameraPosition.distanceTo(rapierVector);
    return distance;
  } else {
    if (objectToGetDistanceFrom) {
      const toOtherObject = scene.getObjectByName(objectToGetDistanceFrom);
      const toOtherVector: THREE.Vector3 = new THREE.Vector3();
      if (toOtherObject) {
        toOtherVector.copy(toOtherObject.position);
        const distance: number = cameraPosition.distanceTo(toOtherVector);
        return distance;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
};

export const getDotFromCamera = (inputData: inputData): number => {
  const state = inputData.state;
  const objectToLookAtName = inputData.objectToGetDistanceFrom;

  const camera = state.camera;
  const scene = state.scene;

  const cameraPosition = camera.position;
  const cameraDirection: THREE.Vector3 = new THREE.Vector3();
  const toOtherVector: THREE.Vector3 = new THREE.Vector3();

  camera.getWorldDirection(cameraDirection);

  if (objectToLookAtName) {
    const toOtherObject = scene.getObjectByName(objectToLookAtName);
    if (toOtherObject) {
      toOtherVector.copy(toOtherObject.position);
      const direction: THREE.Vector3 = new THREE.Vector3(
        toOtherVector.x - cameraPosition.x,
        toOtherVector.y - cameraPosition.y,
        toOtherVector.z - cameraPosition.z
      );
      direction.normalize();
      const dot: number = cameraDirection.dot(direction);
      return dot;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
