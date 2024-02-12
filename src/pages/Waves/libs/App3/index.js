// npm
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createNoise2D } from 'simplex-noise';

import BaseCanvas from './BaseCanvas';

import matcap from '../../images/ocean.png';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		// ローダー
		this.loader = new THREE.TextureLoader();

		// ヘルパー
		this.helper = new THREE.GridHelper(3, 50);
		// this.scene.add(this.helper);

		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

		// 時間
		this.time = new THREE.Clock();

		// ノイズ
		this.noise = createNoise2D();

		// カメラ
		this.camera.position.set(10, 10, 1);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.geo = new THREE.PlaneGeometry(10, 10, 300, 300);
		this.texture = this.loader.load(matcap);
		this.texture.colorSpace = THREE.SRGBColorSpace;
		this.oceanMaterial = new THREE.MeshMatcapMaterial({
			matcap: this.texture,
			side: THREE.DoubleSide,
		});
		this.geo.rotateX(-Math.PI / 2);

		this.mesh = new THREE.Mesh(this.geo, this.oceanMaterial);
		this.scene.add(this.mesh);

		this.originalPositions = [...this.geo.attributes.position.array];

		// 初期表示
		this.resize();
	}

	updateGeo(time) {
		const positions = this.geo.attributes.position.array;

		for (let i = 0; i < positions.length; i += 3) {
			const x = this.originalPositions[i];
			const y = this.originalPositions[i + 1];
			const z = this.originalPositions[i + 2];

			positions[i] = x;
			positions[i + 1] = y;

			positions[i] -= 0.4 * Math.sin(0.5 * x + time);
			positions[i + 1] += 0.4 * Math.cos(0.5 * x + time);

			positions[i] -= 0.2 * Math.sin(x + 0.5 * time);
			positions[i + 1] += 0.2 * Math.cos(x + 0.5 * time);

			positions[i] -= 0.1 * Math.sin(2 * x + 0.4 * time);
			positions[i + 1] += 0.1 * Math.cos(2 * x + 0.4 * time);

			positions[i] -= 0.05 * Math.sin(4 * x + 0.35 * time);
			positions[i + 1] += 0.05 * Math.cos(4 * x + 0.35 * time);

			positions[i] -= 0.05 * Math.sin(4 * x + 0.3 * time);
			positions[i + 1] += 0.05 * Math.cos(4 * x + 0.3 * time);

			positions[i] -= 0.05 * Math.sin(4 * x + 2 * z + time);
			positions[i + 1] += 0.05 * Math.cos(4 * x + 2 * z + time);

			positions[i] -= 0.01 * Math.sin(16 * x + 0.1 * time);
			positions[i + 1] += 0.01 * Math.cos(16 * x + 0.1 * time);
		}

		this.geo.attributes.position.needsUpdate = true;
		this.geo.computeVertexNormals();
	}

	animation() {
		const elapsedTime = this.time.getElapsedTime();

		this.updateGeo(elapsedTime);
	}

	resize() {
		super.resize();
	}

	render() {
		super.render();
		this.animation();
	}
}
