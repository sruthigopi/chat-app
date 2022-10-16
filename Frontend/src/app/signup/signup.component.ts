import { Component, OnInit } from '@angular/core';
import { SignupModel } from './signup.model';
import { FormBuilder , Validators} from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // signupform=this.fb.group({

  //   name:['',Validators.required],
  //   email:['',Validators.required],
  //     password:['',[Validators.required,Validators.minLength(3)]],
  //   retypepass:['',Validators.required]
  //    })

  constructor(private _auth:AuthserviceService,private _router:Router) { }
  userdata=new SignupModel('','','','',[])
  User:SignupModel={
    name:'',
    email:'',
    password:'',
    repsw:'',
    contacts:[],
  };
  errorMsg='';
  successMsg='';

  ngOnInit(): void {
  }
  signup(){
    this._auth.signup(this.userdata)
.subscribe(
  data => {console.log('Success!',data);
            this.errorMsg='';
            this.successMsg =" User registered successfully! Please Login"
            this._router.navigate(['/']);
           
           },
   error =>{ switch(error.status){
                //  case 401:
                //    this.errorMsg="Email ID is already registered! Please login"
                //    break;
               case 404:
                 this.errorMsg="Username is already Exist!"
                   break;
               default:
                 this.errorMsg="Unknown Server-side Error"
              }

             }      
)
  //  this._router.navigate(['login']);
  }
}
