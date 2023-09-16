// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';
import Object from './Object';

import Config from './Config';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		this.loader = new THREE.TextureLoader();

		// カメラ
		this.fov = 60;
		this.fovRad = (this.fov / 2) * (Math.PI / 180);
		this.dist = Math.abs(Config.halfHeight / Math.tan(this.fovRad));
		this.camera.position.set(0, 0, this.dist);

		this.time = 0;
		this.delta = 0;

		this.clock = new THREE.Clock();
		this.clock.start();

		this.objects = [];
		this.$targets = document.querySelectorAll('.item');

		for (let i = 0; i < this.$targets.length; i++) {
			const $target = this.$targets[i];
			this.objects[i] = new Object($target);

			this.scene.add(this.objects[i].plane);
		}

		// 初期表示
		this.resize();
	}

	update() {
		const delta = this.clock.getDelta();
		this.delta = delta;
		this.time += this.delta;

		for (let i = 0; i < this.objects.length; i++) {
			this.objects[i].update(this.delta);
		}
	}

	resize() {
		super.resize();

		let z = (Config.height / Math.tan((52 * Math.PI) / 360)) * 0.5;
		let scale;

		if (this.isCameraFixed) {
			this.camera.position.set(0, 0, this.cameraZ);
			scale = this.cameraZ / z;
		} else {
			this.camera.position.set(0, 0, z);
			scale = 1;
		}

		this.camera.aspect = Config.aspectRatio;
		this.camera.updateProjectionMatrix();

		for (let i = 0; i < this.objects.length; i++) {
			this.objects[i].resize(Config.width, Config.height, scale);
		}
	}

	render() {
		this.update();

		super.render();
	}
}
