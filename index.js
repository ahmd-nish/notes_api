require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connecction = require('./db');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notesRoutes');
const tempUserRouter = require('./routes/tempUserRoutes');


connecction();

app.use(cors());
app.use(express.json());



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);
app.use('/api/tempUser', tempUserRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));