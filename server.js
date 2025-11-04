const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'GuildWorks Dashboard',
    stats: {
      active: 8,
      pending: 3,
      completed: 15
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GuildWorks Dashboard running at http://localhost:${PORT}`);
});
