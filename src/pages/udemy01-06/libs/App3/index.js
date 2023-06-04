// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';

import { Pane } from 'tweakpane';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		// マテリアル
		this.material = new THREE.MeshNormalMaterial();

		// ジオメトリ
		this.boxGeometry = new THREE.BoxGeometry(1, 1, 1, 10);
		this.torusGeometry = new THREE.TorusGeometry(1, 0.2, 16, 100);

		// メッシュ
		this.box = new THREE.Mesh(this.boxGeometry, this.material);
		this.torus = new THREE.Mesh(this.torusGeometry, this.material);

		// シーンに追加
		this.scene.add(this.box, this.torus);

		// ポジション
		this.box.rotation.set(1, 1, 0);
		this.box.position.set(0, 0, -2);
		this.torus.position.set(0, 0, 10);

		this.animationList = [];

		// 01
		this.animationList.push({
			start: 0,
			end: 40,
			func: () => {
				this.camera.lookAt(this.box.position);
				this.camera.position.set(0, 0, 3);

				this.box.position.z = this.lerp(
					-2,
					1,
					this.scalePercent(0, 40)
				);
				this.torus.position.z = this.lerp(
					10,
					0,
					this.scalePercent(0, 40)
				);
			},
		});

		this.getScroll();
	}

	scalePercent(start, end) {
		return (this.scrollRatio - start) / (end - start);
	}

	lerp(start, end, ratio) {
		return start + (end - start) * ratio;
	}

	debug() {
		// UIデバッグ
		/**
		 * @type {any}
		 */
		this.pane = new Pane();
	}

	getScroll() {
		document.addEventListener('scroll', () => {
			this.scrollRatio =
				(document.body.scrollTop /
					(document.body.scrollHeight - document.body.clientHeight)) *
				100;

			this.scrollRatio = Math.min(Math.max(this.scrollRatio, 0), 100);
		});
	}

	animation() {
		this.animationList.forEach((item) => {
			if (
				item.start <= this.scrollRatio &&
				this.scrollRatio <= item.end
			) {
				item.func();
			}
		});
	}
}
