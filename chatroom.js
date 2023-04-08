class ChatroomScene extends Phaser.Scene {
  constructor() {
    super("ChatroomScene");
  }

  preload() {
    this.load.image("table", "assets/table.png");
    this.load.image("avatar", "assets/avatar.png");
    this.load.image("speechBubble", "assets/speechBubble.png");
    //Use the avatar upload from the login 
    const avatarDataUrl = localStorage.getItem('avatar');
    if (avatarDataUrl) {
      this.load.image('avatar', avatarDataUrl);
    } else {
      this.load.image('avatar', 'assets/avatar.png');
    }
  }

  create() {
    // Initialize WebSocket connection
    this.socket = new WebSocket("ws://your-websocket-server-url");
    
    // WebSocket event listeners
    this.socket.addEventListener("open", (event) => {
      const username = localStorage.getItem("username");
      const avatar = localStorage.getItem("avatar");
      this.socket.send(JSON.stringify({ type: "join", username, avatar }));
    });

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "render") {
        this.renderScene(message);
      }
    });

    // Render tables, avatars, and speech bubbles here
  }

  renderScene(message) {
    // Clear the existing scene
    this.children.removeAll();

    // Render tables
    message.tables.forEach((table) => {
      renderTable(this, table.x, table.y);
    });

    // Render avatars
    message.avatars.forEach((avatar) => {
      renderAvatar(this, avatar.x, avatar.y, avatar.image);
    });

    // Render speech bubbles
    message.speechBubbles.forEach((speechBubble) => {
      renderSpeechBubble(this, speechBubble.x, speechBubble.y, speechBubble.text);
    });
  }
}

// Example function to render a table
function renderTable(scene, x, y) {
  scene.add.image(x, y, "table");
}

// Example function to render an avatar
function renderAvatar(scene, x, y, image) {
  scene.add.image(x, y, "avatar");
}

// Example function to render a speech bubble
function renderSpeechBubble(scene, x, y, text) {
  const bubble = scene.add.image(x, y, "speechBubble");
  const textStyle = { fontSize: "16px", color: "#000", fontFamily: "Arial" };
  scene.add.text(x, y, text, textStyle).setOrigin(0.5);
}
