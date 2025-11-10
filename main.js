const playerName = 'Perry the scragulet knight'
let enemyName = 'none'
let playerHP = 100
let enemyHP = 10
let playerRoll = 0
let enemyRoll = 0
let playerDice = 6
let enemyDice = 6
let money = 0
let enemy_money = [10, 12, 13]
let x = 0
const dices = [4, 6, 8, 10, 12, 20] 

const playBtn = document.querySelector('#play-btn')
const playerNameDisplay = document.querySelector('#player-name')
const enemyNameDisplay = document.querySelector('#enemy-name')
const playerHpDisplay = document.querySelector('#player-hp')
const enemyHpDisplay = document.querySelector('#enemy-hp') // # --> id
const fightLogDisplay = document.querySelector('#fight-log')
const dangerMsgDisplay = document.querySelector('#danger-msg-box')

const enemies = [
    {
        'name': 'Goblin',
        'hp': 20
    },
    {
        'name': 'Stut',
        'hp': 10
    },
    {
        'name': 'Caloth',
        'hp': 40
    },
    {
        'name': 'Parkol',
        'hp': 25
    }
]



function rollDice(diceType) { // Randomized dice roll
    return Math.ceil(Math.random() * diceType)
    // Math --> plugin
    // ceil --> round up
    // random --> 0-1
}

function createEnemy() { // Create an enemy from list with objects in
    i = Math.floor(Math.random()*(dices.length))
    enemyDice = dices[i]
    j = Math.floor(Math.random()*(enemies.length))
    enemyHP = enemies[j]['hp']
    enemyName = enemies[j]['name']
    console.log(enemies[j]['name'])
    enemyNameDisplay.textContent = enemyName
}


// function createEnemy() { // Spawn an enemy
//     i = Math.ceil(Math.random()* (dices.length))
//     enemyDice = dices[i]
//     enemyHP = Math.ceil(Math.random() * 20)
//     return enemyDice && enemyHP
// }

function log(msg) { // display battle messeges
    const li = document.createElement('li')
    li.textContent = msg
    fightLogDisplay.appendChild(li)
    if (fightLogDisplay.childNodes.length > 10) {
        fightLogDisplay.removeChild(fightLogDisplay.firstChild)
    }
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
    let enemyRoll = rollDice(enemyDice) 

    if (playerRoll > enemyRoll) {
        enemyHP -= playerRoll
        console.log(`enemy ${enemyHP}`)
        log(` ${playerName} attacks the enemy and deals ${playerRoll} dmg to the enemy`)
    } else if (enemyRoll > playerRoll) {
        playerHP -= enemyRoll
        console.log(`player ${playerHP}`)
        log(`The enemy attacks and deals ${enemyRoll} dmg to ${playerName}`)
    } else {
        const dmg = (playerRoll + enemyRoll)/2
        playerHP -= dmg
        enemyHP -= dmg
        console.log(`enemy ${enemyHP} player ${playerHP}`)
        log(`Both take ${dmg} dmg`)
    }

    if (enemyHP <= 0) { // Red big message
        dangerMsg('Enemy respawn!')
        createEnemy()
    }
    // playerHpDisplay.textContent = playerHP < 1 ? 0 : playerHP (If-statments)
    // enemyHpDisplay.textContent = enemyHP < 1 ? 0 : enemyHP
    playerHpDisplay.textContent = Math.max(0, playerHP)
    enemyHpDisplay.textContent = Math.max(0, enemyHP)

    if (playerHP <= 0) { // Ending (cancel button)
        playBtn.disabled = true
    } else if (playerHP < 20 && x < 1) {
        x = 1
        dangerMsg('hp-low')
        // playerHpDisplay.classList.add("hp-low")
    }
}

playerNameDisplay.textContent = playerName
playerHpDisplay.textContent = playerHP
enemyHpDisplay.textContent = enemyHP

playBtn.addEventListener('click', turn) // Click click