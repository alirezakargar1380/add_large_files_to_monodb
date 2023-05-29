import mongoose, { Schema } from 'mongoose'

const locationSchema = new Schema({
    name: { type: String, required: false },
    locality: { type: String, required: false },
    region: { type: String, required: false },
    metro: { type: String, required: false },
    country: { type: String, required: false },
    continent: { type: String, required: false },
    street_address: { type: String, required: false },
    postal_code: { type: String, required: false }
}, { timestamps: true })

export default mongoose.model('location', locationSchema);