import { Usuario } from '../usuarios/usuario';
import { Estado } from './estado';

export class Direccion {

  idDireccion: number;
  calle: string;
  noExterior:number;
  codPostal:number;
  munucipio: string;
  //estado: string;
  referencia: string;
  idUsuario: number;
  usuario: Usuario = new Usuario();
  estado: Estado = new Estado();
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
