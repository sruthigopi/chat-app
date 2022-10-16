import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/action.service';
import { AuthserviceService } from 'src/app/authservice.service';
import { SignupModel } from 'src/app/signup/signup.model';
import { SocketService } from 'src/app/socket.service';
import { Message } from '../message';
import * as moment from 'moment';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  id = sessionStorage.getItem('userId');
  username = sessionStorage.getItem('username');
  toUser = sessionStorage.getItem('toUser');
  user:SignupModel ={
    name:'',
    email:'',
    password:'',
    repsw:'',
    // image:'',
    contacts:[]
    
  }
  room=sessionStorage.getItem('roomName');
  messageArray:Array<Message>=[];
  images:any;
  updatedImage:any;
  newMessage='';
  forwardedMessage:string='';
  forwardedImage:any;
  displayOnlineUsers=true;
  onlineUserList:any =[];
   val:any
  isBlocked:boolean | undefined;
  isMuted:boolean | undefined;
  contactsList: { name: string; isMuted: boolean; isBlocked: boolean; }[] | undefined;

  constructor(private _auth:AuthserviceService,private _router:Router,private _socket:SocketService,private _action:ActionService) { }

  ngOnInit(): void {

//#1

this._auth.getUser(this.id).subscribe((data)=>{
  this.user=JSON.parse(JSON.stringify(data));
  console.log('LOGGED IN USER DATA-',this.user);
  // console.log('Contact Users-',this.user.contacts);
  this.contactsList=this.user.contacts;
  console.log('Contact Users-',this.contactsList);
  this.contactsList.forEach(element => {
      if(element.name==this.toUser){
        console.log('Contact Details-',element)
        this.isBlocked=element.isBlocked;
        this.isMuted=element.isMuted;
      }      
  });

})







this._action.loadChatHistory(this.room).subscribe((chats) =>{
  console.log('chats history',chats)
  this.messageArray=JSON.parse(JSON.stringify(chats));
  this.messageArray.forEach(element => {
    element.date = moment().format('lll');
  });
})

this._socket.listen('newMessage').subscribe((data) =>{   
var newmsg=JSON.parse(JSON.stringify(data));
var msg={
    from:newmsg.from,
    to:newmsg.to,
    message:newmsg.message,
    image:newmsg.image,
    room:newmsg.room,
    isForwarded:false,
    date:(new Date()).toString()
}
  this.messageArray.push(msg);    
})

}



// DisplayOnlineUsers(){

//   this.displayOnlineUsers=true;
//   }

sendMessage(){
 console.log('new message-', this.newMessage);
 if(this.isBlocked==true){
   alert("You were blocked by"+this.toUser)
 }
 else
 if(this.images){
  const formData = new FormData();
  formData.append('file', this.images);
 this._action.uploadImage(formData)
 .subscribe(
  (res) => {console.log(res)
            this.images='';
            this.updatedImage=res.filename;
            console.log(this.updatedImage);
            this._socket.emit('sendMessage', {id:this.id ,room: this.room, message:this.newMessage, from: this.username,to:this.toUser,image:this.updatedImage,isForwarded:false});
          },
  (err) => console.log(err)
 )} 

 else{
  this._socket.emit('sendMessage', {id:this.id ,room: this.room, message:this.newMessage, from: this.username,to:this.toUser,image:null,isForwarded:false});
 }
}

selectImage(event:any) {
if (event.target.files.length > 0) {
  const file = event.target.files[0];
  this.images = file;
}
}

blockUser(){
var res=confirm('Are you sure you want to block this user?');
if(res){
  this.isBlocked=!this.isBlocked;
  this._action.blockUser(this.toUser,this.id)
  .subscribe((res) => {
    console.log('Blocked!');
  })    
}

}
unblockUser(){
this.isBlocked=!this.isBlocked;
this._action.unblockUser(this.toUser,this.id)
.subscribe((res) => {
  console.log('UnBlocked!');
})    
}
muteUser(){
var res=confirm('Are you sure you want to mute this user?');
if(res){
  this.isMuted=!this.isMuted;
  this._action.muteUser(this.toUser,this.id)
  .subscribe((res) => {
    console.log('Muted!')
  })       
}
}
unmuteUser(){
this.isMuted=!this.isMuted;
this._action.unmuteUser(this.toUser,this.id)
.subscribe((res) => {
  console.log('Unmuted!');
})    
}
closeChat(){
this._router.navigate(['/chat']);

}

saveForwardData(message:any){
console.log('Forwarding data..',message);
this.forwardedMessage=message.message;
this.forwardedImage=message.image;

}
displaycontact(message:any)
{
  // this.val=document.getElementById('cnt')
  // if(this.val.style.display == 'none')
  // {
  //   console.log("if")
  //   this.val.style.display = 'block'
  // }
  // else
  // console.log("els")
 message=message;
  this._router.navigate(['chat/frdlist'],{state:message});

}
 

//   if(this.val.style.display === 'none')
// //   {

// //  this.val.style.display ='block';
// //   }
// //   else

// //   this.val.style.display = 'none'


forwardMessage(i:any,message:any){
  this.forwardedMessage=message.message;
this.forwardedImage=message.image;
console.log('forwarding to..',i.name,this.forwardedMessage,this.forwardedImage);

  var room = this.username+i.name;
  var roomalt=i.name+this.username;
  var rooms=room+"."+roomalt;
  this._socket.emit('sendMessage', {room:rooms, message:this.forwardedMessage, from: this.username,to:i.name,image:this.forwardedImage,isForwarded:true});
  alert(' Forwarded!')
};


}
