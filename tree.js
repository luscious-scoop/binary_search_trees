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

  function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  function deleteItem(value, curr = root) {
    if (curr === null) {
      return curr;
    }

    if (curr.data > value) {
      curr.left = deleteItem(value, curr.left);
    } else if (curr.data < value) {
      curr.right = deleteItem(value, curr.right);
    } else {
      if (curr.left === null) {
        return curr.right;
      }
      if (curr.right === null) {
        return curr.left;
      }

      let succ = getSuccessor(curr);
      curr.data = succ.data;
      curr.right = deleteItem(succ.data, curr.right);
    }
    return curr;
  }

  function levelOrderForEach(callback = null) {
    const queue = [];

    if (!root) {
      return;
    }
    if (!callback) {
      throw new Error('No callback provided');
    }

    queue.push(root);

    while (queue.length !== 0) {
      const node = queue.shift();

      callback(node.data);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }
  return Object.freeze({
    getArray,
    prettyPrint,
    has,
    insert,
    deleteItem,
    levelOrderForEach,
  });
}

let tr = Tree([1, 2, 3, 4, 5, 6, 7]);

tr.levelOrderForEach((value) => {
  console.log(value);
});
