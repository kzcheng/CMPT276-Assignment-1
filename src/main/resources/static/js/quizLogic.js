//
//
// Variables
var qList = loadQuestionDataFromHTML()
// When currentQID = -1, the quiz is over.
var currentQID = 0
// Boolean flag to indicate if all questions have been answered.
var quizComplete = false

// I really wish I didn't choose to store all the data in the HTML file.
loadTrueAnswersHardcoded()

console.log(qList)

// qList.forEach((question) => {
//     console.log(question.self)
// })

// qList.every((question) => question.aUser = 2)
console.log(`checkCompletion: ${checkCompletion()}`)

refreshQuestionBlock()

//
//
// Event Listeners
document.querySelector("#bNext").addEventListener("click", () => {
    console.log("Next button clicked.")
    currentQID++
    console.log(`Moving to question ${currentQID + 1}.`)
    refreshQuestionBlock()
})

document.querySelector("#bPrev").addEventListener("click", () => {
    console.log("Previous button clicked.")
    currentQID--
    console.log(`Moving to question ${currentQID + 1}.`)
    refreshQuestionBlock()
})

document.querySelector("#bSubmit").addEventListener("click", () => {
    console.log("Submit button clicked.")
})

//
//
// Functions
function loadQuestionDataFromHTML() {
    qList = Array.from({ length: 5 }, (_, i) => {
        let self = document.querySelector(`#q${i + 1}`)
        return {
            self: self,
            qText: self.querySelector(".qText").textContent,
            aList: Array.from(self.querySelectorAll(".choices button")).map((button) => button.textContent),
            // When the user hasn't answered the question yet, aUser = -1.
            aUser: -1,
        }
    })
    // Note that returning the global variable qList here is an intentional design choice.
    // It might not be a good choice, but I do like it.
    return qList
}

function loadTrueAnswersHardcoded() {
    qList[0].aTrue = 0
    qList[1].aTrue = 1
    qList[2].aTrue = 2
    qList[3].aTrue = 3
    qList[4].aTrue = 4
}

function refreshQuestionBlock() {
    hideQuestions()
    displayQuestion(currentQID)
    checkIfDisplaySubmit()
}

function hideQuestions() {
    return qList.forEach((question) => {
        question.self.style.display = "none"
    })
}

function displayQuestion(id) {
    qList[id].self.style.display = "block"
    if (currentQID === 0) {
        document.querySelector("#bNext").style.visibility = "visible"
        document.querySelector("#bPrev").style.visibility = "hidden"
    } else if (currentQID === qList.length - 1) {
        document.querySelector("#bNext").style.visibility = "hidden"
        document.querySelector("#bPrev").style.visibility = "visible"
    } else {
        document.querySelector("#bNext").style.visibility = "visible"
        document.querySelector("#bPrev").style.visibility = "visible"
    }
}

function checkIfDisplaySubmit() {
    if (checkCompletion()) {
        document.querySelector("#bSubmit").style.visibility = "visible"
    }
}

function checkCompletion() {
    quizComplete = qList.every((question) => question.aUser !== -1)
    console.log(`quizComplete: ${quizComplete}`)
    return quizComplete
}
