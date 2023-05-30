import mongoose, { Schema } from 'mongoose'

const certificationsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    name: { type: String, required: false, default: null },
    organization: { type: String, required: false, default: null },
    start_date: { type: String, required: false, default: null },
    end_date: { type: String, required: false, default: null }
}, { timestamps: true })

export default mongoose.model('certifications', certificationsSchema);