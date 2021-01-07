import { AuthService } from './auth-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // subval: number;

  constructor(private authService: AuthService) { }

  sub(){

    // setting the object and pass the object (regard it as a note object)
    var obj = JSON.stringify(this.authService.userInfo, null, 1);
    var parsedData = JSON.parse(obj);
    // this.subval = parsedData.profile.sub;
    // console.log(this.subval);
    return parsedData.profile.sub;

  }
}

