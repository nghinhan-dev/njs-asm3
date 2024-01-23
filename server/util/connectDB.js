const mongoose = require("mongoose");
const uri =
  "mongodb+srv://sillywhale:lAjCM1ugFTfMkqEK@funix-sw.v8apyjj.mongodb.net/asm3-ecom?retryWrites=true&w=majority";

async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { mongooseConnect };
