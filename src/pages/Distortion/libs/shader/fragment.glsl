uniform float uProgress;
uniform sampler2D uCurrent;
uniform sampler2D uNext;
varying vec2 vUv;

float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);

	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

void main() {
	float intensity = sin(3.14159265398979*uProgress);
	float distortion = noise(vUv * 20.0) * intensity * 0.05;

	vec2 distortedPosition = vec2(vUv.x + distortion, vUv.y + distortion * 0.5);

	vec4 _uCurrent = texture2D(uCurrent, distortedPosition);
	vec4 _uNext = texture2D(uNext, distortedPosition);

	gl_FragColor = mix(_uCurrent, _uNext, uProgress);
}