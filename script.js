const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');
const itemFilter = document.getElementById('filter');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
  checkUI();
}
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // validate new item
  if (newItem === '') {
    alert('Enter an item!');
    return;
  }
  // check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('Already exists!');
      itemInput.value = '';
      itemInput.focus();
      return;
    }
  }
  addItemToDOM(newItem); // create item DOM element
  addItemToStorage(newItem); //add item to local storage
  checkUI();
  itemInput.value = '';
}
function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
}
function createButton(classes) {
  const btn = document.createElement('button');
  btn.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  btn.appendChild(icon);
  return btn;
}
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
function onClickItem(e) {
  if (e.target.parentElement.className.includes('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target); // to je <li> element
  }
}
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item); // return true or false
}
function setItemToEdit(item) {
  isEditMode = true;
  // itemList.querySelectorAll('li').forEach(i => (i.style.color = '#333'));
  itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
  // item.style.color = '#ccc';
  item.classList.add('edit-mode');
  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
  itemInput.focus();
}
function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove(); // remove item from the dom
    removeItemFromStorage(item.textContent); // remove item from storage
    checkUI(); // reset the ui
  }
}
function removeItemFromStorage(item) {
  const items = getItemsFromStorage();
  const filteredItems = JSON.stringify(items.filter(i => i != item));
  localStorage.setItem('items', filteredItems);
}
function clearItems(e) {
  if (confirm('Are you sure?')) {
    e.target.previousElementSibling.innerHTML = '';
    // localStorage.clear();
    localStorage.removeItem('items'); // nebo takto
  }
  checkUI();
}
function checkUI() {
  itemInput.value = '';
  itemInput.focus();
  const isEmpty = itemList.querySelectorAll('li').length === 0;
  clearBtn.style.display = isEmpty ? 'none' : 'block';
  itemFilter.style.display = isEmpty ? 'none' : 'block';
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}
function filterItems(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach(item => {
    const itemName = item.firstChild.textContent.trim().toLowerCase();
    // if (itemName.includes(text)) {
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}
function init() {
  // event listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
