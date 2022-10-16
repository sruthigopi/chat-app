const mongoose=require('mongoose');
const Schema=mongoose.Schema;
MongoUrl='mongodb+srv://userone:userone@cluster0.evox0ui.mongodb.net/LibraryDB?retryWrites=true&w=majority';
mongoose.connect(MongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("MongoDB Connected Successfully");})
.catch(err=>{console.log("Error from MongoDB: "+err);})   // Error Handling for MongoDB
const UserSchema=new Schema({
    name:String,
    email:String,
    password:String,
    contacts:[{ name: String,isMuted:Boolean,isBlocked:Boolean}]

   // repsw:String
});
var userdata=mongoose.model('userdata',UserSchema);
module.exports =userdata; 
