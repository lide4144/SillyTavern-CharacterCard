// 一键启动 dist 静态文件服务（带 CORS）
// 用法: node serve_dist.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
const DIR = path.join(__dirname, 'dist');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  const fp = path.join(DIR, decodeURIComponent(url.parse(req.url).pathname));
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('404 Not Found'); return; }
    const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.map': 'application/json' };
    res.writeHead(200, { 'Content-Type': mime[path.extname(fp)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Serving dist/ on http://localhost:${PORT}`));
