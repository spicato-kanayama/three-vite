// npm
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createNoise2D } from 'simplex-noise';

import BaseCanvas from './BaseCanvas';

// 画像
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';

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

		this.shaderMetetial = new THREE.ShaderMaterial({
			uniforms: {
				uProgress: { value: 0 },
				uTexture1: { value: this.loader.load(img1) },
				uTexture2: { value: this.loader.load(img2) },
			},
			vertexShader: `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform float uProgress;
				uniform sampler2D uTexture1;
				uniform sampler2D uTexture2;
				varying vec2 vUv;

				float rand(vec2 n) {
					return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
				}

				float noise(vec2 p){
					vec2 ip = floor(p);
					vec2 u = fract(p);
					u = u*u*(3.0-2.0*u);

					float res = mix(
						mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
						mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
					return res*res;
				}

				void main() {
					float intensity = sin(3.14159265398979*uProgress);
					float distortion = noise(vUv * 10.0) * intensity * 0.1;

					vec2 distortedPosition = vec2(vUv.x + distortion, vUv.y);
					vec4 color1 = texture2D(uTexture1, distortedPosition);
					vec4 color2 = texture2D(uTexture2, distortedPosition);
					gl_FragColor = mix(color1, color2, uProgress);
				}
			`,
		});

		this.planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32);
		this.planeMesh = new THREE.Mesh(
			this.planeGeometry,
			this.shaderMetetial
		);
		this.scene.add(this.planeMesh);

		// 初期表示
		this.resize();
	}

	animation() {
		const elapsedTime = this.time.getElapsedTime();
		// const time = elapsedTime % 1;

		const sin = (Math.sin(elapsedTime) + 1) / 2;

		this.shaderMetetial.uniforms.uProgress.value = sin;
	}

	resize() {
		super.resize();
	}

	render() {
		super.render();
		this.animation();
	}
}
