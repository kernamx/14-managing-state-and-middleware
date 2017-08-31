'use strict';
var app = app || {};

(function(module) {
  const articleController = {};

  // COMMENT(DONE): What is this function doing? Where is it called?
  // Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // app.articleView.index(ctx.articles) is tell articleController.index when web is at home page  It is called routes.js. It calls app.articleView.index which lives in articleView.js.)
  articleController.index = (ctx) => app.articleView.index(ctx.articles);

  // REVIEW: Middleware for grabbing one article by ID:
  articleController.loadById = (ctx, next) => {
    let articleData = article => {
      ctx.articles = article;
      next();
    };

    // COMMENT(DONE): What is this function doing? Where is it called?
    // Does it call any other functions, and if so, in what file(s) do those function(s) live?
    // (It retrieves articles with the field article_id and value of ctx.params.article_id and callback function articleData.  It is being called from article.js file.  It uses callback function articleData which lives in articleController.js.)
    app.Article.findWhere('article_id', ctx.params.article_id, articleData);
  };

  // REVIEW: Middleware for loading up articles by a certain author:
  articleController.loadByAuthor = (ctx, next) => {
    let authorData = articlesByAuthor => {
      ctx.articles = articlesByAuthor;
      next();
    };

    app.Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // REVIEW: Middleware for grabbing all articles with a certain category:
  articleController.loadByCategory = (ctx, next) => {
    let categoryData = articlesInCategory => {
      ctx.articles = articlesInCategory;
      next();
    };

    app.Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // REVIEW: Middleware for grabbing ALL articles:
  articleController.loadAll = (ctx, next) => {
    let articleData =  () => {
      ctx.articles = app.Article.all;
      next();
    };

    if (app.Article.all.length) {
      ctx.articles = app.Article.all;
      next();
    } else {
      app.Article.fetchAll(articleData);
    }
  };

  module.articleController = articleController;
})(app);
