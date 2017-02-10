# GOV.UK Frontend Alpha - Node Starter Kit

This starter kit is being used in user research for [GOV.UK Frontend](https://github.com/alphagov/govuk_frontend_alpha).

It's a Node & ExpressJS app, with Nunjucks for templating.

## Running the application

1. First, clone a copy of this repo locally

2. Next, install the dependencies:

  ```sh
  $ npm install
  ```

3. To run the web server:

  ```sh
  $ npm start
  ```

You'll be able to see the app running here: [localhost:3005](http://localhost:3005/)


## Application setup

Take a look in `server.js` to see how this app works.

Static content is served from the public directory:

```javascript
app.use('/public', express.static(path.join(__dirname, '/public')))
```

## Using GOV.UK frontend

### Default

The compiled 'default stylesheet' expects images to be in the `images/toolkit` and `images/template` directories.

For the default compiled stylesheet only - this application has been set to serve the govuk_frontend_alpha toolkit and template assets from the node_modules directory:

In `server.js`:

```javascript
app.use('/images/toolkit', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/images/toolkit/')))
app.use('/images/template', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/images/template/')))
```

### Custom - replacing the default stylesheet

If the application compiles the govuk_frontend_alpha scss files and overrides the `stylesheet` block, the above config can be removed.

To serve the govuk_frontend_alpha assets from the node_modules directory, in `server.js` use:

```javascript
app.use('/public', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/')))
```

To ensure the path to the image assets is correct, `$path` must be defined at the top of `application.scss`, find this in `assets/scss/application.scss`.
