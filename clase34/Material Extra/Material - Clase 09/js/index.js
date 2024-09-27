/*
  call-site y call-stack
*/

function fn1() {
  // call-stack: `fn1`
  // entonces el call-site es el objeto window

  console.log("fn1");
  fn2(); // <-- call-site de `fn2`
}

function fn2() {
  // call-stack: `fn1` -> `fn2`
  // entonces el call-site es `fn1`

  console.log("fn2");
  fn3(); // <-- call-site de `fn3`
}

function fn3() {
  // call-stack: `fn1` -> `fn2` -> `fn3`
  // entonces el call-site es `fn2`

  console.log("fn3");
}

console.log("call-stack");
fn1(); // <-- call-site de `fn1`
console.log(" ");

/*
  Contexto de Ejecución
*/

//Default Binding - Toda función almacena una referencia al Objeto window
function foo() {
  console.log("Default Binding:", this);
  console.log(this.a);
}

window.a = 2;
foo();
console.log(" ");

(() => {
  //Implicit Binding - Toda función almacena una referencia al Objeto que la contiene
  function foo() {
    console.log("Implicit Binding:", this);
    console.log(this.a);
  }

  const obj = {
    a: 4,
    foo: foo,
  };

  obj.foo();
  console.log(" ");
})();

(() => {
  //Implicit Binding Lost - Las Funciones Callback tienen el this de las funciones que las llaman
  function foo() {
    console.log(this.b);
  }

  function doFoo(cb) {
    // `cb` es una referencia de `foo`

    console.log("Pérdida de Implicit Binding:", this);
    cb(); //call-site cb = doFoo
  }

  const obj = {
    a: 2,
    foo: foo,
  };

  window.b = "oops, global"; // `a` propiedad del Objeto window

  //call-site dooFoo = Objeto window
  doFoo(obj.foo); // "oops, global"
  console.log(" ");
})();

(() => {
  //Explicit Binding - Forzar la ejecución dentro de un Contexto particular sin necesidad de almacenarla
  function foo() {
    console.log("Explicit Binding:", this);
    console.log(this.a);
  }

  const obj = {
    a: 10,
  };

  foo.call(obj);
  console.log(" ");
})();

(() => {
  //Hard Binding - Patrón que utiliza el Explicit Binding para evitar que las funciones callback "pierdan" el binding
  function foo(something) {
    console.log("Hard Binding (apply):", this);
    return this.a + something; //2 + 3
  }

  const obj = {
    a: 2,
  };

  const bar = function () {
    return foo.apply(obj, arguments);
  };

  const b = bar(3);
  console.log(b); // 5

  function fooBind(something) {
    console.log("Hard Binding (bind):", this);
    return this.a + something; //7 + 3
  }

  const objBind = {
    a: 7,
  };

  const barBind = fooBind.bind(objBind);

  const bBind = barBind(3);
  console.log(bBind); // 10
  console.log(" ");
})();

(() => {
  //new Binding - new crea un nuevo Objeto. (Hard Binding this)
  function foo(a) {
    console.log("new Binding:", this);
    this.a = a;
  }

  const bar = new foo(2);
  console.log(bar.a); // 2
  console.log(" ");
})();

(() => {
  /*
    Arrow Functions - Lexical this (vinculan this al Scope Léxico que almacena su referencia)
  */

  function foo() {
    return () => {
      // `this` => Contexto Léxico de `foo()`
      console.log("Lexical this:", this);
      console.log(this.a);
      //Cuando se almacena una referencia en el Objeto bar this = bar
    };
  }

  const obj1 = {
    a: 2,
  };

  const obj2 = {
    a: 3,
  };

  //El contexto léxico de foo es el Objeto bar
  //Tiene un Hard Binding al Objeto obj1
  const bar = foo.call(obj1);
  bar.call(obj2); // 2, not 3!
})();
