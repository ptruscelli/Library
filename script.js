
const cardsContainer = document.querySelector("#cardsContainer");
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".openModal");
const formSubmit = document.querySelector(".formSubmit");

const bookForm = document.querySelector("#addBookForm");

// Array containing all books
let myLibrary = [];


// Object constructor for book instances
function Book(title, author, pageCount) {
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    // this.read = read;
    this.onPage = false;
    this.id = crypto.randomUUID();

};




// function that creates a book instance and adds it to myLibrary array
function addBook(title, author, pageCount, read) {
    const newBook = new Book(title, author, pageCount, read);
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

    const title = document.createElement("p");
    const author = document.createElement("p");
    const pageCount = document.createElement("p");
    const deleteBtn = document.createElement("button");


    title.textContent = book.title;
    author.textContent = book.author;
    pageCount.textContent = book.pageCount;
    deleteBtn.textContent = "Remove Book";

    deleteBtn.addEventListener("click", () => removeBook(bookCard, book.id));

    bookCard.append(title, author, pageCount, deleteBtn);

    return bookCard;
};



// function that loops through array and displays each book as a card on the page
function addToPage() {

    for(const book of myLibrary) {
        if (!book.onPage) { // only books that aren't already on the page get added

            const bookCard = createBookCard(book);

            cardsContainer.appendChild(bookCard);
            book.onPage = true; // track that the book is now on the page
        };
    };
};




addBook("1984", "George Orwell", 328);
addBook("Dune", "Frank Herbert", 412);

addToPage();



openModal.addEventListener('click', () => {
    modal.showModal();
});

formSubmit.addEventListener('click', () => {
    modal.close();
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
    const formData = Object.fromEntries(new FormData(bookForm).entries());

    addBook(
        formData.formTitle,
        formData.formAuthor,
        formData.formPageNumber
    );

    addToPage();
});

