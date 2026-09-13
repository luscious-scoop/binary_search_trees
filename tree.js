function Tree(arr) {
  const array = [...new Set(arr)].sort((a, b) => a - b);

  let root = null;

  const getArray = () => array;

  return Object.freeze({
    getArray,
  });
}

let tr = Tree([6, 5, 10, 4, 4, 1, 3, 2, 10]);

console.log(tr.getArray());
