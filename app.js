const path = require('path')
const express = require('express')
const levelInfo = require('./data/levelInfo')

const app = express()

app.use(express.urlencoded({ extended: true })) // added this to read the answers
app.set('view engine', 'ejs') // view engine refers to the type of templating, you would change it based on the templating agent that you are using (pub, nunchucks, etc.)
app.set('views', path.join(__dirname, 'views')) // sets the views folder as the navigation folder
app.use(express.static(path.join(__dirname, 'public'))) // sets the public folder as the homefolder. this is why the css, logos and other basic documents will be stored and referenced from this location

app.get(('/'), (req, res) => {
    res.render('index')
})

app.get(('/play/:id'), (req, res) => {
    // res.render(`level${req.params.id}`)

    const currentLevel = levelInfo.find(l => l.route === req.params.id)

    if (!currentLevel) {
        return res.status(404).render('404')
    }

    
    res.render('level', currentLevel)
})

app.post('/play/:id', (req, res) => {
    // 1. Find the current level by its route string
    const currentLevel = levelInfo.find(l => l.route === req.params.id)

    if (!currentLevel) {
        return res.status(404).render('404')
    }

    // 2. Normalize both strings so casing and spaces match
// tile levels send letters[], text levels send userAnswer
let raw = req.body.letters ?? req.body.userAnswer ?? ''
if (Array.isArray(raw)) raw = raw.join('')

const submittedAnswer = String(raw).trim().toLowerCase()
const correctAnswer = String(currentLevel.correctAnswer).trim().toLowerCase()

    if (submittedAnswer === correctAnswer) {
        if (currentLevel.level !== 6) {
            // 3. Safely find the next level using currentLevel.level + 1
            const nextLevel = levelInfo.find(l => l.level === currentLevel.level + 1)
            return res.redirect(`/play/${nextLevel.route}`)
        } else {
            // 4. Use backticks so the actual route is inserted
            return res.redirect(`/victory/p0lYm8ilqz`)
        }
    } else {
        res.render('level', {...currentLevel, introText: "Try again!"})
    }
})


app.get(('/victory/:id'), (req, res) => {
    if (req.params.id === "p0lYm8ilqz") {
        res.render('victory')
    } else {
        return res.status(404).render('404')
    }
})

app.use((req, res) => { // catches everything else and throws a 404
    res.status(404).render('404')
})

app.listen(5000, ()=>{
    console.log(`EJS Puzzle Game on http://localhost:5000`)
})