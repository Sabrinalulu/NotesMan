import { AuthenticationService } from './../services/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Note } from '../shared/note.model';
import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';

const baseURL = "http://localhost:4000/api";

@Injectable({
  providedIn: 'root'
})
export class NotesavService {

  // dbid: number[];
  currentNotes: Note;
  notes: Note[] = new Array<Note>();

  constructor(private http: HttpClient, private authenticate: AuthenticationService) {
  }

  getAll(): Observable<Note[]>{
    return this.http.get<Note[]>(baseURL+"/find-all");
  }

  //https://www.digitalocean.com/community/tutorials/js-filter-array-method
  // filter notes matching the subval
  getAllArr(){
    var subval = this.authenticate.sub();
    this.getAll().subscribe( res => { 
      console.log(res);
      this.notes = res;
      // this.dbid = this.notes.map(function(a) {return a["id"];});  
    });

    var f = function(item){
      return item.sub === subval;
    }

    const newArray = this.notes.filter(f);
    
    // console.log("this.dbid: "+JSON.stringify(this.dbid));
    console.log("this.notes: "+JSON.stringify(this.notes));
    console.log("newArray: "+JSON.stringify(newArray));
    
    return this.notes;

  }

  // check the note-detail
  // original code: return this.notes[id];
  getNote(id: number){
    console.log('running getNote');
    this.http.get<Note>(baseURL+'/selected/'+id).subscribe( res => {
      console.log(res);
      this.currentNotes = res;
      console.log(this.currentNotes);
    }); 
    return this.currentNotes;
  }

  create(note: Note): Observable<Note[]>{
    console.log('will create: '+note);
    return this.http.post<Note[]>(baseURL+"/new-a-note", note);
  }

  add(note: Note){
    console.log(note);
    this.create(note).subscribe( res => {console.log(res);});
    let newLength = this.notes.push(note);
    let index = newLength-1;
    console.log(index);
    return index;
  }

  update(id:number, note: Note): Observable<Note[]>{
    console.log('will update: '+id+"; "+note.title+"; "+note.body);
    return this.http.put<Note[]>(baseURL+'/update/'+id, note);
  }

  updateArr(id: number, title: string, body: string){
    let noteup = this.notes[id];  
    noteup.title = title;
    noteup.body = body;
    this.update(id, noteup).subscribe( res => {console.log(res)} ); 
  }

  delete(id: number): Observable<Note[]>{
    return this.http.delete<Note[]>(`${baseURL}/delete/${id}`);
  }

  deleteArr(id: number){
    this.notes.splice(id , 1);
    this.delete(id).subscribe( res => {console.log(res);} );
  }
}
