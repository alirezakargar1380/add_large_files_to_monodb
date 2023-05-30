import mongoose, { Schema } from 'mongoose'

const educationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    schoolId: { type: Schema.Types.ObjectId, ref: "schools", require: false },
    title: { type: String, required: false },
    des: { type: String, required: false },
    degrees: [
        { type: String, required: false }
    ],
    majors: [
        { type: String, required: false }
    ],
    year: { type: String, required: false },
    aboutUni: { type: String, required: false },
}, { timestamps: true })


export default mongoose.model('education', educationSchema)
