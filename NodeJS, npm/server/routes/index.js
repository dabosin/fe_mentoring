function auth(req, res, next) {
  if (req.body.name === 'user' && req.body.password === 'ahaha') {
    req.session.authorized = true;
    req.session.username = req.body.name;
    next();
  } else {
    res.render('login', {
      title: 'Login',
      heading: 'Login page',
      error: 'Better luck next time'
    });
  }
}

function loadSecret(req, res, next) {
  if (!req.session.username && !req.session.authorized) {
    req.session.redirectTo = req.path;
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = function(app) {

  app.get('/', require('./home').get);

  app.get('/login', require('./login').get);

  app.post('/login', auth, require('./login').post);

  app.get('/about', require('./about').get);

  app.get('/secret1', loadSecret, require('./secret1').get);

  app.get('/secret2', loadSecret, require('./secret2').get);

  app.get('/logout', loadSecret, require('./logout').get);

};