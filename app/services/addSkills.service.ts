import { ObjectId } from "mongodb";
import skillsModel from "../models/skills.model";

let multiSkills: any[] = []

export const addMultiSkills = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        multiSkills.push({
            document: {
                userId: userId,
                title: element
            }
        })
    }

    // if (multiSkills.length >= 25000) {
    //     await bulkSkills()
    // }
}

export const bulkSkills = async () => {
    await skillsModel.bulkWrite(multiSkills.map(item => ({
        insertOne: item
    })), {
        ordered: false
    })
    multiSkills = []
}

export const addSkills = (data: any, userId: ObjectId) => {
    const skillsData = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        skillsData.push({
            userId: userId,
            title: element
        })
    }
    return skillsModel.insertMany(skillsData)
}