import platform from "./images/platform.png"
import hills from "./images/hills.png"
import background from "./images/background.png"

console.log(platform);

const canvas = document.querySelector('canvas')
console.log(canvas)

const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
const gravity = 0.4
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height

    
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height

    
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

function createImage (imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}



const player = new Player()
const  genericObjects = [
  new GenericObject ({
    x:-1,
    y:-1,
    image: createImage(background)
  }),
  new GenericObject ({
    x:-1,
    y:-1,
    image: createImage(hills)
  })
]

//todo create platforms dynamicaly using random numbers.
const platformImage = createImage(platform);
const platforms = [
  new Platform({ x: -1, y: 470, image: createImage(platform)}),
  new Platform({ x: platformImage.width - 3, y: 470, image: createImage(platform)})
]
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}
//sscrollOffSet is used to set win condition and prevent player from scrolling to the left when already on the starting position
let scrollOffSet = 0

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  genericObjects.forEach(genericObject => 
    genericObject.draw())
  platforms.forEach(platform => {
    platform.draw()
  })
  player.update()

  //adds left and right movement contained by player's position relative to the canvas
  //todo block player from moving so far left to outside of the starting position
  if (keys.right.pressed && player.position.x < canvas.width / 3) {
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0
  }

  if (keys.right.pressed && scrollOffSet >= 0) {
    platforms.forEach(platform => {
      platform.draw()
      platform.position.x -= 5
      scrollOffSet += 1
    })
    genericObjects.forEach(genericObject => {
      genericObject.position.x -= 3
    })
  } else if (keys.left.pressed && scrollOffSet > 0) {
    platforms.forEach(platform => {
      platform.draw()
      platform.position.x += 5
      scrollOffSet -= 1
    })
    genericObjects.forEach(genericObject => {
      genericObject.position.x += 3
    })

  }

  //player colision
  platforms.forEach(platform => {
    platform.draw()
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0
    }
  })
}

animate()

//adds player movement
//todo fine tune jump movement;

window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'a':
      keys.left.pressed = true
      break

    case 'd':
      keys.right.pressed = true
      break

    case 'w':
      player.velocity.y += -10
      break
  }
})

window.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      keys.left.pressed = false
      break

    case 'd':
      keys.right.pressed = false
      break

    case 'w':
      player.velocity.y = 0
      break
  }
})
