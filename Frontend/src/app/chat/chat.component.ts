import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { SignupModel } from '../signup/signup.model';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
id:any;
user:SignupModel={
  name:'',
  email:'',
  password:'',
  repsw:'',
  // image:'',
  contacts:[]
}
username = sessionStorage.getItem('username');
onlineUserList:any =[];
message:string='';
contactsList:Array<{name:string,isMuted: boolean, isBlocked: boolean,image?:string}>  =[];
displayOnlineUsers=true;

  constructor(private _auth:AuthserviceService,private _router:Router,private _socket:SocketService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    console.log("idee"+this.id);
this._auth.getUser(this.id)
.subscribe((data)=>{
this.user=JSON.parse(JSON.stringify(data));
console.log('LOGGED IN USER DATA-',this.user);

// this.contactsList=this.user.contacts;
// console.log('Contact Users-',this.contactsList);

})
console.log('Username from Component after Login:',this.username);
this._socket.emit('loggedin',this.username);

this._socket.listen('updateUserList').subscribe((data)=>{
this.onlineUserList=JSON.parse(JSON.stringify(data));
console.log('Users online:',this.onlineUserList);
console.log('Users '+data);

this._socket.listen('response').subscribe((data) => {
  this.message =(JSON.parse(JSON.stringify(data))).mes;
  console.log(this.message);
  }) 

})

} 
  DisplayOnlineUsers(){
    // this.displayMyContacts=false;
    this.displayOnlineUsers=true;
    }
    createRoom(withUser:any){
      var room = this.username+withUser.user;
      var roomalt=withUser.user+this.username;
      sessionStorage.setItem('toUser',withUser.user);
      sessionStorage.setItem('roomName',room+"."+roomalt);
      console.log('Creating room -',room,' with..',withUser);
      this._socket.emit('createRoom',{currentUser:this.username,withUser:withUser,room:room,roomalt:roomalt});
      this._router.navigate(['chat/room']);
      };

}
