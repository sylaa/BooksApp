// const { render } = require("sass");

('use strict');
{
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },

    booksImages: {
      images: '.books-list .book__image',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templateOf.bookTemplate).innerHTML
    ),
  };

  function render() {
    // const books = document.querySelector(dataSource.books);
    for (let book of dataSource.books) {
      /*generate HTML based on template */
      const generatedHTML = templates.bookTemplate(book);
      /*create element using utilis.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
      /*find bookList container*/
      const booksList = document.querySelector(select.containerOf.booksList);
      /*add element to menu */
      booksList.appendChild(element);
    }
  }

  function initActions() {
    const thisBook = this;
    thisBook.favouriteBooks = [];
    // const booksImg = document.querySelectorAll(select.booksImages.images);

    thisBook.bookWrapper = document.querySelector(select.containerOf.booksList);
    thisBook.bookWrapper.addEventListener('dblclick', function (event) {
      event.preventDefault();
      console.log(event.target.offsetParent);
      event.target.offsetParent.classList.toggle('favorite');

      const bookId = event.target.offsetParent.getAttribute('data-id');

      if (!thisBook.favouriteBooks.includes(bookId)) {
        thisBook.favouriteBooks.push(bookId);
      } else {
        const removedBook = thisBook.favouriteBooks.indexOf(bookId);
        thisBook.favouriteBooks.splice(removedBook, 1);

      }
      console.log(thisBook.favouriteBooks);
    });

    thisBook.filters = [];
    const form = document.querySelector(select.containerOf.filters);
    console.log(form);

    form.addEventListener('click', function (event) {
      const clickedElement = event.target;

      if(clickedElement.name === 'filter' && clickedElement.type === 'checkbox' && clickedElement.tagName === 'INPUT'){
        console.log(clickedElement.value);
        if(clickedElement.checked){
          thisBook.filters.push(clickedElement.value);
        } else {
          const unchecked = thisBook.filters.indexOf(clickedElement.value);
          thisBook.filters.splice(unchecked);
        }
      }
      console.log(thisBook.filters);
    });
   
  }
  render();
  initActions();
}
