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
  name ='Milton';
  age =37;
  disable=true;
  img='https://w3schools.com/howto/img_avatar.png';

  person={
    name:'Milton',
    age:18,
    avatar:'https://mighty.tools/mockmind-api/content/cartoon/9.jpg'
  }
}
