import App3 from './libs/App3';

import './style.css';
import '/reset.css';

const app3 = new App3();

function tick() {
	app3.render();

	requestAnimationFrame(tick);
}

window.addEventListener('load', () => {
	tick();
});

window.addEventListener('click', () => {
	app3.animation();
});
