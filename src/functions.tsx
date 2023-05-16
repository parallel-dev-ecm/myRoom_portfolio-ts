import { RootState } from "@react-three/fiber";
import {
  RapierRigidBody,
  WorldApi,
} from "@react-three/rapier/dist/declarations/src/types";
import * as THREE from "three";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";

//Camera = player

interface inputData {
  state: RootState;
  objectToGetDistanceFrom?: string;
  rapierVector?: THREE.Vector3;
}

interface rapierWorldInputs {
  world: WorldApi;
}

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

export const getRotationQuaternionToPlayer = (inputData: inputData) => {
  const rapierVector = inputData.rapierVector;
  rapierVector?.normalize();
  const state = inputData.state;
  const camera = state.camera;
  const cameraPosition = camera.position;
  const currentDirection = new THREE.Vector3(1, 0, 0); // The initial direction of your object

  if (rapierVector) {
    const directionToPlayer = getDirectionToPlayer(
      rapierVector,
      cameraPosition
    );

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      currentDirection,
      directionToPlayer
    );
    return quaternion;
  } else {
    return new THREE.Quaternion(0, 0, 0);
  }
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
