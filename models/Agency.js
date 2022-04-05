const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgencySchema = new Schema(
    {
      AgencyId: {
        type: String,
        required: true,
      },
      AgencyName: {
        type: String,
        required: true,
      },
      Address1: {
        type: String,
        required: true,
      },
      Address2: {
        type: String,
        // required: true,
      },
      State: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      PhoneNumber: {
        type: Number,
        required: true,
      },
     
    },
    {
      timestamps: true,
    }
  );


module.exports = mongoose.model("agency",AgencySchema);