import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private chatService: ChatService) {}

  access(provider: string) {
    console.log(provider);

    this.chatService.login(provider);
  }
}
