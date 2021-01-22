import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario'

@Injectable()
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario;
  }
  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

//metodo para autenricarse
  login(usuario: Usuario): Observable<any>{
    const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    console.log(params.toString());

    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});

  }
//Payload: es la parte del token que contiene los datos encriptados
//obtiene los datos del token
  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerPayload(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    //almacena los datos del usuario en la sesion
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario))
    //stringify: convierte tipo objeto a JSON
  }

//almacena el token en el sessionStorage
  guardarToken(accessToken: string): void{
    this._token = accessToken;
    //almacena el token en la sesion
    sessionStorage.setItem('token', accessToken)
  }

//decodifica el token y retorna un json con los datos
  obtenerPayload(accessToken: string): any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split('.')[1]))
    }
    return null;
  }

//verifica si esta autenticado
  isAuthtenticated(): boolean{
    let payload = this.obtenerPayload(this.token);//metodo getter y no _token
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

//elimina los datos del session
  logout(): void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
