import { AuthenticationService } from './../../services/authentication.service';
import { NotesavService } from '../../shared/notesav.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  note: Note;
  notes: Note[] = new Array<Note>();

  // inject the service
  constructor(private authentication: AuthenticationService, private notesavService: NotesavService) { }

  ngOnInit(): void {
    this.notes = this.notesavService.getAllArr();
  }

  deleteNote(id: number){
    this.notesavService.deleteArr(id);
  }

}
