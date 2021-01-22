import { Component, OnInit } from '@angular/core';
import { Direccion } from './direccion';
//import { Cliente } from './cliente';
import { Estado } from './estado'
//import{ ESTADOS } from './estados.lista'
//import { Municipio } from './municipio';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  //por medio de interpolacion {{}} en html se pueden llamar las variables
  direccion: Direccion = new Direccion();
  //municipio: Municipio = new Municipio();
  estados: Estado[];
  estado: Estado = new Estado();
  private titulo: string = "Datos del usuario";

  constructor(private clienteService: ClienteService,//se realiza la inyeccion de dependencias
    private router: Router,
    private activatedRout: ActivatedRoute) {
    }

  ngOnInit() {
    this.cargarCliente();

    this.clienteService.getEstado().subscribe(estado =>{
      this.estados = estado
      console.log(this.estados)
      });

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

  /*cargarDireccion(): void{
    let codigo = this.direccion.codPostal;
    console.log("Codigo Postal")
    console.log(codigo)
      if(codigo){
        this.clienteService.getDireccion(codigo).subscribe(
          municipio => {
            this.municipio = municipio
            console.log(this.municipio);
            this.municipio.municipio = this.direccion.munucipio;
            this.municipio.estado.nombre = this.direccion.estado;
          }
        )
      }
  }*/

  //private cliente = this.direccion.cliente.nombre;

  public nuevo(): void{
    //console.log("Clicked");
    //console.log(this.direccion);
    this.clienteService.nuevo(this.direccion)//llama al metodo del service
    .subscribe(response => {//escucha el evento
      this.router.navigate(['/clientes'])//redirecciona
        Swal('Registro exitoso...', this.direccion.usuario.nombre, 'success')//
    })
  }

  public update(): void{
    console.log("Clicked");
    console.log(this.direccion);
    this.clienteService.update(this.direccion)
    .subscribe(response => {
      this.router.navigate(['/clientes'])
      Swal('Actualizacion exitosa...', ' '+this.direccion.usuario.nombre, 'success')
    })
  }

  compararEstado(obj1: Estado , obj2: Estado): boolean{
    return obj1 === null || obj2 === null || obj1 === undefined || obj2 === undefined ? false: obj1.idEstado == obj2.idEstado;
    //|| obj1 == undefined || obj2 == undefined
  }
}
