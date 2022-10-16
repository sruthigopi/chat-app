const express=require('express');
const http = require('http');
const socketio = require('socket.io');
var bodyParser  = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { db } = require('./model/signupmodel');

var app=new express();
const server = http.Server(app);
const io = socketio(server);
app.use(express.static(__dirname));
const userdata=require(__dirname+'/model/signupmodel');
const Messagedata = require(__dirname+'/model/Messagedata');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      var date=new Date().toDateString();
      callBack(null, `${date}_${file.originalname}`)
  }
})
const upload = multer({ storage: storage })


//variables decalaration
let clientSocketIds = [];
let connectedUsers= [];
let rooms=[];
//socket connection
io.on('connection', socket => {
  var user = socket.handshake.query.username ;
  console.log('user connected',user);

  socket.on('disconnect', () => {
      console.log("user disconnected.",user)
      connectedUsers = connectedUsers.filter(item => item.socketId != socket.id);
      io.emit('updateUserList', connectedUsers)
  });

  socket.on('loggedin', function(user) {
    clientSocketIds.push({socket: socket, userId:  user});
    connectedUsers.push({user, socketId: socket.id})
    console.log('Connected users-',connectedUsers);
    console.log('Connected sockets-',clientSocketIds);
    io.emit('updateUserList', connectedUsers)
});
socket.on('createRoom',  function(data) {
  if(rooms.includes(data.room)){
      socket.join(data.room);
  }
  else if(rooms.includes(data.roomalt)){
      socket.join(data.roomalt);
  }
  else{
      rooms.push(data.room);
      socket.join(data.room);
  }        
  io.emit('response',{mes:"Room Created "})
  let withSocket = getSocketByUserId(data.withUser.user);
  socket.broadcast.to(withSocket.id).emit("invite",{room:data})
});
socket.on('joinRoom', function(data) {
  if(rooms.includes(data.room)){
      socket.join(data.room);
  }
  else if(rooms.includes(data.roomalt)){
      socket.join(data.roomalt);
  }
});

socket.on('sendMessage', function(data) {
  roomopts=data.room.split('.');
  // console.log('rooms',roomopts);
  // console.log('Data-',data);

    
  if(rooms.includes(roomopts[0])){


    id=data.id;
    // console.log("id kya")
    console.log("id "+id)
    username=data.to
    var contact={
      name:data.to,
      // name=data.name;
      // image:req.body.image,
      isMuted:false,
      isBlocked:false
    }
    console.log("cntc"+contact);
    userdata.findOne({"_id":id})
    .then((user) =>{
           if(user.contacts.count>0){
             console.log("ysss")
           user.contacts.forEach(contact => {
             if(contact.name ==username){
   
    // .then((user) =>{
      console.log("here get"+id)
      console.log("here my name"+username)
      console.log("old");


    
          
             }//if
            })//for
            }//if
          
          else
          {
            console.log("new");
            var update = userdata.findByIdAndUpdate({"_id":id},
              { $push: { contacts: contact } },
             );
              //   {$set:{ contacts: contact } },
              //  );
               update.exec(function (err,data){
                // res.status(200).send(data);
               });
            }
         
            })
         
          
    
   
      var msg = {
          to:data.to,
          from:data.from,
          message:data.message,
          image:data.image,
          date:new Date(),
          room:roomopts[0],
          isForwarded:data.isForwarded
      }
      var msg=Messagedata(msg);
      msg.save();
      
      io.sockets.in(roomopts[0]).emit('newMessage', data);
  }

      else
      {
      var msg = {
          to:data.to,
          from:data.from,
          message:data.message,
          image:data.image,
          room:roomopts[1],
          isForwarded:data.isForwarded
      }
      var msg=Messagedata(msg);
      msg.save();
      
      
      io.sockets.in(roomopts[1]).emit('newMessage', data);
  }
})
});



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(cors());
const UserRouter = require('./src/routes/UserRouter') ();
const msgRouter = require('./src/routes/MessageRouter')();

const getSocketByUserId = (userId) =>{     //getting users
  let socket = '';
  for(let i = 0; i<clientSocketIds.length; i++) {
      if(clientSocketIds[i].userId == userId) {
          socket = clientSocketIds[i].socket;
          break;
      }
  }
  return socket;
}




app.use('/user',UserRouter);
app.use('/msg',msgRouter); 
app.post('/register',function(req,res){
  // console.log('hii')
   // console.log(req.body);
   userinfo=req.body;
   console.log(req.body)
   
   userdata.count({ name:userinfo.name}) 
   .then((count) => { 
     if (count > 0) { 
       console.log('Username exists.'); 
       res.sendStatus(404);
     } else { 
      var datas={
       name:req.body.name,
       password:req.body.password
       
      }
      var user= new userdata(datas);
      user.save();
      res.send({"message": "Data recieved"});
      // res.status(200).send({"message": "Data recieved"});

    }
    });
  })
    // function verifyToken(req,res,next){
    //   if(!req.headers.authorization){
    //       return res.status(401).send('Unauthorized request')
    //   }
    //   let token = req.headers.authorization.split(' ')[1]
    //   // console.log("tokenHEADER"+token);
    //   if(token=='null'){
    //       return res.status(401).send('Unauthorized req')
    //   }
    //   try {
    //     let payload = jwt.verify(token,'SECRET-KEY');
    //     req.userId = payload.subject
    //   } catch (err) {
    //     console.error("INVALID TOKEN SECRET KEY");
    //     return res.status(401).send("Unauthorized request. Only access to authorized entry");
    //   }
    //   next();
    // }
    app.post("/login",(req,res)=>{
      const username=req.body.user.username;
      const password=req.body.user.password
      console.log(username);
      console.log(password);
              userdata.findOne({name:username})
              .then(function(user){
                    var id=user._id;
                    console.log("User ID - ",id);
                    if(user.password == password)
                    { 
            
               let payload = {subject: username+password}
               let token = jwt.sign(payload, 'secretKey')
               res.status(200).send({token,id})
               console.log({token,id})
             //  console.log(usertype)
             res.status("valid")
            } 
  else{
      res.status(401).send('Invalid Username')
  
  }})
  
    });

    app.post('/file', upload.single('file'), (req, res, next) => {
      const file = req.file;
      console.log('Uploading file',file.filename);
      if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
      }
        res.send(file);
    })

    const port=process.env.PORT || 3000;

server.listen(port,()=>{console.log("server ready at"+port)});
