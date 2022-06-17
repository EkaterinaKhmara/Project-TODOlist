const btn = document.getElementById("but");
const inputVal = document.getElementById("item");
const ulVal = document.getElementById("ulList");
const delAllBut = document.getElementById("butDelAll");
const doneAllTask = document.getElementById("butDoneAll");
const delTaskSel = document.getElementById("butDelSel");
const numberInput = document.getElementById("numInpt");


inputVal.oninput = function(){
    inputVal.value = inputVal.value.substring(0, 45);
    const valEnterInpt = parseInt(numberInput.innerHTML, 10);
    const counting = valEnterInpt - 1;
        if(counting == -1) return 0;
    numberInput.innerHTML = `${counting}`;

    document.onkeydown = function(e) {
        const countingBack = valEnterInpt + 1;
        if(e.keyCode === 8){ 
            if(countingBack == 47) return 45;
        numberInput.innerHTML = `${countingBack}`;
        }
    }
    
    inputVal.onkeydown = function(e) {
        if(e.keyCode === 13){ 
            clickAddButt();
        }
    }
}

function clickAddButt(){
    if(inputVal.value.trim()){
        inputVal.style.border = "1px solid #cd5d00";
        ulVal.insertAdjacentHTML('beforeend', `<li>
        <button class="butDel" onclick="delSomeTask(event)"><b>X</b></button>
        <input class="chboxInput" type="checkbox" onclick="eventChkbox(event)" name="todoList">
        <label class="label" contenteditable="true">${inputVal.value}</label></li>`);
        inputVal.value = "";
        numberInput.innerHTML = "45";
    }else{
        inputVal.style.border = "3px solid red";
    }
}

function eventChkbox(event){
    const inputChbox = event.target;
    const findLabel = inputChbox.parentNode.querySelector("label");
        if(inputChbox.checked == true){
            findLabel.style.textDecoration = "line-through";
        }
        else if(inputChbox.checked == false){
            findLabel.style.textDecoration = "none";
        }
}

function selectAllLabels(){
    const allLi = ulVal.querySelectorAll("li");
    const arr = [];

    allLi.forEach((li) => {
        arr.push(li.querySelector("input").checked);
    });

    const isNotMarked = arr.filter(input => input == false);

    if(isNotMarked.length){
        allLi.forEach((li) => {
            li.querySelector("input").checked = true;
            li.querySelector("label").style.textDecoration = "line-through";
        })
    }else{
        allLi.forEach((li) => {
            li.querySelector("input").checked = false;
            li.querySelector("label").style.textDecoration = "none";
        })
    }
}

function deleteTasksSelectly(){
    const allLiInpt = ulVal.querySelectorAll("li input:checked");
    allLiInpt.forEach(allLiInpt => allLiInpt.parentNode.remove());
}

function delSomeTask(event){
    const button = event.currentTarget;
    button.parentNode.remove();
}

function clickDelButt(){
    ulVal.innerHTML = "";
}

btn.addEventListener("click", clickAddButt);

doneAllTask.addEventListener("click", selectAllLabels);

delAllBut.addEventListener("click", clickDelButt);

delTaskSel.addEventListener("click", deleteTasksSelectly);