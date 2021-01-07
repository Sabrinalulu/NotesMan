import { AuthService } from './services/auth-service.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesMan';

  constructor(private authService: AuthService){}

  ngOnInit() {
  }
  
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  
  login() {
    if (!this.authService.isLoggedIn())
      this.authService.startAuthentication();
  }

  logout() {
        if (this.authService.isLoggedIn())
          this.authService.logout();
  }
}

