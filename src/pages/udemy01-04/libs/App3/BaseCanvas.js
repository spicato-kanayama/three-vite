// npm
import * as THREE from 'three';

import Config from './Config';

export default class BaseCanvas {
	constructor() {
		this.canvas = document.querySelector('#canvas');

		this.setConfig();

		// シーン
		this.scene = new THREE.Scene();

		// カメラ
		this.camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			0.1,
			10
		);
		this.camera.position.set(0, 0, 3.0);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		// レンダラー
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Config.dpr);
		this.canvas.appendChild(this.renderer.domElement);

		// 現在の画面の幅
		this.prevWidth = Config.width;
		this.prevHeight = Config.height;
	}

	setConfig() {
		const { width, height } = this.canvas.getBoundingClientRect();

		Config.dpr = Math.min(window.devicePixelRatio, 2);
		Config.width = width;
		Config.height = height;
		Config.halfWidth = Config.width / 2;
		Config.halfHeight = Config.height / 2;
		Config.aspectRatio = Config.width / Config.height;
	}

	resize() {
		// リサイズ時に画面幅を更新
		this.prevWidth = Config.width;
		this.prevHeight = Config.height;

		this.camera.aspect = Config.aspectRatio;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(Config.width, Config.height);
	}

	render() {
		// 画面幅が変更された時の処理
		const { width, height } = this.canvas.getBoundingClientRect();
		if (this.prevWidth !== width || this.prevHeight !== height) {
			this.setConfig();
			this.resize();
		}

		this.renderer.render(this.scene, this.camera);
	}
}
