// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';

// オービットコントロール
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		// ジオメトリ
		this.sphere = new THREE.SphereGeometry(0.5, 32, 16);
		this.plane = new THREE.PlaneGeometry(1, 1);
		this.octahedron = new THREE.OctahedronGeometry(0.5);

		// テクスチャ
		this.textureLoader = new THREE.TextureLoader();
		this.texture = this.textureLoader.load('./textures/brick.jpg');

		// マテリアル
		this.material = new THREE.MeshPhongMaterial();
		this.material.shininess = 100;
		this.material.specular = new THREE.Color(0x1188ff);

		// メッシュ
		this.sphereMesh = new THREE.Mesh(this.sphere, this.material);
		this.planeMesh = new THREE.Mesh(this.plane, this.material);
		this.octahedronMesh = new THREE.Mesh(this.octahedron, this.material);

		// ポジション
		this.sphereMesh.position.set(-2, 0, 0);
		this.octahedronMesh.position.set(2, 0, 0);

		// ライト
		this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
		this.pointLight = new THREE.PointLight(0xffffff, 0.6);
		this.pointLight.position.set(2, 3, 4);
		this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, 1);

		this.scene.add(
			this.ambientLight,
			this.pointLight,
			this.pointLightHelper
		);

		this.scene.add(this.sphereMesh, this.planeMesh, this.octahedronMesh);

		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

		// 時間
		this.time = new THREE.Clock();
	}

	animation() {
		const elapsedTime = this.time.getElapsedTime();

		// x軸
		this.sphereMesh.rotation.x = elapsedTime;
		this.planeMesh.rotation.x = elapsedTime;
		this.octahedronMesh.rotation.x = elapsedTime;

		// y軸
		this.sphereMesh.rotation.y = elapsedTime;
		this.planeMesh.rotation.y = elapsedTime;
		this.octahedronMesh.rotation.y = elapsedTime;
	}
}
