const {body} = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
    body('name')
        .isLength({min: 3}).withMessage('Имя должно быть минимум 3 символа')
        .trim(),
    body('email')
        .isEmail().withMessage('Введите корректный email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('Такой email уже занят')
                }
            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
    body('password', 'Пароль должен быть минимум 6 символов, состоять из латинских букв и цифр')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Пароли должны совпадать')
            }
            return true
        })
        .trim()
]

exports.loginValidators = [
    body('email')
        .isEmail().withMessage('Введите корректный email')
        .normalizeEmail()
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({ email: req.body.email })
                if (!user) {
                    return Promise.reject('Такой email не зарегистрирован')
                }
            } catch (e) {
                console.log(e)
            }
        }),
    body('password', 'Пароль должен быть минимум 6 символов, состоять из латинских букв или цифр')
        .isLength({min: 6, max: 56})
        .isAlphanumeric().withMessage('Пароль должен сожержать латинские буквы или цифры')
        .trim()
]

exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Минимальная длина названия 3 символа').trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img', 'Введите корректный Url изображения').isURL()
]
