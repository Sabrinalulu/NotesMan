import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  public message: string = "Auth callback"
  constructor(private authService: AuthService, private authentication: AuthenticationService, private router: Router) { }

  async ngOnInit() {
    await this.authService.completeAuthentication().then(() => {
      this.router.navigate(["../page/storage"]);
    })
      .catch(async ex => {
        this.message = "Error:" + ex.message + "\nDelete [_session] cookie to enable login \Redirecting to logout... ";
        setTimeout(async () => {
          await this.authService.forceLogout();
          this.router.navigate(["../home"]);
        }, 5000);
      });
  }

}
