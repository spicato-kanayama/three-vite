// npm
import * as THREE from 'three';

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Config from './Config';

export default class App3 {
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

		// テクスチャ
		this.textureLoader = new THREE.TextureLoader();
		this.texture = this.textureLoader.load('/images/earth.jpg');

		// ジオメトリ
		this.geometry = new THREE.SphereGeometry(0.5, 32, 32);

		// マテリアル
		this.material = new THREE.MeshPhysicalMaterial({
			map: this.texture,
		});

		// メッシュ
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		// メッシュをシーンに追加
		this.scene.add(this.mesh);

		// ライト
		this.light = new THREE.DirectionalLight(0xffffff, 2.0);
		this.light.position.set(1, 1, 1);
		this.scene.add(this.light);

		// ポイントライト
		this.pointLight = new THREE.PointLight(0xffffff, 1.0);
		this.pointLight.position.set(-0.5, -0.5, -0.5);
		this.scene.add(this.pointLight);

		// ポイントライトの位置表示
		this.pointLightHelper = new THREE.PointLightHelper(
			this.pointLight,
			0.1
		);
		this.scene.add(this.pointLightHelper);

		// コントロール
		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

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
		this.renderer.render(this.scene, this.camera);

		// ポイントライトを巡回させる
		const time = Date.now() * 0.001;
		const x = Math.sin(time * 0.5);
		const y = Math.sin(time * 1);
		const z = Math.cos(time * 0.5);
		this.pointLight.position.set(x, y, z);

		// 画面幅が変更された時の処理
		const { width, height } = this.canvas.getBoundingClientRect();
		if (this.prevWidth !== width || this.prevHeight !== height) {
			this.setConfig();
			this.resize();
		}

		requestAnimationFrame(this.render.bind(this));
	}
}
