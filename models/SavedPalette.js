import mongoose from 'mongoose';

const paletteSchema = new mongoose.Schema({
  paletteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Palette',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});