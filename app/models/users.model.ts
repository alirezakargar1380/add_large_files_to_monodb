import mongoose, { Schema } from 'mongoose'
import { ObjectId } from "mongodb"

export interface IUserEmail {
    address: string
    type: string
}

export interface IUser {
    _id: ObjectId
    link: string
    name: string
    first_name: string
    last_name: string
    middle_name: string
    gender: string
    job_company_name?: string
    job_company_website?: string
    job_company_linkedin_url?: string
    job_company_founded?: number
    job_company_location_locality?: string
    job_company_location_country?: string
    job_company_location_continent?: string
    location_country?: string
    location_continent?: string
    summary?: string
    phone_numbers?: string[]
    emails?: IUserEmail[]
    current_job_title?: string
    connection_link?: string | null
    twitter_url?: string | null
    github_url?: string | null
    isFromMyConnection: boolean
    exportedConnectionData: boolean
    exportedSectionsData: boolean
}

const usersSchema = new Schema<IUser>({
    link: { type: String, required: true },
    name: { type: String, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    middle_name: { type: String, required: false },
    gender: { type: String, required: false, default: null },
    job_company_name: { type: String, required: false, default: null },
    job_company_website: { type: String, required: false, default: null },
    job_company_linkedin_url: { type: String, required: false, default: null },
    job_company_founded: { type: Number, required: false, default: null },
    job_company_location_locality: { type: String, required: false, default: null },
    job_company_location_country: { type: String, required: false, default: null },
    job_company_location_continent: { type: String, required: false, default: null },
    location_country: { type: String, required: false, default: null },
    location_continent: { type: String, required: false, default: null },
    summary: { type: String, required: false, default: null },
    phone_numbers: [
        { type: String, required: false }
    ],
    emails: [
        {
            address: { type: String, required: false, default: null },
            type: { type: String, required: false, default: null }
        }
    ],
    current_job_title: { type: String, required: false },
    twitter_url: { type: String, required: false },
    github_url: { type: String, required: false },
    connection_link: { type: String, required: false, default: null },
    isFromMyConnection: { type: Boolean, required: true },
    exportedConnectionData: { type: Boolean, required: true, default: false },
    exportedSectionsData: { type: Boolean, required: true, default: false },
}, { timestamps: true })

export default mongoose.model('users', usersSchema);