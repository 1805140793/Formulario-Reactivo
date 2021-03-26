import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// creo una interfaz(entidad) con propiedades
interface Usuario{
  nombre:string;
  correo:string;
  clave:string
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  //lista de usuarios registrados
  listaUsuarios: Array<Usuario> = new Array<Usuario>();

  //determina si se desea realizar agregar o editar
  esNuevo:boolean = true;
  poisicionEdicion:number = -1;

  //inyeccion de dependencias
  constructor(private formBuilder: FormBuilder) { }

  //llamar al metodo para crear el formulario
  ngOnInit(): void {
    //Antes que se visualice el control, digo que se cree el formulario en el OnInit
    this.crearFormulario();
  }

  //contiene la referencia al objeto con el formulario reactivo
  formularioCreado!: FormGroup;


  //metodo para crear el formulario reactivo
  crearFormulario(){
    // formBuilder para crear el formulario
    this.formularioCreado = this.formBuilder.group(
      {
        /*nombreVariable = nombre
          Puedo poner mas de un Validador*/
        nombre: ['John',Validators.required],
        //compose para agregar mas de un validador
        correo: ['',Validators.compose([Validators.required,Validators.email])],
        // Clave sea obligatorio y minimo de 6 caracteres
        clave: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
      }
    );
  }

  agregar(){
    //obtener los valores ingresados en los controles <input>
    //console.log(this.formularioCreado.value);

    //agregar al array el registro ingresado en el formulario
    // le hago un casting a tipo Usuario
    this.listaUsuarios.push(this.formularioCreado.value as Usuario);

    //limpiar o resetear los controles del formulario
    this.formularioCreado.reset();
  }

  //editar un registro en funcion de la posicion
  editar(){
    //asignar los datos ingresados en los controles al array
    this.listaUsuarios[this.poisicionEdicion].nombre = this.formularioCreado.value.nombre;
    this.listaUsuarios[this.poisicionEdicion].correo = this.formularioCreado.value.correo;
    this.listaUsuarios[this.poisicionEdicion].clave = this.formularioCreado.value.clave;

    //resetear el fomrulario
    this.formularioCreado.reset()

    //mostrar el boton "Agregar"
    this.esNuevo = true;

    //cambiar la posicion del registro actual a Editar
    this.poisicionEdicion = -1;
  }

  editarUsuarioActual(posicion: number){
    /*this.listaUsuarios[posicion].nombre="Editar";
    this.listaUsuarios[posicion].correo="correo@gmail.com";
    this.listaUsuarios[posicion].clave="clave";*/

    /*Compruebo que los datos son los actuales que se ingresa en el formulario
    console.log(
      this.listaUsuarios[posicion].nombre,
      this.listaUsuarios[posicion].correo,
      this.listaUsuarios[posicion].clave
    );
    */

    //utilizar el objeto "formularioCreado", que tiene la referencia al formulario reactivo
    //con el metodo (setValue) asignar un nuevo registro
    this.formularioCreado.setValue({
      nombre: this.listaUsuarios[posicion].nombre,
      correo: this.listaUsuarios[posicion].correo,
      clave: this.listaUsuarios[posicion].clave});

    //asignar la posicion para editar
    this.poisicionEdicion = posicion;

    //ocultar el boton "Agregar y mostrar el boton "Editar"
    this.esNuevo = false;
  }

  eliminarUsuarioActual(posicion: number){
    // de la posicion actual remuevo solo 1
    this.listaUsuarios.splice(posicion,1);
  }

}
