import { Cliente } from './cliente';

export class Direccion {

  idDireccion: number;
  calle: string;
  noExterior:number;
  codPostal:number;
  munucipio: string;
  estado: string;
  referencia: string;
  idCliente: number;
  cliente: Cliente = new Cliente();
}

/*
export class Cliente {
  id_cliente: number;
  correo: string;
  nombre: string;
  apellido: string;
  edad: number;
  contrasenia: string;
}*/
