const mongoose = require('mongoose');

const OtteluSchema = new mongoose.Schema({
    vastustaja: {
        type: String,
        required: true
    },
    aika: {
        type: Date,


    },
    kotipeli: {
        type: String,
        default: false
    },
    lopputulos: {
        type: String
    }


});
const Ottelu = mongoose.model("Ottelu", OtteluSchema);
module.exports = Ottelu;