const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === '') {
    alert('Enter an item!');
    return;
  }
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
  itemInput.value = '';
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
function removeItem(e) {
  if (e.target.parentElement.className.includes('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}
function clearItems(e) {
  if (confirm('Are you sure?')) {
    e.target.previousElementSibling.innerHTML = '';
  }
  checkUI();
}
function checkUI() {
  const isEmpty = itemList.querySelectorAll('li').length === 0;
  clearBtn.style.display = isEmpty ? 'none' : 'block';
  itemFilter.style.display = isEmpty ? 'none' : 'block';
}
function filterItems(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach(item => {
    const itemName = item.firstChild.textContent.trim().toLowerCase();
    console.log(text, itemName);
    // if (itemName.includes(text)) {
    if (itemName.indexOf(text) != -1) {
      console.log(true);
      item.style.display = 'flex';
    } else {
      console.log(false);
      item.style.display = 'none';
    }
  });
}

// event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
