const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({Bye: 'buddy'});
});

app.listen(5000);
