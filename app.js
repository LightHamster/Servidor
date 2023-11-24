const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = `.${req.url}`;

  if (filePath === './') {
    filePath = './index.html'; // Si la ruta es '/', sirve el archivo index.html
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Manejar error si el archivo no existe
        fs.readFile('./404.html', (err, notFoundContent) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFoundContent, 'utf-8');
        });
      } else {
        // Otro tipo de error del servidor
        res.writeHead(500);
        res.end(`Error interno del servidor: ${err.code}`);
      }
    } else {
      // Si el archivo se encuentra, servirlo con el contentType adecuado
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 4444;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});