/*
  Crear una función que retorne un objeto que almacene un Array y 3 funciones de modificación de datos.
    => Funciones a ejecutarse. DEBEN recibir una Callback que indique el tipo de trabajo
      => Alterar los valores almacenados
      => Filtrar el valor especificado
      => Encontrar el valor especificado. Debe retornar el valor encontrado no un array (puede no recibir una función callback)
    => Las funciones modificadoras NO DEBEN recibir el array como argumento
    => NO DEBEN modificar los valores originales. DEBEN crear una copia y retornarla.
    => Mostrar los resultados en pantalla  
*/

//Funciones a pensadas para aprovechar el call-site
function modificar(cb) {
  const arr = [];
  for (const item of this.arr) {
    arr.push(cb(item));
  }
  return arr;
}

function filtrar(cb) {
  const arr = [];
  for (const item of this.arr) {
    if (cb(item)) arr.push(item);
  }
  return arr;
}

function encontrar(itemBuscar) {
  const arr = [];
  for (const item of this.arr) {
    if (item === itemBuscar) arr.push(item);
  }
  return arr;
}

//Objetos que almacenan las funciones que aprovechan call-site
const unObjeto = {
  arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  modificar: modificar,
  filtrar: filtrar,
  encontrar: encontrar,
};

const otroObjeto = {
  arr: ["Juan", "María", "Pedro"],
  modificar,
  filtrar,
  encontrar,
};

//Ejecución
const modificado = unObjeto.modificar((item) => item * 2);
const filtrado = unObjeto.filtrar((item) => item <= 5);
const encontrado = unObjeto.encontrar(7);

const modificado1 = otroObjeto.modificar((nombre) => `Hola soy ${nombre}`);
const filtrado1 = otroObjeto.filtrar((nombre) => nombre !== "Juan");
const encontrado1 = otroObjeto.encontrar("María");

//Mostrar en pantalla
const contenedorResultados = document.getElementById("resultados");
const fragment = document.createDocumentFragment();

const crearVista = (texto, arr) => {
  const titulo = document.createElement("h3");
  titulo.classList.add("fs-3", "text-capitalize", "fw-bolder");
  titulo.textContent = texto;
  fragment.appendChild(titulo);

  const p = document.createElement("p");
  p.classList.add("fs-4");

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    if (index + 1 === arr.length) {
      p.textContent += `${element}`;
      break;
    }

    p.textContent += `${element}, `;
  }

  fragment.appendChild(p);
};

//Modificar
crearVista("Resultado de modificar unObjeto.arr", modificado);
crearVista("Resultado de modificar otroObjeto.arr", modificado1);

//Filtrar
crearVista("Resultado de filtrar unObjeto.arr", filtrado);
crearVista("Resultado de filtrar otroObjeto.arr", filtrado1);

//Encontrar
crearVista("Resultado de encontrar unObjeto.arr", encontrado);
crearVista("Resultado de encontrar otroObjeto.arr", encontrado1);

contenedorResultados.appendChild(fragment);

/*
  Usando el binding new de las funciones crear 2 objetos a partir de la ejecución de las 2 funciones. Las funciones deben tener los nombres "MostrarArray" y "AgregarDatos".
    => El objeto creado con la función "MostrarArray" de tener:
      -> 1 Array recibido por parámetro
      -> 1 función "add" para agregar valores al Array
      -> 1 función "render" que debe retornar la vista de los elementos almacenados en el Array
    => El objeto creado con la función "AgregarDatos"
      -> 1 función "render" que debe retornar la vista de un formulario que tenga un input para que el usuario pueda ingresar un valor.
    -> 1 función "handleSubmit" que se ejecute como callback del evento submit y ejecute la función "add" generada en "MostrarArray" en para usar los datos del input como argumentos de la ejecución de la misma;
    => Fundamental mantener actualizada la vista con los valores en el Array
*/

//Elementos del HTML
const hardBinding = document.getElementById("hardBinding");

function MostrarArray(arr) {
  this.arr = arr;

  this.add = function (value) {
    this.arr.push(value);
  };

  this.render = function () {
    return `<ul>
      ${this.arr.map((el) => `<li>${el}</li>`).join("")}
    </ul>`;
  };
}

function AgregarDatos(contexto) {
  this.handleSubmit = function (value) {
    this.add(value);
  };
  this.add = this.handleSubmit.bind(contexto);

  this.render = function () {
    return `<form
    style="height: 100px; width: 230px"
    class="d-flex flex-column justify-content-between align-items-start"
  >
    <div>
      <label for="color">Color:</label>
      <input type="text" name="color" id="color" />
    </div>
    <input
      type="submit"
      value="Agregar"
      class="btn btn-primary fw-bold fs-6"
    />
  </form>`;
  };
}

//Creación de los objetos
const colores = ["Rojo", "Amarillo", "Verde"];
const mostrarArray = new MostrarArray(colores);
const agregarDatos = new AgregarDatos(mostrarArray);

//Vista inicial
document.addEventListener("DOMContentLoaded", () => {
  hardBinding.innerHTML = mostrarArray.render();
  hardBinding.innerHTML += agregarDatos.render();
});

//agregarDatos.handleSubmit("Negro");

//Delegación de eventos
hardBinding.addEventListener("submit", function (e) {
  e.preventDefault();
  const color = e.target.elements.color.value;
  agregarDatos.add(color);

  //Actualizar vista
  hardBinding.innerHTML = mostrarArray.render();
  hardBinding.innerHTML += agregarDatos.render();
});
