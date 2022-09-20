import express from 'express';
import ws from 'ws';
import http from 'http';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on('connection', (socket) => {
  console.log('Connected to Browser ✅');
  socket.on('close', () => console.log('Disconnected from the Browser ❌'));
  socket.on('message', (message) => {
    console.log(message.toString('utf8'));
  });
  socket.send('hello');
});

server.listen(3000, handleListen);
