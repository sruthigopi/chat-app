import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  url='http://localhost:3000/';

  constructor(private http:HttpClient,private _router:Router) { }
  loadChatHistory(room:any){
    
    var roomopts=room.split('.');
    var rooms:any={
         room:roomopts[0],
         roomalt:roomopts[1]
    }
    console.log('Loading chat..',rooms)
     return this.http.post<any>(this.url+'msg/load',rooms);
  } 
  uploadImage(formData:any){
    return this.http.post<any>(this.url+'file', formData);

  }
  searchUser(username:any){
    return this.http.post<any>(this.url+'/searchUser',{username:username});
  }

 

  // addContact(user:User,id:any){
  //   return this.http.post<any>(this.url+'/addContact/'+id,user);
  // }

  blockUser(toUser: string | null, id: string | null) {
    return this.http.post<any>(this.url+'user/blockUser/'+id,{toUser:toUser});
  }

  unblockUser(toUser: string | null, id: string | null) {
    return this.http.post<any>(this.url+'user/unblockUser/'+id,{toUser:toUser});
  }

  muteUser(toUser: string | null, id: string | null) {
    return this.http.post<any>(this.url+'user/muteUser/'+id,{toUser:toUser});
  }

  unmuteUser(toUser: string | null, id: string | null) {
    return this.http.post<any>(this.url+'user/unmuteUser/'+id,{toUser:toUser});
  }



}
