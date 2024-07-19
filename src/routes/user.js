"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const { isLogin } = require('../middlewares/permissions')
const user = require('../controllers/user')
const permissions = require('../middlewares/permissions')

// URL: /users

router.route('/')
    .get(user.list)
    .post(user.create)

router.route('/:id')
    .get(user.read)
    .put(permissions.isLogin, user.update)
    .patch(permissions.isLogin, user.update)
    .delete(user.delete)

/* ------------------------------------------------------- */
module.exports = router