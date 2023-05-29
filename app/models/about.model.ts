import mongoose, { Schema } from 'mongoose'

const aboutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "users" },
    text: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('about', aboutSchema);