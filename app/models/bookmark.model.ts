import mongoose, { Schema } from 'mongoose'

const bookmarkSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, unique: false, ref: "users" }
}, { timestamps: true })

export default mongoose.model('bookmark', bookmarkSchema);