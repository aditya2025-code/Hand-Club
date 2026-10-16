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
const userWinCheckerIMG = document.querySelector("#user-win-checker")
const pcWinCheckerIMG = document.querySelector("#pc-win-checker")
const stoneLastPickImg = document.querySelector("#stone-last-pick-img")
const stoneSelectionState = document.querySelector("#stone-selection-state")
const paperLastPickImg = document.querySelector("#paper-last-pick-img")
const paperSelectionState = document.querySelector("#paper-selection-state")
const scissorLastPickImg = document.querySelector("#scissor-last-pick-img")
const scissorSelectionState = document.querySelector("#scissor-selection-state")
const resetBtn = document.querySelector("#reset-action")

const userChoice = [stone, paper, scissor]
const pcChoice = ["stone", "paper", "scissor"]
const imgdict = {
    stone: "./assets/photos/sm-stone-gesture2.png",
    paper: "./assets/photos/paper-gesture.png",
    scissor: "./assets/photos/sm-scissors-gesture.png",
}

let userPoints = 0
let pcPoints = 0
let userRoundPoints = localStorage.getItem("user-points") || 0
let pcRoundPoints = localStorage.getItem("pc-points") || 0
let isPlaying = false
let previous

userScore.innerHTML = `${userRoundPoints}`
pcScore.innerHTML = `${pcRoundPoints}`

document.querySelector(".user-hand-img").style.display = "none"
document.querySelector(".pc-hand-img").style.display = "none"
userChoiceName.style.display = "none"
pcChoiceName.style.display = "none"
resultHeadline.style.display = "none"
action.style.display = ""

userChoice.forEach(whatclick => {
    whatclick.addEventListener("click", e => {
        if (isPlaying) return
        action.style.display = "none";
        // console.log(whatclick.id);
        changeCSS(whatclick)
        SPSgame(whatclick.id)
        previous = whatclick
    })
})
resetBtn.addEventListener("click", () => {
    localStorage.removeItem("user-points")
    localStorage.removeItem("pc-points")
    userRoundPoints = 0
    pcRoundPoints = 0
    userScore.innerHTML = `${userRoundPoints}`
    pcScore.innerHTML = `${pcRoundPoints}`
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
            localStorage.setItem("user-points", userRoundPoints)
        } else {
            pcRoundPoints++
            where.innerHTML = pcRoundPoints
            localStorage.setItem("pc-points", pcRoundPoints)
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
function changeCSS(target) {
    if (previous) {
        previous.style.border = "0.5px solid #d9d7cc"
        previous.style.backgroundColor = "#fffcf4"
        previous.style.color = "#72746a"
        stoneLastPickImg.src = "./assets/svg/arrow-up-right.svg"
        stoneSelectionState.innerHTML = ""
        paperLastPickImg.src = "./assets/svg/arrow-up-right.svg"
        paperSelectionState.innerHTML = ""
        scissorLastPickImg.src = "./assets/svg/arrow-up-right.svg"
        scissorSelectionState.innerHTML = ""
    }
    target.style.border = "2px solid #294be8"
    target.style.backgroundColor = "#e6ebff"
    target.style.color = "#294be8"
    if (target.id === "stone") {
        stoneLastPickImg.src = ""
        stoneSelectionState.innerHTML = "Last Pick"
    } else if (target.id === "paper") {
        paperLastPickImg.src = ""
        paperSelectionState.innerHTML = "Last Pick"
    } else {
        scissorLastPickImg.src = ""
        scissorSelectionState.innerHTML = "Last Pick"
    }
}
function SPSgame(user) {
    isPlaying = true
    document.querySelector(".user-hand-img").style.display = "flex"
    document.querySelector(".pc-hand-img").style.display = "flex"
    userChoiceName.style.display = ""
    pcChoiceName.style.display = ""
    resultHeadline.style.display = ""
    userWinCheckerIMG.src = ""
    pcWinCheckerIMG.src = ""
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
        return "DRAW"
    }
    else if ((user === "stone" && pc === "scissor") ||
        (user === "paper" && pc === "stone") ||
        (user === "scissor" && pc === "paper")) {
        userPoints++
        changeScore(userPoints, userScore, "user")
        userWinCheckerIMG.src = "./assets/svg/right-check.svg"
        return "YOU WIN!"
    }
    else {
        pcPoints++
        changeScore(pcPoints, pcScore, "pc")
        pcWinCheckerIMG.src = "./assets/svg/right-check.svg"
        return "COMPUTER WIN"
    }
}