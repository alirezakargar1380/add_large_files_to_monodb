import mongoose, { Schema } from 'mongoose'

const courseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: false },
    description: { type: String, required: false }
}, { timestamps: true })

export default mongoose.model('course', courseSchema);