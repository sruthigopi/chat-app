import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
// import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { AuthserviceService } from './authservice.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { ChatComponent } from './chat/chat.component';
import { ChatProfileComponent } from './chat/chat-profile/chat-profile.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { ForwardlistComponent } from './chat/forwardlist/forwardlist.component';
import { ChatheaderComponent } from './chatheader/chatheader.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
   LoginComponent,
    ChatComponent,
    ChatProfileComponent,
    ChatroomComponent,
    ForwardlistComponent,
    ChatheaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
FormsModule,
ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers: [
    AuthserviceService,
    FormsModule,
    HttpClientModule,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
