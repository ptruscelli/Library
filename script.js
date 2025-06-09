// const { createElement } = require("react");



const cardsContainer = document.querySelector("#cardsContainer");
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".openModal");
const formSubmit = document.querySelector(".formSubmit");
const bookForm = document.querySelector("#addBookForm");


// Array containing books
let myLibrary = [];



// Object constructor for book instances
function Book(title, author, pageCount, readStatus) {
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
    this.onPage = false;
    this.id = crypto.randomUUID();

};




// function that creates a book instance and adds it to myLibrary array
function addBook(title, author, pageCount, readStatus) {
    const newBook = new Book(title, author, pageCount, readStatus);
    myLibrary.push(newBook);
};



// function that removes the "book card" element when its delete button is pressed
function removeBook(bookCard, id) {
    myLibrary = myLibrary.filter(obj => obj.id !== id); // remove book object from array of books
    bookCard.remove(); // remove book card element from DOM
}



// function that creates a book as a HTML element "card" from the user form data
function createBookCard(book) {
    
    const bookCard = document.createElement("div");
    bookCard.dataset.id = book.id; // attach unique book id to element to be able to identify it in DOM
    bookCard.classList.add("card");

    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pageCount = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const readStatusToggle = createReadToggle(book.readStatus);

    title.textContent = `${book.title}`;
    author.textContent = book.author;
    pageCount.textContent = `${book.pageCount} Pages`;

    deleteBtn.textContent = `Remove Book`;
    deleteBtn.addEventListener("click", () => removeBook(bookCard, book.id));
    deleteBtn.classList.add("deleteBtn");

    bookCard.append(title, author, pageCount, readStatusToggle, deleteBtn);

    return bookCard;
};



// function that loops through array and displays each book as a card on the page
function addToPage() {

    for(const book of myLibrary) {
        if (!book.onPage) { // only books that aren't already on the page get added

            const bookCard = createBookCard(book);

            cardsContainer.appendChild(bookCard);
            book.onPage = true; // track that the added book is now on the page
        };
    };
};



// function to create read status 3-state toggle switch 
function createReadToggle(status = "not-read") {

    const switchContainer = document.createElement("div");
    switchContainer.classList.add("switch-container");

    const switchToggle = document.createElement("div");
    switchToggle.classList.add("switch-toggle");

    const labels = ["Not Read", "In Progress", "Finished"];
    const radioName = crypto.randomUUID(); // declare random name outside forEach so that the 3 radio inputs get same random name

    ["not-read", "in-progress", "finished"].forEach((value, i) => {

        const input = document.createElement("input");
        input.type = "radio";
        input.id = crypto.randomUUID();
        input.name = radioName;
        input.value = value;
        if (status === value) input.checked = true;

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = labels[i];

        switchToggle.appendChild(input);
        switchToggle.appendChild(label);

    });

    const span = document.createElement("span");
    span.classList.add("moving-label");
    switchToggle.appendChild(span);

    switchContainer.appendChild(switchToggle);

    return switchContainer;
};








openModal.addEventListener('click', () => {
    bookForm.reset(); // clear form inputs before each use
    modal.showModal();
});


modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    };
    // close dialog in case of clicking outside the dialog
});


bookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stop html default behaviour of refreshing page
   
    // take data from form and store in object
    const formData = Object.fromEntries(new FormData(event.target).entries()); // event.target === bookForm
    const readStatus = formData.formReadStatus; // "not-read", "in-progress" or "finished"

    // const isRead = formData.formRead === 'on' // same as formData.read === 'on' ? true : false;

    addBook(
        formData.formTitle,
        formData.formAuthor,
        formData.formPageNumber,
        readStatus
    );

    addToPage();
    modal.close();
});



addBook("1984", "George Orwell", 328, "in-progress");
addBook("Dune", "Frank Herbert", 412, "in-progress");

addToPage();


