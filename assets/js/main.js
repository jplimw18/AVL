import { Tree } from './tree.js';

const btnAdd = document.getElementById('btnAddValue');
const btnDel = document.getElementById('btnDelValue');

btnAdd.addEventListener('click', insertNode);
btnDel.addEventListener('click', removeNode);


const inputValue = document.getElementById('inputValue');

const tree = new Tree();


function insertNode() {
    const value = parseInt(inputValue.value);

    if (!isNaN(value)) {
        tree.insert(value);
        render('tree-container', this);
    }
}

function removeNode() {
    const value = parseInt(inputValue.value);

    if (!isNaN(value)) {
        tree.insert(value);
        render('tree-container');
    }
}

function render(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    _renderNode(container, tree.root); 
}

function _renderNode(container, node, depth = 0) {
    if (!node) { return; }

    const nodeElement = document.createElement('article');
    nodeElement.className = "node";
    nodeElement.textContent = node.value;
    nodeElement.style.marginLeft = `${depth * 20}px`;
    nodeElement.style.marginTop = `${depth * 40}px`;

    container.appendChild(nodeElement);

    _renderNode(container, node.left, depth + 1);
    _renderNode(container, node.right, depth + 1);
}