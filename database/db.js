const mongoose = require("mongoose");
const { addContact } = require("../controllers/contactController");

const db = "mongodb://127.0.0.1:27017/mahasiswa";

// koneksi ke mongodb
const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(db, {
      useUnifiedTopology: true,
    });
    console.log("Connection to Database successfully..");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
