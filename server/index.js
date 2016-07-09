var patientData = require('./mock/patient');

/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');


const app = express();
const port = process.env.PORT || 3000;

var config = process.env.NODE_ENV === 'production'
  ? config = require('../webpack.config.production')
  : require('../webpack.config');

const compiler = webpack(config);


var bundler = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  proxy: {
    '*/api/*': {
      target: 'https://localhost:8080',
      secure: true
    }
  },
  historyApiFallback: true
});

app.use(require('webpack-hot-middleware')(compiler));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  setTimeout(function () {next();},1000);
});

app.get('/api/test', (req, res) => {
  res.send({ test: 'test' });
});

app.get('/api/patient', (req, res)=> {
  res.send(patientData.patientDoctors);
  console.log(patientData.patientDoctors);
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../dist' });
});

app.listen(8080);
bundler.listen(port);

