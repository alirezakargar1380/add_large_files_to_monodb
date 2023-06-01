import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose'

interface ISkill {
    userId: ObjectId,
    title: string
}

const skillsSchema = new Schema<ISkill>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: true }
}, { timestamps: true })

const model = mongoose.model('skills', skillsSchema)

export default model