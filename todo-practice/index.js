function submitEventHandler(event) {
    console.log("i have been invoked");
    event.preventDefault();

    let input = document.querySelector("#todo-input input");
    let todoText = input.value;
    input.value = "";
    if (editIndex<0){
        let todo=createTodo(todoText);
        todoArray.push(todo);
    } else {
        let todo=todoArray[editIndex];
        todo.text=todoText;
        editIndex=-1;
    }
  updateTable();
}
function updateTable() {
    todoTable.innerHTML = `<div class="table-row table-head"><div class="table-cell grow">Todo Description</div><div class="table-cell">Added On</div><div class="table-cell">Actions</div></div>`;

    for (let i = 0; i < todoArray.length; i++) {
        let todo = todoArray[i];
        let HTMLTemplete = `<div class="table-cell grow">${todo.text}</div>
    <div class="table-cell">${todo.time}</div>
    <div class="table-cell">  <a class="todo-delete" href=#">delete</a>
    <a class="todo-edit" href="#" >edit</a></div>`
        let wrapper = document.createElement("div");
        wrapper.classList = "table-row table-body";
        wrapper.id = "todo-" + i;
        wrapper.innerHTML = HTMLTemplete;
        wrapper.querySelector('.todo-delete').addEventListener("click",onDeleteClickHandler)
        wrapper.querySelector('.todo-edit').addEventListener("click",OnEditClickHandler)
        //let todoTable = document.querySelector(".todo-table");
        todoTable.appendChild(wrapper);


    }

}


let form = document.querySelector("#todo-input");
form.onsubmit = submitEventHandler;
let todoTable = document.querySelector(".todo-table");
let todoArray = [];
let editIndex=-1;
function createTodo(todoText) {
    return { text: todoText, time: "sep 12,03:12 pm" };
}

function onDeleteClickHandler(e) {
    e.preventDefault();
    //let clickedElement=e.target;
    //let parentElement=clickedElement.parentNode;
    let todoWrapper = e.target.parentNode.parentNode;
    let todoIndex = parseInt(todoWrapper.id.split('-')[1]);
    todoArray.splice(todoIndex, 1);
    updateTable();


}
function OnEditClickHandler(e) {
    e.preventDefault();
    let todoWrapper = e.target.parentNode.parentNode;
    let todoIndex = parseInt(todoWrapper.id.split('-')[1]);
    let todo=todoArray[todoIndex];
    document.querySelector("#todo-input input").value=todo.text;
    editIndex=todoIndex;


   
}