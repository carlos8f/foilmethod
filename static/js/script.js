(function() {

  var routes = {
    '/': 'home',
    '/bio': 'bio',
    '/media': 'media',
    '/calendar': 'calendar',
    '/contact': 'contact',
    '/blog': 'blog'
  };

  var app = {};

  var lastURI;

  var initialize = app.initialize = function() {
    // Render persistent elements.
    $('#topbar').html(render('topbar'));

    $('#player').html(render('player'));

    // Navigate according to the current hash.
    navigate();

    // Listen for hash changes.
    window.addEventListener('hashchange', function() {
      app.navigate();
    }, false);
  };

  var getURI = app.getURI = function() {
    var uri = window.location.hash;
    if (uri[0] === '#') uri = uri.substr(1);
    if (uri[0] != '/') uri = '/' + uri;
    return uri;
  };

  var navigate = app.navigate = function(uri) {
    var m, regex;
    uri = uri || getURI();
    if (uri === lastURI) {
      return;
    }
    for (var path in routes) {
      regex = new RegExp('^'+path.replace(':id', '([^/]+)').replace(/\//g, '\\/') + "$", 'gi');
      m = regex.exec(uri);
      if (m) {
        var id = m[1] || null;
        lastURI = uri;
        $('#page').empty();
        controller[routes[path]].apply(app, [id]);
        break;
      }
    }
  };

  var render = app.render = function(name, context) {
    return _.template($('#template-' + name).text(), context || app);
  };

  var controller = app.controller = {
    home: function() {
      $('#page').append(render('anon-home'));
    },
    bio: function() {

    },
    media: function() {

    },
    calendar: function() {

    },
    contact: function() {

    },
    blog: function() {

    }
  };

  $(function() {
    initialize();
  });

  window.app = app;

})();
