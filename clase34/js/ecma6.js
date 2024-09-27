export default function () {
  /*
    A partir de ECMAScript 2015
        -> Palabra reservada class (Permite crear un Objeto Prototype)
        -> Palabra reservada extends (Permite generar la Cadena de Prototype)
        -> ECMAScript 2022
            -> # - Declarar atributos privados

    POO - Paradigma de la Programación Orientada a Objetos
        -> 4 pilares
            -> Abstracción
            -> Herencia
            -> Encapsulamiento
            -> Polimorfismo
        -> Estructurar el trabajo en Árboles de Clase y relaciones entre Clases (Diagrama UML)   
    */

  class Persona {
    #nombre;

    constructor(nombre, apellido) {
      this.#nombre = nombre;
      this.apellido = apellido;
    }

    saludar() {
      console.log(`Hola, mi nombre es ${this.#nombre} ${this.apellido}`);
    }
  }

  const persona = new Persona("Pepe", "Peposo");
  persona.saludar();

  class Empleado extends Persona {
    constructor(nombre, apellido) {
      //super == base C#
      super(nombre, apellido);
    }

    trabajar() {
      console.log(`${this.nombre} está trabajando`);
    }
  }

  const empleado = new Empleado("Juan", "Pérez");
  empleado.saludar();
  empleado.trabajar();
}
