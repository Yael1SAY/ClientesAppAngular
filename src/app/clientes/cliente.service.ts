import { Injectable } from '@angular/core';
import { Direccion } from './direcciones';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/direccion/';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Direccion[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Direccion[])
    );
  }

  nuevo(direccion: Direccion): Observable<Direccion>{
    return this.http.post<Direccion>(this.urlEndPoint, direccion, {headers: this.httpHeader});
  }

  getId(id): Observable<Direccion>{
    return this.http.get<Direccion>(`${this.urlEndPoint}/${id}`)
  }

  update(direccion: Direccion): Observable<Direccion>{
    return this.http.put<Direccion>(`${this.urlEndPoint}/${direccion.id}`, {headers: this.httpHeader})
  }

  delete(id: number): Observable<Direccion>{
    return this.http.delete<Direccion>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader});
  }
}
