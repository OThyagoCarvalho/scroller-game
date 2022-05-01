const canvas = document.querySelector("canvas");
console.log(canvas);

const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.4
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    };
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(){
    this.draw();
    this.position.x += this.velocity.x 
    this.position.y += this.velocity.y 
    if (this.position.y + this.height + this.velocity.y <= canvas.height){
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0;
    }
    
    if (keys.right.pressed) {
      player.velocity.x = 5
    } else if (keys.left.pressed) {
      player.velocity.x = -5;
    } else {
      player.velocity.x = 0;
    }
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 300,
      y: 400
    }
    this.width = 200;
    this.height = 20;
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const player = new Player();
const platform = new Platform();


const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0, canvas.width,canvas.height)
  player.update();
  platform.draw();

  //player colision
  if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y &&player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
    player.velocity.y = 0
  }
  
}

animate();

//add player movement
//todo 
  // fine tune jump movement;

window.addEventListener('keydown', ({ key })=> {
  
  switch(key) {
    case 'a' :
    keys.left.pressed = true;
    break;

    case 'd':
    keys.right.pressed = true;
    break;

    case 'w':
    player.velocity.y += -10;
    break;
    
  }
})


window.addEventListener('keyup', ({key})=> {
  
  switch(key) {
    case 'a' : 
    keys.left.pressed = false;
    break;

    case 'd' :
      keys.right.pressed = false;
    break;

    case 'w':
    player.velocity.y = 0;
    break;

  }
})