const canvas = document.querySelector('canvas')
console.log(canvas)

const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

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
  constructor({ x, y }) {
    this.position = {
      x,
      y
    }
    this.width = 200
    this.height = 20
  }

  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const player = new Player()

//todo create platforms dynamicaly using random numbers.
const platforms = [
  new Platform({ x: 200, y: 100 }),
  new Platform({ x: 500, y: 300 }),
  new Platform({ x: 800, y: 400 })
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
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
  platforms.forEach(platform => {
    platform.draw()
  })

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
  } else if (keys.left.pressed && scrollOffSet > 0) {
    platforms.forEach(platform => {
      platform.draw()
      platform.position.x += 5
      scrollOffSet -= 1
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
