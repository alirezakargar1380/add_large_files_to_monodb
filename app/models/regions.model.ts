import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose'

export interface IRegions {
    userId: ObjectId,
    region: string
}

const regionsSchema = new Schema<IRegions>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users", index: true },
    region: { type: String, required: true, index: true }
}, { timestamps: true })


export default mongoose.model('regions', regionsSchema)