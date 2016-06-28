'use strict';

System.register('Davis/Varnish/main', ['flarum/app', 'flarum/extend', 'flarum/App'], function (_export, _context) {
    "use strict";

    var app, extend, App;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp2) {
            App = _flarumApp2.default;
        }],
        execute: function () {

            app.initializers.add('davis-varnish-forum', function () {
                extend(App.prototype, 'request', function (options) {
                    var groupid = '';
                    if (babelHelpers.typeof(app.session.user) == undefined) {
                        groupid = '0';
                    } else {
                        if (babelHelpers.typeof(app.session.user.data.relationships.groups.data[0]) == undefined) {
                            groupid = 's0';
                        } else {
                            app.session.user.data.relationships.groups.data.forEach(function (item, index) {
                                groupid += 's' + app.session.user.data.relationships.groups.data[index].id.toString();
                            });
                        }
                    }
                    extend(options, 'config', function (result, xhr) {
                        return xhr.setRequestHeader('FlarumUsersGroup', groupid);
                    });
                });
            });
        }
    };
});