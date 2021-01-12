import { Component, OnInit } from '@angular/core';
import { Direccion } from './direcciones';
//import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  //por medio de {{}} en html se pueden llamar las variables
  direccion: Direccion = new Direccion();
  //cliente: Cliente = new Cliente();
  private titulo: string = "Nuevo Cliente";

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRout: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRout.params.subscribe(params => {
    let id = params['id']
    if(id){
      this.clienteService.getId(id).subscribe(
        direccion => this.direccion = direccion
      )
    }
  })
  }

  //private cliente = this.direccion.cliente.nombre;

  public nuevo(): void{
    console.log("Clicked");
    console.log(this.direccion);
    console.log(this.direccion.cliente);
    this.clienteService.nuevo(this.direccion)
    .subscribe(response => {//Alerta OK
      this.router.navigate(['/clientes'])
        Swal('Registro exitoso...', this.direccion.cliente.nombre, 'success')
    })
  }

  public update(): void{
    console.log("Clicked");
    console.log(this.direccion);
    console.log(this.direccion.cliente);
    this.clienteService.update(this.direccion)
    .subscribe(response => {
      this.router.navigate(['/clientes'])
      Swal('Actualizacion exitoso...', this.direccion.cliente.nombre, 'success')
    })
  }
}
