// original
import App3 from './libs/App3';

import './style.css';
import '/reset.css';

const app3 = new App3();
function tick() {
	app3.render();
	app3.animation();

	requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
	// レンダリング実施
	tick();
});
