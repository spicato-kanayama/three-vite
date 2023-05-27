// npm
import * as THREE from 'three';
import { Pane } from 'tweakpane';

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
		this.count = 50;
		const positionArray = new Float32Array(9 * this.count);

		for (let i = 0; i < this.count * 9; i++) {
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

		// GUI操作
		/**
		 * @type {any}
		 */
		const pane = new Pane();

		const panePosition = pane.addFolder({
			title: 'position',
		});
		const paneRotate = pane.addFolder({
			title: 'rotate',
		});

		// this.buffer の x, y, z の値を操作する
		panePosition.addInput(this.buffer.position, 'x', {
			min: -3,
			max: 3,
			step: 0.01,
		});

		// this.buffer の rotate を操作する、名前を rotateX にする
		paneRotate.addInput(this.buffer.rotation, 'x', {
			min: -Math.PI,
			max: Math.PI,
			step: 0.01,
			label: 'rotateX',
		});

		// this.buffer の visible を操作する
		pane.addInput(this.buffer, 'visible');

		// this.buffer の wireframe を操作する
		pane.addInput(this.buffer.material, 'wireframe');

		// this.buffer の カラー を操作する
		pane.addInput(this.material, 'color');
	}
}
