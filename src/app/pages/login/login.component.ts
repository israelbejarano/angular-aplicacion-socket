import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(public wsService: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    console.log(this.nombre);
    this.wsService.loginWS(this.nombre)
      .then(() => {
        this.router.navigateByUrl('/mensajes');
      });
  }

}
