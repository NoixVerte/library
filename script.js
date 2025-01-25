const library = [];
const body = document.querySelector("body");

function Book(name, author, pageAmount, hasBeenRead) {
    this.name = name;
    this.author  = author;
    this.pageAmount = pageAmount;
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(name, author, pageAmount, hasBeenRead) {
    const newBook = new Book(name, author, pageAmount, hasBeenRead);
    library.push(newBook);
}

function wipeShelves() {
    while (body.hasChildNodes()) {
        body.firstChild.remove();
    }
}

function updateShelves() {
    wipeShelves();
    library.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("book");
        const name = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const readStatus = document.createElement("p");
        name.innerText = book.name;
        author.innerText = book.author;
        pages.innerText = book.pageAmount + " pages";
        readStatus.innerText = book.hasBeenRead ? "Has been read" : "Has not been read";
        div.append(name, author, pages, readStatus);
        body.append(div);
    });
}

for (let i = 1; i <= 20; i++) {
    addBookToLibrary(`Book ${i}`, `Author ${i}`, `${Math.floor(Math.random() * 250 + 101)}`, Math.random() > 0.5);
}

updateShelves();
