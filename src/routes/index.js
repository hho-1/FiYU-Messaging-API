"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// call user.create for /account/register:
const { create: userCreate } = require('../controllers/user')
router.post('/account/register', userCreate)

// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// groups:
router.use('/groups', require('./group'))
// messages:
router.use('/messages', require('./message'))
router.use('/documents', require('./document'))
//auth
router.use('/auth', require('./auth'))



/* ------------------------------------------------------- */
module.exports = router