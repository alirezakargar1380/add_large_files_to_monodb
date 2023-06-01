import experienceModel from "../models/experience.model"
import { ObjectId } from "mongodb"
import { addCompany, addMultiCompany } from "./addCompany.service";

let multiExperienceData: any[] = []

export const addMultiExperience = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let companyId: any = ""
        if (element.company) companyId = await addMultiCompany(element.company, userId)
        multiExperienceData.push({
            document: {
                userId: userId,
                companyId: (companyId) ? companyId : null,
                start_date: element.start_date,
                end_date: element.end_date,
                title: element?.title?.name,
                role: element?.title?.role,
                levels: element?.title?.levels,
            }
        })
    }
    
    if (multiExperienceData.length >= 50000) {
        await bulkEx()
    }
}

export const bulkEx = async () => {
    await experienceModel.bulkWrite(multiExperienceData.map(item => ({
        insertOne: item
    })))
    multiExperienceData = []
}

export const addExperience = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let company: any = ""
        if (element.company) company = await addCompany(element.company, userId)
        await experienceModel.create({
            userId: userId,
            companyId: (company?._id) ? company._id : null,
            start_date: element.start_date,
            end_date: element.end_date,
            title: element?.title?.name,
            role: element?.title?.role,
            levels: element?.title?.levels,
        })
    }
}