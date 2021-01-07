import { NotesavService } from './shared/notesav.service';
import { AuthService } from './services/auth-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StorageComponent } from './page/storage/storage.component';
import { NotesListComponent } from './page/notes-list/notes-list.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NotesDetailComponent } from './page/notes-detail/notes-detail.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { ConfigInfoComponent } from './config-info/config-info.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StorageComponent,
    NotesListComponent,
    NoteCardComponent,
    NotesDetailComponent,
    AuthCallbackComponent,
    AuthLogoutComponent,
    ConfigInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, NotesavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
