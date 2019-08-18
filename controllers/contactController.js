const Contact = require('../models/Contact');
const Message = require('../models/Message');

const createContact = async (req, res, next) => {
  const { phoneNumber, username } = req.body;
  if (!phoneNumber || !username){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  Contact.findOne({ phoneNumber },  (error, contact) => {
    if (contact){
      res.status(409).json({
        message: 'Contact already exists'
      })
    }
  });
  if(phoneNumber === req.user.phoneNumber || username === req.user.username){
    res.status(409).json({
      message: 'You cannot create your own contact'
    })
  } else {
    let contact;
    contact = await Contact.find({phoneNumber, createdBy: req.user.phoneNumber}).exec();
    if(!contact.length) {
      contact = new Contact({
        username,
        phoneNumber,
        createdBy: req.user.phoneNumber
      });
      await contact.save(function(err){
        if(err){
          res.status(500).json({
            message: 'An error occurred while creating the contact'
          })
        } else {
          res.status(201).json({
            message: 'Contact was created successfully', contact
          })
        }
      })
    }
  }
};

const getOne = async (req, res, next) => {
  const contact = await Contact.findOne({
    _id: req.params.id
  }).exec();
  return contact
    ? res.status(200).json({contact})
    : res.status(404).json({ message: 'Contact Not Found' })
};

 const getAll = async (req, res, next) => {
  const contacts = await Contact.find({
    createdBy: req.user.phoneNumber
  }).exec();
  return contacts.length
    ? res.status(200).json({contacts})
    : res.status(404).json({ message: 'Contact Not Found' })
};

 const deleteContact = async (req, res, next) => {
  const contact = await Contact.findOne({
    _id: req.params.id
  }).exec();
   if(contact){
     Message.deleteMany({ receiver: contact.phoneNumber }, (err) => {
       if(err) {
         res.status(400).json({ message: "An error occurred while deleting the contact" })
       }
     });
     Message.deleteMany({ sender: contact.phoneNumber }, (err) => {
       if(err) {
         res.status(400).json({ message: "An error occurred while deleting the contact" })
       }
     });
     await Contact.deleteOne({ phoneNumber: contact.phoneNumber });
    res.status(204).json({ message: 'Contact and Related Messages Successfully Deleted' })
  } else {
    res.status(404).json({ message: 'Contact Not Found' })
  }
};

 module.exports = {createContact, getAll, getOne, deleteContact};
