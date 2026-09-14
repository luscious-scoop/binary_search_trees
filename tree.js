import { Node } from './node.js';

function Tree(arr) {
  const array = [...new Set(arr)].sort((a, b) => a - b);

  let root = buildTree(array);

  const getArray = () => array;

  function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((end + start) / 2);
    const root = new Node(array[mid]);

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);
    return root;
  }

  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  };

  function has(value) {
    let curr = root;

    while (curr !== null) {
      if (curr.data === value) {
        return true;
      } else if (curr.data > value && curr.left !== null) {
        curr = curr.left;
      } else if (curr.data < value && curr.right !== null) {
        curr = curr.right;
      } else {
        break;
      }
    }

    return false;
  }

  function insert(value) {
    const temp = new Node(value);

    if (!root) {
      root = temp;
    }

    let curr = root;
    while (curr !== null) {
      if (curr.data === value) {
        break;
      } else if (value < curr.data && curr.left !== null) {
        curr = curr.left;
      } else if (value > curr.data && curr.right !== null) {
        curr = curr.right;
      } else {
        break;
      }
    }

    if (curr.data > value) {
      curr.left = temp;
    } else if (curr.data < value) {
      curr.right = temp;
    }
  }

  return Object.freeze({
    getArray,
    prettyPrint,
    has,
    insert,
  });
}

let tr = Tree([1, 2, 3, 4, 5, 6, 7]);

tr.prettyPrint();
