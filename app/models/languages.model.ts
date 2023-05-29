import mongoose, { Schema } from 'mongoose'

const languagesSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: false },
    des: { type: String, required: false },
    proficiency: { type: Number, required: false, default: null }
}, { timestamps: true })

export default mongoose.model('languages', languagesSchema);