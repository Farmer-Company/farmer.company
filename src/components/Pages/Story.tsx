import React, { useEffect, useRef, } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    title: "The Genesis",
    content: "It began with a simple idea: that agriculture could be more connected, more intelligent, and more resilient. We saw a fractured system and envisioned a unified future.",
    color1: "#2E8B57", // SeaGreen
    color2: "#006400", // DarkGreen
  },
  {
    title: "The Awakening",
    content: "We introduced AI not to replace the farmer, but to empower them. Data became the new soil, rich with insights waiting to be unearthed.",
    color1: "#4682B4", // SteelBlue
    color2: "#191970", // MidnightBlue
  },
  {
    title: "The Symbiosis",
    content: "Technology and nature working in harmony. Precision agriculture reduced waste and increased yield, creating a sustainable ecosystem for all.",
    color1: "#DAA520", // GoldenRod
    color2: "#8B4513", // SaddleBrown
  },
  {
    title: "The Future",
    content: "Today, we are building the Agricultural Operating System. A platform that doesn't just manage farms, but predicts, adapts, and thrives.",
    color1: "#800080", // Purple
    color2: "#4B0082", // Indigo
  }
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    
    // Create a fluid-like effect using time and mouse
    vec2 pos = vec2(st * 3.0);
    
    // Add mouse influence
    float mouseDist = distance(st, uMouse);
    float mouseEffect = smoothstep(0.5, 0.0, mouseDist) * 0.5;
    
    float n = noise(pos + uTime * 0.2 + mouseEffect);
    
    // Mix colors based on position, noise, and time
    float mixValue = sin(st.x * 3.0 + uTime * 0.5 + n) * 0.5 + 0.5;
    mixValue += cos(st.y * 2.0 - uTime * 0.3) * 0.5;
    mixValue = clamp(mixValue, 0.0, 1.0);

    vec3 finalColor = mix(uColor1, uColor2, mixValue);
    
    // Add a slight painted texture effect
    finalColor += noise(st * 100.0) * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function StoryPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // 2. Initialize Three.js Background
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color(chapters[0].color1) },
      uColor2: { value: new THREE.Color(chapters[0].color2) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.x = e.clientX / window.innerWidth;
      uniforms.uMouse.value.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 3. GSAP ScrollTrigger Animations
    const sections = gsap.utils.toArray('.chapter-section') as HTMLElement[];
    
    const transitionColors = (color1: string, color2: string) => {
      if (!materialRef.current) return;
      gsap.to(materialRef.current.uniforms.uColor1.value, {
        r: new THREE.Color(color1).r,
        g: new THREE.Color(color1).g,
        b: new THREE.Color(color1).b,
        duration: 1.5,
        ease: "power2.inOut"
      });
      gsap.to(materialRef.current.uniforms.uColor2.value, {
        r: new THREE.Color(color2).r,
        g: new THREE.Color(color2).g,
        b: new THREE.Color(color2).b,
        duration: 1.5,
        ease: "power2.inOut"
      });
    };

    sections.forEach((section, index) => {
      const textElement = section.querySelector('.chapter-content');
      
      // Animate text content
      gsap.fromTo(textElement, 
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Animate color transitions in Three.js
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => transitionColors(chapters[index].color1, chapters[index].color2),
        onEnterBack: () => transitionColors(chapters[index].color1, chapters[index].color2),
      });
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white" style={{ minHeight: '100vh' }}>
      {/* Three.js Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      />

      {/* Chapters Content */}
      <div className="relative z-10">
        {chapters.map((chapter, index) => (
          <section 
            key={index} 
            className="chapter-section min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-24"
          >
            <div className="chapter-content max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/20 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
              <span className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-white/70 mb-4 block">
                Chapter {index + 1}
              </span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 font-sans tracking-tight">
                {chapter.title}
              </h2>
              <p className="text-xl md:text-3xl leading-relaxed text-white/90 font-light">
                {chapter.content}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
