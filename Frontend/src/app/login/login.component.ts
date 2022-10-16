import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg='';

  user={username:'',
  password:''
};
  constructor(private _auth:AuthserviceService,private _router:Router) { }
 
  ngOnInit(): void {
  }
  userVarify(){
    //console.log(this.user);
    this._auth.userdata(this.user)
    .subscribe(
      res => {
        
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.id);
        sessionStorage.setItem('username', this.user.username)
        console.log('from login ID= ' +res.id);
        console.log('username- '+ this.user.username);
      //  localStorage.setItem('usertype',res.usertype)
        this._router.navigate(['chat'])
      },
      err => {
        console.log(err);
        alert("invalid userdetails")
        this._router.navigate(['login'])
      }
    );
  }
}
