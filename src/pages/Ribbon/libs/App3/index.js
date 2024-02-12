// npm
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createNoise2D } from 'simplex-noise';

import BaseCanvas from './BaseCanvas';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		// ローダー
		this.loader = new THREE.TextureLoader();

		// ヘルパー
		this.helper = new THREE.GridHelper(3, 50);
		this.scene.add(this.helper);

		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

		// 時間
		this.time = new THREE.Clock();

		// ノイズ
		this.noise = createNoise2D();

		// カメラ
		this.camera.position.set(1, 1, 1);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.geo = new THREE.PlaneGeometry(1, 0.2, 100, 1);
		this.mate = new THREE.MeshNormalMaterial({
			side: THREE.DoubleSide,
		});

		this.geo.rotateX(Math.PI / 2);

		this.mesh = new THREE.Mesh(this.geo, this.mate);

		this.scene.add(this.mesh);

		this.vertices = this.mesh.geometry.attributes.position.array;

		for (let i = 0; i < this.vertices.length; i += 3) {
			this.vertices[i + 1] = 0.1 * Math.sin(this.vertices[i] * 10);
		}

		this.mesh.geometry.computeVertexNormals();

		// 初期表示
		this.resize();
	}

	distortRibbon(time) {
		for (let i = 0; i < this.vertices.length; i += 3) {
			// this.vertices[i + 1] = 0.1 * Math.sin(this.vertices[i] * 10 + time);
			this.vertices[i + 1] =
				0.1 * this.noise(this.vertices[i] * 3 + time, 0);
		}

		this.mesh.geometry.attributes.position.needsUpdate = true;
	}

	animation() {
		const elapsedTime = this.time.getElapsedTime();

		this.distortRibbon(elapsedTime);
	}

	resize() {
		super.resize();
	}

	render() {
		super.render();
		this.animation();
	}
}
