import { Tree } from './tree.js';

const btnAdd = document.getElementById('btnAddValue');
const btnDel = document.getElementById('btnDelValue');

btnAdd.addEventListener('click', insertNode);
btnDel.addEventListener('click', removeNode);

window.onkeydown = (k) => {
    if (k.code === 'Enter' && !isNaN(inputValue.value)) {
        insertNode();
    } 
}


const inputValue = document.getElementById('inputValue');

const tree = new Tree();


function insertNode() {
    const value = parseInt(inputValue.value);

    if (!isNaN(value)) {
        tree.insert(value);
    }

    tree.render('tree-container');
}

function removeNode() {
    const value = parseInt(inputValue.value);

    if (!isNaN(value)) {
        tree.remove(value);
    }

    tree.render('tree-container');
}

