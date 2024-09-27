//Prototype - POO pre-ES6
(() => {
  //Creamos un Objeto Plano (prototype) que almacena funciones
  const Persona = {
    setNombre: function (nombre) {
      this.nombre = nombre;
    },
    crearPersona: function (nombre) {
      this.setNombre(nombre);
    },
    saludar: function () {
      console.log(`Hola soy ${this.nombre}`);
    },
  };

  //Usando el Objeto Plano Persona y Object.create generamos un Objeto Plano nuevo con acceso a las funciones del Persona.
  const persona = Object.create(Persona);
  persona.crearPersona("Pepe");
  persona.saludar();
  console.log("Prototype de persona:", Object.getPrototypeOf(persona));

  /*
    Cadena de Prototipos
  */

  //Creación de nuevo usando el Objeto Plano Persona.
  const Empleado = Object.create(Persona);

  //Agregar funcionalidades al Objeto Plano Empleado
  Empleado.setPuesto = function (puesto) {
    this.puesto = puesto;
  };
  Empleado.crearEmpleado = function (nombre, puesto) {
    this.setNombre(nombre);
    this.setPuesto(puesto);
  };
  Empleado.decirPuesto = function () {
    console.log(`Mi puesto es ${this.puesto}`);
  };

  //Usando el Objeto Plano Empleado, creamos un nuevo Objeto Plano con acceso a las funciones de Empleado que, a su vez, tiene acceso a las funciones de Persona
  const empleado = Object.create(Empleado);
  empleado.crearEmpleado("Pepa", "Programadora");
  empleado.saludar();
  empleado.decirPuesto();
  console.log("Prototype de empleado:", Object.getPrototypeOf(empleado));

  /*
    Gracias a la forma en que los Objetos se relacionan entre sí, es posible
    armar una cadena de prototipos simplemente creando un nuevo Objeto con
    Object.create(obj)
  */
})();

//POO ES6
(() => {
  class Persona {
    constructor(nombre) {
      this.nombre = nombre;
    }

    saludar() {
      console.log(`Hola soy ${this.nombre}`);
    }
  }

  const persona = new Persona("Pepe");
  persona.saludar();

  class Empleado extends Persona {
    constructor(nombre, puesto) {
      super(nombre);
      this.puesto = puesto;
    }

    decirPuesto() {
      console.log(`Mi puesto es ${this.puesto}`);
    }
  }

  const empleado = new Empleado("Pepa", "Programadora");
  empleado.saludar();
  empleado.decirPuesto();
})();
