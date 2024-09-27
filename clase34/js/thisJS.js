export default function () {
  //miFn se guarda en function
  function miFn() {
    console.log(this.nombre);
  }

  //this -> "variable" que guarda la información de donde se EJECUTA la función

  const miContexto1 = {
    nombre: "Pepe",
    miFn,
  };

  miContexto1.miFn();

  const miContexto2 = {
    nombre: "Juan",
    miFn,
  };

  miContexto2.miFn();

  //Palabra reservada new === this guarda la función en sí misma
  /*
    JS - Lenguaje de Programación Orientado a Objetos basado en Prototipos (objetos)
        -> En JS no existen las clases
        -> No hay herencia entre clases
            -> Reemplazado por la Cadena de Prototipos (objetos)
        -> No hay métodos estáticos
        -> No hay clases abstractas (abstract class)
        -> No hay interfaces
        -> Funciones constructoras de Prototipos (objetos)
            -> Es una función que vincula el this del resto de las funciones a su propio espacio de memoria
  */

  //Función constructora ("Clase")
  function Persona(nombre, apellido) {
    // Atributos
    this.nombre = nombre;
    this.apellido = apellido;
  }

  // Agregar un método al Prototype Persona
  Persona.prototype.saludar = function () {
    console.log(`Hola, soy ${this.nombre} ${this.apellido}`);
  };

  const persona = new Persona("Pepe", "Pepin"); //Objeto Persona cuyo this está atado a sí mismo
  persona.saludar();

  const persona2 = new Persona("Pepa", "Peposo");
  persona2.saludar();

  //Nuevo Prototipo(objeto) que usa como referencia al Prototipo Persona(objeto)
  const empleado = Object.create(new Persona("Juan", "Perez"));
  empleado.trabajar = function () {
    console.log("El empleado trabaja");
  };

  empleado.saludar();
  empleado.trabajar();
  console.log(empleado);
}
