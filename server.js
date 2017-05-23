var app = require('./claudiaExpress');

app.set('port', 2000)


var server = app.listen(app.get('port'), function(req, res) {
    //TODO Update log port
    console.log('server listensing on: 127.0.0.1:2000');
});