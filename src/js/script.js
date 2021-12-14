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
    const favouriteBooks = [];
    const booksImg = document.querySelectorAll(select.booksImages.images);

    for (let image of booksImg) {
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        image.classList.toggle('favorite');
        const bookId = image.getAttribute('data-id');

        if (!favouriteBooks.includes(bookId)) {
          favouriteBooks.push(bookId);
          
        } else {
          const removedBook = favouriteBooks.indexOf(bookId);
          favouriteBooks.splice(removedBook, 1);

        }
        console.log(favouriteBooks);
      });
    }
  }
  render();
  initActions();
}
