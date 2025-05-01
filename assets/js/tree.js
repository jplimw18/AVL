class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

export class Tree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    remove(value) {
        this.root = this._remove(this.root, value);
    }

    _insert(node, value) {
        if (!node) { return new Node(value); }

        if (value > node.value) { node.right = this._insert(node.right, value); }
        else if (value < node.value) { node.left = this._insert(node.left, value); }
        else { return node; }

        node.height = 1 + Math.max(this._getHeight(node.right), this._getHeight(node.left));

        return this._balance(node);
    }

    _remove(node, value) {
        if (!node) { return null; }

        if (value > node.right) { node.right = this._remove(node.right, value); }
        else if (value < node.left) { node.left = this._remove(node.left, value); }
        else {
            if (!node.left || !node.right) {
                return node.left || node.right;
            }

            let minLargerNode = this._getMinValueNode(node.right);
            node.value = minLargerNode.value;
            node.right = this._remove(node.right, minLargerNode.value);
        } 

        node.height = 1 + Math.max(this._getHeight(node.right), this._getHeight(node.left));
        return this._balance(node);
    }


    _getMinValueNode(node) {
        while (node.left) { node = node.left }
        return node;
    }

    _getHeight(node) {
        return node ? node.height : 0;
    }

    _getBalance(node) {
        return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
    }

    _balance(node) {
        let balance = this._getBalance(node);

        //rotação direita
        if (balance > 1 && this._getBalance(node.left) >= 0) {
            return this._rotateRight(node);
        }
        
        // rotação dupla direita
        if (balance > 1 && this._getBalance(node.left) < 0) {
            node.left = this._rotateLeft(node.left);
            return this._rotateRight(node);
        }

        //rptação esqeuerda
        if (balance < -1 && this._getBalance(node.right) <= 0) {
            return this._rotateLeft(node);
        }

        // rotação dupla esquerda
        if (balance < -1 && this._getBalance(node.right) > 0) {
            node.right = this._rotateRight(node.right);
            return this._rotateLeft(node);
        }

        return node;
    }


    _rotateLeft(node) {
        let y = node.right;
        let t2 = y.left;

        y.left = node
        node.right = t2;

        y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

        return y;
    }


    _rotateRight(node) {
        let y = node.left;
        let t2 = y.right;

        y.right = node;
        node.left = t2;

        y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

        return y;
    }

}

