import { Injectable } from '@angular/core';
import { Direccion } from './direccion';
import { Cliente } from './cliente';
import { Municipio } from './municipio';
import { Observable } from 'rxjs/Observable';
import { _throw as throwError } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Injectable()//indica que es un service logica de negocio y se puede inyectar
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/direccion/';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  //HttpClient IMLEMENTA LOS METODOS rest (get,post,put,delete) y retorna un json
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeader.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeader;
  }

  private isNoAutorizado(e): boolean{
    if(e.status==401){//realiza la validacion cuando no se a autenticado
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status==403){//Acceso denegado por el tipo de rol
      Swal('Acceso Denegado','Hola ' + this.authService.usuario.username + ' no tienes acceso a este recurso','warning')
      this.router.navigate(['/clientes'])
      return true;
    }
    return false;
  }

  getClientes(): Observable<Direccion[]> {//
    return this.http.get<Direccion[]>(this.urlEndPoint)
    .pipe(
        map(response => response as Direccion[]))
  }

  nuevo(direccion: Direccion){
    return this.http.post<Direccion>(this.urlEndPoint, direccion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error('Error Back: ' + e.error.error);
        Swal('Error al ingresar el cliente ', 'Error' + e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getId(id){
    return this.http.get<Direccion>(this.urlEndPoint+""+id, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/clientes'])
        console.log(e.error.menasje)
        Swal('Error al editar', e.error.menasje, 'error');
        return throwError(e)
      })
    )
  }

  getDireccion(codigo){
    return this.http.get<Municipio>(this.urlEndPoint + "municipio/"+codigo, {headers: this.agregarAuthorizationHeader()})
  }

  update(direccion: Direccion): Observable<Direccion>{
    return this.http.put<Direccion>(this.urlEndPoint+""+direccion.idDireccion, direccion, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/clientes'])
        console.log(e.error.menasje)
        Swal('Error al Actualizar Cliente', ' ' + e.error.menasje, 'error');
        return throwError(e)
      })
    );
  }

  delete(id: number){
    return this.http.delete<Direccion>(this.urlEndPoint+""+id, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/clientes'])
        console.log(e.error.menasje)
        Swal('Error al elminar', e.error.menasje, 'error');
        return throwError(e)
      })
    );
  }
}
