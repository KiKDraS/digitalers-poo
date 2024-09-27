//Elementos del HTML
const hard = document.querySelector(".hard");
const newBinding = document.querySelector(".new");
const arrow = document.querySelector(".arrow");

//Funciones en el Objeto window
function mapear(condition) {
  const arr = [];
  for (const el of this.array) {
    arr.push(condition(el));
  }
  return arr;
}

function duplicar(el) {
  return `<h4 class="text-success">${el * 2}</h4>`;
}

/*
  Hard Binding
*/

//bind
const contexto1 = {
  array: [1, 2, 3],
};
const mapContexto1 = window.mapear.bind(contexto1);

hard.innerHTML = "<h3>Bind</h3>";
hard.innerHTML += mapContexto1(duplicar).join("");

//call
hard.innerHTML += "<h3>Call</h3>";
hard.innerHTML += mapear.call(contexto1, duplicar).join("");

//apply
hard.innerHTML += "<h3>Apply</h3>";
hard.innerHTML += mapear.apply(contexto1, [duplicar]).join("");

/*
  new Binding
*/

function CrearContexto(fn) {
  this.array = [4, 5, 6];
  this.mapear = fn;
}

const contexto2 = new CrearContexto(mapear);

newBinding.innerHTML = contexto2.mapear(duplicar).join("");

/*
  Arrow Function
*/

const contexto3 = {
  array: [7, 8, 9],
  mapear,
};

const duplicado = (el) => `<h4 class="text-success">${el * 2}</h4>`;

arrow.innerHTML = contexto3.mapear(duplicado).join("");
