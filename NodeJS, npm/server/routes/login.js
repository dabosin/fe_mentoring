exports.get = function(req,res) {
  res.render('login', {
    title: 'Login',
    username: req.session.username
  });
};

exports.post = function(req, res) {
  var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
  delete req.session.redirectTo;
  res.redirect(redirectTo);
};