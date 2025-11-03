const playerName = "Perry the scragulet knight"
let playerHP = 20
let enemyHP = 10
playerRoll = rollDice(6)
enemyRoll = rollDice(6)


function rollDice(diceType) {
    return Math.ceil(Math.random() * diceType)
}


function turn() {
    console.log(`enmey ` + enemyRoll)
    console.log(`player ` + playerRoll)
    if (playerRoll > enemyRoll) {
        enemyHP -= playerRoll
        console.log(`enemy ` + enemyHP)
    } else if (enemyRoll > playerRoll) {
        playerHP -= enemyHP
        console.log(`player ` + playerHP)
    } else {
        const dmg = (playerRoll + enemyRoll)/2
        playerHP -= dmg
        enemyHP -= dmg
        console.log(`enemy ` + enemyHP + ` player ` + playerHP )
    }
}


while (playerHP > 0 && enemyHP > 0) {
    turn(playerRoll, enemyRoll)
}
