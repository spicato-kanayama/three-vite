// npm
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createNoise2D } from 'simplex-noise';

import BaseCanvas from './BaseCanvas';

// シェーダー
import VERTEX from '../shader/vertex.glsl';
import FRAGMENT from '../shader/fragment.glsl';

// 画像
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import gsap from 'gsap';
import { Pane } from 'tweakpane';

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
		this.camera.position.set(0, 0, 1);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		// 画像
		this.images = [img1, img2, img3];
		this.currentNum = 1;

		this.shaderMetetial = new THREE.ShaderMaterial({
			uniforms: {
				uProgress: { value: 0 },
				uCurrent: { value: this.loader.load(this.images[0]) },
				uNext: { value: this.loader.load(this.images[1]) },
			},
			vertexShader: VERTEX,
			fragmentShader: FRAGMENT,
		});

		this.planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32);
		this.planeMesh = new THREE.Mesh(
			this.planeGeometry,
			this.shaderMetetial
		);
		this.scene.add(this.planeMesh);

		this.time = { value: 0 };

		this.pane = new Pane();

		// 初期表示
		this.resize();
	}

	setPane() {
		const panePosition = this.pane.addFolder({
			title: 'position',
		});
		const paneRotate = this.pane.addFolder({
			title: 'rotate',
		});
	}

	animation() {
		if (this.time.value > 0) return;

		console.log('Now animation');

		gsap.to(this.time, {
			duration: 1,
			value: 1,
			onComplete: () => {
				this.time.value = 0;

				this.shaderMetetial.uniforms.uProgress.value = 0;
				this.shaderMetetial.uniforms.uCurrent.value =
					this.shaderMetetial.uniforms.uNext.value;
				this.currentNum = (this.currentNum + 1) % this.images.length;
				this.shaderMetetial.uniforms.uNext.value = this.loader.load(
					this.images[this.currentNum]
				);
			},
		});
	}

	resize() {
		super.resize();
	}

	render() {
		super.render();

		this.shaderMetetial.uniforms.uProgress.value = this.time.value;
	}
}
