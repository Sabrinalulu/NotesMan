import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { ConfigService } from './config.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { timeout } from 'q';

export class AuthServiceEvent {
  constructor(private _message: string) {
  }

  get message(): string {
    return this._message;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager: UserManager;
  private user: User = null;
  private notifications: Subject<AuthServiceEvent> = new Subject<AuthServiceEvent>();

  constructor(private configService: ConfigService) {
    //Oidc.Log.level = Oidc.Log.INFO;
    this.manager = new UserManager(configService.getClientSettings())
    this.manager.getUser().then(user => {
      this.user = user;
    });
    
    //this.manager.events.

    this.manager.signoutCallback
    this.manager.events.addUserSessionChanged(() => {
      this.notifications.next(new AuthServiceEvent("User session changed"));
          setInterval(() => {
            this.manager.signoutRedirect().then(function (resp) {
              console.log("Success");
            }).catch(function (err) {
              console.log(err);
            });
          }, 2000);
    });


    this.manager.events.addAccessTokenExpired((ev) => {
      this.notifications.next(new AuthServiceEvent("Token Expired"));
          setInterval(() => {
            this.manager.signoutRedirect().then(function (resp) {
              console.log("Success");
            }).catch(function (err) {
              console.log(err);
            });
          }, 2000);
      });

    this.manager.events.addSilentRenewError(() => {
      this.notifications.next(new AuthServiceEvent("User signed out"));
      setInterval(() => {
        this.manager.signoutRedirect().then(function (resp) {
          console.log("Success");
        }).catch(function (err) {
          console.log(err);
        });
      }, 2000);
    });

    this.manager.events.addUserSignedOut(() => {
      this.notifications.next(new AuthServiceEvent("User signed out"));
      setInterval(() => {
        this.manager.signoutRedirect().then(function (resp) {
          console.log("Success");
        }).catch(function (err) {
          console.log(err);
        });
      }, 2000);
    })

    this.manager.events.addAccessTokenExpired(() => {
      console.log("Token Expired");
      //this.notifications.next(new AuthServiceEvent("Token Expired"));
    })

    this.manager.events.addUserUnloaded(() => {
      console.log("User unloaded");
      //this.notifications.next(new AuthServiceEvent("User Unloaded"));
    })

    this.manager.events.removeSilentRenewError(() => {
      console.log("Silent Renew Error");
      //this.notifications.next(new AuthServiceEvent("Silent Renew Problem"));
    })
  }

  public get notifications$(): Observable<AuthServiceEvent> {
    return this.notifications.asObservable();
  }

  public get userInfo(): User {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  logout(): Promise<any> {
    return this.manager.signoutRedirect({ state: "1234567890" })
  }

  forceLogout(): Promise<any> {
    let settings = this.configService.getClientSettings();
    (settings as any)["post_logout_redirect_uri"] = undefined;
    let manager = new UserManager(settings);
    return manager.signoutRedirect({ state: "1234567890" })
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }
}