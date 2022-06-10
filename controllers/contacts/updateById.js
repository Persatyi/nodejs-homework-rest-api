const contacts = require("../../models/contacts");
const schema = require("../../schemas/contactSchema");
const { createError } = require("../../helpers");

const updateById = async (req, res) => {
  const { error } = schema.add.validate(req.body);

  if (error) {
    throw createError(400, "missing fields");
  }

  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
