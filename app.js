
/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    conf = require('./conf.js'),
    _ = require('underscore');

// Configuration
app.configure(function() {
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));
  app.register('._', {
    compile: function(str, options) {
      var compiled = _.template(str);
      return function (locals) {
        return compiled(locals);
      };
    }
  });
  // Static HTML render.
  app.register('.html', {
    compile: function(str, options) {
      return function (locals) {
        return str;
      };
    }
  });

  app.set('view engine', '_');
  app.set('view options', {
    layout: false
  });
});
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
app.configure('production', function() {
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res) {
  res.render('index.html');
});

//Only listen on $ node app.js
if (!module.parent) {
  app.listen(conf.port);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
