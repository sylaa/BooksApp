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

  render();
}
