// const playerName = prompt("Skriv ditt namn: ")
const playerName = "Jens" // statiskt så vi slipper prompt varje körning
let playerHp = 100
let enemyHp = 100

function rollDice() {
    return Math.ceil(Math.random() * 6)
}


console.log(rollDice())

let playerRoll = rollDice()
let enemyRoll = rollDice()

function gameRound() {
    if (playerRoll > enemyRoll) {
        const damage = playerRoll - enemyRoll
        console.log(`Du köttar fienden för ${damage}!`)
        enemyHp -= damage
    } else if (enemyRoll > playerRoll) {
        const damage = enemyRoll - playerRoll
        console.log(`Nedrans, du blir mulad för ${damage}!`)
        playerHp -= damage
    } else {
        console.log("Snyggt parerat, inget händer!")
    }
}

gameRound()