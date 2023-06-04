// npm
import * as THREE from 'three';

import BaseCanvas from './BaseCanvas';
import Config from './Config';

// import { Pane } from 'tweakpane';

export default class App3 extends BaseCanvas {
	constructor() {
		super();

		this.mouse = new THREE.Vector2(0.5, 0.5);

		this.uniforms = {
			uAspect: {
				value: Config.aspectRatio,
			},
			uMouse: {
				value: new THREE.Vector2(0.5, 0.5),
			},
		};

		this.vertexShader = `
			varying vec2 vUv;

			void main() {
			vUv = uv;

			gl_Position = vec4( position, 1.0 );
			}
		`;

		this.fragmentShader = `
			varying vec2 vUv;

			uniform float uAspect;
			uniform vec2  uMouse;

			void main() {
				vec2 uv = vec2( vUv.x * uAspect, vUv.y );
				vec2 center = vec2( uMouse.x * uAspect, uMouse.y );


				float lightness = 0.01 / length( uv - center );

				vec4 color = vec4( vec3( lightness ), 1.0 );
				color *= vec4( 0.2, 1.0, 0.5, 1.0 );

				gl_FragColor = color;
			}
		`;

		this.planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);

		this.shaderMaterial = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: this.vertexShader,
			fragmentShader: this.fragmentShader,
			wireframe: false,
		});

		this.plane = new THREE.Mesh(this.planeGeometry, this.shaderMaterial);

		this.scene.add(this.plane);
	}

	mouseMove(x, y) {
		this.mouse.x = x / Config.width;
		this.mouse.y = 1.0 - y / Config.height;
	}
}
