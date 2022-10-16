import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';
import { SignupModel } from 'src/app/signup/signup.model';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-forwardlist',
  templateUrl: './forwardlist.component.html',
  styleUrls: ['./forwardlist.component.css']
})
export class ForwardlistComponent implements OnInit {
  id = sessionStorage.getItem('userId');
  username = sessionStorage.getItem('username');
  toUser = sessionStorage.getItem('toUser');
  message:any;
  user:SignupModel ={
    name:'',
    email:'',
    password:'',
    repsw:'',
    // image:'',
    contacts:[]
    
  }
  constructor(private _auth:AuthserviceService,private _router:Router,private _socket:SocketService) {
console.log(this._router.getCurrentNavigation()?.extras.state)

   }
  contactsList: { name: string; isMuted: boolean; isBlocked: boolean; }[] | undefined;


  ngOnInit(): void {
    
this._auth.getUser(this.id).subscribe((data)=>{
  this.user=JSON.parse(JSON.stringify(data));
  console.log('LOGGED IN USER DATA-',this.user);
  // console.log('Contact Users-',this.user.contacts);
  this.contactsList=this.user.contacts;
  console.log('Contact Users-',this.contactsList);
  }
)
// console.log(this._router.getCurrentNavigation().extras.state);

// this.message=message;
this.message=history.state.message;
console.log("msg"+this.message)

}
forwardMessage(i:any){
  console.log('forwarding to..',i.name);

    var room = this.username+i.name;
    var roomalt=i.name+this.username;
    var rooms=room+"."+roomalt;
    this._socket.emit('sendMessage', {room:rooms, message:this.message, from: this.username,to:i.name,isForwarded:true});
    alert(' Forwarded!')
    this._router.navigate(['chat/room']);

    
  };
}

