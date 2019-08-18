const Message = require('../models/Message');
const Contact = require('../models/Contact');


const createMessage = async (req, res, next) => {
  const { receiver, text } = req.body;
  const { phoneNumber } = req.user;
  const contact = await Contact.findOne({ phoneNumber: receiver, createdBy: phoneNumber });
  if(contact) {
    let message = new Message({
      sender: phoneNumber,
      receiver,
      text,
      read: false
    });
    try {
      await message.save();
      res.status(201).json({ message: 'Message sent successfully' })
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "An error occured" })
    }
  } else {
    res.status(400).json({ message: "No contact found" })
  }
};

const getAllMessages = async (req, res, next) => {
  const { phoneNumber } = req.user;
  const messages = await Message.find().or([{ sender: phoneNumber }, { receiver: phoneNumber }]);
  if (messages.length) {
    res.status(200).json({messages})
  } else {
    res.status(400).json({ message: "No messages found" })
  }
};

const getOneMessage = async (req, res, next) => {
  const { id } = req.params;
  const { phoneNumber } = req.user;
  const message = await Message.find({ _id: id }).or([{ sender: phoneNumber }, { receiver: phoneNumber }]);
  if (message.length) {
    res.status(200).json({ message })
  } else {
    res.status(400).json({ message: "No message found" })
  }
};

const updateMessage = async (req, res, next) => {
  const { id } = req. params;
  const { text } = req.body;
  const { phoneNumber } = req.user;
  const message = await Message.find({ _id: id }).or([{ sender: phoneNumber }, { receiver: phoneNumber }]);
  if(message) {
    console.log(message);
    message[0].text = text;
    message[0].save();
    res.status(200).json({ message: "Message updated" })
  } else {
    res.status(400).json({ message: "No message found" })
  }
};

const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  const { phoneNumber } = req.user;
  Message.findOneAndDelete({ _id: id, sender: phoneNumber }, (err) => {
    if(err) {
      res.status(400).json({ message: "An error occured" })
    }
    res.status(200).json({ message: "Message deleted" })
  })

};

module.exports = {createMessage, getAllMessages, getOneMessage, updateMessage, deleteMessage};
