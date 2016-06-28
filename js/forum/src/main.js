import app from 'flarum/app';
import { extend } from 'flarum/extend';
import App from 'flarum/App';

app.initializers.add('davis-varnish-forum', function() {
    extend(App.prototype, 'request', function(options) {
        var groupid = '';
        if(typeof app.session.user == undefined) {
            groupid = '0';
        } else {
            if (typeof app.session.user.data.relationships.groups.data[0] == undefined) {
                groupid = 's0';
            } else {
                app.session.user.data.relationships.groups.data.forEach(function(item, index){
                    groupid += 's' + (app.session.user.data.relationships.groups.data[index].id).toString();
                });
            }
        }
        extend(options, 'config', (result, xhr) => xhr.setRequestHeader('FlarumUsersGroup', groupid));
    });
});