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

		// マテリアル
		this.material = new THREE.MeshBasicMaterial();

		// メッシュ
		this.sphereMesh = new THREE.Mesh(this.sphere, this.material);
		this.planeMesh = new THREE.Mesh(this.plane, this.material);
		this.octahedronMesh = new THREE.Mesh(this.octahedron, this.material);

		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

		this.scene.add(this.sphereMesh, this.planeMesh, this.octahedronMesh);
	}
}
