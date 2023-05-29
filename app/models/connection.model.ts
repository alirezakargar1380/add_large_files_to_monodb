import mongoose, { Schema } from 'mongoose'

const connectionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    connectedToUserId: { type: Schema.Types.ObjectId, required: true, ref: "users" }
}, { timestamps: true })

export default mongoose.model('connection', connectionSchema);