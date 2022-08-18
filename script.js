
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

// book class
class Book{
    constructor(name, author, status){
        this.name = name;
        this.author = author;
        this.status = status;
    }
}

const displayLibrary = () => {
    const tableBody = document.querySelector("tbody");
    /* Clear all the old data so that the updated data won't stack up top of it 
    leading to duplicate data */
    tableBody.innerHTML = "";

    // if localStorage has some books
    if (library.length === 0 & localStorage.length !== 0) {
        storedBooks = Object.keys(localStorage);
        storedBooks.forEach(storedBook => {
            // add all the stored books in library
            library.push(JSON.parse(localStorage.getItem(storedBook)));
        });
    };

    //  Loop through each book and append it to the table body
    library.forEach(book => {
        const tableRow = document.createElement("tr");
        tableRow.classList.add("book");
        tableRow.innerHTML = `
               <td>${book.name}</td>
               <td>${book.author}</td>
               <td>
                   <button type="button" class="btn status-btn">${book.status}</button>
               </td>
               <td>
                   <button type="button" class="btn remove-btn">Remove</button>
               </td>
           `;
        tableBody.appendChild(tableRow);
    });
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
    localStorage.setItem(`${book.name}`, JSON.stringify(book));

    displayLibrary();
}

const updateData = (e) => {
    // Get the book name
    const bookName = e.target.parentElement.parentElement.firstElementChild.innerText;

    if (e.target.innerText === "Remove") {

        // Remove book from the library array
        library = library.filter(book => book.name !== bookName);

        // Remove book from the localStorage
        localStorage.removeItem(bookName);

        displayLibrary();
    }
    else if (e.target.classList.contains("status-btn")) {
        // Retrieve the book object from localStorage
        const bookObj = JSON.parse(localStorage.getItem(bookName));

        // Change the book status
        if (e.target.innerText === "Not Read") {
            e.target.innerText = "Read";
            bookObj.status = "Read";
        }
        else {
            console.log("dhk")
            e.target.innerText = "Not Read";
            bookObj.status = "Not Read";
        }

        // Store the updated book object to localStorage
        localStorage.setItem(bookName, JSON.stringify(bookObj));
    }
}

const addBookForm = document.querySelector("#add-book-form");
addBookForm.addEventListener("submit", addBook);

const tableBody = document.querySelector("tbody");
tableBody.addEventListener("click", updateData);

displayLibrary();