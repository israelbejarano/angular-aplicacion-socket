import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(public wsService: WebsocketService) { }

  ngOnInit() {
  }

  ingresar() {
    console.log(this.nombre);
    this.wsService.loginWS(this.nombre);
  }

}
