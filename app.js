const express = require('express');
const crypto = require('crypto-js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const DATABASE_URL =
  'mongodb+srv://kdhaka94:YxALSt9MRDwXiAVH@cluster0.gnzhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(DATABASE_URL);

const Message = mongoose.model('Message', { message: String });

const app = express();
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send', (req, res) => {
  const kitty = new Message({ message: req.body.message });
  kitty.save().then(() => console.log('meow'));
  res.send('Done');
});

app.get('/code', async (req, res) => {
  try {
    const allMessages = await Message.find();
    return res.json(allMessages);
  } catch (err) {
    res.json({ message: err });
  }
});
// It works XD

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
