const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files from the public directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Route for serving index.html at the root URL
  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
  });

  // Route for rewriting URLs to remove .html extension
  server.get('/:slug', (req, res) => {
    const { slug } = req.params;
    if (slug.endsWith('.html')) {
      return res.redirect(301, `/${slug.slice(0, -5)}`);
    }
    return handle(req, res);
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

/*const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/
/*const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Remove this route for serving index.html directly
  // server.get('../public/index.html', (req, res) => {
  //   return app.render(req, res, '/');
  // });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
*/