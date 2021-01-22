
//se registran los componentes
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './usuarios/login.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AuthService } from './usuarios/auth.service';

const routes: Routes = [//se registran las rutas
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  //{path: 'clientes/form/:codigo', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    LoginComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,//ngIf, ngFor
    HttpClientModule,//para trabajar con peticiones http, rest
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService,AuthService],//se registra para realizar inyeccion de dependencias
  bootstrap: [AppComponent]
})
export class AppModule { }
