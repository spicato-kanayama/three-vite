// original
import App3 from './libs/App3';
import Pointer from './libs/App3/Pointer';
new Pointer();

import './style.css';
import '/reset.css';

const app3 = new App3();
function tick() {
	app3.render();

	app3.uniforms.uMouse.value.lerp(app3.mouse, 0.2);

	app3.mouseMove(Pointer.x, Pointer.y);

	requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
	// レンダリング実施
	tick();
});
