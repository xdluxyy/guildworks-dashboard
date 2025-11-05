// ===== Navbar Scroll Effect =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Smooth Scroll for "Home" Button =====
document.getElementById("homeBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
});

// ===== Rotating Text Setup =====
const titleEl = document.querySelector(".rotating-title");
const descEl = document.querySelector(".rotating-desc");
const uptimeEl = document.querySelector("#uptime");

const messages = [
  {
    title: 'The <span class="accent">cape</span> solution for your creativity.',
    desc: 'Custom cape designs that make your brand stand out — built by the GuildWorks creative team.'
  },
  {
    title: 'The <span class="accent">Discord</span> solution for your community.',
    desc: 'High-quality server creation and ticket automation tailored to your brand’s needs.'
  },
  {
    title: 'The <span class="accent">ticket</span> solution for your workflow.',
    desc: 'Effortless support management for teams and clients with automated tracking and logs.'
  },
  {
    title: 'The <span class="accent">server</span> solution for your projects.',
    desc: 'Fully managed, optimized Discord servers designed for business, community, or entertainment.'
  },
  {
    title: 'The <span class="accent">guild</span> solution for your growth.',
    desc: 'Streamline collaboration, enhance professionalism, and elevate your entire Discord presence.'
  }
];

let index = 0;
function updateMessage() {
  if (!titleEl || !descEl) return;
  titleEl.classList.add("fade");
  descEl.classList.add("fade");

  setTimeout(() => {
    titleEl.innerHTML = messages[index].title;
    descEl.innerHTML = messages[index].desc;
    titleEl.classList.remove("fade");
    descEl.classList.remove("fade");
    index = (index + 1) % messages.length;
  }, 600);
}

// ===== Dynamic Uptime Number =====
function randomUptime() {
  if (!uptimeEl) return;
  const uptime = (95 + Math.random() * 4).toFixed(2) + "%";
  uptimeEl.textContent = uptime;
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  updateMessage();
  setInterval(updateMessage, 5000);
  setInterval(randomUptime, 7000);
});
