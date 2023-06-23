import mongoose, { Schema } from 'mongoose'

interface ISkill {
    title: string
}

const skillsSchema = new Schema<ISkill>({
    title: { type: String, required: true, unique: true }
})

const model = mongoose.model('skills', skillsSchema)

export default model