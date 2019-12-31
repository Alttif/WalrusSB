const mongoose = require('mongoose');

const OtteluSchema = new mongoose.Schema({
    vastustaja: {
        type: String,
        required: true
    },
    aika: {
        type: Date,
        required: true

    },
    kotipeli: {
        type: String,
        default: false
    },
    lopputulos: {
        type: String
    }

});
const Ottelu = mongoose.model("Ottelu", OtteluSchema, "ottelu");
module.exports = Ottelu;