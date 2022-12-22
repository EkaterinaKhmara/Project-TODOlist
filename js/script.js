const btn = document.getElementById("but");
const inputVal = document.getElementById("item");
const ulVal = document.getElementById("ulList");
const btnS = document.getElementById("buttonS")
const delAllBut = document.getElementById("butDelAll");
const doneAllTask = document.getElementById("butDoneAll");
const delTaskSel = document.getElementById("butDelSel");
const numberInput = document.getElementById("numInpt");
const changeTitle = document.getElementById("nameListChange");
const btnEditTitle = document.getElementById("editTitle");
const btnSaveTitle = document.getElementById("saveTitle");

//Edit main title of list
function editMainTitle() {
    changeTitle.style.background = 'whitesmoke';
    btnEditTitle.style.display = 'none';
    btnSaveTitle.style.display = 'block';
    changeTitle.setAttribute('contenteditable', 'true');
}

//Save main title of list after edit
function saveMainTitle() {
    changeTitle.style.background = 'none';
    btnSaveTitle.style.display = 'none';
    btnEditTitle.style.display = 'block';
    changeTitle.setAttribute('contenteditable', 'false');
    const newTitle = changeTitle.innerText;
    localStorage.setItem("name", newTitle);
}

//Edit selected task
function editTask(event) {
    const textTask = event.currentTarget.parentNode.querySelector('.label');
    const btnEditTask = event.currentTarget.parentNode.querySelector('.butEdit');
    const btnSaveTask = event.currentTarget.parentNode.querySelector('.butSave');
    btnEditTask.style.display = 'none';
    btnSaveTask.style.display = 'block';
    textTask.setAttribute('contenteditable', 'true');
    textTask.oninput = function () {
        if (textTask.innerText.length > 0 && textTask.innerText.length <= 60) {
            btnSaveTask.disabled = false;
            textTask.style.border = 'none';
            textTask.style.borderRadius = '5px'
            textTask.setAttribute('contenteditable', 'true');
        } else if (textTask.innerText.length < 1) {
            btnSaveTask.disabled = true;
            textTask.style.border = '1px solid red';
        }
    }
}

//Save selected task after edit
function saveTask(event) {
    const textTask = event.currentTarget.parentNode.querySelector('.label');
    const btnEditTask = event.currentTarget.parentNode.querySelector('.butEdit');
    const btnSaveTask = event.currentTarget.parentNode.querySelector('.butSave');
    btnEditTask.style.display = 'block';
    btnSaveTask.style.display = 'none';
    textTask.setAttribute('contenteditable', 'false');
    addListStorage();
    localStorage.setItem("el", ulVal.innerHTML);
    localStorage.setItem("list", ulVal.childElementCount);
}

//Check for items in the list
function checkItemsOnList() {
    if (ulVal.childElementCount > 0) {
        btnS.style.display = "flex";
    } else if (ulVal.childElementCount <= 0) {
        btnS.style.display = "none";
    }
}

//Manipulation with input
inputVal.oninput = function () {
    inputVal.value = inputVal.value.substring(0, 60);
    const valEnterInpt = parseInt(numberInput.innerHTML, 10);
    let counting = valEnterInpt - 1;
    if (counting == -1) return 0;
    let num = 60 - inputVal.value.length;
    numberInput.innerHTML = `${num}`;
    counting = num;
    document.onkeydown = function (e) {
        const countingBack = valEnterInpt + 1;
        if (e.keyCode === 8) {
            if (countingBack == 62) {
                return 60;
            }
            numberInput.innerHTML = '60';
        }
    }
    inputVal.onkeydown = function (e) {
        if (e.keyCode === 13) {
            clickAddButt();
        }
    }
}

//Clicking on the "add" button
function clickAddButt() {
    if (inputVal.value.trim()) {
        inputVal.style.border = "1px solid #cd5d00";
        ulVal.insertAdjacentHTML('beforeend', `<li>
        <button class="butDel" onclick="delSomeTask(event)"><img src="img/close-icon.png" alt="delete"></button>
        <input class="chboxInput" type="checkbox" onclick="eventChkbox(event)" name="todoList">
        <p class="label">${inputVal.value}</p>
        <button class="butEdit" onclick="editTask(event)">Edit</button>
        <button class="butSave" onclick="saveTask(event)">Save</button></li>`);
        inputVal.value = "";
        numberInput.innerHTML = "60";
        checkItemsOnList();
        addListStorage();
        localStorage.setItem(`el`, ulVal.innerHTML);
        localStorage.setItem('list', ulVal.childElementCount);
    } else {
        inputVal.style.border = "3px solid red";
    }
}

//Event with checkboxes
function eventChkbox(event) {
    const inputChbox = event.target;
    const findLabel = inputChbox.parentNode.querySelector(".label");
    if (inputChbox.checked == true) {
        findLabel.style.textDecoration = "line-through";
    }
    else if (inputChbox.checked == false) {
        findLabel.style.textDecoration = "none";
    }
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

//Event with checkboxes when all tasks selecting
function selectAllLabels() {
    const allLi = ulVal.querySelectorAll("li");
    const arr = [];

    allLi.forEach((li) => {
        arr.push(li.querySelector("input").checked);
    });

    const isNotMarked = arr.filter(input => input == false);

    if (isNotMarked.length) {
        allLi.forEach((li) => {
            li.querySelector("input").checked = true;
            li.querySelector(".label").style.textDecoration = "line-through";
        })
    } else {
        allLi.forEach((li) => {
            li.querySelector("input").checked = false;
            li.querySelector(".label").style.textDecoration = "none";
        })
    }
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

//Deleting tasks selectively
function deleteTasksSelectly() {
    const allLiInpt = ulVal.querySelectorAll("li input:checked");
    allLiInpt.forEach(allLiInpt => allLiInpt.parentNode.remove());
    checkItemsOnList();
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

//Deleting some tasks
function delSomeTask(event) {
    const button = event.currentTarget;
    button.parentNode.remove();
    checkItemsOnList();
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

//Click main delete button
function clickDelButt() {
    ulVal.innerHTML = "";
    btnS.style.display = "none";
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

btn.addEventListener("click", clickAddButt);
doneAllTask.addEventListener("click", selectAllLabels);
delAllBut.addEventListener("click", clickDelButt);
delTaskSel.addEventListener("click", deleteTasksSelectly);
btnEditTitle.addEventListener("click", editMainTitle);
btnSaveTitle.addEventListener("click", saveMainTitle);