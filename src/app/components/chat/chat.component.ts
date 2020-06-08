import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  msg: string = '';

  element: any;

  constructor(public chatService: ChatService) {
    this.chatService.loadMessages().subscribe(() => {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
  }

  sendMsg() {
    console.log(this.msg);
    if (this.msg.length === 0) {
      return;
    }

    this.chatService
      .addMessage(this.msg)
      .then(() => {
        this.msg = '';
      })
      .catch((err) => {
        console.error('error al enviar', err);
      });
  }
}
