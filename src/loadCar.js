import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Color, DoubleSide, TextureLoader } from "three";
import { domeTexture } from "./script";
const loader = new GLTFLoader();
// Load the plane

export var scocca = new THREE.MeshStandardMaterial({
  color: 0xb5ff4b /*  0xffffff */,
  roughness: 0.2,
  metalness: 0.45,
});

export var dettagli = new THREE.MeshStandardMaterial({
  color: 0x111111,
  roughness: 0.6,
});

export var sedili = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});
// esterno
export var sedili2 = new THREE.MeshStandardMaterial({
  color: 0x222222,
});
export var interni = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.5,
});
export var vetro = new THREE.MeshStandardMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,
});

export var luci = new THREE.MeshStandardMaterial({
  color: 0xff0000,

  emissiveIntensity: 1,
  side: THREE.DoubleSide,
});

export var cerchi = new THREE.MeshStandardMaterial({
  color: /*  0xb5FF4b */ 0x111111,
  roughness: 0.2,
  metalness: 0.5,
});

var fanali = new THREE.MeshStandardMaterial({
  color: 0xddddff,
  transparent: true,
  opacity: 0.8,
  emissive: 0xddddff,
  emissiveIntensity: 100,
  side: THREE.DoubleSide,
});



export var parti = [
    scocca,
    dettagli,
    sedili,
   
    cerchi,
    interni,
    
    luci, 
    fanali
]

var car = [];
export function loadCar(scene) {
  loader.load(
    // resource URL
    "ferrari.glb",
    // called when the resource is loaded
    function (gltf) {
      var gscene = gltf.scene;
      gscene.position.set(-1, 0, 0);
      scene.add(gscene);
      gscene.traverse(function (child) {
        if (child.isMesh) {
          // car.push(child);
          child.castShadow = true;
          child.receiveShadow = true;

          switch (child.material.name) {
            case "scocca":
              child.material = scocca;
              break;
            case "dettagli":
              child.material = dettagli;
              break;
            case "sedili":
              child.material = sedili;
              break;
            case "interni":
              child.material = interni;
            case "sedili2":
              child.material = sedili2;
              break;
            case "vetro":
              child.material = vetro;
              break;
            case "luci":
              child.material = luci;
              break;
            case "fanali":
              child.material = fanali;
              break;
            case "cerchi":
              child.material = cerchi;
              break;
          }
        }
      });
    }
  );
}
