import * as THREE from 'three'
export function lightCreator(x, y, z, power, scene) {
 var l = new THREE.DirectionalLight(0xffffff, power);
  l.position.set(x, y, z);
  l.shadow.bias = -0.0001;
  l.shadow.mapSize.x = 512;
  l.shadow.mapSize.y = 512;
  
  l.castShadow = true;
  scene.add(l);
}
