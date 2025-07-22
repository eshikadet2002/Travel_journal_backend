const mongoDB = require('./database/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const cors = require('cors');

express= require('express');
const app= express();
mongoDB();
app.use(express.json());


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/journals', journalRoutes);


app.listen(5000)