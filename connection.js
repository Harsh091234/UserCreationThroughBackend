const mongoose = require("mongoose");

function connectToMongoDB(path) {
    mongoose.connect(path);

}

module.exports = {
    connectToMongoDB
}