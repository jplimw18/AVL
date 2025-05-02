import { Tree } from './tree.js';

const btnAdd = document.getElementById('btnAddValue');
const btnDel = document.getElementById('btnDelValue');

btnAdd.addEventListener('click', insertNode);
btnDel.addEventListener('click', removeNode);

window.onkeydown = async (k) => {
    if (k.code === 'Enter' && !isNaN(inputValue.value)) {
        await insertNode();
    } 
}


const inputValue = document.getElementById('inputValue');

const tree = new Tree();


async function insertNode() {
    const value = parseInt(inputValue.value);

    if (!isNaN(value)) {
        await tree.insert(value);
    }
}

async function removeNode() {
    const value = parseInt(inputValue.value);

    if (!isNaN(value)) {
        await tree.remove(value);
    }
}

