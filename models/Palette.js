import mongoose from 'mongoose';

const paletteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    colors: [{ type: String, required: true }],
    edition: { type: String, required: true },
    tags: [{ type: String }],
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Palette', paletteSchema);