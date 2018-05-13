import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { UserService } from '../services/userService';
import { CharacterService } from '../services/characterService';
import { LoginComponent } from './login/login.component';
import { CharacterComponent } from './character/character.component';
import { HttpModule, Http } from '@angular/http';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SpellsTabComponent } from './spells-tab/spells-tab.component';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/character/:id', component: CharacterComponent },
  { path: '', redirectTo: '/characters', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CharacterComponent,
    RegisterComponent,
    CharacterListComponent,
    SpellsTabComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    CharacterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
