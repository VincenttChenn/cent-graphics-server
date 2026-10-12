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

app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'Cent Graphics API' });
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;

// Cache the connection so serverless invocations (Vercel) reuse it
let connectionPromise = null;
const connectDB = () => {
    if (mongoose.connection.readyState === 1) return Promise.resolve();
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(MONGO_URI).catch((error) => {
            connectionPromise = null;
            throw error;
        });
    }
    return connectionPromise;
};

// Ensure DB is connected before handling any /api request
app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/palettes', paletteRoutes);

// Only start a listener when running locally (Vercel handles this itself)
if (!process.env.VERCEL) {
    connectDB()
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch((error) => console.error('Error connecting to MongoDB:', error));
}

export default app;