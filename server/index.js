import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import logRoutes from './routes/searchLog.js';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api', apiRoutes);

app.use('/log', logRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the cat-wiki server!");
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err.message));

