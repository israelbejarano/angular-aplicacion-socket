import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMensaje(mensaje: string) {
    const payload = {
      de: 'Israel',
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);
  }

  getMensajes() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
