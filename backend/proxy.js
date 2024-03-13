// proxy.js

import http from 'http';
import httpProxy from 'http-proxy';

// Create a new proxy server instance
const proxy = httpProxy.createProxyServer({});

// Define the target server to which requests will be forwarded
const target = 'http://learning-management-system-w6jc.onrender.com';

// Create a new HTTP server to handle proxy requests
const server = http.createServer((req, res) => {
  // Proxy the incoming request to the target server
  proxy.web(req, res, { target });
});

// Listen on a specific port for incoming requests
const port = process.env.PROXY_PORT || 5000;
server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});

// Handle errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Proxy error occurred');
});
