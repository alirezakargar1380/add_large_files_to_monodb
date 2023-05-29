import experienceModel from "../models/experience.model"
import { ObjectId } from "mongodb"
import { addCompany } from "./addCompany.service";

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