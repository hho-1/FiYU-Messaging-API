"use strict";

// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with email and password for get simpleToken'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user && user.password == passwordEncrypt(password)) {
        // TOKEN:
        let tokenData = await Token.findOne({ userId: user._id });
        if (!tokenData)
          tokenData = await Token.create({
            userId: user._id,
            token: passwordEncrypt(user._id + Date.now()),
          });

        res.send({
          error: false,
          key: tokenData.token,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter email and password.");
    }
  },

  register: async (req, res) => {
    const { email } = req.body;

    await User.create(req.body);

    const user = await User.findOne({ email });

    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData)
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(user._id + Date.now()),
      });

    res.send({
      error: false,
      key: tokenData.token,
      user,
    });
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

    const auth = req.headers?.authorization || null; // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

    let message = null,
      result = {};

    if (tokenKey) {
      // SimpleToken

      result = await Token.deleteOne({ token: tokenKey[1] });
      message = "Token deleted. Logout was OK.";
    }

    res.send({
      error: false,
      message,
      result,
    });
  },
};
