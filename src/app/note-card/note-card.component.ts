import { NotesavService } from './../shared/notesav.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  cardnum = null;

  // parent component will use this word to bind the event
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }

}
