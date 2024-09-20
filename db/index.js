const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();

async function initDatabase(){
         await mongoose.connect(process.env.MONGO_URL)
         .then(() => {
            console.log("Connected to Database");
          })
          .catch((err) => {
            console.log("Not Connected to Database ERROR! ", err);
          });
}

module.exports = { initDatabase }