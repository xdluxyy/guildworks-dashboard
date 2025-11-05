// Import Express
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files (like CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Root route - renders index.ejs
app.get("/", (req, res) => {
  res.render("index");
});

// Catch-all route (optional)
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ GuildWorks running at http://localhost:${PORT}`);
});
