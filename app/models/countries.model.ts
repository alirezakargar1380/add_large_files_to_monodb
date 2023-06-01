import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose'

export interface ICountries {
    userId: ObjectId,
    country: string
}

const countriesSchema = new Schema<ICountries>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users", index: false },
    country: { type: String, required: true, index: false }
}, { timestamps: true })

export default mongoose.model('countries', countriesSchema)