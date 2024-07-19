"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/group:

const permissions = require('../middlewares/permissions')
const group = require('../controllers/group')

// URL: /group

router.route('/')
    .get(group.list)
    .post(group.create)

router.route('/:id')
    .get(group.read)
    .put(group.update)
    .patch(group.update)
    .delete(group.delete)

/* ------------------------------------------------------- */
module.exports = router