const routes = require('express').Router();
routes.get('/', (req, res) => {
    res.render('index');
  });
  
routes.get('/ui*', (req, res) => {
    res.render('index');
  });

  
module.exports = routes;