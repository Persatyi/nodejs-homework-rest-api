const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { isValidId, validation } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addContact), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.addContact),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
