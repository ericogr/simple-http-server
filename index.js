const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.argv[2] ? process.argv[2] : 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function genericResponse(request, response) {
  console.log(`Date time: ${new Date().toString()}`)
  console.log(`Method: ${request.method}`)
  console.log(`URL: ${request.url}`)
  console.log('Headers:')
  Object.keys(request.headers).forEach((hName) => {
    console.log(` - ${hName}: ${request.headers[hName]}`)
  })
  console.log(`Receive Body: ${JSON.stringify(request.body, null, 2)}`)

  let retorno = {
        "id": Math.floor(Math.random() * 1000000)
  }

  console.log(`Send body: ${JSON.stringify(retorno)}\n`)

  response.send(retorno)
}

app.get('/*', genericResponse);
app.put('/*', genericResponse);
app.post('/*', genericResponse);
app.delete('/*', genericResponse);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}\n`)
})
