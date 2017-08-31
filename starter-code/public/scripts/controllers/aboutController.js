'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // COMMEN(DONE): What is this function doing? Where is it called?
  // Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (It shows the section with id=about and hides the siblings.
  //Then, it calls app.repos.requestRepos from repos.js and passes the app.repoView.index from repoView.js.)

  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
