// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';

import Config from './Config';

// シェーダー
import VERTEX from '../shader/vertex.glsl';
import FRAGMENT from '../shader/fragment.glsl';

export default class App3 extends BaseCanvas {
	constructor(options) {
		super();

		this.mover = options.mover;

		this.loader = new THREE.TextureLoader();

		this.imagePlanes = [];

		// カメラ
		this.fov = 60;
		this.fovRad = (this.fov / 2) * (Math.PI / 180);
		this.dist = Math.abs(Config.halfHeight / Math.tan(this.fovRad));
		this.camera.position.set(0, 0, this.dist);

		// 初期表示
		this.resize();
	}

	createImagePlane(img) {
		const texture = this.loader.load(img.src);

		const uniforms = {
			uTexture: { value: texture },
			uImageAspect: { value: img.naturalWidth / img.naturalHeight },
			uPlaneAspect: { value: img.clientWidth / img.clientHeight },
			uTime: { value: 0 },
		};

		const geometry = new THREE.PlaneGeometry(1, 1, 100, 100); // 後から画像のサイズにscaleするので1にしておく
		const material = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: VERTEX,
			fragmentShader: FRAGMENT,
		});

		const mesh = new THREE.Mesh(geometry, material);

		return mesh;
	}

	resize() {
		super.resize();

		this.dist = Math.abs(Config.halfHeight / Math.tan(this.fovRad));
		this.camera.position.set(0, 0, this.dist);

		document.body.style.height = `${this.mover.clientHeight}px`;
	}

	render() {
		for (const image of this.imagePlanes) {
			image.setParams();
		}

		super.render();
	}
}
