import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  token:any;
  constructor(private http:HttpClient,private _router:Router) { }
  userdata(user:any){
   return this.http.post<any>('http://localhost:3000/login',{user})
    

  }
  signup(userdata:any){
   // console.log(userdata);
    return this.http.post('http://localhost:3000/register',userdata)
    // .subscribe(
    //   (res)=>console.log(res),
    //   (err)=>console.log(err)
      
    // );
  }
  getUser(id: any) {
    // console.log("id here"+id);
   return this.http.get<any>("http://localhost:3000/user/getUser/"+id); 
  }
  loggedIn()
  {
    return !!localStorage.getItem('token')

  }
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    this._router.navigate(['/']);
  
   }
  getToken(){
 
    if(this.loggedIn()){
      this.token=localStorage.getItem('token')
      return this.token
    }  
  }
}
