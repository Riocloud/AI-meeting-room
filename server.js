const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const OPENAI_API_KEY = "your_openai_api_key";

const chatroom = {
  tables: [
    { id: uuidv4(), x: 400, y: 300 },
    // Add more tables as needed
  ],
  avatars: [],
  speechBubbles: [],
};

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "join") {
      handleJoin(socket, data);
    }

    // Handle other message types as needed
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

function handleJoin(socket, data) {
  const { username, avatar } = data;

  // Assign user to a table and seat
  const table = chatroom.tables[0]; // Replace with logic to find an available seat
  const x = table.x + Math.random() * 50 - 25;
  const y = table.y + Math.random() * 50 - 25;

  chatroom.avatars.push({ id: uuidv4(), x, y, image: avatar });

  // Send updated chatroom state to all clients
  broadcastRender();
}

function broadcastRender() {
  const message = JSON.stringify({
    type: "render",
    tables: chatroom.tables,
    avatars: chatroom.avatars,
    speechBubbles: chatroom.speechBubbles,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

app.get("/generateText/:input", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: req.params.input,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    res.send(response.data.choices[0].text.trim());
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text");
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
