import mongoose, { Schema } from 'mongoose'

const educationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: false },
    des: { type: String, required: false },
    year: { type: String, required: false },
    aboutUni: { type: String, required: false },
}, { timestamps: true })


export default mongoose.model('education', educationSchema)
