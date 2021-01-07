import { AuthenticationService } from './../../services/authentication.service';
import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../../shared/note.model';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  //  instantiate the object (being typescript, an object of the correct shape) as you are defining a type
  note: Note = new Note();

  constructor(private authService: AuthService, private authentication: AuthenticationService) {}

  ngOnInit(): void {
    // this.note = new Note();
    this.note.sub = this.authentication.sub();
    console.log(this.note.sub);
  }

}
