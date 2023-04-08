import Phaser from 'phaser';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: {
      create: create,
      update: update,
    },
  };

  export function initPhaser() {
    const game = new Phaser.Game(config);
  }
  
  
  const game = new Phaser.Game(config);
  
  let people;
  let speechBubbles;
  
  function create() {
    // Set background color
    this.cameras.main.setBackgroundColor(0xb5d0ff);
  
    // Create office table
    const table = this.add.graphics();
    table.fillStyle(0x9e9e9e, 1);
    table.fillRect(config.width / 2 - 100, config.height / 2 - 50, 200, 100);
  
    // Create chairs and people
    const chairsData = [
      { x: config.width / 2 - 50, y: config.height / 2 - 50 },
      { x: config.width / 2 + 50, y: config.height / 2 - 50 },
    ];
  
    people = this.add.group();
  
    chairsData.forEach((chairData, i) => {
      const chair = this.add.graphics();
      chair.fillStyle(0x4caf50, 1);
      chair.fillRect(chairData.x - 15, chairData.y - 15, 30, 30);
  
      const person = this.add.graphics({ x: chairData.x - 10, y: chairData.y - 40 });
      person.fillStyle(0xf44336, 1);
      person.fillCircle(10, 10, 10);
      person.setInteractive(new Phaser.Geom.Circle(10, 10, 10), Phaser.Geom.Circle.Contains);
      person.setData('id', i + 1);
      people.add(person);
    });
  
    // Create speech bubbles
    speechBubbles = this.add.group();
  
    

  this.input.on('gameobjectdown', async (pointer, gameObject) => {
    const character = gameObject.getData('id');
    const response = await fetch(`http://localhost:3001/generateText/Person ${character} says:`);
    const text = await response.text();
  
    showSpeechBubble(this, gameObject, text);
  });
  
  function update() {}
  
  function showSpeechBubble(scene, person, text) {
    // Hide any visible speech bubbles
    speechBubbles.clear(true, true);
  
    const speechBubble = scene.add.graphics();
    speechBubble.fillStyle(0xffffff, 1);
    speechBubble.fillRoundedRect(person.x - 50, person.y - 80, 100, 40, 10);
    speechBubble.lineStyle(1, 0x000000, 1);
    speechBubble.strokeRoundedRect(person.x - 50, person.y - 80, 100, 40, 10);
  
    const speechText = scene.add.text(person.x - 40, person.y - 75, text, { fontSize: '12px', color: '#000' });
  
    speechBubbles.add(speechBubble);
    speechBubbles.add(speechText);
  
    // Hide the speech bubble after 5 seconds
    scene.time.delayedCall(5000, () => {
      speechBubbles.clear(true, true);
    });
  }
}
  