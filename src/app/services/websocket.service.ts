import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  // método para ver el estado del servidor
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado al servidor');
      this.socketStatus = false;
    });
  }

  // método para hacer emisiones de eventos a mi servidor
  emit(evento: string, payload?: any, callback?: Function) {
    console.log('emitiendo', evento);
    this.socket.emit(evento, payload, callback);
  }

  // método para esuchar el servidor
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  // método de login
  loginWS(nombre: string) {
    this.emit('configurar-usuario', {nombre}, (resp) => {
      console.log(resp);
    });
  }
}
