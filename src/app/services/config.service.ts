import { Injectable } from '@angular/core';
import { UserManagerSettings } from 'oidc-client';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ConfigService {
    serviceUrl: string = environment.service;
    authority: string =  environment.authority;
    clientId: string = environment.clientId;
    public getClientSettings(): UserManagerSettings {
        return {
            authority: `${this.authority}`,
            client_id: this.clientId,
            redirect_uri: `${this.serviceUrl}/auth-callback`,
            post_logout_redirect_uri: `${this.serviceUrl}/auth-logout`,
            response_type: "code",
            scope: "openid profile email",
            filterProtocolClaims: true,
            loadUserInfo: true,
            automaticSilentRenew: false
        };
    }
}