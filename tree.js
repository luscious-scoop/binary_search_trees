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
    const node = getNode(value);

    if (node) {
      return true;
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

  function levelOrderForEachRec(callback, Q = [root]) {
    if (!callback) {
      throw new Error('No callback provided');
    }

    if (!root) {
      return;
    }
    if (Q.length === 0) {
      return;
    }
    const item = Q.shift();
    callback(item.data);

    if (item.left) {
      Q.push(item.left);
    }

    if (item.right) {
      Q.push(item.right);
    }

    levelOrderForEachRec(callback, Q);
  }

  function preOrderForEach(callback, node = root) {
    if (!callback) {
      throw new Error('No callback provided');
    }

    if (!node) {
      return;
    }

    callback(node.data);

    preOrderForEach(callback, node.left);
    preOrderForEach(callback, node.right);
  }

  function inOrderForEach(callback, node = root) {
    if (!callback) {
      throw new Error('No callback provided');
    }

    if (!node) {
      return;
    }

    inOrderForEach(callback, node.left);
    callback(node.data);
    inOrderForEach(callback, node.right);
  }

  function postOrderForEach(callback, node = root) {
    if (!callback) {
      throw new Error('No callback provided');
    }

    if (!node) {
      return;
    }

    postOrderForEach(callback, node.left);

    postOrderForEach(callback, node.right);
    callback(node.data);
  }

  function getNode(value, node = root) {
    if (!node) {
      return;
    }

    if (node.data === value) {
      return node;
    } else if (node.data > value && node.left !== null) {
      node = node.left;
    } else if (node.data < value && node.right !== null) {
      node = node.right;
    } else {
      return undefined;
    }

    return getNode(value, node);
  }

  function height(value) {
    const node = getNode(value);

    if (!node) {
      return undefined;
    }

    let leftSubTree = node.left;
    let rightSubtree = node.right;

    let leftSubtreeCount = 0;
    let rightSubtreeCount = 0;

    while (leftSubTree) {
      leftSubtreeCount++;
      leftSubTree = leftSubTree.left;
    }

    while (rightSubtree) {
      rightSubtreeCount++;
      rightSubtree = rightSubtree.right;
    }

    return Math.max(leftSubtreeCount, rightSubtreeCount);
  }

  return Object.freeze({
    getArray,
    prettyPrint,
    has,
    insert,
    deleteItem,
    levelOrderForEach,
    levelOrderForEachRec,
    preOrderForEach,
    inOrderForEach,
    postOrderForEach,
    height,
  });
}

const tr = Tree([1, 2, 3, 4]);

console.log(tr.height(2));
tr.prettyPrint();
