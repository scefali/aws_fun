const env = require('node-env-file')
env(__dirname + '/.env')


const app = require('./claudiaExpress')



const port = 2000

app.set('port', port)



const server = app.listen(port, function(req, res) {
    //TODO Update log port
    console.log(`server listensing on: localhost:${port}`)
})