import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.css']
})
export class ChatProfileComponent implements OnInit {

  constructor() { }
  username = sessionStorage.getItem('username');


  ngOnInit(): void {
  }

}
