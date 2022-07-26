const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 8080


app.set('view engine', 'ejs')

const urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', urlEncodedParser, [
    check('username', 'This username must be at least 3 characters long.')
        .exists().isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characters long.').isLength({ min: 6 }),
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('register', { alert })
    }
})

app.listen(port, () => console.info(`App listening on port: ${port}`))