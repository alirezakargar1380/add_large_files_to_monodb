import usersModel, { IUser } from "../models/users.model"

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
        isFromMyConnection: false,
        exportedSectionsData: true
    })
    .catch((err) => {
        console.error("dublicate data")
        console.error(err)
        return false
    })
}