// Import the MongoDB client from the connect.js file in the db folder
const mongodb = require('../db/connect');
// Import the ObjectId class from the mongodb package
const ObjectId = require('mongodb').ObjectId;

// Define a controller function called "getAll"
const getAll = async (req, res, next) => {
  // Use the "find" method of the "contacts" collection to retrieve all documents
  const result = await mongodb.getDb().db().collection('contacts').find();
  // Convert the result to an array of objects
  result.toArray().then((lists) => {
    // Set the "Content-Type" header to "application/json"
    res.setHeader('Content-Type', 'application/json');
    // Send a JSON response with a status code of 200 and the retrieved contacts
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Define a controller function called "createContact"
const createContact = async (req, res) => {
  // Create a new object called "contact" with properties taken from the request body
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  // Insert the "contact" object into the "contacts" collection of the MongoDB database
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  // Check if the insert was successful and return a response accordingly
  if (response.acknowledged) {
    // Send a JSON response with a status code of 201 and the "response" object
    res.status(201).json(response);
  } else {
    // Send a JSON response with a status code of 500 and an error message
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};


const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};