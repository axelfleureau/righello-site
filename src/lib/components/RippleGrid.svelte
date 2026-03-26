<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  export let enableRainbow: boolean = false;
  export let gridColor: string = '#D6487E';
  export let rippleIntensity: number = 0.05;
  export let gridSize: number = 10.0;
  export let gridThickness: number = 15.0;
  export let fadeDistance: number = 1.5;
  export let vignetteStrength: number = 2.0;
  export let glowIntensity: number = 0.1;
  export let opacity: number = 0.4;
  export let gridRotation: number = 0;
  export let mouseInteraction: boolean = true;
  export let mouseInteractionRadius: number = 1;
  
  let container: HTMLDivElement;
  let renderer: any;
  let animationId: number;
  let uniforms: any = null;
  
  let mousePosition = { x: 0.5, y: 0.5 };
  let targetMouse = { x: 0.5, y: 0.5 };
  let mouseInfluence = 0;
  
  function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
      : [1, 1, 1];
  }
  
  const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

  const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }

    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);
        mouseUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mouseUv);
        
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
        
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
    }

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * smoothB.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }

    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
    
    vec2 vignetteCoords = vUv - 0.5;
    float vignetteDistance = length(vignetteCoords);
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
    vignette = clamp(vignette, 0.0, 1.0);
    
    vec3 t;
    if (enableRainbow) {
        t = vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
        ) + 0.5;
    } else {
        t = gridColor;
    }

    float finalFade = ddd * vignette;
    float alpha = length(color) * finalFade * opacity;
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
}`;
  
  onMount(async () => {
    if (!browser || !container) return;

    try {
      const { Renderer, Program, Triangle, Mesh } = await import('ogl');
      
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true
      });
      
      const gl = renderer.gl;

      if (!gl) {
        console.warn('RippleGrid: WebGL context not available, skipping animation.');
        return;
      }

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      container.appendChild(gl.canvas);
      
      uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        enableRainbow: { value: enableRainbow },
        gridColor: { value: hexToRgb(gridColor) },
        rippleIntensity: { value: rippleIntensity },
        gridSize: { value: gridSize },
        gridThickness: { value: gridThickness },
        fadeDistance: { value: fadeDistance },
        vignetteStrength: { value: vignetteStrength },
        glowIntensity: { value: glowIntensity },
        opacity: { value: opacity },
        gridRotation: { value: gridRotation },
        mouseInteraction: { value: mouseInteraction },
        mousePosition: { value: [0.5, 0.5] },
        mouseInfluence: { value: 0 },
        mouseInteractionRadius: { value: mouseInteractionRadius }
      };
      
      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      
      function resize() {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        uniforms.iResolution.value = [w, h];
      }
      
      function render(t: number) {
        try {
          uniforms.iTime.value = t * 0.001;
          
          const lerpFactor = 0.1;
          mousePosition.x += (targetMouse.x - mousePosition.x) * lerpFactor;
          mousePosition.y += (targetMouse.y - mousePosition.y) * lerpFactor;
          
          const currentInfluence = uniforms.mouseInfluence.value;
          uniforms.mouseInfluence.value += (mouseInfluence - currentInfluence) * 0.05;
          uniforms.mousePosition.value = [mousePosition.x, mousePosition.y];
          
          renderer.render({ scene: mesh });
          animationId = requestAnimationFrame(render);
        } catch (renderErr) {
          // Stop the loop silently — OGL may throw non-Error strings on GPU/WebGL
          // failures (e.g. shader errors, context loss). Cancelling is the right action.
          console.warn('RippleGrid: render loop error, stopping.',
            renderErr instanceof Error ? renderErr.message : String(renderErr));
        }
      }
      
      window.addEventListener('resize', resize);
      resize();
      animationId = requestAnimationFrame(render);
      
      return () => {
        window.removeEventListener('resize', resize);
        if (animationId) cancelAnimationFrame(animationId);
        renderer?.gl?.getExtension('WEBGL_lose_context')?.loseContext();
        if (gl.canvas.parentElement) {
          gl.canvas.parentElement.removeChild(gl.canvas);
        }
      };
    } catch (err) {
      console.warn('RippleGrid: failed to initialize WebGL renderer:', err instanceof Error ? err.message : String(err));
    }
  });
  
  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
  
  function handleMouseMove(e: MouseEvent) {
    if (!mouseInteraction || !container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    targetMouse = { x, y };
  }
  
  function handleMouseEnter() {
    if (!mouseInteraction) return;
    mouseInfluence = 1.0;
  }
  
  function handleMouseLeave() {
    if (!mouseInteraction) return;
    mouseInfluence = 0.0;
  }
  
  $: if (uniforms) {
    uniforms.enableRainbow.value = enableRainbow;
    uniforms.gridColor.value = hexToRgb(gridColor);
    uniforms.rippleIntensity.value = rippleIntensity;
    uniforms.gridSize.value = gridSize;
    uniforms.gridThickness.value = gridThickness;
    uniforms.fadeDistance.value = fadeDistance;
    uniforms.vignetteStrength.value = vignetteStrength;
    uniforms.glowIntensity.value = glowIntensity;
    uniforms.opacity.value = opacity;
    uniforms.gridRotation.value = gridRotation;
    uniforms.mouseInteraction.value = mouseInteraction;
    uniforms.mouseInteractionRadius.value = mouseInteractionRadius;
  }
</script>

<div 
  bind:this={container}
  class="ripple-grid"
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="presentation"
></div>

<style>
  .ripple-grid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: auto;
  }
  
  .ripple-grid :global(canvas) {
    display: block;
  }
</style>
