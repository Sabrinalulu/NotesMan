import { ConfigInfoComponent } from './config-info/config-info.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { NotesDetailComponent } from './page/notes-detail/notes-detail.component';
import { NotesListComponent } from './page/notes-list/notes-list.component';
import { StorageComponent } from './page/storage/storage.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth-service.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth-callback', component: AuthCallbackComponent},
  {path: 'auth-logout', component: AuthLogoutComponent},
  //canActivate: [AuthGuardService]
  {path: 'page', canActivate: [AuthGuardService], children:[
    {path: 'storage', component: StorageComponent},
    {path: 'notes-list', component: NotesListComponent},
    {path: 'notes-detail', component: NotesDetailComponent},
    {path: 'notes-detail/:id', component: NotesDetailComponent}
  ]},
  {path: 'config-info', canActivate: [AuthGuardService], component: ConfigInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule { }
