// Server statis sederhana untuk preview website di localhost.
// Jalankan:  node server.js   lalu buka http://localhost:5500
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = 5500;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml',
  '.ico':'image/x-icon', '.json':'application/json', '.webp':'image/webp' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const fp = path.join(root, p);
  if (!fp.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(fp, (e, data) => {
    if (e) { res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'}); return res.end('<h1>404</h1><p>File tidak ditemukan: ' + p + '</p>'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('Serving ' + root + '  ->  http://localhost:' + port));
