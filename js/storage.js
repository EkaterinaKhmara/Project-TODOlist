const addListStorage = function () {
    localStorage.setItem("el", ulVal.innerHTML);
    localStorage.setItem("list", ulVal.childElementCount);
    checkItemsOnList();
};

const getListStorage = function () {
    if (localStorage.getItem("list") >= 1) {
        ulVal.innerHTML = localStorage.getItem("el");
        checkItemsOnList();
    }
};

getListStorage();

const addNameStorage = function () {
    localStorage.setItem("name", "valName");
};

const getNameStorage = function () {
    newTitle = localStorage.getItem("name");
    changeTitle.innerHTML = newTitle;
};

getNameStorage();
