import mongoose, { Schema } from 'mongoose'

const contactInfoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: true },
    value: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('contactInfo', contactInfoSchema);