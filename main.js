import { createSpeechBubble } from './speechBubble.js';

export class ChatroomScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ChatroomScene' });
  }

  preload() {
    this.load.image('table', 'assets/table.png');
    this.load.image('speechBubble', 'assets/speechBubble.png');
  }

  create() {
    const username = localStorage.getItem('username');
    const avatarData = localStorage.getItem('avatar');
    const avatar = new Image();
    avatar.src = avatarData;

    const table = this.add.image(400, 300, 'table');
    table.setScale(0.5);

    const person1 = this.add.sprite(250, 300, avatar);
    person1.displayWidth = 128;
    person1.displayHeight = 128;
    person1.setInteractive();

    const person2 = this.add.sprite(550, 300, avatar);
    person2.displayWidth = 128;
    person2.displayHeight = 128;
    person2.setInteractive();

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      const content = gameObject === person1
        ? `Hello, I am ${username}`
        : 'Hello, I am the AI';

      const bubble = createSpeechBubble(this, gameObject.x, gameObject.y - 100, content);
      this.time.delayedCall(3000, () => {
        bubble.destroy();
      });
    });
  }
}

