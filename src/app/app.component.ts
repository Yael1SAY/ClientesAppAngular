 import { Component } from '@angular/core';

@Component({
  selector: 'app-root',//donde se coloque la etiqueta se va a mostrar los datos del componente
  templateUrl: './app.component.html',//esta calse esta asociada a la vista app-componets.html
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  Creador: string = " Yael Salinas"
}
