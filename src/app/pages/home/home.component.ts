import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks=signal([
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio'
  ]);

  //metodo capturar el valor del input en el html
  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newTask= input.value;
    this.tasks.update((tasks)=>[...tasks, newTask]);
    input.value='';
  }

  //boton eliminar la tarea
  deleteTask(index: number){
    this.tasks.update((tasks)=> tasks.filter((task, position )=> position !==index));
  }
}
