const fs = require('fs')
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const busboy = require('connect-busboy')

//openssl req -nodes -new -x509 -keyout server.key -out server.cert
const https = require('https')
const app = express()
const port = process.argv[2] ? process.argv[2] : 8080
const timeout = process.argv[3] ? process.argv[3] : 0

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(8080)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(busboy())
app.use(bodyParser.raw())
app.use(bodyParser.text())

function genericResponse(request, response) {
    console.log(`Date time: ${new Date().toString()}`)
    console.log(`Method: ${request.method}`)
    console.log(`URL: ${request.url}`)
    console.log('Headers:')
    Object.keys(request.headers).forEach((hName) => {
        console.log(` - ${hName}: ${request.headers[hName]}`)
    })

    let retorno = {
        "id": Math.floor(Math.random() * 1000000)
    }

    if (request.busboy) {
        request.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(`Receiving uploaded data from file ${filename}`)

            const saveTo = path.join('.', filename);
            file.pipe(fs.createWriteStream(saveTo));

            file.on('end', function() {
                console.log(`upload ${filename} finished`)
            })
        })
        request.busboy.on('finish', function() {
            console.log(`Send body back: ${JSON.stringify(retorno)}\n`)
            responseToClient(response, retorno, timeout);
        })
        request.pipe(request.busboy);
    }
    else {
        console.log(`Receive Body: ${JSON.stringify(request.body, null, 2)}`)
        console.log(`Send body: ${JSON.stringify(retorno)}\n`)
        responseToClient(response, retorno, timeout);
    }
}

function responseToClient(response, retorno, timeout) {
    if (timeout > 0) {
        console.log(`=> waiting ${timeout} before send message`)

    }

    setTimeout(() => {
        response.send(retorno)
        console.log('=> message sent')
        console.log('================================================================================')
    }, timeout)
}

app.get('/*', genericResponse);
app.put('/*', genericResponse);
app.post('/*', genericResponse);
app.delete('/*', genericResponse);


app.listen((err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(
    `server up
    - listening on ${port}
    - timeout ${timeout}\n`)
})
