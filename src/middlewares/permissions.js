"use strict"

// Middleware: permissions

module.exports = {

    isLogin: (req, res, next) => {

        if (req.user && req.user.is_active) {

            next()

        } else {

            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    }
}