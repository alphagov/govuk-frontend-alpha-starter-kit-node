# GOV.UK Frontend Alpha Starter Kit - Node

This readme lists the steps to create this Node.js app, ready to consume the GOV.UK Frontend Alpha package.
This starter kit is to be used for research and is not for production use.

#### Create a new Node project

`$ npm init` - add a package.json file to the repo

#### Add a .gitignore file to ignore node_modules

You do not need to commit the project's dependencies to the repository.

#### Create a gitignore file:

`touch .gitignore`

Add to the .gitignore file

`node_modules/*`

#### Install [Express JS](http://expressjs.com/en/starter/installing.html)

Install Express and save it in the dependencies list in `package.json`:

`$ npm install express --save`

#### Start the app and create a server

Create a file called app.js in your project directory:

`$ touch app.js`

Add the following code:

```
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

Run the app with the following command:

`$ node app.js`

Then, load http://localhost:3000/ in a browser.

In the console, you will see `Example app listening on port 3000!`.

In the browser, you will see 'Hello world'.

Use control and c to stop the server.

#### Set up middleware for static assets

To serve static files such as images, CSS files, and JavaScript
files, we use the express.static built-in middleware function in Express.

In app.js add:

```
app.use('/public', express.static('/public/'))
```

#### Send assetPath to all views

In app.js add:

```
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})
```

#### Add [Nunjucks](https://www.npmjs.com/package/nunjucks)

GOV.UK Frontend Alpha uses Nunjucks as its templating language.

Install Nunjucks and save it to the dependencies list in `package.json`:

`$ npm install nunjucks --save`

At the top of app js:

`var nunjucks = require('nunjucks')`

Set the template engine to use nunjucks:

```
// Set the template engine to use nunjucks
app.set('view engine', 'nunjucks')
```

### Create a layout template and an index page

Create a file called layout.njk in your project's `/views/` directory.

`touch layout.njk` in `/views/`

Add the following code:

```
Layout template

{% block content %}
{% endblock %}
```

Create a file called index.njk in your project's `/views/` directory.

`touch index.njk` in `/views/`

Add the following code:

```
{% extends 'layout.njk' %}

{% block content %}
  Hello world
{% endblock %}
```

Restart your app.

Start your app using `node app.js`

Then, load http://localhost:3000/ in a browser.

In the browser, you will see 'Layout template Hello world'.

#### Install [Gulp.js](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

Install the `gulp` command

`$ npm install --global gulp-cli`

Install `gulp` in your devDependencies

Run this command in your project directory:

`$ npm install --save-dev gulp`

##### Create a gulpfile

Create a file called gulpfile.js in your project root

`$touch gulpfile.js`

Add a default task to the file, by inserting the content below:

```
var gulp = require('gulp')

gulp.task('default', function () {
  console.log('Default task')
})
```

Run the gulp command in your project directory:

`gulp`

You should see:

```
Using gulpfile ~/govuk-frontend-alpha-starter-kit-node/gulpfile.js
Starting 'default'...
Default task
Finished 'default'
```

#### Install gulp-sass

* `npm install gulp-sass --save-dev`

#### Add scss compilation to the project

* Add an `application.scss` file to `assets/scss`

#### Add a Gulp `styles` task to compile scss to css

In Gulpfile.js

```
// Compile Sass to CSS
gulp.task('styles', function () {
  gulp.src(paths.assetsScss + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.publicCss))
})
```

#### Add a config file for paths

Add a config file in /config/paths.json and add paths for assetsScss and publicCss.

### Add the /public folder to .gitgnore

The app compiles assets to /public, these don't need to be in version control.




