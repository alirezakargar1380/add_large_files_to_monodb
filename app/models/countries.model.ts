import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose'

export interface ICountries {
    userId: ObjectId,
    country: string
}

const countriesSchema = new Schema<ICountries>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users", index: true },
    country: { type: String, required: true, index: true }
}, { timestamps: true })


export default mongoose.model('countries', countriesSchema)