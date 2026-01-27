<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';
  import { departments } from '$lib/data/projects';
  
  export let isAtTop = true;
  export let isCompact = false;
  
  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let barMesh: THREE.Mesh;
  let animationId: number;
  let mouseX = 0;
  let mouseY = 0;
  
  // Navbar dimensions
  const BAR_WIDTH = 12;
  const BAR_HEIGHT = 0.8;
  const BAR_DEPTH = 0.3;
  const BAR_RADIUS = 0.4;
  
  function createRoundedBarGeometry(width: number, height: number, depth: number, radius: number): THREE.BufferGeometry {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    const r = Math.min(radius, height / 2, width / 2);
    
    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    
    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 8
    };
    
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    return geometry;
  }
  
  function init() {
    if (!container || !canvas) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 100);
    camera.position.z = 20;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    // Create glass material with transmission
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 1,
      thickness: 2,
      ior: 1.15,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
    
    // Create rounded bar geometry
    const barGeometry = createRoundedBarGeometry(BAR_WIDTH, BAR_HEIGHT, BAR_DEPTH, BAR_RADIUS);
    barMesh = new THREE.Mesh(barGeometry, glassMaterial);
    barMesh.rotation.x = Math.PI / 2;
    scene.add(barMesh);
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Directional lights for glass reflections
    const light1 = new THREE.DirectionalLight(0xD6487E, 0.8);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0x06B6D4, 0.6);
    light2.position.set(-5, -5, 5);
    scene.add(light2);
    
    // Point light for highlight
    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);
    
    // Environment map for reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    
    animate();
  }
  
  function animate() {
    animationId = requestAnimationFrame(animate);
    
    if (barMesh) {
      // Subtle mouse follow
      const targetRotY = mouseX * 0.1;
      const targetRotX = Math.PI / 2 + mouseY * 0.05;
      
      barMesh.rotation.y += (targetRotY - barMesh.rotation.y) * 0.08;
      barMesh.rotation.x += (targetRotX - barMesh.rotation.x) * 0.08;
      
      // Scale based on compact state
      const targetScale = isCompact ? 0.85 : 1;
      barMesh.scale.x += (targetScale - barMesh.scale.x) * 0.1;
      barMesh.scale.y += (targetScale - barMesh.scale.y) * 0.1;
    }
    
    renderer.render(scene, camera);
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }
  
  function handleResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  onMount(() => {
    init();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
  
  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (renderer) {
      renderer.dispose();
    }
  });
</script>

<div 
  bind:this={container}
  class="liquid-glass-container"
  class:at-top={isAtTop}
>
  <canvas bind:this={canvas} class="liquid-glass-canvas"></canvas>
</div>

<style>
  .liquid-glass-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  
  .liquid-glass-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .at-top {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .liquid-glass-container:not(.at-top) {
    opacity: 1;
  }
</style>
