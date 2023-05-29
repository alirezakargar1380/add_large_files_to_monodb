import mongoose, { Schema } from 'mongoose'

const projectsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: true },
    des: { type: String, required: false },
    associated: { type: String, required: false }
}, { timestamps: true })

export default mongoose.model('projects', projectsSchema);