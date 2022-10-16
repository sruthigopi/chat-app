import { HttpEvent ,HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req: HttpRequest<any>, next:any): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthserviceService);
    let tokenizedReq = req.clone(
      {
        setHeaders:{
          Authorization:`Bearer ${authService.getToken()}`
        }
      }

    )
    return  next.handle(tokenizedReq);
}
}
