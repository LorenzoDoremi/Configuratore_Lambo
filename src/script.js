import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { loadCar, parti } from "./loadCar";
import { TextureLoader } from "three";
import { lightCreator } from "./lightCreator";

// Debug
const gui = new dat.GUI();
const loader = new THREE.TextureLoader();
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.PlaneGeometry(100, 100, 100, 100);

var concrete = loader.load("concrete.jpg");
// Materials

concrete.wrapS = concrete.wrapT = THREE.RepeatWrapping;
concrete.repeat.set(32, 32);
const material = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  color: 0x555555,
  map: concrete,
});

// Mesh
const plane = new THREE.Mesh(geometry, material);
plane.rotation.set(Math.PI / 2, 0, 0);
plane.position.set(0, 0, 0);

plane.receiveShadow = true;

scene.add(plane);

// Lights
scene.fog = new THREE.FogExp2(new THREE.Color(1, 1, 1), 0.0);
lightCreator(5, 3, 0, 0.8, scene);
lightCreator(0, 5, 0, 0.8, scene);
lightCreator(-5, 2, -4, 0.8, scene);
lightCreator(0, 0.5, 4, 1, scene);

scene.add(new THREE.AmbientLight(0xffffff, 1));

//Load background texture

var domeTexture = loader.load("dome.png");


var dome = new THREE.Mesh(
  new THREE.SphereBufferGeometry(400, 20),
  new THREE.MeshStandardMaterial({
    map: domeTexture,
    side: THREE.DoubleSide,
  })
);
scene.add(dome);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 3;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
/**
 * Animate
 */

const clock = new THREE.Clock();

loadCar(scene);
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects

  // Update Orbital Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

$(".configure").on("touchstart mousedown", function (e) {
  var attribute = $(this).attr("value");
  console.log(attribute);
  parti[parseInt($(this).attr("id"))].color = new THREE.Color(parseInt(attribute));
  e.preventDefault(); //prevents further events from being dispatched
});

