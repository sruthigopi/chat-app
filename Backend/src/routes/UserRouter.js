const express = require('express');
const authRouter = express.Router();
const jwt = require ('jsonwebtoken');
const { update } = require('../../model/signupmodel');

const Userdata = require('../../model/signupmodel');

function router() {
    authRouter.get('/getUser/:id',function(req,res){
        const id = req.params.id;
        console.log("err"+id)
        Userdata.findOne({"_id":id})
          .then((user)=>{
              res.send(user);
          });
    })

     //block User

     authRouter.post('/blockUser/:id',function (req,res){
         console.log("blockkkkkk")
        const id = req.params.id;
        const toUser = req.body.toUser;
        unblock=Userdata.findByIdAndUpdate({"_id":id})
        .then((user) =>{
               
               user.contacts.forEach(contact => {
                 if(contact.name == toUser){
                  contact["isBlocked"] = true;              
                 }                           
               });
               user.save();
              
              //  console.log(contacts)
              console.log('Blocked in DB',user)
              res.status(200);
          })
          // unblock.exec(function (err,data){
          //   // res.status(200).send(data);
          //  })
      })  
  
      //unblock user
      authRouter.post('/unblockUser/:id',function (req,res){
        const id = req.params.id;
        const toUser = req.body.toUser;
        Userdata.findByIdAndUpdate({"_id":id})
        .then((user) =>{
               
               user.contacts.forEach(contact => {
                 if(contact.name == toUser){
                  contact["isBlocked"] = false;              
                 }                             
               });
               user.save();
              console.log('Unblocked in DB',user)
              res.status(200);
          })
      })  
      authRouter.post('/muteUser/:id',function (req,res){
        const id = req.params.id;
        const toUser = req.body.toUser;
        Userdata.findOne({"_id":id})
        .then((user) =>{
               
               user.contacts.forEach(contact => {
                 if(contact.name == toUser){
                  contact["isMuted"] = true;              
                 }                             
               });
               user.save();
              console.log('Muted in DB',user)
              res.status(200);
          })
      })  
  
      authRouter.post('/unmuteUser/:id',function (req,res){
        const id = req.params.id;
        const toUser = req.body.toUser;
        Userdata.findOne({"_id":id})
        .then((user) =>{
               
               user.contacts.forEach(contact => {
                 if(contact.name == toUser){
                  contact["isMuted"] = false;              
                 }                             
               });
               user.save();
              console.log('Unmuted in DB',user)
              res.status(200);
          })
      })  
        

    return authRouter;
}

module.exports = router;