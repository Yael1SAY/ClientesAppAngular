import { Component, OnInit, Input } from '@angular/core';
import { Direccion } from './direccion';
//import { Cliente } from './cliente';
import { AuthService } from '../usuarios/auth.service'
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  direcciones: Direccion[] = [];
  //clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router:Router,
  private auth: AuthService) { }

  filterDirecciones = '';

  ngOnInit(): void {//al iniciar la pagina se muestra la lista
    this.clienteService.getClientes().subscribe(
       data => {
         this.direcciones = data;

    });
  }

  delete(direccion: Direccion): void{
      Swal({
        title: '¿Seguro que desea Eliminar?',
        text: 'Se eliminara el cliente ' + direccion.usuario.nombre,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          console.log("Usuario logeado: " + this.auth.usuario.username);
          console.log("Usuario a eliminar: " + direccion.usuario.username);
          //valida si el usuario que se va a eliminar es el mismo que se encuentra logueado
          //de ser correcto elimina el usuario, elimina la session y redirecciona a login
          if(this.auth.usuario.username == direccion.usuario.username){
            this.clienteService.delete(direccion.idDireccion).subscribe(
              response => {
                this.direcciones = this.direcciones.filter(dir => dir !== direccion)
                Swal(
                  'Eliminado!',
                  'Cliente ' + direccion.usuario.nombre +' eliminado con exito',
                  'success'
                )
              }
            )
            this.auth.logout();
            this.router.navigate(['/login']);
          }
          this.clienteService.delete(direccion.idDireccion).subscribe(
            response => {
              this.direcciones = this.direcciones.filter(dir => dir !== direccion)
              Swal(
                'Eliminado!',
                'Cliente ' + direccion.usuario.nombre +' eliminado con exito',
                'success'
              )
            }
          )
        }
      })
  }



}
