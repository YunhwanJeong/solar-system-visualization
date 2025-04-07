import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
	color: "violet",
	wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);
cubeMesh.add(new THREE.AxesHelper(2));

cubeMesh.rotation.reorder("YXZ");

cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

const camera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	200,
);

camera.position.z = 5;
const canvas = document.getElementById("threejs-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

controls.update();

const clock = new THREE.Clock();

function animate() {
	const delta = clock.getDelta();

	cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;
	cubeMesh.scale.x = Math.sin(clock.getElapsedTime()) * 2;
	cubeMesh.position.x = Math.sin(clock.getElapsedTime()) * 2;

	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

animate();
