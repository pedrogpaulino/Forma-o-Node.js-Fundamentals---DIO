const player1 = {
    nome: 'Mario',
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0
}       
    
const player2 = {
    nome: 'Luigi',
    velocidade: 3,
    manobrabilidade: 3,
    poder: 2,
    pontos: 0
}       


async function rollDice(){
    return Math.floor(Math.random()*6)+1
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "Reta"
            break
        case random < 0.66:
            result = "Curva"
            break
        default:
            result = "Confronto"
            break
    }

    return result
}

async function logRollDice(name, block, diceResult, attribute){
    console.log(`${name} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function raceEngine(character1, character2){

    for(let round=1; round<6; round++){

        console.log(`\nRodada ${round} iniciando!`)
        
        let blockRace = await getRandomBlock()
        console.log(`Bloco: ${blockRace}`)
    
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    let totalTestSkill1 = 0
    let totalTestSkill2 = 0

        if (blockRace === "Reta"){
            totalTestSkill1 = diceResult1 * character1.velocidade
            totalTestSkill2 = diceResult2 * character2.velocidade

            await logRollDice(character1.nome, "velocidade", diceResult1, character1.velocidade)
            await logRollDice(character2.nome, "velocidade", diceResult2, character2.velocidade)
        } 
        if (blockRace === "Curva"){
            totalTestSkill1 = diceResult1 * character1.manobrabilidade
            totalTestSkill2 = diceResult2 * character2.manobrabilidade

            await logRollDice(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade)
            await logRollDice(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade)
            
        } 
        if (blockRace === "Confronto"){
            let powerResult1 = diceResult1 * character1.poder
            let powerResult2 = diceResult1 * character2.poder

            await logRollDice(character1.nome, "poder", diceResult1, character1.poder)
            await logRollDice(character2.nome, "poder", diceResult2, character2.poder)

            character1.pontos -= powerResult1 < powerResult2 && character1.pontos > 0 ? 1 : 0
            character2.pontos -= powerResult2 < powerResult1 && character2.pontos > 0 ? 1 : 0

            console.log(powerResult2 === powerResult1 ? "Confronto empatou, niguem perdeu pontos!" : "")
        }


        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.nome} marcou 1 ponto!`)
            character1.pontos++
        } else if (totalTestSkill1 < totalTestSkill2){
            console.log(`${character2.nome} marcou 1 ponto!`)
            character2.pontos++
        }

        console.log("\n-----------------------------------------")
    }
}

(
    async function main(){
        console.log(`\nCorrinda entre ${player1.nome} e ${player2.nome} começando...`)
    
        await raceEngine(player1, player2)
    }
)()