

# Number Guessing Game

This is a real-time Number Guessing Game that can be played with a friend over a network using WebSockets. Players take turns to guess a number until they find the correct one.

## Features

- Real-time gameplay
- Connect two players over a network
- Simple and interactive terminal interface

## Requirements

- Node.js installed on your machine

## How to Run

1. Clone the repository:

   ```
   git clone https://github.com/your-repo/number-guessing-game.git
   cd number-guessing-game
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Start the WebSocket server:

   ```
   node server.js
   ```

4. Start the first client in a new terminal:

   ```
   node client.js
   ```

5. Start the second client in another terminal:

   ```
   node client.js
   ```

6. Follow the prompts to enter your name and start guessing numbers!

## Game Rules

- Each player is prompted to guess a number between 1 and 100.
- Players take turns guessing the number.
- The game provides feedback on whether the guessed number is too high or too low.
- The first player to guess the correct number wins the game.

---

