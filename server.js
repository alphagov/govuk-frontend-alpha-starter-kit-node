var express = require('express')
var nunjucks = require('nunjucks')
var app = express()
var path = require('path')

module.exports = app

// Set the template engine to use nunjucks
app.set('view engine', 'nunjucks')

// Set the location of the component and template files
var appViews = [
  path.join(__dirname, 'views'),
  path.join(__dirname, '/node_modules/govuk_frontend_alpha/components/'),
  path.join(__dirname, '/node_modules/govuk_frontend_alpha/templates/')
]

// Tell nunjucks we are using express to serve the templates within
// the views defined in appViews
nunjucks.configure(appViews, {
  express: app
})

// Serve static content for the app from the "public" directory
app.use('/public', express.static(path.join(__dirname, '/public')))
// Serve the govuk_frontend_alpha assets from the node_modules directory
app.use('/public', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/')))
// For the default compiled stylesheet only - serve the govuk_frontend_alpha toolkit and template assets from the node_modules directory
app.use('/images/toolkit', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/images/toolkit/')))
app.use('/images/template', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/images/template/')))

// Send assetPath to all views
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

// Render views/index
app.get('/', function (req, res) {
  res.render('index.njk')
})

// Log when app is running
app.listen(3005, function () {
  console.log('Example app listening on port 3005!')
})
