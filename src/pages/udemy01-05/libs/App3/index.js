// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';

// オービットコントロール
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

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
	}

	animation() {
		const elapsedTime = this.time.getElapsedTime();
	}
}
