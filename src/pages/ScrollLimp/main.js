import Lenis from '@studio-freight/lenis';

// original
import App3 from './libs/App3';
import ImagePlane from './libs/ImagePlane';

import './style.css';
import '/reset.css';

const app3 = new App3({
	mover: document.querySelector('.mover'),
});
function tick() {
	app3.render();

	requestAnimationFrame(tick);
}

window.addEventListener('load', () => {
	const images = [...document.querySelectorAll('img')];

	for (const img of images) {
		const mesh = app3.createImagePlane(img);

		app3.scene.add(mesh);

		const imagePlane = new ImagePlane(mesh, img);
		imagePlane.setParams();

		app3.imagePlanes.push(imagePlane);
	}

	tick();

	const lenis = new Lenis();

	lenis.on('scroll', (e) => {
		for (const image of app3.imagePlanes) {
			image.update(e.velocity);
		}
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
});
