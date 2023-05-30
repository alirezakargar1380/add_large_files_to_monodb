import mongoose, { Schema } from 'mongoose'

const schoolSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    locationId: { type: Schema.Types.ObjectId, required: false, default: null, ref: "locations" },
    name: { type: String, required: false },
    type: { type: String, required: false },
    id: { type: String, required: false },
    linkedin_url: { type: String, required: false },
    facebook_url: { type: String, required: false },
    twitter_url: { type: String, required: false },
    website: { type: String, required: false },
}, { timestamps: true })

export default mongoose.model('schools', schoolSchema);