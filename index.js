const express = require('express');
const cors = require('cors');
const Route = require('./routes/route');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', Route);


app.get('/', (req, res) => {
    res.send('INT. Text Classification API is running.');
});


app.listen(PORT);