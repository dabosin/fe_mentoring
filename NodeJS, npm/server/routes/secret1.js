exports.get = function(req, res) {
  res.render('secret', {
    title: 'Secret #1',
    content: 'Brezhnev was a dog.',
    username: req.session.username
  })
};