import { async } from '@angular/core/testing';
import { AuthenticationService } from './../../services/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesavService } from '../../shared/notesav.service';
import { Note } from '../../shared/note.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css']
})
export class NotesDetailComponent implements OnInit {

  note: Note;
  noteID: number;
  new: boolean;

  constructor(private authenticate: AuthenticationService, private notesavService: NotesavService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    // find out if we are creating a new note or editing an existing note
    // if there is a change, the callback function will be executed
    // err sol. Looks like you’re using the component as both the parent and the child? It will only be defined in the component loaded in the /:id route
    this.route.params.subscribe((params:Params) => {

      this.note = new Note();

      if(params.id){
        
        const promise = this.transferNote(params.id);
        this.note = promise;
        console.log("this.note after transfering: "+this.note);
        this.noteID = params.id;
        // editing
        this.new = false;
      }else{
        this.new = true;
      }
    });

  }

  onSubmit(form: NgForm){

    form.value.sub = this.authenticate.sub();

    if(this.new){
      // save the note
      console.log(this.noteID+";"+form.value.title+";"+form.value.body);   
      this.notesavService.add(form.value);
      this.router.navigateByUrl('page/storage');
    }else{
      console.log("Edit: "+this.noteID+";"+form.value.sub+";"+form.value.title+";"+form.value.body);
      this.notesavService.updateArr(this.noteID, form.value.title, form.value.body);
      this.router.navigateByUrl('page/storage');
    }
  }

  cancel(){
    this.router.navigateByUrl('page/storage');
  }

  transferNote(params: Params){
    var temp = this.notesavService.getNote(params.id);
    return temp;
  }

}
