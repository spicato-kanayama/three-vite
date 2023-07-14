import Config from './App3/Config';

export default class ImagePlane {
	constructor(mesh, image) {
		this.image = image;
		this.mesh = mesh;
	}

	setParams() {
		const rect = this.image.getBoundingClientRect();

		// 画像のサイズを取得
		this.mesh.scale.x = rect.width;
		this.mesh.scale.y = rect.height;

		// window座標をWebGL座標に変換
		const x = rect.left - Config.halfWidth + rect.width / 2;
		const y = -rect.top + Config.halfHeight - rect.height / 2;
		this.mesh.position.set(x, y, this.mesh.position.z);
	}

	update(offset) {
		this.setParams();

		// シェーダーに時間を渡す
		this.mesh.material.uniforms.uTime.value = offset;
	}
}
