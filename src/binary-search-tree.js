const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    if (this.tree === null) {
      this.tree = {
        data: data,
        l_Child: null,
        r_Child: null,
      };
      return;
    }

    let currNode = this.tree;
    while (currNode !== null) {
      if (data === currNode.data) return;

      if (data > currNode.data) {
        if (currNode.r_Child === null) {
          currNode.r_Child = {
            data: data,
            l_Child: null,
            r_Child: null,
          };
          return;
        } else currNode = currNode.r_Child
      }

      if (data < currNode.data) {
        if (currNode.l_Child === null) {
          currNode.l_Child = {
            data: data,
            l_Child: null,
            r_Child: null,
          };
          return;
        } else currNode = currNode.l_Child
      }
    }
  }

  has(data) {
    let currNode = this.tree;
    while (currNode !== null) {
      if (data === currNode.data) {
        return true;
      }
      if (data > currNode.data) {
        currNode = currNode.r_Child
      } else {
        currNode = currNode.l_Child
      }
    }
    return false;
  }

  find(data) {
    let currNode = this.tree;
    while (currNode !== null) {
      if (data === currNode.data) {
        return currNode;
      }
      if (data > currNode.data) {
        currNode = currNode.r_Child
      } else {
        currNode = currNode.l_Child
      }
    }
    return null;
  }

  remove(data) {
    if (this.tree === null) return;

    let parent = this.tree;

    if (parent !== null && data === parent.data) {
      this.tree = this.removeNode(parent);
      return;
    }

    while (parent !== null) {
      if (parent.l_Child !== null && parent.l_Child.data === data) {
        parent.l_Child = this.removeNode(parent.l_Child);
        return;
      } else if (parent.r_Child !== null && parent.r_Child.data === data) {
        parent.r_Child = this.removeNode(parent.r_Child);
        return;
      }

      if (parent.r_Child !== null && data > parent.data) {
        parent = parent.r_Child;
      } else if (parent.l_Child !== null && data < parent.data) {
        parent = parent.l_Child;
      } else return;
    }
    return;
    // const nodeToRemove = this.tree.find(data);
    // if (nodeToRemove) {}
  }

  removeNode(nodeToRemove) {
    if (nodeToRemove.l_Child === null && nodeToRemove.r_Child === null) {
      nodeToRemove = null;
    } else if (nodeToRemove.l_Child === null) {
      nodeToRemove = nodeToRemove.r_Child;
    } else if (nodeToRemove.r_Child === null) {
      nodeToRemove = nodeToRemove.l_Child
    } else {
      let tempNode = this.moveToMinChild(nodeToRemove.r_Child);
      nodeToRemove.data = tempNode.data;
      nodeToRemove.r_Child = this.removeNode(nodeToRemove.r_Child);
    }
    return nodeToRemove;
  }

  moveToMinChild(node) {
    while (node.l_Child !== null) {
      node = node.l_Child;
    }
    return node;
  }

  min() {
    let currNode = this.tree;
    if (currNode === null) return null;
    while (currNode.l_Child !== null) {
      currNode = currNode.l_Child;
    }
    return currNode.data;
  }

  max() {
    let currNode = this.tree;
    if (currNode === null) return null;
    while (currNode.r_Child !== null) {
      currNode = currNode.r_Child;
    }
    return currNode.data;
  }
}

module.exports = {
  BinarySearchTree
};