// El array original, se copia y genera un nuevo array que es retornado
export const copiarArray = (arr) => [...arr];

// El array original, se copia, genera un nuevo array en el que se copian los valores del array original y el nuevo array y ese nuevo array genera es retornado
export const modificarArray = (arr, nuevoArray) => [...arr, ...nuevoArray];

const fnMap = (arr, cb) => {
  const newArr = [];

  for (const el of arr) {
    newArr.push(cb(el));
  }

  return newArr;
};
