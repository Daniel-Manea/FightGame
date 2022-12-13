
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 752;
canvas.height = 360;
canvas.style.background = "url('/assets/enviorment.gif')";
canvas.style.backgroundSize = 'cover';
const gravity = 1;


class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 200
        this.width = 100
        this.lastKey
        this.playerImg = new Image()
        this.playerImg.src = '/assets/stand.gif'
    }

    draw () {
        c.drawImage(this.playerImg, this.position.x, this.position.y, this.width, this.height)
    }
    

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

const keys = {
    a: {
        isDown: false
    },
    d: {
        isDown: false
    },
    w: {
        isDown: false
    },
    ArrowRight: {
        isDown: false
    },
    ArrowLeft: {
        isDown: false
    },
    ArrowUp: {
        isDown: false
    },
    

}

player.draw()

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0
    }
})
let lastKey

enemy.draw()

console.log(player)

function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0

    //Player movement
    if (keys.a.isDown && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.isDown && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    //Enemy movement
    if (keys.ArrowLeft.isDown && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.isDown && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.isDown = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.isDown = true
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -20

            break;

        case 'ArrowRight':
            keys.ArrowRight.isDown = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.isDown = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20

            break;
    }

    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.isDown = false
            break;
        case 'a':
            keys.a.isDown = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.isDown = false
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.isDown = false
        break;
    }

    console.log(event.key)
})
