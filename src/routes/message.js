"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/message:

const permissions = require('../middlewares/permissions')
const message = require('../controllers/message')

// URL: /messages

router.route('/')
    .get(message.list)
    .post(permissions.isLogin, message.create)

router.route('/:id')
    .get(message.read)
    .put(permissions.isLogin, message.update)
    .patch(permissions.isLogin, message.update)
    .delete(permissions.isLogin, message.delete)

/* ------------------------------------------------------- */
module.exports = router