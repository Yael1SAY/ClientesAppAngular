import { Component, OnInit, Input } from '@angular/core';
import { Direccion } from './direcciones';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  direcciones: Direccion[];
  @Input() cliente: Direccion;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
       direccion => this.direcciones = direccion
    );
  }

  delete(direccion: Direccion): void{
      Swal({
        title: 'Seguro que desea Eliminar?',
        text: `Se eliminara el Cliente ${direccion.cliente}` ,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.clienteService.delete(direccion.id).subscribe(
            response => {
              this.direcciones = this.direcciones.filter(dir => dir !== direccion)
              Swal(
                'Eliminado!',
                'Cliente eliminado con exito',
                'success'
              )
            }
          )
        }
      })
  }
}
