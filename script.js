
// get the input elements which are children of a div inside the form
const transformFormInput = (formDiv) => {
    return formDiv.map((formChildDiv) => formChildDiv.children[1].value);
}

const clearFormInput = (formDiv) => {
    formDiv.forEach(formChildDiv => {
        // get the input elements
        const formInput = formChildDiv.children[1];
        switch (formInput.type) {
            case "text":
                formInput.value = "";
                break;
            case "select-one":
                formInput.value = "Not Read";
        }
    });
}

let library = [];

// book constructor
function Book(name, author, status) {   
    this.name = name;
    this.author = author;
    this.status = status;
}

const addBook = (e) => {
    e.preventDefault();
    // remove the last child div bcoz it's a button
    const formDiv = [...e.target.children].slice(0, -1);
    const formDivInput = transformFormInput(formDiv);
    clearFormInput(formDiv);

    // Create book instance/object
    const book = new Book(formDivInput[0], formDivInput[1], formDivInput[2]);

    // Add the book to the library array
    library.push(book);

    // Add book to localStorage
    localStorage.setItem(`${book.name}`,JSON.stringify(book));
}

const addBookForm = document.querySelector("#add-book-form");
addBookForm.addEventListener("submit", addBook);
