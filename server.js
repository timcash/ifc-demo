const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const PORT = 8082
app.use(express.static('public'));

const index_page = require('fs').readFileSync('public/index.html');
const index_page_string = index_page.toString();

const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });
});

app.get('/', (req, res) => res.send(index_page_string))
app.get('/web', (req, res) => res.send(index_page_string))

server.listen(PORT, () => console.log(`Lisening at http://localhost:${PORT}`))