const bookContainer = document.querySelector('.book-container');
const addBookCard = document.querySelector('.add-book-card');
const addBookButton = document.querySelector('.add-book-button');
const addBookFormOverlay = document.querySelector('.add-book-form-overlay');
const addBookForm = document.querySelector('form.add-book-form');
const sumbitBookButton = document.querySelector('#submit-book-button');
const cancelAddBookButton = document.querySelector('#cancel-add-book-button');

let myLibrary = [];

class Book {
    constructor(title, author, numberOfPages, readYet) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.readYet = readYet;
        this.id = (this.title + '-' + this.author).replace(/\s/g, '');
    }

    info() {
        return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.readYet ? 'read' : 'not read yet'}`;    
    }

    toggleReadState() {
        this.readYet = !this.readYet;
    }
    
}

function addBookToLibrary(name, author, numberOfPages, readYet) {
    myLibrary.push(new Book(name, author, numberOfPages, readYet));
}

function getBookCard(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', book.id);

    
    let bookTitle = document.createElement('div');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = `"${book.title}"`;
    
    let bookAuthor = document.createElement('div');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = `${book.author}`;
    
    let bookPages = document.createElement('div');
    bookPages.classList.add('no-of-pages');
    bookPages.textContent = `${book.numberOfPages} Pages`;

    let bookReadState = document.createElement('div');
    bookReadState.classList.add('read-state');
    bookReadState.setAttribute('data-id', book.id);
    bookReadState.textContent = book.readYet ? 'Read' : 'Not Read Yet';

    let toggleReadStateButton = document.createElement('button');
    toggleReadStateButton.setAttribute('data-id', book.id);
    toggleReadStateButton.textContent = 'toggle read';
    toggleReadStateButton.addEventListener('click', toggleBookReadState);

    let removeBookButton = document.createElement('button');
    removeBookButton.setAttribute('data-id', book.id);
    removeBookButton.textContent = 'remove book';
    removeBookButton.addEventListener('click', removeBook);

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookReadState);
    bookCard.appendChild(toggleReadStateButton);
    bookCard.appendChild(removeBookButton);

    return bookCard;
}

function displayBooks() {
    myLibrary.forEach( (book) => bookContainer.insertBefore(getBookCard(book), addBookCard) );
}

function addBookToDisplay() {
    bookContainer.insertBefore(getBookCard(book), addBookCard);
}

function removeBook() {
    let id = this.getAttribute('data-id');
    let bookObj = myLibrary.find( book => book.id = id );
    let bookCard = document.querySelector(`div[data-id="${id}"]`);
    
    myLibrary.splice(myLibrary.indexOf(bookObj), 1);
    bookCard.remove();
}

function updateBookDisplay() {
    bookContainer.insertBefore(getBookCard(myLibrary[myLibrary.length-1]), addBookCard);
}

function displayBookForm() {
    addBookFormOverlay.style.display = 'flex';
}

function hideBookForm() {
    addBookFormOverlay.style.display = 'none';
}

function submitBook() {
    event.preventDefault();
    let form = this.form;
    let readStatus = (form.read.value == 'read');
    addBookToLibrary(form.title.value, form.author.value, Number(form.pages.value), readStatus);
    updateBookDisplay();
    hideBookForm();
}

function toggleBookReadState() {
    let id = this.getAttribute('data-id');
    let bookObject = myLibrary.find( book => book.id = id );
    let bookReadStateDisplay = document.querySelector(`div.read-state[data-id="${id}"]`);
    
    bookObject.toggleReadState();
    bookReadStateDisplay.textContent = bookObject.readYet ? 'Read' : 'Not Read Yet';
}

addBookButton.addEventListener('click', displayBookForm);
addBookForm.addEventListener('submit', submitBook);
sumbitBookButton.addEventListener('click', submitBook);
cancelAddBookButton.addEventListener('click', () => hideBookForm());

displayBooks();
