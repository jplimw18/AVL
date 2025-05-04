class Node {
    constructor(value, x = 0, y = 0) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.x = x;
        this.y = y;
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
        
        if (value > node.value) { node.right = this._remove(node.right, value); }
        else if (value < node.value) { node.left = this._remove(node.left, value); }
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
    
    _getHeight(node = this.root) {
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
        
        // this.highlightNode(getElementByValue(node.value));
        // this.highlightNode(getElementByValue(y.value));

        y.left = node
        node.right = t2;
        
        y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
        
        return y;
    }
    
    
    _rotateRight(node) {
        let y = node.left;
        let t2 = y.right;

        // this.highlightNode(getElementByValue(node.value));
        // this.highlightNode(getElementByValue(y.value));
        
        y.right = node;
        node.left = t2;
        
        y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
        node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
        
        return y;
    }
    
    
    // render(containerId) {
    //     const container = document.getElementById(containerId);
    //     container.innerHTML = "";
    //     this._renderNode(container, this.root, container.offsetWidth / 2, 20);
    // }

    render(containerId) {
        const container = document.getElementById(containerId);
        const height = this._getHeight();

        const nodeMap = {}; 
        container.querySelectorAll('.node').forEach(nodeEl => {
            nodeMap[nodeEl.textContent] = nodeEl;
        });
    
        container.querySelectorAll('.line').forEach(line => line.remove());

        container.style.transform = `scale(${Math.min(1, 10 / height)})`;
        container.style.transformOrigin = 'top center';
    
        this._renderAnimated(container, this.root, container.offsetWidth / 2, 20, 1, null, nodeMap);

        for (const value in nodeMap) {
            nodeMap[value].classList.add('fade-out');
            setTimeout(() => nodeMap[value].remove(), 500);
        }
    }

    _renderAnimated(container, node, x, y, level = 1, parent = null, nodeMap) {
        if (!node) return;

        const childHeight = Math.max(this._getHeight(node.left), this._getHeight(node.right));

        const baseSpacing = 80;
        const funnelFactor = Math.pow(1.4, childHeight - level);
        const spacingX = baseSpacing * funnelFactor;
        const spacingY = 80 * Math.pow(1.2, childHeight);
    

        
        let nodeEl = nodeMap[node.value];
        if (!nodeEl) {
            nodeEl = document.createElement('div');
            nodeEl.className = 'node';
            nodeEl.textContent = node.value;
            container.appendChild(nodeEl);
        }
    
        delete nodeMap[node.value];
    
        nodeEl.style.left = `${x}px`;
        nodeEl.style.top = `${y}px`;
    
        if (parent) {
            const x1 = parent.x + 20;
            const y1 = parent.y + 20;
            const x2 = x + 20;
            const y2 = y + 20;
    
            const dx = x2 - x1;
            const dy = y2 - y1;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
            const line = document.createElement('div');
            line.className = 'line';
            line.style.width = `${length}px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            container.appendChild(line);
        }
    
        node.x = x;
        node.y = y;
    
        this._renderAnimated(container, node.left, x - spacingX, y + spacingY, level + 1, node, nodeMap);
        this._renderAnimated(container, node.right, x + spacingX, y + spacingY, level + 1, node, nodeMap);
    }
    
    highlightNode(node) {

        if (!node) return;
    
        node.classList.add('highlight');
    
        setTimeout(() => {
            node.classList.remove('highlight')
        }, 1000);
    }
}


function getElementByValue(value) {
    return Array.from(document.querySelectorAll('.node')).find(el => el.textContent == value);
}