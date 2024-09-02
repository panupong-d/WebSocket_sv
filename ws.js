const WebSocket = require ('ws');


const host = '0.0.0.0'; 
const port = 8080;

const wss = new WebSocket.Server({ host: host, port: port });

wss.on('connection', (ws) => {
    console.log('A new client connected!');

    ws.on('message', (message) => {
        console.log('Received:', message);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Message: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('A client disconnected');
    });

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
});

console.log('WebSocket server is running on ws://localhost:8080');
