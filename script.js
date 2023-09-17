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
  for(const element in library.books){
      const gridDiv = document.createElement('div')
      gridDiv.classList.add('gridItem')
      gridDiv.setAttribute("book",element)
      outerGridContainer.appendChild(gridDiv)
      for(let i=0; i < 3; i++){
        const textDiv = document.createElement('div')
        textDiv.setAttribute("divElement",i)
        gridDiv.appendChild(textDiv)
      }
      for(let j=0; j< 2; j++){
        console.log(j)
        const gridButtons = document.createElement('button')
        gridButtons.setAttribute("gButton",j)
        if(j==0){
          gridButtons.classList.add('gridRead')
        }
        else {
          gridButtons.classList.add('gridRemove')
        }
        gridDiv.appendChild(gridButtons)
      }
  }
  let rowNum = Math.ceil(bookNum/4)
  outerGridContainer.style.cssText = `grid-template-columns: repeat(4, 300px); grid-template-rows: repeat(${rowNum}, 250px);`
  gridPopulate(bookNum)
}

function gridPopulate(bookNum){
  const gridArray = document.querySelectorAll('[book]')
  gridArray.forEach((grid) => {

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
  displayBooks();
  modal.close()
  resetModal()
})


