import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-chatheader',
  templateUrl: './chatheader.component.html',
  styleUrls: ['./chatheader.component.css']
})
export class ChatheaderComponent implements OnInit {

  constructor( private _auth:AuthserviceService) { }

  ngOnInit(): void {
  }
logout(){
  this._auth.logout();
}
}
