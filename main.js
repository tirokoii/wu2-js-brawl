const playerName = 'Perry the scragulet knight'
let playerHP = 100
let playerRoll = 0
let playerDice = 6
let playerMoney = 0

let enemyMoney = [1, 10, 12, 13]
let currentEnemy = 0

let last = 0
let round
let time_mult = 0
let nr = 1
const dices = [4, 6, 8, 10, 12, 20] 

const playBtn = document.querySelector('#play-btn')
const stopBtn = document.querySelector('#stop-btn')

const playerNameDisplay = document.querySelector('#player-name')
const playerHpDisplay = document.querySelector('#player-hp')
const playerMoneyDisplay = document.querySelector('#player-money')

const enemyNameDisplay = document.querySelector('#enemy-name')
const enemyHpDisplay = document.querySelector('#enemy-hp') // # --> id
const enemyImgDisplay = document.querySelector('#enemy-img')
const fightLogDisplay = document.querySelector('#fight-log')
const dangerMsgDisplay = document.querySelector('#danger-msg-box')
const timeTrackerDisplay = document.querySelector('#time')

const enemyList = []

class Enemy {
    constructor(name, hp, money, dice, roll, src) {
        this.name = name
        this.hp = hp
        this.money = money
        this.dice = dice
        this.roll = roll
        this.src = src
    }

    attack(dmg) {
        const msg = [
            this.name + ' launches towards the brave knight and flairs ' + dmg + '!',
            this.name + ' sprews the scalon and deals ' + dmg + '!',
            this.name + ' strikes you with their massive stone tablet of commandments with ' + dmg + '!'
        ]

        return rand(msg, 0)
    }
}



// const enemies = [
//     {
//         'name': 'Goblin',
//         'hp': 20
//     },
//     {
//         'name': 'Stut',
//         'hp': 10
//     },
//     {
//         'name': 'Caloth',
//         'hp': 40
//     },
//     {
//         'name': 'Parkol',
//         'hp': 25
//     }
// ]

function rand(li, num) {
    if (li == 0) {
        return Math.floor(Math.random()*num)
    } else if (num == 0) {
        return li[Math.floor(Math.random()* li.length)]
    }
}


function rollDice(diceType) { // Randomized dice roll
    return Math.ceil(Math.random() * diceType)
    // Math --> plugin
    // ceil --> round up
    // random --> 0-1
}

function createEnemy() { // Create an enemy from list with objects in
    Goblin = new Enemy('Goblin', 20, rand(enemyMoney, 0), 0, 0, 'images/goblin.png')
    Stut = new Enemy('Stut', 10, rand(enemyMoney, 0), 0, 0, 'images/stut.png')
    Caloth = new Enemy('Caloth', 40, rand(enemyMoney, 0), 0, 0, 'images/goblin.png')
    Parkol = new Enemy('Parkol', 25, rand(enemyMoney, 0), 0, 0, 'images/goblin.png')
    enemyList.push(Goblin, Stut, Caloth, Parkol)
    currentEnemy = rand(enemyList, 0)
    i = rand(0, dices.length)
    console.log(currentEnemy.name)
    currentEnemy.dice = dices[i]
    enemyNameDisplay.textContent = currentEnemy.name
    enemyImgDisplay.src = currentEnemy.src
    // i = Math.floor(Math.random()*(dices.length))
    // enemyDice = dices[i]
    // j = Math.floor(Math.random()*(enemies.length))
    // enemyHP = enemies[j]['hp']
    // enemyName = enemies[j]['name']
    // console.log(enemies[j]['name'])
    // enemyNameDisplay.textContent = enemyName
}
createEnemy()

// function createEnemy() { // Spawn an enemy
//     i = Math.ceil(Math.random()* (dices.length))
//     enemyDice = dices[i]
//     enemyHP = Math.ceil(Math.random() * 20)
//     return enemyDice && enemyHP
// }


function log(msg, type) { // display battle messeges
    const li = document.createElement('li')
    if (type) {
        li.classList.add(type)
    }
    // time = Math.round(Math.random()*(timestamp/1000))
    li.textContent = `[${nr}] ${msg}`
    fightLogDisplay.appendChild(li)
    if (fightLogDisplay.childNodes.length > 10) {
        fightLogDisplay.removeChild(fightLogDisplay.firstChild)
    }
    nr += 1
}

function dangerMsg(content) { // Display messege for enemy respawn
    const msg = document.createElement('h3')
    msg.textContent = content
    msg.classList.add('danger-msg')
    dangerMsgDisplay.appendChild(msg)
    setTimeout(() => {
        dangerMsgDisplay.removeChild(msg)
    }, 2000);
}

// Do later

// const playerAttacks = [
//     `You hit the enemy with ${dmg}!`,
//     `Blabla bla ${dmg}`
//     `Yeah yeah... ${dmg}`
// ]


function turn() { // Each turn of the game
    let playerRoll = rollDice(playerDice) //Preparing for change with upgrades
    currentEnemy.roll = rollDice(currentEnemy.dice) 

    if (playerRoll > currentEnemy.roll) {
        currentEnemy.hp -= playerRoll
        console.log(`enemy ${currentEnemy.hp}`)
        log(` ${playerName} attacks the enemy and deals ${playerRoll} dmg to the enemy`, "attack")
    } else if (currentEnemy.roll > playerRoll) {
        playerHP -= currentEnemy.roll
        console.log(`player ${playerHP}`)
        log(currentEnemy.attack(currentEnemy.roll), "damage")
    } else {
        const dmg = (playerRoll + currentEnemy.roll)/2
        playerHP -= dmg
        currentEnemy.hp -= dmg
        console.log(`enemy ${currentEnemy.hp} player ${playerHP}`, "dub")
        log(`Both take ${dmg} dmg`)
    }

    if (currentEnemy.hp < 1) { // Red big message
        playerMoney += currentEnemy.money
        playerMoneyDisplay.textContent = playerMoney
        console.log(playerMoney)
        dangerMsg('Enemy respawn!')
        createEnemy()
    }
    // playerHpDisplay.textContent = playerHP < 1 ? 0 : playerHP (If-statments)
    // enemyHpDisplay.textContent = enemyHP < 1 ? 0 : enemyHP
    playerHpDisplay.textContent = Math.max(0, playerHP)
    enemyHpDisplay.textContent = Math.max(0, currentEnemy.hp)

    if (playerHP < 20) {
        dangerMsg('hp-low')
        // playerHpDisplay.classList.add("hp-low")
    }
}

function gameLoop(timestamp) { // Hmmmmmm......
    playBtn.disable = true
    if (timestamp >= last + 1000) {
        turn()
        last = timestamp
    }
    round = window.requestAnimationFrame(gameLoop)
    if (playerHP <= 0) { // Ending (cancel button)
        dangerMsg('K/O')
        window.cancelAnimationFrame(round)
    }
}

function time() { 
    time_mult += 0.015 // Updates it close enough to real time...
    timestamp = time_mult.toFixed(1)
    timeTrackerDisplay.textContent = timestamp 

    window.requestAnimationFrame(time) //updates the timer
}

time()

function stop() {
    console.log('stop')
    window.cancelAnimationFrame(round) // Cancels gameLoop
}

playerNameDisplay.textContent = playerName
playerHpDisplay.textContent = playerHP
enemyHpDisplay.textContent = currentEnemy.hp

playBtn.addEventListener('click', gameLoop) // Click click
stopBtn.addEventListener('click', stop) // Clock clock

