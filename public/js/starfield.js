const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// create many small, glowing stars
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 0.9 + 0.2,
    speedX: (Math.random() - 0.5) * 0.1,
    speedY: (Math.random() - 0.5) * 0.1,
    glow: Math.random() * 0.6 + 0.4,
    twinkleSpeed: Math.random() * 0.03 + 0.01,
    phase: Math.random() * Math.PI * 2
  });
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const s of stars) {
    s.x += s.speedX;
    s.y += s.speedY;
    s.phase += s.twinkleSpeed;

    // wrap around edges
    if (s.x < 0) s.x = canvas.width;
    if (s.x > canvas.width) s.x = 0;
    if (s.y < 0) s.y = canvas.height;
    if (s.y > canvas.height) s.y = 0;

    const twinkle = (Math.sin(s.phase) + 1) / 2; // 0–1 flicker
    const brightness = s.glow * twinkle;

    const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 10);
    gradient.addColorStop(0, `rgba(140,150,255,${brightness})`);
    gradient.addColorStop(0.3, `rgba(120,130,255,${brightness * 0.6})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(s.x, s.y, s.size * 10, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
