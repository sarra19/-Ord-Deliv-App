const mongoose = require("mongoose");
const colors = require("colors");

module.exports = {
  Connect: async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`DB connected on: ${conn.connection.host}`.underline.magenta);
    } catch (error) {
      console.log(error.message);
    }
  },
};
