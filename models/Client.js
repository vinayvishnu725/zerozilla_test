const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
    {
        ClientId: {
            type: String,
            required: true,
        },
        AgencyId: {
            type: String,
            required: true,
        },
        ClientName: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: String,
            required: true,
        },
        TotalBill:{
            type:Number,
            required:true
        }

    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("clients", ClientSchema);