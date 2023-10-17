async function main() {// asynchronous function to pass after rendering the book inventory
// resolves in to a promise object after getting information from /updateBook with updated book quantities
    let response = await fetch('http://localhost:3001/listBooks')

    let books = await response.json()

    books.forEach(renderBookInventory)//we run a function we named Book Inventory for each book listed in the array of books
}

function renderBookInventory(books) {
    let root = document.querySelector('#root') // selecting the correct element using the right id from the body in the html to add the book list/inventory

    let booklis = document.createElement('booklis') // creating and declaring text content as the book title
    booklis.textContent = books.title

    let quantityInput = document.createElement('input') // creating and declaring text content as the number of books available
    quantityInput.value = books.quantity

    let saveButton = document.createElement('button') // creating and declaring a save button to update number of books on main page
    saveButton.textContent = 'Save' // text on the button

    saveButton.addEventListener('click', () => {
       fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',// method is patch because it is replacing a previous value with a new updated one as the admin inputs
            headers: {
                    'Content-Type': 'application/json'//  explains content type, it is required to list headers and body for PATCH method type for fetch function
            },
            body: JSON.stringify({// converts javascript strings into JSON application strings
                id: books.id,
                quantity: quantityInput.value
            })
        })
    })

    booklis.append(quantityInput, saveButton) // functions append book list with books and book titles along with quantity and save button onto the admin page
    root.append(booklis)
}

main()
