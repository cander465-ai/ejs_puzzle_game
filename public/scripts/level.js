let levelInfo = require('.../data/levelInfo')

function checkAnswer(answer, level) {
    currentLevel = levelInfo.find(l => l.level === Number(level))
    correctAnswer = currentLevel.correctAnswer

    if (answer == correctAnswer) {
        return true
    }

    return false
}

