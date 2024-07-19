"use strict"


const { mongoose } = require('../configs/dbConnection')


/* ------------------------------------------------------- */
// Group Model:

const GroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      trim: true,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupPic: {
      type: String,
      trim: true,
    },
  },
  { collection: "groups", timestamps: true }
);

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
GroupSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Group', GroupSchema)