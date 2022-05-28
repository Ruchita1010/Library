
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

const displayLibrary = () => {
    const tableBody = document.querySelector("tbody");
    /* Clear all the old data so that the updated data won't stack up top of it 
    leading to duplicate data */
    tableBody.innerHTML = "";

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
                   <button type="button" class="btn del-btn">Delete</button>
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

const addBookForm = document.querySelector("#add-book-form");
addBookForm.addEventListener("submit", addBook);
