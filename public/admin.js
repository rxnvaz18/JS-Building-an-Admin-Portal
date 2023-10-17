async function main() {

    let response = await fetch('http://localhost:3001/listBooks')

    let books = await response.json()

    books.forEach(renderBookInventory)
}

function renderBookInventory(book) {
    let root = document.querySelector('#root')

    let booklis = document.createElement('booklis')
    booklis.textContent = book.title

    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity
    // booklis.append(book.quantity)


    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

    saveButton.addEventListener('click', () => {
       fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
        console.log(response)
    })

    booklis.append(quantityInput, saveButton)
    root.append(booklis)
}

main()
