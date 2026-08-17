import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import paletteRoutes from './routes/paletteRoutes.js';

dotenv.config();

const app = express();
// 
app.use(cors());
app.use(express.json());

// app.get('/api', (req, res) => {
//     res.send('Hello World!');
// });

app.use('/api/auth', authRoutes);
app.use('/api/palettes', paletteRoutes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectDB();

export default app;