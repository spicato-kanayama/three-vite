// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';

// オービットコントロール
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		// ジオメトリ
		this.boxGeometry = new THREE.BoxGeometry(1, 1, 1);
		this.sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
		this.planeGeometry = new THREE.PlaneGeometry(10, 10);

		// バッファジオメトリ
		this.bufferGeometry = new THREE.BufferGeometry();

		// 9つの頂点座標（小数点）
		const count = 50;
		const positionArray = new Float32Array(9 * count);

		for (let i = 0; i < count * 9; i++) {
			positionArray[i] = (Math.random() - 0.5) * 2;
		}

		const positionAttribute = new THREE.BufferAttribute(positionArray, 3);

		this.bufferGeometry.setAttribute('position', positionAttribute);

		// マテリアル
		this.material = new THREE.MeshBasicMaterial({
			wireframe: true,
		});

		// メッシュ
		this.box = new THREE.Mesh(this.boxGeometry, this.material);
		this.sphere = new THREE.Mesh(this.sphereGeometry, this.material);
		this.plane = new THREE.Mesh(this.planeGeometry, this.material);
		this.buffer = new THREE.Mesh(this.bufferGeometry, this.material);

		// ポジション
		this.sphere.position.set(2, 0, 0);

		// 1PIラジアン = 180度
		// 90度回転させたい場合は、90 * Math.PI / 180 = Math.PI / 2
		this.plane.rotation.x = -Math.PI / 2;
		this.plane.position.y = -0.5;

		// メッシュをシーンに追加
		// this.scene.add(this.box, this.sphere, this.plane);
		this.scene.add(this.buffer);

		// オービットコントロール
		this.orbitControls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);
	}
}
