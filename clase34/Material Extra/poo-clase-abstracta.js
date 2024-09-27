// Clase base que actúa como una interfaz abstracta
class Persona {
  constructor(nombre) {
    if (this.constructor === Persona) {
      throw new Error("No puedes instanciar una clase abstracta.");
    }
    this.nombre = nombre;
  }

  // Método abstracto que debe ser implementado por las clases hijas
  saludar() {
    throw new Error("Debes implementar el método 'saludar'");
  }
}

// Clase concreta que extiende de la clase abstracta
class Estudiante extends Persona {
  constructor(nombre, carrera) {
    super(nombre);
    this.carrera = carrera;
  }

  // Implementación del método abstracto
  saludar() {
    console.log(`Hola, soy ${this.nombre} y estudio ${this.carrera}.`);
  }
}

const estudiante = new Estudiante("María", "Ingeniería");
estudiante.saludar(); // "Hola, soy María y estudio Ingeniería."

// Intentar instanciar la clase abstracta directamente
try {
  const persona = new Persona("Juan"); // Error: No puedes instanciar una clase abstracta.
} catch (e) {
  console.error(e.message);
}
