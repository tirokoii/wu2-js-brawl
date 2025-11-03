const playerName = "Perry the scragulet knight"
let playerHP = 20
let enemyHP = 10
let playerRoll = 0
let enemyRoll = 0
let playerDice = 6
let enemyDice = 6
const dices = [4, 6, 8, 10, 12, 20] 

const playBtn = document.querySelector('#play-btn')
const playerNameDisplay = document.querySelector('#player-name')
const playerHpDisplay = document.querySelector('#player-hp')
const enemyHpDisplay = document.querySelector('#enemy-hp') // # --> id
const fightLogDisplay = document.querySelector('#fight-log')
const enemyRespawnDisplay = document.querySelector('#enemy-respawn')

function rollDice(diceType) {
    return Math.ceil(Math.random() * diceType)
}

function createEnemy() {
    i = Math.ceil(Math.random()* (dices.length))
    enemyDice = dices[i]
    enemyHP = Math.ceil(Math.random() * 20)
    return enemyDice && enemyHP
}

function log(msg) {
    const li = document.createElement('li')
    li.textContent = msg
    fightLogDisplay.appendChild(li)
}

function enemyRespawnMsg() {
    console.log(`Oh no!!! the enemy respawned`)
    enemyRespawnDisplay.textContent = `Enemy Respawn`
}

function turn() {
    let playerRoll = rollDice(playerDice) //Preparing for change in turn
    let enemyRoll = rollDice(enemyDice) 

    if (playerRoll > enemyRoll) {
        enemyHP -= playerRoll
        console.log(playerName + ` attacks the enemy and deals ` + playerRoll + ` dmg to the enemy`)
        console.log(`enemy ` + enemyHP)
        log(playerName + ` attacks the enemy and deals ` + playerRoll + ` dmg to the enemy`)
    } else if (enemyRoll > playerRoll) {
        playerHP -= enemyRoll
        console.log(`The enemy attacks and deals ` + enemyRoll + ` dmg to ` + playerName)
        console.log(`player ` + playerHP)
        log(`The enemy attacks and deals ` + enemyRoll + ` dmg to ` + playerName)
    } else {
        const dmg = (playerRoll + enemyRoll)/2
        playerHP -= dmg
        enemyHP -= dmg
        console.log(`Both take `+ dmg + ` dmg`)
        console.log(`enemy ` + enemyHP + ` player ` + playerHP )
    }

    if (enemyHP <= 0) {
        enemyRespawnMsg()
        createEnemy()
    }

    playerHpDisplay.textContent = playerHP
    enemyHpDisplay.textContent = enemyHP
}

playerNameDisplay.textContent = playerName
playerHpDisplay.textContent = playerHP
enemyHpDisplay.textContent = enemyHP

playBtn.addEventListener('click', turn)