const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Create blurple glowing dots
const dots = Array.from({ length: 180 }).map(() => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: Math.random() * 1.8 + 0.4,
  alpha: Math.random() * 0.6 + 0.3,
  speedX: (Math.random() - 0.5) * 0.3,
  speedY: (Math.random() - 0.5) * 0.3,
  glow: 0
}));

let mouse = { x: 0, y: 0, active: false };

// Track mouse movement
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
  clearTimeout(mouse.timeout);
  mouse.timeout = setTimeout(() => (mouse.active = false), 120);
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const dot of dots) {
    // Gentle drift
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    if (dot.x < 0) dot.x = canvas.width;
    if (dot.x > canvas.width) dot.x = 0;
    if (dot.y < 0) dot.y = canvas.height;
    if (dot.y > canvas.height) dot.y = 0;

    // Mouse interaction: pull + glow trail
    if (mouse.active) {
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        // Attract dots slightly to cursor
        dot.x -= dx * 0.015;
        dot.y -= dy * 0.015;
        // Increase glow when near mouse
        dot.glow = Math.min(1, dot.glow + 0.08);
      } else {
        // Fade glow away slowly
        dot.glow = Math.max(0, dot.glow - 0.02);
      }
    } else {
      dot.glow = Math.max(0, dot.glow - 0.02);
    }

    // Draw glowing blurple dot
    const glowSize = dot.size * (1 + dot.glow * 3);
    const glowAlpha = dot.alpha + dot.glow * 0.6;
    const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, glowSize * 4);
    gradient.addColorStop(0, `rgba(114,137,218,${glowAlpha})`);
    gradient.addColorStop(1, "rgba(88,101,242,0)");
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, glowSize * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
