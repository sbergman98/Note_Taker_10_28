const express = require('express');
const app = express();

const htmlRouter = require('./routes/htmlRouter');
const apiRouter = require('./routes/apiRouter');

app.use(express.json());
app.use(express.urlencoded({extended: false }));
// alows html files to see assets folder
app.use(express.static('public'))

app.use('/', htmlRouter);
app.use('/api/notes', apiRouter);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Noter app listening on port ${PORT}!`));