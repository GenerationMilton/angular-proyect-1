
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title= 'todo-app';
  welcome = 'hola';
  tasks=[
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ];
}
