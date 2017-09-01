'use strict';
var app = app || {};

(function(module) {
  const adminView = {
    initAdminPage : () => {
      let template = Handlebars.compile($('#author-template').text());
        // COMMENT:(DONE) What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
        // This article appends a template of the total number of words in articles by a
        // specific author to the author-stats class in the admin.html file.
        // It is called in adminView.js
        // It calls Article.numWordsAll() which is in article.js
      app.Article.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
      $('#blog-stats .articles').text(app.Article.all.length);
      $('#blog-stats .words').text(app.Article.numWordsAll());
    }
  };

  app.Article.fetchAll(adminView.initAdminPage);
  module.adminView = adminView;
})(app);
