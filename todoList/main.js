const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

//console.log(form, input)

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = '';
  addTodo(value);
  displayTodo();
})

const todos = [

];

const displayTodo = () => {
  const todoNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }

  });
  ul.innerHTML = "";
  ul.append(...todoNode);
}


const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.setAttribute("class", `todo ${todo.done ? "done" : ""}`);
  const p = document.createElement("p");
  p.textContent = `${todo.text}`;
  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = 'Supprimer';
  buttonDelete.addEventListener('click', event => {
    event.stopPropagation();
    deleteTodo(index);
  });
  const buttonEdit = document.createElement("button");
  buttonEdit.textContent = 'Modifier';
  buttonEdit.addEventListener('click', event => {
    event.stopPropagation();
    toggleEditMode(index);
  })
  li.append(span, p, buttonEdit, buttonDelete);
  li.addEventListener('click', (event) => {
    toggleTodo(index)
  });
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement('button');
  buttonSave.textContent = "Save";
  buttonSave.addEventListener('click', event => {
    editMode(index, input);
  });
  const buttonCancel = document.createElement('button');
  buttonCancel.textContent = "Cancel";
  buttonCancel.addEventListener('click', event => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  li.append(input, buttonSave, buttonCancel);
  return li;
}

const addTodo = (text) => {
  todos.push({
    text,
    done: false
  });
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
  //console.log("salut")
}

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
}

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
}

const editMode = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
}
displayTodo();