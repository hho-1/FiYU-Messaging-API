"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */
// Message Model:

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "messages", timestamps: true }
);

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
MessageSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Message', MessageSchema)