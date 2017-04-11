exports.get = function(req, res) {
  res.render('secret', {
    title: 'Secret #2',
    content: 'Earth is flat',
    username: req.session.username
  })
};