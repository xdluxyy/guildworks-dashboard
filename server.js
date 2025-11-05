const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====

// Serve static files (CSS, JS, images, etc.) from /public
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine for dynamic pages
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== ROUTES =====

// Home page (EJS)
app.get("/", (req, res) => {
  res.render("index", { title: "GuildWorks | Home" });
});

// Features page (Static HTML)
app.get("/features", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "features.html"));
});

// Support page (optional future addition)
app.get("/support", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "support.html"));
});

// Dashboard redirect placeholder
app.get("/dashboard", (req, res) => {
  res.redirect("https://guildworks-dashboard.example.com"); // replace with your real link
});

// Catch-all for 404s
app.use((req, res) => {
  res.status(404).send(`
    <html style="background:#0b0b14; color:white; text-align:center; font-family:Poppins, sans-serif;">
      <h1>404 | Page Not Found</h1>
      <p>The page you're looking for doesn’t exist on GuildWorks.</p>
      <a href="/" style="color:#8b5cf6; text-decoration:none;">Return Home</a>
    </html>
  `);
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ GuildWorks running on http://localhost:${PORT}`);
});
