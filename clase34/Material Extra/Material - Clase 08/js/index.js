/*
    Tipos de Funciones
*/

//Callback - Función pasada como argumento de otra

//Declaro una función con un parámetro.
//En el cuerpo de la función, ejecuto el parámetro
function fnEjecutante(cb) {
  cb();
}

//Ejecuto la función declarada y le paso como argumento una función
//La función pasada se ejecuta como consecuencia de la ejecución de la primera
fnEjecutante(function () {
  console.log("Soy una función callback");
});

fnEjecutante(() => console.log("Soy una función callback"));

function fnCB() {
  console.log("Soy una función callback");
}

fnEjecutante(fnCB);

//Funciones de Orden Superior - Función que ejecuta funciones callback o retorna otra (o las dos)

//Recibe una callback y la ejecuta
function fnOS1(cb) {
  const resultado = cb();
  console.log(resultado);
}

fnOS1(() => 2 + 2);

//La ejecución retorna una función.
function fnOS2() {
  const nuevaFn = () =>
    console.log("Función retornada por la Función de Orden Superior");
  return nuevaFn;
}
//fnRetornada almacena la función creada como consecuencia de ejecutar fnOS2
const fnRetornada = fnOS2();
//fnRetornada es una función
fnRetornada();

//Recibe una cb que usa los valores en la constantes internas n1 y n2.
//Almacena el return de la callback en resultado.
//Retorna una función que recibe un número para sumarlo al valor almacenado en resultado (Closure)
function fnOS3(cb) {
  const n1 = 2;
  const n2 = 2;
  const resultado = cb(n1, n2);
  return (n3) => console.log(resultado + n3);
}

const sumar = fnOS3((num1, num2) => num1 + num2);
sumar(2);

/*
  this
*/

this.nombre = "Pepe";

function saludo() {
  console.log(`Hola ${this.nombre}`);
}

const obj = {
  nombre: "Pepa",
  saludo,
};

saludo();
obj.saludo();
