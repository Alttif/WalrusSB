const mongoose = require('mongoose');

const PelaajaSchema = new mongoose.Schema({
    nimi: {
        type: String,
        required: true
    },
    pelinumero: {
        type: String,
        required: true

    },
    katisyys: {
        type: String

    },
    pelipaikka: {
        type: String
    },
    motto: {
        type: String
    }

});
const Pelaaja = mongoose.model("Pelaaja", PelaajaSchema, "pelaaja");
module.exports = Pelaaja;