const btn = document.getElementById("but");
const inputVal = document.getElementById("item");
const ulVal = document.getElementById("ulList");
const btnS = document.getElementById("buttonS")
const delAllBut = document.getElementById("butDelAll");
const doneAllTask = document.getElementById("butDoneAll");
const delTaskSel = document.getElementById("butDelSel");
const numberInput = document.getElementById("numInpt");
const firstBoxList = document.getElementById("one");
const secondBoxList = document.getElementById("two");
const changeName = document.getElementById("nameListChange");
const nameBoxList = firstBoxList.querySelector("p");
const addNewTabButton = document.getElementById("addNewList");

const imgCloseTab = firstBoxList.querySelector("img");

// function eCloseImg(event){
//     const imgCloseBut = event.target;
//     this.parentNode.remove();
//     firstBoxList.style.display = "none";
//     changeName.innerHTML = "Name of my list";
//     nameBoxList.innerHTML = "Name of my list";
//     ulVal.innerHTML = "";
//         // LOCAL STORAGE
//         addListStorage();
//         localStorage.setItem(`el`, ulVal.innerHTML);
//         localStorage.setItem('list', ulVal.childElementCount);
// }

function clickImgCloseTab(){
    firstBoxList.style.display = "none";
    changeName.innerHTML = "Name of my list";
    nameBoxList.innerHTML = "Name of my list";
    ulVal.innerHTML = "";
}

function addNewTab(){
    if(firstBoxList){
        secondBoxList.style.display = "flex";
    }
}

addNewTabButton.addEventListener("click", addNewTab);



function changeMainName(){
    firstBoxList.style.display = "flex";
    const valueName = changeName.innerText;
    nameBoxList.innerHTML = valueName;
    addNameStorage();
    localStorage.setItem("name", valueName);
};

function checkItemsOnList(){
    if(ulVal.childElementCount > 0){
        btnS.style.display = "flex";
        firstBoxList.style.display = "flex";
    }else if(ulVal.childElementCount <= 0){
        btnS.style.display = "none";
    }
}

inputVal.oninput = function(){
    inputVal.value = inputVal.value.substring(0, 60);
    const valEnterInpt = parseInt(numberInput.innerHTML, 10);
    const counting = valEnterInpt - 1;
        if(counting == -1) return 0;
    numberInput.innerHTML = `${counting}`;

    document.onkeydown = function(e) {
        const countingBack = valEnterInpt + 1;
        if(e.keyCode === 8){ 
            if(countingBack == 62) return 60;
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
        <button class="butDel" onclick="delSomeTask(event)"><img src="img/close-icon.png" alt="delete"></button>
        <input class="chboxInput" type="checkbox" onclick="eventChkbox(event)" name="todoList">
        <label class="label" contenteditable="true">${inputVal.value}</label></li>`);
        inputVal.value = "";
        numberInput.innerHTML = "60";
        checkItemsOnList();
        addListStorage();
        console.log(ulVal.childElementCount);
        // LOCAL STORAGE
        localStorage.setItem(`el`, ulVal.innerHTML);
        localStorage.setItem('list', ulVal.childElementCount);
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
        // LOCAL STORAGE
        addListStorage();
        localStorage.setItem(`el`, ulVal.innerHTML);
        localStorage.setItem('list', ulVal.childElementCount);
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
    // LOCAL STORAGE
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

function deleteTasksSelectly(){
    const allLiInpt = ulVal.querySelectorAll("li input:checked");
    allLiInpt.forEach(allLiInpt => allLiInpt.parentNode.remove());
    checkItemsOnList();
    // LOCAL STORAGE
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

function delSomeTask(event){
    const button = event.currentTarget;
    button.parentNode.remove();
    checkItemsOnList();
    // LOCAL STORAGE
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

function clickDelButt(){
    ulVal.innerHTML = "";
    btnS.style.display = "none";
    // LOCAL STORAGE
    addListStorage();
    localStorage.setItem(`el`, ulVal.innerHTML);
    localStorage.setItem('list', ulVal.childElementCount);
}

btn.addEventListener("click", clickAddButt);

doneAllTask.addEventListener("click", selectAllLabels);

delAllBut.addEventListener("click", clickDelButt);

delTaskSel.addEventListener("click", deleteTasksSelectly);

imgCloseTab.addEventListener("click", clickImgCloseTab);

changeName.addEventListener("input", changeMainName);
















// firstBoxList.style.display = "none";
// changeName.innerHTML = "Name of my list";
// nameBoxList.innerHTML = "Name of my list";
// ulVal.innerHTML = "";

// const delTab = firstBoxList.style.display = "none";
// const delMainName = changeName.innerHTML = "Name of my list";
// const delTabName = nameBoxList.innerHTML = "Name of my list";
// const delList = ulVal.innerHTML = "";

// function clickImgCloseTab(){
//     firstBoxList.style.display = "none";
//     changeName.innerHTML = "Name of my list";
//     nameBoxList.innerHTML = "Name of my list";
//     ulVal.innerHTML = "";
    // console.log(changeName.value);
    // changeName.innerHTML = "Name of my list";
    // nameBoxList.innerHTML = "Name of my list";
    // clickDelButt();
    // addDelTabStorage();
    // localStorage.setItem("TabDel", document.innerHTML = delTab);
    // localStorage.setItem("TabDel", document.innerHTML = delMainName);
    // localStorage.setItem("TabDel", document.innerHTML = delTabName);
    // localStorage.setItem("TabDel", document.innerHTML = delList);
// }

// const addDelTabStorage = function(){
//     // localStorage.setItem("TabDel", delTab);
//     // localStorage.setItem("MainNameDel", delMainName);
//     // localStorage.setItem("TabNameDel", delTabName);
//     // localStorage.setItem("ListDel", delList);
//     // localStorage.setItem("TabDel", document.innerHTML = delTab);
//     localStorage.setItem("TabDel", document.innerHTML = delMainName);
//     localStorage.setItem("TabDel", document.innerHTML = delTabName);
//     localStorage.setItem("TabDel", document.innerHTML = delList);
// };

// const getDelTabStorage = function(){
//     // firstBoxList.innerHTML = localStorage.getItem("TabDel");
//     changeName.innerHTML = localStorage.getItem("MainNameDel");
//     nameBoxList.innerHTML = localStorage.getItem("TabNameDel");
//     ulVal.innerHTML = localStorage.getItem("ListDel");  
//     console.log(changeName.innerHTML = localStorage.getItem("MainNameDel"));  
// };

// getDelTabStorage();