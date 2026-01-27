<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  export let logoSrc: string = '/logo-white.png';
  export let title: string = 'Righello';
  export let subtitle: string = 'Growth Agency';
  
  let container: HTMLDivElement;
  let animationId: number | null = null;
  let destroyed = false;
  let initialized = false;
  let showFallback = true;
  
  let scene: any = null;
  let camera: any = null;
  let renderer: any = null;
  let world: any = null;
  let rope: { bodies: any[]; joints: any[] } = { bodies: [], joints: [] };
  let cardBody: any = null;
  let cardMesh: any = null;
  let ropeMesh: any = null;
  
  let THREE: any = null;
  let MeshLineGeometry: any = null;
  let MeshLineMaterial: any = null;
  
  let isDragging = false;
  let mousePos = { x: 0, y: 0 };
  
  const ROPE_SEGMENTS = 12;
  const ROPE_LENGTH = 2.5;
  const SEGMENT_LENGTH = ROPE_LENGTH / ROPE_SEGMENTS;
  
  async function initialize() {
    if (!browser || !container || destroyed) return;
    
    try {
      THREE = await import('three');
      const meshline = await import('meshline');
      MeshLineGeometry = meshline.MeshLineGeometry;
      MeshLineMaterial = meshline.MeshLineMaterial;
      
      const RAPIER = await import('@dimforge/rapier3d-compat');
      await RAPIER.init();
      
      if (destroyed) return;
      
      world = new RAPIER.World({ x: 0.0, y: -9.81 * 2, z: 0.0 });
      
      const anchorBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 3, 0);
      const anchorBody = world.createRigidBody(anchorBodyDesc);
      rope.bodies = [anchorBody];
      
      for (let i = 0; i < ROPE_SEGMENTS; i++) {
        const y = 3 - (i + 1) * SEGMENT_LENGTH;
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(0, y, 0)
          .setLinearDamping(0.8)
          .setAngularDamping(0.8);
        const body = world.createRigidBody(bodyDesc);
        
        const colliderDesc = RAPIER.ColliderDesc.ball(0.05).setMass(0.1);
        world.createCollider(colliderDesc, body);
        
        rope.bodies.push(body);
        
        const jointData = RAPIER.JointData.spherical(
          { x: 0, y: -SEGMENT_LENGTH / 2, z: 0 },
          { x: 0, y: SEGMENT_LENGTH / 2, z: 0 }
        );
        const joint = world.createImpulseJoint(jointData, rope.bodies[i], body, true);
        rope.joints.push(joint);
      }
      
      const cardY = 3 - ROPE_LENGTH - 0.8;
      const cardBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(0, cardY, 0)
        .setLinearDamping(0.6)
        .setAngularDamping(0.9);
      cardBody = world.createRigidBody(cardBodyDesc);
      
      const cardColliderDesc = RAPIER.ColliderDesc.cuboid(0.6, 0.8, 0.05).setMass(1.5);
      world.createCollider(cardColliderDesc, cardBody);
      
      const cardJointData = RAPIER.JointData.spherical(
        { x: 0, y: -SEGMENT_LENGTH / 2, z: 0 },
        { x: 0, y: 0.85, z: 0 }
      );
      world.createImpulseJoint(cardJointData, rope.bodies[ROPE_SEGMENTS], cardBody, true);
      
      if (destroyed) return;
      
      scene = new THREE.Scene();
      
      const aspect = container.clientWidth / container.clientHeight;
      camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);
      
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7);
      scene.add(directionalLight);
      
      const pointLight = new THREE.PointLight(0xD6487E, 0.5);
      pointLight.position.set(-3, 2, 3);
      scene.add(pointLight);
      
      const ropePoints: any[] = [];
      for (let i = 0; i <= ROPE_SEGMENTS; i++) {
        ropePoints.push(new THREE.Vector3(0, 3 - i * SEGMENT_LENGTH, 0));
      }
      
      const ropeGeometry = new MeshLineGeometry();
      ropeGeometry.setPoints(ropePoints);
      
      const ropeMaterial = new MeshLineMaterial({
        color: new THREE.Color(0x333333),
        lineWidth: 0.08,
        resolution: new THREE.Vector2(container.clientWidth, container.clientHeight),
      });
      
      ropeMesh = new THREE.Mesh(ropeGeometry, ropeMaterial);
      scene.add(ropeMesh);
      
      const cardGroup = new THREE.Group();
      
      const cardGeometry = new THREE.BoxGeometry(1.2, 1.6, 0.08);
      const cardMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        metalness: 0.1,
        roughness: 0.4,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
      });
      const cardBase = new THREE.Mesh(cardGeometry, cardMaterial);
      cardGroup.add(cardBase);
      
      const borderGeometry = new THREE.BoxGeometry(1.22, 1.62, 0.02);
      const borderMaterial = new THREE.MeshBasicMaterial({
        color: 0xD6487E,
        transparent: true,
        opacity: 0.3,
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.position.z = 0.04;
      cardGroup.add(border);
      
      const holeGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
      const holeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const hole = new THREE.Mesh(holeGeometry, holeMaterial);
      hole.rotation.x = Math.PI / 2;
      hole.position.set(0, 0.65, 0);
      cardGroup.add(hole);
      
      cardMesh = cardGroup;
      cardMesh.position.set(0, 3 - ROPE_LENGTH - 0.8, 0);
      scene.add(cardMesh);
      
      const clipGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.2, 8);
      const clipMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.8,
        roughness: 0.2,
      });
      const clip = new THREE.Mesh(clipGeometry, clipMaterial);
      clip.position.set(0, 3, 0);
      scene.add(clip);
      
      initialized = true;
      showFallback = false;
      
      animationId = requestAnimationFrame(animate);
      window.addEventListener('resize', handleResize);
      
    } catch (error) {
      console.error('Failed to initialize LanyardPhysics:', error);
      showFallback = true;
    }
  }
  
  function updateRopeVisual() {
    if (!ropeMesh || !rope.bodies.length || !THREE || !MeshLineGeometry) return;
    
    const points: any[] = [];
    for (let i = 0; i <= ROPE_SEGMENTS; i++) {
      const body = rope.bodies[i];
      if (!body) continue;
      const pos = body.translation();
      points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    }
    
    if (points.length === 0) return;
    
    const newGeometry = new MeshLineGeometry();
    newGeometry.setPoints(points);
    
    if (ropeMesh.geometry) {
      ropeMesh.geometry.dispose();
    }
    ropeMesh.geometry = newGeometry;
  }
  
  function updateCardVisual() {
    if (!cardMesh || !cardBody) return;
    
    const pos = cardBody.translation();
    const rot = cardBody.rotation();
    
    cardMesh.position.set(pos.x, pos.y, pos.z);
    cardMesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
  }
  
  function screenToWorld(x: number, y: number): { x: number; y: number; z: number } {
    if (!container || !camera) return { x: 0, y: 0, z: 0 };
    
    const rect = container.getBoundingClientRect();
    const ndcX = ((x - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((y - rect.top) / rect.height) * 2 + 1;
    
    return { x: ndcX * 4, y: ndcY * 3, z: 0 };
  }
  
  function handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    isDragging = true;
    mousePos = screenToWorld(e.clientX, e.clientY);
    
    if (container) {
      container.setPointerCapture(e.pointerId);
      container.style.cursor = 'grabbing';
    }
  }
  
  function handlePointerMove(e: PointerEvent) {
    if (!isDragging) return;
    mousePos = screenToWorld(e.clientX, e.clientY);
  }
  
  function handlePointerUp(e: PointerEvent) {
    isDragging = false;
    if (container) {
      container.releasePointerCapture(e.pointerId);
      container.style.cursor = 'grab';
    }
  }
  
  function applyMouseForce() {
    if (!isDragging || !cardBody) return;
    
    const cardPos = cardBody.translation();
    const forceX = (mousePos.x - cardPos.x) * 15;
    const forceY = (mousePos.y - cardPos.y) * 15;
    
    cardBody.applyImpulse({ x: forceX, y: forceY, z: 0 }, true);
  }
  
  function animate() {
    if (destroyed || !world || !renderer || !scene || !camera) return;
    
    world.step();
    applyMouseForce();
    updateRopeVisual();
    updateCardVisual();
    renderer.render(scene, camera);
    
    animationId = requestAnimationFrame(animate);
  }
  
  function handleResize() {
    if (!container || !camera || !renderer) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  function cleanup() {
    destroyed = true;
    
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    if (browser) {
      window.removeEventListener('resize', handleResize);
    }
    
    if (ropeMesh) {
      if (ropeMesh.geometry) ropeMesh.geometry.dispose();
      if (ropeMesh.material) ropeMesh.material.dispose();
    }
    
    if (cardMesh) {
      cardMesh.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
    
    if (renderer) {
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    }
    
    if (world) {
      try {
        world.free();
      } catch (e) {
        console.warn('Error freeing physics world:', e);
      }
      world = null;
    }
    
    scene = null;
    camera = null;
    renderer = null;
    cardBody = null;
    cardMesh = null;
    ropeMesh = null;
    rope = { bodies: [], joints: [] };
  }
  
  onMount(() => {
    if (browser) {
      initialize();
    }
    return cleanup;
  });
  
  onDestroy(cleanup);
</script>

<div class="lanyard-physics-wrapper">
  <div 
    bind:this={container}
    class="lanyard-physics-container"
    on:pointerdown={handlePointerDown}
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:pointercancel={handlePointerUp}
    on:pointerleave={handlePointerUp}
    role="img"
    aria-label="Badge interattivo 3D con simulazione fisica"
    style="touch-action: none;"
  >
    {#if showFallback}
      <div class="card-overlay">
        <div class="card-content">
          <div class="card-hole"></div>
          <div class="logo-container">
            <img src={logoSrc} alt={title} class="logo-image" />
          </div>
          <div class="card-text">
            <h3 class="card-title">{title}</h3>
            <p class="card-subtitle">{subtitle}</p>
          </div>
          <div class="card-footer">
            <div class="stars">
              {#each Array(5) as _}
                <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <p class="drag-hint">{showFallback ? '' : 'Trascina il badge per interagire'}</p>
</div>

<style>
  .lanyard-physics-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .lanyard-physics-container {
    width: 100%;
    height: 500px;
    position: relative;
    cursor: grab;
    user-select: none;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .lanyard-physics-container {
      height: 600px;
    }
  }
  
  .card-overlay {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -30%);
    width: 200px;
    height: 280px;
    pointer-events: none;
  }
  
  @media (min-width: 768px) {
    .card-overlay {
      width: 240px;
      height: 320px;
    }
  }
  
  .card-content {
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #151515 100%);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px 30px;
    gap: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  }
  
  .card-hole {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 10px;
    background: #000;
    border-radius: 5px;
    border: 2px solid #333;
  }
  
  .logo-container {
    width: 140px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (min-width: 768px) {
    .logo-container {
      width: 180px;
    }
  }
  
  .logo-image {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 12px rgba(214, 72, 126, 0.3));
  }
  
  .card-text {
    text-align: center;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
    letter-spacing: 0.05em;
  }
  
  @media (min-width: 768px) {
    .card-title {
      font-size: 1.75rem;
    }
  }
  
  .card-subtitle {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
  
  .card-footer {
    margin-top: auto;
  }
  
  .stars {
    display: flex;
    gap: 3px;
  }
  
  .star {
    width: 16px;
    height: 16px;
    color: #facc15;
  }
  
  .drag-hint {
    margin-top: 12px;
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-align: center;
    opacity: 0.7;
    min-height: 1.25rem;
  }
  
  :global([data-theme="light"]) .card-content {
    background: linear-gradient(145deg, #f0f0f0 0%, #e0e0e0 50%, #f5f5f5 100%);
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  }
  
  :global([data-theme="light"]) .card-title {
    color: #1a1a1a;
  }
  
  :global([data-theme="light"]) .card-subtitle {
    color: rgba(0, 0, 0, 0.5);
  }
  
  :global([data-theme="light"]) .card-hole {
    background: #ccc;
    border-color: #999;
  }
</style>
