const contacts = require("../../models/contacts");
const schema = require("../../schemas/contactSchema");
const { createError } = require("../../helpers");

const addContact = async (req, res) => {
  const { error } = schema.add.validate(req.body);

  if (error) {
    throw createError(400, "missing required name field");
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
