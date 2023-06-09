// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';

// オービットコントロール
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		// ジオメトリ
		this.sphere = new THREE.SphereGeometry(0.5, 32, 16);
		this.box = new THREE.BoxGeometry(1, 1, 1);
		this.plane = new THREE.PlaneGeometry(100, 100);
		this.octahedron = new THREE.OctahedronGeometry(0.5);

		// テクスチャ
		this.textureLoader = new THREE.TextureLoader();
		this.texture = this.textureLoader.load('./textures/brick.jpg');

		// マテリアル
		this.material = new THREE.MeshPhongMaterial();
		this.material.shininess = 100;
		this.material.side = THREE.DoubleSide;
		this.material.specular = new THREE.Color(0x1188ff);

		// メッシュ
		this.sphereMesh = new THREE.Mesh(this.sphere, this.material);
		this.boxMesh = new THREE.Mesh(this.box, this.material);
		this.planeMesh = new THREE.Mesh(this.plane, this.material);
		this.octahedronMesh = new THREE.Mesh(this.octahedron, this.material);

		// ポジション
		this.sphereMesh.position.set(-2, 0, 0);
		this.octahedronMesh.position.set(2, 0, 0);

		// 床を作成
		this.planeMesh.rotation.x = -Math.PI * 0.5;
		this.planeMesh.position.y = -1;

		// ライト
		this.light = new THREE.AmbientLight(0xffffff, 0.2);
		this.scene.add(this.light);

		this.pointLight = new THREE.PointLight(0xff4000, 0.6, 10);
		this.pointLight.position.set(2, 0, 4);
		this.scene.add(this.pointLight);

		this.scene.add(
			this.sphereMesh,
			this.boxMesh,
			this.planeMesh,
			this.octahedronMesh
		);

		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

		// 時間
		this.time = new THREE.Clock();

		// デバッグ
		this.debug();
	}

	debug() {
		// UIデバッグ
		/**
		 * @type {any}
		 */
		this.pane = new Pane();

		const lightPane = this.pane.addFolder({
			title: 'Light',
		});

		// ライトの明るさ
		lightPane.addInput(this.light, 'intensity', {
			min: 0,
			max: 1,
		});

		// ライトのポジション
		const lightPosPane = lightPane.addFolder({
			title: 'Position',
		});

		lightPosPane.addInput(this.light.position, 'x', {
			min: -5,
			max: 5,
		});
		lightPosPane.addInput(this.light.position, 'y', {
			min: -5,
			max: 5,
		});
		lightPosPane.addInput(this.light.position, 'z', {
			min: -5,
			max: 5,
		});
	}

	animation() {
		const elapsedTime = this.time.getElapsedTime();

		// x軸
		this.sphereMesh.rotation.x = elapsedTime;
		this.boxMesh.rotation.x = elapsedTime;
		this.octahedronMesh.rotation.x = elapsedTime;

		// y軸
		this.sphereMesh.rotation.y = elapsedTime;
		this.boxMesh.rotation.y = elapsedTime;
		this.octahedronMesh.rotation.y = elapsedTime;
	}
}
