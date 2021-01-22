
import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Iniciar Sesion"
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario;
 }

  ngOnInit() {
    //si ya estoy acutenticado me manda mensaje
    if(this.authService.isAuthtenticated()){
      Swal('Login', 'Hola ' + this.authService.usuario.username + ' ya estas autenticado!' , 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void{
    console.log(this.usuario);
    //valida que el usuario y password no esten vacias
    if(this.usuario.username == null || this.usuario.password == null){
      Swal('Error Login', 'Username o Password vacios!', 'error');
    }
    //llama al metodo login del service para autenticarse
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      //el token se conpone de tres secciones 1. el algoritmo y tipo, 2.datos y payload 3.La fima para verificar
      //let objetoPayload = JSON.parse(atob(response.access_token.split('.')[1]))
      //console.log(objetoPayload);//Split convierte a un arreglo y separa cada secion despues de un '.'

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;//es el metodo getter del service y se maneja como atributo
      this.router.navigate(['/clientes']);
      Swal('Login', 'Hola ' + usuario.username + ', has iniciado sesión con éxito!', 'success');
    },error => {
      if(error.status == 400){
        Swal('Error Login', 'Usuario o contraseña incorrecta!!!', 'error');
      }
      if(error.status == 0){
        Swal("Servicio fuera de linea", 'No es posible conectar al servicio, contacte al administrador','error');
      }
    }
  );
  }

}
