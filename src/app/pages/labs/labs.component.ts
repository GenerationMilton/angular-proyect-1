
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'hola';
  tasks=signal([
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio'
  ]);
  name =signal('Milton');
  age =37;
  disable=true;
  img='https://w3schools.com/howto/img_avatar.png';

  person= signal({
    name:'milton',
    age:5,
    avatar:'https://w3schools.com/howto/img_avatar.png',
  });

  //controlador input para form
  colorCtrl = new FormControl();

  //controlador para estilos en angular
  widthCtrl= new FormControl(50, {
    nonNullable:true,
  });

  //namectrl con validators
  nameCtrl = new FormControl('milton',{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }

  clickHandler(){
    alert('Hola')
  }

  changeHandler(event: Event){
    const input= event.target as HTMLInputElement;
    const newValue= input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event){
    const input= event.target as HTMLInputElement;
    const newValue= input.value;
    this.person.update(prevState =>{
      return{
        ...prevState,
        age: parseInt(newValue,10)
      }
    });
  }

  changeName(event: Event){
    const input= event.target as HTMLInputElement;
    const newValue= input.value;
    this.person.update(prevState=>{
      return{
        ...prevState,
        name:newValue
      }
    });
  }
}
