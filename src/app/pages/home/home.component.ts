import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Task } from './../../models/task.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks=signal<Task[]>([
    {
      id: Date.now(),
      title:'Crear proyecto',
      completed:false
    },
    {
      id: Date.now(),
      title:'Crear componentes',
      completed:false
    },

  ]);

  //metodo capturar el valor del input en el html
  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newTask= input.value;
    input.value='';
    this.addTask(newTask);
  }

  //funcion para agregar tarea de tipo string
  addTask(title:string){
    const newTask={
      id:Date.now(),
      title,
      completed:false,
    };
    this.tasks.update((tasks)=>[...tasks, newTask]);

  }

  //boton eliminar la tarea
  deleteTask(index: number){
    this.tasks.update((tasks)=> tasks.filter((task, position )=> position !==index));
  }

  updateTask(index:number){
    this.tasks.update((tasks)=>{
      return tasks.map((task, position)=> {
        if(position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }
}
