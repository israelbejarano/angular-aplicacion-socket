import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket, private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  // método para ver el estado del servidor
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
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
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', {nombre}, (resp) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  // logout
  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('/');
  }

  // obtener usuario
  getUsuario() {
    return this.usuario;
  }

  // guardar info en localstorage
  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  // cargar la info del localstorage
  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre); // mantener en el back los usuarios
    }
  }
}
