const Contact = require("../models/contact");
const validator = require("validator");

// function render halaman form kontak
exports.formAddContact = (req, res) => {
  res.render("add-contact", {
    layout: "../layout/main-layout",
    title: "Halaman Form Add Kontak",
    errors: [],
  });
};

// function render halaman update kontak
exports.formUpdateContact = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id });
  res.render("update", {
    layout: "../layout/main-layout",
    title: "Halaman Form update Kontak",
    errors: [],
    contact,
  });
};

// function render halaman about
exports.about = (req, res) => {
  res.render("about", {
    layout: "../layout/main-layout",
    title: "about",
  });
};

// funtion untuk menampilkan seluruh data kontak mahasiswa
exports.listContacts = async (req, res) => {
  const contacts = await Contact.find({}).exec();
  res.render("contact", {
    layout: "../layout/main-layout",
    title: "Halaman Kontak",
    contacts,
    msg: req.flash("msg"),
  });
};

// function melihat detail kontak mahasiswa
exports.detailContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id }).exec();

    res.status(200).render("detail", {
      layout: "../layout/main-layout",
      title: "Halaman Detail",
      contact,
    });
  } catch (error) {
    console.log("DETAIL KONTAK ERROR ===>", error);
  }
};

// function remove kontak mahasiwa
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete({
      _id: req.params.id,
    }).exec();

    req.flash("msg", "Data contact berhasil dihapus");
    res.status(200).redirect("http://localhost:5000/api/contacts");
  } catch (error) {
    console.log("DELETE KONTAK ERROR ===>", error);
  }
};

exports.addContact = async (req, res) => {
  const data = req.body;

  try {
    // mengkap error dari inputan user example:duplikat name, email tidak valid, no hp tidak valid
    let errors = [];
    console.log(errors.length);

    // check duplikat nama
    const existContact = await Contact.findOne({ name: data.name });
    console.log(typeof existContact);
    if (existContact) {
      errors.push("Nama yang anda gunakan sudah terdaftar");
    }
    if (!validator.isEmail(data.email)) {
      errors.push("Email yang anda gunakan tidak valid");
    }
    if (!validator.isMobilePhone(data.nohp, "id-ID")) {
      errors.push("Nomor Handphone yang anda gunakan tidak valid");
    }
    if (errors.length > 0) {
      res.render("add-contact", {
        layout: "../layout/main-layout",
        title: "Halaman tambah kontak",
        errors,
      });
    } else {
      await new Contact(data).save();
      req.flash("msg", "Data contact berhasil ditambahkan");
      res.status(201).redirect("http://localhost:5000/api/contacts");
    }
  } catch (error) {
    console.log("ADD KONTAK ERROR ===>", error);
  }
};

exports.updateContact = async (req, res) => {
  const data = req.body;
  const contact = await Contact.findOne({ _id: req.params.id });
  try {
    let errors = [];

    if (!validator.isEmail(data.email)) {
      errors.push("Email yang anda gunakan tidak valid");
    }
    if (!validator.isMobilePhone(data.nohp, "id-ID")) {
      errors.push("Nomor Handphone yang anda gunakan tidak valid");
    }
    if (errors.length > 0) {
      res.render("update", {
        layout: "../layout/main-layout",
        title: "Halaman tambah kontak",
        contact,
        errors,
      });
    } else {
      await Contact.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      }).exec();
      req.flash("msg", "Data contact berhasil ditambahkan");
      res.status(200).redirect("http://localhost:5000/api/contacts");
    }
  } catch (error) {
    console.log("UPDATE KONTAK ERROR ===>", error);
  }
};
