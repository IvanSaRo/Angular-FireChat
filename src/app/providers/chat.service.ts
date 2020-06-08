import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Message } from '../interface/message.interface';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import 'firebase/auth';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];

  public user: any = {};
  constructor(
    private angularFirestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {
    this.auth.onAuthStateChanged((user) => {
      console.log('Estado del usuario: ', user);

      if (!user) {
        return;
      }

      this.user.name = user.displayName;
      this.user.uid = user.uid;
    });
  }

  login(provider: string) {
    if (provider === 'google') {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.user = {};
    this.auth.signOut();
  }

  /* en el ejemplo de firestore el código de abajo figura en el constructor, la separamos en una función distinta porque no queremos que salte por defecto al inicio sino cuando se le llame, esa diferecia es debido a que en el ejemplo figura en un componente y aquí es en el servicio por lo que ha de ser llamado, necesitando maneras de iniciar diferentes */
  loadMessages() {
    this.itemsCollection = this.angularFirestore.collection<Message>(
      'chats',
      (ref) => ref.orderBy('date', 'asc').limitToLast(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
        this.chats = messages;
      })
    );
  }

  addMessage(text: string) {
    let msg: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid,
    };

    return this.itemsCollection.add(msg);
  }
}
