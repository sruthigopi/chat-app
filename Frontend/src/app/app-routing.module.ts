import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import{ChatProfileComponent}from './chat/chat-profile/chat-profile.component'
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { ForwardlistComponent } from './chat/forwardlist/forwardlist.component';

const routes: Routes = [
 {path:"signup",
  component:SignupComponent
},
{
  path:"",
  component:LoginComponent
},
{
  path:"chat",
  component:ChatComponent,
  children: [{path:"",component:ChatProfileComponent
},
{path:"room",component:ChatroomComponent
},
{
  path:"frdlist",component:ForwardlistComponent
}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
