const express = require('express')
var path = require('path');
var app = module.exports = express();
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
const port = process.env.PORT || 3000
//routes
app.use(require('./routes/index'));

if (!module.parent) {
  app.listen(port);
  console.log('Express started on port 3000');
}
