exports.get = function(req, res) {
  res.render('home', {
    title: 'KGBarchives4you.info',
    heading: 'KGBarchives4you.info',
    username: req.session.username
  });
};