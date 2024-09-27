import { copiarArray, modificarArray } from "./auxiliares.js";

export default function () {
  /*
        Tipos de funciones
            -> Función de Orden Superior
                -> Función que recibe (o no) una función callback
                -> Retorna otra (o no) una función
                    -> La función retornada es Closure
                        -> El Closure tiene acceso a la memoria de función que la crea
            -> Función Callback 
                -> Función que se pasa como argumento de otra para que aquella la ejecute
            -> Funciones con efecto secundario
                -> Modifica valores que no contiene
                -> fetch === Efecto secundario
            -> Funciones puras
                -> No modifica ningún valor que se encuentre fuera de la misma
                -> Devuelve un valor único  
                -> Para los mismos valores de entrada (Argumentos) retorna el mismo valor de salida    
    */

  function fnSuperior(fnCb) {
    fnCb();
  }

  fnSuperior(() => console.log("Soy la Función Callback"));

  // Función Pura
  const sumar = (n1, n2) => n1 + n2;
  console.log(sumar(2, 2));
  console.log(sumar(2, 3));

  // Función con Efecto Secundario
  const arr = [];
  console.log(arr);

  const agregarElemento = (elemento) => {
    arr.push(elemento);
  };

  agregarElemento("Hola");
  console.log(arr);

  function crearClosure(n1, n2) {
    return function () {
      console.log(n1 + n2);
    };
  }

  const closure = crearClosure(2, 2);
  console.log(closure);
  closure();

  /*
    Mutaciones
        -> Modificar el valor original de un objeto/array
  */

  const colores = ["Rojo"];
  //colores.push("Verde"); // Mutación del array almacenado en la variable colores
  console.log("colores", colores);

  let users = [];

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      users = data; // Mutación del array almacenado en la variable users
      const html = users.map((user) => `<p>${user.name}</p>`).join("");
      console.log(html);
    });

  // Spread Operator (...variable)
  const arr2 = copiarArray(colores); // Creación de una nueva copia del array colores
  console.log("arr2", arr2);
  const copiaModifica = modificarArray(arr2, ["Verde", "Amarillo"]); // Creación de una nueva
  console.log("copiaModificada", copiaModifica);
  const crearCopiaModificada = colores.map((color) => `<p>${color}</p>`);

  const unObj = {
    nombre: "Pepe",
    address: {
      street: "Calle 123",
      city: "Ciudad",
      country: "España",
    },
  };

  const copiaModificaDelObj = {
    ...unObj,
    edad: 25,
  };
  console.log("copiaModificaDelObj", copiaModificaDelObj);

  const modificarCityObj = {
    ...unObj,
    address: {
      ...unObj.address,
      city: "Madrid",
    },
  };
  console.log("modificarCityObj", modificarCityObj);

  // Destructuración
  const objExport = {
    fn1: function () {
      console.log("Función 1");
    },
    fn2: function () {
      console.log("Función 2");
    },
  };
  const { fn1, fn2 } = objExport;

  /*
    Programación Declarativa
        -> Al leer nuestro programa no debemos ver el cómo, sino el qué
        -> Es fundamental que el nombre de mis variables y funciones sean lo más claros posible

    Paradigma de la Programación Funcional 
        -> Estructuramos el programa utilizando funciones
        -> Los nombres de las funciones deben describir que hace la función (programación declarativa)
        -> Seguimos 2 premisas
            -> Evitar mutaciones
                -> Crear copias y modificar esas copias
            -> Evitar efectos secundarios
                -> Si tenemos que aplicar algún efecto secundario, debe se la menor cantidad posible

    Estado (state)
        -> Variable global que contiene todos los valores que deben ser modificados en mi programa            
    */
}

const root = document.getElementById("root");
let state = {
  name: "",
  users: [],
};

//state.name = prompt("Ingrese su nombre"); // Mutación de valor de state

const name = getName();
state = updateState(state, { name }); //{name: name}
showName(state);

const newName = getName();
state = updateState(state, { name: newName });
showName(state);

// IIFE - Immediately Invoke Function Expression
// Función Anónima que se ejecuta en la misma linea en que se declara
(async () => {
  const users = await getUsers();
  state = updateState(state, { users }); //{users: users}
  //   console.log(state);
  showUsers(state.users);
})();

function getName() {
  const name = prompt("Ingrese su nombre");
  return name;
}

function updateState(state, newState) {
  return {
    ...state,
    ...newState,
  };
}

function showName(state) {
  const h4 = document.createElement("h4");
  h4.textContent = `Hola, ${state.name}!`;
  root.appendChild(h4);
}

// getUsers retorna una Promise
async function getUsers() {
  try {
    //Intentar hacer esto
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      //Si fallo, manda el error al catch
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    //Si fallo, ejecuta este console.log
    console.error("Error al obtener los usuarios:", error);
  }
}

function showUsers(users) {
  root.innerHTML += users.map(({ name }) => `<p>${name}</p>`).join("");
}
