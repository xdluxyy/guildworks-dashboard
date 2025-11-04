const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const dots = Array.from({ length: 180 }).map(() => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: Math.random() * 2 + 0.5,
  alpha: Math.random() * 0.6 + 0.2,
  speedX: (Math.random() - 0.5) * 0.5,
  speedY: (Math.random() - 0.5) * 0.5,
}));

let mouse = { x: 0, y: 0, active: false };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
  clearTimeout(mouse.timeout);
  mouse.timeout = setTimeout(() => (mouse.active = false), 150);
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const dot of dots) {
    // Chase the mouse gently
    if (mouse.active) {
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        dot.x -= dx * 0.02;
        dot.y -= dy * 0.02;
      }
    }

    dot.x += dot.speedX;
    dot.y += dot.speedY;

    if (dot.x < 0) dot.x = canvas.width;
    if (dot.x > canvas.width) dot.x = 0;
    if (dot.y < 0) dot.y = canvas.height;
    if (dot.y > canvas.height) dot.y = 0;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(88, 101, 242, ${dot.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
