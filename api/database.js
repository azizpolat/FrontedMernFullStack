const mongoose = require("mongoose");

const database = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MONGODB BAĞLANTISI KURULDU");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = database;
