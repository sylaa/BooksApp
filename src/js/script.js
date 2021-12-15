// const { render } = require("sass");

('use strict');
{
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },

    constainerOf: {
      booksList: '.books-list',
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
      const booksList = document.querySelector(select.constainerOf.booksList);
      /*add element to menu */
      booksList.appendChild(element);
    }
  }

  function initActions() {
    const thisBook = this;
    thisBook.favouriteBooks = [];
    const booksImg = document.querySelectorAll(select.booksImages.images);

    for (let image of booksImg) {
      image.addEventListener('dblclick', function (event) {
        if (event.target.offestParent.classList.contains('.book__image')) {
          event.preventDefault();
          image.classList.toggle('favorite');
          const bookId = event.target.getAttribute('data-id');

          if (!thisBook.favouriteBooks.includes(bookId)) {
            thisBook.favouriteBooks.push(bookId);
          } else {
            const removedBook = thisBook.favouriteBooks.indexOf(bookId);
            thisBook.favouriteBooks.splice(removedBook, 1);
          }
          console.log(thisBook.favouriteBooks);
          console.log(event.target);
        }
      });
    }
  }
  render();
  initActions();
}
