// npm
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import BaseCanvas from './BaseCanvas';

// import Pointer from './Pointer';
// import Config from './Config';
// import { Pane } from 'tweakpane';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		this.earthTexture;

		// ジオメトリ
		this.sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
		this.coneGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);

		// マテリアル
		this.sphereMaterial = new THREE.MeshPhongMaterial();
		this.coneMaterial = new THREE.MeshPhongMaterial({
			color: 0xffcccc,
		});

		// メッシュ
		this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
		this.coneZ = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
		this.coneY = new THREE.Mesh(this.coneGeometry, this.coneMaterial);

		// 調整
		this.coneZ.scale.setScalar(0.5);
		this.coneY.scale.setScalar(0.5);

		// ポジション
		this.coneDistance = 1.0;
		this.coneZ.position.set(this.coneDistance, 0.0, 0.0);
		this.coneY.position.set(0.0, 0.0, this.coneDistance);

		// coneY を右に向ける
		this.coneY.rotateZ(-Math.PI / 2);

		// シーンに追加
		this.scene.add(this.sphere);
		this.scene.add(this.coneZ);
		this.scene.add(this.coneY);

		// ライト
		this.light = new THREE.DirectionalLight(0xffffff, 4.0);
		this.light.position.set(0.5, 1, 0);
		this.scene.add(this.light);
		this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(this.ambientLight);

		// コントローラー
		this.orbitControls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

		// ヘルパー
		this.helper = new THREE.AxesHelper(5.0);
		this.scene.add(this.helper);

		// コーンの方向（初期は上を向いているため）
		this.coneDirection = new THREE.Vector3(0.0, 1.0, 0.0);
		this.coneYDirection = new THREE.Vector3(1.0, 0.0, 0.0);

		// 時間
		this.clock = new THREE.Clock();
	}

	load() {
		return new Promise((resolve) => {
			const loader = new THREE.TextureLoader();

			loader.load('./textures/earth.jpg', (texture) => {
				this.earthTexture = texture;

				this.sphereMaterial.map = this.earthTexture;
				resolve();
			});
		});
	}

	animation() {
		this.orbitControls.update();
	}

	updateConeZ() {
		// 更新前情報
		const prevDirection = this.coneDirection.clone();
		const prevPosition = this.coneZ.position.clone();

		// 更新前のポジションに進行方向ベクトルを加算
		const position = prevPosition.add(
			this.coneDirection.multiplyScalar(0.02)
		);
		position.normalize();

		// 更新後のポジションに距離(地球からの距離)を掛ける
		position.multiplyScalar(this.coneDistance);

		// (終点 - 始点)で進行方向ベクトルを算出
		this.coneDirection = new THREE.Vector3().subVectors(
			position,
			this.coneZ.position
		);
		this.coneDirection.normalize();

		// コーンの位置を更新
		this.coneZ.position.set(position.x, position.y, position.z);

		// 回転軸を外積で算出
		const normal = new THREE.Vector3().crossVectors(
			prevDirection,
			this.coneDirection
		);
		normal.normalize();

		// 前後のベクトルから内積でコサインを算出
		const cos = prevDirection.dot(this.coneDirection);

		// コサインからラジアンを算出
		const rad = Math.acos(cos);

		const qtn = new THREE.Quaternion().setFromAxisAngle(normal, rad);
		this.coneZ.quaternion.premultiply(qtn);
	}

	updateConeY() {
		// 更新前情報
		const prevDirection = this.coneYDirection.clone();
		const prevPosition = this.coneY.position.clone();

		// 更新前のポジションに進行方向ベクトルを加算
		const position = prevPosition.add(
			this.coneYDirection.multiplyScalar(0.02)
		);
		position.normalize();

		// 更新後のポジションに距離(地球からの距離)を掛ける
		position.multiplyScalar(this.coneDistance);

		// (終点 - 始点)で進行方向ベクトルを算出
		this.coneYDirection = new THREE.Vector3().subVectors(
			position,
			this.coneY.position
		);
		this.coneYDirection.normalize();

		// コーンの位置を更新
		this.coneY.position.set(position.x, position.y, position.z);

		// 回転軸を外積で算出
		const normal = new THREE.Vector3().crossVectors(
			prevDirection,
			this.coneYDirection
		);
		normal.normalize();

		// 前後のベクトルから内積でコサインを算出
		const cos = prevDirection.dot(this.coneYDirection);

		// コサインからラジアンを算出
		const rad = Math.acos(cos);
		const qtn = new THREE.Quaternion().setFromAxisAngle(normal, rad);
		this.coneY.quaternion.premultiply(qtn);
	}
}
