import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

export default function fullScreen() {
	let sections = document.querySelectorAll('.image-item'),
		list = document.querySelector('.image-list'),
		currentIndex = -1,
		wrap = gsap.utils.wrap(0, sections.length),
		prev = 0,
		animating;

	function gotoSection(index, direction) {
		index = wrap(index); // make sure it's valid
		animating = true;
		let fromTop = direction === -1,
			dFactor = fromTop ? -1 : 1,
			tl = gsap.timeline({
				defaults: { duration: 1.25, ease: 'power1.inOut' },
				onComplete: () => (animating = false),
			});
		if (currentIndex >= 0) {
			// The first time this function runs, current is -1
			gsap.set(sections[currentIndex], { zIndex: 0 });
		}

		gsap.set(sections[index], { zIndex: 1 });

		tl.to(list, {
			yPercent: () => {
				const result = -100 * dFactor + prev;

				prev = result;

				return result;
			},
		});

		currentIndex = index;
	}

	Observer.create({
		type: 'wheel,touch,pointer',
		wheelSpeed: -1,
		onDown: () => !animating && gotoSection(currentIndex - 1, -1),
		onUp: () => !animating && gotoSection(currentIndex + 1, 1),
		tolerance: 10,
		preventDefault: true,
	});

	gotoSection(0, 1);

	// original: https://codepen.io/BrianCross/pen/PoWapLP
	// horizontal version: https://codepen.io/GreenSock/pen/xxWdeMK
}
