export class Direccion {

  id: number;
  calle: string;
  noExterior:number;
  codPostal:number;
  munucipio: string;
  estado: string;
  referencia: string;
  cliente: Cliente;
}

class Cliente {
  correo: string;
  nombre: string;
  apellido: string;
  edad: number;
  contrasenia: string;
}
