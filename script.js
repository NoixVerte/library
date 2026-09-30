// const library = [];
const libraryDiv = document.querySelector(".library");
const addBookBtn = document.querySelector("#addBookBtn");
const dialog = document.querySelector("dialog");
const closeModalBtn = document.querySelector("#closeModalBtn");
const submitBookBtn = document.querySelector("#submitBookBtn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatusInputs = document.getElementsByName("readStatus");
let readStatusInput;

class Book {
    constructor(name, author, pageAmount, hasBeenRead) {
        this.name = name;
        this.author  = author;
        this.pageAmount = pageAmount;
        this.hasBeenRead = hasBeenRead;
    }

    toggleReadStatus() {
        this.hasBeenRead  = !this.hasBeenRead;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary(name, author, pageAmount, hasBeenRead) {
        const newBook = new Book(name, author, pageAmount, hasBeenRead);
        this.library.push(newBook);
    }

    addRandomBooksToLibrary() {
        for (let i = 1; i <= 3; i++) {
            this.addBookToLibrary(`Book ${i}`, `Author ${i}`, `${Math.floor(Math.random() * 250 + 101)}`, Math.random() > 0.5);
        }
    }

    wipeShelves() {
        while (libraryDiv.hasChildNodes()) {
            libraryDiv.firstChild.remove();
        }
    }

    updateShelves() {
        this.wipeShelves();
        const fragment = document.createDocumentFragment();
        this.library.forEach(book => {
            const div = document.createElement("div");
            div.classList.add("book");
            const name = document.createElement("h1");
            const author = document.createElement("h2");
            const pages = document.createElement("h3");
            const readStatus = document.createElement("h4");
            name.innerText = book.name;
            author.innerText = book.author;
            pages.innerText = book.pageAmount + " pages";
            readStatus.innerText = book.hasBeenRead ? "Has been read" : "Has not been read";
            const bookDeletionBtn = document.createElement("button");
            bookDeletionBtn.innerText = "Delete";
            bookDeletionBtn.classList.add("bookDeletionBtn");
            const readStatusToggleInput = document.createElement("input");
            readStatusToggleInput.classList.add("readStatusToggleInput");
            readStatusToggleInput.type = "checkbox";
            if (book.hasBeenRead) {
                readStatusToggleInput.checked = true;
            }
            div.append(name, author, pages, readStatus, bookDeletionBtn, readStatusToggleInput);
            fragment.append(div);
        });
        libraryDiv.append(fragment);
        let bookDeletionBtns = document.getElementsByClassName("bookDeletionBtn");
        for (let i = 0; i < bookDeletionBtns.length; i++) {
            bookDeletionBtns[i].addEventListener("click", () => {
                this.library.splice(i, 1);
                this.updateShelves();
            });
        }
        let readStatusToggleInputs = document.getElementsByClassName("readStatusToggleInput");
        for (let i = 0; i < readStatusToggleInputs.length; i ++) {
            readStatusToggleInputs[i].addEventListener("click", () => {
                this.library[i].toggleReadStatus();
                if (this.library[i].hasBeenRead) {
                    readStatusToggleInputs[i].checked = true;
                } else {
                    readStatusToggleInputs[i].checked = false;
                }
                this.updateShelves();
            })
        }
    }
}

let MyLibrary = new Library();

addBookBtn.addEventListener("click", ()  => {
    titleInput.value  = "";
    authorInput.value = "";
    pagesInput.value = "";
    readStatusInput = null;
    dialog.style.display = "flex";
    dialog.showModal();
});

closeModalBtn.addEventListener("click", ()  => {
    dialog.style.display = "none";
    dialog.close();
});

submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    readStatusInputs.forEach(element => {
        if (element.checked) {
            if (element.getAttribute("value") == "true")  {
                readStatusInput = true;
            } else readStatusInput = false;
        };
    });
    if (titleInput.value != "" && authorInput.value  != "" && pagesInput.value != "") {
        MyLibrary.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readStatusInput);
        dialog.style.display = "none";
        dialog.close();
        MyLibrary.updateShelves();
    }
});

MyLibrary.addRandomBooksToLibrary();
MyLibrary.updateShelves();
