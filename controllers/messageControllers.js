const Message = require('../models/Message');
const Contact = require('../models/Contact');


const createMessage = async (req, res, next) => {
  const { receiver, text } = req.body;
  const { phoneNumber } = req.user;
  if (!receiver || !text){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
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
      res.status(201).json({ message: 'Message sent successfully', sent_message: message })
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "An error occurred while creating the message" })
    }
  } else {
    res.status(404).json({ message: "No contact found" })
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
  if (!phoneNumber){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  const message = await Message.find({ _id: id }).or([{ sender: phoneNumber }, { receiver: phoneNumber }]);
  if (message.length) {
    res.status(200).json({ message })
  } else {
    res.status(404).json({ message: "No message found" })
  }
};

const updateMessage = async (req, res, next) => {
  const { id } = req. params;
  const { text } = req.body;
  if (!text){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  Message.findOneAndUpdate({_id: id}, {$set: {text: text}}, {useFindAndModify: false}, (err, message) => {
    if (err) {
      res.status(400).json({ message: "An error occurred while updating the message" });
    }
    else {
      res.status(200).json({ message: "Message was Successfully Updated", updated_message: message });
    }
  });
};

const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  const { phoneNumber } = req.user;
  Message.findOneAndDelete({ _id: id, sender: phoneNumber }, (err) => {
    if(err) {
      res.status(400).json({ message: "An error occurred while deleting the message" })
    }
    res.status(204).json({ message: "Message Successfully Deleted" })
  })

};

module.exports = {createMessage, getAllMessages, getOneMessage, updateMessage, deleteMessage};
