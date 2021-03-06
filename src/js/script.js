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

  class BooksList {
    constructor() {
      const thisBook = this;
      thisBook.getElements();
      thisBook.initActions();
      thisBook.render();
      thisBook.filters = [];
      thisBook.favouriteBooks = [];
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBook = this;
      thisBook.dom = {};

      // thisBook.dom.booksList = document.querySelector(select.containerOf.booksList);
      thisBook.dom.bookWrapper = document.querySelector(select.containerOf.booksList);
      thisBook.dom.form = document.querySelector(select.containerOf.filters);
    }

    render() {
      const thisBook = this;
      // const books = document.querySelector(dataSource.books);
      for (let book of dataSource.books) {
        thisBook.ratingBgc = thisBook.determineRatingBgc(book.rating);
        book.ratingBgc = thisBook.ratingBgc;
        console.log(thisBook.ratingBgc);
        thisBook.ratingWidth = book.rating * 10;
        book.ratingWidth = thisBook.ratingWidth;

        /*generate HTML based on template */
        thisBook.generatedHTML = templates.bookTemplate(book);
        /*create element using utilis.createElementFromHTML */
        thisBook.element = utils.createDOMFromHTML(thisBook.generatedHTML);
        /*find bookList container*/
        // thisBook.booksList = document.querySelector(
        //   select.containerOf.booksList
        // );
        /*add element to menu */
        thisBook.dom.bookWrapper.appendChild(thisBook.element);
      }
    }


    initActions() {
      const thisBook = this;
      // thisBook.favouriteBooks = [];
      // const booksImg = document.querySelectorAll(select.booksImages.images);

      thisBook.dom.bookWrapper.addEventListener('dblclick', function (event) {
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

      // thisBook.filters = [];
      // thisBook.form = document.querySelector(select.containerOf.filters);
      // console.log(form);

      thisBook.dom.form.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (
          clickedElement.name === 'filter' &&
          clickedElement.type === 'checkbox' &&
          clickedElement.tagName === 'INPUT'
        ) {
          console.log(clickedElement.value);
          if (clickedElement.checked) {
            thisBook.filters.push(clickedElement.value);
          } else {
            const unchecked = thisBook.filters.indexOf(clickedElement.value);
            thisBook.filters.splice(unchecked, 1);
          }
        }
        console.log(thisBook.filters);
        thisBook.filterBooks();
      });
    }

    filterBooks() {
      const thisBook = this;

      for (let book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of thisBook.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          document
            .querySelector(`.book__image[data-id="${book.id}"]`)
            .classList.add('hidden');
        } else {
          document
            .querySelector(`.book__image[data-id="${book.id}"]`)
            .classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

      return background;
    }
  }
  const app = new BooksList();
  app;
}
