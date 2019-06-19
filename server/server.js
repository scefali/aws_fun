const env = require('node-env-file')
env('.env')


const app = require('./claudiaExpress')



const port = process.env.PORT || 2000

app.set('port', port)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')
app.listen(port, function (req, res) {
    console.log(`server listening on: localhost:${port}`)
})