import { ObjectId } from "mongodb"
import usersModel, { IUser } from "../models/users.model"

let multiUser: any[] = []

export const addMultiUser = async (data: any) => {
    const id: ObjectId = new ObjectId()

    multiUser.push({
        document: {
            _id: id,
            name: data.full_name,
            link: data.linkedin_url,
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            job_company_founded: data.job_company_founded,
            job_company_linkedin_url: data.job_company_linkedin_url,
            job_company_location_continent: data.job_company_location_continent,
            job_company_location_country: data.job_company_location_country,
            job_company_location_locality: data.job_company_location_locality,
            job_company_name: data.job_company_name,
            job_company_website: data.job_company_website,
            location_continent: data.location_continent,
            location_country: data.location_country,
            summary: data.summary,
            gender: data.gender,
            emails: data.emails,
            phone_numbers: data.phone_numbers,
            current_job_title: data.job_title,
            twitter_url: data.twitter_url,
            github_url: data.github_url,
            isFromMyConnection: false,
            exportedSectionsData: true
        }
    })

    // if (multiUser.length === 50000) {
    //     await bulkUsers()
    // }

    return id
}

export const bulkUsers = async () => {
    if (!multiUser.length) return
    await usersModel.bulkWrite(multiUser.map(item => ({
        insertOne: item
    })), {
        ordered: false
    })
    multiUser = []
}

export const addUser = (data: any) => {
    return usersModel.create({
        name: data.full_name,
        link: data.linkedin_url,
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        job_company_founded: data.job_company_founded,
        job_company_linkedin_url: data.job_company_linkedin_url,
        job_company_location_continent: data.job_company_location_continent,
        job_company_location_country: data.job_company_location_country,
        job_company_location_locality: data.job_company_location_locality,
        job_company_name: data.job_company_name,
        job_company_website: data.job_company_website,
        location_continent: data.location_continent,
        location_country: data.location_country,
        summary: data.summary,
        gender: data.gender,
        emails: data.emails,
        phone_numbers: data.phone_numbers,
        current_job_title: data.job_title,
        twitter_url: data.twitter_url,
        github_url: data.github_url,
        isFromMyConnection: false,
        exportedSectionsData: true
    })
        .catch((err) => {
            console.error("dublicate data")
            console.error(err)
            return false
        })
}