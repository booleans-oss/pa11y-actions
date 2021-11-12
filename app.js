const express = require('express')
const path = require('path');

const app = express()

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(3000, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:3000/')
})
