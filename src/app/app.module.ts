import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';

import { ChatService } from './providers/chat.service';

@NgModule({
  declarations: [AppComponent, ChatComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFirestoreModule,
  ],
  providers: [ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
