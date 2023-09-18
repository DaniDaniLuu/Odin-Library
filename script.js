class Book{
  constructor(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}

function displayBooks(){
  const bookNum = library.books.length;
  const outerGridContainer = document.querySelector('.cardBox')
  outerGridContainer.innerHTML = ""
  // Creates the correct amount of cards depending on the books and adds the divs and buttons to each card
  for(const element in library.books){
      const gridDiv = document.createElement('div')
      gridDiv.classList.add('gridItem')
      gridDiv.setAttribute("book",element)
      outerGridContainer.appendChild(gridDiv)
      for(let i=0; i < 3; i++){
        const textDiv = document.createElement('div')
        gridDiv.appendChild(textDiv)
      }
      for(let j=0; j< 2; j++){
        const gridButtons = document.createElement('button')
        if(j==0){
          gridButtons.classList.add('gridRead')
        }
        else {
          gridButtons.classList.add('gridRemove')
        }
        gridDiv.appendChild(gridButtons)
      }
  }
  // Sets the number of rows necessary
  let rowNum = Math.ceil(bookNum/4)
  outerGridContainer.style.cssText = `grid-template-columns: repeat(4, 300px); grid-template-rows: repeat(${rowNum}, 250px);`
  gridPopulate(bookNum)
}

function hasRead(gridButtons){
  gridButtons[0].toggleAttribute("has-read",true);
  gridButtons[0].toggleAttribute("has-not-read",false);
  gridButtons[0].textContent = "Read"
}

function hasNotRead(gridButtons){
  gridButtons[0].toggleAttribute("has-read",false);
  gridButtons[0].toggleAttribute("has-not-read",true);
  gridButtons[0].textContent = "Not Read"
}

// Populates all the divs and buttons with the correct info
function gridPopulate(bookNum){
  const gridArray = document.querySelectorAll('[book]')
  let bookIndex = 0;
  gridArray.forEach((grid) => {
    const divElements = grid.getElementsByTagName('div')
    const gridButtons = grid.getElementsByTagName('button')
    divElements[0].textContent = `"${library.books[bookIndex].title}"`
    divElements[1].textContent = `${library.books[bookIndex].author}`  
    divElements[2].textContent = `${library.books[bookIndex].pages}`
    if (library.books[bookIndex].read){
      hasRead(gridButtons)
    }
    else {
      hasNotRead(gridButtons)
    }
    gridButtons[0].addEventListener(('click'), () => {
      if(gridButtons[0].hasAttribute("has-read")){
        hasNotRead(gridButtons)
      }
      else {
        hasRead(gridButtons)
      }
    })
    gridButtons[1].textContent = "Delete"
    gridButtons[1].addEventListener(('click'), (e) => {
      e.target.parentElement.remove()
      library.books.splice(e.target.parentElement.getAttribute("book"),1)
    })
    bookIndex++
  })
}

function resetModal(){
    titleInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""
    readInput.checked = false;
}

// Modal selectors
const openButton = document.querySelector('[modal-open]')
const submitButton = document.querySelector('[modal-close]')
const modal = document.querySelector('.modal')
// Input selectors
const titleInput = document.querySelector('#titleInput')
const authorInput = document.querySelector('#authorInput')
const pagesInput = document.querySelector('#pagesInput')
const readInput = document.querySelector('#readCheckBox')
// Form
const formSelect = document.querySelector('#formFlex')

const library = {
  books: [],
  addBookToLibrary: function (book) {
    this.books.push(book)
  }
}

openButton.addEventListener('click', () => {
    modal.showModal()
})

formSelect.addEventListener('submit', (e) => {
  e.preventDefault()
  const tempBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked)
  library.addBookToLibrary(tempBook)
  displayBooks()
  modal.close()
  resetModal()
})