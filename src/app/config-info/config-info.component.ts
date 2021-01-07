import { AuthService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-config-info',
  templateUrl: './config-info.component.html',
  styleUrls: ['./config-info.component.css']
})
export class ConfigInfoComponent implements OnInit {

  constructor(private config: ConfigService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get configData(): string {
    return JSON.stringify(this.config.getClientSettings(), null, 2);
  }

  get user(): string {

    // var obj = JSON.stringify(this.authService.userInfo,  null, 1);
    // console.log(obj);
    // var parsedData = JSON.parse(obj);
    // console.log(parsedData);
    // console.log(parsedData.id_token);
    return JSON.stringify(this.authService.userInfo, null, 1);

  }

}
