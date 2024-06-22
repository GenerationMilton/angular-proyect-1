import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'hola';
  tasks=[
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ];
  name ='milton';
  age =37
}