const stone = document.querySelector("#stone")
const paper = document.querySelector("#paper")
const scissor = document.querySelector("#scissor")
const userIMG = document.querySelector("#user-img")
const pcIMG = document.querySelector("#pc-img")
const userChoiceName = document.querySelector("#user-choice-name")
const pcChoiceName = document.querySelector("#pc-choice-name")
const resultHeadline = document.querySelector("#result-headline")
const action = document.querySelector("#action")
const actionlabel = document.querySelector("#action h1")
const userScore = document.querySelector("#user-score")
const pcScore = document.querySelector("#pc-score")

const userChoice = [stone, paper, scissor]
const pcChoice = ["stone", "paper", "scissor"]
const imgdict = {
    stone: "./assets/photos/sm-stone-gesture2.png",
    paper: "./assets/photos/paper-gesture.png",
    scissor: "./assets/photos/sm-scissors-gesture.png",
}

let userPoints = 0
let pcPoints = 0
let userRoundPoints = 0
let pcRoundPoints = 0
let isPlaying = false

document.querySelector(".user-hand-img").style.display = "none"
document.querySelector(".pc-hand-img").style.display = "none"
userChoiceName.style.display = "none"
pcChoiceName.style.display = "none"
resultHeadline.style.display = "none"
action.style.display = ""

userChoice.forEach(whatclick => {
    whatclick.addEventListener("click", e => {
        if (isPlaying) return
        action.style.display = "none"
        // console.log(whatclick.id, userIMG);
        SPSgame(whatclick.id)
    })
})

function changeImg(img, where) {
    where.src = ""
    where.src = imgdict[img]
}
function changeScore(score, where, who) {
    if (where == userScore) {
        document.querySelector(`.user-marker-img${(score - 1)}`).classList.add("win-marked")
    }
    else {
        document.querySelector(`.pc-marker-img${(score - 1)}`).classList.add("win-marked")
    }
    // where.innerHTML = score
    if (score === 5) {
        if (who == "user") {
            userRoundPoints++
            where.innerHTML = userRoundPoints
        } else {
            pcRoundPoints++
            where.innerHTML = pcRoundPoints
        }
        for (let a = 0; a <= 4; a++) {
            document.querySelector(`.user-marker-img${a}`).classList.remove("win-marked")
            document.querySelector(`.pc-marker-img${a}`).classList.remove("win-marked")
        }
        userPoints = 0
        pcPoints = 0
        actionlabel.innerHTML = "Next Round"
    }
    else
        actionlabel.innerHTML = "Play Again"
}

function SPSgame(user) {
    isPlaying = true
    document.querySelector(".user-hand-img").style.display = "flex"
    document.querySelector(".pc-hand-img").style.display = "flex"
    userChoiceName.style.display = ""
    pcChoiceName.style.display = ""
    resultHeadline.style.display = ""
    
    resultHeadline.innerHTML = "Choosing..."
    
    changeImg(user, userIMG)
    userChoiceName.innerHTML = user
    const random = Math.floor(Math.random() * 3)
    pc = pcChoice[random]
    let i = 0
    let j = 0
    const intervalid = setInterval(() => {
        if (j === 3) j = 0
        // console.log(pcChoice[j]);
        changeImg(pcChoice[j], pcIMG)
        pcChoiceName.innerHTML = pcChoice[j]
        i++
        j++
        if (i === 15) {
            clearInterval(intervalid)
            changeImg(pc, pcIMG)
            pcChoiceName.innerHTML = pc
            // console.log(user,pc);
            
            resultHeadline.innerHTML = whoWin(user, pc)
            action.style.display = ""
            isPlaying = false
        }
    }, 90)
}

function whoWin(user, pc) {
    if (user === pc) {
        actionlabel.innerHTML = "Play Again"
        return "DRAW"}
    else if ((user === "stone" && pc === "scissor") ||
        (user === "paper" && pc === "stone") ||
        (user === "scissor" && pc === "paper")) {
        userPoints++
        changeScore(userPoints, userScore, "user")
        return "YOU WIN!"
    }
    else {
        pcPoints++
        changeScore(pcPoints, pcScore, "pc")
        return "COMPUTER WIN"
    }
}