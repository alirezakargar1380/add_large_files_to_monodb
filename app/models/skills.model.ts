import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose'

interface ISkill {
    userId: ObjectId,
    title: string
}

const skillsSchema = new Schema<ISkill>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users", index: true },
    title: { type: String, required: true, index: true }
}, { timestamps: true })
skillsSchema.index({ title: 1, userId: 1 });
const model = mongoose.model('skills', skillsSchema)


export default model