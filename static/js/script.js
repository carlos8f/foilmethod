(function() {

  var routes = {
    '/': 'home',
    '/bio': 'bio',
    '/calendar': 'calendar'
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
      if ($('.page').length) {
        $('.page').fadeOut(500, function() {
          app.navigate();
        });
      }
      else {
        app.navigate();
      }
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
        $('.page').hide().fadeIn();
        break;
      }
    }
  };

  var render = app.render = function(name, context) {
    return _.template($('#template-' + name).text(), context || app);
  };

  var controller = app.controller = {
    home: function() {
      $('#page').append(render('home'));
      $('.arrow').hide();
      $('.next-show').hide();
      $('.quote').hide().delay(1000).show('slide', {direction: 'right'}, 500, function() {
        $('.next-show').delay(200).show('pulsate', function() {
          $('.arrow').fadeIn(100).fadeOut(100).fadeIn(1000).delay(5000).fadeOut(500);
        })
      });
    },
    bio: function() {
      $('#page').append(render('bio'));
    },
    calendar: function() {
      $('#page').append(render('calendar'));
    }
  };

  $(function() {
    initialize();
  });

  window.app = app;

})();
