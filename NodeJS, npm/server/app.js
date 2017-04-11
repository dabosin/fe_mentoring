var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    path = require('path');

var routes = require('./routes/index');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({secret: 'secret'}));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'hbs');

//app.use('/', router);

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//router.get('/logout', function(req, res) {
//  req.session.destroy();
//  res.redirect('/');
//});

//router.get('/', function(req, res) {
//  res.render('index', {
//    title: 'KGBarchives4you.info',
//    heading: 'KGBarchives4you.info'
//  });
//});

//router.get('/login', function(req,res) {
//  res.render('login', {
//    title: 'Login',
//    username: req.session.username
//  });
//});
//
//router.get('/about', function(req, res) {
//  res.render('about', {
//    title: 'About',
//    content: 'KGBsecrets4you is the best source of secrets for you if you\'re a KGB agent or if you want to be tortured',
//    username: req.session.username
//  })
//});
//
//router.post('/login', auth, function(req, res) {
//  var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
//  delete req.session.redirectTo;
//  res.redirect(redirectTo);
//});

//router.get('/secret1', loadSecret, function(req, res) {
//  res.render('secret', {
//    title: 'Secret #1',
//    content: 'Brezhnev was a dog.',
//    username: req.session.username
//  })
//});
//
//router.get('/secret2', loadSecret, function(req, res) {
//  res.render('secret', {
//    title: 'Secret #2',
//    content: 'Earth is flat',
//    username: req.session.username
//  })
//});


// ============================================================ //


app.listen(3000, function() {
  console.log('the server is running on port 3000');
});