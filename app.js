var express = require('express')
var nunjucks = require('nunjucks')
var app = express()
var path = require('path')

// Set the template engine to use nunjucks
app.set('view engine', 'nunjucks')

// Set the location of the template files
var appViews = [
  path.join(__dirname, 'views'),
  path.join(__dirname, '/node_modules/govuk_frontend_alpha/templates/')
]

// Tell nunjucks we are using express to serve the templates within
// the views defined in appViews
nunjucks.configure(appViews, {
  express: app
})

// To serve static files such as images, CSS files, and JavaScript
// files, we use the express.static built-in middleware function
// in Express.
app.use('/public', express.static(path.join(__dirname, '/public')))
// To use multiple static assets directories, call the express.static middleware function multiple times,
// here we are serving the govuk_frontend_alpha assets from the node_modules directory.
app.use('/public', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/')))
app.use('/images/template', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/images/template/')))

// Send assetPath to all views
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

app.get('/', function (req, res) {
  res.render('index.njk')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
