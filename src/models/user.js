"use strict";

const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// User Model:

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    sentMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    receivedMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { collection: "users", timestamps: true }
);

/* ------------------------------------------------------- */
// Schema Configs:

const passwordEncrypt = require("../helpers/passwordEncrypt");

UserSchema.pre(["save", "updateOne"], function (next) {
  // get data from "this" when create;
  // if process is updateOne, data will receive in "this._update"
  const data = this?._update || this;

  // email@domain.com
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
    : true;

  if (isEmailValidated) {
    if (data?.password) {
      // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
      const isPasswordValidated =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+]).{8,}$/.test(
          data.password
        );

      if (isPasswordValidated) {
        this.password = data.password = passwordEncrypt(data.password);
        this._update = data; // updateOne will wait data from "this._update".
      } else {
        next(new Error("Password not validated."));
      }
    }

    next(); // Allow to save.
  } else {
    next(new Error("Email not validated."));
  }
});
/* ------------------------------------------------------- */
// FOR REACT PROJECT:
UserSchema.pre("init", function (data) {
  data.id = data._id;
  data.createds = data.createdAt.toLocaleDateString("tr-tr");
});
/* ------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
