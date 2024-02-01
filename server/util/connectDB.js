require("dotenv").config();

const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DATABASE_KEY}@funix-sw.v8apyjj.mongodb.net/asm3-ecom?retryWrites=true&w=majority`;

async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { mongooseConnect };
