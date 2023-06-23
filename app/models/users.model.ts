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

const usersSchema = new Schema({
    id: { type: String, required: false },
    full_name: { type: String, required: false, default: null },
    middle_initial: { type: String, required: false, default: null },
    middle_name: { type: String, required: false, default: null },
    last_name: { type: String, required: false, default: null },
    gender: { type: String, required: false, default: null },
    birth_year: { type: String, required: false, default: null },
    birth_date: { type: String, required: false, default: null },
    linkedin_url: { type: String, required: false, default: null },
    linkedin_username: { type: String, required: false, default: null },
    linkedin_id: { type: String, required: false, default: null },
    facebook_url: { type: String, required: false, default: null },
    facebook_username: { type: String, required: false, default: null },
    facebook_id: { type: String, required: false, default: null },
    twitter_url: { type: String, required: false, default: null },
    twitter_username: { type: String, required: false, default: null },
    github_url: { type: String, required: false, default: null },
    github_username: { type: String, required: false, default: null },
    work_email: { type: String, required: false, default: null },
    mobile_phone: { type: String, required: false, default: null },
    industry: { type: String, required: false, default: null },
    job_title: { type: String, required: false, default: null },
    job_title_role: { type: String, required: false, default: null },
    job_title_sub_role: { type: String, required: false, default: null },
    job_title_levels: { type: Array, required: false },
    job_company_id: { type: String, required: false, default: null },
    job_company_name: { type: String, required: false, default: null },
    job_company_website: { type: String, required: false, default: null },
    job_company_size: { type: String, required: false, default: null },
    job_company_founded: { type: String, required: false, default: null },
    job_company_industry: { type: String, required: false, default: null },
    job_company_linkedin_url: { type: String, required: false, default: null },
    job_company_linkedin_id: { type: String, required: false, default: null },
    job_company_facebook_url: { type: String, required: false, default: null },
    job_company_twitter_url: { type: String, required: false, default: null },
    job_company_location_name: { type: String, required: false, default: null },
    job_company_location_locality: { type: String, required: false, default: null },
    job_company_location_metro: { type: String, required: false, default: null },
    job_company_location_region: { type: String, required: false, default: null },
    job_company_location_geo: { type: String, required: false, default: null },
    job_company_location_street_address: { type: String, required: false, default: null },
    job_company_location_address_line_2: { type: String, required: false, default: null },
    job_company_location_postal_code: { type: String, required: false, default: null },
    job_company_location_country: { type: String, required: false, default: null },
    job_company_location_continent: { type: String, required: false, default: null },
    job_last_updated: { type: String, required: false, default: null },
    job_start_date: { type: String, required: false, default: null },
    job_summary: { type: String, required: false, default: null },
    location_name: { type: String, required: false, default: null },
    location_locality: { type: String, required: false, default: null },
    location_metro: { type: String, required: false, default: null },
    location_region: { type: String, required: false, default: null },
    location_country: { type: String, required: false, default: null },
    location_continent: { type: String, required: false, default: null },
    location_street_address: { type: String, required: false, default: null },
    location_address_line_2: { type: String, required: false, default: null },
    location_postal_code: { type: String, required: false, default: null },
    location_geo: { type: String, required: false, default: null },
    location_last_updated: { type: String, required: false, default: null },
    linkedin_connections: { type: Number, required: false, default: null },
    inferred_salary: { type: String, required: false, default: null },
    inferred_years_experience: { type: Number, required: false, default: null },
    summary: { type: String, required: false, default: null },
    phone_numbers: { type: Array, required: false },
    emails: { type: Array, required: false },
    interests: { type: Array, required: false },
    skills: [
        { type: String }
    ],
    location_names: { type: Array, required: false },
    regions: { type: Array, required: false },
    countries: { type: Array, required: false },
    street_addresses: { type: Array, required: false },
    experience: { type: Array, required: false },
    education: { type: Array, required: false },
    profiles: { type: Array, required: false },
    certifications: { type: Array, required: false },
    languages: { type: Array, required: false },
    connection_link: { type: String, required: false, default: null },
    isFromMyConnection: { type: Boolean, required: true, default: false },
    exportedConnectionData: { type: Boolean, required: true, default: false },
    exportedSectionsData: { type: Boolean, required: true, default: false }
})

export default mongoose.model('users', usersSchema);