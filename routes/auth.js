const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    // req.session.isAuthenticated = false (можно так или как ниже)
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('6130fe296ea167c5e59916ca')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        }
        res.redirect('/')
    })
})

router.post('/register', async (req, res) => {
    try () {
        const {email, password, repeat} = req.body


    } catch (e) {
        console.log(e)
    }
})

module.exports = router