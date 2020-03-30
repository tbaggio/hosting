const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
    serverID: {
        type: String,
    },
    os: {
        type: String,
        enum: ["Debian", "Ubuntu"]
    },
    specs: {
        ram: Number,
        cpu: Number
    }
});

const Server = mongoose.model('server', ServerSchema)

module.exports = Server;
