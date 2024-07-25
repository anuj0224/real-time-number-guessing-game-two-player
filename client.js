const WebSocket = require('ws');
const readlineSync = require('readline-sync');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected to the server.');
});

ws.on('message', (message) => {
    const messageStr = message.toString();
    console.log(messageStr);

    if (messageStr.includes("Your turn to guess")) {
        const guess = readlineSync.question('Enter your guess: ');
        ws.send(guess);
    } else if (messageStr.includes("Enter your name:")) {
        const name = readlineSync.question('Enter your name: ');
        ws.send(name);
    }
});

ws.on('close', () => {
    console.log('Connection closed.');
});
