const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let players = [];
let playerNames = [];
let currentPlayerIndex = 0;
const numberToGuess = Math.floor(Math.random() * 100) + 1;

function broadcast(message) {
    players.forEach(player => player.send(message));
}

wss.on('connection', (ws) => {
    ws.send('Enter your name:');
    
    ws.on('message', (message) => {
        const playerIndex = players.indexOf(ws);
        if (playerIndex === -1) {
            // New player
            playerNames.push(message.toString());
            players.push(ws);
            
            if (players.length < 2) {
                ws.send(`Welcome, ${message.toString()}! Waiting for another player to join...`);
            } else if (players.length === 2) {
                broadcast(`Game started! ${playerNames[0]} vs ${playerNames[1]}`);
                players[currentPlayerIndex].send(`Your turn to guess, ${playerNames[currentPlayerIndex]}!`);
            }
        } else {
            // Existing player
            const guess = parseInt(message.toString(), 10);
            if (players[currentPlayerIndex] === ws) {
                if (guess === numberToGuess) {
                    broadcast(`${playerNames[currentPlayerIndex]} guessed the correct number ${numberToGuess}!`);
                    wss.close();
                } else {
                    ws.send(guess < numberToGuess ? 'Too low!' : 'Too high!');
                    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                    players[currentPlayerIndex].send(`Your turn to guess, ${playerNames[currentPlayerIndex]}!`);
                }
            }
        }
    });

    ws.on('close', () => {
        players = players.filter(player => player !== ws);
        playerNames = playerNames.filter((_, index) => players[index] !== ws);
    });
});
