const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'ejs') // view engine refers to the type of templating, you would change it based on the templating agent that you are using (pub, nunchucks, etc.)
app.set('views', path.join(__dirname, 'views')) // sets the views folder as the navigation folder
app.use(express.static(path.join(__dirname, 'public'))) // sets the public folder as the homefolder. this is why the css, logos and other basic documents will be stored and referenced from this location

app.get(('/'), (req, res) => {
    res.render('index')
})

app.listen(3000, ()=>{
    console.log(`EJS Puzzle Game on http://localhost:3000`)
})