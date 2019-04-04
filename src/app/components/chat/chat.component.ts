import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  texto = '';

  constructor(public chatService: ChatService) { }

  enviar() {
    console.log(this.texto);
    this.chatService.sendMensaje(this.texto);
    this.texto = '';
  }

  ngOnInit() {
  }

}
