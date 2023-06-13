import experienceModel from "../models/experience.model"
import { ObjectId } from "mongodb"
import { addMultiSchool, addSchool } from "./addSchool.service";
import educationModel from "../models/education.model";

let multiEducationData: any[] = []

export const addMultiEducation = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let school: any = ""
        if (element.school) school = await addMultiSchool(element.school, userId)
        multiEducationData.push({
            document: {
                userId: userId,
                schoolId: (school?._id) ? school._id : null,
                year: element.start_date + "_"+element.end_date,
                degrees: element.degrees,
                majors: element.majors,
                des: element.summary
            }
        })
    }

    // if (multiEducationData.length >= 30000) {
    //     await bulkEdu()
    // }
}

export const bulkEdu = async () => {
    if (!multiEducationData.length) return
    await educationModel.bulkWrite(multiEducationData.map(item => ({
        insertOne: item
    })), {
        ordered: false
    })
    multiEducationData = []
}

export const addEducation = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let school: any = ""
        if (element.school) school = await addSchool(element.school, userId)
        await educationModel.create({
            userId: userId,
            schoolId: (school?._id) ? school._id : null,
            year: element.start_date + "_"+element.end_date,
            degrees: element.degrees,
            majors: element.majors,
            des: element.summary
        })
    }
}