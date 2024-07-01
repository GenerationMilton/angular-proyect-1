
import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './../../models/task.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks=signal<Task[]>([]);
  //estado filter --estado compuesto
  filter=signal<'all'|'pending'|'completed'>('all');

  tasksByFilter = computed(()=>{
    const filter= this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })

  //instancia de form control con form
  newTaskCtrl= new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required,
      //Validators.pattern('^\\S.*$'),
      //Validators.minLength(3)


    ]
  });


  //metodo capturar el valor del input en el html
  // changeHandler(event:Event){
  //   const input = event.target as HTMLInputElement;
  //   const newTask= input.value;
  //   input.value='';
  //   this.addTask(newTask);
  // }

injector = inject(Injector)
  //usando effect de reactividad para el local storage
// constructor(){

// }

ngOnInit(){
  const storage= localStorage.getItem('tasks');
  if(storage){
    const tasks =JSON.parse(storage);
    this.tasks.set(tasks);
  }
  this.trackTasks();
}
//metodo para guardar en el local storage con un injector de dependencias del cora
trackTasks(){
  effect(()=>{
    const tasks =this.tasks();
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },{injector: this.injector});
}

  //para usar el taskCtrl
  changeHandler(){

    if(this.newTaskCtrl.valid){
      const value= this.newTaskCtrl.value.trim();
      if(value!==''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }

    }

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

  public updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        task.editing = false;
        if (position === index) {
          return {
            ...task,
            editing: true
          };
        }
        return task;
      });
    });
  }

  public updateTaskText(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index && task.completed === false) {
          return {
            ...task,
            title: value,
            editing: false
          };
        }
        alert('Esta tarea ya fue completada');
        return task;
      });
    });
  }

  changeFilter(filter:'all'|'pending'|'completed'){
    this.filter.set(filter);
  }

}
