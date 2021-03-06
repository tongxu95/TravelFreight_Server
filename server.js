// mongodb
require('./config/db')

const app = require('express')();
const port = process.env.PORT || 3000;

const UserRouter = require('./api/User');
const PostRouter = require('./api/Post');

// parse JSON HTTP request bodies into JavaScript objects
const bodyParser = require('express').json;
app.use(bodyParser());
// app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/user', UserRouter)
app.use('/post', PostRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})