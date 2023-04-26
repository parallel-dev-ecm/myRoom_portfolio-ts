import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
import * as THREE from "three";

const initialVector = new THREE.Vector3();
const store = proxy({
  open: false,
  controlsTarget: initialVector,
});
export const useStore = () => useProxy(store);
