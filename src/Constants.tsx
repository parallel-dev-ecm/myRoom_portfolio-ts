export const sinCityShaders = {
  vertexShader: `
  varying vec3 vNormal;
  void main() {
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`,

  fragmentShader: `
  varying vec3 vNormal;
  void main() {
      float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
      intensity = step(0.5, intensity);
      gl_FragColor = vec4(vec3(intensity), 1.0);
  }
`,
};
