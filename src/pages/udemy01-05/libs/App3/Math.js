// ラジアンを計算する関数
export function radian(degree) {
	return (degree * Math.PI) / 180;
}

// 単位ベクトルを計算する関数(2次元)
export function unitVector2(x, y) {
	const length = Math.sqrt(x * x + y * y);
	return {
		x: x / length,
		y: y / length,
	};
}

// 単位ベクトルを計算する関数(3次元)
export function unitVector3(x, y, z) {
	const length = Math.sqrt(x * x + y * y + z * z);
	return {
		x: x / length,
		y: y / length,
		z: z / length,
	};
}
