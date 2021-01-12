import { Injectable } from '@angular/core';
import { Direccion } from './direcciones';
import { Observable } from 'rxjs/Observable';
import { _throw as throwError } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/direccion/';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getClientes(): Observable<Direccion[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Direccion[])
    );
  }

  nuevo(direccion: Direccion): Observable<Direccion>{
    return this.http.post<Direccion>(this.urlEndPoint, direccion, {headers: this.httpHeader})
    .pipe(
      catchError(e => {
        console.error('Error Back: ' + e.error.error);
        Swal('Error al ingresar el cliente ', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getId(id): Observable<Direccion>{
    return this.http.get<Direccion>(this.urlEndPoint+""+id).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes'])
        console.log(e.error.menasje)
        Swal('Error al editar', e.error.menasje, 'error');
        return throwError(e)
      })
    )
  }

  update(direccion: Direccion): Observable<Direccion>{
    return this.http.put<Direccion>(this.urlEndPoint+""+direccion.id, {headers: this.httpHeader})
  }

  delete(id: number): Observable<Direccion>{
    return this.http.delete<Direccion>(this.urlEndPoint+""+id, {headers: this.httpHeader});
  }
}
