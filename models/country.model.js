const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamp: true }
);

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
