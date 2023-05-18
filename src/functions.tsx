import { RootState } from "@react-three/fiber";
import {
  RapierRigidBody,
  WorldApi,
} from "@react-three/rapier/dist/declarations/src/types";
import * as THREE from "three";

//Camera = player

interface inputData {
  state: RootState;
  objectToGetDistanceFrom?: string;
  rapierVector?: THREE.Vector3;
}
export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

// Example usage:

export const removeRigidBody = (
  world: WorldApi,
  rigidBody: RapierRigidBody
) => {
  world.removeRigidBody(rigidBody);
};

export const getDirectionToPlayer = (
  toOtherVector: THREE.Vector3,
  cameraPosition: THREE.Vector3
): THREE.Vector3 => {
  const direction: THREE.Vector3 = new THREE.Vector3(
    toOtherVector.x - cameraPosition.x,
    toOtherVector.y - cameraPosition.y,
    toOtherVector.z - cameraPosition.z
  );
  direction.normalize();
  return direction;
};

export const getDirectionDifference = (
  objectDirection: THREE.Vector3,
  objectPosition: THREE.Vector3,
  playerPosition: THREE.Vector3
) => {
  const directionToPlayer = getDirectionToPlayer(
    objectPosition,
    playerPosition
  );

  const directionDifference = getDirectionToPlayer(
    objectDirection,
    directionToPlayer
  );

  return directionDifference;
};

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
        const toOtherWorldPosition = new THREE.Vector3();
        toOtherObject.getWorldPosition(toOtherWorldPosition);
        toOtherVector.copy(toOtherWorldPosition);
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
  const rapierVector = inputData.rapierVector;

  const camera = state.camera;
  const scene = state.scene;

  const cameraPosition = camera.position;
  const cameraDirection: THREE.Vector3 = new THREE.Vector3();
  const toOtherVector: THREE.Vector3 = new THREE.Vector3();

  camera.getWorldDirection(cameraDirection);

  if (rapierVector) {
    const direction: THREE.Vector3 = getDirectionToPlayer(
      rapierVector,
      cameraPosition
    );
    const dot: number = cameraDirection.dot(direction);
    return dot;
  } else if (objectToLookAtName) {
    const toOtherObject = scene.getObjectByName(objectToLookAtName);
    if (toOtherObject) {
      const toOtherWorldPosition = new THREE.Vector3();
      toOtherObject.getWorldPosition(toOtherWorldPosition);
      toOtherVector.copy(toOtherWorldPosition);
      const direction: THREE.Vector3 = getDirectionToPlayer(
        toOtherVector,
        cameraPosition
      );
      const dot: number = cameraDirection.dot(direction);
      return dot;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
