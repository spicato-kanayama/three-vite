// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';

import Pointer from './Pointer';
import Config from './Config';
import { Pane } from 'tweakpane';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		// マテリアル
		this.material = new THREE.MeshPhysicalMaterial();
		this.material.color.set('#3c94d7');
		this.material.metalness = 0.85;
		this.material.roughness = 0.4;
		this.material.flatShading = true;

		// ジオメトリ
		this.torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 32, 64);
		this.sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
		this.boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
		this.IcosahedronGeometry = new THREE.IcosahedronGeometry(0.5, 0);

		// メッシュ
		this.torus = new THREE.Mesh(this.torusGeometry, this.material);
		this.sphere = new THREE.Mesh(this.sphereGeometry, this.material);
		this.box = new THREE.Mesh(this.boxGeometry, this.material);
		this.Icosahedron = new THREE.Mesh(
			this.IcosahedronGeometry,
			this.material
		);

		this.group = new THREE.Group();
		this.group.add(this.torus, this.sphere, this.box, this.Icosahedron);

		// シーンに追加
		this.scene.add(this.group);

		// ポジション
		const distance = 2;
		this.torus.position.set(0, 0, -distance);
		this.sphere.position.set(distance, 0, 0);
		this.box.position.set(0, 0, distance);
		this.Icosahedron.position.set(-distance, 0, 0);

		this.group.position.set(2, 0, 0);

		// ライト
		this.light = new THREE.DirectionalLight(0xffffff, 4);
		this.light.position.set(0.5, 1, 0);
		this.scene.add(this.light);

		// 時間
		this.time = new THREE.Clock();

		// デバッグ
		this.debug();

		this.wheel();
	}

	debug() {
		// UIデバッグ
		/**
		 * @type {any}
		 */
		this.pane = new Pane();

		this.pane.addInput(this.material, 'color').on('change', (e) => {
			this.material.color.set(e.value);
		});

		this.pane
			.addInput(this.material, 'metalness', {
				min: 0,
				max: 1,
			})
			.on('change', (e) => {
				this.material.metalness = e.value;
			});

		this.pane
			.addInput(this.material, 'roughness', {
				min: 0,
				max: 1,
			})
			.on('change', (e) => {
				this.material.roughness = e.value;
			});

		this.pane.addInput(this.material, 'flatShading');

		this.pane.addInput(this.material, 'wireframe');
	}

	wheel() {
		this.rotation = 0;
		this.speed = 0;

		window.addEventListener('wheel', (e) => {
			this.speed = e.deltaY * 0.0002;
		});
	}

	animation() {
		const elapsedTime = this.time.getElapsedTime();

		// 回転させる
		for (let i = 0; i < this.group.children.length; i++) {
			const object = this.group.children[i];

			object.rotation.y = elapsedTime;
			object.rotation.x = elapsedTime;
			object.rotation.z = elapsedTime;
		}

		this.rotation += this.speed;
		this.speed *= 0.9;

		this.group.rotation.y = this.rotation;

		const px = (Pointer.x / Config.width) * 2.0 - 1.0;
		const py = (Pointer.y / Config.height) * 2.0 - 1.0;

		// マウスの位置によってカメラの位置を変える
		this.camera.position.x += (px - this.camera.position.x) * 0.1;
		this.camera.position.y += (py - this.camera.position.y) * 0.1;
	}
}
