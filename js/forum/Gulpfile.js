var flarum = require('flarum-gulp');

flarum({
  modules: {
    'Davis/Varnish': [
      'src/**/*.js'
    ]
  }
});