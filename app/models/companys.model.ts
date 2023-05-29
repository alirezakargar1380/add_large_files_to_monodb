import mongoose, { Schema } from 'mongoose'

const companySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    locationId: { type: Schema.Types.ObjectId, required: false, default: false, ref: "locations" },
    name: { type: String, required: false },
    size: { type: String, required: false },
    id: { type: String, required: false },
    founded: { type: String, required: false },
    industry: { type: String, required: false },
    linkedin_url: { type: String, required: false },
    facebook_url: { type: String, required: false },
    twitter_url: { type: String, required: false },
    website: { type: String, required: false },
}, { timestamps: true })

export default mongoose.model('companys', companySchema);