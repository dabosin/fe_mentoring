exports.get = function(req, res) {
  res.render('about', {
    title: 'About',
    content: 'KGBsecrets4you is the best source of secrets for you if you\'re a KGB agent or if you want to be tortured',
    username: req.session.username
  })
};