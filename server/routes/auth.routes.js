const Router = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth.middleware')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = new Router()
const fileService = require('../services/fileService')
const File = require('../models/File')

//региcтрация и валидация
router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Пароль должен быть больше 6 символов').isLength({min: 6})


    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Некорректный запрос', errors})
            }
            const {email, password} = req.body
            const checkCandidate = await User.findOne({email})
            if (checkCandidate) {
                return res.status(400).json({message: 'Пользователь уже существует'})
            }
            const hashPassword = await bcrypt.hash(password, 9)
            const user = new User({email, password: hashPassword})
            await user.save()
            await fileService.createDir(new File({user: user.id, name: ''}))
            return res.json({message: 'Пользователь добавлен'})

        } catch (e) {
            console.log(e)
            res.send({message: "Server error", e})
        }
    }
)

//авторизация с JWT
router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "Пользователь с таким emeil в системе не зарегистрирован"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }
            //создаем токен
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
//возвращаем созданный токен клиенту
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error", e})
        }
    }
)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            //создаем токен
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
//возвращаем созданный токен клиенту
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })

        } catch (e) {
            console.log(e)
            res.send({message: "Server error", e})
        }
    }
)

module.exports = router