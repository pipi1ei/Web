const express = require('express')

let app = express()

app.get('/api/user', (req, res) => {
  res.json({name: 'pipilei'})
})

app.listen(3000)