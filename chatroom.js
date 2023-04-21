class ChatroomScene extends Phaser.Scene {
  constructor() {
    super("ChatroomScene");
  }

  preload() {
    this.load.image("table", "assets/table.png");
    this.load.image("speechBubble", "assets/speechBubble.png");

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

      if (message.type === "update_state") {
        this.renderScene(message.state);
      }
    });
  }

  renderScene(state) {
    // Clear the existing scene
    this.children.removeAll();

    // Render tables
    state.tables.forEach((table) => {
      renderTable(this, table.x, table.y);
    });

    // Render avatars
    state.users.forEach((user) => {
      renderAvatar(this, user.x, user.y, user.avatar);
    });

    // Render speech bubbles
    state.messages.forEach((message) => {
      const user = state.users.find(u => u.id === message.userId);
      if (user) {
        renderSpeechBubble(this, user.x, user.y - 50, message.text);
      }
    });
  }
}

function renderTable(scene, x, y) {
  scene.add.image(x, y, "table");
}

function renderAvatar(scene, x, y, image) {
  scene.add.image(x, y, "avatar");
}

function renderSpeechBubble(scene, x, y, text) {
  const bubble = scene.add.image(x, y, "speechBubble");
  const textStyle = { fontSize: "16px", color: "#000", fontFamily: "Arial" };
  scene.add.text(x, y, text, textStyle).setOrigin(0.5);
}

