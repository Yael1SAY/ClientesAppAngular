import { Component, OnInit, Input } from '@angular/core';
import { Direccion } from './direcciones';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  //por medio de {{}} en html se pueden llamar las variables
  private direccion: Direccion = new Direccion();
  private titulo: string = "Nuevo Cliente";
  @Input() cliente: Direccion;

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
        (direccion) => this.direccion = direccion
      )
    }
  })
  }

  //private cliente = this.direccion.cliente.nombre;

  public nuevo(): void{
    console.log("Clicked");
    console.log(this.direccion);
    this.clienteService.nuevo(this.direccion)
    .subscribe(response => {//Alerta OK
      this.router.navigate(['/clientes'])
        //Swal.fire('Registro exitoso...', this.cliente, 'success')
    })
  }

  public update(): void{
    this.clienteService.update(this.direccion)
    .subscribe(direccion => {
      this.router.navigate(['/clientes'])
      console.log("Cliente Actualizado con exito")
    })
  }
}
