import mongoose, { Schema } from 'mongoose'

const experienceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    companyId: { type: Schema.Types.ObjectId, required: false, default: null, ref: "companys" },
    title: { type: String, required: false },
    role: { type: String, required: false },
    time: { type: String, required: false, default: null },
    start_date: { type: String, required: false, default: null },
    end_date: { type: String, required: false, default: null },
    desAboutCompany: { type: String, required: false },
    location: { type: String, required: false },
    description: { type: String, required: false },
    levels: [
        { type: String, required: false }
    ],
    subset: [
        {
            title: { type: String, required: false },
            role: { type: String, required: false },
            time: { type: String, required: false }
        }
    ]
}, { timestamps: true })

export default mongoose.model('experience', experienceSchema);