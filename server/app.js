require('ignore-styles');
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const proxy = require('http-proxy-middleware');
const app = express();


let apiURI  = process.env.DEV_API_URI;
if (process.env.NODE_ENV === 'production') {
  apiURI = process.env.API_URI;
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else
      next()
  })
}
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
});

if (process.env.ENV === 'stage') {
  const auth = require("http-auth");
  const basic = auth.basic({
      realm: "Restricted Access! Please login to proceed"
    }, function (username, password, callback) {
      callback( (username === "awesomeTeam" && password === "festtech"));
    }
  );
  app.use(auth.connect(basic));
}
// routes
const index = require('./routes/index');
const api = require('./routes/api');
const universalLoader = require('./universal');




// Support Gzip
app.use(compression());

// Support post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Setup logger
app.use(morgan('combined'));

app.use('/', index);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/api', proxy('/api',{
  target: apiURI,
  pathRewrite: {
    '^/api' : ''
  },
  changeOrigin: true,
  headers: {
    'x-access-apikey': process.env.TECHFEST_API_KEY
  }
}));

// Always return the main index.html, so react-router render the route in the client
app.use('/', universalLoader);

module.exports = app;
