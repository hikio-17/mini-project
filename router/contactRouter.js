const router = require("express").Router();

// controller
const {
  listContacts,
  detailContact,
  deleteContact,
  addContact,
  formAddContact,
  formUpdateContact,
  updateContact,
  about,
} = require("../controllers/contactController");

// route
router.get("/contacts", listContacts);
router.get("/form-add-contact", formAddContact);
router.get("/form-update-contact/:id", formUpdateContact);
router.get("/contact/:id", detailContact);
router.get("/contact/delete/:id", deleteContact);

router.post("/contact/add-contact", addContact);
router.post("/contact/update-contact/:id", updateContact);

// render halaman
router.get("/about", about);

module.exports = router;
