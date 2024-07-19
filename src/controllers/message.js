"use strict";

// Message Controller:

const Message = require("../models/message");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "List Messages"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    try {
      const data = await res.getModelList(Message);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Create Message"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Message' }
            }
        */

    try {
      const data = await Message.create(req.body);
      await Contribution.findByIdAndUpdate(data.contribution_id, {
        $push: { comments: data.id },
        $inc: { comment_count: 1 },
      });
      res.status(201).send({ error: false, data });
    } catch (err) {
      res.status(400).send({ error: true, message: err.message });
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Get Single Message"
        */

    try {
      const data = await Message.findById(req.params.id);
      res.status(200).send({ error: false, data });
    } catch (err) {
      res.status(404).send({ error: true, message: err.message });
    }
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Update Message"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Message' }
            }
        */

    try {
      const data = await Message.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(202).send({ error: false, data });
    } catch (err) {
      res.status(400).send({ error: true, message: err.message });
    }

    // const data = await Message.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

    // res.status(202).send({
    //     error: false,
    //     data,
    //     new: await Message.findOne({ _id: req.params.id })
    // })
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Delete Message"
        */

    try {
      const Message = await Message.findOne({ _id: req.params.id });
      if (!Message)
        return res
          .status(404)
          .send({ error: true, message: "Message not found" });

      await Contribution.findByIdAndUpdate(Message.contribution_id, {
        $pull: { Messages: Message.id },
        $inc: { Message_count: -1 },
      });

      await Message.deleteOne({ _id: req.params.id });

      res.status(204).send({ error: false, data: comment });
    } catch (err) {
      res.status(500).send({ error: true, message: err.message });
    }
  },
};
