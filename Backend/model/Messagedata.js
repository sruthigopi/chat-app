const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/chatapp');
mongoose.connect('mongodb+srv://userone:userone@cluster0.evox0ui.mongodb.net/LibraryDB?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const MessageSchema =  new Schema({
    to: String,
    from: String,
    isForwarded:Boolean,
    message:String,
    image:String,
    date:{type:Date , default:Date.now},
    room:String
    
});


var Messagedata = mongoose.model('messagedata',MessageSchema);

module.exports = Messagedata;