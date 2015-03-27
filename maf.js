class Node {
    constructor() {
        this.prev = null;
        this.next = null;
    }
}

class SymbolNode extends Node {
    constructor(symbol) {
        super();
        this.symbol = symbol;
    }
}

// Operations
// Level 4: parens, sqrt, functions, etc.
// Level 3: exponent
// Level 2: multiply, divide
// Level 1: add, subtract

// TODO: start adding constraints permitting operations from only one level
class ContainerNode extends Node {
    constructor() {
        super();
        this.children = new NodeList(this);
    }
    
    append(node) {
        node.parent = this;
        this.children.append(node);
    }
    
    remove(node) {
        if (node.parent == this) {
            this.children.remove(node);
        }
    }
    
    inserBefore(newNode, refNode) {
        if (refNode.parent === this) {
            newNode.parent.remove(newNode);
            newNode.parent = this;
            this.children.insertBefore(newNode, refNode);
        }
    }
    
    insertAfter(newNode, refNode) {
        if (refNode.parent === this) {
            newNode.parent.remove(newNode);
            newNode.parent = this;
            this.children.insertAfter(newNode, refNode);
        }
    }
}

class NodeList {
    constructor() {
        this.first = null;
        this.last = null;
    }
    
    append(node) {
        if (this.first == null && this.last == null) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            node.prev = this.last;
            this.last = node;
        }
    }
    
    remove(node) {
        if (node.prev && node.next) { // remove
            node.prev.next = node.next;
            node.next.prev = node.prev;
        } else if (node.prev) {
            node.prev.next = null;
            this.last = node.prev;
        } else if (node.next) {
            node.next.prev = null;
            this.first = node.next;
        } else {
            this.first = null;
            this.last = null;
        }
    }

    insertBefore(newNode, refNode) {
        newNode.prev = refNode.prev;
        newNode.prev.next = newNode;
        newNode.next = refNode;
        refNode.prev = newNode;
    }

    insertAfter(newNode, refNode) {
        newNode.next = refNode.next;
        newNode.next.prev = newNode;
        newNode.prev = refNode;
        refNode.next = newNode;
    }
    
    toArray() {
        var node = this.first;
        var array = [];
        while (node) {
            if (node instanceof ContainerNode) {
                array.push(node.children.toArray());
            } else {
                array.push(node.symbol);
            }
            node = node.next;
        }
        return array;
    }
}

module.exports = {
    NodeList: NodeList,
    SymbolNode: SymbolNode,
    ContainerNode: ContainerNode
};
